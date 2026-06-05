const express = require('express');
const { registerCompany, getCompany, getcompanyById, updateCompany, deleteCompany } = require('../controllers/company.controller');
const authenticate = require('../middleware/authentication');


const router = express.Router();

router.post('/register', authenticate, registerCompany);
router.get('/get', authenticate, getCompany);

router.get('/get/:id',authenticate, getcompanyById);
router.put('/update/:id',authenticate, updateCompany);
router.delete('/delete/:id', authenticate, deleteCompany);


module.exports = router;