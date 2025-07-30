document.addEventListener("DOMContentLoaded", () => {
  // --- Base de datos del Equipo ---
  const teamData = {
    1: {
      name: "Ana Sofía Paredes",
      title: "Socia Fundadora | Especialista en Litigio",
      image: "https://via.placeholder.com/150x220/cccccc/ffffff?text=Ana+S.",
      bio: "Con más de 15 años de experiencia, Ana Sofía ha liderado algunas de las defensas más complejas en materia civil y mercantil del país. Su enfoque estratégico y su profundo conocimiento procesal son la piedra angular de nuestra área de litigio.",
      tags: ["Litigio Estratégico", "Arbitraje", "Derecho Civil"],
      linkedin: "https://linkedin.com/in/anasofia",
    },
    2: {
      name: "Carlos Mendoza",
      title: "Socio | Experto en Derecho Corporativo",
      image: "https://via.placeholder.com/150x220/cccccc/ffffff?text=Carlos+M.",
      bio: "Carlos asesora a empresas nacionales e internacionales en todas las facetas de su operación. Es un negociador nato, especializado en fusiones, adquisiciones y la estructuración de transacciones comerciales de alto valor.",
      tags: ["Fusiones y Adquisiciones", "Contratos", "Inversión Extranjera"],
      linkedin: "https://linkedin.com/in/carlosmendoza",
    },
    3: {
      name: "Javier Benítez",
      title: "Asociado Senior | Derecho Inmobiliario y Administrativo",
      image: "https://via.placeholder.com/150x220/cccccc/ffffff?text=Javier+B.",
      bio: "Javier combina su expertise en derecho inmobiliario con un profundo conocimiento del sector público. Su práctica se centra en el desarrollo de proyectos, la obtención de permisos y la resolución de conflictos con autoridades.",
      tags: ["Desarrollo Inmobiliario", "Licitaciones", "Regulación"],
      linkedin: "https://linkedin.com/in/javierbenitez",
    },
  };

  // --- Lógica para todos los modales ---
  const allModals = document.querySelectorAll(".modal-overlay");
  const allCloseButtons = document.querySelectorAll(".close-button");

  const closeModal = (modal) => (modal.style.display = "none");
  const openModal = (modal) => (modal.style.display = "flex");

  allCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(button.closest(".modal-overlay"));
    });
  });

  allModals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // --- Lógica del Modal del Equipo ---
  const teamModalOverlay = document.getElementById("team-modal-overlay");
  document.querySelectorAll(".team-list li").forEach((item) => {
    item.addEventListener("click", () => {
      const memberId = item.dataset.memberId;
      const member = teamData[memberId];

      if (member) {
        document.getElementById("team-modal-image").src = member.image;
        document.getElementById("team-modal-name").textContent = member.name;
        document.getElementById("team-modal-title").textContent = member.title;
        document.getElementById("team-modal-bio").textContent = member.bio;
        document.getElementById("team-modal-linkedin").href = member.linkedin;

        const tagsContainer = document.getElementById("team-modal-tags");
        tagsContainer.innerHTML = "";
        member.tags.forEach((tagText) => {
          const tag = document.createElement("span");
          tag.textContent = tagText;
          tagsContainer.appendChild(tag);
        });

        openModal(teamModalOverlay);
      }
    });
  });

  // --- Lógica del Modal de Casos de Éxito (Proyectos) ---
  const projectModalOverlay = document.getElementById("project-modal-overlay");
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h3").textContent;
      const description = card.querySelector("p").textContent;
      const image = card
        .querySelector(".card-image")
        .src.replace("400x250", "800x500"); // Cargar imagen más grande

      document.getElementById("project-modal-title").textContent = title;
      document.getElementById("project-modal-description").textContent =
        description;
      document.getElementById("project-modal-image").src = image;

      openModal(projectModalOverlay);
    });
  });

  // --- Lógica del Modal de Servicios (sin cambios mayores) ---
  // El modal se creará dinámicamente si no existe
  const servicesButton = document.getElementById("services-button");
  servicesButton.addEventListener("click", () => {
    // Implementación simplificada. Podríamos construir el modal de servicios aquí si no está en el HTML.
    // Por ahora, asumimos que un futuro modal de servicios se manejaría de manera similar
    alert("La vista detallada de servicios se implementará aquí.");
  });

  // --- Lógica del Tema (sin cambios) ---
  const themeToggleButton = document.getElementById("theme-toggle");
  const body = document.body;

  const applyTheme = (theme) => {
    body.classList.toggle("dark-mode", theme === "dark");
  };

  themeToggleButton.addEventListener("click", () => {
    const currentTheme = body.classList.contains("dark-mode")
      ? "light"
      : "dark";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
  });

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(prefersDark ? "dark" : "light");
  }
});
