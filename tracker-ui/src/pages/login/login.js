import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import './login.css';

const LoginPage = () => {
    const history = useHistory();
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);

  const toggleForm = () => {
    setLoginFormVisible(!isLoginFormVisible);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add logic for handling login submission
    console.log('Login submitted:', loginUsername, loginPassword);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Add logic for handling signup submission
    console.log('Signup submitted:', signupUsername, signupPassword);
  };

  return (
    <div className="container">
      <div className="banner">
        <h2>Login/Create Account</h2>
      </div>

      {isLoginFormVisible ? (
        // Login Form
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="login-username">Username:</label>
          <input
            type="text"
            id="login-username"
            name="login-username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            required
          />

          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            name="login-password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      ) : (
        // Signup Form
        <form onSubmit={handleSignupSubmit}>
          <label htmlFor="signup-username">Username:</label>
          <input
            type="text"
            id="signup-username"
            name="signup-username"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
            required
          />

          <label htmlFor="signup-password">Password:</label>
          <input
            type="password"
            id="signup-password"
            name="signup-password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            required
          />

          <button type="submit">Sign Up</button>
        </form>
      )}

      <p className="switch-form" onClick={toggleForm}>
        {isLoginFormVisible ? 'Switch to Sign-up' : 'Switch to Login'}
      </p>
    </div>
  );
};

export default LoginPage;
