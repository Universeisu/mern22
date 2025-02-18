import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProfilePage from "../pages/ProfilePage";
import SettingPage from "../pages/SettingPage";
import UserLoginRedirect from "./Redirect";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/index";
import AddProduct from"../pages/AddProduct/index";

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
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard", // This is the main dashboard page
        element: <Dashboard />,
      },
      {
        path: "add-product", // Unique path for adding a product
        element: <AddProduct />,
      },
    ],
  },
]);

export default router;
