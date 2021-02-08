import React, { useEffect, useContext, Fragment } from 'react';
import Repos from '../repos/Repos';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const { user, getUser, loading, getUserRepos, repos } = githubContext;

  // if you want to run a method/function once, use 'useEffect'
  // with empty brackets to use once
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
    company,
  } = user;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link to={'/'} className="btn btn-dark">
            Back to search
          </Link>
          <p className="text-right" style={{ display: 'inline-block' }}>
            Hireable {''}
            {hireable ? (
              <i className="fas fa-check text-success" />
            ) : (
              <i className="fas fa-times-circle text-danger" />
            )}
          </p>
        </div>

        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt="Avatar"
              className="round-img"
              style={{ width: '120px' }}
            />
            <h1>{name}</h1>
            {location && <p>Location: {location}</p>}
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio:</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a
              style={{ display: 'table-cell' }}
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Check Out Profile
            </a>

            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong>
                    {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Public Repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <h3 className="text-center">Recent Repositories</h3>
        <Repos repos={repos} />
      </Fragment>
    );
  }
};

export default User;
