import React, { Fragment, useContext, useState, useEffect } from 'react';
import UsersMain from '../users/UsersMain';
import GithubContext from '../../context/github/githubContext';
import Spinner from '../layout/Spinner';

const Home = (props) => {
  const githubContext = useContext(GithubContext);
  const { isAuthenticated, loading, favorites, loadUser, deleteFav} = githubContext;

  useEffect(() => {
    loadUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [owner] = useState(localStorage.getItem('owner') ? JSON.parse(localStorage.getItem('owner')) : null);
  const { name } = owner;

  if (loading) {
    return <Spinner />;
  }
  if (!loading && isAuthenticated && owner !== null) {
    return (
      <Fragment>
        <UsersMain />
        <div className="owner">
          <h3>Welcome back, {name} !</h3>
          <div>
            <h5>Your Favorite Repos: </h5>
            <div className="flex-item">
              {favorites.map((fav) => {
                return (
                  <Fragment key={fav._id}>
                    <a href={fav.url}>{fav.url}</a>{' '}
                    <button className='fa fa-trash btn btn-sm' onClick={(e) => {
                      deleteFav(fav._id);
                    }
                      }> Delete</button>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return null;
  }
};

export default Home;
