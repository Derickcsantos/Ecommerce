const express = require('express');
const Product = require('../models/Product');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// Criar Produto
router.post('/', upload.single('image'), async (req, res) => {
    try {
      const { name, price, description, category, stock } = req.body;
  
      const newProduct = new Product({
        name,
        price,
        description,
        category,
        stock,
        image: req.file ? `/uploads/${req.file.filename}` : '', // Caminho da imagem
      });
  
      await newProduct.save();
      res.status(201).json({ message: 'Produto salvo com sucesso!' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao salvar produto', error: err.message });
    }
  });

// Listar Produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar Produto
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar Produto
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar produtos por nome ou categoria
router.get('/search', async (req, res) => {
    try {
        const { query, category } = req.query;

        // Criando o filtro dinâmico
        const filters = {};
        if (query) filters.name = new RegExp(query, 'i'); // Busca parcial no nome (case-insensitive)
        if (category) filters.category = category; // Filtra pela categoria exata

        // Buscando produtos com os filtros
        const products = await Product.find(filters);
        res.status(200).json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ message: 'Erro ao buscar produtos', error });
    }
});
  

module.exports = router;
