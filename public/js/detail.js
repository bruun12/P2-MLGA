const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const detailId = urlParams.get("id");
let infoContainer = document.querySelector("#infoTop");
let galleryContainer = document.querySelector("#gallery");
let actionContainer = document.querySelector("#actionContainer");
//import dom utile functions
import { renderButtonElem, renderInputElem, renderTextElem, renderImgElem, renderDivElem, renderSelectWLabelElem, renderOptionElem} from "./dom-utils.js";

//Function that displays all functions that are both on event and product detail pages
async function commonDetail() {
  try {
    const response = await fetch(`/${urlParams.get('type')}/${detailId}`); //make sure to get the information based on the type (product/event)
    const data = await response.json();

    renderTextElem("H1","Title", data.name, infoContainer);
    renderTextElem("P", "description", data.description, infoContainer);

    renderImgElem("mainImg", data.img, galleryContainer);
    
    return data;
  }catch (error) {
    console.error('Error:', error);
  }
}

async function eventHandler() {
  console.log("Entered event handler");
  try {
    const response = await fetch(`/${urlParams.get('type')}/${detailId}`); //make sure to get the information based on the type (product/event)
    const data = await response.json();
    renderTextElem("P", "dateEvent", data.date, infoContainer);
    renderInputElem("emailEvent", "Insert your email", actionContainer);
    renderButtonElem("btnSignUpEvent", "Sign up", actionContainer);

  }catch (error) {
    console.error('Error:', error);
  }
}

async function signUpBtn() {
  console.log("sign up btn works");
  
  //get from event (via member_id) account get e*mail
  //join table customer with event, customer_id (fælles), event_id customer_email
}

//fetchEventData();
async function fetchEventData() {
  try {
    const response = await fetch(`/event/${detailId}`);
    const data = await response.json();
    //console.dir(data, { depth: null });
  } catch (error) {
    console.error('Error:', error);
  }
}

//Handler function to determine which element should be displayed on given pages
const detailHandlers = {
  product: (id) => {
    commonDetail(id);
    productHandler(id);
  }, 
  event: (id) => {
    commonDetail(id);
    eventHandler(id);
    //addEventListener("click", signUpBtn);
  },
}
const type = urlParams.get('type');
const id = urlParams.get('id');
const detailHandler = detailHandlers[type];

//shows information onto the page, when the document is fully loaded
addEventListener("DOMContentLoaded", (event) => {
  if (detailHandler) {
      detailHandler(id);
  } else{
      console.error("FEJL")
  }
});







//PRODUCT STUFF
/* ---------------------------- GLOBAL VARIABLES - DETERMINE STATE ---------------------------------------- */
//Contains all fetched product items
let allProductItems;

//User selected
let selectedVariationOptions = {};
let selectedStoreId = null;

//A subset of productItems variable above. Can be empty. After variations are chosen this is an updated array of matching items.
let variationMatchedItems = [];

//Final item after variation and store selection. Can be empty. Currently hardcoded to the first element in the mactching items array. May therefore be empty. //finalItem.product_item_id for id currently
let fullyMatchedItem = null;


/* ---------------------------- MAIN FLOW ---------------------------------------- */
async function productHandler() {
  try {
    //Select the general 'action' container from detail.html
    let actionContainer = document.querySelector("#actionContainer");
    
    // Fetch all data,                      
    const variationData = await fetchProductVariations();   //For variation selectors data
    allProductItems = await fetchProductItems();            //To match against

    //actionContainer UI specific to product page
    renderActionUI(variationData, actionContainer);

    //handleChange branches depending on target within actionContainer, (is <select> within variationSelector or storeSelector?)
    addDelegatedEventListener("change","select", handleChange, actionContainer);
    

    //POSSIBLY CHANGE IMPLEMENTATION: Trigger "change" events to initialize state with pre-chosen options. Targets: all the variationSelector's <select> children & storeSelector's <select> child
    initSelections();
    
  } catch (error) {
    console.error('Error while fetching data or rendering:', error);
  }
}



