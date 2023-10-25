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
