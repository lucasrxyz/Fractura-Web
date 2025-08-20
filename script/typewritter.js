const textContainer = document.getElementById('dialogue');
const fullText = textContainer.innerHTML;
textContainer.innerHTML = ''; // vide le texte

let i = 0;
let output = '';
let insideTag = false;
let tagBuffer = '';
let spanStack = [];

function typeWriterHTML() {
    if (i < fullText.length) {
        let char = fullText[i];

        if (char === '<') { // début d'une balise
            insideTag = true;
            tagBuffer += char;
        } else if (char === '>' && insideTag) { // fin de la balise
            tagBuffer += char;
            if (tagBuffer.startsWith('</span')) {
                spanStack.pop(); // on ferme le span courant
            } else if (tagBuffer.startsWith('<span')) {
                spanStack.push(tagBuffer); // on ouvre un nouveau span
            }
            output += tagBuffer;
            tagBuffer = '';
            insideTag = false;
        } else if (insideTag) {
            tagBuffer += char; // on est à l'intérieur d'une balise
        } else {
            output += char;
        }

        textContainer.innerHTML = output;
        i++;
        setTimeout(typeWriterHTML, 30);
    }
}

setTimeout(typeWriterHTML, 1000);