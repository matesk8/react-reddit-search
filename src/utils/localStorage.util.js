const setLocalStorageValue = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageValue = (key) => window.localStorage.getItem(key);

const clearLocalStorageValue = (key) => window.localStorage.removeItem(key);

export {
  setLocalStorageValue,
  getLocalStorageValue,
  clearLocalStorageValue,
};
