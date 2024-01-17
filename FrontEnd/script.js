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
        afficheWork(works[i], divWork, deleteButton);
      }
    });
}

// récuperer les catégories et creation category "tous"
fetch("http://localhost:5678/api/categories")
  .then((reponse) => reponse.json())
  .then((categories) => {
    let worksFiltre = new Set(categories);
    let newCategory = { id: 0, name: "tous" };
    createButton(newCategory); // creation ("tous")
    for (let category of worksFiltre) //creation pour les 3 autres categories
      createButton(category);
  });

// créer bouton de filtres
function createButton(category) {
  console.log("Création du bouton pour la catégorie :", category);
  if (filterElement) {
    let button = document.createElement("button");
    button.id = "button" + category.id;
    button.classList.add("button");
    button.innerHTML = category.name;
    filterElement.appendChild(button);

    //eventlistener sur bouton de filtres
    button.addEventListener("click", function () {
      filtrageCategory(category.id);
    });
  } else {
    console.error("L'élément filterElement est null.");
  }
}

// filtrage par category.Id
function filtrageCategory(categoryId) {
  galleryElement.innerHTML = "";

  //juste les category
  for (let i = 0; i < listeDeWorks.length; i++) {
    if (listeDeWorks[i].categoryId === categoryId || categoryId === 0) {
      afficheWork(listeDeWorks[i], galleryElement, false);
    }
  }
}

// création poubelle pour chaque image
function createPoubelleButton(figure, work) {
  let button = document.createElement("i");
  button.classList.add("fa-regular", "fa-trash-can");
  button.addEventListener("click", effaceWork);
  button.id = work.id;
  figure.appendChild(button);
}

// appel a la fonction gestionLogin
gestionLogin();

// modif login en logout ...
function gestionLogin() {
  if (sessionStorage.getItem("token")) {
    // changer login en logout
    let loginLogout = document.getElementById("loginLogout");
    loginLogout.textContent = "logout";
    // pparition de la bande noire
    let edition = document.getElementById("edition");
    edition.style.display = "flex";
    // pour faire apparaitre la modification des projets
    let modifProjet = document.getElementById("modifProjet");
    modifProjet.style.display = "inline";
    // cache les filtres
    let filterElement = document.querySelector(".filtres");
    filterElement.style.visibility = "hidden";
    // ecouteur pour deconnecter
    loginLogout.addEventListener("click", function (event) {
      event.preventDefault();

      // Suppression du TOKEN de sessionStorage
      sessionStorage.removeItem("token");

      // Rediriger vers la page d accueil
      window.location.href = "index.html";
    });
  }
}
