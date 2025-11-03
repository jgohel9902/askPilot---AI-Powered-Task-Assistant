// src/components/charts/TaskCharts.jsx
import 'chart.js/auto';              // <-- zero-config registration
import { Doughnut, Bar } from 'react-chartjs-2';
import { useMemo } from 'react';

export default function TaskCharts({ tasks }) {
  const { byStatus, byPriority, hasData } = useMemo(() => {
    const statusCounts = { todo: 0, in_progress: 0, done: 0 };
    const priorityCounts = { low: 0, medium: 0, high: 0 };
    for (const t of tasks) {
      statusCounts[t.status] = (statusCounts[t.status] || 0) + 1;
      priorityCounts[t.priority] = (priorityCounts[t.priority] || 0) + 1;
    }
    const total = statusCounts.todo + statusCounts.in_progress + statusCounts.done;
    return { byStatus: statusCounts, byPriority: priorityCounts, hasData: total > 0 };
  }, [tasks]);

  const donutData = {
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [{
      data: hasData ? [byStatus.todo, byStatus.in_progress, byStatus.done] : [1,1,1],
      backgroundColor: ['#93c5fd', '#c4b5fd', '#86efac'],
      borderWidth: 0,
      hoverOffset: 8,
    }]
  };

  const barData = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [{
      label: 'Tasks',
      data: hasData ? [byPriority.low, byPriority.medium, byPriority.high] : [1,1,1],
      backgroundColor: ['#a7f3d0', '#fde68a', '#fca5a5'],
      borderRadius: 8,
      borderWidth: 0,
    }]
  };

  const opts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, labels: { boxWidth: 12 } },
      title: { display: false }
    },
    animation: { duration: 650, easing: 'easeOutQuart' }
  };

  return (
    <div className="row" style={{ gap: 12, alignItems: 'stretch' }}>
      <div className="card" style={{ flex: 1, minHeight: 260 }}>
        <h3>Status Split</h3>
        {!hasData && <NoDataTag />}
        <div style={{ height: 210 }}>
          <Doughnut data={donutData} options={opts} />
        </div>
      </div>
      <div className="card" style={{ flex: 1, minHeight: 260 }}>
        <h3>Priority Mix</h3>
        {!hasData && <NoDataTag />}
        <div style={{ height: 210 }}>
          <Bar data={barData} options={{ ...opts, plugins: { legend: { display: false } } }} />
        </div>
      </div>
    </div>
  );
}

function NoDataTag() {
  return (
    <div style={{ position: 'absolute', right: 12, top: 12, fontSize: 12, color: 'var(--muted)' }}>
      No data yet
    </div>
  );
}
