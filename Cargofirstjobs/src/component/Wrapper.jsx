// ---------------------------------------------------------------------
// <copyright file="Wrapper.jsx" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// wraper protected route handler
export default function ProtectedRoute({ element }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  return isAuthenticated ? element : <Navigate to="/login" />;
}
