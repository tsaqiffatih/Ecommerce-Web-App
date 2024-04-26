const { Product } = require('../models');


class productController {
    // Create a new product
    static async createProduct(req, res, next) {
        try {
            const { name, price, imageUrl } = req.body;
            if (price < 1000) throw {name: 'Price must be greater than 1000'}
            const product = await Product.create({ name, price, imageUrl });
            res.status(201).json(product);
        } catch (error) {
            console.log(error);
            res.send(error)
            next(error);
        }
    };

    // Get all products
    static async getAllProducts(req, res, next) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            res.send(error)
            next(error);
        }
    };

    // Get product by ID
    static async getProductById(req, res, next) {
        try {
            const { productId } = req.params;
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            console.log(error);
            res.send(error)
            next(error);
        }
    };

    // Update product by ID
    static async updateProductById(req, res, next) {
        try {
            const { productId } = req.params;
            const { name, price, imageUrl } = req.body;
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            product.name = name;
            product.description = description;
            product.price = price;
            await product.save();
            res.status(200).json(product);
        } catch (error) {
            console.log(error);
            res.send(error)
            next(error);
        }
    };

    // Delete product by ID
    static async deleteProductById(req, res, next) {
        try {
            const { productId } = req.params;
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await product.destroy();
            res.status(204).end();
        } catch (error) {
            console.log(error);
            res.send(error)
            next(error);
        }
    };

}

module.exports = productController;
