const hostname = '127.0.0.1';
const port = 3000;
let subCategoryArr = [];

//uses the query set in the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// if the query in the URL is product. make it a product page.
if (urlParams.get('type') === "product"){

    //const fs = require('fs');
function newSubCategoryChecker(subCategory, subCategoryArr){
    //Goes through all already created subCats 
    for (const i in subCategoryArr){
        if (subCategory === subCategoryArr[i]){
            return false;
        } 
    }
    subCategoryArr.push(subCategory);
    return true;
}

function subCategoryDisplay(subCategory, subCategoryArr){
    //This checks if there is an existing subCat with the same name  
    if(newSubCategoryChecker(subCategory, subCategoryArr)){
        console.log("subCat: " + subCategory);

        //This makes the subCat appear on the top of the page
        let subCategoryTopA = document.createElement("a");
        document.querySelector("#categoryBox").appendChild(subCategoryTopA);
        subCategoryTopA.innerText = subCategory;

        //This makes the subCat appear on the side of the page 
        let subCategoryA = document.createElement("a");
        document.querySelector("#categorySelector").appendChild(subCategoryA);
        subCategoryA.innerText = subCategory;
    }
}

function productDisplay(name, price, img){
    //Make div and put it under the productDisplayer
    let productDiv = document.createElement("div");
    productDiv.setAttribute("class", "productDiv")
    document.querySelector("#productDisplayer").appendChild(productDiv);

    //Create IMG and put it to product div
    let productImg = document.createElement("img");
    productImg.setAttribute("src", img);
    productImg.setAttribute("class", "productIMG");
    productImg.setAttribute("alt", "productPicture");
    productDiv.appendChild(productImg);
    
    let productInfoDiv = document.createElement("div");
    productDiv.setAttribute("class", "productInfoDiv")
    productDiv.appendChild(productInfoDiv);

    /* Create product name and append to product info div */
    let productName = document.createElement("p");
    productInfoDiv.appendChild(productName);
    productName.setAttribute("class", "productName")

    /* Create product price and append to product info div */
    let productPrice = document.createElement("p");
    productInfoDiv.appendChild(productPrice);
    productPrice.setAttribute("class", "productPrice")

    /* Create add to cart button and append to product info div */
    let addCart = document.createElement("button");
    addCart.textContent = "Add to cart";
    productInfoDiv.appendChild(addCart);
    addCart.setAttribute("class", "addCart")

    /* Set name and price to values fetched from database */
    productName.innerText = `${name}:`;
    productPrice.innerText = `${price} kr.`;
}

async function testing() {
    const products = await getAllProducts();
    console.log(products);
}

//testing();

//skriv kommentar, og eventuelt hvor man får det fra. (pt. html routes)
//Hvis man ikke har været med til at lave det, kan det være uoverskueligt at finde hvor /allproducts kommer fra.
//
fetch("/allProducts")
//Her omskriver vi det fra json til et array i js. Arrayet hedder "data" i næste function
.then(response => {return response.json()})
.then(data=>{
    console.log(data);
    //Vi løber igennem forløkken for alle 
    for (const product of data) {
        productDisplay(product.name, 100, product.img);
       //subCategoryDisplay(data.products[i].subCategory, subCategoryArr);
    }
});

}

