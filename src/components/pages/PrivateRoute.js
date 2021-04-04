import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const githubContext = useContext(GithubContext);
  const { isAuthenticated, loading } = githubContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
