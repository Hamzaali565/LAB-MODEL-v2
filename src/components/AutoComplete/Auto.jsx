import React, { useEffect, useRef, useState } from "react";
import LabelInput from "../Inputs/LabelInput";
import Input from "../Inputs/Input";

const Auto = ({
  data,
  label,
  type,
  placeholder,
  disabled,
  value,
  onClick,
  onChange,
  isChecked,
  isEmpty,
}) => {
  const [show, setShow] = useState(false);
  const [xlxs, setxlxs] = useState("");
  const inputRef = useRef(null); // Reference to the input element

  const valueOn = (item) => {
    setxlxs(item);
    onChange(item);
    if (xlxs.length <= 1) {
      setShow(false);
      return;
    } else {
      setShow(true);
      return;
    }
  };
  const pareSend = (item) => {
    console.log("isChecked", isChecked);
    onClick(item);
    if (isChecked === false) {
      setxlxs("");
      return;
    } else {
      setxlxs(item.name);
      return;
    }
  };

  return (
    <div className={"flex items-center justify-center space-x-2 p-1"}>
      <div className="text-xs w-28">{label}</div>
      <div style={{ position: "relative" }}>
        <Input
          type="text"
          value={xlxs}
          onChange={(e) => valueOn(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          ref={inputRef} // Assign inputRef to the ref attribute
        />
        {/* Render the ul element conditionally and position it absolutely */}
        {show && data && (
          <ul
            className="absolute top-full left-0 w-56 border-b-2 border-gray-800 text-black bg-white hover:text-white hover:bg-black"
            style={{
              zIndex: 9999, // Ensure it's above other elements
              maxHeight: "200px", // Limit the max height if needed
              overflowY: "auto", // Add vertical scroll if content overflows
            }}
          >
            {data.map((items) => (
              <li
                key={items.id} // Add a unique key prop
                className="px-2 py-1 cursor-pointer"
                onClick={() => {
                  setShow(false);
                  pareSend(items);
                }}
              >
                {items.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Auto;
