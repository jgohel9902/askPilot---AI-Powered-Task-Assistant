// src/components/tasks/TaskItem.jsx
import { useState } from "react";
import { useTasks } from "../../hooks/useTasks.js";
import { useAI } from "../../hooks/useAI.js";

export default function TaskItem({ task }) {
  const { deleteTask, nextStatus } = useTasks();
  const { suggest } = useAI();
  const [aiLoading, setAiLoading] = useState(false);
  const [ai, setAi] = useState(null);

  const handleNext = () => nextStatus(task._id || task.id);
  const handleDelete = () => deleteTask(task._id || task.id);

  const handleAI = async () => {
    try {
      setAiLoading(true);
      const res = await suggest(task);
      setAi(res);
    } catch (e) {
      setAi({ priorityHint: "Medium", actionPlan: [String(e?.message || e)] });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="task">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <div style={{ fontWeight: 600 }}>{task.title}</div>
        <div className="badges">
          <span className={`badge ${task.priority}`}>{task.priority}</span>
        </div>
      </div>

      <div className="row" style={{ gap: 8 }}>
        <button className="button" onClick={handleNext}>Next status</button>
        <button className="button danger" onClick={handleDelete}>Delete</button>
        <button className="button" onClick={handleAI} disabled={aiLoading}>
          {aiLoading ? "AI…" : "AI"}
        </button>
      </div>

      {ai && (
        <div className="card" style={{ marginTop: 8 }}>
          <div className="small" style={{ color: "var(--muted)" }}>AI Suggestion</div>
          <div className="kpi-num" style={{ marginTop: 6 }}>{ai.priorityHint || "—"}</div>
          <ul style={{ marginTop: 6, paddingLeft: 18 }}>
            {(ai.actionPlan || []).map((s, i) => (
              <li key={i} className="small">{s}</li>
            ))}
          </ul>
          {ai.statusHint && <div className="small" style={{ marginTop: 6 }}>{ai.statusHint}</div>}
        </div>
      )}
    </div>
  );
}
