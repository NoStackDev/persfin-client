import React, { useState } from "react";
import { Link } from "react-router-dom";

import navbarItems from "./NavbarConfig";

import "./Navbar.style.scss";
import getSomething from "../../Queries/getTest";

type Props = {};

const Nav = (props: Props) => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

  const handleClick = () => {
    console.log("clicked");
    getSomething();
  };
  return (
    <nav className={navbarOpen ? "open" : "closed"}>
      <div className="topNav">
        <div className="appLogo">PERSIN</div>
        <div
          className={
            navbarOpen
              ? "hamburger-menu-wrapper open"
              : "hamburger-menu-wrapper closed"
          }
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
              <Link to={navItem.link} key={index}>
                <li>
                  <span className="material-icons icon">
                    {navItem.itemIcon}
                  </span>
                  <div className="navItemText">{navItem.itemName}</div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="bottomNav">
        <span className="material-icons">exit_to_app</span>
        <div className="logout" onClick={handleClick}>
          Log out
        </div>
      </div>
    </nav>
  );
};

export default Nav;
