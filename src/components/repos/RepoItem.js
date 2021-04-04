import React, { useState, useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

//exporting to Repos

const RepoItem = ({ repo }) => {
  const githubContext = useContext(GithubContext);
  const { setFavs, favorites} = githubContext;

  const [color, setColor] = useState('grey');

  const onClick = () => {
    if (color === 'grey') {
      setColor('gold');
    }
    setFavs({
      url: repo.html_url,
      owner: repo.owner.html_url,
    });

  };

  // useEffect(()=> {
  //   if(favs!=={}){
  //     saveFavs();
  //   }
  // },[favs])

  return (
    <Fragment>
      <div className="favorite-card">
        <h3>
          <a href={repo.html_url}>{repo.name} </a>
        </h3>

        <i
          style={{ backgroundColor: color }}
          className="fa fa-star-o badge btn scale"
          aria-hidden="true"
          onClick={onClick}
        >
          {' '}
          {favorites.filter((x) => x.html_url === repo.html_url)
            ? color === 'gold' && <span>Saved to Favorites</span>
            : color === 'grey'}
        </i>
      </div>
    </Fragment>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;
