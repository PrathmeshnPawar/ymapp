import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Database from './pages/Database/Database'
import SendEmail from './pages/Hosting/Hosting';
import Spam from './pages/Machine-Learning/Machine-Learning';
import Functions from './pages/Functions/Functions';
import Authentication from './pages/Authentication/Authentication';
import { ThemeProvider } from '@mui/material/styles';
import { dashboardTheme } from './dashboardTheme';


ReactDOM.render(
  <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="authentication" element={<Authentication />} />
        <Route path="database" element={<Database />} />
        <Route path="functions" element={<Functions />} />
        <Route path="hosting" element={<SendEmail />} />
        <Route path="machinelearning" element={<Spam />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();