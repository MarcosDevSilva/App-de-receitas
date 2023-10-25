import { screen } from '@testing-library/react';
import Footer from '../components/Footer';
import { renderWithRouterAndRedux } from './helpers/renderWith';

test('01 - Os componentes redenrizam na tela', () => {
  renderWithRouterAndRedux(<Footer />);
  const drinksBtn = screen.getByTestId('drinks-bottom-btn');
  const MealsBrt = screen.getByTestId('meals-bottom-btn');

  expect(drinksBtn).toBeInTheDocument();
  expect(MealsBrt).toBeInTheDocument();
});

// test('02 - Os links redirecionam para as páginas corretas', async () => {
//   const route = renderWithRouter(<App />, { initialEntries: ['/meals'] });
//   const drinksBtn = screen.getByTestId('drinks-bottom-btn');
//   const MealsBrt = screen.getByTestId('meals-bottom-btn');

//   await userEvent.click(drinksBtn);
//   // expect()).toBe('/drinks');
//   await userEvent.click(MealsBrt);
//   expect(route.location.pathname).toBe('/meals');
// });
