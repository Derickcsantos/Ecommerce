document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    loadProducts();
});

async function loadFeaturedProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
    const featuredProductsDiv = document.getElementById('featured-products');
    featuredProductsDiv.innerHTML = products.map(product => `
        <div class="product">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>R$ ${product.price}</p>
            <img src="${product.image}" alt="${product.name}" />
        </div>
    `).join('');
}

async function loadProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
    const productListDiv = document.getElementById('product-list');
    productListDiv.innerHTML = products.map(product => `
        <div class="product">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>R$ ${product.price}</p>
            <img src="${product.image}" alt="${product.name}" />
        </div>
    `).join('');
}