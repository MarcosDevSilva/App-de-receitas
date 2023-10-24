import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Tests for the login page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
  });

  test('Tests section', async () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    await userEvent.type(emailInput, 'trybesomething@example.com');
    await userEvent.type(passwordInput, '123456');

    expect(emailInput).toHaveValue('trybesomething@example.com');
    expect(passwordInput).toHaveValue('123456');
  });

  test('false positive', async () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');
    await userEvent.type(emailInput, 'brah');
    await userEvent.type(passwordInput, 'brah');

    expect(loginButton).toBeDisabled();

    await userEvent.type(emailInput, 'trybesome@example.com');
    await userEvent.type(passwordInput, '123456');

    expect(loginButton).toBeEnabled();
  });
});
