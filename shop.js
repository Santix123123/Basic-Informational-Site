document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const productGrid = document.getElementById('product-grid');
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <a href="#" class="btn">Buy Now</a>
                `;
                productGrid.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error loading products:', error));
});
