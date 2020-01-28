import React from "react";
import Menu from "../../components/Menu/Menu";
import { useHistory } from "react-router";

const MainMenu: React.FC = () => {
  const history = useHistory();
  function beginSelected() {
    history.push("/game");
  }

  return <Menu callback={beginSelected} text="Begin Game" />;
};

export default MainMenu;
