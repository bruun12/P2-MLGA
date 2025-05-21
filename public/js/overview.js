import { formatDates } from '../js/dom-utils.js';
//uses the query set in the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const catergorySelector = document.querySelector("#categorySelector");
const displayer = document.querySelector("#displayer")


function displayItem(name, price, img, id, div){ // Note if event instead of product price = date.
    //Make div and put it under the productDisplayer
    let itemA = document.createElement("a");
    itemA.setAttribute("class", `${urlParams.get('type')}Div`);
    document.querySelector(`#${div}`).appendChild(itemA);
    itemA.href = `detail?type=${urlParams.get('type')}&id=${id}`;


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
    itemName.innerText = `${name}:`;


    /* Set name and price to values fetched from database */
    if (urlParams.get('type') === "product"){
        /* Create product price and append to product info div */
        let productPrice = document.createElement("p");
        itemInfoDiv.appendChild(productPrice);
        productPrice.setAttribute("class", "productPrice")
        productPrice.innerText = `${price} kr.`;
    } else if (urlParams.get('type') === "event") {
        /* Create event date */
        let eventDate = document.createElement('p');
        itemInfoDiv.appendChild(eventDate);
        eventDate.setAttribute("class", "eventDate");
        eventDate.innerText = `${price}`;
    } else {
        let phone = document.createElement('p');
        itemInfoDiv.appendChild(phone);
        phone.setAttribute("class","phone");
        phone.innerText = `${price}`;
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
        if (urlParams.get('type') === "product"){
            document.querySelector("#categoryHeader").innerHTML = "Products";
        }
        if (urlParams.get('type') === "event"){
            document.querySelector("#categoryHeader").innerHTML = "Events";
        }
        if (urlParams.get('type' === "store")) {
            document.querySelector("#categoryHeader").innerHTML = "Stores";
        }
    }
}

