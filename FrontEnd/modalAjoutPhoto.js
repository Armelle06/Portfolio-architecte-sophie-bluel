//constantes , selection des elements HTML
const croix2 = document.querySelector(".croix2");
const flecheGauche = document.querySelector(".fleche_gauche");
const buttonAjoutProjet2 = document.querySelector(".buttonAjoutProjet2");
const ajoutPhotoPng = document.querySelector("#ajoutPhotoPng");
const picturePreview = document.querySelector("#picturePreview");
const imageSelect = document.querySelector(".imageSelect");
const selectCategory = document.querySelector(".selectCategory");
const titreModal2 = document.querySelector(".titreModal2");
const buttonValider = document.querySelector(".buttonValider");
const ajouterUnProjet = document.querySelector("#ajouterUnProjet");

let modal2 = null;

// fonction OpenModal2
const openModal2 = function (e) {
  e.preventDefault();
  // modifie l apparance de la 1 ere modal
  modal.style.display = "none";
  // apparition modal2
  modal2 = document.querySelector("#modal2");
  modal2.style.display = null;
  modal2.addEventListener("click", closeModal2);
  croix2.addEventListener("click", closeModal2);
  let modalWrapper2 = document.querySelector(".modalWrapper2");
  modalWrapper2.style.display = "flex";
  effacePhotoSelection(); // vide la selection photo
  effaceForm(); // vide le formulaire ajout photo
  optionCategories();
};

// fonction CloseModal2
const closeModal2 = function (e) {
  console.log("Close Modal 2 function called");
  if (modal2 == null || e == null || e.target == null) return;
  //if (modal2 == null) return;
  // la modal disparait QUE si on clique sur modal2 et boutoncroix2
  if (
    e.target != modal2 &&
    e.target != croix2 &&
    e.target != document.querySelector(".fleche_croix .fa-x")
  )
    return;

  e.preventDefault();

  modal2.style.display = "none";
  modal2.removeEventListener("click", closeModal2);
  croix2.removeEventListener("click", closeModal2);
};

//bouton fleche gauche sur modal2 apparition modal
flecheGauche.addEventListener("click", function () {
  modal2.style.display = "none";
  modal.style.display = "flex";
});

// bouton ajouterProjet2  click eventlistener ouverture ajoutPhotoPng
buttonAjoutProjet2.addEventListener("click", function () {
  ajoutPhotoPng.click(); //ouverture fichier "file"
});

//selecteur de taille pour photo png
ajoutPhotoPng.addEventListener("change", function () {
  if (this.files[0].size > 4194304) {
    // verifie la taille
    alert("Fichier trop volumineux");
    this.value = "";
  }
  if (this.files[0]) {
    picturePreview.src = URL.createObjectURL(this.files[0]);
    picturePreview.style.display = "block";
    imageSelect.style.display = "none";
  }
});

// remise a zero de l image selectionneé, page d origine vide avec icone
function effacePhotoSelection() {
  ajoutPhotoPng.value = "";
  picturePreview.src = "";
  picturePreview.style.display = "none";
  imageSelect.style.display = "block";
}

// remise a zero du formulaire ajout photo/titre/category vide
function effaceForm() {
  selectCategory.value = 0;
  titreModal2.value = "";
}

// chargement categories via API
function optionCategories() {
  selectCategory.innerHTML = ""; //vider avant Fetch sinon ca s accumule
  let option = document.createElement("option");
  option.value = 0; //categorie vide
  option.text = ""; //sans texte
  selectCategory.add(option); // ajout de la categorie vide
  fetch("http://localhost:5678/api/categories")
    .then((reponse) => reponse.json())
    .then((categories) => {
      for (let category of categories) {
        let option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        selectCategory.add(option);
      }
    });
}

// Upload nouveau work
const UploadWork = function () {
  //stokage token
  let token = sessionStorage.getItem("token");

  const formData = new FormData(); //formData ensemble de valeur regroupé
  formData.append("image", ajoutPhotoPng.files[0]); //ajouter sur HTML le fichier image au formulaire
  formData.append("title", titreModal2.value); //ajouter le titre
  formData.append("category", selectCategory.value); //ajouter la category

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((response) => {
    if (response.status === 200 || response.status === 201) {
      //le formulaire est correctement envoyé
      effacePhotoSelection(); // vide la selection photo
      effaceForm(); // vide le formulaire ajout photo
      // rafraîchir la galerie après l'ajout du travail
      rafraichirWork(modalGallery, true); //rafraichir travaux modal
      rafraichirWork(galleryElement, false); //rafraichir travaux index

      // Afficher un message de validation ou la réponse de l'API
      response.json().then((data) => {
        alert("Formulaire correctement envoyé");
        console.log("Réponse de l'API :", data);
        // fermer la modal2
        modal2.style.display = "none";
        // Ouvrir la modal
        modal.style.display = "flex";
      });
    } else if (response.status === 401) {
      alert("Session expirée ou invalide");
    } else {
      alert("Erreur technique inconnue");
    }
  });
};

// vérifie le formulaire
const VerifForm = function () {
  if (
    // si elles ne sont pas vides ou egale à 0
    ajoutPhotoPng.value != "" &&
    titreModal2.value != "" &&
    selectCategory.value != 0
  ) {
    // bouton vert ,pointer l ecouteur fonction sur uploadWork
    buttonValider.style.backgroundColor = "#1D6154";
    buttonValider.style.cursor = "pointer";
    buttonValider.addEventListener("click", UploadWork);
  } else {
    // sinon bouton gris pas de pointer , écouteur non fonctionnel
    buttonValider.style.backgroundColor = "#A7A7A7";
    buttonValider.style.cursor = "default";
    buttonValider.removeEventListener("click", UploadWork);
  }
};

// chaque fois qu'on click et qu'il y a du changement  sur ajoutPhotoPng, selectCategory et titreModal2
// verifForm est declanché .
ajoutPhotoPng.addEventListener("change", VerifForm);
titreModal2.addEventListener("change", VerifForm);
selectCategory.addEventListener("change", VerifForm);

ajouterUnProjet.addEventListener("click", openModal2);
