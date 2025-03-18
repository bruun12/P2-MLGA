const hostname = '127.0.0.1';
const port = 3000;
let subCategoryArr = [];


//const fs = require('fs');
function newSubCategoryChecker(subCategory, subCategoryArr){
    for (const i in subCategoryArr){
        if (subCategory === subCategoryArr[i]){
            return false;
        } 
    }
    subCategoryArr.push(subCategory);
    return true;
}

function subCategoryDisplay(subCategory, subCategoryArr){
    if(newSubCategoryChecker(subCategory, subCategoryArr)){
        console.log("subCat: " + subCategory);

        let subCategoryTopA = document.createElement("a");
        document.querySelector("#categoryBox").appendChild(subCategoryTopA);
        subCategoryTopA.innerText = subCategory;


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


    let productName = document.createElement("P");
    productInfoDiv.appendChild(productName);
    productName.setAttribute("class", "productName")


    let productPrice = document.createElement("P");
    productInfoDiv.appendChild(productPrice);
    productPrice.setAttribute("class", "productPrice")

    
    productName.innerText = `${name}:`;
    productPrice.innerText = `${price} kr.`;
}


fetch("../database/products.json")
//Her omskriver vi det fra json til et array i js. Arrayet hedder "data" i næste function
.then(response => {return response.json()})
.then(data=>{
    //Vi løber igennem forløkken for alle 
    for (const i in data.products) {

        productDisplay(data.products[i].product, data.products[i].price, data.products[i].img);
        subCategoryDisplay( data.products[i].subCategory, subCategoryArr);
    }
    })

