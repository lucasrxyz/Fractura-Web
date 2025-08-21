window.addEventListener('load', () => {
    const arrow = document.querySelector('.arrow');

    // 7000 ms = 7 secondes
    setTimeout(() => {
        arrow.style.opacity = '1';       // apparition instantanée
        arrow.classList.add('wiggle');   // lancer l'animation wiggle
    }, 5600);
});
