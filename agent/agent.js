import cron from 'node-cron';
import { fetch } from 'undici';
import Task from '../models/Task.js';

let enabled = false;
let job = null;

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.1:8b';

export function isAgentEnabled() { return enabled; }

export function startAgent() {
  if (job) job.stop();
  enabled = true;
  job = cron.schedule('*/2 * * * *', async () => {
    try {
      await runAgentTick();
    } catch (e) {
      console.error('[agent] tick error:', e?.message || e);
    }
  }, { scheduled: true });
  console.log('[agent] enabled');
}

export function stopAgent() {
  if (job) { job.stop(); job = null; }
  enabled = false;
  console.log('[agent] disabled');
}

async function runAgentTick() {
  const tasks = await Task.find().sort({ createdAt: -1 }).limit(12);
  if (!tasks.length) return;

  const plan = await askModel(makePrompt(tasks));
  if (!plan?.actions) return;

  for (const act of plan.actions) {
    try {
      if (act.type === 'update' && act.id && act.patch) {
        await Task.findByIdAndUpdate(act.id, act.patch, { new: true });
      }
      if (act.type === 'suggest' && act.id && act.note) {
        await Task.findByIdAndUpdate(act.id, { $push: { notes: act.note } });
      }
    } catch (e) {
      console.warn('[agent] action failed:', e?.message);
    }
  }
}

function makePrompt(tasks) {
  const brief = tasks.map(t => ({
    id: String(t._id),
    title: t.title,
    status: t.status,
    priority: t.priority
  }));
  return `You are a task agent. Given tasks (JSON), output a JSON with { "actions": [ ... ] }.
Each action is either:
- {"type":"update","id":"<taskId>","patch":{"status":"in_progress"|"done"|"todo","priority":"low"|"medium"|"high"}}
- {"type":"suggest","id":"<taskId>","note":"short suggestion string"}

Guidelines:
- Move 1-2 top-priority todos to in_progress.
- Mark only obviously completed items as done.
- Suggest at most 1 note per task.
Return ONLY JSON.

Tasks: ${JSON.stringify(brief)}`;
}

async function askModel(prompt) {
  try {
    const r = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [{ role: 'user', content: prompt }],
        stream: false
      })
    });
    const json = await r.json();
    const text = json.message?.content || '';
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1) {
      return JSON.parse(text.slice(start, end + 1));
    }
  } catch (e) {
    console.error('[agent] askModel error:', e?.message);
  }
  return null;
}

