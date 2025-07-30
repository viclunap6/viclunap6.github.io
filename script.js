document.addEventListener("DOMContentLoaded", () => {
  // --- Bases de Datos ---
  const teamData = {
    1: {
      name: "Sofía Luna",
      title: "Socia Fundadora | Litigio y Estrategia Corporativa",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=S.+Luna",
      bio: "...",
      services: ["mercantil", "laboral", "inmobiliario"],
    },
    2: {
      name: "Mateo Herrera",
      title: "Socio | Derecho Laboral y Cumplimiento Normativo",
      image:
        "https://via.placeholder.com/140x210/cccccc/ffffff?text=M.+Herrera",
      bio: "...",
      services: ["laboral"],
    },
    3: {
      name: "Valeria Campos",
      title: "Asociada Senior | Derecho Familiar y Patrimonial",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=V.+Campos",
      bio: "...",
      services: ["familia", "deudor"],
    },
    4: {
      name: "David Ríos",
      title: "Asociado | Comercio Internacional y P.I.",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=D.+Ríos",
      bio: "...",
      services: ["internacional"],
    },
  };
  const servicesData = {
    familia: {
      title: "Derecho Familiar y Valoración Psicológica",
      intro: "...",
      details: "<h3>Servicios Detallados</h3><ul>...</ul>",
    },
    deudor: {
      title: "Defensa al Deudor y Contabilidad Patrimonial",
      intro: "...",
      details: "<h3>Servicios Detallados</h3><ul>...</ul>",
    },
    mercantil: {
      title: "Derecho Mercantil y Análisis de Mercado",
      intro: "...",
      details: "<h3>Servicios Detallados</h3><ul>...</ul>",
    },
    laboral: {
      title: "Derecho Laboral y Cumplimiento Corporativo",
      intro: "...",
      details: "<h3>Servicios Detallados</h3><ul>...</ul>",
    },
    internacional: {
      title: "Comercio Internacional y Propiedad Intelectual",
      intro: "...",
      details: "<h3>Servicios Detallados</h3><ul>...</ul>",
    },
    inmobiliario: {
      title: "Derecho Inmobiliario y Desarrollo de Proyectos",
      intro: "...",
      details: "<h3>Servicios Detallados</h3><ul>...</ul>",
    },
  };

  // --- Lógica General de Modales ---
  const openModal = (modal) => (modal.style.display = "flex");
  const closeModal = (modal) => (modal.style.display = "none");
  document.querySelectorAll(".modal-overlay .close-button").forEach((btn) => {
    btn.addEventListener("click", () =>
      closeModal(btn.closest(".modal-overlay")),
    );
  });
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // --- Modal: Nosotros ---
  const nosotrosModal = document.getElementById("nosotros-modal-overlay");
  const teamPillsContainer = document.getElementById("team-pills-container");
  document.getElementById("logo-button").addEventListener("click", () => {
    teamPillsContainer.innerHTML = "";
    for (const id in teamData) {
      const member = teamData[id];
      const pill = document.createElement("div");
      pill.classList.add("team-pill");
      pill.dataset.memberId = id;
      pill.innerHTML = `<img src="${member.image}" alt="${member.name}"><strong>${member.name}</strong>`;
      teamPillsContainer.appendChild(pill);
    }
    openModal(nosotrosModal);
  });
  document
    .getElementById("footer-nosotros-link")
    .addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("logo-button").click();
    });

  // --- Modal: Perfil de Equipo ---
  const profileModal = document.getElementById("team-profile-modal-overlay");
  const profileContent = document.getElementById("team-profile-content");
  // Se usa delegación de eventos en el contenedor que siempre existe
  document.body.addEventListener("click", (e) => {
    const pill = e.target.closest(".team-pill");
    if (!pill || !pill.dataset.memberId) return;

    const memberId = pill.dataset.memberId;
    const member = teamData[memberId];

    profileContent.innerHTML = `
            <div class="profile-image-pill">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="profile-details">
                <h2>${member.name}</h2>
                <h3>${member.title}</h3>
                <p>${member.bio}</p>
                <h4>Áreas de Práctica</h4>
                <div class="services-list-compact">
                    ${member.services.map((sId) => `<span class="service-tag">${servicesData[sId]?.title || sId}</span>`).join("")}
                </div>
            </div>`;

    // Cierra el modal actual (si lo hay) y abre el de perfil
    const currentModal = e.target.closest(".modal-overlay");
    if (currentModal) closeModal(currentModal);

    openModal(profileModal);
  });

  // --- Modal: Servicios (Lógica Adaptada) ---
  const serviceModal = document.getElementById("service-modal-overlay");
  const serviceModalContent = document.getElementById("service-modal-content");
  document.querySelectorAll(".service-list li").forEach((item) => {
    item.addEventListener("click", () => {
      const serviceId = item.dataset.serviceId;
      const service = servicesData[serviceId];
      if (!service) return;

      let teamHtml = "";
      for (const memberId in teamData) {
        if (teamData[memberId].services.includes(serviceId)) {
          const member = teamData[memberId];
          teamHtml += `<div class="team-pill" data-member-id="${memberId}"><img src="${member.image}" alt="${member.name}"><strong>${member.name}</strong></div>`;
        }
      }

      serviceModalContent.innerHTML = `
                <div class="service-modal-header">
                    <h2>${service.title}</h2>
                </div>
                <p class="service-intro">${service.intro}</p>
                <div class="service-details">${service.details}</div>
                <div id="service-team-container">
                    <h3>Expertos en el Área</h3>
                    ${teamHtml}
                </div>`;

      openModal(serviceModal);
    });
  });

  // --- Inicialización del Mapa (OpenStreetMap) ---
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    const map = L.map("map").setView([19.429, -99.165], 16);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
    L.marker([19.429, -99.165])
      .addTo(map)
      .bindPopup(
        "<b>Luna, Herrera & Asociados</b><br>Av. Paseo de la Reforma 222.",
      )
      .openPopup();
  }

  // --- Lógica del Tema (sin cambios) ---
  const themeToggleButton = document.getElementById("theme-toggle");
  const body = document.body;
  const applyTheme = (theme) =>
    body.classList.toggle("dark-mode", theme === "dark");
  themeToggleButton.addEventListener("click", () => {
    const currentTheme = body.classList.contains("dark-mode")
      ? "light"
      : "dark";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
  });
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));
});
