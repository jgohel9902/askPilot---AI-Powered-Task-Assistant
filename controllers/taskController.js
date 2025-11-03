import Task from '../models/Task.js';

export async function getTasks(_req, res) {
  const items = await Task.find().sort({ createdAt: -1 });
  res.json(items);
}

export async function createTask(req, res) {
  const body = req.body || {};
  const item = await Task.create({
    title: body.title,
    description: body.description || '',
    status: body.status || 'todo',
    priority: body.priority || 'medium'
  });
  res.status(201).json(item);
}

export async function updateTask(req, res) {
  const { id } = req.params;
  const patch = req.body || {};
  const updated = await Task.findByIdAndUpdate(id, patch, { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ ok: true });
}
