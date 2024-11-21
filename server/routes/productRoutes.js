const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Criar um novo produto
router.post('/', async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body;

    // Validação simples dos campos obrigatórios
    if (!name || !price || !description || !category || !stock) {
      return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
    }

    const newProduct = new Product({ name, price, description, category, stock, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar produto', error: err.message });
  }
});

// Listar produtos com paginação
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Padrão: 10 produtos por página
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Product.countDocuments(); // Conta o total de produtos

    res.status(200).json({ products, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar produtos', error: err.message });
  }
});

// Atualizar um produto
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error: err.message });
  }
});

// Deletar um produto
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar produto', error: err.message });
  }
});

module.exports = router;
