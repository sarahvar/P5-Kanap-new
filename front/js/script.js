
//Commentaire index.html :

/*<a href="./product.html?id=42">
    <article>
        <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
        <h3 class="productName">Kanap name1</h3>
        <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
    </article>
</a>*/


//Commentaire Produit n°1 Description :

/* {
    "colors": [
      "Blue",
      "White",
      "Black"
    ],
    
    "_id": "107fb5b75607497b96722bda5b504926",
    "name": "Kanap Sinopé",
    "price": 1849,
    "imageUrl": "http://localhost:3000/images/kanap01.jpeg",
    "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "altTxt": "Photo d'un canapé bleu, deux places"
  }, 
  
*/





//Fonction Fetch :

fetch('https://kanap-bd.vercel.app/api/products/')
  .then( (response) => response.json())
  .then( (dataKanaps) => scriptProductsKanaps(dataKanaps));
    
    


function scriptProductsKanaps (dataKanaps){
    dataKanaps.forEach((dataKanap) => {
        
        //Création d'une constante _id, qui vas récupérer l'id des images :
        const _id = dataKanap._id;
        
        //Création d'une constante imageUrl, qui vas récupérer l'imageUrl des images :
        const imageUrl = dataKanap.imageUrl;        
        
        //Création d'une constante altTxt, qui vas récupérer le altTxt des images :
        const altTxt = dataKanap.altTxt;
        
        //Création d'une constante name, qui vas récupérer le name des image :
        const name = dataKanap.name;
        
        //Création d'une constante description, qui vas récuperer tout les description des images :
        const description = dataKanap.description;
        
        
        
        
        
        //Création d'une constante link qui vas appelé de la fonction makeLink et affectation de l'_id en paramétre :
        const link = makeLink(_id);
        
        //Création d'une constante article qui vas appelé la fonction makeArticle :
        const article = makeArticle();
        
        //Création d'une constante image, qui vas appelé la fonction makeImage et affectation de imageUrl, altTxt en paramétre:
        const image = makeImage(imageUrl, altTxt);
        
        //Création d'une constante h3, qui vas appelé la fonction makeH3 et affectaton du name en paramétre :
        const h3 = makeH3(name);
        
        //Création d'une constante p, qui vas appelé la fonction makeP et affectation de la description en paramétre :
        const p = makeP(description);
        
        //Appel de la fonction appendArticleToLink avec affectation de link et article en paramétre article devient l'enfant de link et link devient l'enfant de l'id = items :
        appendArticleToLink(link, article);
        
        // Appel de la fonction appendElementsToArticle avec affectation de l' article, image, p, h3  en paramétre qui devient les enfant de article :
        appendElementsToArticle(article, image, h3, p);

    });
}







function makeLink(_id){
        
    //Creation de l'élement "a" puis affectation du link avec l'id :
    const link = document.createElement('a');
    link.href = "./html/product.html?id=" + _id;
    return link;    
}




function makeArticle(){
    //Création d'une constante article et creation d'un élement article :
    const article = document.createElement("article");
    return article;
}




function makeImage(imageUrl, altTxt){
    
    //Creation de la balise "<img>" avec insertion du imageUrl et du altTxt :
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = altTxt;
    return img;

}




function makeH3(name){

    //Creation de la balise "<h3>" avec insertion du titre + ajouts de la class "productName" :
    const balise_H3 = document.createElement('h3');
    balise_H3.textContent = name;
    balise_H3.classList.add("productName");
    return balise_H3;

}




function makeP(description){

    ///Creation de la balise "<p>" avec insertion de la description  + ajouts class "productDescription" :
    const balise_p = document.createElement('p');
    balise_p.textContent = description;
    balise_p.classList.add("productDescription");
    return balise_p;
}




function appendArticleToLink(link, article){
        
    //Selection de l'id = items :
    const id_items = document.querySelector("#items");
        
    //Mises en place d'un append pour que link soit l'enfant de l'id = items et que article soit l'enfant de link :
    id_items.append(link);
    link.append(article);

}




function appendElementsToArticle(article, image, h3, p){
    
    //Mises en place d'un append pour que image, h3 et p soit l'enfant de article :
    article.append(image, h3, p);
}







