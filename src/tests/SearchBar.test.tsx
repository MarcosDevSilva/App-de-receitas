import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import * as ApiMeals from '../services/Meals/ApiMeals';
import * as ApiDrinks from '../services/Drinks/ApiDrinks';
import { dataMealsIngredientsChicken } from './helpers/mocks/data/Meals/dataMealsIngredientsChicken';
import { dataMealsCategories } from './helpers/mocks/data/Meals/dataMealsCategories';
import { dataDrinksIngredientsWater } from './helpers/mocks/data/Drinks/dataDrinksIngredientsWater';
import { dataDrinksCategories } from './helpers/mocks/data/Drinks/dataDrinksCategories';
import { dataDrinksNameWater } from './helpers/mocks/data/Drinks/dataDrinksNameWater';
import { dataMealsNameChicken } from './helpers/mocks/data/Meals/dataMealsNameChicken';
import { mockFetchMealsLetter } from './helpers/mocks/api/mockFetchMeals';
import { mockFetchDrinksLetter } from './helpers/mocks/api/mockFetchApiDrinks';
import { dataMealsLetterC } from './helpers/mocks/data/Meals/dataMealsLetterC';
import { dataDrinksLetterW } from './helpers/mocks/data/Drinks/dataDrinksLetterW';
import { dataMealsReturnEmpty } from './helpers/mocks/data/Meals/dataMealsReturnEmpty';
import { dataDrinksReturnEmpty } from './helpers/mocks/data/Drinks/dataDrinksReturnEmpty';

