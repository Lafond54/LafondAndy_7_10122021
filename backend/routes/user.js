const express = require('express')
const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require('../middleware/password');
const auth = require('../middleware/auth');


router.post('/signup', password, userCtrl.signup)
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getUserProfile);
router.delete('/:id', auth, userCtrl.deleteAccount);
module.exports = router;