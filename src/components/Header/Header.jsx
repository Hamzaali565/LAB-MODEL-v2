import React from "react";

const Header = ({ onClick, icon }) => {
  return (
    <div className=" text-2xl p-3 font-extrabold bg-blue-950 flex justify-between flex-row-reverse">
      <div>Hamza Ki Lab</div>
      <div className={icon} onClick={onClick}></div>
    </div>
  );
};

export default Header;
