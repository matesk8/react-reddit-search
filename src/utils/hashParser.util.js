const getHashParameters = (hashValue) => {
  if (typeof hashValue !== 'string') { return {}; }
  const hashIndex = 1;
  const hash = hashValue.substring(hashIndex);

  return hash.split('&').reduce((hashMap, item) => {
    const [key, value] = item.split('=');
    return {
      ...hashMap,
      [key]: value,
    };
  }, {});
};

export {
  getHashParameters,
};
