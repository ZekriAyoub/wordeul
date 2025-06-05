"use strict";

// eslint-disable-next-line prefer-const
let end = false;

const keyboard = [
    "AZERTYUIOP".split(""),
    "QSDFGHJKLM".split(""),
    ["ENTER", ..."WXCVBN".split(""), "BACKSPACE"],
];

/**
 * Fonction qui ajoute les lettres entrées dans le keyboard sur la grille de jeu
 * sauf si la partie est end.
 * @param {Event} e event
 */
function keyboardSetLetter(e) {
    if (!end) {
        // @ts-ignore
        const lettre = e.getAttribute("value");
        keyUpHandler(lettre);
    }
}

/**
 * Crée le clavier virtuel.
 */
function createKeyboard() {
    for (let i = 0; i < 3; i++) {
        const newlg = document.createElement("div");
        newlg.classList.add("lg");
        document.getElementById("clavier").append(newlg);
        for (let j = 0; j < keyboard[i].length; j++) {
            const key = document.createElement("button");
            key.classList.add("key");
            newlg.append(key);
            key.value = keyboard[i][j];
            key.textContent = keyboard[i][j];
            key.setAttribute("onclick", "keyboardSetLetter(this)");
            if (key.textContent === "ENTER") {
                key.textContent = String.fromCodePoint(9166);
                key.id = "enter";
            } else if (key.textContent === "BACKSPACE") {
                key.textContent = String.fromCodePoint(9003);
                key.id = "backspace";
            }
        }
    }
}

/**
 * Fonction qui ajoute les classes présent, absent et correct aux touches du clavier virtuel.
 */

function addClassToKeyboard() {
    for (let cpt = 0; cpt < targetWord.length; cpt++) {
        for (let i = 0; i < 3; i++) {
            const classeLettre = gameEl.children[currentRowIndex].children[cpt].classList.value;
            for (let j = 0; j < keyboard[i].length; j++) {
                if (classeLettre === "tile correct" && keyboard[i][j] === gameEl.children[currentRowIndex].children[cpt].textContent) {
                    document.querySelector("#clavier").children[i].children[j].classList.add("correcto");
                } else if (classeLettre === "tile present" && keyboard[i][j] === gameEl.children[currentRowIndex].children[cpt].textContent) {
                    document.querySelector("#clavier").children[i].children[j].classList.add("presento");
                } else if (classeLettre === "tile absent" && keyboard[i][j] === gameEl.children[currentRowIndex].children[cpt].textContent) {
                    document.querySelector("#clavier").children[i].children[j].classList.add("absento");
                }
            }
        }
    }
}
