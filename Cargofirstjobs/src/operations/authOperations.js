// ---------------------------------------------------------------------
// <copyright file="authOperations.js" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import axiosInstance from "../helper/axiosInstance";


export const loginUser = async (credentials) => {

  try {
    const response = await axiosInstance.post(`/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.log('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  console.log("ENV--------->>>",process.env.REACT_APP_API_BASE_URL);
  try {
    const response = await axiosInstance.post(`/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.log('Register error:', error);
    throw error;
  }
};








