import { fetchRequest } from '../utils/fetch.util';
import { v4 as uuidv4 } from 'uuid';

const searchForSubReddit = ({ subRedditName, authToken }) => fetchRequest({
  url: 'https://oauth.reddit.com/subreddits/search.json',
  parameters: {
    q: subRedditName,
    search_query_id: uuidv4(),
  },
  options: {
    headers: {
      Authorization: `bearer ${authToken}`
    },
  }
});

const fetchSubRedditPosts = ({ subRedditUrl, authToken }) => fetchRequest({
  url: `https://oauth.reddit.com${subRedditUrl}new.json`,
  parameters: { limit: 10 },
  options: {
    headers: {
      Authorization: `bearer ${authToken}`
    },
  }
});

export {
  fetchSubRedditPosts,
  searchForSubReddit,
};
