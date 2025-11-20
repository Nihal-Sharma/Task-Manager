import React from "react";

/**
 * Single task item row.
 * @param {Object} props
 * @param {Object} props.task - Task object to display.
 */
export default function TaskItem({ task, onToggleComplete, onDelete, onEdit }) {
  const isCompleted = task.status === "completed";

  // Format date in a simple way
  const createdAt = task.createdAt
    ? new Date(task.createdAt).toLocaleString()
    : "";

  return (
    <li className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3 text-sm md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-start gap-3">
        <button
          type="button"
          onClick={() => onToggleComplete(task.id)}
          className={`mt-1 h-5 w-5 flex-shrink-0 rounded-full border text-xs ${
            isCompleted
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-slate-300 bg-white"
          }`}
          aria-label="Toggle task completion"
        >
          {isCompleted ? "✓" : ""}
        </button>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`text-sm font-semibold ${
                isCompleted ? "line-through text-slate-400" : "text-slate-800"
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                isCompleted
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {isCompleted ? "Completed" : "Pending"}
            </span>
          </div>

          {task.description && (
            <p className="text-xs text-slate-500">{task.description}</p>
          )}

          {createdAt && (
            <p className="text-[10px] text-slate-400">
              Created at: {createdAt}
            </p>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2 md:mt-0 md:pl-3">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-slate-400"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:border-red-200"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
