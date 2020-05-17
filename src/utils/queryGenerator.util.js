const generateQueryString = (queryObject) => {
  const isValidQueryObject = typeof queryObject === 'object' && queryObject !== null;
  if (!isValidQueryObject) { return ''; }
  return Object.entries(queryObject)
    // eslint-disable-next-line no-unused-vars
    .filter(([key, value]) => !!value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

export {
  generateQueryString,
};
