document.addEventListener("DOMContentLoaded", function () {
  const modalGallery = document.querySelector(".modalGallery");
  const boutonCroix = document.querySelector(".js-modal-croix");
  const modalWrapper = document.querySelector(".modalWrapper");
  const modifProjet = document.getElementById("modifProjet");

  let modal = null;

  // Fonction d'affichage d'un travail
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

  //fonction ouverture boite modal
  const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector("#modal1");
    modal.style.display = "flex";
    modal.addEventListener("click", closeModal);
    boutonCroix.addEventListener("click", closeModal);
    modalWrapper.style.display = "flex";
    modalGallery.innerHTML = "";
    fetchWorks(modalGallery);
  };
  console.log(modifProjet);

  //fonction fermeture modal
  const closeModal = function (e) {
    if (modal === null) return;
    //SI ON CLIQUE SUR AUTRE CHOSE QUE LA MODALE OU LE BOUTON ON NE VEUT PAS FERMER
    if (
      e.target != modal &&
      e.target != boutonCroix &&
      e.target != document.querySelector(".fa-solid")
    )
      return;
    e.preventDefault();
    modal.style.display = "none";
    modal.removeEventListener("click", closeModal);
    boutonCroix.removeEventListener("click", closeModal);
  };

  console.log(modifProjet);
  // appel bouton ouverture modal
  modifProjet.addEventListener("click", openModal);
});
