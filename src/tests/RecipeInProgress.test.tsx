import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import { mockFetchDrinkDetail, mockFetchDrinksIngredients } from './helpers/mocks/api/mockFetchApiDrinks';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { mockFetchMealDetail, mockFetchMealsIngredients } from './helpers/mocks/api/mockFetchMeals';
import { dataMealsIngredientsChicken } from './helpers/mocks/data/Meals/dataMealsIngredientsChicken';
import * as ApiMeals from '../services/Meals/ApiMeals';
import * as ApiDrinks from '../services/Drinks/ApiDrinks';
import { dataOneMealDetails } from './helpers/mocks/data/Meals/dataOneMealDetails';
import { dataDrinksIngredientsWater } from './helpers/mocks/data/Drinks/dataDrinksIngredientsWater';
import { dataOneDrinkDetails } from './helpers/mocks/data/Drinks/dataOneDrinkDetails';
import { dataMealsChooseRecommetation } from './helpers/mocks/data/Meals/dataMealsChooseRecommetation';
import { dataDrinksChooseRecommetation } from './helpers/mocks/data/Drinks/dataDrinksChooseRecommetation';

describe('<RecipeInProgress />', () => {
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });
  const photoId = 'recipe-photo';
  const categoryId = 'recipe-category';
  const titleId = 'recipe-title';
  const ingredientId = /-ingredient-step/i;
  const instructionsId = 'instructions';
  const drinkRote = '/drinks/15997/in-progress';
  const mealRote = '/meals/52771/in-progress';

  test('Falha na resposta da api para retorna o Drink.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(Promise.reject);
    vi.spyOn(console, 'log');
    renderWithRouterAndRedux(<App />, { initialEntries: [drinkRote] });

    expect(console.log).toBeCalled();
  });

  test('Falha na resposta da api para retorna a Meal.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(Promise.reject);
    vi.spyOn(console, 'log');
    renderWithRouterAndRedux(<App />, { initialEntries: [mealRote] });

    expect(console.log).toBeCalled();
  });

  test.only('Verifique se as informações estão na tela para Drinks.', async () => {
    const mockDrink = vi.spyOn(ApiDrinks, 'getDrink');
    mockDrink.mockImplementation(() => Promise.resolve(dataOneDrinkDetails));

    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 15997: [] } }));
    renderWithRouterAndRedux(<App />, { initialEntries: [drinkRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const photo = await screen.findByTestId(photoId);
    const category = await screen.findByTestId(categoryId);
    const title = await screen.findByTestId(titleId);
    const ingredients = await screen.findAllByTestId(ingredientId);
    const instructions = await screen.findByTestId(instructionsId);

    expect(photo).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    expect(category.textContent).toBe('Optional alcohol');
    expect(title.textContent).toBe('GG');
    expect(ingredients).toHaveLength(3);
    const strInstructions = 'Pour the Galliano liqueur over ice. Fill the remainder of the';
    expect(instructions.textContent).toContain(strInstructions);
  });

  test('Verifique se as informações estão na tela para Meals.', async () => {
    const mockMeal = vi.spyOn(ApiMeals, 'getMeal');
    mockMeal.mockImplementation(() => Promise.resolve(dataOneMealDetails));

    vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinksIngredients as any);

    renderWithRouterAndRedux(<App />, { initialEntries: [mealRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const photo = await screen.findByTestId(photoId);

    const category = await screen.findByTestId(categoryId);
    const title = await screen.findByTestId(titleId);
    const ingredients = await screen.findAllByTestId(ingredientId);
    const instructions = await screen.findByTestId(instructionsId);
    const video = await screen.findByTestId('video');

    expect(photo).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(category.textContent).toBe('Vegetarian');
    expect(title.textContent).toBe('Spicy Arrabiata Penne');
    expect(ingredients).toHaveLength(8);
    const strInstructions = 'Bring a large pot of water to a boil.';
    expect(instructions.textContent).toContain(strInstructions);
    expect(video).toBeInTheDocument();
  });

  test('Favoritar o Drink e desfavoritar.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinkDetail as any);

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [drinkRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    expect(localStorage.getItem('favoriteRecipes')).toBe(null);

    const button = await screen.findByTestId('favorite-btn');
    await user.click(button);
    console.log(localStorage.getItem('favoriteRecipes'));

    expect(JSON.parse(localStorage.getItem('favoriteRecipes') as string) as Array<object>).toEqual(
      [
        { id: '15997',
          type: 'drink',
          nationality: '',
          category: 'Ordinary Drink',
          alcoholicOrNot: 'Optional alcohol',
          name: 'GG',
          image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg' },
      ],
    );
    expect(JSON.parse(localStorage.getItem('favoriteRecipes') as string)).toHaveLength(1);

    await user.click(button);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes') as string)).toHaveLength(0);
  });

  test('Favoritar o Meal e desfavoritar.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealDetail as any);

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [mealRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    expect(localStorage.getItem('favoriteRecipes')).toBe(null);

    const button = await screen.findByTestId('favorite-btn');
    await user.click(button);

    expect(JSON.parse(localStorage.getItem('favoriteRecipes') as string) as Array<object>).toEqual(
      [
        {
          id: '52771',
          type: 'meal',
          nationality: 'Italian',
          category: 'Vegetarian',
          alcoholicOrNot: '',
          name: 'Spicy Arrabiata Penne',
          image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        },
      ],
    );
    expect(JSON.parse(localStorage.getItem('favoriteRecipes') as string)).toHaveLength(1);

    await user.click(button);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes') as string)).toHaveLength(0);
  });

  test('Compartilhar o Drink.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinkDetail as any);

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [drinkRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const button = await screen.findByTestId('share-btn');
    await user.click(button);

    const link = await screen.findByText('Link copied!');
    expect(link).toBeInTheDocument();
  });

  test('Compartilhar o Meal.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealDetail as any);

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [mealRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const button = await screen.findByTestId('share-btn');
    await user.click(button);

    const link = await screen.findByText('Link copied!');
    expect(link).toBeInTheDocument();
  });
});
