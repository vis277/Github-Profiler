export const setCacheRecord = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getCacheRecord = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const invalidateCache = () => {
  return localStorage.clear();
};
