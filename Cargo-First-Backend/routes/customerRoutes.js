const express = require('express');
const router = express.Router();
const { getTopCompanies, getApplicationTrends, getCustomerAnalysis } = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/top-companies', authMiddleware, getTopCompanies);
router.get('/application-trends', authMiddleware, getApplicationTrends);
router.get('/analysis', authMiddleware, getCustomerAnalysis);

module.exports = router;





