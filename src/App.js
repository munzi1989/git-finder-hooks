import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import UsersMain from './components/users/UsersMain';
import User from './components/users/User';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: [],
  };

  // Search for github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false, alert: null });
  };

  //Get single Guthub user // passes props to User componenent
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res);
    this.setState({ user: res.data, loading: false, alert: null });
  };

  //Get user repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:acs&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res);
    this.setState({ repos: res.data, loading: false, alert: null });
  };

  //Clear users searched for
  clearUsers = () => {
    this.setState({ users: [] });
  };

  //alert if nothing entered to search for
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
  };

  render() {
    const { user, users, loading, alert, repos } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Fragment>
                    <Alert alert={alert} />
                    <UsersMain
                      setAlert={this.setAlert}
                      searchUsers={this.searchUsers}
                      users={users}
                      clearUsers={this.clearUsers}
                      loading={loading}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    repos={repos}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
