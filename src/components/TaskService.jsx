const STORAGE_KEY = "task-tracker-tasks";

/**
 * Loads tasks from localStorage.
 * @returns {Array<Object>} Array of task objects.
 */
export const loadTasks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    return [];
  }
};

/**
 * Saves tasks array to localStorage.
 * @param {Array<Object>} tasks - Array of task objects.
 */
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
};
