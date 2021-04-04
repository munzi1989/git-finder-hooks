import axios from 'axios';

// function to set token globally for axios
// instead of adding it manually for each request
const SetAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
  return <div></div>;
};

export default SetAuthToken;
