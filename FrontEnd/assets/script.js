//creation const des travaux recupere sur API  then interperta en json et then pour interpreter la promise du 1ERE then
const works = fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((works) => affichageWorks(works));

//recuperation de l element du dom qui accueillera les images
const galleryElement = document.querySelector(".gallery");

// function qui genere l'affichage des works dans galerie
function affichageWorks(works) {
  for (let i = 0; i < works.length; i++) {
    // création de la balise <figure> et déclaration de l'enfant
    let figureElement = document.createElement("figure");
    figureElement.dataset.class = works[i].category.name;
    galleryElement.appendChild(figureElement);

    // création de la balise <img> ,récuperation et déclaration de l'enfant
    let imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;
    imageElement.alt = works[i].title;
    figureElement.appendChild(imageElement);

    // creation de la balise <figcaption> ,récuperation et déclaration de l'enfant
    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML = works[i].title;
    figureElement.appendChild(figcaption);

    //let alt = createElement("alt");
    //figcaption.innerHTML = works[i].title;
  }
}
console.log("tt est bon");

//chercher tous les filtres
let filtres = document.querySelectorAll(".filtres button ");
//filtres.addEventListener("click", function () {
for (let filtre of filtres){
  filtre.addEventListener("click",function())
}

