import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  SET_ALERT,
  SEARCH_TEXT,
} from '../types';


let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
    let githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    let githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
     let githubClientId = process.env.GITHUB_CLIENT_ID;
     let githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {

    
  const initialState = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
    text: '',
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // search Text
  const searchText = (e) => {
    dispatch({
      type: SEARCH_TEXT,
      payload: e,
    });
  };

  // Search Users
  const searchUsers = async (searchText) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchText}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    // Always need a type: <TYPE-NAME> and payload: <res.data>
    // dispatch object including those items
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User
  //Get single Guthub user // passes props to User componenent
  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Get repos
  //Get user repos //passes props to Repos
  const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:acs&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

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
        searchUsers,
        clearUsers,
        throwAlert,
        searchText,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
