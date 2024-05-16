let mdp = "";

const Plage_longueur = document.getElementById("Plage_longueur");
const Longueur_choisie = document.getElementById("Longueur_choisie");

Plage_longueur.addEventListener("input", function () {
    Longueur_choisie.value = Plage_longueur.value;
});

document.getElementById("Mdp_genere").addEventListener("click", function () {
    if (!document.getElementById("specials").checked &&
        !document.getElementById("chiffres").checked &&
        !document.getElementById("lettres").checked) {
        alert("Veuillez cocher au moins un critère.");
        return;
    }

    const specials = "!@#$%^&*";
    const chiffres = "0123456789";
    const lettres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let choix_caracteres = "";
    if (document.getElementById("specials").checked) {
        choix_caracteres += specials;
    }
    if (document.getElementById("chiffres").checked) {
        choix_caracteres += chiffres;
    }
    if (document.getElementById("lettres").checked) {
        choix_caracteres += lettres;
    }

    const Longueur_mdp = Plage_longueur.value;

    mdp = "";
    for (let i = 0; i < Longueur_mdp; i++) {
        const indexaleatoire = Math.floor(Math.random() * choix_caracteres.length);
        mdp += choix_caracteres.charAt(indexaleatoire);
    }

    let robustesse = "Faible";
    if ((mdp.length >= 8 && /[A-Z]/.test(mdp) && /[a-z]/.test(mdp) && /[0-9]/.test(mdp) && /[!@#$%^&*]/.test(mdp)) || mdp.length >= 18) {
        robustesse = "Fort";
    } else if (mdp.length >= 12) {
        robustesse = "Moyen";
    }

    const criteresDiv = document.querySelector('.criteres');
    criteresDiv.className = 'criteres ' + robustesse;

    document.getElementById("Sortie").textContent = "Mot de passe généré : " + mdp + " (Robustesse : " + robustesse + ")";
});

function copyPassword() {
    navigator.clipboard.writeText(mdp)
        .then(function () {
            alert("Mot de passe copié : " + mdp);
        })
        .catch(function (err) {
            console.error('Erreur lors de la copie du mot de passe : ', err);
        });
}
