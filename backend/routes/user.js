const express = require('express')
const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require('../middleware/password');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/signup', password, userCtrl.signup)
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getUserProfile);
router.delete('/:id', auth, userCtrl.deleteAccount);
router.patch('/:id', auth, password, multer, userCtrl.modifyAccount);
module.exports = router;