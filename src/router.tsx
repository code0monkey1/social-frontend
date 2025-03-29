import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/login";
import AuthPending from "./layouts/AuthPending";
import { Feed } from "./pages/feed/feed";
import DashBoard from "./layouts/DashBoard";
import Root from "./layouts/Root";

export const router = createBrowserRouter([
  {
    path:"/",
    element:<Root/>, //root element will be loaded first on app load and will query for user credentials 
    children:[
          {
              path: "",
              element: <DashBoard />, 
              children: [
                
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
