import { LocalDataType } from '../types';

export const isFavorites = (
  isFavorite: boolean,
  obj: { isMeal: boolean, id: string },
  details: { idMeal?: string, idDrink?: string, strArea?: string, strCategory?:string,
    strAlcoholic?: string, strMeal?: string, strDrink?: string, strMealThumb?: string,
    strDrinkThumb?: string },
  localData: LocalDataType,
) => {
  if (isFavorite) {
    const newFavList = localData.favoriteRecipes.filter((recipe) => recipe.id !== obj.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavList));
    return false;
  }
  localStorage.setItem(
    'favoriteRecipes',
    JSON.stringify([...localData.favoriteRecipes, {
      id: obj.isMeal ? details.idMeal : details.idDrink,
      type: obj.isMeal ? 'meal' : 'drink',
      nationality: obj.isMeal ? details.strArea : '',
      category: details.strCategory,
      alcoholicOrNot: obj.isMeal ? '' : details.strAlcoholic,
      name: obj.isMeal ? details.strMeal : details.strDrink,
      image: obj.isMeal ? details.strMealThumb : details.strDrinkThumb,
    }]),
  );
  return true;
};

export const copyInProgress = (
  isMeal: boolean,
  id: string,
  setAlertVisible: (value: boolean) => void,
) => {
  const url = isMeal ? `http://localhost:3000/meals/${id}` : `http://localhost:3000/drinks/${id}`;
  navigator.clipboard.writeText(url);
  setAlertVisible(true);
  setTimeout(() => setAlertVisible(false), 2000);
};

/* const setToFavorites = () => {
    if (isFavorite) {
      const newFavList = localData.favoriteRecipes.filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavList));
      setIsFavorite(false);
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...localData.favoriteRecipes, {
          id: isMeal ? details.idMeal : details.idDrink,
          type: isMeal ? 'meal' : 'drink',
          nationality: isMeal ? details.strArea : '',
          category: details.strCategory,
          alcoholicOrNot: isMeal ? '' : details.strAlcoholic,
          name: isMeal ? details.strMeal : details.strDrink,
          image: isMeal ? details.strMealThumb : details.strDrinkThumb,
        }]),
      );
      setIsFavorite(true);
    }
  }; */

/* const handleCopy = () => {
    const url = isMeal ? `http://localhost:3000/meals/${id}` : `http://localhost:3000/drinks/${id}`;
    navigator.clipboard.writeText(url);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 2000);
  }; */
