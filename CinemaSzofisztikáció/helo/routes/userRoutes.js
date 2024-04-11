const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware');

const {register, login, getMe} = require('../Controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
module.exports = router;