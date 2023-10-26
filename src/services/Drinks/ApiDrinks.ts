const api = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const
  searchDrinksIngredients = (ingr: string) => fetch(`${api}filter.php?i=${ingr}`)
    .then((response) => response.json())
    .then((data) => data);

export const searchDrinksName = (name: string) => fetch(`${api}search.php?s=${name}`)
  .then((response) => response.json())
  .then((data) => data);

export const
  searchDrinksFirstLetter = (letter: string) => fetch(`${api}search.php?f=${letter}`)
    .then((response) => response.json())
    .then((data) => data);

export const searchDrinksRecommendations = () => fetch(`${api}/search.php?s=`)
  .then((response) => response.json())
  .then((data) => data);
