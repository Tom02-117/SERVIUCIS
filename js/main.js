
document.addEventListener('DOMContentLoaded', function () {

    // --- LÓGICA DEL MENÚ DE NAVEGACIÓN (DESKTOP Y MÓVIL) ---
    const menuToggle = document.getElementById('menu-toggle');
    const siteHeader = document.getElementById('site-header');
    const mobileMenuCheckbox = document.getElementById('mobile-menu-toggle');
    const mainContent = document.querySelector('main');

    // Menú de escritorio
    if (menuToggle && siteHeader) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el click se propague al documento
            siteHeader.classList.toggle('submenu-is-open');
            if (mainContent) {
                mainContent.style.filter = siteHeader.classList.contains('submenu-is-open') ? 'blur(5px)' : 'none';
            }
        });
    }

    // Cerrar menú de escritorio si se hace clic fuera
    document.addEventListener('click', function(event) {
        if (siteHeader && siteHeader.classList.contains('submenu-is-open') && !siteHeader.contains(event.target)) {
            siteHeader.classList.remove('submenu-is-open');
             if (mainContent) {
                mainContent.style.filter = 'none';
            }
        }
    });

    // Menú móvil (bloquear scroll del body cuando está abierto)
    if (mobileMenuCheckbox) {
        mobileMenuCheckbox.addEventListener('change', function() {
            document.body.classList.toggle('body-no-scroll', this.checked);
        });
    }

    // --- LÓGICA DEL CARRUSEL DE IMÁGENES ---
    const carousels = document.querySelectorAll('.carousel, .background-carousel');
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide, .carousel-bg-slide');
        if (slides.length > 1) {
            let currentSlide = 0;
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 5000);
        }
    });

    // --- LÓGICA PARA MOSTRAR/OCULTAR MAPAS EN SEDES ---
    const mapToggleButtons = document.querySelectorAll('.js-toggle-map');
    mapToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sedeCard = button.closest('.sede-card');
            sedeCard.classList.toggle('map-is-open');
            button.textContent = sedeCard.classList.contains('map-is-open') ? 'Ocultar mapa' : 'Ver en mapa';
        });
    });
    
    // --- LÓGICA PARA EL FAQ (PREGUNTAS FRECUENTES) - CORREGIDO ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        if (button) {
            button.addEventListener('click', () => {
                const wasOpen = item.classList.contains('open');

                // Cierra todos los items que puedan estar abiertos
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('open');
                });

                // Si no estaba abierto, lo abre. Si estaba abierto, el paso anterior ya lo cerró.
                if (!wasOpen) {
                    item.classList.add('open');
                }
            });
        }
    });

    // --- LÓGICA PARA EL FORMULARIO DE CONTACTO (BUZÓN) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const successMessage = document.getElementById('success-message');

            fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    if(successMessage) successMessage.style.display = 'block';
                    form.reset();
                    form.style.display = 'none';
                } else {
                    alert('Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.');
                }
            }).catch(error => {
                alert('Hubo un error de red. Por favor, revisa tu conexión e intenta de nuevo.');
            });
        });
    }
});

