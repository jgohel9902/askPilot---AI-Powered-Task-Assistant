// src/pages/Dashboard.jsx
import TaskForm from "../components/tasks/TaskForm";
import TaskBoard from "../components/tasks/TaskBoard";
import AiPanel from "../components/ai/AiPanel";
import TaskCharts from "../components/charts/TaskCharts";
import EmptyState from "../components/common/EmptyState";
import { useTasks } from "../hooks/useTasks";
import { useSettings } from "../hooks/useSettings";
import { MotionWrapper } from "../components/motion/MotionWrapper";
import ChartDiag from '../components/charts/ChartDiag';

export default function Dashboard() {
  const { tasks, suggest } = useTasks();
  const { settings } = useSettings();

  const onSuggest = async (task) => {
    const data = await suggest(task);
    alert(`Priority: ${data.priorityHint}\n\nSteps:\n- ${(data.actionPlan || []).join("\n- ")}`);
    return data;
  };

  const done = tasks.filter((t) => t.status === "done").length;
  const total = tasks.length;
  const progressPct = total ? Math.round((done / total) * 100) : 0;

  const hasTasks = total > 0;

  return (
    <div className="stack">
      <MotionWrapper className="card">
        <h3>Project Pulse</h3>
        <div className="row" style={{ marginTop: 8 }}>
          <MotionWrapper className="card kpi" style={{ flex: 1, textAlign: "center" }}>
            <div className="small">Total Tasks</div>
            <div className="kpi-num">{total}</div>
          </MotionWrapper>
          <MotionWrapper className="card kpi" style={{ flex: 1, textAlign: "center" }}>
            <div className="small">Done</div>
            <div className="kpi-num">{done}</div>
          </MotionWrapper>
          <MotionWrapper className="card kpi" style={{ flex: 1, textAlign: "center" }}>
            <div className="small">Progress</div>
            <div className="kpi-num">{progressPct}%</div>
          </MotionWrapper>
        </div>
      </MotionWrapper>

      <MotionWrapper className="card" style={{
        background: "linear-gradient(135deg, rgba(36,99,235,.05), rgba(124,58,237,.05))",
        borderColor: "transparent"
      }}>
        <h3>Quick Add</h3>
        <div className="small" style={{ marginBottom: 6 }}>Create a task fast</div>
        <TaskForm />
      </MotionWrapper>

      {/* Charts — only if enabled and tasks exist */}
      {settings.showCharts && hasTasks && <TaskCharts tasks={tasks} />}

      {/* Main */}
      <div className="content">
        <MotionWrapper className="card">
          <h3>Tasks</h3>

          {!hasTasks ? (
            <EmptyState
              title="No tasks yet"
              subtitle="Add your first task to get started. You can drag cards between columns later."
              action={<div style={{ marginTop: 10 }}><TaskForm /></div>}
            />
          ) : (
            <>
              <TaskBoard onSuggest={onSuggest} />
            </>
          )}
        </MotionWrapper>

        <MotionWrapper className="card">
          <AiPanel />
        </MotionWrapper>
      </div>
    </div>
  );
}
