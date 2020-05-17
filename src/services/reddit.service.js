import { fetchRequest } from '../utils/fetch.util';

const fetchSubReddit = ({ subRedditName, authToken }) => fetchRequest({
  url: `https://oauth.reddit.com/r/${subRedditName}/about.json`,
  options: {
    headers: {
      Authorization: `bearer ${authToken}`
    },
  }
});

const fetchSubRedditPosts = ({ subRedditName, authToken }) => fetchRequest({
  url: `https://oauth.reddit.com/r/${subRedditName}/new.json`,
  parameters: { limit: 10 },
  options: {
    headers: {
      Authorization: `bearer ${authToken}`
    },
  }
});

export {
  fetchSubReddit,
  fetchSubRedditPosts,
};
