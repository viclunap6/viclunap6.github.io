// Abrir/Cerrar modales
const aboutModal = document.getElementById('about-modal');
const appointmentModal = document.getElementById('appointment-modal');
const openAboutModal = document.getElementById('open-about-modal');
const openAppointmentModal = document.getElementById('open-appointment-modal');
const closeModals = document.querySelectorAll('.close-modal');

openAboutModal.addEventListener('click', () => {
    aboutModal.style.display = 'block';
});

openAppointmentModal.addEventListener('click', () => {
    appointmentModal.style.display = 'block';
});

closeModals.forEach(btn => {
    btn.addEventListener('click', () => {
        aboutModal.style.display = 'none';
        appointmentModal.style.display = 'none';
    });
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === aboutModal) aboutModal.style.display = 'none';
    if (e.target === appointmentModal) appointmentModal.style.display = 'none';
});

// Menú hamburguesa (para móviles)
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});