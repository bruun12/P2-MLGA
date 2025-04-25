//uses the query set in the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


function displayItem(name, price, img, id){ // Note if event instead of product price = date.
    //Make div and put it under the productDisplayer
    let itemA = document.createElement("a");
    itemA.setAttribute("class", `${urlParams.get('type')}Div`);
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
    if (urlParams.get('type') === "product"){
        /* Create product price and append to product info div */
        let productPrice = document.createElement("p");
        itemInfoDiv.appendChild(productPrice);
        productPrice.setAttribute("class", "productPrice")
        itemName.innerText = `${name}:`;
        productPrice.innerText = `${price} kr.`;
    } else {
        /* Create event date */
        itemName.innerText = `${name}`;
        let eventDate = document.createElement('p');
        itemInfoDiv.appendChild(eventDate);
        eventDate.setAttribute("class", "eventDate");
        eventDate.innerText = `${price}`;
    }

}

function makeSubCategoryDiv(id, category){
    let subCategoryDiv = document.createElement("div");

    subCategoryDiv.setAttribute("id", `subCatDivId${id}`);
    subCategoryDiv.setAttribute("class", `subCatDiv`);

    category.appendChild(subCategoryDiv);

    //This hides the div
    subCategoryDiv.style.display = "none";
    //this makes the div indent so it becomes clearer where you are 
    subCategoryDiv.style.margin = "8%";

}

function setHeaders(name, id){
    if (urlParams.get('sortId') == id){
        document.querySelector("#categoryHeader").innerHTML = name;
    } else if (urlParams.get('sortId') == undefined){
        document.querySelector("#categoryHeader").innerHTML = "Kategori";
    }
}

function categoryDisplay(name, id){
    //This checks if there is an existing subCat with the same name  
    //This makes the subCat appear on the side of the page 
    setHeaders(name, id);
    let categoryA = document.createElement("a");
    categoryA.setAttribute("class", `${urlParams.get('type')}A`);
    document.querySelector("#categorySelector").appendChild(categoryA);
    categoryA.innerText = name;
    
    categoryA.href = `/overview?type=${urlParams.get('type')}&sortId=${id}`;
    
    //Make subCategoryDiv for subCategories
    //A box that makes the subcategories for this item.
    makeSubCategoryDiv(id, categoryA);
}

function subCategoryDisplay(name, id, parent_id){
    setHeaders(name, id);

    const container = document.querySelector(`#subCatDivId${parent_id}`);

    let subCategoryA = document.createElement("a");
    subCategoryA.setAttribute("class", `${urlParams.get('type')}A`);

    if (container) {
        container.appendChild(subCategoryA);
    } else {
    console.error(`No element found with ID: subCatDivId${parent_id}`);
    }
    
    subCategoryA.innerHTML = name;

    subCategoryA.href = `/overview?type=${urlParams.get('type')}&sortId=${id}`;

    makeSubCategoryDiv(id, subCategoryA);
}

function sidebar(categories) {
    if (categories.id === urlParams.get('sortId')){
        document.querySelector("#categoryHeader").innerHTML = categories.name;
    }
    
    for (let i = 0; i < categories.length; i++){
        if(categories[i].id === categories[i].parent_id || categories[i] === undefined){
            categoryDisplay(categories[i].name, categories[i].id);
        } else if (categories[i].id !== categories[i].parent_id){
            subCategoryDisplay(categories[i].name, categories[i].id, categories[i].parent_id);
        }
    }
} 

//skriv kommentar, og eventuelt hvor man får det fra. (pt. html routes)
//Hvis man ikke har været med til at lave det, kan det være uoverskueligt at finde hvor /allproducts kommer fra.
async function fetchAndDisplayItems() {
    try {
        const response = await fetch(`/all${urlParams.get('type')}s`);
        const data = await response.json();
        const itemType = urlParams.get('type'); // Check whether it is products or events.

        // Decide whether to display date or price of item.
        let getValue;
        if (itemType === 'product') {
            getValue = (item) => item.price;
        } else {
            getValue = (item) => item.date;
        }

        for (const item of data) {
            displayItem(item.title, getValue(item), item.img, item.id);
        }
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

async function fetchAndDisplayFilteredItems(id) {
    try {
        const response = await fetch(`/filteredProducts/${id}`)
        const data = await response.json();
        console.log(data);
        
        
        for (const item of data) {
            displayItem(item.title, item.price, item.img, item.store_id);
        }
    } catch (error) {
        console.error("Error fetching or processing data", error);
    }
}

async function fetchAndDisplayCategories() {
    try {
        const response = await fetch(`/allCategories`);
        const data = await response.json();
            sidebar(data);
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

async function fetchAndDisplayStores() {
    try {
        const response = await fetch(`/allStoresWithEvents`);
        const data = await response.json();
        console.log(data);
        
        for (const item of data) {
            categoryDisplay(item.name, item.id);
        }
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

async function fetchAndDisplayStoreEvents(id) {
    try {
        const response = await fetch(`/storeEvents/${id}`)
        const data = await response.json();
        //console.log(data);
        for (const item of data) {
            displayItem(item.title, item.date, item.img, item.store_id);
        }
    } catch (error) {
        console.error("Error fetching or processing data", error);
    }
}

/* it takes a second for the dom to fully load so it is neccesarry to wait until
the dom is fully loaded together with having a short timeout */
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const dropdown = document.getElementsByClassName(`${urlParams.get('type')}A`);

        console.log(dropdown[1].childNodes[1]);
        for (let i = 0; i < dropdown.length; i++) {
            //This displays the div when you hover with you mouse
            dropdown[i].addEventListener("mouseover", function(event) {
                
                event.preventDefault();
                dropdown[i].childNodes[1].style.display = "block";
            });
            dropdown[i].addEventListener("mouseout", ()=> {
                dropdown[i].childNodes[1].style.display = "none";
            });
          }


    }, 100);  // adjust delay as needed
  });

// Function map — keys are the values from urlParams.get('type')
const routeHandlers = {
    product: (id) => {
        if (id) {
            fetchAndDisplayFilteredItems(id);
            fetchAndDisplayCategories();
        } else {
            fetchAndDisplayItems();
            fetchAndDisplayCategories();
        }

    }, // Display all products
    event: (id) => {
        if (id) {
            fetchAndDisplayStores(); // Display stores 
            fetchAndDisplayStoreEvents(id); // If we have an id, select items from specific store.
        } else {
            fetchAndDisplayStores(); // Else display all events and stores.
            fetchAndDisplayItems(); // Display all events
        }
    },
    // Add more mappings here if needed
};

// Extract type and call the handler
const type = urlParams.get('type');
const Id = urlParams.get('sortId')
const handler = routeHandlers[type];

if (handler) {
    handler(Id); // Calls the matched function with ID if passed.
} else {
    console.warn(`No handler defined for type: ${type}`);
}