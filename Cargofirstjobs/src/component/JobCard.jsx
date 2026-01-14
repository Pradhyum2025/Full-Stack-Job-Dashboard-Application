// ---------------------------------------------------------------------
// <copyright file="JobCard.jsx" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React from 'react'
import { FaBuilding, FaCalendar, FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md';

export default function JobCard({ job, onEdit, onDelete }) {

  

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
  <div className="bg-gray-100 rounded-2xl shadow-md overflow-hidden  duration-100 hover:shadow-sm  flex flex-col border border-gray-100">
  {/* Our Card Body */}
  <div className="p-6 flex-grow">
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
      <span className="text-xs bg-blue-200 text-blue-600 px-2 py-1 rounded-full font-semibold">
        {job.type || "Full-Time"}
      </span>
    </div>

    <p className="flex items-center gap-2 text-sm font-medium text-blue-600 mb-2">
      <span className="p-1.5 bg-blue-50 rounded-full">
        <FaBuilding className="text-blue-500" />
      </span>
      {job.company}
    </p>

    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
      {job.description}
    </p>

    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
      <span className="p-1.5 bg-red-50 rounded-full">
        <FaCalendar className="text-red-500" />
      </span>
      <span>Last Date: <span className="text-red-600 font-semibold">{getFormattedDate(job.lastDate)}</span></span>
    </div>
  </div>

  {/* Card Footer */}
  <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
    <div className="flex justify-end  items-center">

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(job)}
          className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition-all duration-200"
          title="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(job._id)}
          className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-all duration-200"
          title="Delete"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  </div>
</div>

  )
}
