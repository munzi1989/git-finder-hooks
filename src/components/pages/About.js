import React, { Fragment } from 'react';
// exporting to App
const About = () => {
  return (
    <Fragment>
      <h1>About this App</h1>
      <p>App to Search GitHub users</p>
      <p>Version 1.0.0</p>
      <br />
      <br />
      <h3>
        Using React's classes and local state data. Will refactor using
        functional components and hooks
      </h3>
    </Fragment>
  );
};

export default About;