/* ---------------------------- FETCH DECLARATIONS------------------------------------ */
async function fetchProductDetails() {
  try {
    const response = await fetch(`/product/${detailId}`);
    const data = await response.json();
    //console.dir(data, { depth: null });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchProductVariations() {
  try {
    const response = await fetch(`/product/${detailId}/variations`);
    const data = await response.json();
    
    //Proccess flat array into grouped and return it
    const groupedVariations = groupVariations(data);
    return groupedVariations;

  } catch (error) {
    console.error('Error: ', error);
  }
}

async function fetchProductItems() {
  try {
    const response = await fetch(`/product/${detailId}/allItems`);
    const data = await response.json();
    console.log("here should all items be");
    console.dir(data, { depth: null });
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

/* -------------------------- DOM RENDERING - HAPPENS ONCE ---------------------------------------- */

function renderActionUI(variationData, parentElem) {
  //Create and append the exstra DOM elements
  renderVariationSelector(variationData, parentElem);
  renderStoreSelector(parentElem);
  renderPurchaseContainer(parentElem);
}

function groupVariations(data) {
  /* Initialize an empty object which contains all groups. 
  Each property corresponds to one variation identified by variation-id as the key
  Keys might be 2, 7, 99 ... Arrays would have many holes & wasted space.*/
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

  //Convert the 'groups' object into an array of variation groups. Will not be sparse now, and easier to work with
  return Object.values(groups);
}

function renderVariationSelector(groupedVariations, parentElem) {

  //Unique variationSelector div, a wrapper for all variation related selections
  let variationSelector = renderDivElem({id:"variationSelector", parent: parentElem});

  //Render all variations
  for (let variation of groupedVariations) {

    //Wrapper for current variation
    let variationWrapper = renderDivElem({className:"variationWrapper", parent: variationSelector});
    
    //Label and select (dropdown) element for current, append to its variationWrapper
    let selectElement = renderSelectWLabelElem(`selectVariation:${variation.variation_id}`, variation.variation_name, variation.variation_name, variationWrapper);

    //Options for dropdown menu, from variation_options array,    //if (Array.isArray(variation.variation_options)) maybe check if array exists
    for (let option of variation.variation_options) {
      renderOptionElem(option.id, option.value, selectElement);
    }
  }
  return variationSelector;
}

function renderStoreSelector(parentElem) {
  //<div> wrapper
  let storeSelector = renderDivElem({id:"storeSelector", parent: parentElem});

  //The actual <select>
  let selectElement = renderSelectWLabelElem(`selectStore`, "Store", "Store", storeSelector);
  return storeSelector;
}

function renderPurchaseContainer(parentElem) {
  //Overall wrapper
  let purchaseContainer = renderDivElem({id:"purchaseContainer", parent: parentElem});

  //Stock info element, text set dynamically 
  renderTextElem("p", "stockInfo", "Stock Info should be here", purchaseContainer);

  //Price info element
  renderTextElem("p", "priceInfo", "Price Info should be here", purchaseContainer);

  //Add to cart button
  renderButtonElem("cartButton", "Add to Cart", purchaseContainer);

  return purchaseContainer;
}



/* -------------------------- EVENT HANDLERS ---------------------------------------- */
function initSelections() {
  // 1. Load the selected variation options from DOM
  //Collect all variation selections 
  document.querySelectorAll('#variationSelector select').forEach(select => {
    updateSelectedVariationOption(select);
  });

  updateVariationMatches();
  /*
  
  // 2. Compute variation matching items based on the selections, (DO NOT render UI yet)
  variationMatchedItems = findVariationMatches(selectedVariationOptions, allProductItems);


  // 3. Populate the store dropdown, triggers storechange event and we should be golen
  updateStoreOptions(variationMatchedItems);

  // --- 4. Read current store selection from DOM
  const storeSelect = document.querySelector("#selectStore");
  selectedStoreId = storeSelect?.value || null;

  // --- 5. Finalize matched item and render everything
  updateFinalMatchAndRender();*/
}

function handleChange(e) {
  const target = e.target;

  //element.closest() traverses the element and its parents (up the tree, toward the document root) until it finds a node that matches the specified css selector, here id¨

  if (target.closest("#variationSelector")) {
    handleVariationChange(e);

  } else if (target.closest("#storeSelector")) {
    handleStoreChange(e);
  }
}

function handleVariationChange(e) {
    console.log("Entered handleVariationChange");

  //1. update the users selcted options {1: 9, 6: target.value}
  updateSelectedVariationOption(e.target);
  
    console.log("Selected Variation Options:", selectedVariationOptions);

  //2. User selections have changed, update the variationMatchingItems
  updateVariationMatches();
}

/**  user changes store
 * @param {*} e 
 */
function handleStoreChange(e) {
    console.log("Entered handleStoreChange");

  //1. update the users selected store
  selectedStoreId = e.target.value;

    console.log("in handleStoreChange, selectedStoreId=", selectedStoreId);

  //2. Find the final match and render
  updateFinalMatchAndRender();
}

/** Fully handles what happens, when a user changes variations */
function updateVariationMatches() {
    console.log("entered updateVariationMatches")
  
  // 1. Recomputate matching product items based on user's new VARIATION selections.  filters allProductItems -> variationMatchedItems. If no match is found, variationMatchedItems = empty array.
  variationMatchedItems = findVariationMatches(selectedVariationOptions, allProductItems);

  // 2.Render store <select> options based on variation matches,  (possibly new set of items -> possibly new set of stores)
  updateStoreOptions(variationMatchedItems);

  //WHY DO I NEED THIS
  const storeSelect = document.querySelector("#selectStore");
  selectedStoreId = storeSelect?.value || null;

  //4. Since variationMatched item has changed stores might have changed also
  updateFinalMatchAndRender();
}

/** Find final item, then show result to the user." 
 * Used in two places
 * After a user pics store manually
 * After variations have change*/
function updateFinalMatchAndRender() {
    console.log("entered updateFinalMatch and render with selectedStoreId:", selectedStoreId)
    
  //finds the final item in
  updateFinalItem();
  renderUIfromState();
}


function updateSelectedVariationOption(selectElement) {
  //Extract the variation_id affected as integer (parseInt does conversion), assuming it's on the form "selectVariation:7"  -> replace: ("selectVariation:7") -> ("7")
  const variationId = parseInt(selectElement.id.replace("selectVariation:",""), 10); //the 10 specifies radix (base of number, i.e. not hex)

  //selectedVariationOptions is a global variable in this script
  selectedVariationOptions[variationId] = parseInt(selectElement.value, 10);

}


/* -------------------------- MATCHING AND SELECTION -  HAPENS MULTIPLE TIMES ---------------------------------------- */

function findVariationMatches(selectedVariationOptions, allProductItems) {
  //Clear previous matching items, variations have changed
  variationMatchedItems = [];

  console.log("Amount of selected options:",Object.keys(selectedVariationOptions).length);

  //Check all product items for a match with utility function 
  for (let productItem of allProductItems) {
    if (isProductItemMatch(selectedVariationOptions, productItem)) {
      variationMatchedItems.push(productItem);
    }
  }

  console.log("Items matching variations:",variationMatchedItems);

  return variationMatchedItems;
}

/**
 * Utility function checking: does the provided (only one) productItem match all selected options?.
 * @param {Object} selectedVariationOptions - The selected variation options (e.g., {1: 2, 2: 4})
 * @param {Object} productItem - A single product item, including its variation_config
 * @returns {boolean} - true if it matches, false otherwise
 */
function isProductItemMatch(selectedVariationOptions, productItem) {
  const config = productItem.variation_config;

  //if the amount of selected options don't match the length of a productItems variations, they cant match

  if (Object.keys(selectedVariationOptions).length !== Object.keys(config).length) {
    console.log("Length of selected options, dont match length of productitem")
    return false;
  }

  for (let variationId in selectedVariationOptions) {
    //Immediately false on the first mismatch found
    if (selectedVariationOptions[variationId] !== config[variationId]) {
      return false; 
    }
  }
  //Not a single mismatch -> all matched
  return true;
}

/**
 * Updates the options available under the <select> for choosing store
 * @param {*} variationMatchedItems - Used to create one option for each
 */
function updateStoreOptions(variationMatchedItems) {
  let selectElement = document.querySelector("#selectStore");

  console.log("in update Store options varMatched items",variationMatchedItems);
  if (variationMatchedItems.length == 0) {
    selectElement.disabled = true;
    return;
  }

  selectElement.disabled = false;

  // Clear old options clearing doesnt work
  while (selectElement.options.length > 0) {
      selectElement.remove(0);
  }

  variationMatchedItems.forEach( item => {
    renderOptionElem(item.store_id, item.store_name +` - Price: ${item.price}`+ ` - Stock: ${item.stock_qty}`, selectElement);
  });

  //Store options have been updated, meaning may have been updated
  if (selectElement.options.length > 0) {
    selectElement.selectedIndex = 0;
  }
}

function updateFinalItem() {
    //Should only be one, long

    console.log("Entered update final item with selectedStoreId", selectedStoreId)
    const fullyMatchingItems = variationMatchedItems.filter( (varMatchingItem) => varMatchingItem.store_id == selectedStoreId);
    

  if (fullyMatchingItems.length == 1) {
      fullyMatchedItem = fullyMatchingItems[0];
      console.log("Final fully matching item: ", fullyMatchedItem);
  } else if (fullyMatchingItems.length > 1) {
      console.log("fullyMatchingItems is more than one? duplicate item?");
  } else {
      fullyMatchedItem = null;
      console.log("No fully matching item found");
      
  }    
}


//  ----------------------------- RENDEr - Updates from state  ------------------------------------------

// Display stock price

function renderUIfromState() {
  console.log("renderUIFromState")
  //If final item was not found
  if (!fullyMatchedItem) {
    console.log("Not available screen should be")
    updateDisplay({ stockQty: "Not available", itemPrice: "N/A", disableCartButton: true });
  }  else {
    console.log("available")
    updateDisplay({
      imgSrc: fullyMatchedItem.item_img,
      stockQty: fullyMatchedItem.stock_qty,
      itemPrice: fullyMatchedItem.price,
      disableCartButton: (fullyMatchedItem.stock_qty <= 0)
    });
  }
}

function updateDisplay({imgSrc, stockQty, itemPrice, disableCartButton = false} = {}) {
  updateMainImg(imgSrc);

  updateStockInfo(stockQty);

  updatePriceInfo(itemPrice);
  
  //Disables cart if explicitly stated by options, otherwise defaults to false
  document.querySelector("#cartButton").disabled = disableCartButton;

  //Update maps
}

function updateMainImg(src) {
  //Only update if the src is defined/not null, otherwise keep previous
  if (src) {
    document.querySelector(".mainIMG").setAttribute("src", src);
  }
}

function updateStockInfo(stock) {
  const stockElem = document.querySelector("#stockInfo");
  
  if (stock > 0) {
    stockElem.innerText = `In stock: ${stock}`;
  } else {
    stockElem.innerText = `Out of stock: ${stock}`;
  }
}

function updatePriceInfo(price) {
  const priceElem = document.querySelector("#priceInfo");
  
  if (price > 0) {
    priceElem.innerText = `Price: ${price}kr`;
  } else {
    priceElem.innerText = ``;
  }
}




/* -------------------------- GENERAL HELPER DECLARATIONS - HAPENS MULTIPLE TIMES ---------------------------------------- */

//Helper function to streamline event listeners with event delegation, modular
/**
 * Adds a delegated event listener to a specified parent element.
 * The event only triggers when the target element matches the given selector
 * Useful for dynamically created elements.
 * 
 * @param {string} type - The type of event (e.g., "click", "input").
 * @param {string} selector - The CSS selector to match elements.
 * @param {function} callback - The function to execute when the event fires.
 * @param {HTMLElement} [parent=document] - The parent element to attach the event to.
 */
function addDelegatedEventListener(type, selector, callback, parent = document){
  parent.addEventListener(type, (e) => {
    if (e.target.matches(selector)){
      callback(e);
    }
  });
}
