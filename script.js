document.addEventListener("DOMContentLoaded", () => {
  // --- Bases de Datos ---
  const teamData = {
    1: {
      name: "Sofía Luna",
      title: "Socia Fundadora | Litigio y Estrategia Corporativa",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=S.+Luna",
      bio: "Con más de 20 años de experiencia, Sofía es una estratega legal reconocida por su capacidad para resolver disputas complejas y su visión para el blindaje corporativo. Lidera las áreas de litigio de alto impacto y asesora a consejos de administración en la toma de decisiones críticas, combinando rigor técnico con una profunda comprensión del entorno de negocios.",
      services: ["mercantil", "laboral", "inmobiliario"],
    },
    2: {
      name: "Mateo Herrera",
      title: "Socio | Derecho Laboral y Cumplimiento Normativo",
      image:
        "https://via.placeholder.com/140x210/cccccc/ffffff?text=M.+Herrera",
      bio: "Mateo es experto en la gestión de relaciones laborales, desde la negociación de contratos colectivos hasta la defensa estratégica en juicios individuales. Su práctica se enfoca en la prevención de conflictos y el diseño de políticas de cumplimiento que fortalecen la estructura interna de las empresas y minimizan riesgos.",
      services: ["laboral"],
    },
    3: {
      name: "Valeria Campos",
      title: "Asociada Senior | Derecho Familiar y Patrimonial",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=V.+Campos",
      bio: "Valeria combina una profunda sensibilidad con una rigurosa técnica legal para guiar a los clientes a través de los procesos familiares más complejos. Es especialista en la elaboración de diagnósticos psicológicos con validez judicial y en la arquitectura de soluciones para la protección del patrimonio familiar intergeneracional.",
      services: ["familia", "deudor"],
    },
    4: {
      name: "David Ríos",
      title: "Asociado | Comercio Internacional y Propiedad Intelectual",
      image:
        "https://via.placeholder.com/140x210/cccccc/ffffff?text=D.+R%C3%ADos",
      bio: "David asesora a empresas en su expansión a mercados internacionales, gestionando la logística contractual y la protección de sus activos intangibles. Su enfoque bicultural y su dominio del derecho comparado son clave para facilitar negocios exitosos y seguros sin fronteras.",
      services: ["internacional"],
    },
  };

  const servicesData = {
    familia: {
      title: "Derecho Familiar y Valoración Psicológica",
      intro:
        "Abordamos las disputas familiares no solo como un problema legal, sino como un evento de vida que requiere un manejo sensible, estratégico y multidisciplinario. Nuestro objetivo es alcanzar resoluciones justas que protejan el bienestar emocional y patrimonial de todos los involucrados, especialmente el de los menores.",
      details: `
                <h3>Servicios Detallados</h3>
                <ul>
                    <li><strong>Planificación Patrimonial Familiar:</strong> Diseño de testamentos, fideicomisos y capitulaciones matrimoniales para la protección y sucesión del patrimonio.</li>
                    <li><strong>Divorcio y Disolución de Sociedad Conyugal:</strong> Representación en procesos de divorcio, ya sea de mutuo acuerdo o contenciosos, asegurando una división de bienes justa y expedita.</li>
                    <li><strong>Guarda, Custodia y Convivencia:</strong> Litigio y mediación enfocados en el interés superior del menor para definir la custodia y establecer regímenes de convivencia sanos y funcionales.</li>
                    <li><strong>Peritajes y Valoraciones Psicológicas:</strong> Colaboración con expertos para la elaboración de dictámenes psicológicos con validez judicial, fundamentales en disputas de custodia y casos de alienación parental.</li>
                </ul>
                <h3>Nuestra Diferencia</h3>
                <p>Integramos el análisis psicológico como una herramienta estratégica en el proceso legal. No nos limitamos a la letra de la ley; entendemos la dinámica familiar y la utilizamos para construir argumentos más sólidos y soluciones más humanas y duraderas.</p>`,
    },
    deudor: {
      title: "Defensa al Deudor y Contabilidad Patrimonial",
      intro:
        "Frente a una situación de sobreendeudamiento, ofrecemos una defensa legal robusta y una reestructuración financiera integral. Transformamos la incertidumbre en un plan de acción claro, protegiendo su patrimonio y restaurando su tranquilidad y estabilidad económica.",
      details: `
                <h3>Servicios Detallados</h3>
                <ul>
                    <li><strong>Negociación Estratégica con Acreedores:</strong> Intervenimos ante bancos e instituciones financieras para negociar la reestructuración de deudas, la obtención de quitas y la modificación de condiciones de pago.</li>
                    <li><strong>Defensa en Juicios Ejecutivos y Embargos:</strong> Representación legal para la defensa de su patrimonio ante demandas de embargo, deteniendo procesos y buscando la nulidad de acciones indebidas.</li>
                    <li><strong>Auditoría y Contabilidad Patrimonial:</strong> Realizamos un análisis forense de su situación financiera para diseñar un presupuesto familiar, optimizar activos y pasivos, y trazar un camino hacia la recuperación.</li>
                    <li><strong>Estrategias de Blindaje Patrimonial:</strong> Implementamos instrumentos legales para proteger los bienes familiares esenciales ante futuras contingencias financieras.</li>
                </ul>
                <h3>Nuestra Diferencia</h3>
                <p>Nuestra visión es 360°. No solo lo defendemos en tribunales, sino que le proporcionamos las herramientas contables y financieras para que recupere el control. Convertimos una crisis en una oportunidad para fortalecer su futuro económico.</p>`,
    },
    mercantil: {
      title: "Derecho Mercantil y Análisis de Mercado",
      intro:
        "En el competitivo entorno de negocios actual, una estructura legal sólida no es suficiente. Ofrecemos una asesoría que integra el derecho mercantil con un profundo análisis de mercado, asegurando que cada decisión corporativa esté legalmente blindada y estratégicamente posicionada para el éxito.",
      details: `
                <h3>Servicios Detallados</h3>
                <ul>
                    <li><strong>Constitución y Gobierno Corporativo:</strong> Diseño de la estructura societaria óptima, elaboración de estatutos y acuerdos de accionistas que previenen conflictos futuros.</li>
                    <li><strong>Contratación Comercial Compleja:</strong> Redacción y negociación de contratos de distribución, suministro, franquicia, joint venture y otros acuerdos comerciales clave.</li>
                    <li><strong>Litigio Mercantil y Arbitraje:</strong> Representación en disputas sobre incumplimiento de contratos, conflictos entre socios y recuperación de cartera vencida, tanto en tribunales como en procesos de arbitraje.</li>
                    <li><strong>Análisis de Mercado y Viabilidad Legal:</strong> Realizamos estudios de mercado desde una perspectiva legal para evaluar la viabilidad de nuevos productos o expansiones, identificando barreras regulatorias y oportunidades.</li>
                </ul>
                <h3>Nuestra Diferencia</h3>
                <p>Somos abogados que hablamos el idioma de los negocios. No vemos los contratos como simples documentos, sino como instrumentos para la generación de valor. Nuestra asesoría legal siempre está alineada con sus objetivos comerciales.</p>`,
    },
    laboral: {
      title: "Derecho Laboral y Cumplimiento Corporativo",
      intro:
        "Gestionamos el capital humano como el activo más valioso de su empresa. Nuestra práctica va más allá de la defensa legal; nos enfocamos en la prevención de conflictos y en la creación de un entorno de cumplimiento normativo que fomenta la productividad y minimiza los riesgos.",
      details: `
                <h3>Servicios Detallados</h3>
                <ul>
                    <li><strong>Contratación y Terminación de Relaciones Laborales:</strong> Diseño de contratos, estrategias de contratación y manejo de procesos de terminación para minimizar riesgos de litigio.</li>
                    <li><strong>Litigio Laboral Estratégico:</strong> Defensa ante las Juntas de Conciliación y Tribunales Laborales, con un enfoque en la resolución eficiente de conflictos.</li>
                    <li><strong>Auditorías de Cumplimiento Normativo (NOM-035, REPSE, etc.):</strong> Verificación y adecuación de las políticas internas para asegurar el cumplimiento total de la normativa laboral vigente.</li>
                    <li><strong>Negociación Colectiva y Relaciones Sindicales:</strong> Asesoría y representación en la negociación de contratos colectivos de trabajo y en la gestión de la relación con sindicatos.</li>
                </ul>
                <h3>Nuestra Diferencia</h3>
                <p>Actuamos como un socio estratégico de su área de Recursos Humanos. Nuestro enfoque preventivo ahorra a nuestros clientes tiempo y recursos, transformando el cumplimiento laboral de una obligación a una ventaja competitiva.</p>`,
    },
    internacional: {
      title: "Comercio Internacional y Propiedad Intelectual",
      intro:
        "Facilitamos la expansión global de su negocio, protegiendo sus activos más importantes: sus ideas y su marca. Ofrecemos una asesoría integral que cubre desde la logística contractual de la importación/exportación hasta el blindaje de su propiedad intelectual en mercados extranjeros.",
      details: `
                <h3>Servicios Detallados</h3>
                <ul>
                    <li><strong>Contratos Internacionales:</strong> Elaboración y negociación de contratos de compraventa internacional, distribución, agencia y licencia, asegurando el cumplimiento de normativas y tratados (Incoterms, CISG).</li>
                    <li><strong>Registro y Protección de Marcas y Patentes:</strong> Gestión del registro de marcas y patentes a nivel nacional e internacional (Protocolo de Madrid, PCT) y defensa contra infracciones.</li>
                    <li><strong>Derechos de Autor y Secretos Industriales:</strong> Asesoría para la protección de software, obras creativas y secretos comerciales, incluyendo la elaboración de convenios de confidencialidad.</li>
                    <li><strong>Asesoría Aduanera y Cumplimiento:</strong> Orientación sobre clasificación arancelaria, regulaciones no arancelarias y procedimientos aduaneros para optimizar sus operaciones de comercio exterior.</li>
                </ul>
                <h3>Nuestra Diferencia</h3>
                <p>Entendemos que en el comercio global, la propiedad intelectual es la verdadera moneda. Nuestra práctica integrada asegura que su expansión comercial no solo sea viable, sino que también esté protegida contra la piratería y la competencia desleal.</p>`,
    },
    inmobiliario: {
      title: "Derecho Inmobiliario y Desarrollo de Proyectos",
      intro:
        "Transformamos terrenos y propiedades en activos de valor. Nuestra asesoría abarca todo el ciclo de vida de un proyecto inmobiliario, desde la adquisición de la tierra y la estructuración del financiamiento, hasta la comercialización y el régimen de condominio, garantizando certeza jurídica en cada etapa.",
      details: `
                <h3>Servicios Detallados</h3>
                <ul>
                    <li><strong>Due Diligence y Adquisición de Inmuebles:</strong> Investigación exhaustiva de la situación legal de propiedades para asegurar adquisiciones libres de riesgos.</li>
                    <li><strong>Estructuración de Proyectos:</strong> Diseño de fideicomisos, coinversiones y otras estructuras legales y financieras para el desarrollo de proyectos residenciales, comerciales e industriales.</li>
                    <li><strong>Gestión de Permisos y Licencias:</strong> Tramitación y obtención de licencias de uso de suelo, construcción y todos los permisos necesarios ante autoridades municipales, estatales y federales.</li>
                    <li><strong>Contratos de Obra y Comercialización:</strong> Elaboración de contratos de construcción, arrendamiento, compraventa y la constitución de regímenes de propiedad en condominio.</li>
                </ul>
                <h3>Nuestra Diferencia</h3>
                <p>Somos más que abogados; somos facilitadores de negocios inmobiliarios. Comprendemos el mercado, los tiempos del desarrollador y la importancia de la certeza jurídica como pilar fundamental de cualquier proyecto exitoso.</p>`,
    },
  };

  // El resto del código JS se mantiene igual.
  // ...
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
          teamHtml += `<div class="team-pill-service" data-member-id="${memberId}"><img src="${member.image}" alt="${member.name}"><strong>${member.name}</strong></div>`;
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
                        <div class="service-team-row">${teamHtml}</div>
                    </div>
                </div>`;

      openModal(serviceModal);
    });
  });

  // --- Inicialización del Mapa (OpenStreetMap) ---
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    const map = L.map("map").setView([19.429, -99.165], 16); // Coordenadas de Reforma 222
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
    L.marker([19.429, -99.165])
      .addTo(map)
      .bindPopup(
        "<b>Luna, Herrera & Asociados</b><br>Av. Álvaro Obregón 12 quinto piso.",
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
