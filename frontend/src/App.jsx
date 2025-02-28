import React from "react";
import Register from "./components/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Feed from "./components/Feed";
import AppLayout from "./components/AppLayout";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
    ]
  }
]);

const App = () => {
  return <RouterProvider router={routes} />;
};
export default App;