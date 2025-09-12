document.addEventListener("DOMContentLoaded", function () {
  // --- back menu ---
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
        mainContent.style.filter = siteHeader.classList.contains("submenu-is-open") ? "blur(5px)" : "none";
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

  // scroll bloqueo
  if (mobileMenuCheckbox) {
    mobileMenuCheckbox.addEventListener("change", function () {
      document.body.classList.toggle("body-no-scroll", this.checked);
    });
  }

  // --- carousel ---
  const carousels = document.querySelectorAll(".carousel, .background-carousel");
  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-slide, .carousel-bg-slide");
    if (slides.length > 1) {
      let currentSlide = 0;
      setInterval(() => {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
      }, 5000);
    }
  });
  

// --- mapas ---
const mapToggleButtons = document.querySelectorAll(".js-toggle-map");
mapToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const cardContainer = button.closest(".sede-card, .sede-info-card");
    const gridContainer = button.closest(".about-grid");

    if (cardContainer) {
      cardContainer.classList.toggle("map-is-open");
      const isOpen = cardContainer.classList.contains("map-is-open");
      button.textContent = isOpen ? "Ocultar mapa" : "Ver en mapa";
      
      if (gridContainer) {
          gridContainer.classList.toggle("is-expanded", isOpen);
      }
    }
  });
});



// --- INTERSECTION OBSERVER PARA ANIMACIONES ON-SCROLL ---

console.log("Observer script está corriendo!");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');

console.log("Elementos encontrados para animar:", hiddenElements);

hiddenElements.forEach((el) => observer.observe(el));

var form = document.getElementById("contact-form");

async function handleSubmit(event) {
  event.preventDefault(); 
  var status = document.getElementById("success-message");
  var data = new FormData(event.target);
  
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "¡Gracias! Tu mensaje ha sido enviado correctamente.";
      status.style.display = 'block'; 
      form.reset();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert("Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.");
        }
      })
    }
  }).catch(error => {
    alert("Hubo un error de red al enviar tu mensaje.");
  });
}
form.addEventListener("submit", handleSubmit)

  // --- pestañas de economico - tch---
  const tabsContainer = document.querySelector('.document-tabs');
  if (tabsContainer) {
    const tabs = tabsContainer.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.document-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;
            const targetContent = document.getElementById(targetId);

            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            
            tab.classList.add('active');
            if (targetContent) {
                targetContent.classList.add('active');

                
                const iframe = targetContent.querySelector('iframe');
                if (iframe && !iframe.getAttribute('src')) {
                    const pdfSrc = iframe.dataset.src;
                    if (pdfSrc) {
                        iframe.setAttribute('src', pdfSrc);
                    }
                }
            }
        });
    });
  }
});
