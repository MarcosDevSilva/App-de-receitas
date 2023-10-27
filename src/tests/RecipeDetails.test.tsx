import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import { mockFetchDrinkDetail } from './helpers/mocks/api/mockFetchApiDrinks';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { mockFetchMealDetail } from './helpers/mocks/api/mockFetchMeals';

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
  // const recommendationsId = /-recommendation-card/i;
  const recipeButtonId = 'start-recipe-btn';
  const drinkRote = '/drinks/15997';
  const mealRote = '/meals/52771';

  test('Verifique se as informações estão na tela para Drinks.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinkDetail as any);
    // .mockImplementationOnce(mockFetchMealsIngredients as any);

    renderWithRouterAndRedux(<App />, { initialEntries: [drinkRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const photo = await screen.findByTestId(photoId);
    // console.log(photo.contains);
    // const photo = await screen.findByAltText('meal thumb');
    const category = await screen.findByTestId(categoryId);
    const title = await screen.findByTestId(titleId);
    const ingredients = await screen.findAllByTestId(ingredientId);
    const instructions = await screen.findByTestId(instructionsId);
    // const recommendations = await screen.findAllByTestId(recommendationsId);

    expect(photo.src).toBe('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    expect(category.textContent).toBe('Optional alcohol');
    expect(title.textContent).toBe('GG');
    expect(ingredients).toHaveLength(3);
    const strInstructions = 'Pour the Galliano liqueur over ice. Fill the remainder of the';
    expect(instructions.textContent).toContain(strInstructions);
    // screen.debug();
    // expect(recommendations).toHaveLength(6);
  });

  test('Verifique se as informações estão na tela para Meals.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealDetail as any);
    // .mockImplementationOnce(mockFetchMealsIngredients as any);

    renderWithRouterAndRedux(<App />, { initialEntries: [mealRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const photo = await screen.findByTestId(photoId);
    // console.log(photo.contains);
    // const photo = await screen.findByAltText('meal thumb');
    const category = await screen.findByTestId(categoryId);
    const title = await screen.findByTestId(titleId);
    const ingredients = await screen.findAllByTestId(ingredientId);
    const instructions = await screen.findByTestId(instructionsId);
    const video = await screen.findByTestId('video');
    // const recommendations = await screen.findAllByTestId(recommendationsId);

    expect(photo.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(category.textContent).toBe('Vegetarian');
    expect(title.textContent).toBe('Spicy Arrabiata Penne');
    expect(ingredients).toHaveLength(8);
    const strInstructions = 'Bring a large pot of water to a boil.';
    expect(instructions.textContent).toContain(strInstructions);
    expect(video).toBeInTheDocument();
    // screen.debug();
    // expect(recommendations).toHaveLength(6);
  });

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

  test('Verifique o botão Start Recipe no Drink direciona para a rota de progresso.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinkDetail as any);

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [drinkRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const button = await screen.findByTestId(recipeButtonId);

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Start Recipe');

    await user.click(button);
    // console.log(window.location.pathname);
    // /drinks/15997/in-progress
    // expect;
  });

  test('Verifique o botão Start Recipe no Meal direciona para a rota de progresso.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinkDetail as any);

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [mealRote] });

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();

    const button = await screen.findByTestId(recipeButtonId);

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Start Recipe');

    await user.click(button);
    // console.log(window.location.pathname);
    // /drinks/15997/in-progress
    // expect;
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
