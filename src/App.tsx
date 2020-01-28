import React from 'react';
import logo from './logo.svg';
import './App.css';
import {MemoryRouter, Route} from 'react-router';
import MainMenu from './views/MainMenu/MainMenu';

const App: React.FC = () => {
  return (
    <div className="App">
      <MemoryRouter>
        <Route path="/" component={MainMenu} />
      </MemoryRouter>
    </div>
  );
}

export default App;
