import React, { Fragment } from 'react';
import Users from './Users';
import Search from './Search';
import Clear from './Clear';

// exporting to App

const UsersMain = (props) => {

   const {throwAlert, users, clearUsers, searchUsers, loading} = props;
   
  return (
    <Fragment>
      <div className="container">
        <Search throwAlert={throwAlert} searchUsers={searchUsers} />
        <Clear users={users} clearUsers={clearUsers} />
        <Users loading={loading} users={users} />
      </div>
    </Fragment>
  );
};

export default UsersMain;
