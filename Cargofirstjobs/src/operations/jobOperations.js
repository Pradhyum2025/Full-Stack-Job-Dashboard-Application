// ---------------------------------------------------------------------
// <copyright file="jobOperations.js" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import { getAuthToken } from '../helper/config';
import axiosInstance from '../helper/axiosInstance';

//Create a new Job
export const createJob = async (jobData) => {
  try {
    const token = getAuthToken();
    const response = await axiosInstance.post(`/jobs`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.job;
  } catch (error) {
    console.log('Create job error:', error);
    throw error;
  }
};

// Fetch a jobs
export const fetchJobs = async () => {
  try {
    const token = getAuthToken();
    const response = await axiosInstance.get(`/jobs`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Fetch jobs error:', error);
    throw error;
  }
};

// Update Request
export const updateJob = async (jobId, jobData) => {
  try {
    const token = getAuthToken();
    const response = await axiosInstance.put(`/jobs/${jobId}`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.job;
  } catch (error) {
    console.log('Update job error:', error);
    throw error;
  }
};

// Delete request
export const deleteJob = async (jobId) => {
  try {
    const token = getAuthToken();
    await axiosInstance.delete(`/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return true;
  } catch (error) {
    console.log('Delete job error:', error);
    throw error;
  }
};



