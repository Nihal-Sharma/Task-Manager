/**
 * Generates a simple unique id for tasks.
 * @returns {string} A unique id value.
 */
export const generateId = () => {
  // Adding timestamp with string
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};
