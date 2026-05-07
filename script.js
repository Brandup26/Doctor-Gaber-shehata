let cart = [];

function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('open');
    document.getElementById('cartBackdrop').classList.toggle('open');
    renderCart();
}

document.getElementById('openCartBtn').onclick = toggleCart;
document.getElementById('bnCartBtn').onclick = toggleCart;
document.getElementById('closeCartBtn').onclick = toggleCart;
document.getElementById('cartBackdrop').onclick = toggleCart;

function addToCart(p) {
    let item = cart.find(i => i.id === p.id);
    if(item) item.qty++; else cart.push({...p, qty: 1});
    updateUI();
    showToast();
}

function updateUI() {
    let totalQty = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('navBadge').innerText = totalQty;
    document.getElementById('bnBadge').innerText = totalQty;
    document.getElementById('navBadge').classList.toggle('show', totalQty > 0);
    document.getElementById('bnBadge').classList.toggle('show', totalQty > 0);
    renderCart();
}

function renderCart() {
    let body = document.getElementById('cartBody');
    if(cart.length === 0) {
        document.getElementById('cartEmpty').style.display = 'block';
        document.getElementById('cartFoot').style.display = 'none';
        body.innerHTML = '';
    } else {
        document.getElementById('cartEmpty').style.display = 'none';
        document.getElementById('cartFoot').style.display = 'block';
        let total = 0;
        body.innerHTML = cart.map(i => {
            total += i.price * i.qty;
            return `<div class="ci" style="display:flex; padding:10px; border-bottom:1px solid #222; align-items:center; gap:10px;">
                <img src="${i.img}" style="width:50px; border-radius:8px;">
                <div style="flex:1"><div>${i.name}</div><div style="color:red">${i.price} ر.س</div></div>
                <div>${i.qty}x</div>
            </div>`;
        }).join('');
        document.getElementById('grandVal').innerText = total + ' ر.س';
        document.getElementById('checkoutTotal').innerText = total + ' ر.س';
    }
}

function showToast() {
    let t = document.getElementById('toast');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

function filterMenu(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.mc, .feat-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? 'block' : 'none';
    });
}
