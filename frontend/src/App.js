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
      <div className="App">
        <header className="App-header">
          <h1>Film-DB</h1>
        </header>
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
