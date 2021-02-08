import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import NotFound from './components/pages/NotFound';
import './App.css';

const App = () => {
  return (
    <GithubState>
      <Router>
        <div className="App">
          {/* NAVBAR */}
          <Navbar />
          <div className="container">
            <Switch>
              {/* HOME PAGE */}
              <Route exact path="/" component={Home} />
              {/* ABOUT PAGE */}
              <Route exact path="/about" component={About} />
              {/* USER ENDPOINT  */}
              <Route
                exact
                path="/user/:login"
                component={User}
              />
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

// exporting to "root" div in index.html
export default App;
