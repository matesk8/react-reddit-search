import React from 'react';
import PropTypes from 'prop-types';
import { getHashParameters } from '../../utils/hashParser.util';
import { fetchSubRedditPosts, searchForSubReddit } from '../../services/reddit.service';
import SearchForm from '../../components/SearchForm/SearchForm';
import SubRedditHeader from '../../components/SubRedditHeader/SubRedditHeader';
import CommentList from '../../components/CommentList/CommentList';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redditAccessToken: null,
      subRedditName: '', // TODO: rename to search value
      firstMatchingSubReedit: null,
      subRedditCommentsMap: {},
      currentPageSubRedditComments: {},
      currentPage: 1,
    };

    this.handleSubRedditNameChange = this.handleSubRedditNameChange.bind(this);
    this.handleSearchForSubReddit = this.handleSearchForSubReddit.bind(this);
    this.onLoadNextComments = this.onLoadNextComments.bind(this);
    this.onLoadPreviousComments = this.onLoadPreviousComments.bind(this);
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
    const { redditAccessToken, subRedditName, currentPage } = this.state;
    const subRedditResponse = await searchForSubReddit({
      authToken: redditAccessToken,
      subRedditName,
    });

    const subRedditList = (subRedditResponse.data || {}).children;
    if (!(subRedditList || []).length) {
      this.setState({ firstMatchingSubReedit: null });
      return;
    }

    const firstMatchingSubReedit = subRedditList[0];
    const subRedditUrl = firstMatchingSubReedit.data.url;
    const subRedditComments = await fetchSubRedditPosts({
      authToken: redditAccessToken,
      subRedditUrl,
    });
    this.setState({
      firstMatchingSubReedit,
      subRedditCommentsMap: {
        [currentPage]: subRedditComments
      },
      currentPageSubRedditComments: subRedditComments,
    });

    console.log('firstMatchingSubReedit', firstMatchingSubReedit);
    console.log('subRedditComments', subRedditComments);
  }

  async onLoadPreviousComments() {
    const { currentPage, subRedditCommentsMap } = this.state;
    const previousPageNumber = currentPage - 1;
    this.setState({
      currentPage: previousPageNumber,
      currentPageSubRedditComments: subRedditCommentsMap[previousPageNumber],
    });
  }

  async onLoadNextComments() {
    const {
      firstMatchingSubReedit,
      redditAccessToken,
      subRedditCommentsMap,
      currentPageSubRedditComments,
      currentPage,
    } = this.state;

    const nextPageNumber = currentPage + 1;
    const isNextPageFetchedAlready = !!subRedditCommentsMap[nextPageNumber];

    if (isNextPageFetchedAlready) {
      this.setState({
        currentPageSubRedditComments: subRedditCommentsMap[nextPageNumber],
        currentPage: nextPageNumber,
      });
      return;
    }

    const nextComments = await fetchSubRedditPosts({
      authToken: redditAccessToken,
      subRedditUrl: firstMatchingSubReedit.data.url,
      after: currentPageSubRedditComments.data.after,
    });
    this.setState({
      subRedditCommentsMap: {
        ...subRedditCommentsMap,
        [nextPageNumber]: nextComments,
      },
      currentPageSubRedditComments: nextComments,
      currentPage: nextPageNumber,
    });
  }

  render() {
    const {
      subRedditName,
      firstMatchingSubReedit,
      currentPageSubRedditComments,
    } = this.state;

    return (
      <>
        <SearchForm
          onSubRedditNameChange={this.handleSubRedditNameChange}
          onSearchForSubReddit={this.handleSearchForSubReddit}
          subRedditName={subRedditName}
        />
        {firstMatchingSubReedit && (
          <>
            <SubRedditHeader
              subReddit={firstMatchingSubReedit}
            />
            <CommentList
              comments={currentPageSubRedditComments.data}
              onLoadNextComments={this.onLoadNextComments}
              onLoadPreviousComments={this.onLoadPreviousComments}
            />
          </>
        )}
      </>
    );
  }
}

HomePage.propTypes = {
  sessionId: PropTypes.string.isRequired,
};

export default HomePage;
