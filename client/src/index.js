import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import { AppProvider } from './context/appContext';

import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { dashboardTheme } from './muiTheme';

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <AppProvider>
            <ThemeProvider theme={dashboardTheme}>
               <App />
            </ThemeProvider>
         </AppProvider>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
);
