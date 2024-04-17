import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddItem from './pages/addItem/AddItem';
import EditItem from './pages/editItem/EditItem';
import NavbarComponent from './components/Navbar';
import LoginPage from './pages/credential/Login';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import RegisterPage from './pages/credential/Register';
import HomePage from './pages/home/Home';



function App() {

  const router = createBrowserRouter([
    {
      path: "/register",
      element: <RegisterPage />,
      loader: () => {
        if (localStorage.getItem('access_token')) {
          return redirect('/')
        }
        return null
      }
    },
    {
      path: "/login",
      element: <LoginPage />,
      loader: () => {
        if (localStorage.getItem('access_token')) {
          return redirect('/')
        }
        return null
      }
    },
    {
      element: <MainLayout />,
      loader: () => {
        if (!localStorage.getItem('access_token')) {
          return redirect('/login')
        }
        return null
      },
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/add-grocery",
          element: <AddItem/>
        },
        {
          path: "/update-grocery/:id",
          element: <EditItem/>
        }
      ]

    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;