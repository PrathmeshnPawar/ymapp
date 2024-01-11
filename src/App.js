import {useState,useEffect} from 'react';
import  Navbar  from './components/Navbar';
import { Outlet, useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Header from './Header/Header';
//import { cleanup } from '@testing-library/react';

function App() {
  const [title , setTitle] = useState(null)
  const location = useLocation();
  useEffect(()=>{
    const parsedTitle = location.pathname.replace(/\W/g," ")
    setTitle(parsedTitle)
  },[location]

  )

  return (
    <Grid container>
      <Navbar />
      <Header title={title} />
      <Outlet />
    </Grid>
  );
}

export default App;