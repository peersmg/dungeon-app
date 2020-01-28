import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import './App.css';
import Game from './views/Game/Game';
import MainMenu from './views/MainMenu/MainMenu';

const App: React.FC = () => {
  return (
    <div className="App">
      <MemoryRouter>
        <Route path="/" component={MainMenu} />
        <Route path="/game" component={Game} />
      </MemoryRouter>
    </div>
  );
}

export default App;
