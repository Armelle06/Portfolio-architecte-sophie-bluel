document.addEventListener("DOMContentLoaded", function () {
  const modalGallery = document.querySelector(".modalGallery");
  const boutonCroix = document.querySelector(".js-modal-croix");
  const modalWrapper = document.querySelector(".modalWrapper");
  const modifProjet = document.getElementById("modifProjet");
  const galleryElement = document.querySelector(".gallery");

  let modal = null;

  // Fonction d'affichage d'un travail
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

  //récupérer les travaux
  function fetchWorks(divWork) {
    fetch("http://localhost:5678/api/works")
      .then((reponse) => reponse.json())
      .then((works) => {
        listeDeWorks = works;
        for (let i = 0; i < works.length; i++) {
          afficheWork(works[i], divWork, true);
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
    fetchWorks(modalGallery, true);
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

  // appel listener bouton modifProjet ouverture modal
  modifProjet.addEventListener("click", openModal);

  function createPoubelleButton(figure, work) {
    let button = document.createElement("i");
    button.classList.add("fa-regular", "fa-trash-can");
    button.addEventListener("click", effaceWork);
    button.id = work.id;
    figure.appendChild(button);
  }
  console.log(createPoubelleButton);
  //FONCTION SUPPRESSION TRAVAUX
  const effaceWork = function (e) {
    const confirmation = confirm(
      "Êtes-vous sûr de vouloir supprimer ce projet ?"
    );

    if (confirmation) {
      try {
        effaceWorkFetch(e.target.id);
      } catch (error) {
        console.error("Erreur lors de la suppression du projet:", error);
      }
    }
  };

  //APPEL API SUPPRESSION TRAVAUX
  function effaceWorkFetch(idWork) {
    let token = sessionStorage.getItem("token");

    fetch(`http://localhost:5678/api/Work/${idWork}`, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        refreshWorks(modalGallery, true); //REAFFICHAGE TRAVAUX DANS MODALE
        refreshWorks(galleryElement, false); //REAFFICHAGE TRAVAUX DANS INDEX
      } else {
        alert("Erreur lors de la suppression du projet.");
      }
    });
  }
});
