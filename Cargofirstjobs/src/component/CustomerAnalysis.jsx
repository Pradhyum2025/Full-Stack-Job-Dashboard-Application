// ---------------------------------------------------------------------
// <copyright file="CustomerAnalysis.jsx" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiRefreshCw } from 'react-icons/fi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ChartContainer, ChartTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend } from '../components/ui/chart';
import { Button } from '../components/ui/button';
import { fetchTopCompanies, fetchApplicationTrends, fetchCustomerAnalysis } from '../operations/customerOperations';

function CustomerAnalysis() {
  const [topCompanies, setTopCompanies] = useState([]);
  const [applicationTrends, setApplicationTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['hsl(var(--primary))', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const companiesData = await fetchTopCompanies().catch((err) => {
        console.log('Error fetching top companies:', err);
        return { companies: [] };
      });
      
      const trendsData = await fetchApplicationTrends().catch((err) => {
        console.log('Error fetching trends:', err);
        return { trends: [] };
      });
      
      const analysisData = await fetchCustomerAnalysis().catch((err) => {
        console.log('Error fetching analysis:', err);
        return {};
      });

      const companies = companiesData.companies || companiesData || [];
      const trends = trendsData.trends || trendsData || [];

      setTopCompanies(companies);
      setApplicationTrends(trends);
      
      // if (companies.length > 0 || trends.length > 0) {
      //   toast.success('Data loaded successfully');
      // } else {
      //   toast.error('No data available');
      // }
    } catch (err) {
      setError('Failed to load data');
      toast.error('Failed to load data');
      console.log('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    loadData();
  };

  const formatTopCompanies = () => {
    if (!topCompanies || topCompanies.length === 0) {
      return [];
    }
    return topCompanies.map(item => ({
      name: item.company || item.name || 'Unknown',
      value: item.count || item.value || 0
    }));
  };

  const formatTrends = () => {
    if (!applicationTrends || applicationTrends.length === 0) {
      return [];
    }
    return applicationTrends.map(item => ({
      month: item.month || item.date || 'Unknown',
      applications: item.count || item.applications || 0
    }));
  };

  const topCompaniesData = formatTopCompanies();
  const trendsData = formatTrends();
  const pieData = topCompaniesData.slice(0, 6);

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600">Loading analysis data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
        <div className="max-w-7xl mx-auto">
           {/* <div className='text-gray-400 text-md'> Know your customer details </div> */}

          {/* Header for your customer analysis page */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Customer Analysis</h1>
              <p className="text-gray-600 ">Comprehensive analysis of job applications and company statistics</p>
            </div>
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              className="flex items-center gap-2"
              disabled={loading}
            >
              <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {error && (
            <Card className="border-0 shadow-lg mb-6 bg-red-50 border-red-200">
              <CardContent className="py-4">
                <p className="text-red-600">{error}</p>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">


            {/* Top Companies Bar Chart by Pradhyum */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Top Companies by Applications</CardTitle>
                <CardDescription>Companies with most job applications</CardDescription>
              </CardHeader>
              <CardContent>
                {topCompaniesData.length === 0 ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-gray-500">No company data available</p>
                  </div>
                ) : (
                  <ChartContainer>
                    <BarChart data={topCompaniesData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        className="text-sm"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        className="text-sm"
                      />
                      <ChartTooltip />
                      <Bar 
                        dataKey="value" 
                        fill="hsl(var(--primary))" 
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>

            {/* Application Trends Line Chart  by Pradhyum */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Application Trends</CardTitle>
                <CardDescription>Monthly application trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                {trendsData.length === 0 ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-gray-500">No trend data available</p>
                  </div>
                ) : (
                  <ChartContainer>
                    <LineChart data={trendsData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        className="text-sm"
                      />
                      <YAxis 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        className="text-sm"
                      />
                      <ChartTooltip />
                      <Line 
                        type="monotone" 
                        dataKey="applications" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                      />
                    </LineChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Pie Chart by Pradhyum */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Company Distribution</CardTitle>
              <CardDescription>Percentage distribution of applications by top companies</CardDescription>
            </CardHeader>
            <CardContent>
              {pieData.length === 0 ? (
                <div className="h-[400px] flex items-center justify-center">
                  <p className="text-gray-500">No data available for pie chart</p>
                </div>
              ) : (
                <ChartContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </div>
    </div>
  );
}

export default CustomerAnalysis;
