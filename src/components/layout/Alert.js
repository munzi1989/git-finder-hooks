import React, { useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

const Alert = () => {
  const githubContext = useContext(GithubContext);

  const { alert } = githubContext;

  if (alert === null) {
    return null;
  } else {
    return (
      <div className={`alert alert-${alert.types}`}>
        <div className="fas fa-info-circle">{alert.msg}</div>
      </div>
    );
  }
};

export default Alert;
