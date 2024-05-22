import React from "react";

const TextArea = ({ placeholder, value, label, onChange }) => {
  return (
    <div className="flex items-center justify-center space-x-2 p-2">
      <div className="text-xs w-44">{label}</div>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent border-2 border-black rounded-md placeholder:p-1 p-1"
      />
    </div>
  );
};

export default TextArea;
