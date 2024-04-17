require('dotenv').config()
const { Order, User } = require('../models');
const midtransClient = require('midtrans-client');

class orderController {
    // Create a new order
    static async createOrder(req, res, next) {
        try {
            const { totalAmount } = req.body;
            const { id } = req.user
            const userId = id

            const user = await User.findByPk(id)

            if (!user) throw { name: 'invalid' }

            if (!user.phoneNumber) {
                return null
            }
            const snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.SERVER_KEY
            });

            const parameter = {
                "transaction_details": {
                    "order_id": (Math.random() * 1000) + 2,
                    "gross_amount": totalAmount
                },
                "credit_card": {
                    "secure": false
                },
                "customer_details": {
                    "fullName": user.fullname,
                    "email": user.email,
                    "phone": "08111222333"
                }
            };

            const transaction = await snap.createTransaction(parameter);

            // ambil token transaksi
            const transactionToken = transaction.token;
            const url = transaction.redirect_url;

            // creat order dengan status pending, simpan token transaksi
            const order = await Order.create({ userId, totalAmount, status: 'pending', transactionToken });

            // console.log(url);
            res.status(200).json({
                transaction
            })
        } catch (error) {
            console.log(error);
            res.send(error);
            // next(error);
        }
    };


    // Get all orders
    static async getAllOrders(req, res, next) {
        try {
            const orders = await Order.findAll();
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    };

    // Get order by ID
    static async getOrderById(req, res, next) {
        try {
            const { orderId } = req.params;
            const order = await Order.findByPk(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    };

    // Update order by ID
    static async updateOrderById(req, res, next) {
        try {
            const { orderId } = req.params;
            const { totalAmount, status } = req.body;
            const order = await Order.findByPk(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            order.totalAmount = totalAmount;
            order.status = status;
            await order.save();
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    };

    // Delete order by ID
    static async deleteOrderById(req, res, next) {
        try {
            const { orderId } = req.params;
            const order = await Order.findByPk(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            await order.destroy();
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    };

}

module.exports = orderController
