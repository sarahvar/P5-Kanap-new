//L'API Fetch récupere les données des produits sur le server 3000
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => addProducts(data))
  .catch((error) => {
    console.log(error);
  });

//Création des produits avec les constantes anchor, article, image, h3 et p
function addProducts(data) {
  data.forEach((kanap) => {
    //const _id = kanap._id
    //const imageUrl = kanap.imageUrl
    //const altTxt = kanap.altTxt
    //const name = kanap.name
    //const description = kanap.description

    const { _id, imageUrl, altTxt, name, description } = kanap;
    const anchor = makeAnchor(_id);

    const article = document.createElement("article");
    const image = makeImage(imageUrl, altTxt);
    const h3 = makeH3(name);
    const p = makeParagraph(description);

    appendElementToArticle(article, image, h3, p);
    appendArticleToAnchor(anchor, article);
  });
}

//Créer une fonction qui appel l'article, l'image, le h3 et le p
function appendElementToArticle(article, image, h3, p) {
  article.appendChild(image);
  article.appendChild(h3);
  article.appendChild(p);
}

//Créer une ancre qui fait référence au fichier product.html et l'id de chaque produit
function makeAnchor(_id) {
  const anchor = document.createElement("a");
  anchor.href = "./product.html?_id=" + _id;
  return anchor;
}

//Créer une fonction qui appel l'ancre et l'article(#items)
function appendArticleToAnchor(anchor, article) {
  const items = document.querySelector("#items");
  if (items != null) {
    items.appendChild(anchor);
    anchor.appendChild(article);
  }
}

// Fabriquer les images et l'alt text par rapport au document index HTML
function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

//Fabriquer les H3 par rapport au fichier index HTML du DOM
function makeH3(name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}

//Fabriquer les paragraphes par rapport au p du fichier HTML
function makeParagraph(description) {
  const p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
}
