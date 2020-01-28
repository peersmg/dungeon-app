import React from "react";
import { MemoryRouter, Route, Switch } from "react-router";
import "./App.css";
import GameView from "./views/GameView/GameView";
import MainMenu from "./views/MainMenu/MainMenu";

const App: React.FC = () => {
  return (
    <div className="App">
      <MemoryRouter>
        <Switch>
          <Route path="/game" component={GameView} />
          <Route path="/" component={MainMenu} />
        </Switch>
      </MemoryRouter>
    </div>
  );
};

export default App;
