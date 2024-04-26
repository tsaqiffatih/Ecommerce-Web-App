const express = require('express');
const router = express.Router();
const { authentication } = require('../../middleware/auth')
const orderController = require('../../controllers/order.controller');

// Routes for CRUD operations on orders
router.post('/create', authentication, orderController.createOrder);
router.patch('/update-status', authentication, orderController.updateOrder)
router.delete('/destroy/:orderId', authentication,orderController.deleteOrderById);

// router.get('/getOne', authentication, orderController.getOrderByUserId);

module.exports = router;
