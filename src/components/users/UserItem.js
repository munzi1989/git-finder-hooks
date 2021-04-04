import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {useContext} from 'react';
import '../../App.css';
import GithubContext from '../../context/github/githubContext';

//exporting UserItem to Users.js

const UserItem = ({ user: { login, avatar_url } }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, getUserRepos } = githubContext;
  let history = useHistory();

  const delay = (e) => {
    e.preventDefault();
    getUser(login);
    getUserRepos(login);
    setTimeout(() => {
      history.push(`/user/${login}`);
    }, 1000);
  };

  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt="User"
        className="round-img"
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>
      <button className="btn-dark btn-sm my-1" onClick={delay}>
        More
      </button>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
