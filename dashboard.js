document.addEventListener("DOMContentLoaded", () => {
  // --- SIMULACIÓN DE BASE DE DATOS ---
  const generadorDeCasos = () => {
    // ... (Esta función crea datos de ejemplo para los casos)
  };
  const casos = generadorDeCasos();

  const firma = {
    // ... (Datos de la firma sin cambios)
  };

  // --- AUTENTICACIÓN Y RENDERIZADO INICIAL ---
  const userData = JSON.parse(localStorage.getItem("LCHA_user"));
  if (!userData) {
    window.location.href = "index.html";
    return;
  }

  const mainContent = document.getElementById("main-content");
  const userInfo = document.getElementById("user-info");
  userInfo.innerHTML = `<p class="font-semibold">${userData.name}</p><p class="text-sm text-gray-400">${userData.role}</p>`;

  // --- ROUTER DE VISTAS ---
  switch (userData.role) {
    case "director":
      renderDirectorView();
      break;
    case "abogado":
      renderAbogadoView(userData.teamId);
      break;
    case "admin":
      renderAdminView();
      break;
    case "supervisor":
      renderSupervisorView();
      break;
    default:
      mainContent.innerHTML = `<p>Rol no reconocido.</p>`;
  }

  // --- FUNCIONES DE RENDERIZADO DE VISTAS ---
  function renderDirectorView() {
    // ... (Crea las tarjetas de áreas y equipos como antes, pero sin mostrar costos fijos)
  }

  function renderAbogadoView(teamId) {
    // ... (Crea una tabla con los casos filtrados por teamId y la añade al mainContent)
  }

  function renderAdminView() {
    // ... (Crea una tabla con todos los casos, ordenados por estado de pago)
  }

  function renderSupervisorView() {
    // ... (Crea una tabla con todos los casos, ordenados por fecha de término)
  }

  // --- LÓGICA DE MODALES (Adaptada para roles) ---
  function openModal(type, data) {
    const modalContent = document.getElementById("modal-content");
    // ... (El contenido del modal ahora depende del ROL del usuario y del tipo de modal)
  }
});
