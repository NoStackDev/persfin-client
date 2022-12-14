import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import { Budget, Inflow, Outflow, Overview, Savings } from "./Pages";

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
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
