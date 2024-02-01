import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import './login.css';
import LoginRegisterModal from '../../components/LoginRegisterModal';

const LoginPage = () => {
  
  // Use states
  const history = useHistory();
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);

  // Use states for the error/success messages for the modal
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessageType, setModalMessageType] = useState('error'); // 'success' or 'error'

  // Toggle to display the form
  const toggleForm = () => {
    setLoginFormVisible(!isLoginFormVisible);
    setMessage(''); // Clear message when toggling form
  };

  // Handle when user submits for login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      // If response is 200 ok, set the JWT token in local storage and go to home page
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        history.push('/');
      } else {
        // Handle error message in modal
        const errorResponse = await response.json();
        setMessage(errorResponse || 'Invalid credentials. Please try again.');
        setModalMessageType('error');
        setShowModal(true);
      }
    } catch (error) {
      setMessage('An error occurred during login.');
    }
  };

  // Handle when user submits to signup
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: signupUsername, password: signupPassword }),
      });
      // If response is 200 ok, set the modal success message
      if (response.ok) {
        // Handle success
        setMessage('Account created successfully. Please login.');
        setModalMessageType('success');
        setShowModal(true);
      } else {
        // Handle error message in modal
        const errorResponse = await response.json();
        setMessage(errorResponse || 'Registration failed. Please try again.');
        setModalMessageType('error');
        setShowModal(true);
      }
    } catch (error) {
      // Handle network or other unexpected errors
      setMessage('An error occurred during signup.');
      setModalMessageType('error');
      setShowModal(true);
    }
  };

  // Handle closing the modal
  const closeModal = () => {
    setShowModal(false);
    if (modalMessageType === 'success') {
      toggleForm(); // Switch to login form only if registration was successful
    }
  };

  const bannerClass = isLoginFormVisible ? 'banner login' : 'banner signup';

  return (
    <>
    {/* Banner for Application Name */}
    <header className="header-banner">
      <h1>Job Tracker</h1>
      <p>Made By AI - For Humans</p>
    </header>

    <div className="container">

      <div className={bannerClass}>
        <h2>{isLoginFormVisible ? 'Login' : 'Create an Account'}</h2>
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

          <button id="login-btn" type="submit">Login</button>
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

          <button id="signup-btn" type="submit">Sign Up</button>
        </form>
      )}

      <p className="switch-form" onClick={toggleForm}>
        {isLoginFormVisible ? 'Switch to Sign-up' : 'Switch to Login'}
      </p>

      {/* Modal to show messages */}
      {showModal && (
        <LoginRegisterModal
          message={message}
          onClose={closeModal}
          messageType={modalMessageType}
        />
      )}

    </div>

    </>
  );
};

export default LoginPage;
