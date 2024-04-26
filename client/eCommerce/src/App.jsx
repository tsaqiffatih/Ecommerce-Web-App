import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/Home.page";
import LoginPage from "./page/Login.page";
import RegisterPage from "./page/Register.page";
import MainLayout from "./component/MainLayout";

function App() {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/login",
          element: <LoginPage />
        },
        {
          path: "/register",
          element: <RegisterPage />
        },
        {
          path: "/",
          element: <HomePage />
        }
      ]

    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
