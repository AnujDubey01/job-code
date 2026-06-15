const express = require('express');
const multer = require('multer');

const { registerUser, loginUser, updateUser, refreshAccessToken, logoutUser } = require('../controllers/user.controller');
const authenticate = require('../middleware/authentication');

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/', // files will be stored in uploads folder
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const router = express.Router();

// Add multer middleware to register route
router.post('/register', upload.single('file'), registerUser);
router.post('/login', loginUser);
router.put('/profile/update', authenticate, updateUser);
router.post('/logout', authenticate, logoutUser);

module.exports = router;
