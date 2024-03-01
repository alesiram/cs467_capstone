import React, { useState } from 'react';
import { useLocation, useHistory, Link as RouterLink } from 'react-router-dom';

// Material UI Imports
import { AppBar, Toolbar, Box, Button, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SkillsIcon from '@mui/icons-material/Build';
import JobsIcon from '@mui/icons-material/BusinessCenter';
import ContactsIcon from '@mui/icons-material/Contacts';
import MenuIcon from '@mui/icons-material/Menu'; // For smaller screen

const NavBar = () => {
    // History
    const history = useHistory();

    // Navbar to handle logout of application to remove JWT token
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login'); // Redirect to login/signup page
    };

    // Theme and set breakpoints for mobile devices
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation(); // Current location

    // Handle the drawer toggle when on smaller screens
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    // Nav links
    const navLinks = [
        { title: 'Home', path: '/', icon: <HomeIcon /> },
        { title: 'Skills', path: '/skills', icon: <SkillsIcon /> },
        { title: 'Jobs', path: '/jobs', icon: <JobsIcon /> },
        { title: 'Contacts', path: '/contacts', icon: <ContactsIcon /> },
    ];

    return (
        <AppBar position="static" className="job-tracker-navbar" sx={{ bgcolor: 'var(--text-color)' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex' }} className="job-tracker-navbar-container">
                    {/* If is mobile, then display mobile icon with list drop down */}
                    {isMobile ? (
                        <>
                            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} className="job-tracker-navbar-menu">
                                <MenuIcon />
                            </IconButton>
                            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                                <List>
                                    {/* Mobile view create ListItems */}
                                    {navLinks.map((link) => (
                                        <ListItem
                                            button
                                            key={link.title}
                                            component={RouterLink}
                                            to={link.path}
                                            onClick={() => setDrawerOpen(false)}
                                            sx={{
                                                backgroundColor: location.pathname === link.path ? 'black' : 'inherit', // Highlight if active
                                                '&:hover': {
                                                    backgroundColor: location.pathname === link.path ? 'var(--primary-color)' : '', // Maintain highlight on hover
                                                },
                                                color: location.pathname === link.path ? 'var(--primary-color)' : 'inherit', // Change text/icon color if active
                                            }}
                                        >
                                            <ListItemIcon sx={{ color: location.pathname === link.path ? 'var(--primary-color)' : 'inherit' }}>
                                                {link.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={link.title} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Drawer>
                        </>
                    ) : (
                        // Create buttons in nav bar when not mobile
                        navLinks.map((link) => (
                            <Button
                                key={link.title}
                                color="inherit"
                                component={RouterLink}
                                to={link.path}
                                className={`job-tracker-navbar-${link.title.toLowerCase()}`}
                                sx={{
                                    border: 'none',
                                    boxShadow: 'none',
                                    color: location.pathname === link.path ? 'var(--primary-color)' : 'inherit',
                                    '&:hover': {
                                        borderBottom: '2px solid', // Simulate underline with bottom border
                                        borderColor: 'var(--secondary-color)', // Customize underline color
                                        color: 'var(--button-text-color)',
                                        '& .MuiSvgIcon-root': {
                                            color: 'var(--button-text-color)',
                                        },
                                    },
                                    paddingBottom: '3px', // Adjust padding to prevent layout shift on hover
                                    '& .MuiSvgIcon-root': {
                                        color: location.pathname === link.path ? 'var(--primary-color)' : 'inherit',
                                    },
                                }}
                            >
                                {React.cloneElement(link.icon, { sx: { mr: 1 } })} {/* Clone element to apply sx */}
                                <Typography variant="h6">{link.title}</Typography>
                            </Button>
                        ))
                    )}
                </Box>
                {/* Button to logout */}
                <Button
                    color="inherit"
                    onClick={handleLogout}
                    className="job-tracker-navbar-logout-button"
                    sx={{
                        border: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                            borderBottom: '2px solid', // Simulate underline with bottom border
                            borderColor: 'var(--button-text-color)', // Customize underline color
                        },
                        paddingBottom: '3px', // Adjust padding to prevent layout shift on hover
                    }}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;