import React, { useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const { throwAlert, text, searchText, searchUsers } = githubContext;

  // update text state as characters are entered to search
  const onChange = (e) => searchText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      throwAlert(' Please enter something', 'light');
    } else {
      // search users using text state
      searchUsers(text);
      // set text state to empty string after search
      searchText('');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
    </div>
  );
};

export default Search;
