function evaluerMotDePasse() {
  const motDePasse = document.getElementById('password').value;

  // Longueur du mot de passe
  const longueur = motDePasse.length;

  // Complexité en se basant sur le type de caractères utilisés
  const complexite = calculerComplexite(motDePasse);

  // Calcul de la robustesse en pourcentage
  const tempsEstime = calculerTempsEstime(longueur, complexite);
  const robustesse = calculerRobustesse(tempsEstime);

  // Arrondir le temps estimé en jours à l'entier le plus proche
  const tempsEstimeEnJoursArrondi = Math.round(tempsEstime / (1000 * 60 * 60 * 24));

  return {
    robustesse: Math.min(robustesse, 100).toFixed(2), // La robustesse ne peut pas dépasser 100%
    tempsEstime: tempsEstime,
    tempsEstimeEnJours: tempsEstimeEnJoursArrondi,
    couleur: getColorForRobustness(robustesse)
  };
}

function calculerComplexite(motDePasse) {
  const majuscules = /[A-Z]/g;
  const minuscules = /[a-z]/g;
  const nombres = /[0-9]/g;
  const speciaux = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  let scoreComplexite = 0;

  // Vérification des majuscules, minuscules, chiffres et caractères spéciaux
  if (motDePasse.match(majuscules)) scoreComplexite += 0.25;
  if (motDePasse.match(minuscules)) scoreComplexite += 0.25;
  if (motDePasse.match(nombres)) scoreComplexite += 0.25;
  if (motDePasse.match(speciaux)) scoreComplexite += 0.5; // Caractères spéciaux sont considérés plus complexes

  return scoreComplexite;
}

function calculerTempsEstime(longueur, complexite) {
  // Temps estimé pour pirater en se basant sur la capacité d'un ordinateur
  // Formule simplifiée, à adapter en fonction de la puissance de l'ordinateur
  const tempsEstime = Math.pow(10, longueur + complexite);

  return tempsEstime;
}

function calculerRobustesse(tempsEstime) {
  // Arbitrairement ajusté pour mieux correspondre à la réalité
  const MAX_TEMPS_ESTIME = Math.pow(10, 10); // Maximum de temps estimé, par exemple 10^10

  // Calcul de la robustesse en pourcentage
  return Math.min(100, (tempsEstime / MAX_TEMPS_ESTIME) * 100); // La robustesse ne peut pas dépasser 100%
}

function getColorForRobustness(robustesse) {
  if (robustesse <= 20) {
    return 'red';
  } else if (robustesse <= 40) {
    return 'orange';
  } else if (robustesse <= 60) {
    return 'yellow';
  } else if (robustesse <= 80) {
    return 'greenyellow';
  } else {
    return 'green';
  }
}

const passwordInput = document.getElementById('password');
const resultElement = document.getElementById('result');

passwordInput.addEventListener('input', () => {
  const evaluation = evaluerMotDePasse();

  const tempsEstimeEnSecondes = evaluation.tempsEstime / 1000;
  const tempsEstimeEnMinutes = tempsEstimeEnSecondes / 60;
  const tempsEstimeEnHeures = tempsEstimeEnMinutes / 60;
  const tempsEstimeEnJours = tempsEstimeEnHeures / 24;
  const tempsEstimeEnMois = tempsEstimeEnJours / 30; // Estimation approximative d'un mois
  const tempsEstimeEnAnnees = tempsEstimeEnMois / 12; // Estimation approximative d'une année

  let tempsEstimeAffichage;

  if (tempsEstimeEnAnnees >= 1) {
    tempsEstimeAffichage = `environ ${Math.round(tempsEstimeEnAnnees)} an${tempsEstimeEnAnnees >= 2 ? 's' : ''}`;
  } else if (tempsEstimeEnMois >= 1) {
    tempsEstimeAffichage = `environ ${Math.round(tempsEstimeEnMois)} mois`;
  } else if (tempsEstimeEnJours >= 1) {
    tempsEstimeAffichage = `environ ${Math.round(tempsEstimeEnJours)} jour${tempsEstimeEnJours >= 2 ? 's' : ''}`;
  } else if (tempsEstimeEnHeures >= 1) {
    tempsEstimeAffichage = `environ ${Math.round(tempsEstimeEnHeures)} heure${tempsEstimeEnHeures >= 2 ? 's' : ''}`;
  } else if (tempsEstimeEnMinutes >= 1) {
    tempsEstimeAffichage = `environ ${Math.round(tempsEstimeEnMinutes)} minute${tempsEstimeEnMinutes >= 2 ? 's' : ''}`;
  } else {
    tempsEstimeAffichage = `environ ${Math.round(tempsEstimeEnSecondes)} seconde${tempsEstimeEnSecondes >= 2 ? 's' : ''}`;
  }

  // Mettez à jour les éléments HTML correspondants
  resultElement.innerHTML = `
    Robustesse du mot de passe : <span style="color: ${evaluation.couleur}; font-weight: bold;">${evaluation.robustesse}%</span>
    <br>
    Temps estimé pour pirater : ${tempsEstimeAffichage}`;
});
