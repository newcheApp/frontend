import React from 'react';
import logo from './logo.svg';
import './App.css';
import Banner from './components/banner';

function App() {
  return (
    <div className="App">
      <Banner
        message="Newche App - banner!"
        backgroundColor="#4CAF50"
        color="#ffffff"
        onClick={() => alert("Banner Clicked!")}
      />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React - lets do newche app
        </a>
      </header>
    </div>
  );
}

export default App;
