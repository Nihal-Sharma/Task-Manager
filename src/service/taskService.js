const STORAGE_KEY = "task-tracker-tasks";

/**
 * Loads tasks from localStorage.
 * @returns {Array<Object>} Array of task objects.
 */
export const loadTasks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
  
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load tasks:", error);
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
