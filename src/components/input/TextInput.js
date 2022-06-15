import React from "react";

import "./input.css";

function TextInput(props) {
  return (
    <div className="input">
      <label>{props.label}</label>
      <input
        type="text"
        id="value"
        name="value"
        value={props.value}
        onChange={(value) => props.action(value.target.value)}
      />
    </div>
  );
}

export default TextInput;
