import React from 'react';
import './App.css';
import Operations from './Components/Operations';
import { Theme } from './Components/Theme';
import { ThemeProvider } from '@emotion/react';
function App() {
  return(
    <ThemeProvider theme={Theme}>
          <Operations></Operations>

    </ThemeProvider>
  )
}

export default App;
