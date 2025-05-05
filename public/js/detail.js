const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const detailId = urlParams.get("id");
let infoContainer = document.querySelector("#infoTop");
let galleryContainer = document.querySelector("#gallery");
let actionContainer = document.querySelector("#actionContainer");
//import dom utile functions
import { renderBtn, renderInputElem, renderTextElem, renderImgElem, renderMap} from "./dom-utils.js";

//Function that displays all functions that are both on event and product detail pages
async function commonDetail() {
  try {
    const response = await fetch(`/${urlParams.get('type')}/${detailId}`); //make sure to get the information based on the type (product/event)
    const data = await response.json();
    //insert alle text element from database
    renderTextElem("H1","Title", data.name, infoContainer);
    renderTextElem("P", "description", data.description, infoContainer);
    renderTextElem("P", "dateEvent", data.date, infoContainer);
    //insert img from database
    renderImgElem("mainImg", data.img, galleryContainer);
    //insert map if address is in the database
    getAddress();
    
  }catch (error) {
    console.error('Error:', error);
  }
}

async function eventHandler() {
  try {
    renderInputElem("emailEvent", "Insert your email", actionContainer);
    renderBtn("btnSignUpEvent", "Sign up", actionContainer);

    btnSignUpEvent.addEventListener("click", signUpBtn);
    }catch (error) {
    console.error('Error:', error);
  }
}
//få mailen til at komme med i popup
async function signUpBtn() {
    console.log("sign up btn clicked");
    let emailPromt;
 
    if(emailPromt == ""){
      prompt("Do you want to sign up with following mail:", "Enter email");
    } else if (emailPromt == null){
      prompt("Do you want to sign up with following mail:", "Enter email");
    } else{
      promts("Do you want to sign up with following mail:", "");
    }
  //get from event (via member_id) account get e*mail
  //join table customer with event, customer_id (fælles), event_id customer_email
}

//Makes a map from the data in the databse
async function getAddress() {
  const response = await fetch(`/${urlParams.get('type')}/${detailId}/address`); //make sure to get the information based on the type (product/event)
  const data = await response.json();
  console.dir(data, {depth: null});

  //filters data so the id numbers will not be part of the address search
  const excludedKeys = ['ev_id', 'add_id'];
  const filteredAddressData = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => !excludedKeys.includes(key))
  );
  const address = Object.values(filteredAddressData).join(' ');
  //insert map  with address from database
  renderMap("map", address);
}
//!!!!!!!!!!!!!!!!!!!!if not null get store_add til product


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
  store: (id) => {
    commonDetail(id);
  }
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
/* ---------------------------- GLOBAL VARIABLES  ---------------------------------------- */
//Contains all fetched product items
let allProductItems;

//User selected
let selectedVariationOptions = {};
let selectedStoreId = null;

//A subset of productItems variable above. Can be empty. After variations are chosen this is an updated array of matching items.
let variationMatchedItems = [];

//Final item after variation and store selection. Can be empty. Currently hardcoded to the first element in the mactching items array. May therefore be empty. //finalItem.product_item_id for id currently
let fullyMatchedItem;


