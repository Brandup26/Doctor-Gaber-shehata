document.addEventListener('DOMContentLoaded', () => {
    const redLayer = document.querySelector('.red-layer');
    const pinkLayer = document.querySelector('.pink-layer');

    // تأثير دخول ناعم للطبقات
    setTimeout(() => {
        redLayer.style.transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
        redLayer.style.marginTop = '-50px';
        
        pinkLayer.style.transition = 'all 1.2s cubic-bezier(0.19, 1, 0.22, 1)';
        pinkLayer.style.marginTop = '-120px';
    }, 100);

    // إضافة تفاعل بسيط عند تحريك الهاتف (Parallax خفيف)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelector('.product-featured img').style.transform = 
            `translateY(${scrolled * 0.1}px)`;
    });
});
