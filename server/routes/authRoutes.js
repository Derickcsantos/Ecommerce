const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Login do usuário
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

    // Gerar o token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, 'secrectKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao realizar login', error: err.message });
  }
});

module.exports = router;
