/* eslint-disable react/jsx-max-depth */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import styles from '../styles/FavoriteRecipesCard.module.css';
import { FavoriteRecipesCardType } from '../types';

function FavoriteRecipesCard({ id, img, name, category,
  nationality, index, type, alcoholicOrNot, removeFavorite }: FavoriteRecipesCardType) {
  const [shared, setShared] = useState(false);

  const copyToClipboard = () => {
    const pathname = window.location.host;
    const url = `http://${pathname}/${type}s/${id}`;
    navigator.clipboard.writeText(url);
    setShared((prevState) => !prevState);
  };

  return (
    <div className={ styles.container } id={ id }>
      <Link to={ `../${type}s/${id}` }>
        <img
          src={ img }
          alt={ name }
          className={ styles.img }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className={ styles.content }>
        <div className={ styles.headercontent }>
          <Link
            to={ `../${type}s/${id}` }
            className={ styles.title }
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </Link>
          { (type === 'meal') && (
            <p
              className={ styles.category }
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${nationality} - ${category}`}
            </p>
          )}
          { (type === 'drink') && (
            <p
              className={ styles.category }
              data-testid={ `${index}-horizontal-top-text` }
            >
              {alcoholicOrNot}
            </p>
          )}
        </div>
        <div>
          <button
            className={ styles.buttons }
            onClick={ () => copyToClipboard() }
          >
            {!shared && <img
              src={ shareIcon }
              alt="Share Recipe"
              className={ styles.icon }
              data-testid={ `${index}-horizontal-share-btn` }
            />}
            {shared && <span className={ styles.copied }>Link copied!</span>}
          </button>
          <button className={ styles.buttons } onClick={ () => removeFavorite(id) }>
            <img
              src={ blackHeartIcon }
              alt="heart"
              data-testid={ `${index}-horizontal-favorite-btn` }
              className={ styles.icon }
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FavoriteRecipesCard;
