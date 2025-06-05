"use strict";

document.getElementById("formulaire").addEventListener("submit", formulaire);

/**
 * @param {Event} event L'événement de soumission du formulaire.
 */
function formulaire(event) {
    event.preventDefault();
    // @ts-ignore
    const fd = new FormData(event.target);
    // @ts-ignore
    targetWord = fd.get("mot").toUpperCase();
    if (!dict.length) {
        throw Error("Dictionnaire non chargé.");
    } else if (dict.includes(targetWord)) {
        document.getElementById("grid-item2").style.display = "none";
        initGame(gameEl, Number(fd.get("tentatives")), targetWord);
        createKeyboard();
        console.log(targetWord);
    } else {
        console.log(`Le mot suivant n'existe pas : ${targetWord}`);
        // eslint-disable-next-line no-alert
        alert("Ce mot ne se trouve pas dans le dictionnaire");
    }
}

document.getElementById("btn4").addEventListener("click", random);
/**
 * Sélectionne un mot au hasard à partir du dictionnaire et remplace le contenu
 * de l'input par le mot tiré.
 */
function random() {
    if (!dict.length) {
        throw Error("Dictionnaire non chargé.");
    } else {
        const randomIndex = Math.floor(Math.random() * dict.length);
        // @ts-ignore
        document.getElementById("word").value = dict[randomIndex];
    }
}
