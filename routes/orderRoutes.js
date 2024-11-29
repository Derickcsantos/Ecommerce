const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Rota para listar todos os pedidos
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('user cart.product'); // Popula os dados do usuário e dos produtos
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar pedidos.' });
    }
});


// Rota para criar um novo pedido
router.post('/orders', async (req, res) => {
    console.log('Requisição recebida:', req.body);
    try {
        const { user, cart, deliveryAddress, totalAmount } = req.body;

        // Validar se os dados estão corretos
        if (!user || !cart || !cart.length || !deliveryAddress || !totalAmount) {
            return res.status(400).json({ message: 'Dados incompletos.' });
        }

        // Criar o pedido
        const newOrder = new Order({
            user,
            cart,
            deliveryAddress,
            totalAmount,
            status: 'pendente', // ou qualquer outro status inicial
            createdAt: new Date()
        });

        await newOrder.save();

        // Retornar o pedido criado
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Erro ao salvar pedido:', error);
        res.status(500).json({ message: 'Erro ao processar o pedido.' });
    }
});



// Exportar as rotas
module.exports = router;
