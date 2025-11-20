
import TaskItem from "./TaskItem.jsx";

/**
 * Renders a list of tasks.
 * @param {Object} props
 * @param {Array} props.tasks - Array of task objects.
 */
export default function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
}) {
  if (!tasks.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 py-10 text-center text-sm text-slate-500">
        <p>No tasks yet.</p>
        <p className="text-xs">Add your first task using the form above.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
