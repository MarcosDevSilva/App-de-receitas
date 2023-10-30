import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { mockFetchDrinksIngredients, mockFetchDrinksLetter, mockFetchDrinksName } from './helpers/mocks/api/mockFetchApiDrinks';
import * as ApiMeals from '../services/Meals/ApiMeals';
import * as ApiDrinks from '../services/Drinks/ApiDrinks';
import { dataDrinksIngredientsWater } from './helpers/mocks/data/Drinks/dataDrinksIngredientsWater';
import { dataDrinksCategories } from './helpers/mocks/data/Drinks/dataDrinksCategories';
import { dataDrinksReturn1Element } from './helpers/mocks/data/Drinks/dataDrinksReturn1Element';
import { dataOneDrinkDetails } from './helpers/mocks/data/Drinks/dataOneDrinkDetails';
import { dataMealsIngredientsChicken } from './helpers/mocks/data/Meals/dataMealsIngredientsChicken';
import { dataDrinksNameWater } from './helpers/mocks/data/Drinks/dataDrinksNameWater';
import { dataDrinksLetterW } from './helpers/mocks/data/Drinks/dataDrinksLetterW';
import { dataDrinksReturnEmpty } from './helpers/mocks/data/Drinks/dataDrinksReturnEmpty';

describe('<Drinks />', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const headerButton = 'search-top-btn';
  const searchBarInput = 'search-input';
  const searchBarButton = 'exec-search-btn';
  const searchBarRadioIngredient = 'ingredient-search-radio';
  const searchBarRadioName = 'name-search-radio';
  const searchBarRadioLetter = 'first-letter-search-radio';
  const requestFail = 'Erro request failed.';
  const resquestEmpty = 'Sorry, we haven\'t found any recipes for these filters.';

  test('Pesquisar por ingredientes no filtro ingredients.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinksIngredients as any);

    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));
    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));
    const mockSearchIngredients = vi.spyOn(ApiDrinks, 'searchDrinksIngredients');
    mockSearchIngredients.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user, store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const ingredientRadio = screen.getByTestId(searchBarRadioIngredient);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'water');
    await user.click(ingredientRadio);
    await user.click(buttonSearch);

    const cards = await screen.findAllByTestId(/-recipe-card/i);

    expect(cards.length).toBe(12);
    expect(store.getState().revenues).toContain(mockFetchDrinksIngredients);
  });

  test('Pesquisar por nome no filtro names.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinksName as any);

    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));
    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));
    const mockSearchName = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockSearchName.mockImplementation(() => Promise.resolve(dataDrinksNameWater));

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user, store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const nameRadio = screen.getByTestId(searchBarRadioName);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'water');
    await user.click(nameRadio);
    await user.click(buttonSearch);

    const cards = await screen.findAllByTestId(/-recipe-card/i);

    expect(cards.length).toBe(2);
    expect(store.getState().revenues).toContain(mockFetchDrinksName);
  });

  test('Pesquisar por 1 letra no filtro letters.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinksLetter as any);

    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));
    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));
    // const mockSearchLetter = vi.spyOn(ApiDrinks, 'searchDrinksFirstLetter');
    // mockSearchLetter.mockImplementation(() => Promise.resolve(dataDrinksLetterW));

    vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinksLetter as any);
    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user, store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const letterRadio = screen.getByTestId(searchBarRadioLetter);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'c');
    await user.click(letterRadio);
    await user.click(buttonSearch);
    // await waitFor(() => expect(mockSearchLetter).toHaveBeenCalledTimes(1));

    const cards = await screen.findAllByTestId(/-recipe-card/i);

    expect(cards.length).toBe(11);
    expect(store.getState().revenues).toContain(mockFetchDrinksLetter);
  });

  test('Pesquisar por mais de 1 letra no filtro letters.', async () => {
    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));
    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));
    const mockSearchLetter = vi.spyOn(ApiDrinks, 'searchDrinksFirstLetter');
    mockSearchLetter.mockImplementation(() => Promise.resolve(dataDrinksLetterW));

    vi.spyOn(window, 'alert');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const letterRadio = screen.getByTestId(searchBarRadioLetter);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'water');
    await user.click(letterRadio);
    await user.click(buttonSearch);

    expect(alert).toBeCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    expect(mockSearchLetter).toBeCalledTimes(0);
  });

  test('Pesquisar por engredientes no filtro ingredients e a requisição falha.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(Promise.reject);

    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));
    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));
    const mockSearchIngredients = vi.spyOn(ApiDrinks, 'searchDrinksIngredients');
    mockSearchIngredients.mockImplementation(() => Promise.reject());

    vi.spyOn(global.console, 'log');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const ingredientRadio = screen.getByTestId(searchBarRadioIngredient);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'water');
    await user.click(ingredientRadio);
    await user.click(buttonSearch);

    expect(console.log).toBeCalledWith(requestFail);
  });

  test('Pesquisar por nome no filtro name e a requisição falha.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(Promise.reject);

    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));
    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));
    const mockSearchIngredients = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockSearchIngredients.mockImplementation(() => Promise.reject());

    vi.spyOn(global.console, 'log');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const nameRadio = screen.getByTestId(searchBarRadioName);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'water');
    await user.click(nameRadio);
    await user.click(buttonSearch);

    expect(console.log).toBeCalledWith(requestFail);
  });

  test('Pesquisar por 1 letra no filtro letters e a requisição falha.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(Promise.reject);

    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));
    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));
    const mockSearchIngredients = vi.spyOn(ApiDrinks, 'searchDrinksFirstLetter');
    mockSearchIngredients.mockImplementation(() => Promise.reject());
    vi.spyOn(global.console, 'log');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const letterRadio = screen.getByTestId(searchBarRadioLetter);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'w');
    await user.click(letterRadio);
    await user.click(buttonSearch);

    expect(console.log).toBeCalledWith(requestFail);
  });

  test('Pesquisar por ingredients no filtro ingredients e a api retorna [].', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinksReturnEmpty as any);

    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));
    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));
    const mockSearchIngredients = vi.spyOn(ApiDrinks, 'searchDrinksIngredients');
    mockSearchIngredients.mockImplementation(() => Promise.resolve(dataDrinksReturnEmpty));

    vi.spyOn(window, 'alert');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const ingredientsRadio = screen.getByTestId(searchBarRadioIngredient);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'chicken');
    await user.click(ingredientsRadio);
    await user.click(buttonSearch);

    expect(alert).toBeCalledTimes(1);
    expect(alert).toHaveBeenCalledWith(resquestEmpty);
  });

  test('Pesquisar por nome no filtro name e a api retorna [].', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinksReturnEmpty as any);

    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));
    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));
    const mockSearchName = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockSearchName.mockImplementation(() => Promise.resolve(dataDrinksReturnEmpty));

    vi.spyOn(window, 'alert');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const nameRadio = screen.getByTestId(searchBarRadioName);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'water');
    await user.click(nameRadio);
    await user.click(buttonSearch);

    expect(alert).toBeCalledTimes(2);
    expect(alert).toHaveBeenCalledWith(resquestEmpty);
  });

  test('Pesquisar 1 letra no filtro letters e a api retorna [].', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinksReturnEmpty as any);

    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));
    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));
    const mockSearchLetter = vi.spyOn(ApiDrinks, 'searchDrinksFirstLetter');
    mockSearchLetter.mockImplementation(() => Promise.resolve(dataDrinksReturnEmpty));

    vi.spyOn(window, 'alert');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const letterRadio = screen.getByTestId(searchBarRadioLetter);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'w');
    await user.click(letterRadio);
    await user.click(buttonSearch);

    expect(alert).toBeCalledTimes(1);
    expect(alert).toHaveBeenCalledWith(resquestEmpty);
  });

  test('Pesquisar por qualquer filtro e a api retorna 1 elemento o usuário é direcionado para a página de detalhes.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementationOnce(mockFetchDrinksReturn1Element as any);

    // Drinks
    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));
    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));
    const mockSearchIngredients = vi.spyOn(ApiDrinks, 'searchDrinksIngredients');
    mockSearchIngredients.mockImplementation(() => Promise.resolve(dataDrinksReturn1Element));
    // Drinks Details
    const mockDrink = vi.spyOn(ApiDrinks, 'getDrink');
    mockDrink.mockImplementation(() => Promise.resolve(dataOneDrinkDetails));
    const mockRecommendations = vi.spyOn(ApiMeals, 'searchMealsRecommendations');
    mockRecommendations.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    await waitFor(() => {
      expect(mockInitial).toHaveBeenCalledTimes(1);
      expect(mockCategories).toHaveBeenCalledTimes(1);
    });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const ingredientsRadio = screen.getByTestId(searchBarRadioIngredient);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'water');
    await user.click(ingredientsRadio);
    await user.click(buttonSearch);

    // console.log(window.location.pathname);
    // screen.debug();
    // console.log(history.location.pathname);
    // window.history.pushState(window.history, '/meals/52940');
    // expect(window.location.pathname).toBe('/drinks/52940');

    await waitFor(() => {
      expect(mockDrink).toHaveBeenCalledTimes(1);
      // expect(mockRecommendations).toHaveBeenCalledTimes(1);
    });

    const title = await screen.findByTestId('recipe-title');
    expect(title.textContent).toBe('GG');
  });
});
