import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu/Menu";
import { MenuOption } from "../../components/Menu/Menu";
import "./MainMenu.css";

const MainMenu: React.FC = () => {
  const [menuOptions, setMenuOption] = useState<MenuOption[]>([]);

  useEffect(() => {
    setMenuOption([]);
    setMenuOption(menuOptions => [...menuOptions, { text: "Begin Game", mapping: "/game" }]);
    setMenuOption(menuOptions => [...menuOptions, { text: "Credits", mapping: "/credits" }]);
    console.log(menuOptions);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="main-menu">
      <Menu menuSetting={menuOptions} />
    </div>
  );
};

export default MainMenu;
