import React, { useState, useContext, useEffect } from 'react';
import GithubContext from '../../context/github/githubContext';

const Register = (props) => {
  const githubContext = useContext(GithubContext);
  const {
    throwAlert,
    register,
    clearErrors,
    error,
    isAuthenticated,
    owner
  } = githubContext;

  useEffect(() => {
      if(isAuthenticated && owner !== null){
          props.history.push('/');
      }
    if (error === 'User already exists') {
      throwAlert(`${error}`, 'danger');
      clearErrors();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // init local state
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    try {
      e.preventDefault();
      if (password !== password2) {
        throwAlert('Passwords must match', 'danger');
      } else {
        register({
          name,
          email,
          password,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // deconstruct to use in form
  const { name, email, password, password2 } = user;

  return (
    <div className="form-container">
      <h1>Make A New Account</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={onChange}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            required
            onChange={onChange}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Register;
