const express = require('express');
const router = express.Router();
const {authentication} = require('../../middleware/auth') 
const orderController = require('../../controllers/order.controller');

// Routes for CRUD operations on orders
router.post('/create', authentication,orderController.createOrder);
router.get('/getall', orderController.getAllOrders);
router.get('/getOne/:orderId', orderController.getOrderById);
router.put('/update/:orderId', orderController.updateOrderById);
router.delete('/destroy/:orderId', orderController.deleteOrderById);

module.exports = router;
