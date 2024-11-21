// server/controllers/orderController.js
const Order = require('../models/Order');

// Obter todos os pedidos
exports.getOrders = async (req, res) => {
    const orders = await Order.find().populate('productId');
    res.json(orders);
};

// Criar pedido
exports.createOrder = async (req, res) => {
    const { productId, customerName, customerAddress, customerPhone, total } = req.body;
    const newOrder = new Order({ productId, customerName, customerAddress, customerPhone, total });
    await newOrder.save();
    res.status(201).json(newOrder);
};
