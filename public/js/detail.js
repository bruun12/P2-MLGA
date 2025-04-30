const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const detailId = urlParams.get("id");
let infoContainer = document.querySelector("#info");
let galleryContainer = document.querySelector("#gallery");
let actionContainer = document.querySelector("#actionContainer");

//import dom utile functions
import { renderBtn, renderInputElem, renderTextElem, renderImgElem} from "./dom-utils.js";

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
  try {
    const response = await fetch(`/${urlParams.get('type')}/${detailId}`); //make sure to get the information based on the type (product/event)
    const data = await response.json();
    renderTextElem("P", "dateEvent", data.date, infoContainer);
    renderInputElem("emailEvent", "Insert your email", actionContainer);
    renderBtn("btnSignUpEvent", "Sign up", actionContainer);

  }catch (error) {
    console.error('Error:', error);
  }
}

async function signUpBtn() {
  console.log("sign up btn works");
  
  //get from event (via member_id) account get e*mail
  //join table customer with event, customer_id (fælles), event_id customer_email
}

fetchEventData();
async function fetchEventData() {
  try {
    const response = await fetch(`/event/${detailId}`);
    const data = await response.json();
    console.dir(data, { depth: null });
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
/* ---------------------------- Global Variables  ---------------------------------------- */
//Contains all fetched product items
let productItems;

// Initialize an empty object which gathers the users selected options GLOBAL

//Currently only concerns variation options
let selectedOptions = {};

//A subset of productItems variable above. Can be empty. After variations are chosen this is an updated array of matching items.
let matchingItems = [];

//The final item after variation and store selection. Can be empty. Currently hardcoded to the first element in the mactching items array. May therefore be empty
//finalItem.product_item_id for id currently
let finalItem;




/* ---------------------------- General flow ---------------------------------------- */
//Actually fechting
async function productHandler() {
  try {
    //Select the general 'action' container from detail.html
    let actionContainer = document.querySelector("#actionContainer");
    // Fetch all data
    fetchProductDetails();
    const variationData = await fetchProductVariations();
    productItems = await fetchProductItems();

    // Now, render the variation selectors
    let variationSelector = renderVariationSelector(variationData, actionContainer);
    renderStoreSelector(productItems, actionContainer);
    renderButtonElem("cartButton", "Click & Collect (Cart)" ,actionContainer);

    //Add eventlistener to handle changes
    /*  "listen to "change" events on any <select> inside variationSelector".*/
    addDelegatedEventListener("change","select", handleVariationChange, variationSelector);

    // TESTING: subject to change.  Fire real "change" event to initialize selectedOptions
    // Fire one custom event when all selects are rendered
        const selects = variationSelector.querySelectorAll('select');
        selects.forEach(select => {
        const event = new Event('change', { bubbles: true });
        select.dispatchEvent(event);
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
    //Proccess flat array into grouped
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
    console.dir(data, { depth: null });
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

/* -------------------------- VARIATION INITIALIZING - HAPENS ONCE ---------------------------------------- */
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

function renderVariationSelector(groupedVariations, parent) {

  //Create unique variationSelector element, a wrapper for all variations
  let variationSelector = document.createElement("div");
  variationSelector.setAttribute("id", "variationSelector");
  parent.appendChild(variationSelector);
  //console.log("checking grouped variations in rendervariation selecter");
  //console.dir(groupedVariations, { depth: null });


  //render all variations
  for (let variation of groupedVariations) {
    //console.log(variation);

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

/* -------------------------- STORE HTML ---------------------------------------- */
function renderStoreSelector(productItems, parent) {
  let selectElement = renderSelectWLabelElem(`selectStore`, "Store", "Store", parent);
}


/* -------------------------- VARIATION CHANGES - HAPENS MULTIPLE TIMES ---------------------------------------- */
function handleVariationChange(e) {
  console.log("Entered handlevar change");
  //The selection updated
  const selectElement = e.target;

  //Extract the variation_id affected as integer (parseInt does conversion), assuming it's on the form "selectVariation:7"
    //replace: ("selectVariation:7") -> ("7")
  const variationId = parseInt(selectElement.id.replace("selectVariation:",""), 10); //the 10 specifies radix (base of number, i.e. not hex)

  //selectedOptions is a global variable in this script
  selectedOptions[variationId] = parseInt(selectElement.value, 10);

  console.log(selectedOptions);

  findMatchingProductItems(selectedOptions, productItems);
  updateStoreOptions(matchingItems);
}

function findMatchingProductItems(selectedOptions, productItems) {
  //Clear previous matching items, variations have changed
  matchingItems = [];

  //Check all product items for a match with utility function 
  for (let productItem of productItems) {
    if (isProductItemMatch(selectedOptions, productItem)) {
      matchingItems.push(productItem);
    }
  }
  console.log(matchingItems);

  //Quick fake final item, for Benjamin and Markus to test
  console.log ("Printing final item");
  finalItem = matchingItems[0]
  console.dir(finalItem, { depth: null });

  return matchingItems;
}

/**
 * Utility function checking: does the provided (only one) productItem match all selected options?.
 * @param {Object} selectedOptions - The selected variation options (e.g., {1: 2, 2: 4})
 * @param {Object} productItem - A single product item, including its variation_config
 * @returns {boolean} - true if it matches, false otherwise
 */
function isProductItemMatch(selectedOptions, productItem) {
  const config = productItem.variation_config;

  for (let variationId in selectedOptions) {
    //Immediately false on the first mismatch found
    if (selectedOptions[variationId] !== config[variationId]) {
      return false; 
    }
  }
  //Not a single mismatch -> all matched
  return true;
}

/* -------------------------- Store stuff INITIALIZING - HAPENS MULTIPLE TIMES ---------------------------------------- */

/**
 * Updates the options available under the <select> for choosing store
 * @param {*} matchingItems - Used to create one option for each
 */
function updateStoreOptions(matchingItems) {
  let selectElement = document.querySelector("#selectStore");

  console.log("Entered updateStoreOptions with matching items:");
  console.dir(matchingItems, { depth: null });

    // Clear old options clearing doesnt work
  while (selectElement.options.length > 0) {
      selectElement.remove(0);
  }

  console.log("After removin options, printin selecElement.options");
  console.dir(selectElement, { depth: null });

  for (let item of matchingItems) {
    //console.dir(productItem, { depth: null });
    renderOptionElem(item.store_id, item.store_name, selectElement);
  }
}



//Called when the store is changed
function handleStoreChange(e) {
  console.log("Entered handlevar change");
  //The selection updated
  const selectElement = e.target;

}

// select particular product item ()

// Display stock price

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