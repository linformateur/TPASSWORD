// Fonction pour afficher/cacher les réponses
function toggleAnswer(id) {
    var x = document.getElementById(id);
    x.classList.toggle("active");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
