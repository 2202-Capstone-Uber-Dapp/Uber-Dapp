import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [error, setError] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="email" type="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" ref={passwordRef} />
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
        {/* {error && error.response && <div> {error.response.data} </div>} */}
      </form>
    </div>
  );
};

export const Signup = () => {
  const [error, setError] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError(error.message);
    }
    history.push('/');
  }
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="email" type="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" ref={passwordRef} />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        {/* {error && error.response && <div> {error.response.data} </div>} */}
      </form>
    </div>
  );
};
