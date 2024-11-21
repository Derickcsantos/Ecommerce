// Importando pacotes necessários
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const dotenv = require('dotenv');

// Carregando variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// A URI do MongoDB com o banco de dados "ecommerce"
const MONGO_URI = "mongodb+srv://Derick:Basquete-1@cluster0.dbu0v.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado ao banco "ecommerce"'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));


app.use(express.json());

// Servir arquivos estáticos das pastas
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Rotas da API
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Rota para página de administração
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin', 'index.html'));
});

// Página principal do cliente
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

// Middleware para tratar erros (caso algum erro ocorra em qualquer rota)
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log do erro no servidor
    res.status(500).json({ message: 'Algo deu errado. Por favor, tente novamente.' });  // Resposta genérica de erro
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
