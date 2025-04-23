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
    
/*     if(urlParams.get('type') !== "event"){
        subCategoryA.href = `/overview?type=${urlParams.get('type')}&subCategory=${id}`;
    } else {
        subCategoryA.href = `/overview?type=${urlParams.get('type')}&storeId=${id}`;
    } */
    subCategoryA.href = `/overview?type=${urlParams.get('type')}&id=${id}`;
}

function displayItem(name, price, img, id){
    //Make div and put it under the productDisplayer
    let itemA = document.createElement("a");
    itemA.setAttribute("class", `${urlParams.get('type')}Div`)
    document.querySelector("#displayer").appendChild(itemA);
    itemA.href = `/detail?type=${urlParams.get('type')}&id=${id}`;


    //Create IMG and put it to product div
    let itemImg = document.createElement("img");
    itemImg.setAttribute("src", img);
    itemImg.setAttribute("class", "itemImg");
    itemImg.setAttribute("alt", "productPicture");
    itemA.appendChild(itemImg);
    
    let itemInfoDiv = document.createElement("div");
    itemA.setAttribute("class", `${urlParams.get('type')}InfoDiv`)
    itemA.appendChild(itemInfoDiv);


    /* Create product name and append to product info div */
    let itemName = document.createElement("p");
    itemInfoDiv.appendChild(itemName);
    itemName.setAttribute("class", "itemName")

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


/* fetch(`/all${urlParams.get('type')}s`)
//Her omskriver vi det fra json til et array i js. Arrayet hedder "data" i næste function
.then(response => {return response.json()})
.then(data=>{
    console.log(data);
    //Vi løber igennem forløkken for alle 
    for (const item of data) {
        console.log(item.id[0]);
        displayItem(item.title, item.price ,item.img, item.id);
    //subCategoryDisplay(data.products[i].subCategory, subCategoryArr);
    }
}); */

// ASYNC AWAIT OF MARKUS' FETCH ABOVE.
async function fetchAndDisplayItems() {
    try {
        const response = await fetch(`/all${urlParams.get('type')}s`);
        const data = await response.json();

        for (const item of data) {
            displayItem(item.title, item.price, item.img, item.id);
            //subCategoryDisplay(item.subCategory, subCategoryArr); // If needed
        }
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

/* fetch(`/allStoresWithEvents`)
.then(response => {return response.json()})
.then(data=>{
console.log(data);
//Vi løber igennem forløkken for alle 
for (const item of data) {
    subCategoryDisplay(item.name, item.id);
}
}); */

// ASYNC AWAIT OF MARKUS' FETCH ABOVE.
//
async function fetchAndDisplayEvents() {
    try {
        const response = await fetch(`/allStoresWithEvents`);
        const data = await response.json();
        console.log(data);

        for (const item of data) {
            subCategoryDisplay(item.name, item.id);
        }
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

async function fetchAndDisplayStoreEvents(id) {
    try {
        const response = await fetch(`/storeEvents/${id}`)
        const data = await response.json();
        console.log(data);

        for (const item of data) {
            displayItem(item.title, item.date, item.img, item.store_id);
        }
    } catch (error) {
        console.error("Error fetching or processing data", error);
    }
}

// Function map — keys are the values from urlParams.get('type')
const routeHandlers = {
    product: fetchAndDisplayItems(), // Display all products
    event: (id) => {
        if (id) {
            fetchAndDisplayStoreEvents(id) // If we have an id, select items from specific store.
        } else {
            fetchAndDisplayEvents() // Else display all events
        }
    },
    // Add more mappings here if needed
};

// Extract type and safely call the handler
const type = urlParams.get('type');
const Id = urlParams.get('id')
const handler = routeHandlers[type];

if (handler) {
    handler(Id); // Calls the matched function
} else {
    console.warn(`No handler defined for type: ${type}`);
}