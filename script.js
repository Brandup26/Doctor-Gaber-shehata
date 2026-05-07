const menuData = [
    { id: 1, name: "شاورما فراغ", price: 80, category: "شاورما", img: "https://via.placeholder.com/150" },
    { id: 2, name: "كباب سوري", price: 150, category: "مشويات", img: "https://via.placeholder.com/150" },
    { id: 3, name: "فتوش", price: 40, category: "مقبلات", img: "https://via.placeholder.com/150" },
];

let cart = [];

// عرض المنتجات
function displayMenu(items) {
    const container = document.getElementById('menu-container');
    container.innerHTML = items.map(item => `
        <div class="product-card">
            <img src="${item.img}" alt="${item.name}">
            <div class="product-info">
                <h4>${item.name}</h4>
                <p>${item.price} ج.م</p>
                <button class="btn-add" onclick="addToCart(${item.id})">إضافة للسلة</button>
            </div>
        </div>
    `).join('');
}

// إضافة للسلة مع أنيميشن
function addToCart(id) {
    const product = menuData.find(p => p.id === id);
    cart.push(product);
    updateCart();

    // أنيميشن للأيقونة
    const icon = document.querySelector('.cart-icon');
    icon.classList.add('animate-cart');
    setTimeout(() => icon.classList.remove('animate-cart'), 500);
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map((item, index) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span>${item.name}</span>
            <span>${item.price} ج.م</span>
        </div>
    `).join('');
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

// إرسال للواتساب
function sendToWhatsApp() {
    const name = document.getElementById('user-name').value;
    const phone = document.getElementById('user-phone').value;
    const address = document.getElementById('user-address').value;

    if (!name || !phone || !address) {
        alert("برجاء إكمال البيانات");
        return;
    }

    let itemsList = cart.map(i => `- ${i.name} (${i.price} ج.م)`).join('%0A');
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    const whatsappNumber = "201016991319"; // الرقم اللي طلبته
    const message = `طلب جديد من مطعم ابن سوريا:%0A%0A` +
                    `الاسم: ${name}%0A` +
                    `الهاتف: ${phone}%0A` +
                    `العنوان: ${address}%0A%0A` +
                    `الطلبات:%0A${itemsList}%0A%0A` +
                    `الإجمالي: ${total} ج.م`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

// تشغيل عند التحميل
displayMenu(menuData);
