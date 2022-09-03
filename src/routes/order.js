const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

router.get('/', orderController.index);
router.post('/find', orderController.findOrder);
router.post('/add' , orderController.addOrderWithOneItem);
router.post('/add-mutil-item' , orderController.addOrderWithMultiItem); 
// router.post('/delete', orderController.deleteOrder);

module.exports = router;