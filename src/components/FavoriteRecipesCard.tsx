import { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getLocalData from '../helpers/getLocalData';
import { FavoriteRecipesCardType, LocalDataType } from '../types';

function FavoriteRecipesCard({ type, id }: FavoriteRecipesCardType) {
  const [alertVisible, setAlertVisible] = useState(false);
  const localData: LocalDataType = {
    doneRecipes: getLocalData('doneRecipes'),
    inProgressRecipes: getLocalData('inProgressRecipes'),
    favoriteRecipes: getLocalData('favoriteRecipes'),
  };
  const [isFavorite, setIsFavorite] = useState(
    localData.favoriteRecipes.some((recipe) => recipe.id === id),
  );

  const copyToClipboard = () => {
    const pathname = window.location.host;
    const url = `http://${pathname}/${type}s/${id}`;
    navigator.clipboard.writeText(url);
    setAlertVisible((prevState) => !prevState);
  };

  // const setToFavorites = () => {
  //   if (isFavorite) {
  //     const newFavList = localData.favoriteRecipes.filter((recipe) => recipe.id !== id);
  //     localStorage.setItem('favoriteRecipes', JSON.stringify(newFavList));
  //     setIsFavorite(false);
  //   } else {
  //     localStorage.setItem(
  //       'favoriteRecipes',
  //       JSON.stringify([...localData.favoriteRecipes, {
  //         id: isMeal ? details.idMeal : details.idDrink,
  //         type: isMeal ? 'meal' : 'drink',
  //         nationality: isMeal ? details.strArea : '',
  //         category: details.strCategory,
  //         alcoholicOrNot: isMeal ? '' : details.strAlcoholic,
  //         name: isMeal ? details.strMeal : details.strDrink,
  //         image: isMeal ? details.strMealThumb : details.strDrinkThumb,
  //       }]),
  //     );
  //     setIsFavorite(true);
  //   }
  // };

  return (
    <div>
      {alertVisible && <p>Link copiado!</p>}
      {getLocalData('favoriteRecipes').map((recipe: any, index: number) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
            style={ { width: '100px' } }
          />
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal' ? recipe.nationality : recipe.alcoholicOrNot}
            {' - '}
            {recipe.category}
          </p>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => copyToClipboard() }
          >
            <img
              src={ shareIcon }
              alt="share icon"
            />
          </button>
          <button>
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="Favorite Icon"
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipesCard;
