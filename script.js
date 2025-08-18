document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal-nosotros");
  const nosotrosLink = document.getElementById("nosotros-link");
  const footerNosotrosLink = document.getElementById("footer-nosotros-link");
  const closeButton = document.querySelector(".close-button");

  function openModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  nosotrosLink.addEventListener("click", function (event) {
    event.preventDefault();
    openModal();
  });

  footerNosotrosLink.addEventListener("click", function (event) {
    event.preventDefault();
    openModal();
  });

  closeButton.addEventListener("click", closeModal);

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});
