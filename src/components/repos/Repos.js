import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

//exporting to User

const Repos = ({ repos }) => {
  return repos.map((repo) => {
    return <RepoItem repo={repo} key={repo.id} />;
  });
};

Repos.protoTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
