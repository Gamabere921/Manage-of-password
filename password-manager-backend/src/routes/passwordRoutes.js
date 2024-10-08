const express = require('express');
const { addPassword, getPasswords } = require('../controllers/passwordController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, addPassword);
router.get('/', authenticate, getPasswords);

module.exports = router;
