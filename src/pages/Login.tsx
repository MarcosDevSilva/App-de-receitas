function Login() {
  return (
    <form className="login-form">
      <div>
        <label htmlFor="email-input">Email</label>
        <input
          type="email"
          name="email-input"
          data-testid="email-input"
          placeholder="Email"
          // value={ name }
          // onChange={ handleChange }
        />
      </div>
      <div>
        <label htmlFor="email-input">Password</label>
        <input
          type="password"
          name="password-input"
          data-testid="password-input"
          placeholder="Password"
          // value={ name }
          // onChange={ handleChange }
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
