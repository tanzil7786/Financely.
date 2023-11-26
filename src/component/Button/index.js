import React from "react";
import "./style.css";

const Button = ({ text, onClick, blue, loading }) => {
  return (
    <>
      <div
        className={blue ? "btn btn-blue" : "btn"}
        onClick={onClick}
        loading={loading}
      >
        {text}
      </div>
    </>
  );
};

export default Button;
