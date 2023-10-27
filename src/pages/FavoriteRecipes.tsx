import { useState } from 'react';
import getLocalData from '../helpers/getLocalData';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [currentFoodType, setCurrentFoodType] = useState('');

  // Those 2 functions simply does not work and I don't know why
  const handleCopy = (id: number) => {
    handleDrinkOrMeal({ type: currentFoodType });
    navigator.clipboard.writeText(`http://localhost:3000/${currentFoodType}/${id}`);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 2000);
  };

  const handleDrinkOrMeal = (item: any) => {
    setCurrentFoodType(item.type);
  };

  return (
    <div>
      <h1>Favorite Recipes</h1>
      {alertVisible && <p>Link copiado!</p>}
      <div>
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
              onClick={ () => handleCopy(recipe.id) }
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
    </div>
  );
}
