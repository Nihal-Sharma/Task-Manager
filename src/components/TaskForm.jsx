import React, { useEffect, useState } from "react";

/**
 * Task form for creating or editing a task.
 * @param {Object} props
 * @param {Object} [props.initialValues] - Task object when in edit mode.
 * @param {Function} props.onSubmit - Called with task data on form submit.
 */
export default function TaskForm({ initialValues, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // When editing, prefill the form with the existing task Data
  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || "");
      setDescription(initialValues.description || "");
    }
  }, [initialValues]);

  const isEditing = Boolean(initialValues);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simple validation: do not submit empty title
    if (!title.trim()) return;

    // Making the payload, keep id/status if editing
    const payload = {
      ...(initialValues || {}),
      title: title.trim(),
      description: description.trim(),
    };

    onSubmit(payload);

    // Clear form only when adding new task
    if (!isEditing) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <label className="block text-xs font-medium text-slate-600">
          Task title
        </label>
        <input
          type="text"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-0 focus:border-slate-400 focus:bg-white"
          placeholder="e.g. Finish assignment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-medium text-slate-600">
          Description
        </label>
        <textarea
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:bg-white"
          rows={3}
          placeholder="Optional details about this task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 active:scale-[0.98]"
        >
          {isEditing ? "Update task" : "Add task"}
        </button>
      </div>
    </form>
  );
}
