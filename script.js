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

  const servicesData = {
    familia: {
      title: "Derecho Familiar",
      intro:
        "Abordamos las disputas familiares no solo como un problema legal, sino como un evento de vida que requiere un manejo sensible.",
      details: `<h3>Servicios Detallados</h3><ul><li>Planificación Patrimonial</li><li>Divorcio y Disolución de Sociedad Conyugal</li><li>Guardia, Custodia y Convivencia</li></ul>`,
      experts: [3, 5, 8],
    },
    deudor: {
      title: "Defensa del Deudor",
      intro:
        "Frente a una situación de sobreendeudamiento, ofrecemos una defensa legal robusta y una reestructuración financiera integral.",
      details: `<h3>Servicios Detallados</h3><ul><li>Negociación Estratégica con Acreedores</li><li>Defensa en Juicios Ejecutivos y Embargos</li><li>Auditoría y Contabilidad Patrimonial</li></ul>`,
      experts: [3, 6, 9],
    },
    // ... (datos de los demás servicios)
  };

  // --- Lógica de Roles y Contraseñas ---
  const userRoles = {
    DIR_2025: { role: "director", name: "Director" },
    ADMIN_2025: { role: "admin", name: "Administración" },
    SUP_2025: { role: "supervisor", name: "Supervisión" },
    HUGO_LC: { role: "abogado", teamId: "unidad-1", name: "Hugo" },
    VAL_SA: { role: "abogado", teamId: "unidad-2", name: "Valeria" },
    EMANUEL_R: { role: "abogado", teamId: "unidad-3", name: "Emanuel" },
  };

  // --- Lógica de Modales ---
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

  // --- Lógica de la página ---
  const nosotrosModal = document.getElementById("nosotros-modal-overlay");
  document.getElementById("logo-button").addEventListener("click", () => {
    const container = document.getElementById("team-pills-container");
    container.innerHTML = Object.values(teamData)
      .map(
        (member) =>
          `<div class="team-pill"><img src="${member.image}" alt="${member.name}"><strong>${member.name}</strong></div>`,
      )
      .join("");
    openModal(nosotrosModal);
  });
  document
    .getElementById("footer-nosotros-link")
    .addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("logo-button").click();
    });

  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    const map = L.map("map").setView([19.429, -99.165], 16);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
    ).addTo(map);
    L.marker([19.429, -99.165])
      .addTo(map)
      .bindPopup("<b>Luna Castro, Herrera & Asociados</b>")
      .openPopup();
  }

  // --- Lógica de Acceso al Dashboard ---
  const dashboardIcon = document.getElementById("dashboard-icon");
  const passwordModal = document.getElementById("password-modal-overlay");
  const passwordForm = document.getElementById("password-form");
  const passwordInput = document.getElementById("password-input");
  const passwordError = document.getElementById("password-error");

  dashboardIcon.addEventListener("click", (e) => {
    e.preventDefault();
    passwordError.style.display = "none";
    passwordInput.value = "";
    openModal(passwordModal);
  });

  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const key = passwordInput.value.toUpperCase();
    const userData = userRoles[key];

    if (userData) {
      localStorage.setItem("LCHA_user", JSON.stringify(userData));
      window.location.href = "dashboard.html";
    } else {
      passwordError.style.display = "block";
    }
  });
});
