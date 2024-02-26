// CREATED WITH GPT 3.5

// HomePage.js

import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './home.css'; // Import the CSS file for styling

function HomePage() {

  // States to check if a user has an authenticated JWT token
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const history = useHistory();

  // Fetch the user details and get the token from local storage
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        try {
          // Get the authenticated users data
          const response = await fetch('/users/user-info', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          // If ok 200 response then set the user data
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Handle cases where the token is invalid or expired
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    // Call the method to fetch the user details
    fetchUserDetails();
  }, []);

  // Handle logging out of the application
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // Redirect to the login page
    history.push('/login');
  };

  return (
    <div className="home-page">
      <div>
        <h1 className="home-page__title">Welcome to Job Tracker!</h1>
        <p className="home-page__text">
          {isAuthenticated && user ? `Hi, ${user.username}!` : 'Sign up for an account today to better track your jobs and internships.'}
        </p>
      </div>

      <div>
        <Link to="/skills">
          <button className="home-page__button" disabled={!isAuthenticated}>Explore Skills</button>
        </Link>

        <Link to="/jobs">
          <button className="home-page__button" disabled={!isAuthenticated}>Explore Jobs</button>
        </Link>

        <Link to="/contacts">
          <button className="home-page__button" disabled={!isAuthenticated}>Explore Contacts</button>
        </Link>
      </div>

      <div className="home-page__login-button-container">
        {isAuthenticated ? (
          <button className="home-page__button" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button className="home-page__button">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomePage;