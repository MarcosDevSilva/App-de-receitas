import { useEffect, useState } from 'react';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import { FavoriteRecipeType } from '../types';
import DoneRecipesFilter from '../components/DoneRecipesFilter';
import styles from '../styles/FavoriteRecipesCard.module.css';

export default function FavoriteRecipes() {
  const [favoriteRecipesData, setFavoriteRecipesData] = useState([]);
  const [favoriteRecipesFilter, setFavoriteRecipesFilter] = useState('all');

  useEffect(() => {
    const data = localStorage.getItem('favoriteRecipes');
    const dataJSON = data ? JSON.parse(data) : [];
    setFavoriteRecipesData(dataJSON);
  }, []);

  const filterdata = (favoriteRecipesFilter === 'all')
    ? favoriteRecipesData
    : favoriteRecipesData
      .filter((item : FavoriteRecipeType) => item.type === favoriteRecipesFilter);

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFavoriteRecipesFilter(e.currentTarget.name);
  };

  const removeFavorite = (id: string) => {
    const favList = favoriteRecipesData.filter((recipe: any) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favList));
    setFavoriteRecipesData(favList);
  };

  return (
    <div className={ styles.cardContainer }>
      <DoneRecipesFilter handleFilter={ handleFilter } />
      { filterdata.length > 0 && filterdata.map(({ id, image, name, category,
        nationality, type, alcoholicOrNot }, index) => (
          <FavoriteRecipesCard
            key={ id }
            id={ id }
            img={ image }
            name={ name }
            category={ category }
            nationality={ nationality }
            index={ index }
            type={ type }
            alcoholicOrNot={ alcoholicOrNot }
            removeFavorite={ () => removeFavorite(id) }
          />))}
    </div>
  );
}

// {getLocalData('favoriteRecipes').map((recipe: any, index: number) => (
//   <div key={ recipe.id }>
//     <img
//       src={ recipe.image }
//       alt={ recipe.name }
//       data-testid={ `${index}-horizontal-image` }
//       style={ { width: '100px' } }
//     />
//     <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
//     <p data-testid={ `${index}-horizontal-top-text` }>
//       {recipe.type === 'meal' ? recipe.nationality : recipe.alcoholicOrNot}
//       {' - '}
//       {recipe.category}
//     </p>
//     <button
//       data-testid={ `${index}-horizontal-share-btn` }
//       onClick={ () => copyToClipboard() }
//     >
//       <img
//         src={ shareIcon }
//         alt="share icon"
//       />
//     </button>
//     <button>
//       <img
//         data-testid={ `${index}-horizontal-favorite-btn` }
//         src={ blackHeartIcon }
//         alt="Favorite Icon"
//       />
//     </button>
//   </div>
// ))}
// </div>
