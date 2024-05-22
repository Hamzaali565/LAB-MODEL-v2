import React, { useEffect, useRef, useState } from "react";
import LabelInput from "../Inputs/LabelInput";
import Input from "../Inputs/Input";

const Auto2 = ({
  data,
  label,
  type,
  placeholder,
  disabled,
  value,
  onClick,
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const [xlxs, setxlxs] = useState("");

  console.log("data", data);

  const valueOn = (item) => {
    setxlxs(item);
    onChange(item);
    if (xlxs.length <= 1) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const pareSend = (item) => {
    onClick(item);
  };

  return (
    <div className={"flex items-center justify-center space-x-2 p-1"}>
      <div className="text-xs w-28">{label}</div>
      <div>
        <Input
          type="text"
          value={xlxs}
          onChange={(e) => valueOn(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />
        <div className="absolute">
          {show &&
            data &&
            data.map((items) => (
              <ul
                id={items.id}
                tabIndex="0"
                className="border-b-2 w-56 border-gray-800 text-black bg-white hover:text-white hover:bg-black"
                onClick={() => {
                  setxlxs(items.name);
                  setShow(false);
                  pareSend(items);
                }}
              >
                {items.name}
              </ul>
            ))}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Auto2;
