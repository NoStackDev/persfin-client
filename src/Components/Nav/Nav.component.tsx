import React from "react";
import navItems from "./NavConfig";

import "./Nav.style.scss";

type Props = {};

const Nav = (props: Props) => {
  return (
    <nav>
      <ul>
        {navItems.map((navItem, index) => {
          return <li key={index}>{navItem}</li>;
        })}
      </ul>
    </nav>
  );
};

export default Nav;
