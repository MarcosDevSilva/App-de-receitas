import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('<SearchBar />', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(Promise.resolve);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Verificar se a searchBar aparece na page Meals.', async () => {
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const buttonShowSerachBar = screen.getByTestId('search-top-btn');
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    expect(inputText).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    // verificar a chamada da api
    await user.click(buttonSearch);
    expect(global.fetch).toHaveBeenCalled();
  });

  test('Verificar se a searchBar aparece na page Drinks.', async () => {
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const buttonShowSerachBar = screen.getByTestId('search-top-btn');
    await user.click(buttonShowSerachBar);

    const inputText = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    expect(inputText).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    // verificar a chamada da api
    await user.click(buttonSearch);
    expect(global.fetch).toHaveBeenCalled();
  });
});
