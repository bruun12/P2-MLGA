const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

/*
//Handler function to determine which element should be displayed on given pages
const detailHandlers = {
  product: () => {
    fetchData();
    fetchData2();
    fetchData3();

    console.log("Product detail product")
  }, //ABTIN function to show product in detail
  event: (id) => {
    fetchData();
    fetchData2();
    console.log("Event detail event")
  },
}

const type = urlParams.get('type');
//const commonHandler = detailCommonHandlers[type]; Skal det være en funktion istedet som kører
const detailHandler = detailHandlers[type];

if (detailHandler) {
 // commonDetail(Id) //common detail
  detailHandler(productId);
} else{
  console.error("FEJL")
}
*/

//Display for BOTH product and event
function imgDisplay(img){
  let productImg = document.createElement("img");
  productImg.setAttribute("src", img);
  productImg.setAttribute("class", "mainIMG");
  productImg.setAttribute("alt", "productPicture");
  
  let pathNImg = document.querySelector("#pathNImg");
    pathNImg.appendChild(productImg);

    return productImg;
}

function pathDisplay(path){
  let productPath = document.createElement("P");
  productPath.setAttribute("id", "path");
  
  let pathNImg = document.querySelector("#pathNImg");
  pathNImg.appendChild(productPath);
  
  productPath.innerText = path;
} 

function nameDisplay(name){
    let productName = document.createElement("P");
    productName.setAttribute("id", "name");
    
    let productAttributes = document.querySelector("#productAttributes");
    productAttributes.appendChild(productName);
    
    productName.innerText = `${name}:`;
  }

  function infoDisplay(info){
    let productInfoP = document.createElement("P");
    productInfoP.setAttribute("id", "info");
    
    let productInfo = document.querySelector("#productInfo");
    productInfo.appendChild(productInfoP);
    
    productInfoP.innerText = info;
  }
  //Display for product
  
  function priceDisplay(price){
    let productPrice = document.createElement("P");
    productPrice.setAttribute("id", "price");
    
    let productAttributes = document.querySelector("#productAttributes");
    productAttributes.appendChild(productPrice);

    productPrice.innerText = `${price}kr.`;
  }
  
  //Display for Event

//PRODUCT STUFF
async function fetchData() {
  try {
    const response = await fetch(`/product/${productId}`);
    const data = await response.json();
    //console.dir(data, { depth: null });
    
    nameDisplay(data.name);
    imgDisplay(data.img);
    
    //priceDisplay(data.price);
    
    //infoDisplay(data.stock_qty);
  
  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchData2() {
  try {
    const response = await fetch(`/product/${productId}/variations`);
    const data = await response.json();
    //console.dir(data, { depth: null });
    const groupedVariations = groupVariations(data);
    //console.dir(groupedVariations, { depth: null });
    renderVariationSelector(groupedVariations);
    //console.dir(data, { depth: null });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchData3() {
  try {
    const response = await fetch(`/product/${productId}/allItems`);
    const data = await response.json();
    //console.log("here should all items be");
    //console.dir(data, { depth: null });
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
fetchData2();
fetchData3();


function groupVariations(data) {
  // Initialize an empty object which contains all groups. 
  // Each property corresponds to one variation identified by variation-id as the key
  // Keys might be 2, 7, 99 ... Arrays would have many holes & wasted space.
  const groups = {};
  
  data.forEach(item => {

    //Deconstructing: extract properties directly into variables with the same name
    //For readability - variation_id instead of item.variation_id
    const { variation_id, variation_name, option_id, option_value } = item;
    
    /* If there does not exist a group for this variation or its value is 'falsy' (undefined, null, NaN ...)*/
    if (!groups[variation_id]) {
      //initialize this group with an object, containing properties: variation id, name, and an array for its options
      groups[variation_id] = {
        variation_id: variation_id,
        variation_name: variation_name,
        variation_options: []
      };
    }

    // Add this option to the correct variation group
    groups[variation_id].variation_options.push({
      id: option_id,
      value: option_value
    });
  });

  //console.log(Object.values(groups));

  //Convert the 'groups' object into an array of variation groups. Will not be sparse now, and easier to work with
  return Object.values(groups);
}

function renderVariationSelector(groupedVariations) {

  //Select the general 'action' container from detail.html
  let actionContainer = document.querySelector("#actionContainer");

  //Create unique variationSelector element, a wrapper for all variations
  let variationSelector = document.createElement("div");
  variationSelector.setAttribute("id", "variationSelector");
  actionContainer.appendChild(variationSelector);

  console.dir(groupedVariations, { depth: null });


  //render all variations
  for (let variation of groupedVariations) {
    console.log(variation);

    //Create a wrapper for the variation in question
    let variationWrapper = document.createElement("div");
    variationWrapper.setAttribute("class", `variationWrapper`);
    
    //Create a label for the variation to select
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", `variation${variation.variation_id}`); //associates label w dropdown
    labelElement.innerText = variation.variation_name; //Display name 

    //Create dropdown menu for this variation 
    let selectElement = document.createElement("select");
    selectElement.setAttribute("id", `variation${variation.variation_id}`); //associates dropdown w label
    selectElement.setAttribute("name", variation.variation_name); //maybe not needed if not using form /should it be id?


    //if (Array.isArray(variation.variation_options)) maybe check if array exists
    //Create options for dropdown menu from variation_options array
    for (let option of variation.variation_options) {
      let optionElement = document.createElement("option");
      optionElement.setAttribute("value", option.id);
      optionElement.innerText = option.value;

      selectElement.appendChild(optionElement);
    }

    //Append this variation to the DOM
    variationWrapper.appendChild(labelElement);
    variationWrapper.appendChild(selectElement);
    variationSelector.appendChild(variationWrapper);
  }
}