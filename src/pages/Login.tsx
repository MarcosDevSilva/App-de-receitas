import { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  return (
    <form className="login-form">
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
        // onClick={ handleClick }
        // disabled={ name.length < 3 }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
