const express = require('express');
const router = express.Router();

const bagController = require('../app/controllers/BagController');

router.get('/', bagController.index);
router.post('/', bagController.postBag);
router.post('/add', bagController.addItem);
router.post('/delete', bagController.deleteItem);


module.exports = router;
