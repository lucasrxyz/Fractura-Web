 // Sons
  const hoverSound = new Audio("assets/UI SFX/hover.mp3");
  const confirmSound = new Audio("assets/UI SFX/confirm.mp3");
  
  function loadGame() {
    confirmSound.play(); // son au clic
    alert("Chargement de la sauvegarde...");
  }

  function newGame() {
    confirmSound.play(); // son au clic
    const overlay = document.getElementById("fadeOutOverlay");
    overlay.classList.add("active");
    setTimeout(() => {
      window.location.href = "html utilitaire/loading.html";
    }, 1000);
  }

  function options() {
    confirmSound.play(); // son au clic
    alert("Options en développement...");
  }

  const buttons = [
    {btnId: "btnplay", default: "assets/UI/play.png", hover: "assets/UI/play_hover.png"},
    {btnId: "NewGame", default: "assets/UI/charger.png", hover: "assets/UI/charger_hover.png"},
    {btnId: "Settings", default: "assets/UI/reglages.png", hover: "assets/UI/reglages_hover.png"}
  ];

  buttons.forEach(item => {
    const btn = document.getElementById(item.btnId);
    const img = btn.querySelector("img");

    // Hover
    btn.addEventListener("mouseenter", () => {
      img.src = item.hover;
      hoverSound.currentTime = 0; // reset pour rejouer depuis le début
      hoverSound.play();
    });

    btn.addEventListener("mouseleave", () => {
      img.src = item.default;
    });

    // Clic (sécurité si jamais on oublie d’appeler confirmSound ailleurs)
    btn.addEventListener("click", () => {
      confirmSound.currentTime = 0;
      confirmSound.play();
    });
  });

  // Initial setup
  const fadeOverlay = document.getElementById("fadeOverlay");
  const logo = document.querySelector(".flogo");
  const buttonsList = document.querySelectorAll(".btnplay");

  document.addEventListener("keydown", startGame, { once: true });

  function startGame() {
    fadeOverlay.classList.remove("active");
    fadeOverlay.addEventListener("transitionend", animateElements, { once: true });
  }

  function animateElements() {
    logo.classList.add("appear");
    setTimeout(() => {
      buttonsList[0].classList.add("appear");
    }, 150);
    setTimeout(() => {
      buttonsList[1].classList.add("appear");
    }, 300);
    setTimeout(() => {
      buttonsList[2].classList.add("appear");
    }, 450);
  }