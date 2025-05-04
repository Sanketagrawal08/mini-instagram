import React, { useEffect } from "react";
import Register from "./components/Register";
import {
  createBrowserRouter,
  RouterProvider,
  useOutletContext,
} from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Feed from "./components/Feed";
import AppLayout from "./components/AppLayout";
import Loader from "./components/Loader";
import Message from "../src/components/Message";
import UserProfile from "./components/UserProfile";
import { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import useAuthStore from "./store/useAuthStore";
import useChatStore from "./store/useChatStore";

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
        path: "/message",
        element: <Message />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
    ],
  },
]);

const App = () => {
  const user = useAuthStore();
  const { setSocket,setOnlineUser } = useChatStore();
  useEffect(() => {
    if (user.user._id) {
      const socketio = io("http://localhost:3000", {
        query: {
          userId: user.user._id,
        },
        transports: ["websocket"],
      });

      setSocket(socketio);
      socketio.on("getOnlineUser",(users) => {
        setOnlineUser(users);
      })
      return () => {
        socketio.close();
        setSocket(null);
      };
    } else {
      socketio.close();
      setSocket(null);
    }
  }, [user]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
