let cart = JSON.parse(localStorage.getItem('cart')) || []; // Mantém o carrinho sempre atualizado com o localStorage

window.addToCart = function(product) {
    // Verifica se o produto já está no carrinho
    const existingProduct = cart.find(item => item._id === product._id);

    if (!existingProduct) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart)); // Atualiza o carrinho no localStorage
        alert('Produto adicionado ao carrinho!');
    } else {
        alert('Produto já está no carrinho.');
    }
};

// Após o carregamento do DOM
document.addEventListener('DOMContentLoaded', async () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('welcomeMessage').textContent = `Bem-vindo, ${user.email}`;

    // Recarregar produtos ao logar
    const products = await fetchProducts();
    renderProducts(products);

    // Pesquisar produtos
    document.getElementById('searchButton').addEventListener('click', () => {
        const query = document.getElementById('searchQuery').value.toLowerCase();
        const category = document.getElementById('searchCategory').value;

        const filteredProducts = products.filter(product => {
            const matchesQuery = product.name.toLowerCase().includes(query);
            const matchesCategory = category ? product.category === category : true;
            return matchesQuery && matchesCategory;
        });

        renderProducts(filteredProducts);
    });

    // Função para renderizar produtos
    function renderProducts(products) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        if (products.length === 0) {
            productList.innerHTML = '<p>Nenhum produto encontrado.</p>';
            return;
        }

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Categoria: ${product.category}</p>
                <p>Preço: R$${product.price.toFixed(2).replace('.', ',')}</p>
                <p>Descrição: ${product.description}</p>
                <button class="viewProduct" data-product='${JSON.stringify(product)}'>Ver Produto</button>
            `;
            productList.appendChild(productDiv);
        });

        // Adicionar evento ao botão "Ver Produto"
        document.querySelectorAll('.viewProduct').forEach(button => {
            button.addEventListener('click', event => {
                const product = JSON.parse(event.target.getAttribute('data-product'));
                openModal(product);
            });
        });
    }

    // API de produtos
    async function fetchProducts() {
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Erro ao buscar produtos.');
            }
        } catch {
            return [];
        }
    }

    // Modal
    function openModal(product) {
        document.getElementById('modalImage').src = `/uploads/${product.image || 'default.jpg'}`;
        document.getElementById('modalName').textContent = product.name;
        document.getElementById('modalCategory').textContent = `Categoria: ${product.category}`;
        document.getElementById('modalPrice').textContent = `Preço: R$${product.price.toFixed(2).replace('.', ',')}`;
        document.getElementById('modalDescription').textContent = product.description;
        document.getElementById('addToWishlist').onclick = () => addToWishlist(product);
        document.getElementById('addToCart').onclick = () => addToCart(product); // Chama a função para adicionar ao carrinho
        document.getElementById('productModal').style.display = 'block';
    }

    // Fechar Modal
    const closeModalButton = document.getElementById('closeModal');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            document.getElementById('productModal').style.display = 'none';
        });
    }

    // Checkout Modal
    const concluirCompraButton = document.getElementById('concluirCompraButton');
    if (concluirCompraButton) {
        concluirCompraButton.addEventListener('click', () => {
            openCheckoutModal();
        });
    }

    // Função para abrir o modal de checkout
    function openCheckoutModal() {
        const modal = document.getElementById('checkoutModal');
        const summary = document.getElementById('orderSummary');
        summary.innerHTML = '';

        if (cart.length === 0) {
            summary.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            cart.forEach(item => {
                summary.innerHTML += `<p>${item.name} - R$${item.price.toFixed(2).replace('.', ',')}</p>`;
            });
        }

        modal.style.display = 'block';
    }

    // Fechar modal de checkout
    const closeCheckoutModalButton = document.getElementById('closeCheckoutModal');
    if (closeCheckoutModalButton) {
        closeCheckoutModalButton.addEventListener('click', () => {
            document.getElementById('checkoutModal').style.display = 'none';
        });
    }

    // Finalizar Compra
    const finalizePurchaseButton = document.getElementById('finalizePurchase');
    if (finalizePurchaseButton) {
        finalizePurchaseButton.addEventListener('click', async () => {
            const address = document.getElementById('deliveryAddress').value; // Pegando o endereço do formulário

            if (address.trim() === '') {
                alert('Por favor, informe o endereço de entrega.');
                return;
            }

            const user = JSON.parse(localStorage.getItem('loggedInUser'));
            const cart = JSON.parse(localStorage.getItem('cart')) || []; // Recuperando o carrinho

            const order = {
                userId: user._id,  // ID do usuário logado
                cart,
                address
            };

            try {
                const response = await fetch('/api/checkout', { // Enviando para o servidor
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(order)  // Dados do pedido
                });

                const result = await response.text(); // Pega a resposta como texto
                console.log(result); // Veja o que o servidor está retornando
                try {
                    const jsonResult = JSON.parse(result); // Tenta converter em JSON
                    if (response.ok) {
                        alert('Compra finalizada com sucesso!');
                        localStorage.setItem('cart', JSON.stringify([])); // Limpar o carrinho após a compra
                        document.getElementById('checkoutModal').style.display = 'none';
                    } else {
                        alert('Erro ao finalizar a compra: ' + jsonResult.error);
                    }
                } catch (error) {
                    alert('Erro ao comunicar com o servidor: ' + error.message);
                }
            } catch (error) {
                alert('Erro ao finalizar a compra: ' + error.message);
            }
        });
    }
});
