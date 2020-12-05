import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes/Routes';
import './App.css';

/**Film-DB App
 * 
 * State: 
 * 
 * App -> { SearchBar, Routes }
 */
function App() {

  return (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
  );
}

export default App;
