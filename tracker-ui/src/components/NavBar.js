import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const NavBar = () => {
    const history = useHistory();

    // Navbar to handle logout of application to remove JWT token
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login'); // Redirect to login/signup page
    };

    return (
        // Navlinks
        <nav>
            <Link to="/">Home</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/contacts">Contacts</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default NavBar;