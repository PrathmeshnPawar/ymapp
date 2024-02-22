import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './Header/Header';
import { SnackbarProvider, useSnackbar } from 'notistack'; // Import useSnackbar from notistack

function App() {
  const [title, setTitle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const parsedTitle = location.pathname.replace(/\W/g, ' ');
    setTitle(parsedTitle);

    // Example: Display a welcome notification when the component mounts
    
  }, [location]);

  return (
    
      <Grid container>
        <Navbar />
        <Header title={title} />
        <Outlet />
      </Grid>
    
  );
}

export default App;
