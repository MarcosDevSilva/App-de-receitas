import { screen } from '@testing-library/react';
import Icon from '../components/Icon';
import { renderWithRouter } from './helpers/renderWith';

describe('<Icon />', () => {
  test('Dessert', () => {
    renderWithRouter(<Icon category="Dessert" />, { initialEntries: ['/meals'] });

    const icon = screen.getByAltText('Dessert');
    expect(icon).toBeInTheDocument();
  });

  test('Breakfast', () => {
    renderWithRouter(<Icon category="Breakfast" />, { initialEntries: ['/meals'] });

    const icon = screen.getByAltText('Breakfast');
    expect(icon).toBeInTheDocument();
  });

  test('Chicken', () => {
    renderWithRouter(<Icon category="Chicken" />, { initialEntries: ['/meals'] });

    const icon = screen.getByAltText('Chicken');
    expect(icon).toBeInTheDocument();
  });

  test('Beef', () => {
    renderWithRouter(<Icon category="Beef" />, { initialEntries: ['/meals'] });

    const icon = screen.getByAltText('Beef');
    expect(icon).toBeInTheDocument();
  });

  test('Goat', () => {
    renderWithRouter(<Icon category="Goat" />, { initialEntries: ['/meals'] });

    const icon = screen.getByAltText('Goat');
    expect(icon).toBeInTheDocument();
  });

  test('All Meals', () => {
    renderWithRouter(<Icon category="All" />, { initialEntries: ['/meals'] });

    const icon = screen.getByAltText('All');
    expect(icon).toBeInTheDocument();
  });

  test('Cocoa', () => {
    renderWithRouter(<Icon category="Cocoa" />, { initialEntries: ['/drinks'] });

    const icon = screen.getByAltText('Cocoa');
    expect(icon).toBeInTheDocument();
  });

  test('Ordinary drink', () => {
    renderWithRouter(<Icon category="Ordinary drink" />, { initialEntries: ['/drinks'] });

    const icon = screen.getByAltText('Ordinary drink');
    expect(icon).toBeInTheDocument();
  });

  test('Cocktail', () => {
    renderWithRouter(<Icon category="Cocktail" />, { initialEntries: ['/drinks'] });

    const icon = screen.getByAltText('Cocktail');
    expect(icon).toBeInTheDocument();
  });

  test('Shake', () => {
    renderWithRouter(<Icon category="Shake" />, { initialEntries: ['/drinks'] });

    const icon = screen.getByAltText('Shake');
    expect(icon).toBeInTheDocument();
  });

  test('Other/Unknown', () => {
    renderWithRouter(<Icon category="Other/Unknown" />, { initialEntries: ['/drinks'] });

    const icon = screen.getByAltText('Other/Unknown');
    expect(icon).toBeInTheDocument();
  });

  test('All Drinks', () => {
    renderWithRouter(<Icon category="All" />, { initialEntries: ['/drinks'] });

    const icon = screen.getByAltText('All');
    expect(icon).toBeInTheDocument();
  });
});
