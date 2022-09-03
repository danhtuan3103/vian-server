const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

router.get('/', homeController.index);
router.post('/', homeController.post);
router.post('/item/delete', homeController.delete);

module.exports = router;
