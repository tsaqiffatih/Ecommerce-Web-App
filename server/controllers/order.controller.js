require('dotenv').config()
const { Order, User } = require('../models');
const midtransClient = require('midtrans-client');

class orderController {
    // Create a new order
    static async createOrder(req, res, next) {
        try {
            const { totalAmount } = req.body;

            const { id } = req.userData
            const userId = id

            const user = await User.findByPk(id)
            if (!user) throw { name: 'invalid' }


            const snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.SERVER_KEY,
                clientKey: process.env.CLIENT_KEY
            });

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
            console.log(url);

            const order = await Order.create({ userId, totalAmount, status: 'pending', transactionToken, orderId });

            res.status(200).json({
                token: transactionToken,
                redirect_url: url,
                order_Id: orderId
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    };


    // Update order status
    static async updateOrder(req, res, next) {
        try {
            const { order_id } = req.headers;
            console.log(order_id, '<<<<<<');
            const order = await Order.findOne({ where: { id: order_id } });
            // if (!order) {
            //     return res.status(404).json({ message: 'Order not found' });
            // }
            const totalAmount = order.totalAmount;
            const status = order.status;
            await order.save();
            res.status(200).json(status);
        } catch (error) {
            console.log(error);
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
            console.log(error);
            // next(error);
        }
    };

    // Get order by ID
    static async getOrderByUserId(req, res, next) {
        try {
            const { id } = req.userData
            const order = await Order.findAll({
                where: { UserId: id }
            })
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    };

}

module.exports = orderController
