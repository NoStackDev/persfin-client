import Navbar from "./Components/Navbar";
import Topbar from "./Components/Topbar";
import QuickActionBar from "./Components/QuickActionBar";

import "./Assets/Styles/main.scss";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Topbar />
      <div className="wrapper">
        <QuickActionBar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
