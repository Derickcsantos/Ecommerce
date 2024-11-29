const express = require('express');
const router = express.Router();

// Usuários fictícios para login
const users = [
    { email: 'derickcampossantos1@gmail.com', password: 'Basquete-1', isAdmin: true },
];

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Verificar se o usuário já existe
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'Usuário já cadastrado.' });
    }

    // Adicionar novo usuário com nível 1 (não-admin)
    users.push({ name, email, password, isAdmin: false });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

// Rota de login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.status(200).json({ message: 'Login bem-sucedido', isAdmin: user.isAdmin });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
});

module.exports = router;
