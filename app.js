const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwNTA3NiwiZXhwIjoxOTU1MDgxMDc2fQ.nugD6bl641l6KFBgo9SgmnpWuNJDR0K9rfH6ZHVAHgo"

const API_URL = "https://mjfhxhlnaztdifgwfnjj.supabase.co/rest/v1/idees"

// RECUPERATIONS DES ELEMENTS DOM
const propositionElement = document.getElementById("propositions")
const ideeForm = document.querySelector("form")
const inputTitre = document.querySelector("input#titre")
const inputSuggestion = document.querySelector("textarea#suggestion")

// NOS FONCTIONS
const creerUneCarte = (idee) => {
  const divCard = document.createElement("div")
  divCard.classList.add("card")
  divCard.classList.add("animate__animated")
  divCard.classList.add("animate__bounce")
  divCard.classList.add("m-2")
  divCard.classList.add("col-3")
  divCard.style.width = "22rem"

  const divCardBody = document.createElement("div")
  divCardBody.classList.add("card-body")

  const cardTitle = document.createElement("h5")
  cardTitle.classList.add("card-title")

  const cardDescription = document.createElement("p")
  cardDescription.classList.add("card-text")

  cardTitle.textContent = idee.titre
  cardDescription.textContent = idee.suggestion

  divCardBody.appendChild(cardTitle)
  divCardBody.appendChild(cardDescription)
  divCard.appendChild(divCardBody)
  propositionElement.appendChild(divCard)
}

// VERIFICATION DES MOTS SAISIS

inputSuggestion.addEventListener("input", (event) => {
  const longueurMax = 130
  const contenuSaisi = inputSuggestion.value
  const longueurSaisi = contenuSaisi.length
  const reste = longueurMax - longueurSaisi

  //actualiser le dom pour afficher le nombre
  const paragraphCompteur = document.getElementById("limite-text")
  const compteurText = document.getElementById("text-progress")
  const restantText = document.getElementById("text-restant")
  const btnSuggestion = document.getElementById("btn-suggestion")
  compteurText.textContent = longueurSaisi
  restantText.textContent = " Il vous reste " + reste

  //changer couleur

  if (reste < 0) {
    paragraphCompteur.style.color = "#ce0033"
    btnSuggestion.disabled = true
  } else if (reste <= 16) {
    paragraphCompteur.style.color = "yellow"
    btnSuggestion.disabled = false
  } else {
    paragraphCompteur.style.color = "#00000"
    btnSuggestion.disabled = false
  }
})

// RECUPERATION DES INFORMAIONS DU FORMULAIRE

ideeForm.addEventListener("submit", (event) => {
  event.preventDefault()

  // Récupération des informations saisies
  const titreSaisi = inputTitre.value
  const suggestionSaisi = inputSuggestion.value

  if (titreSaisi.trim().length < 5 || suggestionSaisi.trim().length < 10) {
    alert("Merci de saisir des informations correctes")
    return
  }

  // mettre les informations sous forme
  const nouvelleIdee = {
    titre: titreSaisi,
    suggestion: suggestionSaisi,
    statut: false,
  }

  //ENVOYER LES DONNEES VERS SUPABASE
  fetch(API_URL, {
    method: "POST",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nouvelleIdee),
  })

  // on vide les champs
  inputTitre.value = ""
  inputSuggestion.value = ""

  //AJOUT DE LA NOUVELLE IDEE AU NIVEAU DE LA PAGE
  creerUneCarte(nouvelleIdee)
})

// AFFICHAGE DE LA DES IDEES

window.addEventListener("DOMContentLoaded", (event) => {
  //RECUPERATION DES DONNEES VIA API
  fetch(API_URL, {
    headers: {
      apikey: API_KEY,
    },
  })
    .then((response) => response.json())
    .then((idees) => {
      idees.forEach((idee) => {
        creerUneCarte(idee)
      })
    })
})
