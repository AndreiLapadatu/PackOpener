import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, coins } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FIFA Pack Opening
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user && (
            <Typography variant="body1" sx={{ mr: 2 }}>
              🪙 {coins.toLocaleString()} coins
            </Typography>
          )}
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/store">
            Store
          </Button>
          <Button color="inherit" component={RouterLink} to="/collection">
            Collection
          </Button>
          {!user ? (
            <Button color="secondary" variant="contained">
              Login
            </Button>
          ) : (
            <Button color="secondary" variant="contained">
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 