describe('<SearchBar />', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const headerButton = 'search-top-btn';
  const searchBarInput = 'search-input';
  const searchBarButton = 'exec-search-btn';
  const searchBarRadioIngredient = 'ingredient-search-radio';
  const searchBarRadioName = 'name-search-radio';
  const searchBarRadioLetter = 'first-letter-search-radio';
  const requestFail = 'Erro request failed.';
  const resquestEmpty = 'Sorry, we haven\'t found any recipes for these filters.';

  test('Verificar se a searchBar aparece na page Meals e faz a busca por ingredientes.', async () => {
    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    const mockSearchIngredients = vi.spyOn(ApiMeals, 'searchMealsIngredients');
    mockSearchIngredients.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const ingredientRadio = screen.getByTestId(searchBarRadioIngredient);
    const nameRadio = screen.getByTestId(searchBarRadioName);
    const letterRadio = screen.getByTestId(searchBarRadioLetter);
    const buttonSearch = screen.getByTestId(searchBarButton);

    expect(inputText).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    // verificar a chamada da api
    await user.click(buttonSearch);
    expect(mockSearchIngredients).toHaveBeenCalled();
  });

  test('Verificar se a searchBar aparece na page Drinks e faz a busca por ingredientes.', async () => {
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

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const ingredientRadio = screen.getByTestId(searchBarRadioIngredient);
    const nameRadio = screen.getByTestId(searchBarRadioName);
    const letterRadio = screen.getByTestId(searchBarRadioLetter);
    const buttonSearch = screen.getByTestId(searchBarButton);

    expect(inputText).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    // verificar a chamada da api
    await user.click(buttonSearch);
    expect(mockSearchIngredients).toHaveBeenCalled();
  });

  test('Verificar se a searchBar aparece na page Meals e faz a busca por nome.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsName as any);

    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    const mockSearchName = vi.spyOn(ApiMeals, 'searchMealsName');
    mockSearchName.mockImplementation(() => Promise.resolve(dataMealsNameChicken));

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const nameRadio = screen.getByTestId(searchBarRadioName);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'chicken');
    await user.click(nameRadio);
    await user.click(buttonSearch);

    expect(mockSearchName).toHaveBeenCalled();
  });

  test('Verificar se a searchBar aparece na page Drinks e faz a busca por nome.', async () => {
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

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const nameRadio = screen.getByTestId(searchBarRadioName);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'water');
    await user.click(nameRadio);
    await user.click(buttonSearch);

    expect(mockSearchName).toHaveBeenCalled();
  });

  test('Verificar se a searchBar aparece na page Meals e faz a busca por 1 letra no filtro letters.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsLetter as any);

    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    // const mockSearchLetter = vi.spyOn(ApiMeals, 'searchMealsFirstLetter');
    // mockSearchLetter.mockImplementation(() => Promise.resolve(dataMealsLetterC));
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsLetter as any);

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const letterRadio = screen.getByTestId(searchBarRadioLetter);
    const buttonSearch = screen.getByTestId(searchBarButton);
    await user.type(inputText, 'c');
    await user.click(letterRadio);
    await user.click(buttonSearch);

    expect(global.fetch).toHaveBeenCalled();
  });

  test('Verificar se a searchBar aparece na page Drinks e faz a busca por 1 letra no filtro letters.', async () => {
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

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const letterRadio = screen.getByTestId(searchBarRadioLetter);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'c');
    await user.click(letterRadio);
    await user.click(buttonSearch);

    expect(global.fetch).toHaveBeenCalled();
  });

  test('Verificar se a searchBar aparece na page Meals e faz a busca por mais de 1 letra no filtro letters.', async () => {
    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    const mockSearchLetter = vi.spyOn(ApiMeals, 'searchMealsFirstLetter');
    mockSearchLetter.mockImplementation(() => Promise.resolve(dataMealsLetterC));

    vi.spyOn(window, 'alert');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const letterRadio = screen.getByTestId(searchBarRadioLetter);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'chicken');
    await user.click(letterRadio);
    await user.click(buttonSearch);

    expect(alert).toBeCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    expect(mockSearchLetter).toBeCalledTimes(0);
  });

  test('Verificar se a searchBar aparece na page Drinks e faz a busca por mais de 1 letra no filtro letters.', async () => {
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

  test('Verificar se a searchBar aparece na page Meals e faz a busca por ingredientes no filtro ingredients e a requisição falha.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(Promise.reject);

    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    const mockSearchIngredients = vi.spyOn(ApiMeals, 'searchMealsIngredients');
    mockSearchIngredients.mockImplementation(() => Promise.reject());

    vi.spyOn(global.console, 'log');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

    await waitFor(() => {
      expect(mockInitial).toHaveBeenCalledTimes(1);
      expect(mockCategories).toHaveBeenCalledTimes(1);
    });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const ingredientRadio = screen.getByTestId(searchBarRadioIngredient);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'chicken');
    await user.click(ingredientRadio);
    await user.click(buttonSearch);

    expect(console.log).toBeCalledWith(requestFail);
  });

  test('Verificar se a searchBar aparece na page Drinks e faz a busca por engredientes no filtro ingredients e a requisição falha.', async () => {
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

  test('Verificar se a searchBar aparece na page Meals e faz a busca por  por nome no filtro name e a requisição falha.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(Promise.reject);

    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementationOnce(() => Promise.resolve(dataMealsIngredientsChicken));
    mockInitial.mockImplementationOnce(() => Promise.reject());
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    // const mockSearchIngredients = vi.spyOn(ApiMeals, 'searchMealsName');
    // mockSearchIngredients.mockImplementation(() => Promise.reject());

    vi.spyOn(global.console, 'log');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

    await waitFor(() => {
      expect(mockInitial).toHaveBeenCalledTimes(1);
      expect(mockCategories).toHaveBeenCalledTimes(1);
    });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const nameRadio = screen.getByTestId(searchBarRadioName);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'chicken');
    await user.click(nameRadio);
    await user.click(buttonSearch);

    expect(mockInitial).toHaveBeenCalledTimes(2);
    await waitFor(() => expect(console.log).toBeCalledWith(requestFail));
  });

  test('Verificar se a searchBar aparece na page Drinks e faz a busca por nome no filtro name e a requisição falha.', async () => {
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

  test('Verificar se a searchBar aparece na page Meals e faz a busca por 1 letra no filtro letters e a requisição falha.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(Promise.reject);

    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementationOnce(() => Promise.resolve(dataMealsIngredientsChicken));
    mockInitial.mockImplementationOnce(() => Promise.reject());
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsFirstLetter');
    mockCategories.mockImplementation(() => Promise.reject());

    vi.spyOn(global.console, 'log');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const letterRadio = screen.getByTestId(searchBarRadioLetter);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'c');
    await user.click(letterRadio);
    await user.click(buttonSearch);

    expect(console.log).toBeCalledWith(requestFail);
  });

  test('Verificar se a searchBar aparece na page Drinks e faz a busca por 1 letra no filtro letters e a requisição falha.', async () => {
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

  test('Verificar se a searchBar aparece na page Meals e faz a busca por ingredients no filtro ingredients e a api retorna [].', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsReturnEmpty as any);

    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    const mockSearchIngredients = vi.spyOn(ApiMeals, 'searchMealsIngredients');
    mockSearchIngredients.mockImplementation(() => Promise.resolve(dataMealsReturnEmpty));

    vi.spyOn(window, 'alert');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

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

  test('Verificar se a searchBar aparece na page Drinks e faz a busca por ingredients no filtro ingredients e a api retorna [].', async () => {
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

  test('Verificar se a searchBar aparece na page Meals e faz a busca por nome no filtro name e a api retorna [].', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsReturnEmpty as any);

    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    const mockSearchIngredients = vi.spyOn(ApiMeals, 'searchMealsName');
    mockSearchIngredients.mockImplementation(() => Promise.resolve(dataMealsReturnEmpty));

    vi.spyOn(window, 'alert');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const nameRadio = screen.getByTestId(searchBarRadioName);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'chicken');
    await user.click(nameRadio);
    await user.click(buttonSearch);

    expect(alert).toBeCalledTimes(2);
    expect(alert).toHaveBeenCalledWith(resquestEmpty);
  });

  test('Verificar se a searchBar aparece na page Drinks e faz a busca por nome no filtro name e a api retorna [].', async () => {
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

  test('Verificar se a searchBar aparece na page Meals e faz a busca por 1 letra no filtro letters e a api retorna [].', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsReturnEmpty as any);

    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    const mockSearchIngredients = vi.spyOn(ApiMeals, 'searchMealsFirstLetter');
    mockSearchIngredients.mockImplementation(() => Promise.resolve(dataMealsReturnEmpty));

    vi.spyOn(window, 'alert');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const letterRadio = screen.getByTestId(searchBarRadioLetter);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'c');
    await user.click(letterRadio);
    await user.click(buttonSearch);

    expect(alert).toBeCalledTimes(1);
    expect(alert).toHaveBeenCalledWith(resquestEmpty);
  });

  test('Verificar se a searchBar aparece na page Drinks e faz a busca por 1 letra no filtro letters e a api retorna [].', async () => {
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
});
