const hostname = '127.0.0.1';
const port = 3000;
let subCategoryArr = [];

//uses the query set in the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


function displayItem(name, price, img, id){
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

function categoryDisplay(name, id){
    //This checks if there is an existing subCat with the same name  
    //This makes the subCat appear on the top of the page
/*     let subCategoryTopA = document.createElement("a");
    document.querySelector("#categoryBox").appendChild(subCategoryTopA);
    subCategoryTopA.innerText = subCategory; */

    //This makes the subCat appear on the side of the page 
    let categoryA = document.createElement("a");
    categoryA.setAttribute("class", `${urlParams.get('type')}A`);
    document.querySelector("#categorySelector").appendChild(categoryA);
    categoryA.innerText = name;
    
    categoryA.href = `/overview?type=${urlParams.get('type')}&subCategory=$${id}`;
    
    //Make subCategoryDiv for subCategories

    //A box that makes the subcategories for this item.
    makeSubCategoryDiv(id, categoryA);
}

function subCategoryDisplay(name, id, parent_id){
    //get the parent    
    const container = document.querySelector(`#subCatDivId${parent_id}`);

    let subCategoryA = document.createElement("a");
    subCategoryA.setAttribute("class", `${urlParams.get('type')}A`);

    if (container) {
        container.appendChild(subCategoryA);
    } else {
    console.error(`No element found with ID: subCatDivId${parent_id}`);
    }
    
    subCategoryA.innerHTML = name;

    subCategoryA.href = `/overview?type=${urlParams.get('type')}&subCategory=$${id}`;

    makeSubCategoryDiv(id, subCategoryA);
}

function sidebar(categories) {

    for (let i = 0; i < categories.length; i++){
        if(categories[i].id === categories[i].parent_id){
            categoryDisplay(categories[i].name, categories[i].id);
        } else if (categories[i].id !== categories[i].parent_id){
            subCategoryDisplay(categories[i].name, categories[i].id, categories[i].parent_id);
        }
    }
} 


//skriv kommentar, og eventuelt hvor man får det fra. (pt. html routes)
//Hvis man ikke har været med til at lave det, kan det være uoverskueligt at finde hvor /allproducts kommer fra.
//

fetch(`/all${urlParams.get('type')}s`)
//Her omskriver vi det fra json til et array i js. Arrayet hedder "data" i næste function
.then(response => {return response.json()})
.then(data=>{
    console.log(data);
    //Vi løber igennem forløkken for alle 
    for (const item of data) {
        displayItem(item.title, item.price ,item.img, item.id);
    //subCategoryDisplay(data.products[i].subCategory, subCategoryArr);
    }
});


if (urlParams.get('type') === "product"){
    fetch(`/allCategories`)
    .then(response => {return response.json()})
    .then(data=>{
        sidebar(data); 
});
} else {
    fetch(`/allStoresWithEvents`)
    .then(response => {return response.json()})
    .then(data=>{
    
    //Vi løber igennem forløkken for alle 
    for (const item of data) {
        categoryDisplay(item.name, item.id);
    }
});
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

