import React, { useState } from "react";

import Topbar from "./Components/Topbar";

import "./Assets/Styles/main.scss";
import Overview from "./Pages/Overview";
import QuickActionBar from "./Components/QuickActionBar";
// import Navbar from "./Components/Navbar";

function App() {
  const [theme, setTheme] = useState("light");

  const changeTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.className = "";
    document.documentElement.classList.add(`theme-${theme}`);
  };

  return (
    <div>
      <button onClick={changeTheme}>Change Theme</button>
      {/* <Navbar /> */}
      <Topbar />
      <QuickActionBar />
      <Overview />
    </div>
  );
}

export default App;
