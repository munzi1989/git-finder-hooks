import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Search = ({searchUsers, throwAlert}) => {
  //w/ hooks, define item followed by method
  const [text, setText] = useState('');

  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      throwAlert(' Please enter something', 'light');
    } else {
      searchUsers(text);
      setText('');
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
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    throwAlert: PropTypes.func.isRequired
  };

export default Search;
