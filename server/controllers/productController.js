// server/controllers/productController.js
const Product = require('../models/Product');

// Obter todos os produtos
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// Adicionar produto
exports.addProduct = async (req, res) => {
    const { name, description, price, image, category } = req.body;
    const newProduct = new Product({ name, description, price, image, category });
    await newProduct.save();
    res.status(201).json(newProduct);
};
