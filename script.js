function filterMenu(category) {
    // تحديث شكل الأزرار
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');

    // إخفاء وإظهار العناصر
    let cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'flex';
        } else {
            if (card.classList.contains(category)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
}
