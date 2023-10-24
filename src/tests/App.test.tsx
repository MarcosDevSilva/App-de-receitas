import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Login from '../pages/Login';

describe('Tests for the login page', () => {
  beforeEach(() => {
    render(<Login />);
  });

  test('Tests for the 2nd task', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Tests for the 3rd task', async () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    await userEvent.type(emailInput, 'trybetest@example.com');
    await userEvent.type(passwordInput, '123456');

    expect(emailInput).toHaveValue('trybetest@example.com');
    expect(passwordInput).toHaveValue('123456');
  });
});
