import React from "react";

import "./input.css";

function DateInput(props) {
  return (
    <div className="input">
      <label>{props.label}</label>
      <input
        type="date"
        id="start"
        name="start"
        value={props.date}
        min={props.min ? props.min : "2022-01-01"}
        max={props.max ? props.max : "2022-06-15"}
        onChange={(value) => props.action(value.target.value)}
      />
    </div>
  );
}

export default DateInput;
