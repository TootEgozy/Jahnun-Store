import logo from './logo.svg';
import './App.css';
import React from 'react'
import { Route } from 'react-router';
import User from './components/user.component';
import { BrowserRouter } from 'react-router-dom';

const hey = "hey";

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

export default App;
