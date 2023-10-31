import { vi } from 'vitest';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/dom';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import * as ApiMeals from '../services/Meals/ApiMeals';
import * as ApiDrinks from '../services/Drinks/ApiDrinks';
import { dataMealsCategories } from './helpers/mocks/data/Meals/dataMealsCategories';
import { dataMealsAll } from './helpers/mocks/data/Meals/dataMealsAll';
import { dataMealsCategoryGoat } from './helpers/mocks/data/Meals/dataMealsCategoryGoat';
import { mockFetchDrinksCategories, mockFetchDrinksPerCategories, mockFetchDrinksReturnAll } from './helpers/mocks/api/mockFetchApiDrinks';
import { dataDrinksCategories } from './helpers/mocks/data/Drinks/dataDrinksCategories';
import { dataDrinksAll } from './helpers/mocks/data/Drinks/dataDrinksAll';
import { dataDrinksCategoryCocktail } from './helpers/mocks/data/Drinks/dataDrinksCategoryCocktail';

describe('<Recipes /> MEALS', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const goatFilterBtn = 'Goat-category-filter';
  const beefFilterBtn = 'Beef-category-filter';
  const chickenFilterBtn = 'Chicken-category-filter';
  const dessertFilterBtn = 'Dessert-category-filter';
  const breakfastFilterBtn = 'Breakfast-category-filter';
  const AllFilterBtn = 'All-category-filter';
  const requestFail = 'Erro request failed.';

  test('Testar se renderiza as 12 primeiras receitas de comidas', async () => {
    // vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsReturnAll as any);
    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsAll));
    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });
    await waitForElementToBeRemoved(() => screen.getByAltText('loading'));
    const recipeMeal1 = screen.getByTestId('0-card-img');
    const recipeMeal12 = screen.getByTestId('11-card-img');
    const recipeMealQty = await screen.findAllByTestId(/-recipe-card/i);

    expect(recipeMeal1).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    expect(recipeMeal12).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/4er7mj1598733193.jpg');
    expect(recipeMealQty[0]).toHaveTextContent(/corba/i);
    expect(recipeMealQty[11]).toHaveTextContent(/koshari/i);
    expect(recipeMealQty.length).toBe(12);
  });

  test('Testar se renderiza as 6 categorias de Comida ', async () => {
    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsCategories));
    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });
    const AllBtn = screen.getByTestId(AllFilterBtn);
    await waitFor(() => {
      const BeefBtn = screen.getByTestId(beefFilterBtn);
      expect(BeefBtn).toBeInTheDocument();
    });

    const breakfastBtn = screen.getByTestId(breakfastFilterBtn);
    const chickenBtn = screen.getByTestId(chickenFilterBtn);
    const dessertBtn = screen.getByTestId(dessertFilterBtn);
    const goatBtn = screen.getByTestId(goatFilterBtn);
    const categoryQty = await screen.findAllByTestId(/-category-filter/i);

    expect(AllBtn).toBeInTheDocument();
    expect(breakfastBtn).toBeInTheDocument();
    expect(chickenBtn).toBeInTheDocument();
    expect(dessertBtn).toBeInTheDocument();
    expect(goatBtn).toBeInTheDocument();
    expect(categoryQty.length).toBe(6);
  });

  test('Testar click na categoria Goat', async () => {
    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsAll));
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    const mockCategoryGoat = vi.spyOn(ApiMeals, 'searchMealsPerCategorie');
    mockCategoryGoat.mockImplementation(() => Promise.resolve(dataMealsCategoryGoat));

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });
    await waitForElementToBeRemoved(() => screen.getByAltText('loading'));
    const recipeMealQty = await screen.findAllByTestId(/-recipe-card/i);
    expect(recipeMealQty.length).toBe(12);
    expect(recipeMealQty[0]).toHaveTextContent(/corba/i);

    await waitFor(() => {
      expect(screen.getByTestId(goatFilterBtn)).toBeInTheDocument();
    });
    const goatBtn = screen.getByTestId(goatFilterBtn);
    await user.click(goatBtn);

    const recipeGoatQty = await screen.findAllByTestId(/-recipe-card/i);
    expect(recipeGoatQty.length).toBe(1);
    expect(recipeGoatQty[0]).toHaveTextContent(/mbuzi choma/i);
  });

  test('Testar se click All volta a lista inicial', async () => {
    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsAll));
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    const mockCategoryGoat = vi.spyOn(ApiMeals, 'searchMealsPerCategorie');
    mockCategoryGoat.mockImplementation(() => Promise.resolve(dataMealsCategoryGoat));

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });
    await waitForElementToBeRemoved(() => screen.getByAltText('loading'));

    await waitFor(() => {
      expect(screen.getByTestId(goatFilterBtn)).toBeInTheDocument();
    });
    const goatBtn = screen.getByTestId(goatFilterBtn);
    const AllBtn = screen.getByTestId(AllFilterBtn);
    await user.click(goatBtn);

    const recipeGoatQty = await screen.findAllByTestId(/-recipe-card/i);
    expect(recipeGoatQty.length).toBe(1);
    expect(recipeGoatQty[0]).toHaveTextContent(/mbuzi choma/i);
    await user.click(AllBtn);
    const recipeMealQty = await screen.findAllByTestId(/-recipe-card/i);
    expect(recipeMealQty.length).toBe(12);
    expect(recipeMealQty[0]).toHaveTextContent(/corba/i);
    expect(recipeMealQty[11]).toHaveTextContent(/koshari/i);
  });

  test('Testar se click Toggle apaga e lista ao inicial', async () => {
    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsAll));
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    const mockCategoryGoat = vi.spyOn(ApiMeals, 'searchMealsPerCategorie');
    mockCategoryGoat.mockImplementation(() => Promise.resolve(dataMealsCategoryGoat));

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });
    await waitForElementToBeRemoved(() => screen.getByAltText('loading'));

    await waitFor(() => {
      expect(screen.getByTestId(goatFilterBtn)).toBeInTheDocument();
    });
    const goatBtn = screen.getByTestId(goatFilterBtn);
    await user.click(goatBtn);

    const recipeGoatQty = await screen.findAllByTestId(/-recipe-card/i);
    expect(recipeGoatQty.length).toBe(1);
    expect(recipeGoatQty[0]).toHaveTextContent(/mbuzi choma/i);
    await user.click(goatBtn);
    const recipeMealQty = await screen.findAllByTestId(/-recipe-card/i);
    expect(recipeMealQty.length).toBe(12);
    expect(recipeMealQty[0]).toHaveTextContent(/corba/i);
    expect(recipeMealQty[11]).toHaveTextContent(/koshari/i);
  });

  test('Click na categoria e API falha', async () => {
    const mockInitial = vi.spyOn(ApiMeals, 'searchMealsName');
    mockInitial.mockImplementation(() => Promise.resolve(dataMealsAll));
    const mockCategories = vi.spyOn(ApiMeals, 'searchMealsCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataMealsCategories));
    const mockCategoryGoat = vi.spyOn(ApiMeals, 'searchMealsPerCategorie');
    mockCategoryGoat.mockImplementation(Promise.reject);

    vi.spyOn(global.console, 'log');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'], initialState: state });

    await waitForElementToBeRemoved(() => screen.getByAltText('loading'));

    await waitFor(() => {
      expect(screen.getByTestId(goatFilterBtn)).toBeInTheDocument();
    });
    const goatBtn = screen.getByTestId(goatFilterBtn);
    await user.click(goatBtn);

    expect(console.log).toBeCalledWith(requestFail);
  });
});

