import React from "react";
import SidebarItems from "./SidebarItems";
import items from "../data/Sidebat.json";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {items.map((item, i) => (
        <SidebarItems key={i} item={item} />
      ))}
    </div>
  );
};

export default Sidebar;
