const setLocalStorageValue = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageValue = (key) => {
  return window.localStorage.getItem(key);
};

export {
  setLocalStorageValue,
  getLocalStorageValue,
};
