// src/components/ai/AiPanel.jsx
import { useState } from "react";
import { useAI } from "../../hooks/useAI.js";
import { useTasks } from "../../hooks/useTasks.js";

export default function AiPanel() {
  const { runExample, suggest } = useAI();
  const { tasks } = useTasks();
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState([]);

  const handleRunExample = async () => {
    try {
      setLoading(true);
      const result = await runExample();
      setLog((prev) => [
        {
          id: crypto.randomUUID(),
          label: "Example",
          result,
          ts: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (e) {
      setLog((prev) => [
        {
          id: crypto.randomUUID(),
          label: "Error",
          result: { priorityHint: "Medium", actionPlan: [String(e?.message || e)] },
          ts: new Date().toISOString(),
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestForFirstTodo = async () => {
    const first = tasks.find((t) => t.status === "todo") || tasks[0];
    if (!first) return;
    try {
      setLoading(true);
      const result = await suggest(first);
      setLog((prev) => [
        {
          id: crypto.randomUUID(),
          label: `Task: ${first.title}`,
          result,
          ts: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (e) {
      setLog((prev) => [
        {
          id: crypto.randomUUID(),
          label: "Error",
          result: { priorityHint: "Medium", actionPlan: [String(e?.message || e)] },
          ts: new Date().toISOString(),
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <h3>AI Suggestions</h3>
      <div className="small" style={{ color: "var(--muted)" }}>
        Works free by default. Add an OpenAI key later to upgrade.
      </div>

      <div className="row" style={{ gap: 8 }}>
        <button className="button" disabled={loading} onClick={handleRunExample}>
          {loading ? "…" : "Run example"}
        </button>
        <button className="button" disabled={loading || tasks.length === 0} onClick={handleSuggestForFirstTodo}>
          {loading ? "…" : "Suggest for a task"}
        </button>
      </div>

      {log.length === 0 ? (
        <div className="emptystate">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h10M4 17h7" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div className="emptystate-title">No suggestions yet</div>
          <div className="emptystate-sub">Click “Run example” to see how it works.</div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 8 }}>
          {log.map((entry) => (
            <div key={entry.id} className="card" style={{ background: "var(--bg-soft)" }}>
              <div className="small" style={{ color: "var(--muted)" }}>{entry.label}</div>
              <div className="kpi-num" style={{ marginTop: 6 }}>{entry.result?.priorityHint || "—"}</div>
              <ul style={{ marginTop: 6, paddingLeft: 18 }}>
                {(entry.result?.actionPlan || []).map((s, i) => (
                  <li key={i} className="small">{s}</li>
                ))}
              </ul>
              {entry.result?.statusHint && (
                <div className="small" style={{ marginTop: 6 }}>{entry.result.statusHint}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
