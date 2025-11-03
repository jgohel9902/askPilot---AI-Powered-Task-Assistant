import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { TasksContext } from "./TasksContext.js";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTasks() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/tasks`);
      setTasks(data || []);
    } finally {
      setLoading(false);
    }
  }

  async function addTask(payload) {
    const { data } = await axios.post(`${API_BASE}/tasks`, payload);
    setTasks((prev) => [data, ...prev]);
  }

  async function updateTask(id, patch) {
    const { data } = await axios.patch(`${API_BASE}/tasks/${id}`, patch);
    setTasks((prev) => prev.map((t) => (String(t._id) === String(id) ? data : t)));
  }

  async function deleteTask(id) {
    await axios.delete(`${API_BASE}/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => String(t._id) !== String(id)));
  }

  const nextOf = (s) =>
    s === "todo" ? "in_progress" : s === "in_progress" ? "done" : "todo";

  async function nextStatus(id) {
    const t = tasks.find((x) => String(x._id) === String(id));
    if (!t) return;
    await updateTask(id, { status: nextOf(t.status) });
  }

  async function setStatus(id, status) {
    await updateTask(id, { status });
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      loading,
      addTask,
      fetchTasks,
      updateTask,
      deleteTask,
      nextStatus,
      setStatus,
    }),
    [tasks, loading]
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
