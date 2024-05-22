import React from "react";

const Button = ({ title, onClick, disabled }) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className="border-2 border-black px-8 py-2 rounded-md bg-slate-950 "
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
