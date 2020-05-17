const generateQueryString = (queryObject) => {
  const isValidQueryObject = typeof queryObject === 'object' && queryObject !== null;
  if (!isValidQueryObject) { return ''; }
  return Object.entries(queryObject)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

export {
  generateQueryString,
};
