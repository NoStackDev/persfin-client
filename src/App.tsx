import React from "react";
// import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Navbar from "./Components/Navbar";
import Topbar from "./Components/Topbar";
import QuickActionBar from "./Components/QuickActionBar";


import "./Assets/Styles/main.scss";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Navbar />
        <Topbar />
        <div className="wrapper">
          <QuickActionBar />
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
