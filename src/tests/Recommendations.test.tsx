import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import { mockFetchMealsIngredients } from './helpers/mocks/api/mockFetchMeals';
import { renderWithRouter } from './helpers/renderWith';
import Recommendations from '../components/Recommendations';

describe.skip('<Recommendations />', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Verificar as lista de recomendados na RecipeDetails na roda de /drinks/:id.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchMealsIngredients as any);
    // renderWithRouterAndRedux(<Recommendations />);
    renderWithRouter(<Recommendations />, { initialEntries: ['/drinks/1223'] });
    const recommendations = await screen.findAllByTestId(/-recommendation-card/i);

    expect(recommendations).toHaveLength(6);
  });
});
