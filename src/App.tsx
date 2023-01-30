import Navbar from "./Components/Navbar";
import Topbar from "./Components/Topbar";
import QuickActionBar from "./Components/QuickActionBar";

import "./Assets/Styles/main.scss";
import { Navigate, Outlet } from "react-router-dom";
import pb from "./lib/pocketbase";

function App() {
  return (
    <>
      {pb.authStore.isValid ? (
        <div className="app">
          <Navbar />
          <Topbar />
          <div className="wrapper">
            <QuickActionBar />
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}

export default App;
