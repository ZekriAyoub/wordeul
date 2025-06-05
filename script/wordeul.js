"use strict";

const gameEl = document.getElementById("game");

/**
 * Fonction qui modifie la lettre à la position spécifiée.
 * @param {number} row numero de ligne.
 * @param {number} tile numero de tuile.
 * @param {string} lettre lettre à placer.
 */
function setLetter(row, tile, lettre) {
    const enfant = gameEl.children[row].children[tile];
    enfant.textContent = lettre;
}
// TEST FONCTION setLetter: setLetter(1,4,"U");

let currentRowIndex = 0;
let currentTileIndex = 0;
// eslint-disable-next-line init-declarations
let targetWord;
let compteur = 0;
/**
 * Cette fonction permet de modifier la grille de jeu selon la touche pressée.
 * @param {string} lettre La touche du clavier qui est relachée.
 */
function keyUpHandler(lettre) {
    const alphabet = /^[A-Z]$/;
    if (alphabet.test(lettre) && currentRowIndex < countRows() && currentTileIndex < targetWord.length) {
        setLetter(currentRowIndex, currentTileIndex, lettre);
        currentTileIndex++;
    } else if (currentTileIndex === targetWord.length && lettre === "ENTER") {
        const positions = Array(targetWord.length).fill(0);
        const tabWord = targetWord.split("");
        const encodage = [];
        for (let i = 0; i < targetWord.length; i++) {
            encodage.push(gameEl.children[currentRowIndex].children[i].textContent);
        }
        if (!dict.length) {
            throw Error("Dictionnaire non chargé.");
        } else if (!dict.includes(String(encodage.join("")))) {
            for (let i = targetWord.length - 1; i >= 0; i--) {
                setLetter(currentRowIndex, i, " ");
            }
            console.log(`Le mot suivant n'existe pas : ${String(encodage.join(""))}`);
            gameEl.style.animationName = "horizontal-shaking";
            gameEl.addEventListener("animationend", function () {
                gameEl.style.animationName = "none";
            });
            currentTileIndex = 0;
        } else {
            wellPlaced(encodage, tabWord, positions);
            badlyPlaced(encodage, tabWord, positions);
            addClassToKeyboard();
            compteur++;
            if (reussi(positions)) {
                showModal();
                document.removeEventListener("keyup", keyActive);
                end = true;
            } else if (rater(compteur)) {
                showModal2();
                document.removeEventListener("keyup", keyActive);
                end = true;
            }
            currentRowIndex++;
            currentTileIndex = 0;
        }
    } else if (lettre === "BACKSPACE" && currentTileIndex > 0) {
        currentTileIndex--;
        setLetter(currentRowIndex, currentTileIndex, "");
    }
}

/**
 * Fonction qui gère l'activation d'une touche.
 * @param {KeyboardEvent} e L'événement de clavier associé à l'activation de la touche.
 */
function keyActive(e) {
    keyUpHandler(e.key.toUpperCase());
}

/**
 * Determine quelles lettres sont bien placées.
 * @param {Array<string>} encodage tableau des lettres placées sur la ligne courante.
 * @param {Array<string>} tabWord tableau contenant les lettres du mot à deviner.
 * @param {Array<number>} positions tableau d'entiers servant de repère.
 */
function wellPlaced(encodage, tabWord, positions) {
    for (let i = 0; i < targetWord.length; i++) {
        if (encodage[i] === tabWord[i] && positions[i] === 0) {
            gameEl.children[currentRowIndex].children[i].classList.add("correct");
            positions[i] = 2;
        }
    }
}

/**
 * Determine quelles lettres sont présentes mais
 * mal placées ou absentes.
 * @param {Array<string>} encodage tableau des lettres placées sur la ligne courante.
 * @param {Array<string>} tabWord tableau contenant les lettres du mot à deviner.
 * @param {Array<number>} positions tableau d'entiers servant de repère.
 */
function badlyPlaced(encodage, tabWord, positions) {
    for (let i = 0; i < targetWord.length; i++) {
        if (encodage[i] !== tabWord[i]) {
            for (let j = 0; j < targetWord.length; j++) {
                if (positions[j] === 0 && encodage[i] === tabWord[j]) {
                    positions[j] = 1;
                    gameEl.children[currentRowIndex].children[i].classList.add("present");
                    break;
                }
            }
        }
    }
    for (let i = 0; i < targetWord.length; i++) {
        if (gameEl.children[currentRowIndex].children[i].classList.value === "tile") {
            gameEl.children[currentRowIndex].children[i].classList.add("absent");
        }
    }
}
/**
 * Determine si le joueur a réussi c'est-à-dire si toutes les cases
 * contiennent la bonne lettre.
 * @param {Array<number>} positions tableau d'entiers.
 * @returns {boolean} retourne vrai si toutes les cases contiennent la bonne lettre.
 */
function reussi(positions) {
    let cpt = 0;
    for (const b of positions) {
        if (b === 2) {
            cpt++;
        }
    }
    return cpt === positions.length;
}
/**
 * Determine si le joueur a rater: il a donc tenté n fois mais a échoué.
 * @param {number} cpt nombre de tentatives actuelles.
 * @returns {boolean}
 */
function rater(cpt) {
    return cpt === countRows();
}
/**
 * Compte les lignes (les tentatives) de la grille.
 * @returns {number} renvoie le nombre de lignes.
 */
function countRows() {
    const rows = gameEl.querySelectorAll(".row");
    return rows.length;
}

/**
 * Créer la grille de jeu selon la longueur du mot.
 * @param {HTMLElement} grille La section qui contient la grille de jeu.
 * @param {number} row le nombre de tentatives autorisées.
 * @param {number} col le nombre de lettres que contient le mot à deviner.
 */
function createGrid(grille, row, col) {
    for (let j = 0; j < row; j++) {
        const divRow = document.createElement("div");
        grille.append(divRow);
        divRow.classList.add("row");
        for (let i = 0; i < col; i++) {
            const divCol = document.createElement("div");
            divCol.classList.add("tile");
            divRow.append(divCol);
        }
    }
}

/**
 * Appelle la fonction createGrid et rend visible la grille de jeu.
 * @param {HTMLElement} grille Grille de jeu.
 * @param {number} tentatives Nombre de lignes(tentatives).
 * @param {string} motCible Mot à deviner.
 */
function initGame(grille, tentatives, motCible) {
    createGrid(grille, tentatives, motCible.length);
    gameEl.style.visibility = "visible";
    document.getElementById("grid-item1").style.gridArea = "right";
    document.addEventListener("keyup", keyActive);
}
