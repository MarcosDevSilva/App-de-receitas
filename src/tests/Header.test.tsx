import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const pageTitleId = 'page-title';
const profileBtnId = 'profile-top-btn';
const searchBtnId = 'search-top-btn';

describe('Implemente o header de acordo com a necessidade de cada tela', () => {
  test('Rota "/": não possui header', () => {
    renderWithRouterAndRedux(<App />);

    const title = screen.queryByTestId(pageTitleId);
    expect(title).toBe(null);
  });

  test('Rota "/meals": possui o header com o título "Meals" e os ícones de perfil e pesquisa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const profileBtn = screen.getByTestId(profileBtnId);
    const title = screen.queryByTestId(pageTitleId);
    const searchBtn = screen.getByTestId(searchBtnId);

    expect(profileBtn).toHaveAttribute('src', profileIcon);
    expect(title).toHaveTextContent('Meals');
    expect(searchBtn).toHaveAttribute('src', searchIcon);
  });

  test('Rota "/drinks": possui o header com o título "Drinks" e os ícones de perfil e pesquisa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const profileBtn = screen.getByTestId(profileBtnId);
    const title = screen.queryByTestId(pageTitleId);
    const searchBtn = screen.getByTestId(searchBtnId);

    expect(profileBtn).toHaveAttribute('src', profileIcon);
    expect(title).toHaveTextContent('Drinks');
    expect(searchBtn).toHaveAttribute('src', searchIcon);
  });

  test('Rota "/meals/{id-da-receita}": não possui header', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52771'] });

    const profileBtn = screen.queryByTestId(profileBtnId);
    const title = screen.queryByTestId(pageTitleId);
    const searchBtn = screen.queryByTestId(searchBtnId);

    expect(profileBtn).toBe(null);
    expect(title).toBe(null);
    expect(searchBtn).toBe(null);
  });

  test('Rota "drinks/{id-da-receita}": não possui header', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/178319'] });

    const profileBtn = screen.queryByTestId(profileBtnId);
    const title = screen.queryByTestId(pageTitleId);
    const searchBtn = screen.queryByTestId(searchBtnId);

    expect(profileBtn).toBe(null);
    expect(title).toBe(null);
    expect(searchBtn).toBe(null);
  });

  test('Rota "/meals/{id-da-receita}/in-progress": não possui header', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52771/in-progress'] });

    const profileBtn = screen.queryByTestId(profileBtnId);
    const title = screen.queryByTestId(pageTitleId);
    const searchBtn = screen.queryByTestId(searchBtnId);

    expect(profileBtn).toBe(null);
    expect(title).toBe(null);
    expect(searchBtn).toBe(null);
  });

  test('Rota "/drinks/{id-da-receita}/in-progress": não possui header', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/178319/in-progress'] });

    const profileBtn = screen.queryByTestId(profileBtnId);
    const title = screen.queryByTestId(pageTitleId);
    const searchBtn = screen.queryByTestId(searchBtnId);

    expect(profileBtn).toBe(null);
    expect(title).toBe(null);
    expect(searchBtn).toBe(null);
  });

  test('Rota "/profile": possui o header com o título "Profile" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });

    const profileBtn = screen.getByTestId(profileBtnId);
    const title = screen.getByTestId(pageTitleId);
    const searchBtn = screen.queryByTestId(searchBtnId);

    expect(profileBtn).toHaveAttribute('src', profileIcon);
    expect(title).toHaveTextContent('Profile');
    expect(searchBtn).toBe(null);
  });

  test('Rota "/done-recipes": possui o header com o título "Done Recipes" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });

    const profileBtn = screen.getByTestId(profileBtnId);
    const title = screen.getByTestId(pageTitleId);
    const searchBtn = screen.queryByTestId(searchBtnId);

    expect(profileBtn).toHaveAttribute('src', profileIcon);
    expect(title).toHaveTextContent('Done Recipes');
    expect(searchBtn).toBe(null);
  });

  test('Rota "/favorite-recipes": possui o header com o título "Favorite Recipes" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/favorite-recipes'] });

    const profileBtn = screen.getByTestId(profileBtnId);
    const title = screen.getByTestId(pageTitleId);
    const searchBtn = screen.queryByTestId(searchBtnId);

    expect(profileBtn).toHaveAttribute('src', profileIcon);
    expect(title).toHaveTextContent('Favorite Recipes');
    expect(searchBtn).toBe(null);
  });
});

describe('Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil', () => {
  test('A mudança de tela ocorre corretamente', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const profileBtn = screen.getByTestId(profileBtnId);
    await userEvent.click(profileBtn);

    // const { pathname } = window.location;
    // expect(pathname).toBe('/profile');

    const title = await screen.findByTestId(pageTitleId);
    expect(title).toHaveTextContent('Profile');
  });
});

describe('Desenvolva o botão de busca que, ao ser clicado, a barra de busca deve aparecer. O mesmo serve para escondê-la', () => {
  const searchInputId = 'search-input';

  test('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    let searchInput = screen.queryByTestId(searchInputId);
    expect(searchInput).toBe(null);

    const searchBtn = screen.getByTestId(searchBtnId);
    await userEvent.click(searchBtn);

    searchInput = await screen.findByTestId(searchInputId);
    expect(searchInput).toBeVisible();
  });

  test('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchBtn = screen.getByTestId(searchBtnId);
    userEvent.click(searchBtn);

    let searchInput: HTMLElement | null = await screen.findByTestId(searchInputId);
    expect(searchInput).toBeVisible();

    await userEvent.click(searchBtn);
    searchInput = screen.queryByTestId(searchInputId);
    expect(searchInput).toBe(null);
  });
});
