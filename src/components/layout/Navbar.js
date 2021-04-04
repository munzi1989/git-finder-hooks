import React, { useContext } from 'react';
import {withRouter, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

// exporting to App

const Navbar = ({ icon, title }, ...props) => {

  let history = useHistory();

  const githubContext = useContext(GithubContext);
  const { logout, isAuthenticated } = githubContext;

  const onClick = () => {
    logout();
    history.push('/login');
  };
  if (isAuthenticated) {
    return (
      <nav className="navbar bg-primary">
        <i className={icon}> {title}</i>

        <ul className="">
          <li>
            <Link to="/" onClick={onClick}>
              Logout
            </Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navbar bg-primary">
        <i className={icon}> {title}</i>
        <ul className="">
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    );
  }
};

Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default withRouter(Navbar);
