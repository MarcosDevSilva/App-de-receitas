import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { mockFetchMealsIngredients, mockFetchMealsLetter, mockFetchMealsName } from './helpers/mocks/api/mockFetchMeals';
import * as ApiMeals from '../services/Meals/ApiMeals';
import * as ApiDrinks from '../services/Drinks/ApiDrinks';
import { dataMealsCategories } from './helpers/mocks/data/Meals/dataMealsCategories ';
import { dataMealsReturn1Element } from './helpers/mocks/data/Meals/dataMealsReturn1Element';
import { dataOneMealDetails } from './helpers/mocks/data/Meals/dataOneMealDetails';
import { dataDrinksIngredientsWater } from './helpers/mocks/data/Drinks/dataDrinksIngredientsWater';
import { dataMealsIngredientsChicken } from './helpers/mocks/data/Meals/dataMealsIngredientsChicken';
import { dataMealsNameChicken } from './helpers/mocks/data/Meals/dataMealsNameChicken';
import { dataMealsLetterC } from './helpers/mocks/data/Meals/dataMealsLetterC';
import { dataMealsReturnEmpty } from './helpers/mocks/data/Meals/dataMealsReturnEmpty';

describe('<Meals />', () => {
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

  test('Pesquisar por ingredientes no filtro ingredients.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsIngredients as any);

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

    const { user, store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const ingredientRadio = screen.getByTestId(searchBarRadioIngredient);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'chicken');
    await user.click(ingredientRadio);
    await user.click(buttonSearch);

    await waitFor(() => expect(mockSearchIngredients).toHaveBeenCalledTimes(1));
    const cards = await screen.findAllByTestId(/-recipe-card/i);

    expect(cards.length).toBe(11);
    expect(store.getState().revenues).toContain(mockFetchMealsIngredients);
  });

  test('Pesquisar por nome no filtro names.', async () => {
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

    const { user, store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const nameRadio = screen.getByTestId(searchBarRadioName);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'chicken');
    await user.click(nameRadio);
    await user.click(buttonSearch);

    const cards = await screen.findAllByTestId(/-recipe-card/i);

    expect(cards.length).toBe(12);
    expect(store.getState().revenues).toContain(mockFetchMealsName);
  });

  test('Pesquisar por 1 letra no filtro letters.', async () => {
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

    const { user, store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

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
    screen.debug();

    expect(cards.length).toBe(12);
    expect(store.getState().revenues).toContain(mockFetchMealsLetter);
  });

  test('Pesquisar por mais de 1 letra no filtro letters.', async () => {
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

  test('Pesquisar por ingredientes no filtro ingredients e a requisição falha.', async () => {
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

  test('Pesquisar por nome no filtro name e a requisição falha.', async () => {
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

  test('Pesquisar por 1 letra no filtro letters e a requisição falha.', async () => {
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

  test('Pesquisar por ingredients no filtro ingredients e a api retorna [].', async () => {
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

  test('Pesquisar por nome no filtro name e a api retorna [].', async () => {
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

  test('Pesquisar 1 letra no filtro letters e a api retorna [].', async () => {
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

  test('Pesquisar por qualquer filtro e a api retorna 1 elemento o usuário é direcionado para a página de detalhes.', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsReturn1Element as any);
    // Meals
    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsIngredientsChicken));
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    const mockSearchIngredients = vi.spyOn(ApiMeals, 'searchMealsIngredients');
    mockSearchIngredients.mockImplementation(() => Promise.resolve(dataMealsReturn1Element));
    // Meal Details
    const mockMeal = vi.spyOn(ApiMeals, 'getMeal');
    mockMeal.mockImplementation(() => Promise.resolve(dataOneMealDetails));
    const mockRecommendations = vi.spyOn(ApiDrinks, 'searchDrinksRecommendations');
    mockRecommendations.mockImplementation(() => Promise.resolve(dataDrinksIngredientsWater));

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
    // const loading = await screen.findByAltText('loading');
    // await waitFor(() => expect(loading).toHaveBeenCalledTimes(1));
    // await waitFor(async () => waitForElementToBeRemoved(loading));
    // console.log(window.location.pathname);

    const buttonShowSerachBar = screen.getByTestId(headerButton);
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId(searchBarInput);
    const ingredientsRadio = screen.getByTestId(searchBarRadioIngredient);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'chicken');
    await user.click(ingredientsRadio);
    await user.click(buttonSearch);

    // window.history.pushState(window.history, '/meals/52940');
    // expect(window.location.pathname).toBe('/meals/52940');
    await waitFor(() => {
      expect(mockMeal).toHaveBeenCalledTimes(1);
      // expect(mockRecommendations).toHaveBeenCalledTimes(1);
    });

    const title = await screen.findByTestId('recipe-title');
    expect(title.textContent).toBe('Spicy Arrabiata Penne');
    screen.debug();
  });
});
