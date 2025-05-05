import React, { useEffect } from "react";
import Register from "./components/Register";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Feed from "./components/Feed";
import AppLayout from "./components/AppLayout";
import Loader from "./components/Loader";
import UserProfile from "./components/UserProfile";
import { Toaster } from "react-hot-toast";

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
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
