import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './login.css';
import LoginRegisterModal from '../../components/LoginRegisterModal';
import Logo from '../../images/Logo.png'

// Material UI Imports
import { Box, Grid, TextField, Button, InputAdornment, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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

  // Use states for displaying/hiding password
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(false);
  const [hasPasswordSpecialChar, setHasPasswordSpecialChar] = useState(false);

  // Handle showing password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Prevent default action when showing password
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkPasswordCriteria = (password) => {
    const lengthRequirement = password.length >= 5 && password.length <= 15;
    const specialCharRequirement = /[!@#$%^&*]/.test(password);
    setIsPasswordLongEnough(lengthRequirement);
    setHasPasswordSpecialChar(specialCharRequirement);
  };

  // Toggle to display the form
  const toggleForm = () => {
    setLoginFormVisible(!isLoginFormVisible);
    setMessage(''); // Clear message when toggling form
    setLoginUsername('');
    setLoginPassword('');
    setSignupUsername('');
    setSignupPassword('');
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
    // Password validation
    let errorMessage = '';
    if (!isPasswordLongEnough && !hasPasswordSpecialChar) {
      errorMessage = 'Password must be 5-15 characters long and include at least one special character.';
    } else if (!isPasswordLongEnough) {
      errorMessage = 'Password must be 5-15 characters long.';
    } else if (!hasPasswordSpecialChar) {
      errorMessage = 'Password must include at least one special character (!@#$%^&*).';
    }
    if (errorMessage !== '') {
      setMessage(errorMessage);
      setModalMessageType('error');
      setShowModal(true);
      return;
    }
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
        setShowPassword(false);
        setSignupPassword('');
        setSignupUsername('');
        setIsPasswordLongEnough(false);
        setHasPasswordSpecialChar(false);
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

  // Set the banner class depending on if login or signup form
  const bannerClass = isLoginFormVisible ? 'login-signup-banner login' : 'login-signup-banner signup';

  // Common styles for login and signup inputs
  const commonStylesLoginSignup = {
    // change label color when input is focused
    '& label.Mui-focused': { color: 'grey' },
    '& .MuiInputLabel-root': {
      color: 'var(--text-color)',
      '&:hover': {
        color: 'var(--text-color)', // Label color on hover
      },
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white', // Set the background color for the input
      '& fieldset': {
        borderColor: 'var(--primary-color)', // Default border color
      },
      '&:hover fieldset': {
        borderColor: 'var(--primary-color)', // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--primary-color)', // Border color when input is focused
      },
    },
  };

  return (
    <>
      {/* Banner for Application Name */}
      <Box component="header" className="login-signup-header-banner" sx={{ mt: 5, mb: 1, textAlign: 'center' }}>
        <Typography className="login-signup-header" variant="h4" component="h1">Job Tracker</Typography>
        <Typography className="login-signup-subheader" variant="subtitle1"> Made By AI - For Humans</Typography>
      </Box>

      {/* Login/Signup Forms */}
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: 3 }}>
        <Grid container justifyContent="center" className={bannerClass}>
          <Grid item xs={12} sm={6} md={6} lg={4} className="login-signup-container" sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>{isLoginFormVisible ? 'Login' : 'Create Account'}</Typography>
            <img src={Logo} alt="Logo" className="login-signup-header-logo" />

            {/* Conditional rendering for Login or Signup Form */}
            {isLoginFormVisible ? (
              <form onSubmit={handleLoginSubmit}>
                {/* Login Username */}
                <TextField
                  fullWidth
                  label="Username"
                  id="login-username"
                  name="login-username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  margin="normal"
                  sx={{ ...commonStylesLoginSignup }}
                  InputProps={{
                    inputProps: {
                      maxLength: 20,
                    }
                  }}
                />
                {/* Login Password */}
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  name="login-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  margin="normal"
                  sx={{ ...commonStylesLoginSignup }}
                  InputProps={{
                    inputProps: {
                      maxLength: 15,
                    },
                    // Show/Hide password
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          sx={{color: 'var(--primary-color)'}}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {/* Button to Login */}
                <Button sx={{ mt: 2 }} id="login-btn" type="submit">Login</Button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit}>
                {/* Signup Username */}
                <TextField
                  fullWidth
                  label="Username"
                  id="signup-username"
                  name="signup-username"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  required
                  margin="normal"
                    sx={{ ...commonStylesLoginSignup }}
                  InputProps={{
                    inputProps: {
                      maxLength: 20,
                    }
                  }}
                />
                {/* Signup Password */}
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="signup-password"
                  name="signup-password"
                  value={signupPassword}
                  onChange={(e) => {
                    setSignupPassword(e.target.value);
                    checkPasswordCriteria(e.target.value);
                  }}
                  required
                  margin="normal"
                  sx={{ ...commonStylesLoginSignup }}
                  InputProps={{
                    inputProps: {
                      maxLength: 15,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          sx={{ color: 'var(--primary-color)' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {/* Display Password Requirements */}
                <Box sx={{ mb: 3, mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span sx={{ color: 'var(--primary-color)' }}>Password Requirements</span>
                  {/* Display if 15 Characters Long */}
                  <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mt: 2 }}>
                    5 to 15 characters long
                    {isPasswordLongEnough ? (
                      <CheckCircleIcon sx={{ color: 'green', fontSize: '1rem', ml: 1 }} />
                    ) : (
                      <CancelIcon sx={{ color: 'red', fontSize: '1rem', ml: 1 }} />
                    )}
                  </Typography>
                  {/* Display if Speicial Character Included */}
                  <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mt: 1 }}>
                    At least 1 special character (!@#$%^&*)
                    {hasPasswordSpecialChar ? (
                      <CheckCircleIcon sx={{ color: 'green', fontSize: '1rem', ml: 1 }} />
                    ) : (
                      <CancelIcon sx={{ color: 'red', fontSize: '1rem', ml: 1 }} />
                    )}
                  </Typography>
                </Box>
                {/* Button to Signup */}
                <Button sx={{ mt: 2 }} id="signup-btn" type="submit">Sign Up</Button>
              </form>
            )}

            {/* Toggle between Signup and Login Forms */}
            <span className="login-signup-switch-form" onClick={toggleForm}>
              {isLoginFormVisible ? 'Switch to Sign-up' : 'Switch to Login'}
            </span>

            {/* Modal to show messages of success or error */}
            {showModal && (
              <LoginRegisterModal
                message={message}
                onClose={closeModal}
                messageType={modalMessageType}
              />
            )}

          </Grid>
        </Grid>
      </Box>

    </>
  );
};

export default LoginPage;
