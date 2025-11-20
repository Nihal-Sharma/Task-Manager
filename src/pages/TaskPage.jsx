import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import FilterTabs from "../components/FilterTabs.jsx";
import { loadTasks, saveTasks } from "../service/taskService.js";
import { generateId } from "../utils/id.js";

const FILTERS = {
  all: "All",
  pending: "Pending",
  completed: "Completed",
};

export default function TaskPage() {
  // ✅ Initialize from localStorage ONCE when component is created
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  // ❌ REMOVE this (was causing timing issues + double runs in StrictMode)
  // useEffect(() => {
  //   const stored = loadTasks();
  //   setTasks(stored);
  // }, []);

  // ✅ Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  /**
   * Handles creating a new task or updating an existing one.
   * @param {Object} taskData - Data passed from the TaskForm.
   * @param {string} [taskData.id] - Existing task id (present in edit mode).
   * @param {string} taskData.title - Task title.
   * @param {string} taskData.description - Task description.
   */
  const handleSubmitTask = (taskData) => {
    // Edit mode: update existing task
    if (taskData.id) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskData.id
            ? { ...task, title: taskData.title, description: taskData.description }
            : task
        )
      );
      setEditingTask(null);
      return;
    }

    // Create mode: add new task
    const newTask = {
      id: generateId(),
      title: taskData.title,
      description: taskData.description,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  /**
   * Marks a task as completed or pending.
   * @param {string} taskId - The id of the task to toggle.
   */
  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  };

  /**
   * Deletes a task from the list.
   * @param {string} taskId - The id of the task to delete.
   */
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  /**
   * Starts editing mode for a specific task.
   * @param {Object} task - The task to edit.
   */
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  /**
   * Cancels edit mode and clears the editing task.
   */
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Filter tasks based on current filter (All / Completed / Pending)
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status === "completed";
    if (filter === "pending") return task.status === "pending";
    return true; // "all"
  });

  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <section className="space-y-6">
      {/* Card wrapper */}
      <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
        {/* Left: Form & filter */}
        <div className="space-y-4">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-base font-semibold">
                {editingTask ? "Edit task" : "Add a new task"}
              </h2>
              {editingTask && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancel edit
                </button>
              )}
            </div>

            <TaskForm
              key={editingTask ? editingTask.id : "new"}
              initialValues={editingTask}
              onSubmit={handleSubmitTask}
            />
          </div>

          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <FilterTabs
              currentFilter={filter}
              filters={FILTERS}
              onChange={setFilter}
            />
          </div>
        </div>

        {/* Right: small stats card */}
        <aside className="rounded-2xl border bg-white p-4 shadow-sm">
          <h3 className="mb-2 text-sm font-semibold">Summary</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p>Total tasks: {tasks.length}</p>
            <p>Completed: {completedCount}</p>
            <p>Pending: {tasks.length - completedCount}</p>
          </div>
        </aside>
      </div>

      {/* Task list */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </div>
    </section>
  );
}
