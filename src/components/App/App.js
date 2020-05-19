import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import LoginPage from '../../pages/Login/Login';
import HomePage from '../../pages/Home/Home';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
  }

  showNotification(notificationType, message) {
    toast[notificationType](message, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  }

  render() {
    return (
      <>
        <Router>
          <ToastContainer />
          <Switch>
            <Route
              path="/home"
              render={(props) => (
                <HomePage
                  {...props}
                  showNotification={this.showNotification}
                />
              )}
            />
            <Route
              path="/"
              render={(props) => <LoginPage {...props} />}
            />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
