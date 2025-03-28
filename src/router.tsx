import { createBrowserRouter } from "react-router-dom";
//import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/login";
import HomePage from "./layouts/HomePage";
import AuthPending from "./layouts/AuthPending";
import { Feed } from "./pages/feed/feed";
import DashBoard from "./layouts/DashBoard";
import Root from "./layouts/Root";

export const router = createBrowserRouter([

  {
    path:"/",
    element:<Root/>,
    children:[
    {
        path: "",
        element: <DashBoard />, //root element will be loaded first on app load and will query for user credentials 
        children: [
              { 
                path: "",
                element: <HomePage />,
              },
              {
                path: "feed",
                element: <Feed />,
              },
            ],
          },
          {
            path: "auth",  // route for unauthenticated users 
            element: <AuthPending />,
            children: [
              { 
                path: "login", 
                element: <LoginPage />,
              },
            ],
      }
    ]
  }
 
]);
