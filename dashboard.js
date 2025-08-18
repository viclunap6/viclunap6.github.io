document.addEventListener("DOMContentLoaded", () => {
  // --- SIMULACIÓN DE BASE DE DATOS ---
  const generadorDeCasos = () => {
    const clientes = [
      "Empresa A",
      "Familia Pérez",
      "Constructora B",
      "Juan Rodríguez",
      "Inmobiliaria C",
      "Sofía García",
    ];
    const tipos = ["Mercantil", "Familiar", "Civil", "Administrativo", "Penal"];
    const equipos = ["unidad-1", "unidad-2", "unidad-3"];
    let casos = [];
    for (let i = 1; i <= 20; i++) {
      const diasAtras = Math.floor(Math.random() * 90);
      const fechaIngreso = new Date();
      fechaIngreso.setDate(fechaIngreso.getDate() - diasAtras);

      const diasUltimaNoticia = Math.floor(Math.random() * diasAtras);
      const ultimaNoticia = new Date(fechaIngreso);
      ultimaNoticia.setDate(ultimaNoticia.getDate() + diasUltimaNoticia);

      const diasTermino = Math.floor(Math.random() * 30) + 1;
      const fechaTermino = new Date();
      fechaTermino.setDate(fechaTermino.getDate() + diasTermino);

      const pagoAtrasado = Math.random() > 0.6;
      const diasAtraso = pagoAtrasado ? Math.floor(Math.random() * 45) + 5 : 0;

      casos.push({
        id: `CASO-${1000 + i}`,
        tipo: tipos[Math.floor(Math.random() * tipos.length)],
        cliente: clientes[Math.floor(Math.random() * clientes.length)],
        fechaIngreso: fechaIngreso.toISOString().split("T")[0],
        ultimaNoticia: ultimaNoticia.toISOString().split("T")[0],
        fechaTermino: fechaTermino.toISOString().split("T")[0],
        teamId: equipos[Math.floor(Math.random() * equipos.length)],
        diasAtrasoPago: diasAtraso,
        cumplimiento: Math.random() > 0.5 ? "OK" : "Pendiente",
      });
    }
    return casos;
  };
  const casos = generadorDeCasos();

  const firma = {
    personalFijo: [
      {
        id: "admin",
        rol: "_A. Administración",
        kpiLabel: "Gestión de Cobranza",
      },
      {
        id: "sup",
        rol: "_B. Supervisión",
        kpiLabel: "Cumplimiento de Términos",
      },
      { id: "ventas", rol: "_C. Ventas", kpiLabel: "Nuevos Asuntos" },
      { id: "dir", rol: "_D. Dirección", kpiLabel: "Supervisión General" },
    ],
    equipos: [
      { id: "unidad-1", nombre: "Equipo Hugo" },
      { id: "unidad-2", nombre: "Equipo Valeria" },
      { id: "unidad-3", nombre: "Equipo Emanuel" },
    ],
    costosFijos: [
      { nombre: "Renta y Servicios", monto: 60000 },
      { nombre: "Nómina Administrativa", monto: 32000 },
    ],
  };

  // --- AUTENTICACIÓN Y RENDERIZADO INICIAL ---
  const userData = JSON.parse(localStorage.getItem("LCHA_user"));
  if (!userData) {
    window.location.href = "index.html";
    return;
  }

  const mainContent = document.getElementById("main-content");
  const userInfo = document.getElementById("user-info");
  userInfo.innerHTML = `<p class="font-semibold">${userData.name}</p><p class="text-sm text-gray-400 capitalize">${userData.role}</p>`;

  const renderView = {
    director: renderDirectorView,
    abogado: () => renderAbogadoView(userData.teamId),
    admin: renderAdminView,
    supervisor: renderSupervisorView,
  };

  renderView[userData.role]();

  // --- FUNCIONES DE RENDERIZADO DE VISTAS ---
  function renderDirectorView() {
    mainContent.innerHTML = `
            <div class="grid grid-cols-1 gap-6">
                <div>
                    <h2 class="text-xl mb-4">Áreas de Soporte y Estrategia</h2>
                    <div id="areas-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"></div>
                </div>
                <div>
                    <h2 class="text-xl mb-4">Equipos Operativos</h2>
                    <div id="equipos-container" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"></div>
                </div>
            </div>`;

    const areasContainer = document.getElementById("areas-container");
    const equiposContainer = document.getElementById("equipos-container");

    firma.personalFijo.forEach((area) => {
      areasContainer.innerHTML += `<div data-id="${area.id}" class="card p-4 rounded-lg cursor-pointer"><h3 class="font-semibold text-lg">${area.rol}</h3><p class="text-sm text-gray-400">${area.kpiLabel}</p></div>`;
    });
    firma.equipos.forEach((equipo) => {
      equiposContainer.innerHTML += `<div data-id="${equipo.id}" class="card p-4 rounded-lg cursor-pointer"><h3 class="font-semibold text-lg">${equipo.nombre}</h3><p class="text-sm text-gray-400">${casos.filter((c) => c.teamId === equipo.id).length} casos activos</p></div>`;
    });
  }

  function renderAbogadoView(teamId) {
    const equipoNombre =
      firma.equipos.find((e) => e.id === teamId)?.nombre ||
      "Equipo Desconocido";
    const casosDelEquipo = casos.filter((caso) => caso.teamId === teamId);

    let tableRows = casosDelEquipo
      .map(
        (caso) => `
            <tr>
                <td>${caso.tipo}</td>
                <td>${caso.cliente}</td>
                <td>${caso.fechaIngreso}</td>
                <td>${caso.ultimaNoticia}</td>
                <td><button data-caso-id="${caso.id}" class="text-blue-400 hover:text-blue-300">Solicitar Asesoría</button></td>
            </tr>
        `,
      )
      .join("");

    mainContent.innerHTML = `
            <h2 class="text-2xl mb-4">Mis Casos Asignados: ${equipoNombre}</h2>
            <div class="table-container">
                <table class="w-full text-sm">
                    <thead>
                        <tr><th>Tipo de Asunto</th><th>Cliente</th><th>Fecha de Ingreso</th><th>Última Noticia</th><th>Acción</th></tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </div>`;
  }

  function renderAdminView() {
    const casosOrdenados = [...casos].sort(
      (a, b) => b.diasAtrasoPago - a.diasAtrasoPago,
    );

    let tableRows = casosOrdenados
      .map(
        (caso) => `
             <tr class="${caso.diasAtrasoPago > 0 ? "bg-red-900/20" : ""}">
                <td>${caso.cliente}</td>
                <td>${caso.diasAtrasoPago > 0 ? `${caso.diasAtrasoPago} días` : "Al corriente"}</td>
                <td><button data-cliente="${caso.cliente}" class="text-blue-400 hover:text-blue-300">Contactar</button></td>
            </tr>
        `,
      )
      .join("");

    mainContent.innerHTML = `
            <h2 class="text-2xl mb-4">Gestión de Cobranza</h2>
             <div class="table-container">
                <table class="w-full text-sm">
                    <thead><tr><th>Cliente</th><th>Estado de Pago</th><th>Acción</th></tr></thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </div>`;
  }

  function renderSupervisorView() {
    const casosOrdenados = [...casos].sort(
      (a, b) => new Date(a.fechaTermino) - new Date(b.fechaTermino),
    );

    let tableRows = casosOrdenados
      .map(
        (caso) => `
            <tr>
                <td>${new Date(caso.fechaTermino).toLocaleDateString()}</td>
                <td>${caso.id}</td>
                <td>${caso.cliente}</td>
                <td>${caso.cumplimiento}</td>
                <td><button data-caso-id="${caso.id}" class="text-blue-400 hover:text-blue-300">Revisar</button></td>
            </tr>
        `,
      )
      .join("");

    mainContent.innerHTML = `
             <h2 class="text-2xl mb-4">Supervisión de Cumplimiento</h2>
             <div class="table-container">
                <table class="w-full text-sm">
                    <thead><tr><th>Fecha Límite</th><th>ID Caso</th><th>Cliente</th><th>Estado</th><th>Acción</th></tr></thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </div>`;
  }

  // --- MANEJO DE EVENTOS Y MODALES ---
  const modalContainer = document.getElementById("modal-container");
  const modalPanel = document.getElementById("modal-panel");
  const modalContentBody = document.getElementById("modal-content-body");

  function openModal(content, size = "lg") {
    modalPanel.className = `modal-content modal-${size}`;
    modalContentBody.innerHTML = content;
    modalContainer.style.display = "flex";
  }

  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer || e.target.closest(".close-button")) {
      modalContainer.style.display = "none";
    }
  });

  mainContent.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card && userData.role === "director") {
      const id = card.dataset.id;
      const equipo = firma.equipos.find((eq) => eq.id === id);
      const area = firma.personalFijo.find((ar) => ar.id === id);

      if (equipo) {
        const totalCostosEquipo = 16000; // Simulación
        const bonoEstimado =
          casos.filter((c) => c.teamId === equipo.id).length * 250;
        openModal(`
                    <h2 class="text-2xl mb-4">${equipo.nombre}</h2>
                    <p><strong>Costo Base del Equipo:</strong> $${totalCostosEquipo.toLocaleString()}</p>
                    <p><strong>Bono Estimado por Asuntos:</strong> $${bonoEstimado.toLocaleString()}</p>
                    <p><strong>Total Estimado:</strong> $${(totalCostosEquipo + bonoEstimado).toLocaleString()}</p>
                `);
      } else if (area && area.id === "dir") {
        const totalCostos = firma.costosFijos.reduce(
          (acc, costo) => acc + costo.monto,
          0,
        );
        const costosHTML = firma.costosFijos
          .map((c) => `<li>${c.nombre}: $${c.monto.toLocaleString()}</li>`)
          .join("");
        openModal(`
                    <h2 class="text-2xl mb-4">Detalle de Costos Fijos</h2>
                    <ul>${costosHTML}</ul>
                    <hr class="my-4 border-gray-600">
                    <p class="text-lg"><strong>Total:</strong> $${totalCostos.toLocaleString()}</p>
                 `);
      } else if (area) {
        openModal(
          `<h2 class="text-2xl mb-4">Detalles de ${area.rol}</h2><p>Información detallada para esta área estará disponible próximamente.</p>`,
        );
      }
    }

    // Lógica para botones dentro de las tablas
    const botonAsesoria = e.target.closest("button[data-caso-id]");
    if (botonAsesoria) {
      const casoId = botonAsesoria.dataset.casoId;
      openModal(`
                <h2 class="text-2xl mb-4">Solicitud de Asesoría</h2>
                <p><strong>Caso:</strong> ${casoId}</p>
                <textarea class="w-full bg-gray-900 rounded-md p-2 mt-4" rows="4" placeholder="Describa su consulta para Dirección..."></textarea>
                <button class="w-full bg-blue-600 hover:bg-blue-500 rounded-md p-2 mt-4">Enviar</button>
            `);
    }
  });
});
