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

export const
  searchMealsCategories = () => fetch(`${api}list.php?c=list`)
    .then((response) => response.json())
    .then((data) => data);

export const
  searchMealsPerCategorie = (categorie: string) => fetch(
    `${api}filter.php?c=${categorie}`,
  )
    .then((response) => response.json())
    .then((data) => data);
