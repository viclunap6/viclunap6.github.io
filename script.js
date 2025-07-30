document.addEventListener("DOMContentLoaded", () => {
  // --- Bases de Datos ---
  const teamData = {
    /* ... (sin cambios, usa tu data existente) ... */
  };
  const servicesData = {
    /* ... (sin cambios, usa tu data existente) ... */
  };

  // --- Lógica General de Modales ---
  const openModal = (modal) => (modal.style.display = "flex");
  const closeModal = (modal) => (modal.style.display = "none");
  document.querySelectorAll(".modal-overlay .close-button").forEach((btn) => {
    btn.addEventListener("click", () =>
      closeModal(btn.closest(".modal-overlay")),
    );
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
  teamPillsContainer.addEventListener("click", (e) => {
    const pill = e.target.closest(".team-pill");
    if (!pill) return;
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
    closeModal(nosotrosModal);
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
                <div class="service-modal-body">
                    <p class="service-intro">${service.intro}</p>
                    <div class="service-details">${service.details}</div>
                    <div id="service-team-container">
                        <h3>Expertos en el Área</h3>
                        ${teamHtml}
                    </div>
                </div>`;

      openModal(serviceModal);
    });
  });

  // --- Inicialización del Mapa (OpenStreetMap) ---
  const map = L.map("map").setView([19.429, -99.165], 16); // Coordenadas de Reforma 222
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
