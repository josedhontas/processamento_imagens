import React from 'react';
import './App.css';
import Operations from './Components/Operations';
import { Theme } from './Components/Theme';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
function App() {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline>
        <Operations></Operations>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App;
