import { dataDrinksAll } from '../data/Drinks/dataDrinksAll';
import { dataDrinksCategories } from '../data/Drinks/dataDrinksCategories';
import { dataDrinksCategoryCocktail } from '../data/Drinks/dataDrinksCategoryCocktail';
import { dataDrinksIngredientsWater } from '../data/Drinks/dataDrinksIngredientsWater';
import { dataDrinksLetterW } from '../data/Drinks/dataDrinksLetterW';
import { dataDrinksNameWater } from '../data/Drinks/dataDrinksNameWater';
import { dataDrinksReturn1Element } from '../data/Drinks/dataDrinksReturn1Element';
import { dataDrinksReturnEmpty } from '../data/Drinks/dataDrinksReturnEmpty';

export const mockFetchDrinksIngredients = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataDrinksIngredientsWater),
});

export const mockFetchDrinksName = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataDrinksNameWater),
});

export const mockFetchDrinksLetter = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataDrinksLetterW),
});

export const mockFetchDrinksReturnEmpty = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataDrinksReturnEmpty),
});

export const mockFetchDrinksReturn1Element = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataDrinksReturn1Element),
});

export const mockFetchDrinksReturnAll = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataDrinksAll),
});

export const mockFetchDrinksCategories = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataDrinksCategories),
});

export const mockFetchDrinksPerCategories = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataDrinksCategoryCocktail),
});
