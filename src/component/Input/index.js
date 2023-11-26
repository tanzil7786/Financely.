import React from "react";
import "./style.css";

const Input = ({ label, state, setState, placeholder, type }) => {
  return (
    <>
      <div className="input-wrapper">
        <p className="input-label">{label}</p>

        <input
          type={type}
          value={state}
          placeholder={placeholder}
          onChange={(e) => {
            // Update the state with the input value when it changes
            setState(e.target.value);
          }}
          className="custom-input"
        />
      </div>
    </>
  );
};

export default Input;
