router.post('/checkout', async (req, res) => {
    const { userId, cart, address } = req.body;

    console.log('Dados recebidos:', req.body);  // Adiciona um log aqui para verificar o corpo da requisição

    if (!userId || !cart || !address) {
        return res.status(400).json({ error: 'Dados inválidos' });
    }

    try {
        // Criando o pedido no banco de dados
        const order = new Order({
            userId,
            cart,
            address
        });

        await order.save();
        res.status(201).json({ message: 'Pedido realizado com sucesso!' });
    } catch (error) {
        console.log('Erro ao processar o pedido:', error);  // Adiciona um log do erro aqui
        res.status(500).json({ error: 'Erro ao processar o pedido' });
    }
});
