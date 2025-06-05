"use strict";

/**
 * Affiche la modale 1 et son container.
 */
function showModal() {
    document.getElementById("mod1").style.visibility = "visible";
    document.getElementById("container").style.visibility = "visible";
}
/**
 * Cache la modale 1 et son container.
 */
function hideModal() {
    document.getElementById("mod1").style.visibility = "hidden";
    document.getElementById("container").style.visibility = "hidden";
    return 1;
}

/**
 * Affiche la modale 2 et son container.
 */
function showModal2() {
    document.getElementById("mod2").style.visibility = "visible";
    document.getElementById("container2").style.visibility = "visible";
    document.getElementById("raté").textContent = `Vous avez raté ! Le mot était ${targetWord}`;
}

/**
 * Cache la modale 2 et son container.
 */
function hideModal2() {
    document.getElementById("mod2").style.visibility = "hidden";
    document.getElementById("container2").style.visibility = "hidden";
}

/**
 * Si on clique sur un bouton, on cache la modale a laquelle il est relié.
 */
const btn1 = document.getElementById("btn1");
btn1.addEventListener("click", hideModal);
const btn2 = document.getElementById("btn2");
btn2.addEventListener("click", hideModal2);
/**
 * Si on clique sur la croix, on cache la modale.
 */
document.getElementById("croix").addEventListener("click", hideModal);
document.getElementById("croix2").addEventListener("click", hideModal2);

/**
 * Fonction qui permet de cacher les modales et leur container
 * si on clique en dehors de la modale qui est affiché.
 * @param {Event} event L'evenement de clic.
 */
function handleBackdropClick(event) {
    if (event.currentTarget === event.target) {
        hideModal();
        hideModal2();
    }
}
/**
 * Si on clique en dehors des modales elles disparaissent.
 */
document.querySelector(".modal").addEventListener("click", handleBackdropClick);
document.querySelector("#container2").addEventListener("click", handleBackdropClick);
