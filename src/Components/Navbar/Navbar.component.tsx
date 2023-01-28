import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pb from "../../lib/pocketbase";

import navbarItems from "./NavbarConfig";

import "./Navbar.style.scss";

type Props = {};

const Nav = (props: Props) => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const [selectedNav, setSelectedNav] = useState<number>(0);
  const navigate = useNavigate();
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !navbarRef.current ||
        navbarRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setNavbarOpen(false);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [navbarRef]);

  const handleNavClick = (navItemId: number) => {
    setSelectedNav(navItemId);
    setNavbarOpen(false);
  };

  const handleLogout = () => {
    pb.authStore.clear();
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      <div id="blur" className={navbarOpen ? "open" : "closed"}></div>
      <nav className={navbarOpen ? "open" : "closed"} ref={navbarRef}>
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
                <Link
                  to={navItem.link}
                  key={index}
                  onClick={() => handleNavClick(navItem.id)}
                >
                  <li className={navItem.id === selectedNav ? "active" : ""}>
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
          <div onClick={handleLogout}>
            <span className="material-icons">exit_to_app</span>
            <div className="logout">Log out</div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
