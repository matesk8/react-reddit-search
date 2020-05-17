import React from 'react';
import PropTypes from 'prop-types';
import { fetchRequest } from '../../utils/fetch.util';
import { getHashParameters } from '../../utils/hashParser.util';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redditAccessToken: null,
    };
  }

  componentDidMount() {
    const { sessionId } = this.props;
    const hashMap = getHashParameters(window.location.hash);
    const accessToken = hashMap.access_token;
    const isValidSession = hashMap.state === sessionId;

    console.log('isValidSession', isValidSession); // TODO: log out otherwise
    this.setState({
      redditAccessToken: accessToken,
    });
    this.fetchData(accessToken);
  }

  async fetchData(authToken) {
    const subReddit = await fetchRequest( // TODO: use named parameters
      'https://oauth.reddit.com/r/javascript/about.json',
      null,
      {
        headers: {
          Authorization: `bearer ${authToken}`
        },
      }
    );

    const subRedditPosts = await fetchRequest(
      'https://oauth.reddit.com/r/javascript/new.json', {
        limit: 10,
      },
      {
        headers: {
          Authorization: `bearer ${authToken}`
        },
      }
    );
    console.log('subReddit', subReddit);
    console.log('subRedditPosts', subRedditPosts);
  }

  render() {
    return (
      <>
        Home
      </>
    );
  }
}

HomePage.propTypes = {
  sessionId: PropTypes.string.isRequired,
};

export default HomePage;
