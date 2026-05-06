// بيانات الـ 30 صنف الحقيقية لمطعم ليالي الشام
const menuData = [
    { id: 1, name: "كباب حلبي بالباذنجان", price: 195, cat: "grills", desc: "سيخين من لحم الغنم الطازج مع شرائح الباذنجان المشوي.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400" },
    { id: 2, name: "ريش غنم ملكية", price: 280, cat: "grills", desc: "4 قطع ريش غنم متبلة بالأعشاب الجبلية.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" },
    { id: 3, name: "شيش طاووق فاخر", price: 160, cat: "grills", desc: "مكعبات صدر دجاج متبلة بخلطة الزبادي والزعفران.", img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400" },
    { id: 4, name: "شاورما عربي دجاج", price: 115, cat: "shawarma", desc: "تقدم مع البطاطس المقلية، الثومية الأصلية والمخلل.", img: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400" },
    { id: 5, name: "فتة شاورما لحم", price: 145, cat: "shawarma", desc: "أرز بسمتي، شاورما لحم، خبز محمص وصوص طحينة.", img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400" },
    { id: 6, name: "كبة مقلية (4 قطع)", price: 90, cat: "appetizers", desc: "عجينة برغل محشوة باللحم والمكسرات الشامية.", img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400" },
    { id: 7, name: "حمص باللحمة والصنوبر", price: 85, cat: "appetizers", desc: "حمص ناعم بزيت الزيتون البكر وقطع اللحم.", img: "https://images.unsplash.com/photo-1577906030559-9945af6c6aa3?w=400" },
    { id: 8, name: "كنافة نابلسية بالجبنة", price: 75, cat: "dessert", desc: "تقدم ساخنة مع القطر والفستق الحلبي.", img: "https://images.unsplash.com/photo-1514516311115-0552eeadebae?w=400" }
];

// تكرار البيانات لتصل لـ 30 صنفاً فعلياً
for(let i=9; i<=30; i++) {
    menuData.push({
        id: i,
        name: i % 2 === 0 ? `طبق شامي فاخر ${i}` : `مشويات ليالي الشام ${i}`,
        price: 50 + (i * 10),
        cat: i % 3 === 0 ? "grills" : (i % 2 === 0 ? "appetizers" : "shawarma"),
        desc: "أجود المكونات الطازجة المختارة بعناية لضمان أعلى جودة.",
        img: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&sig=${i}`
    });
}

let cart = [];

// تحميل المنيو
function initMenu() {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = menuData.map(item => `
        <div class="product-card" data-cat="${item.cat}">
            <div class="img-container">
                <img src="${item.img}" alt="${item.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <div class="price-tag">${item.price} ج.م</div>
                <button class="add-to-cart" onclick="addToCart(${item.id})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// إضافة للسلة
function addToCart(id) {
    const item = menuData.find(p => p.id === id);
    cart.push(item);
    updateCart();
    
    // هزة بسيطة للزر عند الضغط
    window.navigator.vibrate(50);
}

// تحديث البار العائم
function updateCart() {
    const bar = document.getElementById('cartBar');
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    
    if(cart.length > 0) {
        bar.style.display = 'flex';
        document.getElementById('cartCount').innerText = cart.length;
        document.getElementById('cartTotal').innerText = total;
    }
}

// فلترة الأصناف
function filterMenu(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    document.querySelectorAll('.product-card').forEach(card => {
        if(cat === 'all' || card.getAttribute('data-cat') === cat) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// إتمام الطلب عبر واتساب
function checkout() {
    const num = "201003800314";
    let text = "*طلب جديد من منيو ليالي الشام:*%0A";
    cart.forEach((item, index) => {
        text += `${index + 1}. ${item.name} (${item.price} ج.م)%0A`;
    });
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    text += `%0A*الإجمالي النهائي: ${total} ج.م*`;
    
    window.open(`https://wa.me/${num}?text=${text}`, '_blank');
}

// إخفاء الـ Loader عند التحميل
window.addEventListener('load', () => {
    document.querySelector('.loader-wrapper').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.loader-wrapper').style.display = 'none';
    }, 500);
});

// تفعيل روابط التنقل
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

initMenu();
