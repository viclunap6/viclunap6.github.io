document.addEventListener("DOMContentLoaded", () => {
  // --- Base de datos de Textos para Servicios ---
  const servicesData = {
    corporativo: {
      title: "Derecho Corporativo y Mercantil",
      description:
        "Ofrecemos asesoría integral para la constitución, operación, fusión y escisión de sociedades. Redactamos y revisamos contratos mercantiles para garantizar la seguridad jurídica de su empresa.",
    },
    litigio: {
      title: "Litigio Civil y Mercantil",
      description:
        "Representamos a nuestros clientes en todo tipo de procedimientos judiciales y arbitrales, buscando siempre la resolución más favorable. Nuestra experiencia abarca desde disputas contractuales hasta juicios complejos.",
    },
    inmobiliario: {
      title: "Derecho Inmobiliario",
      description:
        "Brindamos seguridad en transacciones de bienes raíces, incluyendo compraventas, arrendamientos, fideicomisos y regularización de la propiedad. Protegemos su patrimonio con un riguroso análisis legal.",
    },
    administrativo: {
      title: "Derecho Administrativo",
      description:
        "Asesoramos y representamos a particulares y empresas en sus relaciones con la administración pública, incluyendo licitaciones, concesiones, permisos y defensa contra actos de autoridad.",
    },
    laboral: {
      title: "Derecho Laboral",
      description:
        "Defendemos tanto a empleadores como a trabajadores en conflictos laborales. Ofrecemos consultoría para el cumplimiento de la normativa laboral y representación en juicios ante las juntas de conciliación y arbitraje.",
    },
  };

  // --- Lógica del Modal de Casos de Éxito ---
  const projectItems = document.querySelectorAll(".project-item");
  const projectModalOverlay = document.getElementById("project-modal-overlay");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDescriptionProject = document.getElementById(
    "modal-description-project",
  );
  const projectCloseButton = document.getElementById("project-close-button");

  const openProjectModal = (item) => {
    modalTitle.textContent = item.querySelector("h3").textContent;
    modalDescriptionProject.textContent = item.querySelector("p").textContent;
    modalImage.src = item.getAttribute("data-image");
    projectModalOverlay.style.display = "flex";
  };

  projectItems.forEach((item) => {
    item
      .querySelector(".project-info")
      .addEventListener("click", () => openProjectModal(item));
    item
      .querySelector(".project-thumbnail")
      .addEventListener("click", () => openProjectModal(item));
  });

  const closeProjectModal = () => (projectModalOverlay.style.display = "none");
  projectCloseButton.addEventListener("click", closeProjectModal);
  projectModalOverlay.addEventListener("click", (e) => {
    if (e.target === projectModalOverlay) closeProjectModal();
  });

  // --- Lógica del Modal de Servicios ---
  const servicesButton = document.getElementById("services-button");
  const servicesModalOverlay = document.getElementById(
    "services-modal-overlay",
  );
  const servicesCloseButton = document.getElementById("services-close-button");
  const servicesListContainer = document.getElementById(
    "services-list-container",
  );
  const serviceDetailContainer = document.getElementById(
    "service-detail-container",
  );
  const backToServicesButton = document.getElementById("back-to-services");
  const serviceDetailTitle = document.getElementById("service-detail-title");
  const serviceDetailDescription = document.getElementById(
    "service-detail-description",
  );
  const serviceGalleryThumbnails = document.getElementById(
    "service-gallery-thumbnails",
  );

  servicesButton.addEventListener("click", () => {
    servicesListContainer.style.display = "block";
    serviceDetailContainer.style.display = "none";
    servicesModalOverlay.style.display = "flex";
  });

  const closeServicesModal = () =>
    (servicesModalOverlay.style.display = "none");

  const openServiceDetail = (serviceKey) => {
    const service = servicesData[serviceKey];
    if (!service) return;

    serviceDetailTitle.textContent = service.title;
    serviceDetailDescription.textContent = service.description;
    serviceGalleryThumbnails.innerHTML = "";

    const matchingProjects = document.querySelectorAll(
      `.project-item .project-hashtags span[data-service='${serviceKey}']`,
    );

    matchingProjects.forEach((tag) => {
      const projectItem = tag.closest(".project-item");
      const thumb = document.createElement("img");
      thumb.src = projectItem.querySelector(".project-thumbnail").src;
      thumb.alt = projectItem.querySelector("h3").textContent;

      thumb.addEventListener("click", () => {
        closeServicesModal();
        setTimeout(() => {
          openProjectModal(projectItem);
        }, 150);
      });

      serviceGalleryThumbnails.appendChild(thumb);
    });

    servicesListContainer.style.display = "none";
    serviceDetailContainer.style.display = "block";
    servicesModalOverlay.style.display = "flex";
  };

  document
    .querySelectorAll(".services-list li, .project-hashtags span")
    .forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const serviceKey = item.dataset.service;
        openServiceDetail(serviceKey);
      });
    });

  backToServicesButton.addEventListener("click", () => {
    servicesListContainer.style.display = "block";
    serviceDetailContainer.style.display = "none";
  });

  servicesCloseButton.addEventListener("click", closeServicesModal);
  servicesModalOverlay.addEventListener("click", (e) => {
    if (e.target === servicesModalOverlay) closeServicesModal();
  });

  // --- Lógica del Tema ---
  const themeToggleButton = document.getElementById("theme-toggle");
  const body = document.body;

  const applyTheme = (theme) => {
    if (theme === "dark") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  };

  themeToggleButton.addEventListener("click", () => {
    const currentTheme = body.classList.contains("dark-mode")
      ? "light"
      : "dark";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
  });

  // Aplica el tema guardado o el preferido por el sistema al cargar
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark) {
    applyTheme("dark");
  } else {
    applyTheme("light"); // Por defecto, tema claro
  }
});
