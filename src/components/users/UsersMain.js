import React, { Fragment } from 'react';
import Users from './Users';
import Search from './Search';
import Clear from './Clear';


// exporting to App

const UsersMain = () => {

   
  return (
    <Fragment>
      <div className="container">
        <Search/>
        <Clear />
        <Users />
      </div>
    </Fragment>
  );
};

export default UsersMain;
