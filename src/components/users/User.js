import React, { Component, Fragment } from 'react';
import Repos from '../repos/Repos';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
  };

  render() {
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
    } = this.props.user;

    const { loading, repos } = this.props;

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
              <a href={html_url} className="btn btn-dark my-1">
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
                      <strong>Website: </strong> <Link to={blog}>{blog}</Link>
                    </Fragment>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="card text-center">
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-light">
              Public Repos: {public_repos}
            </div>
            <div className="badge badge-dark">Public Gists: {public_gists}</div>
          </div>
          <h3 className="text-center">Recent Repositories</h3>
          <Repos repos={repos} />
        </Fragment>
      );
    }
  }
}

export default User;
