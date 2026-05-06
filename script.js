document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Hide Loader
    const loader = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    });

    // 2. Category Filter Logic
    const categoryItems = document.querySelectorAll('.category-item');
    const foodCards = document.querySelectorAll('.food-card');

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update Active State
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const filter = item.getAttribute('data-filter');

            // Filter Animation
            foodCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // 3. Smooth Reveal on Scroll
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.food-card, .glass-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // 4. Active Bottom Nav on Scroll
    window.addEventListener('scroll', () => {
        let current = "";
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-link");

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
});
