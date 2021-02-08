import React, { useContext } from 'react';
import RepoItem from './RepoItem';
import GithubContext from '../../context/github/githubContext';

//exporting to User

const Repos = () => {
  const githubContext = useContext(GithubContext);
  const { repos } = githubContext;

  return repos.map((repo) => {
    return <RepoItem repo={repo} key={repo.id} />;
  });
};

export default Repos;
