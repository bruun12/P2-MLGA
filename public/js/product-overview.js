const hostname = '127.0.0.1';
const port = 3000;
let subCategoryArr = [];


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


fetch("js/products.json")
//Her omskriver vi det fra json til et array i js. Arrayet hedder "data" i næste function
.then(response => {return response.json()})
.then(data=>{
    //Vi løber igennem forløkken for alle 
    for (const i in data.products) {

        productDisplay(data.products[i].product, data.products[i].price, data.products[i].img);
        subCategoryDisplay( data.products[i].subCategory, subCategoryArr);
    }
})