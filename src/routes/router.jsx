import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../pages/HomeLayout";
import ErrorPage from "../pages/ErrorPage";
import SignIn from "../Authentication/SignIn";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Authentication/Register";
import ForgotPassword from "../Authentication/ForgotPassword";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
        <Profile />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
