//constantes , selection des elements HTML
const galleryElement = document.querySelector(".gallery");
const filterElement = document.querySelector(".filtres");

//affichage gallery, sans poubelle "false"
fetchWorks(galleryElement, false);

//affichage projet et creation en html divwork/figure/imageWork/figcaption
function afficheWork(work, divWork, deleteButton) {
  const figure = document.createElement("figure");
  const imageWork = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  imageWork.src = work.imageUrl;
  figcaption.innerHTML = work.title;
  figure.appendChild(imageWork);
  figure.appendChild(figcaption);
  divWork.appendChild(figure);
  if (deleteButton) {
    createPoubelleButton(figure, work); //si true apparation poubelle sur imageWork
  }
}

// récupérer de la liste des travaux
function fetchWorks(divWork, deleteButton) {
  fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((works) => {
      listeDeWorks = works;
      for (let i = 0; i < works.length; i++) {
        //boucle pour afficher travaux
        // tant que i, indice est inferieur à la totalité ;i = i + 1.
        afficheWork(works[i], divWork, deleteButton);
      }
    });
}

// récuperer les catégories et creation category "tous"
fetch("http://localhost:5678/api/categories")
  .then((reponse) => reponse.json())
  .then((categories) => {
    let worksFiltre = new Set(categories); //création categorie sans doublons
    let newCategory = { id: 0, name: "tous" }; //création et appel  ("tous")
    createButton(newCategory);
    for (let category of worksFiltre) //creation pour les 3 autres categories
      createButton(category);
  });

// créer bouton de filtre en HTML
function createButton(category) {
  let button = document.createElement("button");
  button.id = "button" + category.id;
  button.classList.add("button");
  button.innerHTML = category.name;
  filterElement.appendChild(button);

  //eventlistener sur bouton de filtres pour trier /ID
  button.addEventListener("click", function () {
    filtrageCategory(category.id);
  });
}

// filtrage par category.Id triage des travaux
function filtrageCategory(categoryId) {
  galleryElement.innerHTML = "";
  //parcour tous les oeuvres dans listeDeWorks la totalité des travaux
  for (let i = 0; i < listeDeWorks.length; i++) {
    if (listeDeWorks[i].categoryId === categoryId || categoryId === 0) {
      // si ID est le meme ou 0
      afficheWork(listeDeWorks[i], galleryElement, false);
    }
  }
}

// création poubelle pour chaque image pour modal seulement
function createPoubelleButton(figure, work) {
  let button = document.createElement("i");
  button.classList.add("fa-regular", "fa-trash-can");
  button.addEventListener("click", effaceWork); //fonction effaceWork sur modalGallery.js
  button.id = work.id;
  figure.appendChild(button);
}

// appel a la fonction gestionLogin
gestionLogin();

// modif login en logout ...
function gestionLogin() {
  if (sessionStorage.getItem("token")) {
    // si token dans la sessionStorage
    // changer login en logout
    let loginLogout = document.getElementById("loginLogout");
    loginLogout.textContent = "logout";
    // apparition de la bande noire
    let edition = document.getElementById("edition");
    edition.style.display = "flex";
    // apparition de la modification des projets "modifier"
    let modifProjet = document.getElementById("modifProjet");
    modifProjet.style.display = "inline";
    // cache les filtres
    let filterElement = document.querySelector(".filtres");
    filterElement.style.visibility = "hidden"; //juste invisible
    // écouteur pour déconnecter
    loginLogout.addEventListener("click", function (event) {
      event.preventDefault();

      // Suppression du TOKEN de sessionStorage
      sessionStorage.removeItem("token");

      // Rediriger vers la page d accueil
      window.location.href = "index.html";
    });
  }
}
