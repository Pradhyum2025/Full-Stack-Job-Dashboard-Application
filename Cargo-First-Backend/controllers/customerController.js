const Job = require('../models/Job');

// Get top companies by number of job postings
const getTopCompanies = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Get all jobs for the user, group by company, and count
    const jobs = await Job.find({ userId });
    
    // Group by company and count
    const companyCounts = {};
    jobs.forEach(job => {
      const company = job.company;
      companyCounts[company] = (companyCounts[company] || 0) + 1;
    });
    
    // Convert to array and sort by count
    const topCompanies = Object.entries(companyCounts)
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 companies
    
    res.json({ companies: topCompanies });
  } catch (error) {
    console.error('Get Top Companies Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get application trends (monthly job posting trends)
const getApplicationTrends = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Get all jobs for the user
    const jobs = await Job.find({ userId }).sort({ createdAt: 1 });
    
    // Group by month
    const monthlyData = {};
    
    jobs.forEach(job => {
      const date = new Date(job.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleString('default', { month: 'short' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthName,
          date: monthKey,
          count: 0,
          applications: 0
        };
      }
      monthlyData[monthKey].count++;
      monthlyData[monthKey].applications++;
    });
    
    // Convert to array and sort by date
    const trends = Object.values(monthlyData)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-12); // Last 12 months
    
    res.json({ trends });
  } catch (error) {
    console.error('Get Application Trends Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get general customer analysis data
const getCustomerAnalysis = async (req, res) => {
  try {
    const userId = req.userId;
    
    const jobs = await Job.find({ userId });
    
    const totalJobs = jobs.length;
    const totalCompanies = new Set(jobs.map(job => job.company)).size;
    
    // Calculate active jobs (jobs where lastDate is in the future)
    const activeJobs = jobs.filter(job => {
      const lastDate = new Date(job.lastDate);
      return lastDate >= new Date();
    }).length;
    
    // Get most recent job
    const recentJob = jobs.length > 0 
      ? jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
      : null;
    
    res.json({
      totalJobs,
      totalCompanies,
      activeJobs,
      recentJob: recentJob ? {
        title: recentJob.title,
        company: recentJob.company,
        createdAt: recentJob.createdAt
      } : null
    });
  } catch (error) {
    console.error('Get Customer Analysis Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTopCompanies,
  getApplicationTrends,
  getCustomerAnalysis
};

