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

const fetchSubRedditPosts = ({ subRedditUrl, after, authToken }) => fetchRequest({
  url: `https://oauth.reddit.com${subRedditUrl}new.json`,
  parameters: {
    limit: 10,
    raw_json: 1,
    after,
  },
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
