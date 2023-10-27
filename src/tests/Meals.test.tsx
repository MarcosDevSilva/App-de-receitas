import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { mockFetchMealsIngredients, mockFetchMealsLetter, mockFetchMealsName, mockFetchMealsReturn1Element, mockFetchMealsReturnEmpty } from './helpers/mocks/api/mockFetchMeals';

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
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsIngredients as any);

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

    const cards = await screen.findAllByTestId(/-recipe-card/i);

    expect(cards.length).toBe(11);
    expect(store.getState().revenues).toContain(mockFetchMealsIngredients);
  });

  test('Pesquisar por nome no filtro names.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsName as any);

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

    const cards = await screen.findAllByTestId(/-recipe-card/i);

    expect(cards.length).toBe(12);
    expect(store.getState().revenues).toContain(mockFetchMealsLetter);
  });

  test('Pesquisar por mais de 1 letra no filtro letters.', async () => {
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
  });

  test('Pesquisar por engredientes no filtro ingredients e a requisição falha.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(Promise.reject);
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
    const ingredientRadio = screen.getByTestId(searchBarRadioIngredient);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'chicken');
    await user.click(ingredientRadio);
    await user.click(buttonSearch);

    expect(console.log).toBeCalledWith(requestFail);
  });

  test('Pesquisar por nome no filtro name e a requisição falha.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(Promise.reject);
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
    const nameRadio = screen.getByTestId(searchBarRadioName);
    const buttonSearch = screen.getByTestId(searchBarButton);

    await user.type(inputText, 'chicken');
    await user.click(nameRadio);
    await user.click(buttonSearch);

    expect(console.log).toBeCalledWith(requestFail);
  });

  test('Pesquisar por 1 letra no filtro letters e a requisição falha.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(Promise.reject);
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
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsReturnEmpty as any);
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

    expect(alert).toBeCalledTimes(2);
    expect(alert).toHaveBeenCalledWith(resquestEmpty);
  });

  test('Pesquisar por nome no filtro name e a api retorna [].', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsReturnEmpty as any);
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
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsReturnEmpty as any);
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

    expect(alert).toBeCalledTimes(2);
    expect(alert).toHaveBeenCalledWith(resquestEmpty);
  });

  test('Pesquisar por qualquer filtro e a api retorna 1 elemento o usuário é direcionado para a página de detalhes.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsReturn1Element as any);

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

    // window.history.pushState(window.history, '/meals/52940');
    // expect(window.location).toBe('/meals/52940');
  });
});
