import React from "react";

interface ButtonProp {
  buttonCallback?: () => void;
}

const Button: React.FC<ButtonProp> = props => {
  function buttonClicked() {
    if (props.buttonCallback) {
      props.buttonCallback();
    }
  }

  return <button onClick={buttonClicked}>{props.children}</button>;
};

export default Button;
