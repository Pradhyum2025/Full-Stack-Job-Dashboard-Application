// ---------------------------------------------------------------------
// <copyright file="JobList.jsx" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setJobs, deleteJob } from '../store/slices/jobSlice';
import { fetchJobs, deleteJob as deleteJobAPI } from '../operations/jobOperations';
import JobForm from './JobForm';
import JobCard from './JobCard';


function JobList() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {

    //Load Data
    const loadJobs = async () => {
      try {
        const jobsData = await fetchJobs();
        dispatch(setJobs(jobsData));
      } catch (error) {
        console.log('Error fetching jobs:', error);
      }
    };
    loadJobs();

  }, [dispatch]);

  // job edit handlers
  const handleEdit = (job) => {
    setEditingJob(job);
  };

  // handle Delete Job
  const handleDelete = async (jobId) => {
    try {
      await deleteJobAPI(jobId);
      dispatch(deleteJob(jobId));
      toast.success('Job deleted successfully!');
    } catch (error) {
      console.log('Error deleting job:', error);
      toast.error(error?.response?.data?.message || 'Failed to delete job. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
  };

  const handleJobUpdated = () => {
    setEditingJob(null);
    const loadJobs = async () => {
      try {
        const jobsData = await fetchJobs();
        dispatch(setJobs(jobsData));
      } catch (error) {
        console.log('Error fetching jobs:', error);
      }
    };
    loadJobs();
  };

  return (
    <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm border border-gray-200 h-full">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Posted Jobs</h2> */}
      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No jobs posted yet.</p>
          <p className="text-gray-400 text-sm">Get started by posting your first job at CargoFirst!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard job={job} onEdit={handleEdit} onDelete={handleDelete}/>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Edit Job</h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <JobForm 
                editJob={editingJob} 
                onJobPosted={handleJobUpdated}
                onCancel={handleCancelEdit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobList;

