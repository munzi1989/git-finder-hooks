import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
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
  SET_FAVS,
  SAVE_FAVS,
  DELETE_FAV,
  CLEAR_USER
} from '../types';

// A reducer is just a function
const Reducer = (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return { ...state, users: action.payload, loading: false };

    case GET_FAVS:
      return { ...state, favorites: action.payload, loading: false };

    case SET_FAVS:
      return { ...state, favs: action.payload, loading: false };

    case SAVE_FAVS:
      return { ...state, favs: null, loading: false };

    case DELETE_FAV:
      return {
        ...state,
        favorites: state.favorites.filter((x) => x._id !== action.payload),
        loading: false,
      };

    case GET_USER:
      return { ...state, user: action.payload, loading: false };

      case CLEAR_USER:
        return { ...state, user: {}, repos: [], loading: false }

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

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESSFUL:
      // store token in local browser storage
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case USER_LOADED:
      localStorage.setItem('owner', JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        owner: JSON.parse(localStorage.getItem('owner')),
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      //   if failed auth || register || login, remove token form local storage
      // set state to default
      localStorage.removeItem('token');
      localStorage.removeItem('owner');
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        loading: false,
        user: {},
        users: [],
        owner: null,
        isAuthenticated: false,
        error: action.payload,
        repos: [],
        favorites: [],
        favs: {},
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default Reducer;
