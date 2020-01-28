import React from "react";
import { MemoryRouter, Route, Switch } from "react-router";
import "./App.css";
import Game from "./views/Game/Game";
import MainMenu from "./views/MainMenu/MainMenu";

const App: React.FC = () => {
  return (
    <div className="App">
      <MemoryRouter>
        <Switch>
          <Route path="/game" component={Game} />
          <Route path="/" component={MainMenu} />
        </Switch>
      </MemoryRouter>
    </div>
  );
};

export default App;
