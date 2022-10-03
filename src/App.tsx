import React, { useState } from "react";

// import Navbar from "./Components/Navbar";
import Topbar from "./Components/Topbar";
import QuickActionBar from "./Components/QuickActionBar";
// import Overview from "./Pages/Overview";
// import Inflow from "./Pages/Inflow";
// import Outflow from "./Pages/Outflow";
// import Savings from "./Pages/Savings";




import "./Assets/Styles/main.scss";
import Budget from "./Pages/Budget";

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
      {/* <Overview /> */}
      {/* <Inflow /> */}
      {/* <Outflow /> */}
      <Budget />
      {/* <Savings /> */}
    </div>
  );
}

export default App;
