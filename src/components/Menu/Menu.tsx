import React from "react";
import Button from "../Button/Button";
import { useHistory } from "react-router";

type MenuProps = {
  menuSetting: MenuOption[];
};

export type MenuOption = {
  text: string;
  mapping: string;
};

const Menu: React.FC<MenuProps> = props => {
  const history = useHistory();
  function buttonPressed(i: number) {
    history.push(props.menuSetting[i].mapping);
  }

  return (
    <div className="Menu">
      {props.menuSetting.map((val, index) => {
        return (
          <div>
            <Button
              key={index}
              buttonCallback={() => {
                buttonPressed(index);
              }}
            >
              {val.text}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
