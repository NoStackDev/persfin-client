import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import { Login, Budget, Inflow, Outflow, Overview, Savings } from "./Pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "inflow",
        element: <Inflow />,
      },
      {
        path: "outflow",
        element: <Outflow />,
      },
      {
        path: "budget",
        element: <Budget />,
      },
      {
        path: "savings",
        element: <Savings />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
