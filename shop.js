document.addEventListener('DOMContentLoaded', () => {
    let products = [];
    const productGrid = document.getElementById('product-grid');
    const filterSelect = document.getElementById('filter');
    const sortSelect = document.getElementById('sort');

    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(products);
        })
        .catch(error => console.error('Error loading products:', error));

    function renderProducts(products) {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });
        attachCartListeners();
    }

    function attachCartListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart!');
    }

    filterSelect.addEventListener('change', () => {
        const filterValue = filterSelect.value;
        const filteredProducts = filterValue === 'all' ? products : products.filter(p => p.category === filterValue);
        renderProducts(filteredProducts);
    });

    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const sortedProducts = [...products].sort((a, b) => {
            if (sortValue === 'name') return a.name.localeCompare(b.name);
            if (sortValue === 'price') return a.price - b.price;
        });
        renderProducts(sortedProducts);
    });
});
