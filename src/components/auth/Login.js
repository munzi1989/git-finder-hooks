import React, { useContext, useState, useEffect } from 'react';
import GithubContext from '../../context/github/githubContext';
import Spinner from '../layout/Spinner';

const Login = (props) => {
  const githubContext = useContext(GithubContext);
  const { login, isAuthenticated, loading, owner } = githubContext;

  useEffect(() => {
    if (isAuthenticated && owner !== null) {
      props.history.push('/');
    }
  }, [props.history, isAuthenticated, owner]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSumbit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
    setUser({
      email: '',
      password: '',
    });
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="form-container">
        <h1>
          Welcome Back! <br />
          Please Login
        </h1>
        <form onSubmit={onSumbit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={onChange}
              minLength="6"
            />
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
};

export default Login;
