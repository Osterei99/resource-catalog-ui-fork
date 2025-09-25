export const unwrapList = (data) =>
  data && typeof data === 'object' && Array.isArray(data.data) ? data.data : data;
