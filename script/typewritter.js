const dialogueBox = document.getElementById("dialogue");
const arrow = document.querySelector(".arrow");

//sfx
const arrowClick = new Audio("../assets/UI SFX/comeback.mp3");
const hoverSound = new Audio("../assets/UI SFX/hover.mp3");
const confirmSound = new Audio("../assets/UI SFX/confirm.mp3");

const dialogues = [
  `Il y a plus d'une décennie, le monde était uni par le Cristal-Monde, une pierre d'énergie infinie.</br>
   Mais lors de la <span style="color:#3498db;">Grande Rupture</span>, le <span style="color:#9b59b6;">Grand crystal éthérée</span> se brisa...</br>`,
  `Depuis, les terres flottent, les royaumes s'effondrent, et les hommes essaient de survivre dans un monde instable, forgeant de nouvelles sciences et de nouvelles croyances.`,
  `Certains se tournent vers les <span style="color:#1abc9c;">Arcanes</span> pour plier la réalité, d'autres embrassent la force de la <span style="color:#2ecc71;">nature instable</span>, et d'autres encore façonnent le métal et la vapeur comme de véritables <span style="color:#e74c3c;">techniciens forgerons</span>.`,
  `<span style="color:#f1c40f;">Et toi… quelle voie suivras-tu, dans ce monde fracturé ?</span>`
];

const roleRow = document.getElementById("roleSelection");
let roleChosen = null;
let currentDialogue = 2;
let typing = false;

let gameData = JSON.parse(localStorage.getItem("gameData") || "{}");

function saveGame() {
    localStorage.setItem("gameData", JSON.stringify(gameData));
    console.log("Jeu sauvegardé :", gameData);
}

function loadGame() {
    gameData = JSON.parse(localStorage.getItem("gameData") || "{}");
    if (gameData.role) {
        console.log("Rôle précédemment choisi :", gameData.role);
    }
}

function showRolesAfterDelay() {
    setTimeout(() => {
        roleRow.style.display = "flex";
    }, 600);
}

function typeWriterEffect(text, callback) {
    dialogueBox.innerHTML = "";
    let i = 0;
    typing = true;
    let openTags = [];

    function type() {
        if (i < text.length) {
            if (text[i] === "<") {
                let closingIndex = text.indexOf(">", i);
                let tag = text.slice(i, closingIndex + 1);
                dialogueBox.innerHTML += tag;
                if (tag.startsWith("</")) openTags.pop();
                else if (!tag.endsWith("/>")) {
                    let tagName = tag.match(/<\s*([a-z0-9]+)/i)[1];
                    openTags.push(tagName);
                }
                i = closingIndex + 1;
            } else {
                if (openTags.length > 0) {
                    let lastChild = dialogueBox.lastChild;
                    if (lastChild && lastChild.tagName) lastChild.innerHTML += text[i];
                    else dialogueBox.innerHTML += text[i];
                } else {
                    dialogueBox.innerHTML += text[i];
                }
                i++;
            }
            setTimeout(type, 30);
        } else {
            typing = false;
            if (callback) callback();
            if (currentDialogue === dialogues.length - 1) {
                showRolesAfterDelay();
            }
        }
    }
    type();
}

// Clic sur un rôle + Hover
roleRow.querySelectorAll("img").forEach(img => {
    // Hover (sfx)
    img.addEventListener("mouseenter", () => {
        hoverSound.currentTime = 0; // remet au début pour rejouer à chaque survol
        hoverSound.play();
    });

    // Clic (sélection du rôle)
    img.addEventListener("click", () => {
        roleRow.querySelectorAll("img").forEach(i => i.style.border = "none");
        
        confirmSound.currentTime = 0;
        confirmSound.play();

        roleChosen = img.alt;
        gameData.role = roleChosen;        // sauvegarde le rôle
        gameData.roleChosen = true;        // marque que l'étape est complétée
        saveGame();

        setTimeout(() => 1000);

        // Redirection vers la page loading.html
        window.location.href = "../html utilitaire/loading.html";
    });
});


window.addEventListener('load', () => {
    loadGame();
    typeWriterEffect(dialogues[currentDialogue]);

    setTimeout(() => {
        arrow.style.opacity = '1';
        arrow.classList.add('wiggle');
    }, 9000);
});

arrow.addEventListener('click', () => {
    if (typing) return;
    if (currentDialogue < dialogues.length - 1) {
        currentDialogue++;
        arrowClick.play();
        typeWriterEffect(dialogues[currentDialogue]);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Enter" && arrow.style.opacity === "1") {
        arrow.click();
        arrowClick.play(); //sfx
    }
});
