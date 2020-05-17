import React from 'react';
import PropTypes from 'prop-types';
import { getHashParameters } from '../../utils/hashParser.util';
import { fetchSubRedditPosts, searchForSubReddit } from '../../services/reddit.service';
import SearchForm from '../../components/SearchForm/SearchForm';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redditAccessToken: null,
      subRedditName: '',
    };

    this.handleSubRedditNameChange = this.handleSubRedditNameChange.bind(this);
    this.handleSearchForSubReddit = this.handleSearchForSubReddit.bind(this);
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
  }

  handleSubRedditNameChange(name) {
    this.setState({
      subRedditName: name,
    });
  }

  async handleSearchForSubReddit() {
    const { redditAccessToken, subRedditName } = this.state;
    const response = await searchForSubReddit({
      authToken: redditAccessToken,
      subRedditName,
    });

    const responseList = (response.data || {}).children;
    if (!(responseList || []).length) {
      console.log('No results found'); // TODO
      return;
    }

    const firstMatchingSubReedit = responseList[0];
    const subRedditUrl = firstMatchingSubReedit.data.url;
    const subRedditPosts = await fetchSubRedditPosts({
      authToken: redditAccessToken,
      subRedditUrl,
    });

    console.log('firstMatchingSubReedit', firstMatchingSubReedit);
    console.log('subRedditPosts', subRedditPosts);
  }

  render() {
    const { subRedditName } = this.state;
    return (
      <>
        <SearchForm
          onSubRedditNameChange={this.handleSubRedditNameChange}
          onSearchForSubReddit={this.handleSearchForSubReddit}
          subRedditName={subRedditName}
        />
      </>
    );
  }
}

HomePage.propTypes = {
  sessionId: PropTypes.string.isRequired,
};

export default HomePage;
