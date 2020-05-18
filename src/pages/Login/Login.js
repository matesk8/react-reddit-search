import React from 'react';
import { redditConfig } from '../../config/reddit.config';
import { generateQueryString } from '../../utils/queryGenerator.util';
import { clearLocalStorageValue, setLocalStorageValue } from '../../utils/localStorage.util';
import { localStorageKeys } from '../../constants/localStorage.constants';
import { v4 as uuidv4 } from 'uuid';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    const sessionId = uuidv4();
    this.state = {
      sessionId,
    };

    clearLocalStorageValue(localStorageKeys.sessionId);
    clearLocalStorageValue(localStorageKeys.sessionStartTime);
    setLocalStorageValue(localStorageKeys.sessionId, sessionId);
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onLoginClick() {
    const { sessionId } = this.state;
    const url = 'https://www.reddit.com/api/v1/authorize';
    const parameters = generateQueryString({
      client_id: redditConfig.appId,
      response_type: redditConfig.responseType,
      state: sessionId,
      redirect_uri: redditConfig.redirectURI,
      scope: 'read',
    });
    window.location.href = `${url}?${parameters}`;
  }

  render() {
    return (
      <>
        <button
          type="button"
          aria-label="Log in to Reddit"
          onClick={this.onLoginClick}
        >
          Log in to Reddit
        </button>
      </>
    );
  }
}

export default LoginPage;
