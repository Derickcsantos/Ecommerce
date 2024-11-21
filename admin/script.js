document.getElementById('view-products').addEventListener('click', loadProducts);

function loadProducts() {
    fetch('http://127.0.0.1:3000/api/products')
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.getElementById('products');
            productsContainer.innerHTML = '';  // Limpa o conteúdo antes de adicionar novos produtos

            if (data.length > 0) {
                data.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.innerHTML = `
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>Preço: R$${product.price}</p>
                    `;
                    productsContainer.appendChild(productDiv);
                });
            } else {
                productsContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar produtos:', error);
        });
}

document.getElementById('add-product').addEventListener('click', () => {
    // Aqui você pode adicionar a lógica para adicionar um produto
    alert('Adicionar produto ainda não implementado.');
});
