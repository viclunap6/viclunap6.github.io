document.addEventListener("DOMContentLoaded", () => {
  // --- ESTADO Y DATOS DE LA APLICACIÓN ---
  const BONO_POR_ASUNTO = 250;
  let solicitudesAyuda = [];
  let nuevosAsuntos = [];
  let costosFijos = [{ nombre: "Renta y Servicios", monto: 60000 }];
  let currentCalculations = {};

  const firma = {
    personalFijo: [
      {
        id: "admin",
        rol: "_A. Administración",
        sueldoBase: 8000,
        maxIncentivo: 4000,
        tipoIncentivo: "kpi_clientes",
        kpiLabel: "% Clientes Pagando",
      },
      {
        id: "sup",
        rol: "_B. Supervisión",
        sueldoBase: 16000,
        incentivoPct: 0.2,
        tipoIncentivo: "utilidad_global",
        kpiLabel: "% Cumplimiento",
      },
      {
        id: "ventas",
        rol: "_C. Ventas",
        sueldoBase: 8000,
        incentivoPct: 0.1,
        tipoIncentivo: "ingresos_globales",
        kpiLabel: "# Nuevos Asuntos",
      },
      {
        id: "dir",
        rol: "_D. Dirección",
        sueldoBase: 20000,
        incentivoPct: 0.15,
        tipoIncentivo: "utilidad_global",
        kpiLabel: "# Solicitudes Asesoría",
      },
    ],
    equipos: [
      {
        id: "unidad-1",
        nombre: "Equipo Hugo",
        kpiLabel: "# Asuntos",
        miembros: [
          { rol: "Abogado Jefe", nombre: "Hugo", sueldoBase: 8000 },
          { rol: "Pasante", nombre: "Pasante 1", sueldoBase: 8000 },
        ],
        casos: { Civiles: 10, Familiares: 20, Mercantiles: 5 },
      },
      {
        id: "unidad-2",
        nombre: "Equipo Valeria",
        kpiLabel: "# Asuntos",
        miembros: [
          { rol: "Abogado Jefe", nombre: "Valeria", sueldoBase: 8000 },
          { rol: "Pasante", nombre: "Pasante 2", sueldoBase: 8000 },
        ],
        casos: { Civiles: 15, Familiares: 15, Penales: 3 },
      },
      {
        id: "unidad-3",
        nombre: "Equipo Emanuel",
        kpiLabel: "# Asuntos",
        miembros: [
          { rol: "Abogado Jefe", nombre: "Emanuel", sueldoBase: 8000 },
          { rol: "Pasante", nombre: "Pasante 3", sueldoBase: 8000 },
        ],
        casos: { Familiares: 15, Mercantiles: 5, Administrativos: 2 },
      },
    ],
  };

  // --- FUNCIONES DE UTILIDAD ---
  const formatCurrency = (value) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value);

  // --- LÓGICA DE CÁLCULO PRINCIPAL ---
  function calcularTodo() {
    const costoFijoManual = costosFijos.reduce((acc, c) => acc + c.monto, 0);
    const totalClientes =
      parseFloat(document.getElementById("total-clientes")?.value) || 0;
    const clientesPagando =
      parseFloat(document.getElementById("clientes-pagando")?.value) || 0;
    const totalTerminos =
      parseFloat(document.getElementById("total-terminos")?.value) || 0;
    const terminosCumplidos =
      parseFloat(document.getElementById("terminos-cumplidos")?.value) || 0;

    const costoSueldosFijos = firma.personalFijo.reduce(
      (acc, p) => acc + p.sueldoBase,
      0,
    );
    const ingresosGlobales = 180000;
    let bonosEquipos = 0;

    currentCalculations.equipos = {};
    firma.equipos.forEach((u) => {
      const totalAsuntos = Object.values(u.casos).reduce((a, b) => a + b, 0);
      const bonoPorAsuntos = totalAsuntos * BONO_POR_ASUNTO;
      bonosEquipos += bonoPorAsuntos;
      currentCalculations.equipos[u.id] = {
        bonoPorAsuntos,
        remuneraciones: {},
      };
      u.miembros.forEach((m) => {
        currentCalculations.equipos[u.id].remuneraciones[m.nombre] =
          m.sueldoBase;
      });
    });

    const costoTotalEquipos =
      firma.equipos
        .flatMap((e) => e.miembros)
        .reduce((acc, m) => acc + m.sueldoBase, 0) + bonosEquipos;
    const costoTotalFirma =
      costoFijoManual + costoSueldosFijos + costoTotalEquipos;
    const utilidadNetaGlobal = ingresosGlobales - costoTotalFirma;

    const pctClientes = totalClientes > 0 ? clientesPagando / totalClientes : 0;
    const pctTerminos =
      totalTerminos > 0 ? (terminosCumplidos / totalTerminos) * 100 : 0;

    currentCalculations.areas = {};
    firma.personalFijo.forEach((area) => {
      let incentivo = 0;
      if (area.tipoIncentivo === "kpi_clientes") {
        incentivo = area.maxIncentivo * pctClientes;
      } else if (area.tipoIncentivo === "ingresos_globales") {
        incentivo =
          nuevosAsuntos.reduce((acc, asunto) => acc + asunto.pagoInicial, 0) *
          area.incentivoPct;
      }
      if (area.id === "sup") {
        incentivo = pctTerminos * 40;
      }
      currentCalculations.areas[area.id] = { incentivo };
    });

    const utilidadAntesDistribucion = utilidadNetaGlobal;
    const distDireccion =
      utilidadAntesDistribucion > 0
        ? utilidadAntesDistribucion *
          firma.personalFijo.find((p) => p.id === "dir").incentivoPct
        : 0;

    currentCalculations.areas["dir"].incentivo = distDireccion;

    updateUI(pctClientes, pctTerminos, costoFijoManual);
  }

  // --- ACTUALIZACIÓN DE LA INTERFAZ DE USUARIO ---
  function updateUI(pctClientes, pctTerminos, costoFijoManual) {
    document.getElementById("summary-kpi-dir").textContent =
      solicitudesAyuda.length;
    document.getElementById("summary-kpi-sup").textContent =
      `${pctTerminos.toFixed(1)}%`;
    document.getElementById("summary-kpi-admin").textContent =
      `${(pctClientes * 100).toFixed(1)}%`;
    document.getElementById("summary-kpi-ventas").textContent =
      nuevosAsuntos.length;
    document.getElementById("total-costos-fijos").textContent =
      formatCurrency(costoFijoManual);
  }

  // --- RENDERIZADO DE COMPONENTES HTML ---
  const crearEquipoCardHTML = (unidad) => {
    const totalAsuntos = Object.values(unidad.casos).reduce((a, b) => a + b, 0);
    return `<button data-id="${unidad.id}" data-type="equipo" class="modal-trigger bg-gray-800/50 border border-gray-700/50 p-4 rounded-lg text-left card-hover w-full"><h3 class="font-semibold text-white text-base">${unidad.nombre}</h3><p class="text-sm text-gray-400">${unidad.kpiLabel}: <span id="summary-kpi-${unidad.id}" class="font-medium text-white">${totalAsuntos}</span></p></button>`;
  };

  const crearAreaCardHTML = (area) => {
    let extraInfo =
      area.id === "dir"
        ? `<p class="text-sm text-gray-400">Costos Fijos: <span id="total-costos-fijos" class="font-medium text-white">$0.00</span></p>`
        : "";
    return `<button data-id="${area.id}" data-type="area" class="modal-trigger bg-gray-800/50 border border-gray-700/50 p-4 rounded-lg text-left card-hover w-full"><h3 class="font-semibold text-base text-white">${area.rol}</h3><p class="text-sm text-gray-400">${area.kpiLabel}: <span id="summary-kpi-${area.id}" class="font-medium text-white">0</span></p>${extraInfo}</button>`;
  };

  // --- LÓGICA DEL MODAL ---
  function renderModal(type, id) {
    const modalContent = document.getElementById("modal-content");
    let html = "";

    if (type === "equipo") {
      const equipo = firma.equipos.find((e) => e.id === id);
      const calc = currentCalculations.equipos[id];
      const totalAsuntos = Object.values(equipo.casos).reduce(
        (a, b) => a + b,
        0,
      );
      const asuntosBreakdownHTML = Object.entries(equipo.casos)
        .map(
          ([tipo, num]) =>
            `<div class="flex justify-between text-sm"><p class="text-gray-400">${tipo}:</p><p class="font-medium text-white">${num}</p></div>`,
        )
        .join("");
      const miembrosHTML = equipo.miembros
        .map(
          (m) =>
            `<div class="flex justify-between text-sm"><p class="text-gray-400">${m.nombre} (${m.rol})</p><p class="font-medium text-white">${formatCurrency(calc.remuneraciones[m.nombre])}</p></div>`,
        )
        .join("");

      html = `<h2 class="text-xl font-bold mb-4">${equipo.nombre}</h2>
                    <hr class="border-gray-700 my-4"><h3 class="font-semibold mb-2 text-white">Remuneración Mensual</h3><div class="space-y-2">${miembrosHTML}</div><div class="flex justify-between font-bold text-base mt-2 border-t border-gray-700 pt-2"><span class="text-blue-400">Bono por Asuntos:</span><span class="text-blue-400">${formatCurrency(calc.bonoPorAsuntos)}</span></div>
                    <hr class="border-gray-700 my-4"><h3 class="font-semibold mb-2 text-white">Cartera de Asuntos (${totalAsuntos})</h3><div class="space-y-1">${asuntosBreakdownHTML}</div>
                    <div class="mt-6 flex flex-col gap-3"><button class="modal-trigger w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" data-type="solicitud" data-id="${id}">Solicitar Asesoría</button><button class="modal-close-btn w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Cerrar</button></div>`;
    } else if (type === "area") {
      const area = firma.personalFijo.find((a) => a.id === id);
      if (area.id === "dir") {
        const costosHTML = costosFijos
          .map(
            (costo, index) =>
              `<div class="flex items-center gap-2"><input type="text" value="${costo.nombre}" class="costo-nombre w-full bg-gray-700 border-gray-600 rounded-lg px-3 py-1 text-sm" data-index="${index}"><div class="relative"><span class="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-500 text-sm">$</span><input type="number" value="${costo.monto}" class="costo-monto w-32 bg-gray-700 border-gray-600 rounded-lg pl-6 pr-2 py-1 text-sm" data-index="${index}"></div></div>`,
          )
          .join("");
        html = `<div class="space-y-4 flex-1 overflow-y-auto"><h2 class="text-lg font-semibold text-white">Panel de Control</h2><div class="bg-gray-800/50 p-4 rounded-xl space-y-3"><h3 class="font-semibold text-white text-sm">Costos Fijos</h3><div id="costos-lista" class="space-y-2 mb-4">${costosHTML}</div>${costosFijos.length < 15 ? '<div class="flex gap-2"><input type="text" id="nuevo-costo-nombre" placeholder="Nombre del costo" class="w-full bg-gray-700 border-gray-600 rounded-lg px-3 py-1 text-sm"><div class="relative"><span class="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-500 text-sm">$</span><input type="number" id="nuevo-costo-monto" placeholder="Monto" class="w-32 bg-gray-700 border-gray-600 rounded-lg pl-6 pr-2 py-1 text-sm"></div></div><button id="agregar-costo-btn" class="w-full mt-2 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg text-sm">Agregar Costo</button>' : ""}</div><div class="bg-gray-800/50 p-4 rounded-xl space-y-3"><h3 class="font-semibold text-white text-sm">Clientes</h3><div><label for="total-clientes" class="block text-xs font-medium text-gray-400">Total con Vencimiento</label><input type="number" id="total-clientes" value="100" class="w-full bg-gray-700/50 border-gray-600 rounded-lg px-4 py-2 mt-1 text-sm"/></div><div><label for="clientes-pagando" class="block text-xs font-medium text-gray-400">Pagaron a Tiempo</label><input type="number" id="clientes-pagando" value="85" class="w-full bg-gray-700/50 border-gray-600 rounded-lg px-4 py-2 mt-1 text-sm"/></div></div><div class="bg-gray-800/50 p-4 rounded-xl space-y-3"><h3 class="font-semibold text-white text-sm">Cumplimiento</h3><div><label for="total-terminos" class="block text-xs font-medium text-gray-400">Total de Términos</label><input type="number" id="total-terminos" value="200" class="w-full bg-gray-700/50 border-gray-600 rounded-lg px-4 py-2 mt-1 text-sm"/></div><div><label for="terminos-cumplidos" class="block text-xs font-medium text-gray-400">Cumplidos a Tiempo</label><input type="number" id="terminos-cumplidos" value="190" class="w-full bg-gray-700/50 border-gray-600 rounded-lg px-4 py-2 mt-1 text-sm"/></div></div></div><div class="mt-6 flex flex-col gap-3"><button id="guardar-costos-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Guardar y Cerrar</button></div>`;
      } else {
        const estatus = document.getElementById(
          `summary-kpi-${id}`,
        ).textContent;
        let contentHTML =
          area.id === "ventas"
            ? `<hr class="border-gray-700"><div class="mt-4"><button class="modal-trigger w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" data-type="nuevoAsunto" data-id="0">Registrar Nuevo Asunto</button></div>`
            : "";
        html = `<h2 class="text-xl font-bold mb-4">${area.rol}</h2><div class="space-y-4"><div><p class="kpi-label">Objetivo</p><p class="text-lg font-medium text-white">${area.kpiLabel}</p></div><div><p class="kpi-label">Estatus Actual</p><p class="text-2xl font-bold text-emerald-400">${estatus}</p></div><hr class="border-gray-700"><div><p class="kpi-label">Incentivo Calculado</p><p class="text-2xl font-bold text-blue-400">${formatCurrency(currentCalculations.areas[id].incentivo)}</p></div>${contentHTML}</div><div class="mt-6"><button class="modal-close-btn w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Cerrar</button></div>`;
      }
    } else if (type === "solicitud") {
      const equipo = firma.equipos.find((e) => e.id === id);
      html = `<h2 class="text-xl font-bold mb-4">Solicitar Asesoría</h2><p class="text-sm text-gray-400 mb-4">Equipo: ${equipo.nombre}</p><div><label for="asunto-solicitud" class="block text-xs font-medium text-gray-400">Asunto Específico</label><input type="text" id="asunto-solicitud" placeholder="Ej: Amparo indirecto 123/2025" class="w-full bg-gray-700 border-gray-600 rounded-lg px-3 py-2 mt-1 text-sm"></div><div class="mt-6 flex flex-col gap-3"><button id="enviar-solicitud-btn" data-equipo-id="${id}" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Enviar Solicitud</button><button class="modal-close-btn w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Cancelar</button></div>`;
    } else if (type === "nuevoAsunto") {
      const equiposOptions = firma.equipos
        .map((e) => `<option value="${e.id}">${e.nombre}</option>`)
        .join("");
      html = `<h2 class="text-xl font-bold mb-4">Registrar Nuevo Asunto</h2><div class="space-y-4"><div><label for="nuevo-asunto-nombre" class="block text-xs font-medium text-gray-400">Nombre / ID del Asunto</label><input type="text" id="nuevo-asunto-nombre" class="w-full bg-gray-700 border-gray-600 rounded-lg px-3 py-2 mt-1 text-sm"></div><div><label for="nuevo-asunto-pago" class="block text-xs font-medium text-gray-400">Pago Inicial</label><div class="relative mt-1"><span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">$</span><input type="number" id="nuevo-asunto-pago" class="w-full bg-gray-700 border-gray-600 rounded-lg pl-8 pr-4 py-2 text-sm"></div></div><div><label for="nuevo-asunto-equipo" class="block text-xs font-medium text-gray-400">Asignar a Equipo</label><select id="nuevo-asunto-equipo" class="w-full bg-gray-700 border-gray-600 rounded-lg px-3 py-2 mt-1 text-sm">${equiposOptions}</select></div></div><div class="mt-6 flex flex-col gap-3"><button id="guardar-asunto-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Guardar Asunto</button><button class="modal-close-btn w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Cancelar</button></div>`;
    }

    modalContent.innerHTML = html;
    toggleModal(true);
  }

  function toggleModal(show) {
    const container = document.getElementById("modal-container");
    const panel = document.getElementById("modal-panel");
    const backdrop = document.getElementById("modal-backdrop");
    if (show) {
      container.classList.remove("hidden");
      setTimeout(() => {
        backdrop.classList.remove("opacity-0");
        panel.classList.remove("opacity-0", "scale-95");
      }, 10);
    } else {
      backdrop.classList.add("opacity-0");
      panel.classList.add("opacity-0", "scale-95");
      setTimeout(() => container.classList.add("hidden"), 300);
    }
  }

  // --- MANEJO DE EVENTOS (EVENT HANDLING) ---
  function setupEventListeners() {
    document.body.addEventListener("click", (e) => {
      const trigger = e.target.closest(".modal-trigger");
      if (trigger) {
        renderModal(trigger.dataset.type, trigger.dataset.id);
      }
    });

    const modalContainer = document.getElementById("modal-container");
    modalContainer.addEventListener("click", (e) => {
      if (
        e.target.matches("#modal-backdrop") ||
        e.target.closest(".modal-close-btn")
      ) {
        toggleModal(false);
      }
      if (e.target.matches("#enviar-solicitud-btn")) {
        handleEnviarSolicitud(e.target.dataset.equipoId);
      }
      if (e.target.matches("#guardar-costos-btn")) {
        handleGuardarCostos();
      }
      if (e.target.matches("#agregar-costo-btn")) {
        handleAgregarCosto();
      }
      if (e.target.matches("#guardar-asunto-btn")) {
        handleGuardarAsunto();
      }
    });

    modalContainer.addEventListener("input", (e) => {
      if (e.target.matches("#modal-content input")) {
        calcularTodo();
      }
    });
  }

  function handleEnviarSolicitud(equipoId) {
    const asunto = document.getElementById("asunto-solicitud").value;
    if (asunto) {
      const equipo = firma.equipos.find((eq) => eq.id === equipoId);
      solicitudesAyuda.push({ equipoId, equipoNombre: equipo.nombre, asunto });
      calcularTodo();
      toggleModal(false);
    }
  }

  function handleGuardarCostos() {
    costosFijos = Array.from(
      document.querySelectorAll("#costos-lista > div"),
    ).map((div) => ({
      nombre: div.querySelector(".costo-nombre").value,
      monto: parseFloat(div.querySelector(".costo-monto").value) || 0,
    }));
    calcularTodo();
    toggleModal(false);
  }

  function handleAgregarCosto() {
    const nombre = document.getElementById("nuevo-costo-nombre").value;
    const monto =
      parseFloat(document.getElementById("nuevo-costo-monto").value) || 0;
    if (nombre && monto > 0 && costosFijos.length < 15) {
      costosFijos.push({ nombre, monto });
      renderModal("area", "dir");
    }
  }

  function handleGuardarAsunto() {
    const nombre = document.getElementById("nuevo-asunto-nombre").value;
    const pago =
      parseFloat(document.getElementById("nuevo-asunto-pago").value) || 0;
    const equipoId = document.getElementById("nuevo-asunto-equipo").value;
    if (nombre && pago > 0 && equipoId) {
      nuevosAsuntos.push({ nombre, pagoInicial: pago, equipoId });
      calcularTodo();
      toggleModal(false);
    }
  }

  // --- INICIALIZACIÓN DE LA APLICACIÓN ---
  function init() {
    const equiposContainer = document.getElementById("equipos-container");
    firma.equipos.forEach(
      (unidad) => (equiposContainer.innerHTML += crearEquipoCardHTML(unidad)),
    );

    const areasContainer = document.getElementById("areas-fijas-container");
    firma.personalFijo.forEach(
      (area) => (areasContainer.innerHTML += crearAreaCardHTML(area)),
    );

    setupEventListeners();
    calcularTodo();
  }

  init();
});
