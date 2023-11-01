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

describe('<RecipeDetails />', () => {
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });
  const photoId = 'recipe-photo';
  const categoryId = 'recipe-category';
  const titleId = 'recipe-title';
  const ingredientId = /-ingredient-name-and-measure/i;
  const instructionsId = 'instructions';
  const recommendationsId = /-recommendation-card/i;
  const recipeButtonId = 'start-recipe-btn';
  const drinkRote = '/drinks/15997';
  const mealRote = '/meals/52771';

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

  test('Verifique se as informações estão na tela para Drinks.', async () => {
    const mockDrink = vi.spyOn(ApiDrinks, 'getDrink');
    mockDrink.mockImplementation(() => Promise.resolve(dataOneDrinkDetails));
    // const mockRecommendations = vi.spyOn(ApiMeals, 'searchMealsRecommendations');
    // mockRecommendations.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsIngredients as any);

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

    // esperando pelo fetch dos recomendados
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    const recommendations = await screen.findAllByTestId(recommendationsId);
    expect(recommendations).toHaveLength(6);
  });

  test('Verifique se as informações estão na tela para Meals.', async () => {
    const mockMeal = vi.spyOn(ApiMeals, 'getMeal');
    mockMeal.mockImplementation(() => Promise.resolve(dataOneMealDetails));
    // const mockRecommendations = vi.spyOn(ApiDrinks, 'searchDrinksRecommendations');
    // mockRecommendations.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));

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

    // esperando pelo fetch dos recomendados
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const recommendations = await screen.findAllByTestId(recommendationsId);
    expect(recommendations).toHaveLength(6);
  });

  test('Verifique o botão Start Recipe no Drink direciona para a rota de progresso.', async () => {
    const mockDrink = vi.spyOn(ApiDrinks, 'getDrink');
    mockDrink.mockImplementationOnce(() => Promise.resolve(dataOneDrinkDetails));
    mockDrink.mockImplementationOnce(() => Promise.resolve(dataOneDrinkDetails));
    const mockRecommendations = vi.spyOn(ApiMeals, 'searchMealsRecommendations');
    mockRecommendations.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsIngredients as any);

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [drinkRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const button = await screen.findByTestId(recipeButtonId);

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Start Recipe');

    await user.click(button);

    const title = await screen.findByTestId(titleId);
    expect(title.textContent).toBe('GG');

    const buttonInProgress = await screen.findByTestId('finish-recipe-btn');
    expect(buttonInProgress).toBeInTheDocument();
    expect(buttonInProgress.textContent).toBe('Finish Recipe');
  });

  test('Verifique o botão Start Recipe no Meal direciona para a rota de progresso.', async () => {
    const mockMeal = vi.spyOn(ApiMeals, 'getMeal');
    mockMeal.mockImplementationOnce(() => Promise.resolve(dataOneMealDetails));
    mockMeal.mockImplementationOnce(() => Promise.resolve(dataOneMealDetails));
    const mockRecommendations = vi.spyOn(ApiDrinks, 'searchDrinksRecommendations');
    mockRecommendations.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));

    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinksIngredients as any);

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [mealRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const button = await screen.findByTestId(recipeButtonId);

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Start Recipe');

    await user.click(button);

    const buttonInProgress = await screen.findByTestId('finish-recipe-btn');
    expect(buttonInProgress).toBeInTheDocument();
    expect(buttonInProgress.textContent).toBe('Finish Recipe');
  });

  test('Favoritar o Drink e desfavoritar.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinkDetail as any);

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [drinkRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    expect(localStorage.getItem('favoriteRecipes')).toBe(null);

    const button = await screen.findByTestId('favorite-btn');
    await user.click(button);
    // console.log(localStorage.getItem('favoriteRecipes'));

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

  test('Verifique o botão Continue Recipe aparece na tela para Drinks.', async () => {
    const mockDrink = vi.spyOn(ApiDrinks, 'getDrink');
    mockDrink.mockImplementation(() => Promise.resolve(dataOneDrinkDetails));
    const mockRecommendations = vi.spyOn(ApiMeals, 'searchMealsRecommendations');
    mockRecommendations.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));

    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 15997: [] } }));

    renderWithRouterAndRedux(<App />, { initialEntries: [drinkRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const button = await screen.findByTestId(recipeButtonId);
    expect(button.textContent).toBe('Continue Recipe');
  });

  test('Verifique o botão Continue Recipe aparece na tela para Meals.', async () => {
    const mockMeal = vi.spyOn(ApiMeals, 'getMeal');
    mockMeal.mockImplementation(() => Promise.resolve(dataOneMealDetails));
    const mockRecommendations = vi.spyOn(ApiDrinks, 'searchDrinksRecommendations');
    mockRecommendations.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));

    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 52771: [] } }));

    renderWithRouterAndRedux(<App />, { initialEntries: [mealRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const button = await screen.findByTestId(recipeButtonId);
    expect(button.textContent).toBe('Continue Recipe');
  });

  test('Verifique o botão Continue Recipe e Start Recipe não aparece na receita concluida na tela para Drinks.', async () => {
    const mockDrink = vi.spyOn(ApiDrinks, 'getDrink');
    mockDrink.mockImplementation(() => Promise.resolve(dataOneDrinkDetails));
    const mockRecommendations = vi.spyOn(ApiMeals, 'searchMealsRecommendations');
    mockRecommendations.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));

    localStorage.setItem('doneRecipes', JSON.stringify([{ id: '15997' }]));

    renderWithRouterAndRedux(<App />, { initialEntries: [drinkRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const button = await screen.queryByTestId(recipeButtonId);
    expect(button).toBe(null);
  });

  test('Verifique o botão Continue Recipe e Start Recipe não aparece na receita concluida na tela para Meals.', async () => {
    const mockMeal = vi.spyOn(ApiMeals, 'getMeal');
    mockMeal.mockImplementation(() => Promise.resolve(dataOneMealDetails));
    const mockRecommendations = vi.spyOn(ApiDrinks, 'searchDrinksRecommendations');
    mockRecommendations.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));

    localStorage.setItem('doneRecipes', JSON.stringify([{ id: '52771' }]));

    renderWithRouterAndRedux(<App />, { initialEntries: [mealRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const button = await screen.queryByTestId(recipeButtonId);
    expect(button).toBe(null);
  });

  test('Clicar em uma das recomendações que estão na tela para Drinks e ser direcionado para a tela de Meals.', async () => {
    const mockDrink = vi.spyOn(ApiDrinks, 'getDrink');
    mockDrink.mockImplementation(() => Promise.resolve(dataOneDrinkDetails));
    // const mockRecommendationsMeals = vi.spyOn(ApiMeals, 'searchMealsRecommendations');
    // mockRecommendationsMeals.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsIngredients as any);

    const mockMeal = vi.spyOn(ApiMeals, 'getMeal');
    mockMeal.mockImplementation(() => Promise.resolve(dataMealsChooseRecommetation));
    const mockRecommendationsDrinks = vi.spyOn(ApiDrinks, 'searchDrinksRecommendations');
    mockRecommendationsDrinks.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));

    vi.spyOn(global, 'fetch').mockImplementationOnce(mockFetchDrinksIngredients as any);

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [drinkRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    // esperando pelo fetch dos recomendados
    // await waitFor(() => expect(mockRecommendationsMeals).toHaveBeenCalledTimes(1));
    const recommendations = await screen.findAllByTestId(recommendationsId);
    expect(recommendations).toHaveLength(6);
    await user.click(recommendations[1]);

    await waitFor(() => expect(mockMeal).toHaveBeenCalled());

    const title = await screen.findByTestId(titleId);
    expect(title.textContent).toBe('Chicken & mushroom Hotpot');
  });

  test('Clicar em uma das recomendações que estão na tela para Meals e ser direcioando para a tela de Drinks.', async () => {
    const mockMeal = vi.spyOn(ApiMeals, 'getMeal');
    mockMeal.mockImplementation(() => Promise.resolve(dataOneMealDetails));
    // const mockRecommendations = vi.spyOn(ApiDrinks, 'searchDrinksRecommendations');
    // mockRecommendations.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));
    vi.spyOn(global, 'fetch').mockImplementationOnce(mockFetchDrinksIngredients as any);

    const mockDrink = vi.spyOn(ApiDrinks, 'getDrink');
    mockDrink.mockImplementation(() => Promise.resolve(dataDrinksChooseRecommetation));

    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsIngredients as any);

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [mealRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    // esperando pelo fetch dos recomendados
    // await waitFor(() => expect(mockRecommendations).toHaveBeenCalledTimes(1));
    const recommendations = await screen.findAllByTestId(recommendationsId);
    expect(recommendations).toHaveLength(6);
    await user.click(recommendations[1]);
    await waitFor(() => expect(mockMeal).toHaveBeenCalled());

    const title = await screen.findByTestId(titleId);
    expect(title.textContent).toBe('Aloha Fruit punch');
  });
});
