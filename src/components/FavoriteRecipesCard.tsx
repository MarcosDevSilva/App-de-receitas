import { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import getLocalData from '../helpers/getLocalData';
import styles from '../styles/DoneRecipesCard.module.css';
import { FavoriteRecipesCardType } from '../types';

function FavoriteRecipesCard({ id, img, name, category,
  nationality, index, type, alcoholicOrNot, removeFavorite }: FavoriteRecipesCardType) {
  const [shared, setShared] = useState(false);
  // const [favorited, setFavorited] = useState(getLocalData('favoriteRecipes'));
  // // const [isFavorite, setIsFavorite] = useState(
  // //   localData.favoriteRecipes.some((recipe: any) => recipe.id === id),
  // // );
  // console.log(favorited);
  const copyToClipboard = () => {
    const pathname = window.location.host;
    const url = `http://${pathname}/${type}s/${id}`;
    navigator.clipboard.writeText(url);
    setShared((prevState) => !prevState);
  };

  // const removeFavorite = () => {
  //   const favList = favorited.filter((recipe: any) => recipe.id !== id);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(favList));
  //   setFavorited(favList);
  // };

  return (
    <div className={ styles.container } id={ id }>
      <div>
        <Link to={ `../${type}s/${id}` }>
          <img
            src={ img }
            alt={ name }
            className={ styles.img }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
      </div>
      <div className={ styles.content }>
        <div className={ styles.header }>
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
          <button
            className={ styles.sharebutton }
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
          <button className={ styles.sharebutton } onClick={ () => removeFavorite(id) }>
            <img
              src={ blackHeartIcon }
              alt="heart"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FavoriteRecipesCard;
