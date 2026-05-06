const WHATSAPP_NUM = "201003800314";

// قاعدة بيانات الأصناف (30 صنف)
const products = [
    { id: 1, name: "كباب حلبي", price: 180, cat: "grills", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400" },
    { id: 2, name: "شيش طاووق", price: 140, cat: "grills", img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400" },
    { id: 3, name: "ريش غنم", price: 250, cat: "grills", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" },
    { id: 4, name: "شاورما دجاج فرط", price: 90, cat: "shawarma", img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400" },
    { id: 5, name: "فتة شاورما لحم", price: 110, cat: "shawarma", img: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400" },
    { id: 6, name: "كبة مقلية (4 قطع)", price: 80, cat: "appetizers", img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400" },
    { id: 7, name: "تبولة شامي", price: 45, cat: "appetizers", img: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=400" },
    { id: 8, name: "حمص باللحمة", price: 70, cat: "appetizers", img: "https://images.unsplash.com/photo-1577906030559-9945af6c6aa3?w=400" },
    { id: 9, name: "عصير برتقال فريش", price: 35, cat: "drinks", img: "https://images.unsplash.com/photo-1613478223719-2ab80260f423?w=400" },
    { id: 10, name: "كوكتيل ليالي الشام", price: 55, cat: "drinks", img: "https://images.unsplash.com/photo-1587888637140-849b25d80ef9?w=400" }
];

// تكرار الأصناف لتصل لـ 30 كعينة (يمكنك تعديل الأسماء لاحقاً)
for(let i=11; i<=30; i++) {
    products.push({
        id: i,
        name: "طبق شامي مميز " + i,
        price: 50 + (i*5),
        cat: i > 20 ? "drinks" : "grills",
        img: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&sig=${i}`
    });
}

let cart = [];

// وظيفة عرض المنتجات
function displayProducts(filter = 'all') {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = "";
    
    products.forEach(p => {
        if(filter === 'all' || p.cat === filter) {
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${p.img}" class="product-img">
                    <div class="product-info">
                        <h3>${p.name}</h3>
                        <div class="price-row">
                            <span class="price">${p.price} ج.م</span>
                            <button class="add-btn" onclick="addToCart(${p.id})">إضافة +</button>
                        </div>
                    </div>
                </div>
            `;
        }
    });
}

// إضافة للسلة
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
}

// تحديث واجهة السلة
function updateCartUI() {
    const cartBar = document.getElementById('cartBar');
    const count = document.getElementById('cartCount');
    const total = document.getElementById('cartTotal');
    
    if(cart.length > 0) {
        cartBar.style.display = 'flex';
        count.innerText = cart.length;
        const sum = cart.reduce((acc, curr) => acc + curr.price, 0);
        total.innerText = sum;
    }
}

// فلترة القائمة
function filterMenu(category) {
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
    displayProducts(category);
}

// إرسال الطلب للواتساب
function sendOrder() {
    let message = "طلب جديد من مطعم ليالي الشام:%0A------------------%0A";
    cart.forEach((item, index) => {
        message += `${index + 1}- ${item.name} (${item.price} ج.م)%0A`;
    });
    const total = cart.reduce((acc, curr) => acc + curr.price, 0);
    message += "------------------%0A";
    message += `*الإجمالي: ${total} ج.م*`;
    
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${message}`, '_blank');
}

// التشغيل الأولي
displayProducts();
