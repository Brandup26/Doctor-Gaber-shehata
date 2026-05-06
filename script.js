// تأثير بسيط عند إرسال النموذج
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('شكرًا لتواصلك معنا! سنرد عليك في أقرب وقت.');
    this.reset();
});

// تغيير لون الـ Navbar عند التمرير
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = '#eee';
    } else {
        nav.style.background = '#fff';
    }
});
