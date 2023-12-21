document.addEventListener("DOMContentLoaded", function () {
  const galleryElement = document.querySelector(".gallery");
  const filterElement = document.querySelector(".filtres");

  //affichage projet
  function afficheWork(work, divWork) {
    const figure = document.createElement("figure");
    const imageWork = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    imageWork.src = work.imageUrl;
    figcaption.innerHTML = work.title;

    figure.appendChild(imageWork);
    figure.appendChild(figcaption);
    divWork.appendChild(figure);
  }
  console.log("affichage de projet");

  //récupérer les travaux
  function fetchWorks(divWork) {
    fetch("http://localhost:5678/api/works")
      .then((reponse) => reponse.json())
      .then((works) => {
        listeDeWorks = works;
        for (let i = 0; i < works.length; i++) {
          afficheWork(works[i], divWork);
        }
      });
  }
  console.log("fetchWorks ok");

  //affichage gallery
  fetchWorks(galleryElement);

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
});
