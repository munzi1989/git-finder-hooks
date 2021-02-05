import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import UsersMain from './components/users/UsersMain';
import User from './components/users/User';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search for github users
  const searchUsers = async (text) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUsers(res.data.items);
    setLoading(false);
  };

  //Get single Guthub user // passes props to User componenent
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUser(res.data);
    setLoading(false);
  };

  //Get user repos //passes props to Repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:acs&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  //Clear users searched for //exporting to Clear
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  //alert if nothing entered to search for
  const throwAlert = (msg, type) => {
    setAlert({ msg, type });
  }

  return (
    <Router>
      <div className="App">
        {/* NAVBAR */}
        <Navbar />
        <div className="container">
          <Switch>
            {/* HOME PAGE */}
            <Route
              exact
              path="/"
              render={() => (
                <Fragment>
                  <Alert alert={alert} />
                  <UsersMain
                    throwAlert={throwAlert}
                    searchUsers={searchUsers}
                    users={users}
                    clearUsers={clearUsers}
                    loading={loading}
                  />
                </Fragment>
              )}
            />
            {/* ABOUT PAGE */}
            <Route exact path="/about" component={About} />
            {/* USER ENDPOINT  */}
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
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
};



// exporting to "root" div in index.html
export default App;