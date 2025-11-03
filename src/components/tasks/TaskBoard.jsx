import TaskItem from "./TaskItem";
 import { useTasks } from "../../hooks/useTasks.js";

export default function TaskBoard({ onSuggest }) {
  const { tasks, setStatus } = useTasks();

  const lists = {
    todo: tasks.filter((t) => t.status === "todo"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  const makeDropHandlers = (status) => ({
    onDragOver: (e) => e.preventDefault(),
    onDrop: async (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      if (!id) return;
      await setStatus(id, status);
    },
  });

  return (
    <div className="board">
      <Column title="To Do" items={lists.todo} onSuggest={onSuggest} {...makeDropHandlers("todo")} />
      <Column title="In Progress" items={lists.in_progress} onSuggest={onSuggest} {...makeDropHandlers("in_progress")} />
      <Column title="Done" items={lists.done} onSuggest={onSuggest} {...makeDropHandlers("done")} />
    </div>
  );
}

function Column({ title, items, onSuggest, ...dropHandlers }) {
  return (
    <div className="board-column card" style={{ minHeight: 220 }} {...dropHandlers}>
      <h3>{title}</h3>
      <div className="column-body">
        {items.map((t) => (
          <TaskItem key={t._id || t.id || t.title} task={t} onSuggest={onSuggest} />
        ))}
        {items.length === 0 && (
          <div className="small" style={{ color: "var(--muted)" }}>Drop tasks here</div>
        )}
      </div>
    </div>
  );
}
