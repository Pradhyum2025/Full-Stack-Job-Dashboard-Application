const Job = require('../models/Job');

const createJob = async (req, res) => {
  try {
    const { title, description, lastDate, company } = req.body;

    const job = new Job({
      title,
      description,
      lastDate,
      company,
      userId: req.userId
    });

    await job.save();
    res.status(201).json({ message: 'Job posted successfully', job });
  } catch (error) {
    console.error('Create Job Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Get Jobs Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, lastDate, company } = req.body;

    const job = await Job.findOne({ _id: id, userId: req.userId });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.lastDate = lastDate || job.lastDate;
    job.company = company || job.company;

    await job.save();
    res.json({ message: 'Job updated successfully', job });
  } catch (error) {
    console.error('Update Job Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({ _id: id, userId: req.userId });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    await Job.findByIdAndDelete(id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete Job Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob
};




