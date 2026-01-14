// ---------------------------------------------------------------------
// <copyright file="customerOperations.js" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import axiosInstance from "../helper/axiosInstance";
import { getAuthToken } from '../helper/config';



export const fetchCustomerAnalysis = async () => {
  try {
    const token = getAuthToken();
    const response = await axiosInstance.get(`/customers/analysis`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Fetch customer analysis error:', error);
    throw error;
  }
};

export const fetchTopCompanies = async () => {
  try {
    // console.log("ENV--------->>>",process.env.REACT_APP_API_BASE_URL);
    const token = getAuthToken();
    const response = await axiosInstance.get(`/customers/top-companies`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Fetch top companies error:', error);
    throw error;
  }
};

export const fetchApplicationTrends = async () => {
  try {
    const token = getAuthToken();
    const response = await axiosInstance.get(`/customers/application-trends`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Fetch application trends error:', error);
    throw error;
  }
};






