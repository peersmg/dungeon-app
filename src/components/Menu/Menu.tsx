import React from 'react';
import Button from "../Button/Button"

type MenuProps = {
    text: String;
}

const Menu: React.FC<MenuProps> = (props) => {
    return (
      <div className="Menu">
        <Button>{props.text}</Button>
      </div>
    );
  }
  
  export default Menu;