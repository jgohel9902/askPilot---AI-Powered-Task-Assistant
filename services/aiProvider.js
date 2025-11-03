import dotenv from 'dotenv';
dotenv.config();

let OpenAIClient = null;
try {
  // optional import; safe even if not used
  const mod = await import('openai');
  OpenAIClient = mod.default;
} catch (_) {}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

/**
 * Free local “AI-Lite” suggester:
 * - Scores tasks using a simple Eisenhower-ish heuristic
 * - Generates concise suggestions without external API
 */
const localFreeSuggest = ({ title = '', description = '', tags = [], priority = 'medium', status = 'todo', dueDate }) => {
  const text = `${title} ${description} ${tags.join(' ')}`.toLowerCase();
  const isUrgent = dueDate ? (new Date(dueDate) - new Date()) < 1000 * 60 * 60 * 24 * 2 : false; // < 48h
  const isImportant =
    /deliverable|deadline|invoice|billing|customer|release|exam|assignment|production|hotfix|medical|legal/.test(text) ||
    priority === 'high';

  const quadrant = isImportant && isUrgent ? 'Do Now' :
                   isImportant && !isUrgent ? 'Schedule' :
                   !isImportant && isUrgent ? 'Delegate' :
                   'Defer/Discard';

  const quickSteps = [];

  if (/bug|fix|error|issue|fail|broken|crash/.test(text))
    quickSteps.push('Reproduce the issue', 'Check logs/console', 'Write failing test (if possible)', 'Patch and verify');
  if (/write|doc|documentation|readme|spec/.test(text))
    quickSteps.push('Outline headings', 'Fill content bullets', 'Add examples/screens', 'Review and publish');
  if (/deploy|release|prod|production/.test(text))
    quickSteps.push('Create tagged build', 'Smoke-test in staging', 'Deploy during a window', 'Monitor metrics');

  if (quickSteps.length === 0)
    quickSteps.push('Define success criteria', 'Break into 2–4 subtasks', 'Estimate time', 'Start the first subtask');

  const suggestion = {
    mode: 'free-local',
    priorityHint: quadrant,
    actionPlan: quickSteps.slice(0, 4),
    statusHint: status === 'done' ? 'Task already completed — consider writing a short retrospective.' : undefined
  };

  return suggestion;
};

/**
 * Optional OpenAI suggester (only if API key exists).
 * You can upgrade to richer prompts later.
 */
const openAISuggest = async (payload) => {
  const client = new OpenAIClient({ apiKey: OPENAI_API_KEY });

  const prompt = `You are askPilot, a pragmatic task assistant.
Given this JSON task:
${JSON.stringify(payload, null, 2)}
Return a concise JSON with keys: priorityHint (one of Do Now, Schedule, Delegate, Defer/Discard), actionPlan (array of up to 4 short steps), statusHint (optional). Keep it short.`;

  // Using Responses API (v4)
  const resp = await client.responses.create({
    model: 'gpt-4o-mini',
    input: prompt,
    temperature: 0.3
  });

  // Best-effort JSON extraction
  const text = resp.output_text ?? (resp?.output?.[0]?.content?.[0]?.text ?? '{}');
  try {
    return JSON.parse(text);
  } catch {
    return { mode: 'openai', raw: text };
  }
};

export const getSuggestion = async (payload) => {
  if (!OPENAI_API_KEY) {
    return localFreeSuggest(payload);
  }
  try {
    return await openAISuggest(payload);
  } catch (e) {
    console.warn('OpenAI error, falling back to local:', e.message);
    return localFreeSuggest(payload);
  }
};
