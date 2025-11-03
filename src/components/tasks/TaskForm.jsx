import { useState, useEffect } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useSettings } from '../../hooks/useSettings';

export default function TaskForm() {
  const { addTask } = useTasks();
  const { settings } = useSettings();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(settings.defaultPriority || 'medium');

  useEffect(() => {
    // If user changes default in settings, reflect for next new task
    setPriority(settings.defaultPriority || 'medium');
  }, [settings.defaultPriority]);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask({ title, priority, status: 'todo' });
    setTitle('');
    setPriority(settings.defaultPriority || 'medium');
  };

  return (
    <form onSubmit={submit} className="row" style={{ gap: 10 }}>
      <input
        className="input"
        placeholder="New task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className="input"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <button className="button primary" type="submit">Add</button>
    </form>
  );
}
