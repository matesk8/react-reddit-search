import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import LoginPage from '../../pages/Login/Login';
import HomePage from '../../pages/Home/Home';
import { localStorageKeys } from '../../constants/localStorage.constants';
import { getLocalStorageValue, setLocalStorageValue } from '../../utils/localStorage.util';

class App extends React.Component {
  constructor(props) {
    super(props);
    const cachedSessionId = getLocalStorageValue(localStorageKeys.sessionId);
    const sessionId = cachedSessionId || uuidv4();

    this.state = { sessionId };
    if (!cachedSessionId) {
      setLocalStorageValue(localStorageKeys.sessionId, sessionId);
    }
  }

  render() {
    const { sessionId } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            path="/home"
          >
            <HomePage
              sessionId={sessionId}
            />
          </Route>
          <Route path="/">
            <LoginPage
              sessionId={sessionId}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
