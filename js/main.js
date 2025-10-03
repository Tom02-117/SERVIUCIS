document.addEventListener("DOMContentLoaded", function () {
  const siteHeader = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenuCheckbox = document.getElementById("mobile-menu-toggle");
  const mainContent = document.querySelector("main");

  // --- Manejo del Header y Menús ---

  // Sombra en header al hacer scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  });

  // Menú de escritorio
  if (menuToggle && siteHeader) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      siteHeader.classList.toggle("submenu-is-open");
      if (mainContent) {
        mainContent.style.filter = siteHeader.classList.contains("submenu-is-open") ? "blur(5px)" : "none";
      }
    });
  }

  // Cerrar menú de escritorio al hacer clic fuera
  document.addEventListener("click", function (event) {
    if (
      siteHeader &&
      siteHeader.classList.contains("submenu-is-open") &&
      !siteHeader.contains(event.target)
    ) {
      siteHeader.classList.remove("submenu-is-open");
      if (mainContent) {
        mainContent.style.filter = "none";
      }
    }
  });

  // Bloqueo de scroll para menú móvil
  if (mobileMenuCheckbox) {
    mobileMenuCheckbox.addEventListener("change", function () {
      document.body.classList.toggle("body-no-scroll", this.checked);
    });
  }

  // --- Carrusel de Imágenes ---
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-slide");
    if (slides.length > 1) {
      let currentSlide = 0;
      setInterval(() => {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
      }, 5000);
    }
  });

  // --- Desplegar Mapas en Sedes ---
  const mapToggleButtons = document.querySelectorAll(".js-toggle-map");
  mapToggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const cardContainer = button.closest(".sede-info-card");
      if (cardContainer) {
        cardContainer.classList.toggle("map-is-open");
        const isOpen = cardContainer.classList.contains("map-is-open");
        button.textContent = isOpen ? "Ocultar mapa" : "Ver en mapa";
      }
    });
  });

  // --- Acordeón para Preguntas Frecuentes (FAQ) ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
      const questionButton = item.querySelector('.faq-question');
      if (questionButton) {
          questionButton.addEventListener('click', () => {
              item.classList.toggle('open');
          });
      }
  });


  // --- Animaciones al Hacer Scroll (Intersection Observer) ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // El elemento se animará cuando esté visible al 10%
    }
  );

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  // --- Manejo de Formularios ---
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
      contactForm.addEventListener("submit", async function(event) {
          event.preventDefault();
          const status = document.getElementById("success-message");
          const data = new FormData(event.target);

          try {
              const response = await fetch(event.target.action, {
                  method: contactForm.method,
                  body: data,
                  headers: { 'Accept': 'application/json' }
              });

              if (response.ok) {
                  if (status) {
                      status.textContent = "¡Gracias! Tu mensaje ha sido enviado correctamente.";
                      status.style.display = 'block';
                  }
                  contactForm.reset();
                  setTimeout(() => { if(status) status.style.display = 'none'; }, 5000);
              } else {
                  const responseData = await response.json();
                  if (Object.hasOwn(responseData, 'errors')) {
                      alert(responseData.errors.map(error => error.message).join(", "));
                  } else {
                      alert("Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.");
                  }
              }
          } catch (error) {
              alert("Hubo un error de red. Por favor, revisa tu conexión e intenta de nuevo.");
          }
      });
  }

  // --- Pestañas para Documentos (Asuntos Económicos) ---
  const tabsContainer = document.querySelector('.document-tabs');
  if (tabsContainer) {
    const tabs = tabsContainer.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.document-content');

    // Carga perezosa del primer iframe visible
    const initialActiveIframe = document.querySelector('.document-content.active iframe[data-src]');
    if (initialActiveIframe) {
        initialActiveIframe.setAttribute('src', initialActiveIframe.dataset.src);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;
            const targetContent = document.getElementById(targetId);

            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            if (targetContent) {
                targetContent.classList.add('active');

                // Carga perezosa del iframe en la pestaña seleccionada
                const iframe = targetContent.querySelector('iframe');
                if (iframe && iframe.dataset.src && !iframe.getAttribute('src')) {
                    iframe.setAttribute('src', iframe.dataset.src);
                }
            }
        });
    });
  }
});
