import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProfilePage from "../pages/ProfilePage";
import SettingPage from "../pages/SettingPage";
import UserLoginRedirect from "./Redirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "shop", element: <Shop /> },
      {
        path: "cart",
        element: (
          <UserLoginRedirect>
            <Cart />
          </UserLoginRedirect>
        ),
      },
      {
        path: "profile",
        element: (
          <UserLoginRedirect>
            <ProfilePage />
          </UserLoginRedirect>
        ),
      },
      {
        path: "settings",
        element: (
          <UserLoginRedirect>
            <SettingPage />
          </UserLoginRedirect>
        ),
      },
    ],
  },
]);

export default router;
