// 1. Splash Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash').style.opacity = '0';
        setTimeout(() => document.getElementById('splash').remove(), 500);
    }, 1500);
});

// 2. Modal Toggle
function openDetails() {
    document.getElementById('detailModal').classList.add('open');
    document.body.style.overflow = 'hidden'; // منع السكرول خلف المودال
}

function closeDetails() {
    document.getElementById('detailModal').classList.remove('open');
    document.body.style.overflow = 'auto';
}

// 3. Size Button Toggle
const btns = document.querySelectorAll('.size-btns button');
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});
