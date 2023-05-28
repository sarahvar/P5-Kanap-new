//Permets de récuperer le produit grâce à l'ID correspondant
let cart = [];
async function getProductById(_id) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${_id}`);
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.log(error);
  }
}

//Looper item
retrieveItemsFromCache();
cart.forEach((item) => {
  getProductById(item._id).then((price) => displayItem(item, price));
});

//permets de faire lancer le order sur le bouton et faire lancer le formulaire
let orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e));

//Recuperer les items du cache
function retrieveItemsFromCache() {
  let numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    let item = localStorage.getItem(localStorage.key(i)) || "";
    let itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
}

//Permet d'afficher l'item
function displayItem(item, price) {
  let article = makeArticle(item);
  let imageDiv = makeImageDiv(item);
  article.appendChild(imageDiv);
  let cardItemContent = makeCartContent(item, price);
  article.appendChild(cardItemContent);
  displayArticle(article);
  displayTotalQuantity();
  displayTotalPrice();
}

//Fabriquer l'article
function makeArticle(item) {
  let article = document.createElement("article");
  article.classList.add("card__item");
  article.id = "card__items";
  article.dataset.id = item._id;
  article.dataset.color = item.color;
  return article;
}

//Afficher l'article
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
  const sectionStyle = document.getElementById("cart__items");
  const articleStyle = document.getElementById("card__items");
  sectionStyle.style.width = "40%";
  sectionStyle.style.margin = "0 auto";
}

// Faire l'image
function makeImageDiv(item) {
  let div = document.createElement("div");
  div.classList.add("cart__item__img");

  let image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.altTxt;
  div.appendChild(image);
  return div;
}

//Fabriquer le contenu de la carte grâce aux élements "div" et "cart_item-content" de la page HTML cart
function makeCartContent(item, price) {
  let cardItemContent = document.createElement("div");
  cardItemContent.classList.add("cart__item__content");

  let description = makeDescription(item, price);
  let settings = makeSettings(item);

  cardItemContent.appendChild(description);
  cardItemContent.appendChild(settings);
  return cardItemContent;
}

//Faire la description avec les éléments du fichier cart.html
function makeDescription(item, price) {
  let description = document.createElement("div");
  description.classList.add("cart__item__content__description");

  let h2 = document.createElement("h2");
  h2.textContent = item.name;

  let p = document.createElement("p");
  p.textContent = item.color;

  let span = document.createElement("p");
  span.textContent = price + " €";

  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(span);
  return description;
}

//Créer les réglages avec le fichier HTML cart
function makeSettings(item) {
  let settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  addQuantityToSettings(settings, item);
  addDeleteToSettings(settings, item);
  return settings;
}

//Fonction qui permets de vérifier si la quantité n'est pas valide mettre un message d'alerte
function isQuantityInvalid(quantity) {
  if (quantity == null || quantity <= 0 || quantity >= 101) {
    alert("S'il vous plaît selectionnez une quantité correct");
    return true;
  }
}

//Ajouter la quantité aux paramètres
function addQuantityToSettings(settings, item) {
  let quantity = document.createElement("div");
  quantity.classList.add("cart__item__content__settings__quantity");
  let p = document.createElement("p");
  p.textContent = "Qté : ";
  quantity.appendChild(p);
  let input = document.createElement("input");
  input.type = "number";
  input.classList.add = "itemQuantity";
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;
  input.addEventListener("input", () => {
    updatePriceAndQuantity(item._id, input.value, item, item.color);
  });
  quantity.appendChild(input);
  settings.appendChild(quantity);
}

// Charger le prix et la quantité
function updatePriceAndQuantity(_id, newValue, item, color) {
  let itemToUpdate = cart.find(
    (item) => item._id === _id && item.color === color
  );

  itemToUpdate.quantity = Number(newValue);
  item.quantity = itemToUpdate.quantity;
  if (!isQuantityInvalid(item.quantity)) {
    displayTotalQuantity();
    displayTotalPrice();
    saveNewDataToCache(item);
  } else {
    let input_Quantity = document.querySelector("input[name = 'itemQuantity']");
    let i = item._id + "-" + item.color;
    let item_ls = localStorage.getItem(localStorage.key(i)) || "";
    let item_ls_data = JSON.parse(item_ls);
    if (item.quantity == null || item.quantity <= 0 || item.quantity >= 101) {
      input_Quantity.value = item_ls_data.quantity;
      console.log(input_Quantity);
    }
    return;
  }
}

//Supprimer les données du cache
function deleteDataFromCache(item) {
  let key = `${item._id}-${item.color}`;
  localStorage.removeItem(key);
}

//Sauvegarder les nouvelles données du cache
function saveNewDataToCache(item) {
  let dataToSave = JSON.stringify(item);
  let key = `${item._id}-${item.color}`;
  localStorage.setItem(key, dataToSave);
}

//Supprimer dans les paramètres avec ("cart__item__content__settings__delete") du fichier HTML
function addDeleteToSettings(settings, item) {
  let div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");
  div.addEventListener("click", () => deleteItem(item));

  let p = document.createElement("p");
  p.textContent = "Supprimer";
  div.appendChild(p);
  settings.appendChild(div);
}

//Permets de supprimer un article
function deleteItem(item) {
  const indexToDelete = cart.findIndex((cartElem) => cartElem._id === item._id && cartElem.color === item.color);
  cart.splice(indexToDelete, 1);
  deleteDataFromCache(item);
  deleteArticleFromPage(item);
  displayTotalPrice();
  displayTotalQuantity();
}

//Supprime l'article de la page
function deleteArticleFromPage(item) {
  let articleToDelete = document.querySelector(
    `article[data-id="${item._id}"][data-color="${item.color}"]`
  );
  articleToDelete.remove();
}

//Calcul la quantité total
function displayTotalQuantity() {
  let totalQuantity = document.querySelector("#totalQuantity");
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    item = cart[i];
    total = total + item.quantity;
  }
  totalQuantity.textContent = total;
}

// Calcul le prix total
async function displayTotalPrice() {
  let totalPrice = document.querySelector("#totalPrice");
  let total = 0;
  for ( let j = 0; j < cart.length; j++) {
    let item = cart[j];
    let price = await getProductById(item._id);
    total = total + item.quantity * price;
    // calcul prix total du panier
  }
  totalPrice.textContent = total;
  // affichage du prix total du panier
}

//FORMULAIRE//

//Si le panier est à 0 ne pas soumettre le formulaire
function submitForm(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("s'il vous plaît veuillez acheter un produit");
    return;
  }
  if (
    isEmailInvalid() === false &&
    islastNameInvalid() == false &&
    isfirstNameInvalid() == false &&
    isAdressInvalid() == false &&
    isCityInvalid() == false
  ) {
    let body = makeRequestBody();
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let orderId = data.orderId;
        window.location.href =
          "../html/confirmation.html" + "?orderId=" + orderId;
        localStorage.clear(data);
      })
      .catch((err) => console.error(err));
  }
}

function isfirstNameInvalid() {
  let firstname = document.querySelector("#firstName").value;
  const firstnameError = document.getElementById("firstNameErrorMsg");
  let regex = /^[a-z]+[éàèê\-\ a-z]+[éàèêa-z]+$/i; //Peut contenir accents, peut contenir espaces et tirets, doit contenir au moins 3 caractères
  if (regex.test(firstname) === false) {
    firstnameError.innerText = "Merci d'inscrire un prénom correcte ";
    firstnameError.style.color = "red";
    firstnameError.style.paddingTop = "32px";
    setTimeout(function () {
      firstnameError.remove();
    }, 3000);
    return true;
  }
  return false;
}

function islastNameInvalid() {
  let lastname = document.querySelector("#lastName").value;
  const lastnameError = document.getElementById("lastNameErrorMsg");
  let regex = /^[a-z]+[éàèê\-\ a-z]+[éàèêa-z]+$/i; //Peut contenir accents, peut contenir espaces et tirets, doit contenir au moins 3 caractères
  if (regex.test(lastname) === false) {
    lastnameError.innerText = "Merci d'inscrire un nom de famille correcte ";
    lastnameError.style.color = "red";
    lastnameError.style.paddingTop = "32px";
    setTimeout(function () {
      lastnameError.remove();
    }, 3000);
    return true;
  }
  return false;
}

function isAdressInvalid() {
  let address = document.querySelector("#address").value;
  const adressError = document.getElementById("addressErrorMsg");
  let regex = /^[0-9]{1,4}\ [a-z\ éôàêèï]+/i; //Doit commencer par un nombre (max4) puis un espace puis une chaine de caractères
  if (regex.test(address) === false) {
    adressError.innerText = "Merci d'inscrire une adresse correcte ";
    adressError.style.color = "red";
    adressError.style.paddingTop = "32px";
    setTimeout(function () {
      adressError.remove();
    }, 3000);
    return true;
  }
  return false;
}

function isCityInvalid() {
  let city = document.querySelector("#city").value;
  const cityError = document.getElementById("cityErrorMsg");
  let regex = /^[A-Za-zéàçèüâêîôû-]{1,50}$/;
  if (regex.test(city) === false) {
    cityError.innerText = "Merci d'inscrire une ville correcte ";
    cityError.style.color = "red";
    cityError.style.paddingTop = "32px";
    setTimeout(function () {
      cityError.remove();
    }, 3000);
    return true;
  }
  return false;
}

function isEmailInvalid() {
  let email = document.querySelector("#email").value;
  const emailError = document.getElementById("emailErrorMsg");
  let regex = /[\w\-_.]+@[a-z]+[.][a-z]+/i; //.-_ autorisés, doit contenir un @ et un point.
  if (regex.test(email) === false) {
    emailError.innerText = "Merci d'inscrire une email valide";
    emailError.style.color = "red";
    emailError.style.paddingTop = "32px";
    setTimeout(function () {
      emailError.remove();
    }, 3000);
    return true;
  }
  return false;
}

function makeRequestBody() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;

  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIdsFromCache(),
  };
  return body;
}

function getIdsFromCache() {
  const numberOfProducts = localStorage.length;
  const ids = [];
  for (let i = 0; i < numberOfProducts; i++) {
    let key = localStorage.key(i);
    let id = key.split("-")[0];
    ids.push(id);
  }
  return ids;
}
