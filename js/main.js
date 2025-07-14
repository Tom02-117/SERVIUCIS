document.addEventListener("DOMContentLoaded", function () {
  // back de menu de navegacion (pc y movil)
  const menuToggle = document.getElementById("menu-toggle");
  const siteHeader = document.getElementById("site-header");
  const mobileMenuCheckbox = document.getElementById("mobile-menu-toggle");
  const mainContent = document.querySelector("main");

  // menu de escritorio
  if (menuToggle && siteHeader) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      siteHeader.classList.toggle("submenu-is-open");
      if (mainContent) {
        mainContent.style.filter = siteHeader.classList.contains(
          "submenu-is-open"
        )
          ? "blur(5px)"
          : "none";
      }
    });
  }

  // cerrar menu de escritorio si se hace clic fuera
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

  // bloquear scroll del body cuando el menu movil esta abierto
  if (mobileMenuCheckbox) {
    mobileMenuCheckbox.addEventListener("change", function () {
      document.body.classList.toggle("body-no-scroll", this.checked);
    });
  }

  // --- back del carrusel ---
  const carousels = document.querySelectorAll(
    ".carousel, .background-carousel"
  );
  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll(
      ".carousel-slide, .carousel-bg-slide"
    );
    if (slides.length > 1) {
      let currentSlide = 0;
      setInterval(() => {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
      }, 5000);
    }
  });

  // --- back para mostrar y ocultar mapas ---
  const mapToggleButtons = document.querySelectorAll(".js-toggle-map");
  mapToggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const cardContainer = button.closest(".sede-card, .sede-info-card");
      if (cardContainer) {
        cardContainer.classList.toggle("map-is-open");
        const isOpen = cardContainer.classList.contains("map-is-open");
        button.textContent = isOpen ? "Ocultar mapa" : "Ver en mapa";
      }
    });
  });

  // --- back del formulario (BUZON) ---
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);
      const successMessage = document.getElementById("success-message");

      fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            if (successMessage) successMessage.style.display = "block";
            form.reset();
            form.style.display = "none";
          } else {
            alert(
              "Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo."
            );
          }
        })
        .catch((error) => {
          alert(
            "Hubo un error de red. Por favor, revisa tu conexión e intenta de nuevo."
          );
        });
    });
  }
});
