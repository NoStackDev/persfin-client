import React, { useState } from "react";

import navbarItems from "./NavbarConfig";

import "./Navbar.style.scss";

type Props = {};

const Nav = (props: Props) => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  return (
    <nav className={navbarOpen ? "open" : "closed"}>
      <div className="topNav">
        <div className="appName">PERSIN</div>
        <div
          className="hamburger-menu-wrapper"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <div
            className={navbarOpen ? "hamburger-menu open" : "hamburger-menu"}
          ></div>
        </div>
      </div>
      <div className="middleNav">
        <ul>
          {navbarItems.map((navItem, index) => {
            return (
              <li key={index}>
                <div className="navItemIcon">
                  <span className="material-icons icon">
                    {navItem.itemIcon}
                  </span>
                </div>
                <div className="navItemText">{navItem.itemName}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bottomNav">
        <span className="material-icons">exit_to_app</span>
        <div className="logout">Log out</div>
      </div>
    </nav>
  );
};

export default Nav;
