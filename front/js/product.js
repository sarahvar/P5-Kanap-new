//Fonction qui permet l'api de chrome de chercher l'Url et chaque ID
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const _id = urlParams.get("_id");
if (_id != null) {
  let itemPrice = 0;
  let imgUrl, altText, articleName;
}

// Récupération du produit grâce à l'ID correspondant
fetch(`http://localhost:3000/api/products/${_id}`)
  .then((response) => response.json())
  .then((res) => handleData(res))
  .catch((error) => {
    console.log(error);
  });

// Créer mon produit kanap sur la page product grâce aux fonctions make
function handleData(kanap) {
  const { altTxt, colors, description, imageUrl, name, price } = kanap;
  imgUrl = imageUrl;
  altText = altTxt;
  articleName = name;
  itemPrice = price;
  makeImage(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeCartContent(description);
  makeColors(colors);
}

// Fonction qui sert à créer l'image et le alt Txt par rapport à item__img du fichier product HTML
function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  if (parent != null) parent.appendChild(image);
}

//Fabriquer le titre par rapport au " h1 tittle" du fichier product HTML
function makeTitle(name) {
  const h1 = document.querySelector("#title");
  if (h1 != null) h1.textContent = name;
}

//Créer le prix avec le fichier HTML product grâce au "span price"
function makePrice(price) {
  const span = document.querySelector("#price");
  if (span != null) span.textContent = price;
}

//Créer la description avec le fichier HTML "p description"
function makeCartContent(description) {
  const p = document.querySelector("#description");
  if (p != null) p.textContent = description;
}

// Créer le selecteur de couleur grâce au select "colors" du fichier HTML product avec ses options
function makeColors(colors) {
  const select = document.querySelector("#colors");
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
  }
}

//Permets de cliquer sur le bouton panier avec le queryselector "addToCart" de la page HTML product
const button = document.querySelector("#addToCart");

//api de chrome qui permets de faire quand l'évenement "click" effectue la fonction "handleClick"
button.addEventListener("click", handleClick);

//Quand on clique permet de récupérer les données de la couleur et quantité sélectionner (.value)
function handleClick() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  if (isOrderInvalid(color, quantity)) return;
  saveOrder(color, quantity);
  redirectToCart();
}

//Permet de storer dans le localStorage
function saveOrder(color, quantity) {
  const key = `${_id}-${color}`;
  const data = {
    _id: _id,
    color: color,
    quantity: Number(quantity),
    imageUrl: imgUrl,
    altTxt: altText,
    name: articleName,
  };
  localStorage.setItem(key, JSON.stringify(data));
}

//Fonction qui permets de vérifier si la couleur ou la quantité ne sont pas valide mettre un message d'alerte
function isOrderInvalid(color, quantity) {
  if (
    color == null ||
    color === "" ||
    quantity == null ||
    quantity <= 0 ||
    quantity >= 101
  ) {
    alert("S'il vous plaît selectionnez une couleur ET une quantité corrects");
    return true;
  }

  //Permets de rediriger l'utilisateur vers la page cart.html avec la touche "ajouter au panier"
}
function redirectToCart() {
  window.location.href = "cart.html";
}
