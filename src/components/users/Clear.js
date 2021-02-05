import React from 'react';
import PropTypes from 'prop-types';

const Clear = ({ users, clearUsers }) => {
  
  if (users.length !== 0) {
    return (
      <div>
        <input
          type="button"
          value="Clear"
          className="btn btn-danger btn-block"
          onClick={clearUsers}
        />
      </div>
    );
  } else {
    return null;
  }
};

Clear.propTypes = {
  users: PropTypes.array.isRequired,
  clearUsers: PropTypes.func.isRequired,
};

export default Clear;
