import React from 'react';

const Clear = ({ users, clearUsers }) => {
  const onClick = () => {
    clearUsers();
  };

  if (users.length !== 0) {
    return (
      <div>
        <input
          type="button"
          value="Clear"
          className="btn btn-danger btn-block"
          onClick={onClick}
        />
      </div>
    );
  } else {
      return null;
  }
};

export default Clear;
