import { QueryClient, QueryClientProvider } from "react-query";

import Navbar from "./Components/Navbar";
import Topbar from "./Components/Topbar";
import QuickActionBar from "./Components/QuickActionBar";

import "./Assets/Styles/main.scss";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

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
