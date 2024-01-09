document.addEventListener("DOMContentLoaded", function () {
  const galleryElement = document.querySelector(".gallery");
  const filterElement = document.querySelector(".filtres");

  //affichage projet
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
      createPoubelleButton(figure, work);
    }
  }
  console.log("affichage de projet");

  //récupérer les travaux
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
  console.log("fetchWorks ok");

  //affichage gallery
  fetchWorks(galleryElement, false);

  //récuperer les catégories et cration category "tous"
  fetch("http://localhost:5678/api/categories")
    .then((reponse) => reponse.json())
    .then((categories) => {
      let worksFiltre = new Set(categories);
      let newCategory = { id: 0, name: "tous" };
      createButton(newCategory); // creation ("tous")
      for (let category of worksFiltre) //creation pour les autres categories
        createButton(category);
    });

  //creer button filtres
  function createButton(category) {
    console.log("Création du bouton pour la catégorie :", category);
    if (filterElement) {
      let button = document.createElement("button");
      button.id = "button" + category.id;
      button.classList.add("button");
      button.innerHTML = category.name;
      filterElement.appendChild(button);

      //eventlistener sur bouton
      button.addEventListener("click", function () {
        filtrageCategory(category.id);
      });
    } else {
      console.error("L'élément filterElement est null.");
    }
  }

  //filtrage par categoryid
  function filtrageCategory(categoryId) {
    galleryElement.innerHTML = "";

    //juste les category
    for (let i = 0; i < listeDeWorks.length; i++) {
      if (listeDeWorks[i].categoryId === categoryId || categoryId === 0) {
        afficheWork(listeDeWorks[i], galleryElement);
      }
    }
  }

  //création poubelle pour chaque image
  function createPoubelleButton(figure, work) {
    let button = document.createElement("i");
    button.classList.add("fa-regular", "fa-trash-can");
    button.addEventListener("click", effaceWork);
    button.id = work.id;
    figure.appendChild(button);
  }

  //MODIFICATION LOGIN EN LOGOUT SI NECESSAIRE
  gestionLogin();

  //modif login en logout
  function gestionLogin() {
    if (sessionStorage.getItem("token")) {
      //CHANGER LE MOT LOGIN EN LOGOUT
      let loginLogout = document.getElementById("loginLogout");
      loginLogout.textContent = "logout";
      //apparition de la bande noire
      let edition = document.getElementById("edition");
      edition.style.display = "flex";
      //POUR FAIRE APPARAITRE LA MODIFICATION DES PROJETS
      let modifProjet = document.getElementById("modifProjet");
      modifProjet.style.display = "inline";
      //POUR CACHER LES FILTRES EN MODE EDITION
      let filterElement = document.querySelector(".filtres");
      filterElement.style.visibility = "hidden";
      //peux etre changer en visibility hidden ou visible
      // DÉCONNEXION LORS DU CLIQUE SUR LOGOUT
      loginLogout.addEventListener("click", function (event) {
        event.preventDefault();

        // SUPPRESSION DU TOKEN DU SESSION STORAGE
        sessionStorage.removeItem("token");

        // REDIRECTION VERS LA PAGE D'ACCUEIL
        window.location.href = "index.html";
      });
    }
  }
});
