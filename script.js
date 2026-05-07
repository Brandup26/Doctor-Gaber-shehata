// Smooth scroll functionality
document.querySelectorAll('.sticky-navigation button').forEach(button => {
  button.addEventListener('click', () => {
    alert('Navigating to section - Demo action');
  });
});

// Floating WhatsApp click behavior
document.querySelector('.floating-whatsapp').addEventListener('click', () => {
  window.open('https://wa.me/?text=مرحبا، أريد طلب المساعدة!', '_blank');
});

// Add animations to food cards
const foodCards = document.querySelectorAll('.food-card');
window.addEventListener('scroll', () => {
  foodCards.forEach(card => {
    const position = card.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }
  });
});
