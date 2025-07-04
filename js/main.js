// --- SCRIPT  ---

// back del FAQ
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const faqItem = button.closest('.faq-item');
        if (faqItem) {
            faqItem.classList.toggle('open');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const siteHeader = document.getElementById("site-header"); 
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close'); 
    const submenu = document.getElementById('nav-submenu');

    function openMenu() {
        if (siteHeader) {
            siteHeader.classList.add('submenu-is-open');
            document.body.classList.add('body-no-scroll');
        }
    }

    function closeMenu() {
        if (siteHeader) {
            siteHeader.classList.remove('submenu-is-open');
            document.body.classList.remove('body-no-scroll');
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            
            if (siteHeader.classList.contains('submenu-is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    
    
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            closeMenu();
        });
    }

    
    document.addEventListener('click', function(event) {
        if (window.innerWidth > 768 && siteHeader.classList.contains('submenu-is-open')) {
            if (submenu && !submenu.contains(event.target) && !menuToggle.contains(event.target)) {
                closeMenu();
            }
        }
    });
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

// Mapa de Apartadó
const verMapaBtn = document.getElementById('verMapaBtn');
if (verMapaBtn) {
    verMapaBtn.addEventListener('click', function() {
      document.getElementById('mapa-apartado-container').classList.toggle('ampliado');
    });
}

// back del FAQ
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const faqItem = button.closest('.faq-item');
        if (faqItem) {
            faqItem.classList.toggle('open');
        }
    });
});

