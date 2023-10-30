import { vi } from 'vitest';
import { screen, waitForElementToBeRemoved } from '@testing-library/dom';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('<Recipes />', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Testar se renderiza as 12 primeiras receitas de comidas', async () => {
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
    // const recipeMealQuantite = screen.findAllByTestId(/~recipe-card/i);
    const recipeMeal1Text = screen.getByTestId('0-card-name');
    const recipeMeal12Text = screen.getByTestId('11-card-name');

    expect(recipeMeal1).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    expect(recipeMeal12).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/4er7mj1598733193.jpg');
    expect(recipeMeal1Text).toHaveTextContent(/Corba/i);
    expect(recipeMeal12Text).toHaveTextContent(/koshari/i);
  });
  test('Testar se renderiza as 12 primeiras receitas de drinks', async () => {
    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'], initialState: state });
    await waitForElementToBeRemoved(() => screen.getByAltText('loading'));
    const recipeDrink1 = screen.getByTestId('0-card-img');
    const recipeDrinkl12 = screen.getByTestId('11-card-img');
    // const recipeMealQuantite = screen.findAllByTestId(/~recipe-card/i);
    const recipeDrink1Text = screen.getByTestId('0-card-name');
    const recipeDrinkl12Text = screen.getByTestId('11-card-name');

    expect(recipeDrink1).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    expect(recipeDrinkl12).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg');
    expect(recipeDrink1Text).toHaveTextContent(/GG/i);
    expect(recipeDrinkl12Text).toHaveTextContent(/ACID/i);
  });
});
