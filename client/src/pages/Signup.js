import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

function Signup() {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Your username"
          value={formState.username}
          onChange={handleChange}
        />
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
      {error && <div>Signup failed</div>}
    </div>
  );
}

export default Signup;
