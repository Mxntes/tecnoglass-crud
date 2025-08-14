import TaskItem from "./TaskItem";

export default function TaskList({ items, onToggle, onDelete, onUpdate }) {
  if (!items.length) return <div className="alert alert-light">Sin tareas</div>;
  return (
    <ul className="list-group">
      {items.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}