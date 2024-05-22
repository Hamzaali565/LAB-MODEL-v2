import React, { useState } from "react";

const SidebarItems = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (item.childrens) {
    return (
      <div className={isOpen ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title">
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i
            className="uil uil-angle-down toggle-btn"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          ></i>
        </div>
        {/* content inside sidebar*/}
        <div className="sidebar-content">
          {item.childrens.map((child, i) => (
            <SidebarItems key={i} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={isOpen ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title">
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
        </div>
      </div>
    );
  }
};

export default SidebarItems;
