const express = require('express');
const { protect } = require('../middleware/auth');
const {
  register,
  login,
  getMe,
  registerValidation,
  loginValidation,
} = require('../controllers/auth-controller');

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);

module.exports = router;
