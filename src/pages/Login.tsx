// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginType } from '../types';

function Login() {
  const [formData, setFormData] = useState<LoginType>({
    email: '',
    password: '',
  });

  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  const emailValidation = (email: string) => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return regex.test(email);
  };

  const passwordValidation = (password: string) => {
    const regex = /^[a-z0-9]{5,}$/i;
    return regex.test(password);
  };

  const handleChange = () => {
    if (emailValidation(formData.email) && passwordValidation(formData.password)) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleClick = () => {
    const { email } = formData;
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/meals');
  };

  return (
    <form className="login-form" onChange={ handleChange }>
      <div>
        <label htmlFor="email-input">Email</label>
        <input
          type="email"
          name="email-input"
          data-testid="email-input"
          placeholder="Email"
          value={ formData.email }
          onChange={ (e) => setFormData({ ...formData, email: e.target.value }) }
        />
      </div>
      <div>
        <label htmlFor="email-input">Password</label>
        <input
          type="password"
          name="password-input"
          data-testid="password-input"
          placeholder="Password"
          value={ formData.password }
          onChange={ (e) => setFormData({ ...formData, password: e.target.value }) }
        />
      </div>
      <button
        data-testid="login-submit-btn"
        onClick={ handleClick }
        disabled={ !formValid }
        type="submit"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
