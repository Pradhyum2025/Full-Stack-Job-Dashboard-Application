// ---------------------------------------------------------------------
// <copyright file="Dashboard.jsx" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FiBarChart2, FiUser, FiPlus, FiTrendingUp } from 'react-icons/fi';
import { fetchTopCompanies } from '../operations/customerOperations';
import { fetchJobs } from '../operations/jobOperations';
import { FaArrowRightLong } from "react-icons/fa6";
import { setJobs } from '../store/slices/jobSlice';

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const jobs = useSelector((state) => state.jobs.jobs);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetched Data
  useEffect(() => {
    loadChartData();
    loadJobs();
  }, []);


  // Get job and chart Data
  const loadChartData = async () => {
    try {
      setLoading(true);
      const data = await fetchTopCompanies();
      const companies = data.companies || data || [];



      if (companies.length > 0) {
        const formatted = companies.map(item => ({
          name: item.company || item.name || 'Unknown',
          value: item.count || item.value || 0
        }));
        setChartData(formatted);
      }
    } catch (error) {
      console.log('Error loading chart data:', error);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  const loadJobs = async () => {
    try {
      const jobsData = await fetchJobs();
      console.log("Job DATA",jobsData)
      dispatch(setJobs(jobsData));
    } catch (error) {
      console.log('Error fetching jobs:', error);
    }
  };


  //for only 2 recent jobs
  const recentJobs = jobs.slice(0, 2);

  // for dynamic stats by png
  const stats = [
    { title: 'Total Jobs', value: jobs.length, color: 'bg-blue-500' },
    { title: 'Active Posts', value: jobs.filter(j => new Date(j.lastDate) >= new Date()).length, color: 'bg-green-500' },
    { title: 'Applications', value: 24, color: 'bg-purple-500' },
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* --------------  Header by Pradhyum Garashya --------- */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your job dashboard today.</p>
        </div>

        {/* ------ Stats Cards by ------ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 rounded-xl bg-gray-50"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </CardDescription>
                  <div
                    className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center bg-opacity-90`}
                  >
                    <FiBarChart2 className="text-white text-lg" />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-end justify-between mt-3">
                  <div className="text-3xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>

                  {stat.change !== undefined && (
                    <span
                      className={`text-sm font-medium ${stat.change > 0
                        ? "text-green-600"
                        : stat.change < 0
                          ? "text-red-600"
                          : "text-gray-500"
                        }`}
                    >
                      {stat.change > 0 ? "+" : ""}
                      {stat.change}%
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

          ))}
        </div>

        {/*  ------------ Charts and Content Grid ------------  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Customer Analysis Preview */}
          <Card className="border-0 shadow-lg bg-gray-100">
            <CardHeader>
              <CardTitle>Customer Analysis</CardTitle>
              <CardDescription>Top companies by applications</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-[250px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                    <p className="text-gray-500 text-sm">Loading data...</p>
                  </div>
                </div>
              ) : chartData.length === 0 ? (
                <div className="h-[250px] flex items-center justify-center">
                  <p className="text-gray-500">No company data available</p>
                </div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3811c7c5" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <Button
                    onClick={() => navigate('/analysis')}
                    className=" w-full flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-all duration-300 "
                    variant="outline"
                  >
                    View Full Analysis <FaArrowRightLong />
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Recent Jobs */}
          <Card  className="border-0 shadow-lg bg-gray-100 h-full pb-5 lg:pb-0">
            <CardHeader>
              <CardTitle>Recent Job Posts</CardTitle>
              <CardDescription>Your latest job listings</CardDescription>
            </CardHeader>
            <CardContent className="md:h-[76%] ">
              {recentJobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No jobs posted yet</p>
                  <Button onClick={() => navigate('/jobs')}>
                    Post Your First Job
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-10  justify-between h-full">
                  <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div
                      key={job._id}
                      className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors border border-gray-200"
                    >
                      <h4 className="font-semibold text-gray-900 mb-1">{job.title}</h4>
                      <p className="text-sm text-blue-600 font-medium mb-2">{job.company}</p>
                      <p className="text-xs text-gray-500">Deadline: {new Date(job.lastDate).toLocaleDateString()}</p>
                    </div>
                  ))}
                  </div>
                  <Button
                    onClick={() => navigate('/jobs')}
                    variant="outline"
                    className="w-full flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-all duration-300  "
                  >
                    View All Jobs <FaArrowRightLong />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="px-0 md:px-6">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with these options</CardDescription>
          </CardHeader>
          <CardContent className="px-0 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => navigate('/jobs')}
                className="h-[4.5rem] flex flex-col items-center justify-center text-lg text-gray-200 hover:text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-300"
              >
                <FiPlus className="text-2xl mb-2" />
                Post New Job
              </Button>
              <Button
                onClick={() => navigate('/analysis')}
                variant="outline"
                className="h-[4.5rem] flex flex-col items-center justify-center text-lg text-gray-200 hover:text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-300"
              >
                <FiTrendingUp className="text-2xl mb-2" />
                View Analytics
              </Button>
              <Button
                onClick={() => navigate('/profile')}
                variant="outline"
                className="h-[4.5rem] flex flex-col items-center justify-center text-lg text-gray-200 hover:text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-300"
              >
                <FiUser className="text-2xl mb-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
