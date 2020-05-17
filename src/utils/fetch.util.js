import { generateQueryString } from './queryGenerator.util';

const fetchRequest = async (url, parameters, options) => {
  const query = generateQueryString(parameters);
  const requestURL = parameters ? `${url}?${query}` : url;

  try {
    const response = await fetch(requestURL, options);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    return {};
  }
};

export {
  fetchRequest,
};
