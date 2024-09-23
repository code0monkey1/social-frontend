import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/login";
import User from "./layouts/User";
import AuthPending from "./layouts/AuthPending";
import { Feed } from "./pages/feed/feed";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPending />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/user",
    element: <User />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "feed",
        element: <Feed />,
      },
    ],
  },
]);
