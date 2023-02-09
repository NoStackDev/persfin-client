import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import pb from "../../lib/pocketbase";

import navbarItems from "./NavbarConfig";

import "./Navbar.style.scss";
import Icons from "../Icons";

type Props = {};

const Nav = (props: Props) => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const [selectedNav, setSelectedNav] = useState<number>(0);
  const navigate = useNavigate();
  const navbarRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "theme-dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "class",
      localStorage.getItem("theme") || "theme-dark"
    );
  });

  useEffect(() => {
    const currentUrlPath = navbarItems.find(
      (navObj) => navObj.link.split("/")[0] === pathname.split("/")[1]
    );
    setSelectedNav(currentUrlPath?.id || 0);
  }, [pathname]);

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

  const switchTheme = () => {
    if (theme === "theme-light") {
      document.documentElement.setAttribute("class", "theme-dark");
      localStorage.setItem("theme", "theme-dark");
      setTheme("theme-dark");
      return;
    }
    document.documentElement.setAttribute("class", "theme-light");
    localStorage.setItem("theme", "theme-light");
    setTheme("theme-light");
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
                    <Icons icon={navItem.itemIcon} maxWidth="32px" />
                    <div className="navItemText">{navItem.itemName}</div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="bottomNav">
          <div className="theme-wrapper" onClick={switchTheme}>
            <button className="theme-switcher">
              <div className={`sun-moon ${theme}`}></div>
            </button>
            <span>Theme</span>
          </div>

          <div className="logout-wrapper" onClick={handleLogout}>
            <Icons icon="exit_to_app" maxWidth="32px" />
            <div className="logout">Log out</div>
          </div>

          <div className="user-email">{pb.authStore.model?.email}</div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
