document.addEventListener("DOMContentLoaded", () => {
  // --- Bases de Datos ---
  const teamData = {
    1: {
      name: "Sofía Luna",
      title: "Socia Fundadora | Litigio y Estrategia Corporativa",
      image: "https://via.placeholder.com/150x220/cccccc/ffffff?text=S.+Luna",
      bio: "Con más de 20 años de experiencia, Sofía es una estratega legal reconocida por su capacidad para resolver disputas complejas y su visión para el blindaje corporativo. Lidera las áreas de litigio de alto impacto y asesoría a consejos de administración.",
      services: ["mercantil", "fiscal", "startup"],
    },
    2: {
      name: "Mateo Herrera",
      title: "Socio | Derecho Laboral y Cumplimiento Normativo",
      image:
        "https://via.placeholder.com/150x220/cccccc/ffffff?text=M.+Herrera",
      bio: "Mateo es experto en la gestión de relaciones laborales, desde la contratación colectiva hasta la defensa en juicios individuales. Su práctica se enfoca en la prevención de conflictos y el diseño de políticas de cumplimiento para empresas.",
      services: ["laboral", "startup"],
    },
    3: {
      name: "Valeria Campos",
      title: "Asociada Senior | Derecho Familiar y Patrimonial",
      image: "https://via.placeholder.com/150x220/cccccc/ffffff?text=V.+Campos",
      bio: "Valeria combina una profunda sensibilidad con una rigurosa técnica legal para guiar a los clientes a través de procesos familiares complejos. Es especialista en la elaboración de diagnósticos psicológicos con validez judicial y en la protección de patrimonio familiar.",
      services: ["familia", "deudor"],
    },
    4: {
      name: "David Ríos",
      title: "Asociado | Comercio Internacional y Propiedad Intelectual",
      image: "https://via.placeholder.com/150x220/cccccc/ffffff?text=D.+Ríos",
      bio: "David asesora a empresas en su expansión a mercados internacionales, gestionando la logística contractual y la protección de sus activos intangibles como marcas y derechos de autor. Su enfoque es facilitar negocios sin fronteras.",
      services: ["internacional", "startup"],
    },
  };

  const servicesData = {
    familia: {
      title: "Derecho Familiar y Valoración Psicológica",
      intro:
        "Navegamos la complejidad de las relaciones familiares con un enfoque humano y estratégico, buscando siempre proteger el bienestar de nuestros clientes y sus seres queridos. Entendemos que cada caso es único y requiere una solución a la medida.",
      details: `
                <h3>Servicios Detallados</h3>
                <ul>
                    <li><strong>Divorcio y Separación:</strong> Gestión de divorcios contenciosos y de mutuo acuerdo, asegurando una disolución justa y equitativa.</li>
                    <li><strong>Guarda y Custodia:</strong> Representación en juicios de guarda y custodia, siempre priorizando el interés superior del menor.</li>
                    <li><strong>Pensión Alimenticia:</strong> Cálculo, negociación y litigio para la fijación de pensiones justas y adecuadas.</li>
                    <li><strong>Valoraciones Psicológicas:</strong> Elaboración de peritajes y diagnósticos con validez judicial para apoyar los procesos legales.</li>
                </ul>`,
    },
    deudor: {
      title: "Defensa al Deudor y Contabilidad Patrimonial",
      intro:
        "Ofrecemos una defensa robusta y soluciones financieras para individuos y familias que enfrentan deudas abrumadoras. Nuestro objetivo es restaurar la estabilidad y proteger el patrimonio familiar a través de una gestión contable y legal impecable.",
      details: `
                <h3>Servicios Detallados</h3>
                <ul>
                    <li><strong>Negociación con Acreedores:</strong> Reestructuración de deudas y negociación de quitas con bancos e instituciones financieras.</li>
                    <li><strong>Defensa en Juicios Ejecutivos:</strong> Representación legal contra demandas de embargo y ejecución de deudas.</li>
                    <li><strong>Contabilidad Familiar:</strong> Diseño de presupuestos y planes financieros para el control de gastos y la reconstrucción del crédito.</li>
                    <li><strong>Protección Patrimonial:</strong> Estrategias legales para proteger los bienes familiares ante contingencias financieras.</li>
                </ul>`,
    },
    mercantil: {
      title: "Derecho Mercantil y Análisis de Mercado",
      intro:
        "Proveemos la estructura legal y el análisis estratégico que las empresas necesitan para competir y crecer. Desde la constitución hasta la resolución de disputas comerciales, somos un aliado clave para el éxito de su negocio.",
      details: `
                <h3>Servicios Detallados</h3>
                <ul>
                    <li><strong>Constitución de Sociedades:</strong> Asesoría en la elección y creación de la estructura corporativa más eficiente.</li>
                    <li><strong>Contratos Comerciales:</strong> Elaboración y negociación de todo tipo de contratos (distribución, suministro, franquicia).</li>
                    <li><strong>Litigio Mercantil:</strong> Defensa de los intereses de la empresa en juicios sobre contratos, pagarés y disputas entre socios.</li>
                    <li><strong>Análisis de Mercado:</strong> Estudios de viabilidad y competencia para la toma de decisiones estratégicas.</li>
                </ul>`,
    },
    laboral: {
      title: "Derecho Laboral y Cumplimiento Corporativo",
      intro:
        "Ayudamos a las empresas a construir relaciones laborales sólidas y a cumplir con un marco normativo en constante cambio. Nuestra práctica se enfoca en la prevención de riesgos y la defensa efectiva.",
      details: `<h3>Servicios Detallados</h3>
                <ul>
                     <li><strong>Contratación Individual y Colectiva:</strong> Diseño de contratos y estrategias para la gestión de sindicatos.</li>
                    <li><strong>Defensa en Juicios Laborales:</strong> Representación ante las Juntas de Conciliación y Tribunales Laborales.</li>
                    <li><strong>Auditorías de Cumplimiento (NOM-035, etc.):</strong> Verificación y adecuación de las políticas internas a la normativa vigente.</li>
                    <li><strong>Reglamentos Internos y Políticas:</strong> Creación de la estructura documental para una sana relación laboral.</li>
                </ul>`,
    },
    // ... Puedes añadir el resto de los servicios aquí
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
    teamPillsContainer.innerHTML = ""; // Limpiar antes de poblar
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

  // Abrir modal "Nosotros" desde el footer
  document
    .getElementById("footer-nosotros-link")
    .addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("logo-button").click();
    });

  // --- Modal: Perfil de Equipo ---
  const profileModal = document.getElementById("team-profile-modal-overlay");
  const profileContent = document.getElementById("team-profile-content");

  // Event listener en el contenedor de píldoras para abrir perfiles
  teamPillsContainer.addEventListener("click", (e) => {
    const pill = e.target.closest(".team-pill");
    if (!pill) return;

    const memberId = pill.dataset.memberId;
    const member = teamData[memberId];

    profileContent.innerHTML = `
            <div class="profile-pill">
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

  // --- Modal: Servicios Fullscreen ---
  const serviceModal = document.getElementById("service-modal-overlay");
  const serviceModalContent = document.getElementById("service-modal-content");

  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("click", () => {
      const serviceId = card.dataset.serviceId;
      const service = servicesData[serviceId];
      if (!service) return;

      // Encontrar abogados para este servicio
      let teamHtml = "";
      for (const memberId in teamData) {
        if (teamData[memberId].services.includes(serviceId)) {
          const member = teamData[memberId];
          teamHtml += `
                        <div class="team-pill" data-member-id="${memberId}">
                            <img src="${member.image}" alt="${member.name}">
                            <strong>${member.name}</strong>
                        </div>`;
        }
      }

      serviceModalContent.innerHTML = `
                <h2>${service.title}</h2>
                <p class="service-intro">${service.intro}</p>
                ${service.details}
                <div id="service-team-container">
                    <h3>Expertos en el Área</h3>
                    ${teamHtml}
                </div>`;

      openModal(serviceModal);
    });
  });

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
