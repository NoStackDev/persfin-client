import React from "react";

import Navbar from "./Components/Navbar";
import Topbar from "./Components/Topbar";
import QuickActionBar from "./Components/QuickActionBar";
import Overview from "./Pages/Overview";
// import Inflow from "./Pages/Inflow";
// import Outflow from "./Pages/Outflow";
// import Budget from "./Pages/Budget";
// import Savings from "./Pages/Savings";




import "./Assets/Styles/main.scss";

function App() {


  return (
    <div>
      <Navbar />
      <Topbar />
      <QuickActionBar />
      <Overview />
      {/* <Inflow /> */}
      {/* <Outflow /> */}
      {/* <Budget /> */}
      {/* <Savings /> */}
    </div>
  );
}

export default App;
