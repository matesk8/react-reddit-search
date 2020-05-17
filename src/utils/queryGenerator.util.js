const generateQueryString = (queryObject) => (
  Object.entries(queryObject || {})
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
);

export {
  generateQueryString,
};