/* ---------------------------- MAIN FLOW ---------------------------------------- */
async function productHandler() {
  try {
    //Select the general 'action' container from detail.html
    let actionContainer = document.querySelector("#actionContainer");
    
    // Fetch all data, 
    await fetchProductDetails();                            //for common data
    const variationData = await fetchProductVariations();   //for variation selectors data
    allProductItems = await fetchProductItems();               //to match against

    //Create and append the exstra DOM elements
    let variationSelector = renderVariationSelector(variationData, actionContainer);
    let storeSelector = renderStoreSelector(actionContainer);
    renderButtonElem("cartButton", "Add to Cart", actionContainer);

    //Add eventlistener to handle changes - "listen to "change" events on any <select> inside variationSelector/storeSelector"
    addDelegatedEventListener("change","select", handleVariationChange, variationSelector);
    addDelegatedEventListener("change","select", handleStoreChange, storeSelector);

    // TESTING, MAY CHANGE. Trigger change events to initialize state
    variationSelector.querySelectorAll('select').forEach(select => {
      console.log("Fired initialization event on variationSelector");
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });
    
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
    //console.log("here should all items be");
    //console.dir(data, { depth: null });
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

/* -------------------------- DOM RENDERING - HAPPENS ONCE ---------------------------------------- */
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

function renderVariationSelector(groupedVariations, parent) {

  //Create unique variationSelector element, a wrapper for all variations
  let variationSelector = document.createElement("div");
  variationSelector.setAttribute("id", "variationSelector");
  parent.appendChild(variationSelector);

  //render all variations
  for (let variation of groupedVariations) {

    //Create a wrapper for the variation in question
    let variationWrapper = document.createElement("div");
    variationWrapper.setAttribute("class", `variationWrapper`);
    
    //Create a label and select (dropdown) element for the variation, append to its variationWrapper
    let selectElement = renderSelectWLabelElem(`selectVariation:${variation.variation_id}`, variation.variation_name, variation.variation_name, variationWrapper);

    //Create options for dropdown menu from variation_options array,    //if (Array.isArray(variation.variation_options)) maybe check if array exists
    for (let option of variation.variation_options) {
      renderOptionElem(option.id, option.value, selectElement);
    }

    //Append this variation to the DOM
    variationSelector.appendChild(variationWrapper);
  }
  return variationSelector;
}

function renderStoreSelector(parent) {
  //Create unique variationSelector element, a wrapper for all variations
  let storeSelector = document.createElement("div");
  storeSelector.setAttribute("id", "storeSelector");
  parent.appendChild(storeSelector);

  let selectElement = renderSelectWLabelElem(`selectStore`, "Store", "Store", storeSelector);
  return storeSelector;
}


/* -------------------------- EVENT HANDLERS ---------------------------------------- */
function handleVariationChange(e) {
  console.log("Entered handleVariationChange");
  //The selection updated
  const selectElement = e.target;

  updateSelectedVariationOption(selectElement);
  console.log("Selected Variation Options:", selectedVariationOptions);

  variationMatchedItems = findVariationMatches(selectedVariationOptions, allProductItems);
  updateStoreOptions(variationMatchedItems);
}

//Called when the store is changed
function handleStoreChange(e) {
  console.log("Entered handleStoreChange");
  //Update the global variable, that describes which store is selected
  selectedStoreId = e.target.value;
  updateFinalItem();
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

  //Quick fake final item, for Benjamin and Markus to test
  //finalItem = variationMatchedItems[0]

  //Now prints picture associated with the product_item instead of the product
  //document.querySelector(".mainIMG").setAttribute("src", finalItem.item_img);
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

  // Clear old options clearing doesnt work
  while (selectElement.options.length > 0) {
      selectElement.remove(0);
  }

  for (let item of variationMatchedItems) {
    renderOptionElem(item.store_id, item.store_name, selectElement);
  }

  //Store options have been updated, meaning may have been updated
  if (selectElement.options.length > 0) {
    selectElement.selectedIndex = 0;
    const event = new Event('change', { bubbles: true });
    selectElement.dispatchEvent(event);
  }
}

function updateFinalItem() {
    //Should only be one, long
    const fullyMatchingItems = variationMatchedItems.filter( (varMatchingItem) => varMatchingItem.store_id == selectedStoreId);
    

  if (fullyMatchingItems.length == 1) {
      fullyMatchedItem = fullyMatchingItems[0];
      console.log("Final fully matching item: ", fullyMatchedItem);

      //Now prints picture associated with the product_item instead of the product
      document.querySelector(".mainIMG").setAttribute("src", fullyMatchedItem.item_img);
  } else if (fullyMatchingItems.length > 1) {
      console.log("fullyMatchingItems is more than one? duplicate item?");
  } else {
      console.log("No fully matching item found");
  }    
}


// Display stock price

function updateDisplay() {

  //Update the picture

  //Update the store options

  //Update maps

}

function updateStockDisplay(){

}

//  ----------------------------- Add to cart stuff ------------------------------------------




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
/**
 * Creates a label and a select (dropdown) element, appends both to the same parent supplied
 * @param {*} associatingId - for atribute of label, id attribute of select must match
 * @param {string} labelText - text displayed in the label
 * @param {string} selectName - not sure
 * @param {HTMLElement} parent - parent to attach both to
 * @returns 
 */
function renderSelectWLabelElem(associatingId, labelText, selectName, parent = document) {
   //Create a label for the select element
   let labelElement = document.createElement("label");
   labelElement.setAttribute("for", associatingId); //associates label w dropdown
   labelElement.innerText = labelText; //Display name 
   parent.appendChild(labelElement);

   //Create dropdown menu for this label 
   let selectElement = document.createElement("select");
   selectElement.setAttribute("id", associatingId); //associates dropdown w label                this is the important one!!!!!!!!!!!!
   selectElement.setAttribute("name", selectName); //maybe not needed if not using form /should it be id?
   parent.appendChild(selectElement);

   return selectElement;
}

function renderOptionElem(value, text, parent = document) {
  let optionElement = document.createElement("option");
  optionElement.setAttribute("value", value);
  optionElement.innerText = text;

  parent.appendChild(optionElement);
  return optionElement;
}

function renderButtonElem(id, text, parent = document) {
  let buttonElement = document.createElement("button");
  buttonElement.setAttribute("id", id);
  buttonElement.innerText = text;

  parent.appendChild(buttonElement);
  return buttonElement;
}