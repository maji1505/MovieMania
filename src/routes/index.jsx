import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Explore from "../pages/Explore"; // Ensure this path is correct
import Detail from "../pages/Detail";
import Search from "../pages/Search";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: ":explore",
        element: <Explore />
      },
      {
        path:":explore/:id",
        element:<Detail/>
      },
      {
        path:"search",
        element:<Search/>
      }
    ]
  }
]);

export default router;
