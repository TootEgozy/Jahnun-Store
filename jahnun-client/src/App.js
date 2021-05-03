//import logo from './logo.svg';
import './App.css';
import React from 'react'
import { Route } from 'react-router';
import User from './components/User';
import { BrowserRouter } from 'react-router-dom';

/*
function App() {
  console.log(hey);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Toot's App
        </p>
  
      </header>
    </div>
  );
}
*/

function App() {

  return (
    <div>
      <BrowserRouter>
        <Route exact path='/' component={User} />
      </BrowserRouter>

    </div>
  );
}

export default App;
