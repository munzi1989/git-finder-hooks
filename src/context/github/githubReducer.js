import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  SET_ALERT,
  SEARCH_TEXT,
} from '../types';

// A reducer is just a function
const Reducer = (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return { ...state, users: action.payload, loading: false };

    case GET_USER:
      return { ...state, user: action.payload, loading: false };

    case GET_REPOS:
      return { ...state, repos: action.payload, loading: false };

    case SET_LOADING:
      return {
        //   make copy of state before changing state
        // copy state w/ spread operator
        ...state,
        //   change state
        loading: true,
      };

    case SET_ALERT:
      return { ...state, alert: action.payload };

    case CLEAR_USERS:
      return { ...state, users: [], loading: false };

    case SEARCH_TEXT:
      return { ...state, text: action.payload };

    default:
      return state;
  }
};

export default Reducer;
