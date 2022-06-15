import React from "react";

import "./input.css";

function NumberInput(props) {
  return (
    <div className="input">
      <label>{props.label}</label>
      <input
        type="number"
        id="value"
        name="value"
        value={props.value}
        min={props.min ? props.min : 0}
        max={props.max ? props.max : undefined}
        onChange={(value) => props.action(value.target.value)}
      />
    </div>
  );
}

export default NumberInput;
