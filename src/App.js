import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';
import User from './components/users/User';
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import PrivateRoute from './components/pages/PrivateRoute';
import SetAuthToken from './utils/SetAuthToken';
import GithubState from './context/github/GithubState';
import NotFound from './components/pages/NotFound';
import './App.css';

const App = () => {
  // if valid token, store globally for axios use
  // rather than hard-coding each time
  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />

          <div className="container">
            <Alert />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <PrivateRoute exact path="/user/:login" component={User} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

// exporting to "root" div in index.html
export default App;
