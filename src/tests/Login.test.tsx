import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/renderWithRouter';
import Login from '../pages/Login';

describe('Tests for the login page', () => {
  renderWithRouter(<Login />);

  test('Tests section', async () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    await userEvent.type(emailInput, 'trybesomething@example.com');
    await userEvent.type(passwordInput, '1234567');

    expect(emailInput).toHaveValue('trybesomething@example.com');
    expect(passwordInput).toHaveValue('1234567');
  });

  test('false positive', async () => {
    renderWithRouter(<Login />);
    const mockEmail = 'trybesome@gmail.com';

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');
    await userEvent.type(emailInput, 'brah');
    await userEvent.type(passwordInput, 'brah');

    expect(loginButton).toBeDisabled();

    // Clear all inputs
    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);

    await userEvent.type(emailInput, mockEmail);
    await userEvent.type(passwordInput, '1234567');

    expect(loginButton).toBeEnabled();

    await userEvent.click(loginButton);

    // expect localStorage to have a key user with the value of mockEmail
    expect(localStorage.getItem('user')).toBe(JSON.stringify({ email: mockEmail }));
  });
});
