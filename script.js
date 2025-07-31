document.addEventListener("DOMContentLoaded", () => {
  // --- Bases de Datos ---
  const teamData = {
    1: {
      name: "Lic. Víctor Manuel Luna Castro",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=VMLC",
    },
    2: {
      name: "Lic. Patricia Ivonne Herrera Piedra",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=PIHP",
    },
    3: {
      name: "Lic. Juan Pablo Ruiz Velazco Rivera Melo",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=JPRV",
    },
    4: {
      name: "Lic. Hugo Luna Castro",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=HLC",
    },
    5: {
      name: "Valeria San Agustín Rodríguez",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=VSAR",
    },
    6: {
      name: "Lic. Perla Velda Cedillo",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=PVC",
    },
    7: {
      name: "Karla Lariza Pacheco Carrera",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=KLPC",
    },
    8: {
      name: "Rebeca García Guzmán",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=RGG",
    },
    9: {
      name: "Víctor Luna Lomelí",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=VLL",
    },
    10: {
      name: "Hugo Luna Quiroz",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=HLQ",
    },
  };

  // Asignación de expertos a servicios (ejemplo, puedes ajustarlo)
  const servicesData = {
    familia: {
      title: "Derecho Familiar y Valoración Psicológica",
      intro: "Abordamos las disputas familiares...",
      details: "...",
      experts: [3, 5, 8],
    },
    deudor: {
      title: "Defensa al Deudor y Contabilidad Patrimonial",
      intro: "Frente a una situación de sobreendeudamiento...",
      details: "...",
      experts: [3, 6, 9],
    },
    mercantil: {
      title: "Derecho Mercantil y Análisis de Mercado",
      intro: "En el competitivo entorno de negocios...",
      details: "...",
      experts: [1, 4, 7],
    },
    laboral: {
      title: "Derecho Laboral y Cumplimiento Corporativo",
      intro: "Gestionamos el capital humano como el activo...",
      details: "...",
      experts: [2, 1, 10],
    },
    internacional: {
      title: "Comercio Internacional y Propiedad Intelectual",
      intro: "Facilitamos la expansión global...",
      details: "...",
      experts: [4, 1],
    },
    inmobiliario: {
      title: "Derecho Inmobiliario y Desarrollo de Proyectos",
      intro: "Transformamos terrenos y propiedades...",
      details: "...",
      experts: [1, 2, 9],
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

  // --- Modal: Quiénes Somos ---
  const nosotrosModal = document.getElementById("nosotros-modal-overlay");
  const teamPillsContainer = document.getElementById("team-pills-container");
  document.getElementById("logo-button").addEventListener("click", () => {
    teamPillsContainer.innerHTML = "";
    for (const id in teamData) {
      const member = teamData[id];
      const pill = document.createElement("div");
      pill.classList.add("team-pill");
      pill.dataset.memberId = id; // Dejamos el ID por si se usa en el futuro
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

  // --- Modal: Servicios ---
  const serviceModal = document.getElementById("service-modal-overlay");
  const serviceModalContent = document.getElementById("service-modal-content");
  document.querySelectorAll(".service-list li").forEach((item) => {
    item.addEventListener("click", () => {
      const serviceId = item.dataset.serviceId;
      const service = servicesData[serviceId];
      if (!service) return;

      let teamHtml = "";
      service.experts.forEach((memberId) => {
        const member = teamData[memberId];
        if (member) {
          teamHtml += `<div class="team-pill-service"><img src="${member.image}" alt="${member.name}"><strong>${member.name}</strong></div>`;
        }
      });

      serviceModalContent.innerHTML = `
                <div class="service-modal-header"><h2>${service.title}</h2></div>
                <div class="service-modal-body">
                    <p class="service-intro">${service.intro}</p>
                    <div class="service-details">${service.details}</div>
                    <div id="service-team-container">
                        <h3>Expertos en el Área</h3>
                        <div class="service-team-row">${teamHtml}</div>
                    </div>
                </div>`;

      openModal(serviceModal);
    });
  });

  // --- Mapa (OpenStreetMap) ---
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
        "<b>Luna Castro, Herrera & Asociados</b><br>Av. Paseo de la Reforma 222.",
      )
      .openPopup();
  }

  // --- Lógica del Tema ---
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
