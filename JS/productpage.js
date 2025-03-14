const hostname = '127.0.0.1';
const port = 3000;

//const fs = require('fs');


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
        console.log(data.products[i]);

        productDisplay(data.products[i].product, data.products[i].price, data.products[i].img);

    }
    })

