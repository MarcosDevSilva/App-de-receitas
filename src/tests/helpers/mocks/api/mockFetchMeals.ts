import { dataMealsLetterC } from '../data/Meals/dataMealsLetterC';
import { dataMealsNameChicken } from '../data/Meals/dataMealsNameChicken';
import { dataMealsReturn1Element } from '../data/Meals/dataMealsReturn1Element';
import { dataMealsReturnEmpty } from '../data/Meals/dataMealsReturnEmpty';
import { dataOneMealDetails } from '../data/Meals/dataOneMealDetails';
import { dataMealsIngredientsChicken } from '../data/Meals/dataMealsIngredientsChicken';
import { dataMealsAll } from '../data/Meals/dataMealsAll';
import { dataMealsCategories } from '../data/Meals/dataMealsCategories ';
import { dataMealsCategoryGoat } from '../data/Meals/dataMealsCategoryGoat';

export const mockFetchMealsIngredients = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataMealsIngredientsChicken),
});

export const mockFetchMealsName = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataMealsNameChicken),
});

export const mockFetchMealsLetter = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataMealsLetterC),
});

export const mockFetchMealsReturnEmpty = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataMealsReturnEmpty),
});

export const mockFetchMealsReturn1Element = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataMealsReturn1Element),
});

export const mockFetchMealDetail = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataOneMealDetails),
});

export const mockFetchMealsReturnAll = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataMealsAll),
});

export const mockFetchMealsCategories = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataMealsCategories),
});

export const mockFetchMealsPerCategories = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(dataMealsCategoryGoat),
});
