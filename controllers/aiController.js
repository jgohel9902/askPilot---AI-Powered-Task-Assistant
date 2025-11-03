import { fetch } from 'undici';

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.1:8b';

/**
 * POST /api/ai/suggest
 * body: { title, description?, priority?, status? }
 * returns: { priorityHint, actionPlan[] }
 */
export async function aiSuggest(req, res) {
  try {
    const task = req.body || {};
    const prompt = makePrompt(task);

    const r = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [{ role: 'user', content: prompt }],
        stream: false
      })
    });

    if (!r.ok) {
      const text = await r.text();
      return res.status(500).json({ error: `Ollama error: ${r.status} ${text}` });
    }

    const json = await r.json();
    const text = json?.message?.content || '';
    const parsed = safeParseSuggestion(text);
    res.json(parsed);
  } catch (e) {
    console.error('[aiSuggest] error:', e?.message || e);
    res.status(500).json({
      priorityHint: 'Medium',
      actionPlan: ['AI is unavailable right now. Try again shortly.']
    });
  }
}

function makePrompt(task) {
  return `You are a helpful task assistant.
Given a task JSON, return a JSON object with:
{
  "priorityHint": "High|Medium|Low",
  "actionPlan": ["step 1", "step 2", ...]
}

Task: ${JSON.stringify(task)}

Rules:
- Keep actionPlan concrete (3-6 bullet steps).
- If unclear, include a first step to clarify requirements.
- Return ONLY JSON without extra commentary.`;
}

function safeParseSuggestion(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end !== -1) {
    try {
      const obj = JSON.parse(text.slice(start, end + 1));
      return {
        priorityHint: obj.priorityHint || 'Medium',
        actionPlan: Array.isArray(obj.actionPlan) ? obj.actionPlan : ['Plan unavailable']
      };
    } catch {}
  }
  return { priorityHint: 'Medium', actionPlan: ['Review the task and define next steps.'] };
}
