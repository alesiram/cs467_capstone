// CREATED WITH GPT 3.5

// HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import the CSS file for styling

function HomePage() {
  return (
    <div className="home-page">
      {/* Welcome banner */}
      <div>
        <h1>Welcome to Our Website!</h1>
        <p>Discover and explore our amazing content.</p>
      </div>

      {/* Navigation buttons for exploring different sections */}
      <div>
        {/* Explore Skills */}
        <Link to="/skills">
          <button disabled={true}>Explore Skills</button>
        </Link>

        {/* Explore Jobs */}
        <Link to="/jobs">
          <button disabled={true}>Explore Jobs</button>
        </Link>

        {/* Explore Contacts */}
        <Link to="/contacts">
          <button disabled={true}>Explore Contacts</button>
        </Link>
      </div>

      {/* Login button positioned in the top right corner */}
      <div className="login-button-container">
        {/* Link to the login page */}
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;