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
        "Abordamos las disputas familiares no solo como un problema legal, sino como un evento de vida que requiere un manejo sensible, estratégico y multidisciplinario, buscando siempre proteger el bienestar emocional y patrimonial de todos los involucrados.",
      details: `<h3>Servicios Detallados</h3><ul><li><strong>Planificación Patrimonial Familiar y Personal:</strong> Diseño de testamentos, fideicomisos y capitulaciones matrimoniales para la protección y sucesión del patrimonio.</li><li><strong>Divorcio y Disolución de Sociedad Conyugal:</strong> Representación en procesos de divorcio, ya sea de mutuo acuerdo o contenciosos, asegurando una división de bienes justa y expedita.</li><li><strong>Guardia, Custodia y Convivencia:</strong> Litigio y mediación enfocados en el interés superior del menor para definir la custodia y establecer regímenes de convivencia sanos y funcionales.</li><li><strong>Valoraciones Psicológicas y Servicio Social:</strong> Colaboración con expertos para la elaboración de peritajes y diagnósticos con validez judicial, fundamentales en disputas de custodia y casos de violencia familiar.</li></ul>`,
      experts: [3, 5, 8],
    },
    deudor: {
      title: "Defensa del Deudor y Protección Patrimonial",
      intro:
        "Frente a una situación de sobreendeudamiento, ofrecemos una defensa legal robusta y una reestructuración financiera integral. Transformamos la incertidumbre en un plan de acción claro, protegiendo su patrimonio y restaurando su tranquilidad y estabilidad económica.",
      details: `<h3>Servicios Detallados</h3><ul><li><strong>Negociación Estratégica con Acreedores:</strong> Intervenimos ante bancos e instituciones financieras para negociar la reestructuración de deudas, la obtención de quitas y la modificación de condiciones de pago.</li><li><strong>Defensa en Juicios Ejecutivos y Embargos:</strong> Representación legal para la defensa de su patrimonio ante demandas de embargo, deteniendo procesos y buscando la nulidad de acciones indebidas.</li><li><strong>Auditoría y Contabilidad Patrimonial:</strong> Realizamos un análisis forense de su situación financiera para diseñar un presupuesto familiar, optimizar activos y pasivos, y trazar un camino hacia la recuperación.</li><li><strong>Estrategias de Protección Patrimonial:</strong> Implementamos instrumentos legales (fideicomisos, afectación de patrimonio familiar) para proteger los bienes esenciales ante futuras contingencias.</li></ul>`,
      experts: [3, 6, 9],
    },
    mercantil: {
      title: "Derecho Mercantil",
      intro:
        "Ofrecemos una asesoría que integra el derecho mercantil con una profunda comprensión del entorno de negocios, asegurando que cada decisión corporativa esté legalmente blindada y estratégicamente posicionada para el éxito.",
      details: `<h3>Servicios Detallados</h3><ul><li><strong>Constitución y Gobierno Corporativo:</strong> Diseño de la estructura societaria óptima, elaboración de estatutos y acuerdos de accionistas que previenen conflictos futuros.</li><li><strong>Contratación Comercial Compleja:</strong> Redacción y negociación de contratos de distribución, suministro, franquicia, joint venture y otros acuerdos comerciales clave.</li><li><strong>Litigio Mercantil y Arbitraje:</strong> Representación en disputas sobre incumplimiento de contratos, conflictos entre socios y recuperación de cartera vencida.</li><li><strong>Análisis de Viabilidad Legal y de Mercado:</strong> Realizamos estudios de mercado desde una perspectiva legal para evaluar la viabilidad de nuevos productos o expansiones.</li></ul>`,
      experts: [1, 4, 7],
    },
    laboral: {
      title: "Derecho Laboral y Cumplimiento Corporativo",
      intro:
        "Gestionamos el capital humano como el activo más valioso de su empresa. Nuestra práctica se enfoca en la prevención de conflictos y en la creación de un entorno de cumplimiento normativo que fomenta la productividad y minimiza los riesgos.",
      details: `<h3>Servicios Detallados</h3><ul><li><strong>Contratación y Terminación de Relaciones Laborales:</strong> Diseño de contratos y estrategias para el manejo de procesos de terminación.</li><li><strong>Litigio Laboral Estratégico:</strong> Defensa ante los Tribunales Laborales, con un enfoque en la resolución eficiente de conflictos.</li><li><strong>Auditorías de Cumplimiento Normativo (NOM-035, REPSE, etc.):</strong> Verificación y adecuación de las políticas internas a la normativa vigente.</li><li><strong>Negociación Colectiva y Relaciones Sindicales:</strong> Asesoría y representación en la negociación de contratos colectivos de trabajo.</li></ul>`,
      experts: [2, 1, 10],
    },
    internacional: {
      title: "Derecho Internacional",
      intro:
        "Facilitamos la expansión global de su negocio, protegiendo sus activos más importantes: sus ideas y su marca. Ofrecemos una asesoría integral que cubre desde la logística contractual de la importación/exportación hasta el blindaje de su propiedad intelectual en mercados extranjeros.",
      details: `<h3>Servicios Detallados</h3><ul><li><strong>Contratos Internacionales:</strong> Elaboración y negociación de contratos de compraventa internacional, distribución y licencia, asegurando el cumplimiento de tratados.</li><li><strong>Registro y Protección de Marcas y Patentes:</strong> Gestión del registro de marcas y patentes a nivel nacional e internacional y defensa contra infracciones.</li><li><strong>Derechos de Autor y Secreto Industrial:</strong> Asesoría para la protección de software, obras creativas y secretos comerciales.</li><li><strong>Asesoría Aduanera y Cumplimiento:</strong> Orientación sobre clasificación arancelaria, regulaciones y procedimientos aduaneros para optimizar sus operaciones.</li></ul>`,
      experts: [4, 1],
    },
    inmobiliario: {
      title: "Derecho Inmobiliario",
      intro:
        "Transformamos terrenos y propiedades en activos de valor. Nuestra asesoría abarca todo el ciclo de vida de un proyecto inmobiliario, desde la adquisición de la tierra hasta la comercialización, garantizando certeza jurídica en cada etapa.",
      details: `<h3>Servicios Detallados</h3><ul><li><strong>Adquisición de Inmuebles:</strong> Investigación exhaustiva (Due Diligence) de la situación legal de propiedades para asegurar adquisiciones libres de riesgos.</li><li><strong>Estructuración de Proyectos:</strong> Diseño de fideicomisos, coinversiones y otras estructuras legales y financieras para desarrollos residenciales y comerciales.</li><li><strong>Gestión de Permisos y Licencias:</strong> Tramitación de licencias de uso de suelo, construcción y todos los permisos necesarios ante autoridades.</li><li><strong>Contratos de Obra y Comercialización:</strong> Elaboración de contratos de construcción, arrendamiento, compraventa y regímenes de propiedad en condominio.</li></ul>`,
      experts: [1, 2, 9],
    },
  };

  // --- Lógica de la página ---
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

  const serviceModal = document.getElementById("service-modal-overlay");
  const serviceModalContent = document.getElementById("service-modal-content");

  document.querySelectorAll(".service-list li").forEach((item) => {
    item.addEventListener("click", () => {
      const serviceId = item.dataset.serviceId;
      const service = servicesData[serviceId];
      if (!service) return;
      let teamHtml = "";
      if (service.experts) {
        service.experts.forEach((memberId) => {
          const member = teamData[memberId];
          if (member) {
            teamHtml += `<div class="team-pill-service"><img src="${member.image}" alt="${member.name}"><strong>${member.name}</strong></div>`;
          }
        });
      }
      serviceModalContent.innerHTML = `
        <div class="service-modal-header"><h2>${service.title}</h2></div>
        <div class="service-modal-body">
            <div>
                <p class="service-intro">${service.intro}</p>
                <div class="service-details">${service.details}</div>
            </div>
            <div id="service-team-container">
                <h3>Expertos en el Área</h3>
                <div class="service-team-row">${teamHtml}</div>
            </div>
        </div>`;
      openModal(serviceModal);
    });
  });

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

  const dashboardIcon = document.getElementById("dashboard-icon");
  const passwordModal = document.getElementById("password-modal-overlay");
  const passwordForm = document.getElementById("password-form");

  dashboardIcon.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(passwordModal);
  });

  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "dashboard.html";
  });
});
