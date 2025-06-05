"use strict";

// eslint-disable-next-line
let dict = [];

/**
 * @param {number} length entre 6 et 10
 * @param {string} firstLetter entre A et Z
 */
async function _getDict(length, firstLetter = null) {
    const project = "https://git.esi-bru.be/api/v4/projects/51440";
    const file = firstLetter ? `${length}.${firstLetter}` : `${length}`;
    return fetch(`${project}/repository/files/${file}/raw`)
        .then((r) => {
            if (!r.ok) {
                throw Error(`Code d'erreur du serveur ${r.status}`);
            }
            return r.text();
        })
        .then((r) => r.split("\n"))
        .catch((error) => console.error("Erreur pour rÃ©cupÃ©rer le dictionnaire."));
}

for (let i = 6; i < 11; i++) {
    // eslint-disable-next-line no-loop-func
    _getDict(i).then((result) => {
        // @ts-ignore
        dict = [...dict, ...result];
        console.log(`dictionnaire des mots de longueur ${i} est ok`);
    });
}
