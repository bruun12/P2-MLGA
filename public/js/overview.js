//uses the query set in the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function subCategoryDisplay(subCategory, id){
    //This checks if there is an existing subCat with the same name  
    //This makes the subCat appear on the top of the page

    //This makes the subCat appear on the side of the page 
    let subCategoryA = document.createElement("a");
    document.querySelector("#categorySelector").appendChild(subCategoryA);
    subCategoryA.innerText = subCategory;
    
    subCategoryA.href = `/overview?type=${urlParams.get('type')}&sortId=${id}`;
}

function displayItem(name, price, img, id){ // Note if event instead of product price = date.
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
            //subCategoryDisplay(item.subCategory, subCategoryArr); // If needed
        }
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
    product: () => fetchAndDisplayItems(), // Display all products
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