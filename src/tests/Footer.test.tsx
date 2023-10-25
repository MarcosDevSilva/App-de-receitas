import { screen } from '@testing-library/react';
import Footer from '../components/Footer';
import { renderWithRouter } from './helper/renderWithRouter';
import App from '../App';

test('01 - Os componentes redenrizam na tela', () => {
  renderWithRouter(<Footer />);
  const drinksBtn = screen.getByTestId('drinks-bottom-btn');
  const MealsBrt = screen.getByTestId('meals-bottom-btn');

  expect(drinksBtn).toBeInTheDocument();
  expect(MealsBrt).toBeInTheDocument();
});

test('02 - Os links redirecionam para as páginas corretas', async () => {
  const { user } = renderWithRouter(<App />, { route: '/meals' });
  const drinksBtn = screen.getByTestId('drinks-bottom-btn');
  const MealsBrt = screen.getByTestId('meals-bottom-btn');
  await user.click(drinksBtn);
  expect(window.location.pathname).toBe('/drinks');
  await user.click(MealsBrt);
  expect(window.location.pathname).toBe('/meals');
});
