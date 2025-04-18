const hostname = '127.0.0.1';
const port = 3000;
let subCategoryArr = [];

//uses the query set in the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

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

function subCategoryDisplay(subCategory, id){
    //This checks if there is an existing subCat with the same name  
    //This makes the subCat appear on the top of the page
/*     let subCategoryTopA = document.createElement("a");
    document.querySelector("#categoryBox").appendChild(subCategoryTopA);
    subCategoryTopA.innerText = subCategory; */

    //This makes the subCat appear on the side of the page 
    let subCategoryA = document.createElement("a");
    document.querySelector("#categorySelector").appendChild(subCategoryA);
    subCategoryA.innerText = subCategory;
    
    subCategoryA.href = `/overview?type=${urlParams.get('type')}&subCategory=$${id}`;

}

function displayItem(name, price, img){
    //Make div and put it under the productDisplayer
    let itemDiv = document.createElement("div");
    itemDiv.setAttribute("class", `${urlParams.get('type')}Div`)
    document.querySelector("#displayer").appendChild(itemDiv);

    //Create IMG and put it to product div
    let itemImg = document.createElement("img");
    itemImg.setAttribute("src", img);
    itemImg.setAttribute("class", "itemImg");
    itemImg.setAttribute("alt", "productPicture");
    itemDiv.appendChild(itemImg);
    
    let itemInfoDiv = document.createElement("div");
    itemDiv.setAttribute("class", `${urlParams.get('type')}InfoDiv`)
    itemDiv.appendChild(itemInfoDiv);

    /* Create product name and append to product info div */
    let itemName = document.createElement("p");
    itemInfoDiv.appendChild(itemName);
    itemName.setAttribute("class", "itemName")



/*  //Create add to cart button and append to product info div
    let addCart = document.createElement("button");
    addCart.textContent = "Add to cart";
    itemInfoDiv.appendChild(addCart);
    addCart.setAttribute("class", "addCart") */

    /* Set name and price to values fetched from database */
    

    if (urlParams.get('type') !== "event"){
        /* Create product price and append to product info div */
        let productPrice = document.createElement("p");
        itemInfoDiv.appendChild(productPrice);
        productPrice.setAttribute("class", "productPrice")
        itemName.innerText = `${name}:`;
        productPrice.innerText = `${price} kr.`;
    } else {
        itemName.innerText = `${name}`;
    }

}



//skriv kommentar, og eventuelt hvor man får det fra. (pt. html routes)
//Hvis man ikke har været med til at lave det, kan det være uoverskueligt at finde hvor /allproducts kommer fra.
//
if (urlParams.get('subCategory') !== null){
    fetch(`/storeEvents`)
    //Her omskriver vi det fra json til et array i js. Arrayet hedder "data" i næste function
    .then(response => {return response.json()})
    .then(data=>{
        console.log(data);
        //Vi løber igennem forløkken for alle 
        for (const item of data) {
            displayItem(item.title, item.price ,item.img);
        //subCategoryDisplay(data.products[i].subCategory, subCategoryArr);
        }
    });
} else {
    fetch(`/all${urlParams.get('type')}s`)
    //Her omskriver vi det fra json til et array i js. Arrayet hedder "data" i næste function
    .then(response => {return response.json()})
    .then(data=>{
        console.log(data);
        //Vi løber igennem forløkken for alle 
        for (const item of data) {
            displayItem(item.title, item.price ,item.img);
        //subCategoryDisplay(data.products[i].subCategory, subCategoryArr);
        }
    });
}


if (urlParams.get('type') === "product"){

} else {
    fetch(`/allStoresWithEvents`)
    .then(response => {return response.json()})
    .then(data=>{
    console.log(data);
    //Vi løber igennem forløkken for alle 
    for (const item of data) {
        subCategoryDisplay(item.name, item.id);
    }
});
}

console.log(urlParams.get('subCategory'));

