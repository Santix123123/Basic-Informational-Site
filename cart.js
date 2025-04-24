document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });
        cartTotalContainer.textContent = `Total: $${total}`;
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.length;
    }

    checkoutButton.addEventListener('click', () => {
        alert('Checkout successful!');
        localStorage.removeItem('cart');
        renderCart();
        updateCartCount();
    });

    renderCart();
    updateCartCount();
});
