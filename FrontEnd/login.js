//constante , selection des elements HTML
const btnConnecter = document.getElementById("connecter");

// connection au clic avec addEventlisten
btnConnecter.addEventListener("click", function (event) {
  event.preventDefault(); // Empêche le rechargement de la page par défaut
  userLogin();
});

function userLogin() {
  let formUser = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

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
        // Si  LOGIN Ok reponse converti en Json
        return reponse.json();
      } else {
        // sinon message d erreur display block
        let errorLog = document.getElementById("errorLog");
        errorLog.innerHTML = "Erreur dans l'identifiant ou le mot de passe ";
        errorLog.style.display = "block";
      }
    })
    .then((data) => {
      if (data) {
        // Si le login est OK
        // Stockage du token dans le sessionStorage
        sessionStorage.setItem("token", data.token);
        // Redirection vers la page d'accueil
        window.location.href = "index.html";
      }
    });
}
