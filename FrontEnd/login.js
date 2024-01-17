const btnConnecter = document.getElementById("connecter");

// connection au clic avec addEventlisten
btnConnecter.addEventListener("click", function (event) {
  event.preventDefault(); // Empêche le rechargement de la page par défaut
  userLogin();
});
console.log("coucou1");

function userLogin() {
  console.log("coucou2");
  let formUser = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  console.log("coucou3");
  fetch("http://localhost:5678/api/users/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(formUser),
  })
    .then((reponse) => {
      console.log("Réponse du serveur:", reponse.status);
      if (reponse.status === 200) {
        console.log("Coucou4");
        //SI LOGIN OK ON CONVERTI EN JSON
        return reponse.json();
      } else {
        //message d erreur display
        let errorLog = document.getElementById("errorLog");
        errorLog.innerHTML = "Erreur dans l'identifiant ou le mot de passe ";
        errorLog.style.display = "block";
        // throw new Error("Erreur de connexion"); // Ajout de cette ligne pour arrêter le traitement en cas d'erreur
      }
    })
    .then((data) => {
      console.log("Données de la réponse:", data);
      if (data) {
        // Si le login est OK
        // Stockage du token dans le sessionStorage
        sessionStorage.setItem("token", data.token);
        // Redirection vers la page d'accueil
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.error(error); // Ajout de cette ligne pour afficher les erreurs dans la console
    });
}
