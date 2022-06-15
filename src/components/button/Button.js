import React from "react";

import "./button.css";

function Button(props) {
  return (
    <button className="button" onClick={props.action}>
      {props.text}
    </button>
  );
}

export default Button;
