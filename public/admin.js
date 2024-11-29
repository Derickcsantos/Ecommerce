document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const productList = document.getElementById('admin-product-list');
  
    const fetchProducts = () => {
      fetch('/api/products')
        .then(response => response.json())
        .then(products => {
          productList.innerHTML = products.map(product => `
            <div>
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <p><strong>R$${product.price}</strong></p>
              <button onclick="editProduct('${product._id}', '${product.name}', '${product.price}', '${product.description}')">Editar</button>
              <button onclick="deleteProduct('${product._id}')">Deletar</button>
            </div>
          `).join('');
        });
    };
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      const id = document.getElementById('product-id').value;
      const name = document.getElementById('product-name').value;
      const price = document.getElementById('product-price').value;
      const description = document.getElementById('product-description').value;
  
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/api/products/${id}` : '/api/products';
  
      fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, description })
      }).then(() => {
        form.reset();
        fetchProducts();
      });
    });
  
    window.editProduct = (id, name, price, description) => {
      document.getElementById('product-id').value = id;
      document.getElementById('product-name').value = name;
      document.getElementById('product-price').value = price;
      document.getElementById('product-description').value = description;
    };
  
    window.deleteProduct = id => {
      fetch(`/api/products/${id}`, { method: 'DELETE' }).then(fetchProducts);
    };
  
    fetchProducts();
  });