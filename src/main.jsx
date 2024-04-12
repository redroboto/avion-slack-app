import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import Root from "./routes/root.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Sign-up.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Channels from "./pages/DashboardChildren/Channels.jsx";
import Messages from "./pages/DashboardChildren/Messages.jsx";
import CreateMessage from "./pages/DashboardChildren/CreateMessage.jsx";
import Conversation from "./pages/DashboardChildren/Conversation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "channels",
        element: <Channels />,
        children: [
          {
            path: ":id",
            element: <Conversation receiver_class="Channel" />,
          },
        ],
      },
      {
        path: "messages",
        element: <Messages />,
        children: [
          {
            path: "create-message",
            element: <CreateMessage />,
          },
          {
            path: ":id",
            element: <Conversation receiver_class="User" />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