describe('<Recipes /> DRINKS', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const ordinaryFilterBtn = 'Ordinary Drink-category-filter';
  const cocktailFilterBtn = 'Cocktail-category-filter';
  const shakeFilterBtn = 'Shake-category-filter';
  const otherFilterBtn = 'Other / Unknown-category-filter';
  const cocoaFilterBtn = 'Cocoa-category-filter';
  const AllFilterBtn = 'All-category-filter';
  const requestFail = 'Erro request failed.';

  test('Testar se renderiza as 12 primeiras receitas de drinks', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinksReturnAll as any);
    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });
    await waitForElementToBeRemoved(() => screen.getByAltText('loading'));
    const recipeMeal1 = screen.getByTestId('0-card-img');
    const recipeMeal12 = screen.getByTestId('11-card-img');
    const recipeMealQty = await screen.findAllByTestId(/-recipe-card/i);

    expect(recipeMeal1).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    expect(recipeMeal12).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg');
    expect(recipeMealQty[0]).toHaveTextContent(/gg/i);
    expect(recipeMealQty[11]).toHaveTextContent(/acid/i);
    expect(recipeMealQty.length).toBe(12);
  });

  test('Testar se renderiza as 6 categorias de Dinks ', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinksCategories as any);

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });
    const AllBtn = screen.getByTestId(AllFilterBtn);
    await waitFor(() => {
      const ordinatyBtn = screen.getByTestId(ordinaryFilterBtn);
      expect(ordinatyBtn).toBeInTheDocument();
    });

    const cocktailBtn = screen.getByTestId(cocktailFilterBtn);
    const shakeBtn = screen.getByTestId(shakeFilterBtn);
    const otherBtn = screen.getByTestId(otherFilterBtn);
    const cocoaBtn = screen.getByTestId(cocoaFilterBtn);
    const categoryQty = await screen.findAllByTestId(/-category-filter/i);

    expect(AllBtn).toBeInTheDocument();
    expect(cocktailBtn).toBeInTheDocument();
    expect(shakeBtn).toBeInTheDocument();
    expect(otherBtn).toBeInTheDocument();
    expect(cocoaBtn).toBeInTheDocument();
    expect(categoryQty.length).toBe(6);
  });

  test('Testar click na categoria Cocktail', async () => {
    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksAll));

    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));

    vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinksPerCategories as any);

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });
    await waitForElementToBeRemoved(() => screen.getByAltText('loading'));
    const recipeMealQty = await screen.findAllByTestId(/-recipe-card/i);
    expect(recipeMealQty.length).toBe(12);
    expect(recipeMealQty[0]).toHaveTextContent(/gg/i);

    await waitFor(() => {
      expect(screen.getByTestId(cocktailFilterBtn)).toBeInTheDocument();
    });
    const cocktailBtn = screen.getByTestId(cocktailFilterBtn);
    await user.click(cocktailBtn);

    const recipeGoatQty = await screen.findAllByTestId(/-recipe-card/i);
    expect(recipeGoatQty.length).toBe(12);
    expect(recipeGoatQty[0]).toHaveTextContent(/155 belmont/i);
  });

  test('Testar se click All volta a lista inicial', async () => {
    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksAll));

    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));

    const mockCategoryGoat = vi.spyOn(ApiDrinks, 'searchDrinksPerCategorie');
    mockCategoryGoat.mockImplementation(() => Promise.resolve(dataDrinksCategoryCocktail));

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });
    await waitForElementToBeRemoved(() => screen.getByAltText('loading'));

    await waitFor(() => {
      expect(screen.getByTestId(cocktailFilterBtn)).toBeInTheDocument();
    });
    const cocktailBtn = screen.getByTestId(cocktailFilterBtn);
    const AllBtn = screen.getByTestId(AllFilterBtn);
    await user.click(cocktailBtn);

    const recipeGoatQty = await screen.findAllByTestId(/-recipe-card/i);
    expect(recipeGoatQty[0]).toHaveTextContent(/155 belmont/i);
    await user.click(AllBtn);
    const recipeMealQty = await screen.findAllByTestId(/-recipe-card/i);
    expect(recipeMealQty.length).toBe(12);
    expect(recipeMealQty[0]).toHaveTextContent(/gg/i);
    expect(recipeMealQty[11]).toHaveTextContent(/acid/i);
  });

  test('Testar se click Toggle apaga e lista ao inicial', async () => {
    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksAll));

    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));

    const mockCategoryCocktail = vi.spyOn(ApiDrinks, 'searchDrinksPerCategorie');
    mockCategoryCocktail.mockImplementation(() => Promise.resolve(dataDrinksCategoryCocktail));

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });
    await waitForElementToBeRemoved(() => screen.getByAltText('loading'));

    await waitFor(() => {
      expect(screen.getByTestId(cocktailFilterBtn)).toBeInTheDocument();
    });
    const cocktailBtn = screen.getByTestId(cocktailFilterBtn);
    await user.click(cocktailBtn);

    const recipeGoatQty = await screen.findAllByTestId(/-recipe-card/i);
    expect(recipeGoatQty.length).toBe(12);
    expect(recipeGoatQty[0]).toHaveTextContent(/155 belmont/i);
    expect(recipeGoatQty[11]).toHaveTextContent(/absolutly screwed up/i);
    await user.click(cocktailBtn);
    const recipeMealQty = await screen.findAllByTestId(/-recipe-card/i);
    expect(recipeMealQty.length).toBe(12);
    expect(recipeMealQty[0]).toHaveTextContent(/gg/i);
    expect(recipeMealQty[11]).toHaveTextContent(/acid/i);
  });

  test('Click na categoria e API falha', async () => {
    const mockInitial = vi.spyOn(ApiDrinks, 'searchDrinksName');
    mockInitial.mockImplementation(() => Promise.resolve(dataDrinksAll));

    const mockCategories = vi.spyOn(ApiDrinks, 'searchDrinksCategories');
    mockCategories.mockImplementation(() => Promise.resolve(dataDrinksCategories));

    const mockCategoryCocktail = vi.spyOn(ApiDrinks, 'searchDrinksPerCategorie');
    mockCategoryCocktail.mockImplementation(Promise.reject);

    vi.spyOn(global.console, 'log');

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });

    await waitForElementToBeRemoved(() => screen.getByAltText('loading'));

    await waitFor(() => {
      expect(screen.getByTestId(cocktailFilterBtn)).toBeInTheDocument();
    });
    const cocktailBtn = screen.getByTestId(cocktailFilterBtn);
    await user.click(cocktailBtn);

    expect(console.log).toBeCalledWith(requestFail);
  });
});
