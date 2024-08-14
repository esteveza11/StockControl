import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="******"
          value={formState.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <div>Login failed</div>}
    </div>
  );
}

export default Login;
