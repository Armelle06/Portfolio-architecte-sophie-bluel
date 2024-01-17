const modalGallery = document.querySelector(".modalGallery");
const boutonCroix = document.querySelector(".js-modal-croix");
const modalWrapper = document.querySelector(".modalWrapper");
const modifProjet = document.getElementById("modifProjet");

let modal = null;

// fonction ouverture boite modal
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

// appel listener bouton modifProjet pour ouverture modal
modifProjet.addEventListener("click", openModal);

// fonction fermeture modal
const closeModal = function (e) {
  if (modal === null) return; // si nul elle ne peut pas ferme car inexistante
  // la modal disparait QUE si on clique sur modal et boutoncroix
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

// foncion suppression travaux
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

// rafraichir les travaux sans actualiser
function rafraichirWork(divWork, deleteButton) {
  divWork.innerHTML = "";
  fetchWorks(divWork, deleteButton);
}

// appel API pour delete travaux et appel rafraichir galery et modal
function effaceWorkFetch(idWork) {
  // récupération du token d'authentification depuis le sessionStorage
  let token = sessionStorage.getItem("token");

  fetch(`http://localhost:5678/api/works/${idWork}`, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    // gestion de la réponse de la requête DELETE
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      rafraichirWork(modalGallery, true); // rafraichir travaux modal
      rafraichirWork(galleryElement, false); // rafraichir travaux index
      // window.location.reload(); // Reload the page je ne l ai pas appliqué car il me retirait ma modal
    } else {
      alert("Erreur lors de la suppression du projet.");
    }
  });
}