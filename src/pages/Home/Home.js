/* eslint-disable react/prop-types */
import React from 'react';
import './Home.scss';
import { getHashParameters } from '../../utils/hashParser.util';
import { fetchSubRedditPosts, searchForSubReddit } from '../../services/reddit.service';
import SearchForm from '../../components/SearchForm/SearchForm';
import SubRedditHeader from '../../components/SubRedditHeader/SubRedditHeader';
import CommentList from '../../components/CommentList/CommentList';
import { getLocalStorageValue, setLocalStorageValue } from '../../utils/localStorage.util';
import { localStorageKeys } from '../../constants/localStorage.constants';
import PropTypes from 'prop-types';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redditAccessToken: null,
      searchValue: '',
      firstMatchingSubReedit: null,
      subRedditCommentsMap: {},
      currentPageSubRedditComments: {},
      currentPage: 1,
      searchDispatched: false,
    };

    this.onSearchValueChange = this.onSearchValueChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onLoadNextComments = this.onLoadNextComments.bind(this);
    this.onLoadPreviousComments = this.onLoadPreviousComments.bind(this);
  }

  componentDidMount() {
    const { history, onSessionExpired } = this.props;
    const cachedSessionId = getLocalStorageValue(localStorageKeys.sessionId);
    const cachedSessionStartTime = getLocalStorageValue(localStorageKeys.sessionStartTime);
    const sessionStartDate = cachedSessionStartTime ? new Date(cachedSessionStartTime) : new Date();
    const hashMap = getHashParameters(window.location.hash || {});
    const accessToken = hashMap.access_token;
    const authenticationError = hashMap.error;
    const isValidSession = hashMap.state === cachedSessionId;

    if (!cachedSessionStartTime) {
      setLocalStorageValue(localStorageKeys.sessionStartTime, sessionStartDate);
    }

    if (!isValidSession || authenticationError) {
      history.push('/login');
    }

    this.setState({
      redditAccessToken: accessToken,
    });

    const sessionExpiryTime = new Date(sessionStartDate.getTime());
    sessionExpiryTime.setHours(sessionStartDate.getHours() + 1);
    const timeUntilSessionExpiry = Math.abs(sessionExpiryTime - Date.now());
    setTimeout(() => {
      onSessionExpired();
      history.push('/login');
    }, timeUntilSessionExpiry);
  }

  onSearchValueChange(name) {
    this.setState({
      searchValue: name,
    });
  }

  async onSearch() {
    const { redditAccessToken, searchValue, currentPage } = this.state;
    const subRedditResponse = await searchForSubReddit({
      authToken: redditAccessToken,
      subRedditName: searchValue,
    });

    const subRedditList = (subRedditResponse.data || {}).children;
    if (!(subRedditList || []).length) {
      this.setState({
        firstMatchingSubReedit: null,
        searchDispatched: true,
      });
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
      searchDispatched: true,
    });
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
      searchDispatched,
      firstMatchingSubReedit,
      currentPageSubRedditComments,
      currentPage,
    } = this.state;
    const isLastPage = !(currentPageSubRedditComments.data || {}).after;

    return (
      <>
        <div className="home-page">
          <SearchForm
            onSearchValueChange={this.onSearchValueChange}
            onSearch={this.onSearch}
          />
          {firstMatchingSubReedit && (
            <>
              <SubRedditHeader
                subReddit={firstMatchingSubReedit}
              />
              <CommentList
                comments={currentPageSubRedditComments.data}
                currentPage={currentPage}
                isLastPage={isLastPage}
                onLoadNextComments={this.onLoadNextComments}
                onLoadPreviousComments={this.onLoadPreviousComments}
              />
            </>
          )}
          {(!firstMatchingSubReedit && searchDispatched) && (
            <div className="home-page__no-result-label">
              No results found
            </div>
          )}
        </div>
      </>
    );
  }
}

HomePage.propTypes = {
  onSessionExpired: PropTypes.func.isRequired,
};

export default HomePage;
