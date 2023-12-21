const galleryElement = document.querySelector(".gallery");

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
      Works = works;
      for (let i = 0; i < works.length; i++) {
        afficheWork(works[i], divWork);
      }
    });
}
console.log("fetchWorks ok");

//affichage gallery
fetchWorks(galleryElement);
