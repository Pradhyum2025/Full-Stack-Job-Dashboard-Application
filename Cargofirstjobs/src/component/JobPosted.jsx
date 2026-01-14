// ---------------------------------------------------------------------
// <copyright file="JobPosted.jsx" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React, { useState } from 'react';
import JobForm from './JobForm';
import { MdAdd } from "react-icons/md";
import JobList from './JobList';
import { Button } from '../components/ui/button';

function JobPosted() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Job Post modal
  const handleJobPosted = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
        <div className="flex justify-between items-center mb-3">
          <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Posted Job</h1>
              <p className="text-gray-600"> Post new jobs daily to grow CargoFirst!</p>
            </div>

          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/110 gap-2 px-[1rem] hover:scale-[1.02]  transition-all duration-300 text-white flex items-center"
            size="lg"
            >
            <MdAdd  className='text-xl'/>
            Post New Job
          </Button>
        </div>
        
        {/*  -----------  Job liSt component -----------   */}
        <JobList />

        {/* Modal for Job Form ------------*/}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 md:p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-blue-600 flex justify-center w-full">Post a New Job</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <JobForm onJobPosted={handleJobPosted} />
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default JobPosted;

