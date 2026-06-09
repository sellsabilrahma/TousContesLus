let dropdownBtn = document.getElementById("drop-text");
let list = document.getElementById("list");
let icon = document.getElementById("icon");
let span = document.getElementById("span");
let input = document.getElementById("search-input");
let listItems = document.querySelectorAll(".dropdown-list-item");

// Variable globale pour stocker le filtre actif (par défaut : ALL)
let currentFilter = "ALL";

// Exemple de données 
//const books = [
   // { title: "Le Petit Prince", category: "Contes" },
   // { title: "L'Étranger", category: "Romans" },
  //  { title: "Béni ou le Paradis Privé", category: "Romans" },
   // { title: "Manuel d'Arabe", category: "Langues" },
   // { title: "Mathématiques Terminale", category: "Scolaire" }
//];

// 1. Gestion de l'ouverture/fermeture du menu
dropdownBtn.onclick = function(e){
    e.stopPropagation(); // Empêche window.onclick de se déclencher immédiatement
    if(list.classList.contains("list-show")) {
        icon.style.rotate = "0deg";
    } else {
        icon.style.rotate = "-180deg";
    }
    list.classList.toggle("list-show");
};

// 2. Gestion du clic sur les éléments du filtre
listItems.forEach(item => {
    item.onclick = function() {
        currentFilter = this.textContent.trim(); // Récupère le texte (ex: "Romans")
        span.textContent = currentFilter; // Change le texte du bouton principal
        
        // Ferme le menu proprement
        list.classList.remove("list-show");
        icon.style.rotate = "0deg";
        
        // Lance la recherche filtrée
        filterBooks();
    };
});

// 3. Fermer le menu si on clique n'importe où ailleurs sur la page
window.onclick = function (e) {
    if (!dropdownBtn.contains(e.target) && !list.contains(e.target)) {
        list.classList.remove("list-show");
        icon.style.rotate = "0deg";
    }
};

// 4. Gestion de la saisie au clavier dans la barre de recherche
input.oninput = function() {
    filterBooks();
};

// 5. Fonction principale de filtrage et d'affichage
function filterBooks() {
    let searchText = input.value.toLowerCase();
    
    // Filtre les livres selon le texte ET la catégorie sélectionnée
    let filtered = books.filter(book => {
        let matchesCategory = (currentFilter === "ALL" || book.category === currentFilter);
        let matchesText = book.title.toLowerCase().includes(searchText);
        return matchesCategory && matchesText;
    });

    displayResults(filtered);
}

// 6. Injection des résultats dans le HTML
function displayResults(results) {
    let container = document.getElementById("results-container");
    container.innerHTML = ""; // Vide la zone de résultats précédente

    if(results.length === 0) {
        container.innerHTML = "<p class='no-result'>Aucun livre trouvé</p>";
        return;
    }

    results.forEach(book => {
        let bookDiv = document.createElement("div");
        bookDiv.className = "book-card";
        bookDiv.innerHTML = `<h3>${book.title}</h3><p>Catégorie : ${book.category}</p>`;
        container.appendChild(bookDiv);
    });
}

// Optionnel : Afficher tous les livres dès le chargement de la page
filterBooks();
