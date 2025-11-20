/**
 * Generates a simple unique id string for tasks.
 * @returns {string} A unique id value.
 */
export const generateId = () => {
  // Combine timestamp with a random string
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};
