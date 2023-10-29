import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import Icon from '../components/Icon';
import { renderWithRouter } from './helpers/renderWith';

describe('<Icon />', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  const drinksRote = '/drinks/15997';
  const mealsRote = '/meals/52771';
  test('Dessert', () => {
    renderWithRouter(<Icon category="Dessert" />, { initialEntries: ['meals'] });

    const icon = screen.getByAltText('Dessert');
    expect(icon).toBeInTheDocument();
  });

  test('Breakfast', async () => {
    renderWithRouter(<Icon category="Breakfast" />, { initialEntries: [mealsRote] });

    screen.debug();
    const icon = screen.getByAltText('Breakfast');
    expect(icon).toBeInTheDocument();
  });

  test('Chicken', () => {
    renderWithRouter(<Icon category="Chicken" />, { initialEntries: [mealsRote] });

    const icon = screen.getByAltText('Chicken');
    expect(icon).toBeInTheDocument();
  });

  test('Beef', () => {
    renderWithRouter(<Icon category="Beef" />, { initialEntries: [mealsRote] });

    const icon = screen.getByAltText('Beef');
    expect(icon).toBeInTheDocument();
  });

  test('Goat', () => {
    renderWithRouter(<Icon category="Goat" />, { initialEntries: [mealsRote] });

    const icon = screen.getByAltText('Goat');
    expect(icon).toBeInTheDocument();
  });

  test('All Meals', () => {
    renderWithRouter(<Icon category="All" />, { initialEntries: [mealsRote] });

    const icon = screen.getByAltText('All');
    expect(icon).toBeInTheDocument();
  });

  test('Cocoa', () => {
    renderWithRouter(<Icon category="Cocoa" />, { initialEntries: [drinksRote] });

    const icon = screen.getByAltText('Cocoa');
    expect(icon).toBeInTheDocument();
  });

  test('Ordinary Drink', () => {
    renderWithRouter(<Icon category="Ordinary Drink" />, { initialEntries: [drinksRote] });

    const icon = screen.getByAltText('Ordinary Drink');
    expect(icon).toBeInTheDocument();
  });

  test('Cocktail', () => {
    renderWithRouter(<Icon category="Cocktail" />, { initialEntries: [drinksRote] });

    const icon = screen.getByAltText('Cocktail');
    expect(icon).toBeInTheDocument();
  });

  test('Shake', () => {
    renderWithRouter(<Icon category="Shake" />, { initialEntries: [drinksRote] });

    const icon = screen.getByAltText('Shake');
    expect(icon).toBeInTheDocument();
  });

  test('Other / Unknown', () => {
    renderWithRouter(<Icon category="Other / Unknown" />, { initialEntries: [drinksRote] });

    const icon = screen.getByAltText('Other / Unknown');
    expect(icon).toBeInTheDocument();
  });

  test('All Drinks', () => {
    renderWithRouter(<Icon category="All" />, { initialEntries: [drinksRote] });

    const icon = screen.getByAltText('All');
    expect(icon).toBeInTheDocument();
  });
});
