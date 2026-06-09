// 1. Sélection des éléments HTML
const dropdownBtn = document.getElementById("drop-text");
const list = document.getElementById("list");
const icon = document.getElementById("icon");
const span = document.getElementById("span");
const input = document.getElementById("search-input");
const listItems = document.querySelectorAll(".dropdown-list-item");
const container = document.getElementById("results-container");

// 2. Variables d'état globales
let currentFilter = "ALL";
let books = []; // Contiendra les données chargées depuis le JSON

// 3. Chargement asynchrone des données du fichier JSON
async function loadBooksData() {
    try {
        const response = await fetch("books.json"); 
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }
        books = await response.json(); 
        filterBooks(); // Affiche tous les livres au premier chargement
    } catch (error) {
        console.error("Impossible de charger les livres :", error);
        container.innerHTML = "<p class='error'>Erreur lors du chargement des livres.</p>";
    }
}

// 4. Gestion de l'ouverture / fermeture du menu déroulant
dropdownBtn.onclick = function(e) {
    e.stopPropagation(); // Empêche la fermeture immédiate via window.onclick
    
    if (list.classList.contains("list-show")) {
        icon.style.rotate = "0deg";
    } else {
        icon.style.rotate = "-180deg";
    }
    list.classList.toggle("list-show");
};

// 5. Gestion de la sélection d'un filtre dans la liste
listItems.forEach(item => {
    item.onclick = function() {
        currentFilter = this.textContent.trim(); // Récupère le nom du filtre (ex: "Romans")
        span.textContent = currentFilter;        // Met à jour le texte affiché dans le bouton
        
        // Ferme proprement le menu déroulant
        list.classList.remove("list-show");
        icon.style.rotate = "0deg";
        
        filterBooks(); // Relance le filtrage
    };
});

// 6. Fermeture du menu si on clique n'importe où ailleurs sur la page
window.onclick = function(e) {
    if (!dropdownBtn.contains(e.target) && !list.contains(e.target)) {
        list.classList.remove("list-show");
        icon.style.rotate = "0deg";
    }
};

// 7. Filtrage en temps réel lors de la saisie dans la barre de recherche
input.oninput = function() {
    filterBooks();
};

// 8. Logique de filtrage croisé (Texte + Catégorie)
function filterBooks() {
    const searchText = input.value.toLowerCase();
    
    const filtered = books.filter(book => {
        const matchesCategory = (currentFilter === "ALL" || book.category === currentFilter);
        const matchesText = book.title.toLowerCase().includes(searchText);
        return matchesCategory && matchesText;
    });

    displayResults(filtered);
}

// 9. Génération et injection des cartes HTML
function displayResults(results) {
    container.innerHTML = ""; // Vide le conteneur avant d'ajouter les nouveaux résultats

    if (results.length === 0) {
        container.innerHTML = "<p class='no-result'>Aucun livre trouvé</p>";
        return;
    }

    results.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "card"; // Reprend ta classe CSS d'origine
        
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="Card Image">
            <h3>${book.title}</h3>
            <button>Shop Now</button>
        `;
        container.appendChild(bookDiv);
    });
}

// 10. Initialisation au démarrage du site
loadBooksData();
