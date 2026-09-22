import React from 'react';
import './App.css';
import JokeList from './JokeList';

function App() {
  return (
    <div className="App">
      <h1 className="App-title app-heading">
        <span role="img" aria-label="Face with tears of joy">😂</span> Dumb Jokes — Draftbit Edition
      </h1>
      <JokeList/>
      <footer className="App-footer">Built with Draftbit</footer>
    </div>
  );
}

export default App;
