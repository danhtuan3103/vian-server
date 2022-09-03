const express = require('express');
const router = express.Router();
const auth = require("../midleware/auth");


const userController = require('../app/controllers/UserController');

router.get('/', userController.index);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/auth', auth, userController.authPoint);
router.get('/free', userController.freePoint);
// router.post('/update', userController.updateUserOrder);
router.get('/:id', userController.getUser);

module.exports = router;
