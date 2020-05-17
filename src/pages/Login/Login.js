import React from 'react';
import { redditConfig } from '../../config/reddit.config';
import { generateQueryString } from '../../utils/queryGenerator.util';
import PropTypes from 'prop-types';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onLoginClick() {
    const { sessionId } = this.props;
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

LoginPage.propTypes = {
  sessionId: PropTypes.string.isRequired,
};

export default LoginPage;
