const express = require('express');
const { applyJob, getAppliedJobs, getApplicants } = require('../controllers/application.controller');
// const auth = require('../middleware/authentication');
const authenticate = require('../middleware/authentication');

const router = express.Router();


router.post('/apply/:id', authenticate  ,applyJob);
router.get('/applied-jobs', authenticate ,getAppliedJobs);
router.get('/:id/applicants' ,authenticate ,getApplicants);
router.put('/status/:id/update', authenticate, getApplicants);

module.exports = router;