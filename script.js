// 1. إعدادات الرابط (ضع رابط الـ CSV الخاص بك هنا)
const sheetURL = "YOUR_SHEET_CSV_URL_HERE"; 

let menuData = [];
let cart = [];

// 2. جلب البيانات من Google Sheets
async function fetchMenu() {
    try {
        const response = await fetch(sheetURL);
        const data = await response.text();
        
        // تحويل الـ CSV لمصفوفة كائنات
        const rows = data.split('\n').slice(1); 
        menuData = rows.map((row, index) => {
            const columns = row.split(',');
            return {
                id: index,
                name: columns[0]?.trim(),
                price: parseFloat(columns[1]?.trim()) || 0,
                category: columns[2]?.trim(),
                img: columns[3]?.trim() || "https://via.placeholder.com/150"
            };
        });

        renderCategories();
        renderMenu(menuData);
    } catch (error) {
        console.error("خطأ في التحميل:", error);
        document.getElementById('menu-container').innerHTML = "حدث خطأ أثناء تحميل المنيو.";
    }
}

// 3. عرض الأقسام بشكل احترافي
function renderCategories() {
    const container = document.getElementById('categories-container');
    const categories = ['الكل', ...new Set(menuData.map(item => item.category))];
    
    container.innerHTML = categories.map((cat, index) => `
        <div class="cat-item ${index === 0 ? 'active' : ''}" onclick="filterByCategory(this, '${cat}')">
            <div class="cat-img-wrapper">
                <img src="https://ui-avatars.com/api/?name=${cat}&background=random&color=fff" alt="${cat}">
            </div>
            <p>${cat}</p>
        </div>
    `).join('');
}

// 4. فلترة المنتجات
function filterByCategory(element, category) {
    document.querySelectorAll('.cat-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    const filtered = category === 'الكل' 
        ? menuData 
        : menuData.filter(item => item.category === category);
    renderMenu(filtered);
}

// 5. عرض المنتجات (Menu)
function renderMenu(items) {
    const container = document.getElementById('menu-container');
    container.innerHTML = items.map(item => `
        <div class="product-card">
            <img src="${item.img}" alt="${item.name}">
            <div class="product-info">
                <h4>${item.name}</h4>
                <p class="price">${item.price} ج.م</p>
                <button class="btn-add" onclick="addToCart(${item.id})">
                    <i class="fas fa-plus"></i> إضافة للسلة
                </button>
            </div>
        </div>
    `).join('');
}

// 6. وظائف السلة (Cart)
function addToCart(id) {
    const item = menuData.find(p => p.id === id);
    cart.push(item);
    updateCartUI();

    // تأثير انسيابي عند الإضافة
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = "scale(1.2)";
    setTimeout(() => cartIcon.style.transform = "scale(1)", 200);
}

function updateCartUI() {
    // تحديث العدد
    document.getElementById('cart-count').innerText = cart.length;
    
    // تحديث العناصر داخل السلة
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-row">
            <div>
                <strong>${item.name}</strong>
                <div style="font-size: 12px; color: #666;">${item.price} ج.م</div>
            </div>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    // تحديث الإجمالي
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total-amount').innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// 7. التحكم في فتح وإغلاق السلة
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

// 8. الإرسال للواتساب (الطلب النهائي)
function sendToWhatsApp() {
    const name = document.getElementById('user-name').value;
    const phone = document.getElementById('user-phone').value;
    const address = document.getElementById('user-address').value;

    if (!name || !phone || !address) {
        alert("برجاء إدخال بيانات التوصيل كاملة");
        return;
    }

    if (cart.length === 0) {
        alert("سلة الطلبات فارغة!");
        return;
    }

    let orderText = cart.map(item => `- ${item.name} (${item.price} ج.م)`).join('%0A');
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    const whatsappNumber = "201016991319"; 
    const message = `*طلب جديد من مطعم ابن سوريا*%0A%0A` +
                    `*العميل:* ${name}%0A` +
                    `*الموبايل:* ${phone}%0A` +
                    `*العنوان:* ${address}%0A%0A` +
                    `*الطلبات:*%0A${orderText}%0A%0A` +
                    `*الإجمالي:* ${total} ج.م%0A%0A` +
                    `تم الطلب من خلال الويب سايت ✅`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

// تشغيل جلب البيانات عند فتح الصفحة
fetchMenu();
