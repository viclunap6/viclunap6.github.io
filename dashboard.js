document.addEventListener("DOMContentLoaded", () => {
    // --- SIMULACIÓN DE BASE DE DATOS ---
    const generadorDeCasos = () => {
        const clientes = ["Empresa Constructora G&S", "Familia Martínez Robles", "Comercializadora del Sureste", "Juan Carlos Rodríguez", "Inmobiliaria Futuro Hogar", "Sofía García de Alba", "Transportes Rápidos del Norte"];
        const tipos = ["Mercantil", "Familiar", "Civil", "Administrativo", "Laboral"];
        const equipos = ["unidad-1", "unidad-2", "unidad-3"];
        let casos = [];
        for (let i = 1; i <= 25; i++) {
            const diasAtras = Math.floor(Math.random() * 90);
            const fechaIngreso = new Date();
            fechaIngreso.setDate(fechaIngreso.getDate() - diasAtras);

            const diasUltimaNoticia = Math.floor(Math.random() * diasAtras);
            const ultimaNoticia = new Date(fechaIngreso);
            ultimaNoticia.setDate(ultimaNoticia.getDate() + diasUltimaNoticia);

            const diasTermino = Math.floor(Math.random() * 30) - 5; // Puede ser en el pasado cercano
            const fechaTermino = new Date();
            fechaTermino.setDate(fechaTermino.getDate() + diasTermino);

            const pagoAtrasado = Math.random() > 0.6;
            const diasAtraso = pagoAtrasado ? Math.floor(Math.random() * 45) + 5 : 0;

            casos.push({
                id: `CASO-${1000 + i}`,
                tipo: tipos[Math.floor(Math.random() * tipos.length)],
                cliente: clientes[Math.floor(Math.random() * clientes.length)],
                fechaIngreso: fechaIngreso.toISOString().split('T')[0],
                ultimaNoticia: ultimaNoticia.toISOString().split('T')[0],
                fechaTermino: fechaTermino.toISOString().split('T')[0],
                teamId: equipos[Math.floor(Math.random() * equipos.length)],
                diasAtrasoPago: diasAtraso,
                cumplimiento: Math.random() > 0.5 ? 'OK' : 'Pendiente'
            });
        }
        return casos;
    };
    const casos = generadorDeCasos();

    const firma = {
        personalFijo: [
            { id: "admin", rol: "_A. Administración", kpiLabel: "Gestión de Cobranza" },
            { id: "sup", rol: "_B. Supervisión", kpiLabel: "Cumplimiento de Términos" },
            { id: "ventas", rol: "_C. Ventas", kpiLabel: "Nuevos Asuntos" },
            { id: "dir", rol: "_D. Dirección", kpiLabel: "Supervisión General" },
        ],
        equipos: [
            { id: "unidad-1", nombre: "Equipo Hugo" },
            { id: "unidad-2", nombre: "Equipo Valeria" },
            { id: "unidad-3", nombre: "Equipo Emanuel" },
        ],
        costosFijos: [{ nombre: "Renta y Servicios", monto: 60000 }, {nombre: "Nómina Administrativa", monto: 32000}]
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
        supervisor: renderSupervisorView
    };

    renderView[userData.role]();

    // --- FUNCIONES DE RENDERIZADO DE VISTAS ---
    function renderDirectorView() {
        mainContent.innerHTML = `
            <div class="grid grid-cols-1 gap-8">
                <div>
                    <h2 class="text-2xl mb-4">Áreas de Soporte y Estrategia</h2>
                    <div id="areas-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"></div>
                </div>
                <div>
                    <h2 class="text-2xl mb-4">Equipos Operativos</h2>
                    <div id="equipos-container" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"></div>
                </div>
            </div>`;

        const areasContainer = document.getElementById("areas-container");
        const equiposContainer = document.getElementById("equipos-container");

        firma.personalFijo.forEach(area => {
            areasContainer.innerHTML += `<div data-id="${area.id}" class="card p-4 rounded-lg cursor-pointer"><h3 class="font-semibold text-lg">${area.rol}</h3><p class="text-sm text-gray-400">${area.kpiLabel}</p></div>`;
        });
        firma.equipos.forEach(equipo => {
            equiposContainer.innerHTML += `<div data-id="${equipo.id}" class="card p-4 rounded-lg cursor-pointer"><h3 class="font-semibold text-lg">${equipo.nombre}</h3><p class="text-sm text-gray-400">${casos.filter(c => c.teamId === equipo.id).length} casos activos</p></div>`;
        });
    }

    function renderAbogadoView(teamId) {
        const equipoNombre = firma.equipos.find(e => e.id === teamId)?.nombre || "Equipo Desconocido";
        const casosDelEquipo = casos.filter(caso => caso.teamId === teamId);

        let tableRows = casosDelEquipo.map(caso => `
            <tr>
                <td class="p-3">${caso.tipo}</td>
                <td class="p-3">${caso.cliente}</td>
                <td class="p-3">${caso.fechaIngreso}</td>
                <td class="p-3">${caso.ultimaNoticia}</td>
                <td class="p-3"><button data-caso-id="${caso.id}" class="text-blue-400 hover:text-blue-300 font-semibold">Solicitar Asesoría</button></td>
            </tr>
        `).join("");

        mainContent.innerHTML = `
            <h2 class="text-2xl mb-4">Mis Casos Asignados: ${equipoNombre}</h2>
            <div class="table-container">
                <table class="w-full text-sm">
                    <thead>
                        <tr><th class="p-3">Tipo de Asunto</th><th class="p-3">Cliente</th><th class="p-3">Fecha de Ingreso</th><th class="p-3">Última Noticia</th><th class="p-3">Acción</th></tr>
                    </thead>
                    <tbody>${tableRows.length > 0 ? tableRows : `<tr><td colspan="5" class="text-center p-4">No hay casos asignados a este equipo.</td></tr>`}</tbody>
                </table>
            </div>`;
    }

    function renderAdminView() {
        const casosOrdenados = [...casos].sort((a, b) => b.diasAtrasoPago - a.diasAtrasoPago);

        let tableRows = casosOrdenados.map(caso => `
             <tr class="${caso.diasAtrasoPago > 30 ? 'bg-red-900/40' : (caso.diasAtrasoPago > 0 ? 'bg-yellow-900/30' : '')}">
                <td class="p-3">${caso.cliente}</td>
                <td class="p-3 font-semibold ${caso.diasAtrasoPago > 0 ? 'text-red-400' : 'text-green-400'}">${caso.diasAtrasoPago > 0 ? `${caso.diasAtrasoPago} días de atraso` : 'Al corriente'}</td>
                <td class="p-3"><button data-cliente="${caso.cliente}" class="text-blue-400 hover:text-blue-300 font-semibold">Contactar Cliente</button></td>
            </tr>
        `).join("");

        mainContent.innerHTML = `
            <h2 class="text-2xl mb-4">Gestión de Cobranza</h2>
             <div class="table-container">
                <table class="w-full text-sm">
                    <thead><tr><th class="p-3">Cliente</th><th class="p-3">Estado de Pago</th><th class="p-3">Acción</th></tr></thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </div>`;
    }

    function renderSupervisorView() {
        const casosOrdenados = [...casos].sort((a, b) => new Date(a.fechaTermino) - new Date(b.fechaTermino));
        const hoy = new Date();
        hoy.setHours(0,0,0,0);

        let tableRows = casosOrdenados.map(caso => {
            const fechaTermino = new Date(caso.fechaTermino);
            let colorFila = '';
            if (fechaTermino < hoy) colorFila = 'bg-red-900/40';
            else if ((fechaTermino - hoy) / (1000 * 60 * 60 * 24) <= 7) colorFila = 'bg-yellow-900/30';

            return `
            <tr class="${colorFila}">
                <td class="p-3 font-semibold">${fechaTermino.toLocaleDateString()}</td>
                <td class="p-3">${caso.id}</td>
                <td class="p-3">${caso.cliente}</td>
                <td class="p-3">${caso.cumplimiento}</td>
                <td class="p-3"><button data-caso-id="${caso.id}" class="text-blue-400 hover:text-blue-300 font-semibold">Revisar Cumplimiento</button></td>
            </tr>
        `}).join("");

        mainContent.innerHTML = `
             <h2 class="text-2xl mb-4">Supervisión de Cumplimiento</h2>
             <div class="table-container">
                <table class="w-full text-sm">
                    <thead><tr><th class="p-3">Fecha Límite</th><th class="p-3">ID Caso</th><th class="p-3">Cliente</th><th class="p-3">Estado</th><th class="p-3">Acción</th></tr></thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </div>`;
    }

    // --- MANEJO DE EVENTOS Y MODALES ---
    const modalContainer = document.getElementById("modal-container");
    const modalPanel = document.getElementById("modal-panel");
    const modalContentBody = document.getElementById("modal-content-body");

    function openModal(content, size = 'lg') {
        modalPanel.className = `modal-content modal-${size}`;
        modalContentBody.innerHTML = content;
        modalContainer.style.display = "flex";
    }

    modalContainer.addEventListener("click", e => {
        if (e.target === modalContainer || e.target.closest(".close-button")) {
            modalContainer.style.display = "none";
        }
    });

    mainContent.addEventListener("click", e => {
        const card = e.target.closest(".card");
        if (card && userData.role === 'director') {
            const id = card.dataset.id;
            const equipo = firma.equipos.find(eq => eq.id === id);
            const area = firma.personalFijo.find(ar => ar.id === id);

            if (equipo) {
                const totalCostosEquipo = 16000; // Simulación
                const bonoEstimado = casos.filter(c => c.teamId === equipo.id).length * 250;
                openModal(`
                    <h2 class="text-2xl mb-4">${equipo.nombre}</h2>
                    <p><strong>Costo Base del Equipo:</strong> $${totalCostosEquipo.toLocaleString()}</p>
                    <p><strong>Bono Estimado por Asuntos:</strong> $${bonoEstimado.toLocaleString()}</p>
                    <hr class="my-4 border-gray-600">
                    <p class="text-lg"><strong>Costo Total Estimado:</strong> $${(totalCostosEquipo + bonoEstimado).toLocaleString()}</p>
                `, 'lg');
            } else if (area && area.id === 'dir') {
                 const totalCostos = firma.costosFijos.reduce((acc, costo) => acc + costo.monto, 0);
                 const costosHTML = firma.costosFijos.map(c => `<li class="flex justify-between"><span>${c.nombre}:</span> <span>$${c.monto.toLocaleString()}</span></li>`).join("");
                 openModal(`
                    <h2 class="text-2xl mb-4">Detalle de Costos Fijos</h2>
                    <ul class="space-y-2">${costosHTML}</ul>
                    <hr class="my-4 border-gray-600">
                    <p class="text-lg flex justify-between"><strong>Total:</strong> <strong>$${totalCostos.toLocaleString()}</strong></p>
                 `, 'lg');
            } else if (area) {
                 openModal(`<h2 class="text-2xl mb-4">Detalles de ${