export function categoryDisplay(name, id){
    //This checks if there is an existing subCat with the same name  
    //This makes the subCat appear on the side of the page 
    setHeaders(name, id);
    let categoryA = document.createElement("a");
    categoryA.setAttribute("class", `${urlParams.get('type')}A`);
    document.querySelector("#categorySelector").appendChild(categoryA);
    categoryA.innerText = name;
    
    categoryA.href = `overview?type=${urlParams.get('type')}&sortId=${id}`;
    
    //Make subCategoryDiv for subCategories
    //A box that makes the subcategories for this item.
    makeSubCategoryDiv(id, categoryA);

    return categoryA;
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

    subCategoryA.href = `overview?type=${urlParams.get('type')}&sortId=${id}`;

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


/*  Material for understanding recommender system code:
    [...] Spread operator: https://www.youtube.com/watch?v=NIq3qLaHCIs
    Map & Set: https://www.youtube.com/watch?v=yJDofSGTSPQ (9:18 -> 13:50)
    .indexOf: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    .some: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    .sort: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

    
    Choice of comparisons formula (Compairsons by ChatGippidy)
        1. Cosine Similarity (Most popular for recommender systems from what I could see on google -> SLIAL block 1 self-study slide 3, 19)
            - Good for sparse data, where users don't interact with majority of products
            - Focuses on what user liked/bought, not number of interactions
        2. Euclidean / Manhatten 
            - Less useful in sparse data, due to less meaningful euclidean distance
                - i.e. two users who have not interacted with 90% of products will look very similar no matter what they have interacted with.
            - Good for dense data and quantity of matters (ex: ratings from 1-5)
        3. Jaccard
            - Ignores no interactions
            - Undervalues similarity for sparse datasets.
        4. Minkowski Distance
            - Generalized Euclidean / Manhatten -> share same downsides.
*/
/**
 * Computes the dot product between two vectors.
 * @param {Array} vecA Array symbolizing a vector.
 * @param {Array} vecB Array symbolizing a vector.
 * @returns dot product of two vectors.
 */
export function dotProduct(vecA, vecB) {
    let result = 0;
    if(vecA.length === vecB.length) { // Require equal length vectors to avoid undefined.
        for (let i = 0; i < vecA.length; i++) { // Multiply each index in each array and add it to result.
            result += vecA[i] * vecB[i];
        }
        return result;
    } else {
        throw new Error("Vectors must have equal length to compute dot product.")
    }
}

/**
 * Computes similarity between vectors
 * @param {Array} vecA Array symbolizing a vector.
 * @param {Array} vecB Array symbolizing a vector.
 * @returns Similarity between two vectors.
 */
export function cosineSimilarity(vecA, vecB) {
    const normA = Math.sqrt(dotProduct(vecA, vecA)); // Get the norm of vector A.
    const normB = Math.sqrt(dotProduct(vecB, vecB)); // Get the norm of vector B.
    if (normA === 0 || normB === 0) return 0; // Avoid divison by zero.
    return dotProduct(vecA, vecB) / (normA * normB); // SLIAL Block 1 Self-Study slide 19.
}

async function recommendProducts() {
    try {
        const response = await fetch(`userInteractions`);
        const data = await response.json();
        
        // Choose the user recieveing recommendations (change this to test!)
        const targetUserId = 1;

        /* Step 1: Build user item matrix */
        /* Rows = Users, Columns = Items, if cell === 1 user has bought/favorited item else 0. */
        // NOTE: "..." is called the spread operator. It spreads the set into an array. See material for more info
        const users = [...new Set(data.map(index => index.account_id))]; // Map each account_id into its own set, then turn it into an array.
        const products = [...new Set(data.map(index => index.product_item_id))]; // Map each product item into its own set, then turn it into an array.
        
        // Find the index of the target user in the users array
        const targetUserIndex = users.indexOf(targetUserId);

        // Create user item matrix
        const userItemMatrix = users.map(userId => { // For each user return whether they have interacted with product
            return products.map(productId => {  // For each product, run if else check.
                if (data.some(index => index.account_id === userId && index.product_item_id === productId)) { // Check if interaction between user and product exists.
                    return 1;
                } else {
                    return 0;
                }
            })
        });

        /* Step 2: Find similar users */
        // Find similarities between users
        const similarities = users.map((currentUserId, currentIndex) => {
            //If not same user, compare.
            if (currentIndex !== targetUserIndex) { // Return object including userid and similarity
                return {
                    user: currentUserId,
                    similarity: cosineSimilarity(userItemMatrix[targetUserIndex], userItemMatrix[currentIndex]) // Choose two rows in the matrix to compare, i.e. both will be represented as vectors.
                };
            } else {
                return null; // return null when it is the same user
            }
        }).filter(result => result !== null); // Filter array to not include null.

        /* Step 3: Recommend products */
        // Find most similar user by sorting list
        const mostSimilarUsers = similarities.sort((a,b) => b.similarity - a.similarity).slice(0,3);

        if (mostSimilarUsers.length > 0) {
            const productRec = new Set(); // Use Set to avoid duplicates

            for (const similarUser of mostSimilarUsers) {
                const similarUserIndex = users.indexOf(similarUser.user);

                products.forEach((productId, index) => {
                    if (userItemMatrix[similarUserIndex][index] === 1 &&
                        userItemMatrix[targetUserIndex][index] === 0) {
                        productRec.add(productId); // Add unique recommendations
                    }
                });
            }

            const productRecArr = [...productRec] // Make set of recommendations into array.
            console.log(`Recommended products for user ${targetUserId}:`, productRecArr);

        // Get products from database
        const response2 = await fetch('recProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_id: productRecArr })
        });
        
        const data2 = await response2.json();
        console.log("Product data from DB:", data2);

            // Show recommended products.
            let recdiv = document.querySelector('#rec');
            recdiv.style.display = 'grid';

            for (const item of data2) {
                displayItem(item.title, item.price, item.img, item.id, 'rec');
            }
        } else {
            console.log("No similar users found for recommendation.")
        }
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

//skriv kommentar, og eventuelt hvor man får det fra. (pt. html routes)
//Hvis man ikke har været med til at lave det, kan det være uoverskueligt at finde hvor /allproducts kommer fra.
async function fetchAndDisplayItems() {
    try {
        const response = await fetch(`all${urlParams.get('type')}s`);
        const data = await response.json();
        console.log(data);
        const itemType = urlParams.get('type'); // Check whether it is products or events.

        // Decide whether to display date or price of item.
        let getValue;
        if (itemType === 'product') {
            getValue = (item) => item.price;
        } else {
            formatDates(data, 'date', 'newDate')
            getValue = (item) => item.newDate;
        }

        // Display event or product depending on input
        for (const item of data) {
            displayItem(item.title, getValue(item), item.img, item.id, 'displayer');
        }
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

async function fetchAndDisplayFilteredItems(id) {
    try {
        const response = await fetch(`filteredProducts/${id}`)
        const data = await response.json();        
        
        // Display filtered items
        for (const item of data) {
            displayItem(item.title, item.price, item.img, item.id, 'displayer');
        }
    } catch (error) {
        console.error("Error fetching or processing data", error);
    }
}

async function fetchAndDisplaySearchedItems(searchWord) {

    try {
        const response = await fetch(`searchedProducts/${searchWord}`)
        const data = await response.json();
        
        // Display searched items
        for (const item of data) {
            displayItem(item.title, item.price, item.img, item.id, 'displayer');
        }
    } catch (error) {
        console.error("Error fetching or processing data", error);
    }
}

async function fetchAndDisplayCategories() {
    try {
        const response = await fetch(`allCategories`);
        const data = await response.json();

        //Creates the sidebar with all categories
        sidebar(data);
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

async function fetchAndDisplayStores() {
    try {
        const response = await fetch(`allStoresWithEvents`);
        const data = await response.json();

        //Displays the different stores in category aside
        for (const item of data) {
            categoryDisplay(item.name, item.id);
        }
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

async function fetchAndDisplayStoreEvents(id) {
    try {
        const response = await fetch(`storeEvents/${id}`);
        const data = await response.json();

        // Display events.
        for (const item of data) {
            displayItem(item.title, item.date, item.img, item.store_id, 'displayer');
        }
    } catch (error) {
        console.error("Error fetching or processing data", error);
    }
}

async function fetchStoreOverview() {
    try {
        const response = await fetch(`allStores`);
        const data = await response.json();
        
        // Display stores
        for (const store of data) {
            displayItem(store.name, store.phone, store.img, store.id, 'displayer')
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
        for (let i = 0; i < dropdown.length; i++) {
            //This displays the div when you hover with your mouse
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
        fetchAndDisplayCategories(); //Display categories in sidebar
        if (id) {
            fetchAndDisplayFilteredItems(id); // Display filtered items
        } else if (urlParams.get('search') !== null) {
            fetchAndDisplaySearchedItems(urlParams.get('search')); // Display searched items
        } else {
            recommendProducts() // Display recommendations
            fetchAndDisplayItems(); // Display all items
        }

    }, // Display all products
    event: (id) => {
        fetchAndDisplayStores(); //Display stores in sidebar
        if (id) {
            fetchAndDisplayStoreEvents(id); // If we have an id, select items from specific store.
        } else {
             // Else display all events and stores.
            fetchAndDisplayItems(); // Display all events
        }
    },
    store: () => {
        fetchStoreOverview(); // Display all stores with name and phone number
        setHeaders('Stores', undefined); // Set the header of the page
        catergorySelector.style.display = "none"; // Remove category selector
        displayer.style.marginLeft = "0px"; // Adjust display to work with no category
    }
    // Add more mappings here if needed
};

// Extract type and id and define handler with input.
const type = urlParams.get('type');
const id = urlParams.get('sortId');
const handler = routeHandlers[type]; //Access the property 'type'

// Run the handler.
if (handler) {
    handler(id); // Calls the matched function with ID if passed.
} else {
    console.warn(`No handler defined for type: ${type}`);
}
