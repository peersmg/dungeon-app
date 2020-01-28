import React from "react";
import Button from "../Button/Button";

type MenuProps = {
  text: String;
  callback: () => void;
};

const Menu: React.FC<MenuProps> = props => {
  return (
    <div className="Menu">
      <Button buttonCallback={props.callback}>{props.text}</Button>
    </div>
  );
};

export default Menu;
