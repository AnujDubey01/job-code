const express = require('express');

const { registerUser, loginUser, updateUser, refreshAccessToken, logoutUser } = require('../controllers/user.controller');
const authenticate = require('../middleware/authentication');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile/update',authenticate, updateUser);
// router.post('/refresh-token', refreshAccessToken);
router.post('/logout', authenticate, logoutUser);


module.exports = router;