import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import '../styles/index.scss';
import LoginForm from '../modules/login/LoginForm';
import Dashboard from '../modules/dashboard/Dashboard';
import SinglePost from '../modules/singlePost/SinglePost';
import AppTopBar from '../common/components/AppBar';
import {
  readLocalStorage,
  removeLocalStorageItem,
  saveToLocalStorage
} from '../common/helpers';
import { USER_DATA } from '../common/enums';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      userToken: ''
    };
  }

  componentDidMount() {
    this.fetchUserToken();
  }

  fetchUserToken = () => {
    const userToken = readLocalStorage(USER_DATA.TOKEN);

    if (userToken) {
      this.setState({ userToken });
    }
  };

  handleLogin = userToken => {
    saveToLocalStorage(USER_DATA.TOKEN, { userToken });

    this.setState({ userToken });
  };

  handleLogout = () => {
    removeLocalStorageItem(USER_DATA.TOKEN);
    window.location.reload();
  };

  render() {
    const { userToken } = this.state;

    return (
      <div className="App">
        {!userToken ? (
          <>
            <Typography variant="h1" gutterBottom>
              Simple Web App
            </Typography>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <LoginForm onLogin={this.handleLogin} />}
              />
              <Redirect to="/" />
            </Switch>
          </>
        ) : (
          <>
            <AppTopBar onLogout={this.handleLogout} />
            <Switch>
              <Redirect from="/" exact to="/dashboard" />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/posts/:id" component={SinglePost} />
            </Switch>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(App);
