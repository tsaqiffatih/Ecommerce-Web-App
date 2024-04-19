require('dotenv').config()
const { Order, User } = require('../models');
const midtransClient = require('midtrans-client');

class orderController {
    // Create a new order
    static async createOrder(req, res, next) {
        try {
            const { totalAmount } = req.body;
            // console.log(totalAmount, "<<<<<<");
            const { id } = req.user
            const userId = id

            const user = await User.findByPk(id)
            if (!user) throw { name: 'invalid' }


            const snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.SERVER_KEY,
                clientKey: process.env.CLIENT_KEY
            });
            // console.log(user);

            const orderId = Date.now() - Math.floor(Math.random() * 1000)

            const parameter = {
                "transaction_details": {
                    "order_id": orderId,
                    "gross_amount": totalAmount
                },
                "credit_card": {
                    "secure": false
                },
                "customer_details": {
                    "fullName": user.fullname,
                    "email": user.email
                }
            };


            const transaction = await snap.createTransaction(parameter);

            // ambil token transaksi
            const transactionToken = transaction.token;
            const url = transaction.redirect_url;

            // creat order dengan status pending, simpan token transaksi
            const order = await Order.create({ userId, totalAmount, status: 'pending', transactionToken,orderId });

            res.status(200).json({
                token: transactionToken,
                redirect_url: url,
                order_Id: orderId
            })
        } catch (error) {
            console.log(error);
            res.send(error);
            next(error);
        }
    };


    // Update order status
    static async updateOrder(req, res, next) {
        try {
            const { order_id } = req.headers;
            console.log(order_id, '<<<<<<');
            const order = await Order.findOne({ where: { order_id } });
            // if (!order) {
            //     return res.status(404).json({ message: 'Order not found' });
            // }
            const totalAmount = order.totalAmount;
            const status = order.status;
            await order.save();
            res.status(200).json(status);
        } catch (error) {
            next(error);
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
