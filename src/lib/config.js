export const RESOURCES_API =
  (import.meta?.env?.VITE_RESOURCES_API_BASE) ||
  'http://localhost:5002';

export const TOPICS_API =
  (import.meta?.env?.VITE_TOPICS_API_BASE) ||
  'http://localhost:5050';

export const LEARNING_API =
  (import.meta?.env?.VITE_LEARNING_API_BASE) ||
  'http://localhost:8000';
