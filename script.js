'use strict';

let cart = [];
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartBody = document.getElementById('cartBody');
const bnBadge = document.getElementById('bnBadge');
const navBadge = document.getElementById('navBadge');
const grandVal = document.getElementById('grandVal');
const cartEmpty = document.getElementById('cartEmpty');
const cartFoot = document.getElementById('cartFoot');

// وظيفه فتح وإغلاق السلة
function toggleCart(isOpen) {
    cartDrawer.classList.toggle('open', isOpen);
    cartBackdrop.classList.toggle('open', isOpen);
}

document.getElementById('bnCartBtn').addEventListener('click', () => toggleCart(true));
document.getElementById('openCartBtn').addEventListener('click', () => toggleCart(true));
document.getElementById('closeCartBtn').addEventListener('click', () => toggleCart(false));
cartBackdrop.addEventListener('click', () => toggleCart(false));

// إضافة العناصر
document.querySelectorAll('.atc-btn, .mc-add').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: parseInt(btn.dataset.price),
            img: btn.dataset.img,
            qty: 1
        };
        addToCart(item);
    });
});

function addToCart(newItem) {
    const existing = cart.find(i => i.id === newItem.id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push(newItem);
    }
    updateUI();
    showToast();
}

function updateUI() {
    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
    bnBadge.textContent = navBadge.textContent = totalItems;
    bnBadge.classList.toggle('show', totalItems > 0);
    navBadge.classList.toggle('show', totalItems > 0);

    cartBody.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartFoot.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartFoot.style.display = 'block';
        cart.forEach(item => {
            total += item.price * item.qty;
            cartBody.innerHTML += `
                <div class="ci">
                    <img src="${item.img}" class="ci-img">
                    <div class="ci-info">
                        <div>${item.name}</div>
                        <div style="color:var(--r)">${item.price} ج.م</div>
                    </div>
                    <div>
                        <button class="ci-btn" onclick="updateQty('${item.id}', -1)">-</button>
                        <span class="ci-qty">${item.qty}</span>
                        <button class="ci-btn" onclick="updateQty('${item.id}', 1)">+</button>
                    </div>
                </div>`;
        });
    }
    grandVal.textContent = total + ' ج.م';
}

window.updateQty = (id, change) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
        updateUI();
    }
};

function showToast() {
    const t = document.getElementById('toast');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}
