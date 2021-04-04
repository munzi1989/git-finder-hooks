import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import SetAuthToken from '../../utils/SetAuthToken';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  CLEAR_USER,
  GET_REPOS,
  SET_ALERT,
  SEARCH_TEXT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESSFUL,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
  GET_FAVS,
  SAVE_FAVS,
  SET_FAVS,
  DELETE_FAV,
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    // user: {},
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : {},
    loading: false,
    alert: null,
    repos: [],
    text: '',
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false,
    error: null,
    owner: localStorage.getItem('owner'),
    favorites: [],
    favs: null,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // register user
  const register = async (FormData) => {
    setLoading();
    // add headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('api/users', FormData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      console.log('Registered User!');
      // load user after register is successful
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
      console.error(err);
    }
  };

  //  LOAD USER,
  const loadUser = async () => {
    setLoading();
    // if valid token, set user token to use globally for axios
    if (localStorage.token) {
      SetAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      loadFavs();
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
      console.error(err.message);
    }
  };

  const loadFavs = async () => {
    setLoading();
    // if valid token, set user token to use globally for axios
    if (localStorage.token) {
      SetAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/repos');
      dispatch({
        type: GET_FAVS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
      console.error(err.message);
    }
  };

  const saveFavs = async () => {
    // if valid token, set user token to use globally for axios
    setLoading();
    if (localStorage.token) {
      SetAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/repos', state.favs, config);
      console.log(res);
      dispatch({
        type: SAVE_FAVS,
      });
      loadFavs();
      throwAlert('Favorite Saved!', 'success');
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
      console.error(err.message);
    }
  };

  const deleteFav = async (id) => {
    setLoading();
    // if valid token, set user token to use globally for axios
    if (localStorage.token) {
      SetAuthToken(localStorage.token);
    }

    try {
      const res = await axios.delete(`/api/repos/${id}`);
      dispatch({
        type: DELETE_FAV,
        payload: id,
      });
      console.log(res);
      throwAlert(`Repo Removed`, 'success');
      loadFavs();
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
      console.error(err.message);
    }
  };

  //  LOGIN
  const login = async (FormData) => {
    setLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth', FormData, config);
      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: res.data,
      });
      // load user after register is successful
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ERRORS,
        });
      }, 5000);
    }
  };

  //  LOGOUT
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  // search Text
  const searchText = (e) => {
    dispatch({
      type: SEARCH_TEXT,
      payload: e,
    });
  };

  const setFavs = (obj) => {
    dispatch({
      type: SET_FAVS,
      payload: obj,
    });
    if (state.favs !== null) {
      saveFavs();
    }
  };

  // Search Users
  const searchUsers = async (searchText) => {
    setLoading();
    delete axios.defaults.headers.common['x-auth-token'];
    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchText}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    if (localStorage.token) {
      SetAuthToken(localStorage.token);
    }

    // Always need a type: <TYPE-NAME> and payload: <res.data>
    // dispatch object including those items
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User
  //Get single Guthub user // passes props to User component
  const getUser = async (username) => {
    setLoading();
    delete axios.defaults.headers.common['x-auth-token'];

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    localStorage.setItem('user', JSON.stringify(res.data));
    if (localStorage.token) {
      SetAuthToken(localStorage.token);
    }

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  const clearUser = () => {
    dispatch({
      type: CLEAR_USER,
    });
  };

  // Get repos
  //Get user repos //passes props to Repos
  const getUserRepos = async (username) => {
    setLoading();

    delete axios.defaults.headers.common['x-auth-token'];
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=created:acs&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    if (localStorage.token) {
      SetAuthToken(localStorage.token);
    }

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  //Clear users searched for
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
    });
  };

  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  //   ALERT
  const throwAlert = (msg, types) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, types },
    });
    // remove alert bu setting state to null after 5 sec
    setTimeout(() => {
      dispatch({
        type: SET_ALERT,
        payload: null,
      });
      dispatch({
        type: CLEAR_ERRORS,
        payload: null,
      });
    }, 5000);
  };

  return (
    <GithubContext.Provider
      value={{
        text: state.text,
        alert: state.alert,
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        setLoading,
        searchUsers,
        clearUsers,
        throwAlert,
        searchText,
        getUser,
        clearUser,
        getUserRepos,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        owner: state.owner,
        favorites: state.favorites,
        favs: state.favs,
        register,
        login,
        logout,
        loadUser,
        clearErrors,
        saveFavs,
        setFavs,
        deleteFav,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
