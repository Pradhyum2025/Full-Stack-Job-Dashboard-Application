import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import store from './store/store';
import './index.css';
import ProtectedRoute from './component/Wrapper';
import AppLayout from './layout/App_Layout';
import Login from './component/Login';
import Register from './component/Register';
import Dashboard from './component/Dashboard';
import JobPosted from './component/JobPosted';
import CustomerAnalysis from './component/CustomerAnalysis';
import Profile from './component/Profile';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <ProtectedRoute element={<Dashboard />} />,
      },
      {
        path: '/jobs',
        element: <ProtectedRoute element={<JobPosted />} />,
      },
      {
        path: '/analysis',
        element: <ProtectedRoute element={<CustomerAnalysis />} />,
      },
      {
        path: '/profile',
        element: <ProtectedRoute element={<Profile />} />,
      },
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
          color: "#fff",
          borderRadius: "0px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.25)",
          padding: "5px 20px",
          border: "1px solid rgba(255,255,255,0.1)",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </Provider>
  </React.StrictMode>
);

