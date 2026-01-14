const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const customerRoutes = require('./routes/customerRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_API_BASE_URL,
  credentials: true,  
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/customers', customerRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Job Dashboard API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




