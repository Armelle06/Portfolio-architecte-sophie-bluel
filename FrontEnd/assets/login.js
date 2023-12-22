document.addEventListener("DOMContentLoaded", function () {
  const btnConnecter = document.getElementById("connecter");

  // connection au clic avec addEventlisten
  btnConnecter.addEventListener("click", function () {
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
        if (reponse.status === 200) {
          //SI LOGIN OK ON CONVERTI EN JSON
          return reponse.json();
        } else {
          //message d erreur display
          let errorLog = document.getElementById("errorLog");
          errorLog.innerHTML = "Email ou mot de passe ne sont pas correctes";
          errorLog.style.display = "flex";
          throw new Error("Erreur de connexion"); // Ajout de cette ligne pour arrêter le traitement en cas d'erreur
        }
        console.log(reponse.json());
      })
      .then((data) => {
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
});
