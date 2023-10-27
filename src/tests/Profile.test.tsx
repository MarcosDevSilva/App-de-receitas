import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/renderWithRouter';
import Profile from '../pages/Profile';

describe('profile page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should render profile page', () => {
    renderWithRouter(<Profile />);
    const profileEmail = screen.getByTestId('profile-email');
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

    expect(profileEmail).toBeInTheDocument();
    expect(profileDoneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profileLogoutBtn).toBeInTheDocument();
  });

  test('test if the first button redirects to done recipes page', async () => {
    renderWithRouter(<Profile />);
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    await userEvent.click(profileDoneBtn);
    expect(window.location.pathname).toBe('/done-recipes');
  });

  test('test if the second button redirects to favorite recipes page', async () => {
    renderWithRouter(<Profile />);
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    await userEvent.click(profileFavoriteBtn);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  test('test if the third button redirects to login page', async () => {
    renderWithRouter(<Profile />);
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    await userEvent.click(profileLogoutBtn);
    expect(window.location.pathname).toBe('/');
  });

  test('should render the email from localStorage', () => {
    const mockEmail = 'test123@gmail.com';
    localStorage.setItem('user', JSON.stringify({ email: mockEmail }));
    renderWithRouter(<Profile />);
    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(localStorage.getItem('user')).toBe(JSON.stringify({ email: mockEmail }));
    expect(profileEmail.innerHTML).toBe(mockEmail);
  });

  test('should clear localStorage when logout button is clicked', async () => {
    const mockEmail = 'test123@gmail.com';
    localStorage.setItem('user', JSON.stringify({ email: mockEmail }));
    renderWithRouter(<Profile />);
    const profileLogoutBtn = screen.getByTestId(/profile-logout-btn/i);
    await userEvent.click(profileLogoutBtn);
    expect(localStorage.getItem('user')).toBe(null);
  });
});
