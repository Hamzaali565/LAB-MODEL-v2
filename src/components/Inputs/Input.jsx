import React from "react";

const Input = ({ placeholder, onSubmit, type, disabled, value, onChange }) => {
  return (
    <div>
      <input
        type={type}
        onSubmit={onSubmit}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        value={value}
        className="bg-transparent border-2 border-black rounded-md placeholder:p-1 p-1.5"
      />
    </div>
  );
};

export default Input;
