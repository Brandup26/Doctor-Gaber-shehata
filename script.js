/* =============================================
   JUICY QR MENU — SCRIPT.JS
   Interactions, Animations & State
   ============================================= */

'use strict';

/* ── CART STATE ── */
let cartCount = 3;
let toastTimer = null;

/* ── DOM REFS ── */
const cartBadge     = document.querySelector('.cart-badge');
const cartNavBadge  = document.getElementById('cartNavBadge');
const cartToast     = document.getElementById('cartToast');
const categoriesScroll = document.getElementById('categoriesScroll');
const menuGrid      = document.getElementById('menuGrid');
const promoBanners  = document.getElementById('promoBanners');
const promoDots     = document.querySelectorAll('.dot');
const mainBody      = document.getElementById('mainBody');

/* ════════════════════════════════════════════
   FADE-UP INTERSECTION OBSERVER
   ════════════════════════════════════════════ */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay based on position
      const delay = (entry.target.dataset.delay || 0);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.fade-up').forEach((el, i) => {
  el.dataset.delay = i * 80;
  fadeObserver.observe(el);
});

/* ════════════════════════════════════════════
   ADD TO CART
   ════════════════════════════════════════════ */
function addToCart(btn) {
  cartCount++;

  // Update badges
  if (cartBadge) cartBadge.textContent = cartCount;
  if (cartNavBadge) cartNavBadge.textContent = cartCount;

  // Animate badge
  animateBadge(cartNavBadge);

  // Button state
  const originalHTML = btn.innerHTML;
  btn.classList.add('added');
  btn.innerHTML = '<span>✓ تمت الإضافة</span>';
  btn.disabled = true;

  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = originalHTML;
    btn.disabled = false;
  }, 2000);

  // Show toast
  showToast();

  // Haptic-like ripple
  createRipple(btn);
}

function animateBadge(el) {
  if (!el) return;
  el.style.transform = 'scale(1.5)';
  el.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
  setTimeout(() => {
    el.style.transform = 'scale(1)';
  }, 200);
}

function showToast() {
  if (toastTimer) clearTimeout(toastTimer);
  cartToast.classList.add('show');
  toastTimer = setTimeout(() => {
    cartToast.classList.remove('show');
  }, 2200);
}

function createRipple(el) {
  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    width: 10px; height: 10px;
    transform: scale(0);
    animation: rippleEffect 0.5s ease-out;
    pointer-events: none;
    top: 50%; left: 50%;
    margin-top: -5px; margin-left: -5px;
  `;
  const old = document.querySelector('.ripple-anim-style');
  if (!old) {
    const style = document.createElement('style');
    style.className = 'ripple-anim-style';
    style.textContent = `
      @keyframes rippleEffect {
        to { transform: scale(10); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  el.style.position = 'relative';
  el.style.overflow = 'hidden';
  el.appendChild(ripple);
  setTimeout(() => ripple.remove(), 500);
}

/* ════════════════════════════════════════════
   CATEGORY FILTER
   ════════════════════════════════════════════ */
document.querySelectorAll('.cat-item').forEach(item => {
  item.addEventListener('click', () => {
    // Update active state
    document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
    item.classList.add('active');

    const cat = item.dataset.cat;
    filterMenu(cat);
  });
});

function filterMenu(cat) {
  const cards = document.querySelectorAll('.menu-card, .featured-card');
  cards.forEach(card => {
    const cardCat = card.dataset.category;
    if (cat === 'all' || cardCat === cat) {
      card.style.display = '';
      card.style.animation = 'cardFadeIn 0.3s ease forwards';
    } else {
      card.style.display = 'none';
    }
  });

  // Add style if not present
  if (!document.querySelector('.filter-anim-style')) {
    const style = document.createElement('style');
    style.className = 'filter-anim-style';
    style.textContent = `
      @keyframes cardFadeIn {
        from { opacity: 0; transform: scale(0.95) translateY(8px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ════════════════════════════════════════════
   PROMO BANNERS SCROLL DOTS
   ════════════════════════════════════════════ */
if (promoBanners) {
  promoBanners.addEventListener('scroll', () => {
    const scrollLeft = promoBanners.scrollLeft;
    const cardWidth  = promoBanners.clientWidth;
    const index      = Math.round(scrollLeft / cardWidth);

    promoDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }, { passive: true });
}

/* ════════════════════════════════════════════
   BOTTOM NAV TABS
   ════════════════════════════════════════════ */
document.querySelectorAll('.bnav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const tab = btn.dataset.tab;
    if (tab === 'menu') {
      document.getElementById('menuSection')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'home') {
      mainBody?.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'offers') {
      document.querySelector('.special-offer-wrap')?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ════════════════════════════════════════════
   SEARCH BAR INTERACTION
   ════════════════════════════════════════════ */
const searchInput = document.querySelector('.search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const allCards = document.querySelectorAll('.menu-card');

    allCards.forEach(card => {
      const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
      const desc  = card.querySelector('p')?.textContent.toLowerCase() || '';
      if (!q || title.includes(q) || desc.includes(q)) {
        card.style.display = '';
        card.style.animation = 'cardFadeIn 0.3s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ════════════════════════════════════════════
   FAVORITE TOGGLE
   ════════════════════════════════════════════ */
document.querySelectorAll('.feat-fav').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = btn.classList.toggle('active');
    btn.textContent = isActive ? '❤️' : '🤍';
    btn.style.transform = 'scale(1.4)';
    setTimeout(() => btn.style.transform = '', 200);
  });
});

/* ════════════════════════════════════════════
   PARALLAX HERO BURGER ON SCROLL
   ════════════════════════════════════════════ */
const floatingBurger = document.getElementById('floatingBurger');
const heroHeader     = document.getElementById('heroHeader');

if (mainBody && floatingBurger) {
  mainBody.addEventListener('scroll', () => {
    const scrollY = mainBody.scrollTop;
    const parallax = scrollY * 0.3;
    floatingBurger.style.transform = `translateY(${-parallax}px)`;

    // Shrink header slightly on scroll
    if (heroHeader) {
      const opacity = Math.max(0, 1 - scrollY / 200);
      heroHeader.querySelector('.hero-content').style.opacity = opacity;
    }
  }, { passive: true });
}

/* ════════════════════════════════════════════
   ENTRANCE ANIMATIONS (on load)
   ════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  // Hero content stagger
  const heroEls = document.querySelectorAll('.greeting-tag, .hero-title, .hero-sub, .hero-stats');
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.5s ease ${i * 100 + 100}ms, transform 0.5s ease ${i * 100 + 100}ms`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });

  // Floating burger entrance
  if (floatingBurger) {
    floatingBurger.style.opacity = '0';
    floatingBurger.style.transform = 'scale(0.7) rotate(-15deg)';
    floatingBurger.style.transition = 'opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        floatingBurger.style.opacity = '1';
        floatingBurger.style.transform = '';
      });
    });
  }
});

