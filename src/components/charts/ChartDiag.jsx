// Zero-config diagnostic chart to prove Chart.js is working
import 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';

export default function ChartDiag() {
  const bar = {
    labels: ['A', 'B', 'C'],
    datasets: [{ label: 'Demo', data: [3, 2, 1], backgroundColor: ['#93c5fd','#c4b5fd','#86efac'], borderRadius: 8, borderWidth: 0 }]
  };
  const donut = {
    labels: ['X', 'Y', 'Z'],
    datasets: [{ data: [2, 4, 3], backgroundColor: ['#a7f3d0','#fde68a','#fca5a5'], borderWidth: 0, hoverOffset: 8 }]
  };
  const opts = { responsive: true, maintainAspectRatio: false, animation: { duration: 400 } };

  return (
    <div className="row" style={{ gap: 12 }}>
      <div className="card" style={{ flex: 1, minHeight: 260 }}>
        <h3>Diag Doughnut</h3>
        <div style={{ height: 210 }}><Doughnut data={donut} options={opts} /></div>
      </div>
      <div className="card" style={{ flex: 1, minHeight: 260 }}>
        <h3>Diag Bar</h3>
        <div style={{ height: 210 }}><Bar data={bar} options={opts} /></div>
      </div>
    </div>
  );
}
