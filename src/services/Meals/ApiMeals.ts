const api = 'https://www.themealdb.com/api/json/v1/1/';

export const
  searchMealsIngredients = (ingr: string) => fetch(`${api}filter.php?i=${ingr}`)
    .then((response) => response.json())
    .then((data) => data);

export const searchMealsName = (name: string) => fetch(`${api}search.php?s=${name}`)
  .then((response) => response.json())
  .then((data) => data);

export const
  searchMealsFirstLetter = (letter: string) => fetch(`${api}search.php?f=${letter}`)
    .then((response) => response.json())
    .then((data) => data);

export const searchMealsRecommendations = () => fetch(`${api}search.php?s=`)
  .then((response) => response.json())
  .then((data) => data);
