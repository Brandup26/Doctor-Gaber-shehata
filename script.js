const cartOpen = document.getElementById('cartOpen');
const cartClose = document.getElementById('cartClose');
const cartPanel = document.getElementById('cartPanel');
const overlay = document.getElementById('overlay');

let cart = [];

// Toggle Cart
const toggleCart = (state) => {
    cartPanel.classList.toggle('open', state);
    overlay.classList.toggle('active', state);
};

cartOpen.onclick = () => toggleCart(true);
cartClose.onclick = () => toggleCart(false);
overlay.onclick = () => toggleCart(false);

// Add to Cart Logic
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.onclick = (e) => {
        const card = e.target.closest('.card');
        const item = {
            id: card.dataset.id,
            name: card.dataset.name,
            price: parseInt(card.dataset.price)
        };
        
        cart.push(item);
        updateCartUI();
        
        // Haptic feedback simulation
        btn.style.transform = 'scale(0.8)';
        setTimeout(() => btn.style.transform = 'scale(1)', 100);
    };
});

function updateCartUI() {
    document.querySelector('.cart-count').innerText = cart.length;
    // يمكنك إضافة منطق عرض العناصر هنا في cartItems
}
