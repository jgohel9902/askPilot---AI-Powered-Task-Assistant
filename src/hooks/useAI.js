// src/hooks/useAI.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Simple AI hook that talks to backend POST /api/ai/suggest
 * - suggest(task): { priorityHint, actionPlan[], statusHint? }
 * - runExample(): convenience call with a sample payload
 */
export function useAI() {
  const suggest = async (task) => {
    const payload = {
      title: task?.title || "",
      description: task?.description || "",
      priority: task?.priority || "medium",
      status: task?.status || "todo",
      dueDate: task?.dueDate || null,
      tags: task?.tags || [],
    };
    const { data } = await axios.post(`${API_BASE}/ai/suggest`, payload);
    return data; // { priorityHint, actionPlan[], statusHint? }
  };

  const runExample = async () =>
    suggest({
      title: "Stakeholder Report",
      description: "Prep a concise update for PM + Eng leads",
      priority: "low",
      status: "todo",
      tags: ["report", "stakeholders"],
    });

  return { suggest, runExample };
}
