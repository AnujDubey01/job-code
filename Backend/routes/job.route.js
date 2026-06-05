const express = require('express');
const authenticate = require('../middleware/authentication');
const { postJob, getAllJobs, getJobById, updateJob, getAdminJobs } = require('../controllers/job.controller');

const router = express.Router();

router.post('/post',authenticate,postJob);
router.get('/get', authenticate, getAllJobs);
router.get('/get/:id', authenticate, getJobById);
router.put('/update/:id', authenticate, updateJob);
router.get('/admin/jobs', authenticate, getAdminJobs);

module.exports = router;