import "./styles/reset.scss";

import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { callFetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";

import HomeLayout from "./components/HomeLayout/HomeLayout";

import BookPage from "./pages/book";
import ContactPage from "./pages/contact";
import LoginPage from "./pages/login";

import Home from "./components/Home";
import RegisterPage from "./pages/register";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import DashBoard from "./components/Dashboard/DashBoard";
import OrderPage from "./pages/order/OrderPage";
import Payment from "./components/Order/Payment";
import HistoryDeliver from "./pages/history/HistoryOrder";
import OrderTable from "./components/Admin/Order/OrderTable";
import BookTable from "./components/Admin/Book/BookTable";
import UserTable from "./components/Admin/User/UserTable";

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);

  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;

    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book/:slug",
          element: <BookPage />,
        },
        {
          path: "order",
          element: (
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "payment",
          element: <Payment />,
        },
        {
          path: "history",
          element: (
            <ProtectedRoute>
              <HistoryDeliver />
            </ProtectedRoute>
          ),
        },
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          ),
        },

        {
          path: "user",
          element: (
            <ProtectedRoute>
              <UserTable />
            </ProtectedRoute>
          ),
        },
        {
          path: "book",
          element: (
            <ProtectedRoute>
              <BookTable />
            </ProtectedRoute>
          ),
        },
        {
          path: "order",
          element: (
            <ProtectedRoute>
              <OrderTable />
            </ProtectedRoute>
          ),
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      {isLoading === false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
