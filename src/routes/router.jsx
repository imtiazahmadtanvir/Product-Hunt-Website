import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../pages/HomeLayout";
import ErrorPage from "../pages/ErrorPage";
import SignIn from "../Authentication/SignIn";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Authentication/Register";
import ForgotPassword from "../Authentication/ForgotPassword";
import Profile from "../pages/Profile";
import AddProduct from "../pages/AddProduct";
import MyProduct from "../pages/MyProduct";
// import AllProduct from "../pages/AllProduct";
import DashboardLayout from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ProductReviewQueue from "../pages/ProductReviewQueue";
import ReportedContents from "../pages/ReportedContents";
import ManageUsers from "../pages/ManageUsers";
import AdminStatisticsPage from "../pages/AdminStatisticsPage";
import ManageCouponPage from "../pages/ManageCouponPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
  },

  {
    path:"dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
  ),
  errorElement: <ErrorPage />,
  children:[
    {
      path: "my-product",
      element: (
          <MyProduct></MyProduct>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "add-product",
      element: (
          <AddProduct></AddProduct>
      ),
      errorElement: <ErrorPage />,
     
    },
    {
      path: "my-profile",
      element: (
          <Profile></Profile>
      ),
      errorElement: <ErrorPage />,
     
    },
    {
      path: "product-review-queue",
      element: (
          <ProductReviewQueue></ProductReviewQueue>
      ),
      errorElement: <ErrorPage />,
     
    },
    {
      path: "reported-contents",
      element: (
          <ReportedContents></ReportedContents>
      ),
      errorElement: <ErrorPage />,
     
    },
    {
      path: "statistics",
      element: (
          <AdminStatisticsPage></AdminStatisticsPage>
      ),
      errorElement: <ErrorPage />,
     
    },
    {
      path: "manage-users",
      element: (
          <ManageUsers></ManageUsers>
      ),
      errorElement: <ErrorPage />,
     
    },
    {
      path: "manage-coupons",
      element: (
          <ManageCouponPage></ManageCouponPage>
      ),
      errorElement: <ErrorPage />,
     
    },
  ]
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
