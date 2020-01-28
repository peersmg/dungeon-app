import React from 'react';

type MenuProps = {
    text: String;
}

const Menu: React.FC<MenuProps> = (props) => {
    return (
      <div className="Menu">
        {props.text}
      </div>
    );
  }
  
  export default Menu;