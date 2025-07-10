
document.addEventListener("DOMContentLoaded", function () {
  const siteHeader = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const body = document.body;

  // abrir y cerrar el menu
  function toggleMenu() {
    siteHeader.classList.toggle("submenu-is-open");
    body.classList.toggle("body-no-scroll");
  }

  // abrir
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  // Evento boton de cerrar
  if (menuClose) {
    menuClose.addEventListener("click", toggleMenu);
  }

  // Carousel 
  const heroCarousel = document.querySelector(".hero .carousel");
  if (heroCarousel) {
    const slides = heroCarousel.querySelectorAll(".carousel-slide");
    let currentSlide = 0;
    const slideInterval = 5000;

    function nextSlide() {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }

    setInterval(nextSlide, slideInterval);
  }

  // Funcionalidad mapa de Apartado
  const verMapaBtn = document.getElementById("verMapaBtn");
  const sedeContainer = document.getElementById("mapa-apartado-container");

  if (verMapaBtn && sedeContainer) {
    verMapaBtn.addEventListener("click", function () {
      sedeContainer.classList.toggle("ampliado");
    });
  }

});



// Carrusel
const slides = document.querySelectorAll('.carousel-slide, .carousel-bg-slide');
let currentSlide = 0;
function showNextSlide() {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
if (slides.length > 0) {
    
    document.querySelector('.carousel .carousel-slide').classList.add('active');
    if(document.querySelector('.background-carousel .carousel-bg-slide')) {
         document.querySelector('.background-carousel .carousel-bg-slide').classList.add('active');
    }
    setInterval(showNextSlide, 5000);
}

// mapa de Apartado
const verMapaBtn = document.getElementById('verMapaBtn');
if (verMapaBtn) {
    verMapaBtn.addEventListener('click', function() {
      document.getElementById('mapa-apartado-container').classList.toggle('ampliado');
    });
}

// --- back del FAQ  ---
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
       
        const faqItem = button.parentElement;

        
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
            if (openItem !== faqItem) {
                openItem.classList.remove('open');
            }
        });

        
        faqItem.classList.toggle('open');
    });
});

// --- back del buzon  ---

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const formSuccess = urlParams.get('success');

    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (formSuccess === 'true' && contactForm && successMessage) {
        
        contactForm.reset();

        successMessage.style.display = 'block';

        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);

        window.history.replaceState(null, null, window.location.pathname);
    }
});
