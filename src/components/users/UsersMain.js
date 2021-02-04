import React, { Fragment } from 'react';
import Users from './Users';
import Search from './Search';
import Clear from './Clear';


const UsersMain = (props) => {

   const {setAlert, users, clearUsers, searchUsers, loading} = props;
   
  return (
    <Fragment>
      <div className="container">
        <Search setAlert={setAlert} searchUsers={searchUsers} />
        <Clear users={users} clearUsers={clearUsers} />
        <Users loading={loading} users={users} />
      </div>
    </Fragment>
  );
};

export default UsersMain;