/* ════════════════════════════════════════════
   MENU CARD PRESS RIPPLE
   ════════════════════════════════════════════ */
document.querySelectorAll('.menu-card, .featured-card').forEach(card => {
  card.addEventListener('click', function(e) {
    if (e.target.closest('.menu-add-btn') || e.target.closest('.add-to-cart-btn') || e.target.closest('.feat-fav')) return;

    // Pulse scale
    this.style.transform = 'scale(0.97)';
    setTimeout(() => { this.style.transform = ''; }, 150);
  });
});

/* ════════════════════════════════════════════
   AUTO-SCROLL PROMO BANNERS
   ════════════════════════════════════════════ */
let promoAutoIndex = 0;
let promoAutoTimer = null;

function startPromoAuto() {
  promoAutoTimer = setInterval(() => {
    if (!promoBanners) return;
    const cards = promoBanners.querySelectorAll('.promo-card');
    if (!cards.length) return;
    promoAutoIndex = (promoAutoIndex + 1) % cards.length;
    promoBanners.scrollTo({
      left: promoAutoIndex * promoBanners.clientWidth,
      behavior: 'smooth'
    });
    promoDots.forEach((dot, i) => dot.classList.toggle('active', i === promoAutoIndex));
  }, 3500);
}

if (promoBanners) {
  startPromoAuto();
  promoBanners.addEventListener('touchstart', () => clearInterval(promoAutoTimer), { passive: true });
  promoBanners.addEventListener('touchend', () => startPromoAuto(), { passive: true });
}

/* ════════════════════════════════════════════
   OFFER BUTTON
   ════════════════════════════════════════════ */
const offerBtn = document.querySelector('.offer-btn');
if (offerBtn) {
  offerBtn.addEventListener('click', () => {
    cartCount += 4;
    if (cartBadge) cartBadge.textContent = cartCount;
    if (cartNavBadge) cartNavBadge.textContent = cartCount;
    animateBadge(cartNavBadge);

    offerBtn.textContent = '✓ تمت الإضافة!';
    offerBtn.style.background = 'linear-gradient(135deg, #00c853, #00897b)';
    setTimeout(() => {
      offerBtn.textContent = 'اطلب الآن';
      offerBtn.style.background = '';
    }, 2500);

    showToast();
  });
}

/* ════════════════════════════════════════════
   MENU ADD BUTTONS (grid)
   ════════════════════════════════════════════ */
document.querySelectorAll('.menu-add-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(btn);

    // Spin animation
    btn.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    btn.style.transform = 'rotate(135deg) scale(1.2)';
    setTimeout(() => {
      btn.style.transform = '';
    }, 300);
  });
});
