import React, {useContext} from 'react';
import GithubContext from '../../context/github/githubContext';

const Clear = () => {

  const githubContext = useContext(GithubContext);
  const { users, clearUsers } = githubContext;
  
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


export default Clear;
