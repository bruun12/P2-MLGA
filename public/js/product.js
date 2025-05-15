
import { 
    renderButtonElem, 
    renderInputElem, 
    renderTextElem, 
    renderImgElem, 
    renderDivElem, 
    renderSelectWLabelElem, 
    renderOptionElem, 
    renderLabelElem,
    addDelegatedEventListener,
    clampQty
} from "./dom-utils.js";

import {addToCart} from "./basketfill.js";
import { loadCart } from "./cart.js";


//PRODUCT STUFF
/* ---------------------------- GLOBAL VARIABLES - DERRIVE FROM CURRENT USER CONTEXT  ---------------------------------------- */

//Contains all fetched product items, where FK product_id = searchParams
let allProductItems;

//User selected, or prefilled on load
let selectedVariationOptions = {}; //Influences variationMatchedItems
let selectedStoreId = null;
let selectedQty = 1; 


//A subset of allProductItems. Can be empty. selectedVariationOptions, this is an updated array of matching items.
let variationMatchedItems = [];

//Final item after variation and store selection. Can be empty. Currently hardcoded to the first element in the mactching items array. May therefore be empty. //finalItem.product_item_id for id currently
let fullyMatchedItem = null;




/* ---------------------------- MAIN FLOW ---------------------------------------- */
export async function productHandler(productId) {
  try {
    //Select the general 'action' container from detail.html
    let actionContainer = document.querySelector("#actionContainer");
    
    // Fetch all data                 
    const variationData = await fetchProductVariations(productId);   //For variation selectors data
    allProductItems = await fetchProductItems(productId);            //To match against

    //actionContainer UI specific to product page
    renderActionUI(variationData, actionContainer);

    //handleChange branches depending on target within actionContainer, (is <select> within variationSelector or storeSelector?)
    addDelegatedEventListener("change","select", handleChange, actionContainer);
    
    //
    initSelections();
    
  } catch (error) {
    console.error('Error in call to productHandler:', error);
  }
}



/* ---------------------------- DATA FETCHING ------------------------------------ */
async function fetchProductDetails(productId) {
  try {
    const response = await fetch(`/product/${productId}`);
    const data = await response.json();
    //console.dir(data, { depth: null });
  } catch (error) {
    console.error('Error:', error);
  }
}

/** */
async function fetchProductVariations(productId) {
  try {
    const response = await fetch(`/product/${productId}/variations`);
    const data = await response.json();
    
    //Proccess flat array into grouped and return it
    const groupedVariations = groupVariations(data);
    return groupedVariations;

  } catch (error) {
    console.error('Error: ', error);
  }
}

/** Fetches all product items, used once and resulting array is stored in global variable "allProductItems" */
async function fetchProductItems(productId) {
  try {
    const response = await fetch(`/product/${productId}/allItems`);
    const data = await response.json();
    console.log("here should all items be");
    console.dir(data, { depth: null });
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

/* -------------------------- UI RENDERING: INITIAL SETUP (HAPPENS ONCE) ---------------------------------------- */

// Creates main interactive blocks for variation, store, and cart controls. Using services of below
function renderActionUI(variationData, parentElem) {
  //Create and append the exstra DOM elements
  renderVariationSelector(variationData, parentElem);
  renderStoreSelector(parentElem);
  renderPurchaseContainer(parentElem);
}

// Preprocesses data for renderVariationSelector,  Groups variation data into structured sets per variation
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

// Renders select dropdowns and options for each variation type (e.g. size, color)
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

// Renders the store <select> dropdown, with wrapper
function renderStoreSelector(parentElem) {
  //<div> wrapper
  let storeSelector = renderDivElem({id:"storeSelector", parent: parentElem});

  //The actual <select>
  let selectElement = renderSelectWLabelElem(`selectStore`, "Store", "Store", storeSelector);
  return storeSelector;
}

// Renders the purchase panel (stock, price, add-to-cart button)
function renderPurchaseContainer(parentElem) {
  //Overall wrapper
  let purchaseContainer = renderDivElem({id:"purchaseContainer", parent: parentElem});

  //Stock info element, text set dynamically 
  renderTextElem("p", "itemStatus", "Status Info should be here", purchaseContainer);

  //Price info element
  renderTextElem("p", "itemPrice", "Price Info should be here", purchaseContainer);
  
  renderQtySelector(purchaseContainer);

  //Add to cart button
  let addToCartBtn = renderButtonElem({id: "cartButton", text: "Add to Cart", parent: purchaseContainer});
  addToCartBtn.addEventListener("click", () => { 
    addToCart(fullyMatchedItem.product_item_id, selectedQty)
  });
  addToCartBtn.addEventListener("click", loadCart);


  return purchaseContainer;
}


function renderQtySelector(parentElem) {
  let qtySelector = renderDivElem({id:"qtySelector", parent: parentElem});

  renderLabelElem({forId:"qtyInput", text: "Quantity:", parent: qtySelector});

  let inputElem = renderInputElem({id: "qtyInput", inputType: "number", defaultValue: 1, minValue: 1, parent: qtySelector})

  //Could be moved to handleChange(e), to follow the same pattern, but would also need a line to add delegated eventlistener in producthandler for "input" instead of "select" elements
  inputElem.addEventListener("change", (e) => {
    clampAndUpdateQty({
        inputElemOrSelector: e.target, 
        max: fullyMatchedItem?.stock_qty, 
        updateGlobal: true 
    });
    console.log("selectedQty:", selectedQty);
});
}

/* -------------------------- STARTING STATE ---------------------------------------- */
function initSelections() {
  // 1. Load the selected variation options from DOM
  //Collect all variation selections 
  document.querySelectorAll('#variationSelector select').forEach(select => {
    updateSelectedVariationOption(select);
  });

  filterFromVariationSelection();
}


/* -------------------------- USER INPUT & EVENT HANDLERS ---------------------------------------- */

function handleChange(e) {
  const target = e.target;

  //element.closest() traverses the element and its parents (up the tree, toward the document root) until it finds a node that matches the specified css selector, here id¨

  if (target.closest("#variationSelector")) {
    handleVariationChange(e);

  } else if (target.closest("#storeSelector")) {
    handleStoreChange(e);
  }
}
// Handles variation dropdown change, stores value and triggers downstream updates
function handleVariationChange(e) {
    //console.log("Entered handleVariationChange");

  //1. update the users selcted options {1: 9, 6: target.value}
  updateSelectedVariationOption(e.target);
  
    //console.log("Selected Variation Options:", selectedVariationOptions);

  //2. User selections have changed, update the variationMatchingItems
  filterFromVariationSelection();
}

/**  Handles store dropdown change, stores value and triggers downstream updates
 * @param {*} e 
 */
function handleStoreChange(e) {

  //1. update the users selected store
  selectedStoreId = e.target.value;

  //2. Find the final match and render
  filterFinalMatchAndRender();
}

export function clampAndUpdateQty({inputElemOrSelector, min = 1, max = 1, reset = false, updateGlobal = false}= {}){
   
    // Resolve element if input is a selector string
    const inputElem = (typeof inputElemOrSelector === "string")     //if inputElemOrSelector is of type "string"
     ? document.querySelector(inputElemOrSelector)                     //assume its a selector, querySelect the element
     : inputElemOrSelector;                                         //else, assume its a DOM element already
    
    //Early return if input element not found.
    if (!inputElem) return


    // get  minQty, maxQty, and input value
    const minQty = parseInt(inputElem.min, 10) || min;
    const maxQty = parseInt(max, 10);
    const rawVal = parseInt(inputElem.value, 10);

    // Decide on final value, and show it (skip clamping if reset is true)
    const clampedVal = reset ? minQty : clampQty(rawVal, minQty, maxQty);
    inputElem.value = clampedVal;

    //Optionally update external reference (like selectedQty)
    if (updateGlobal) {
        selectedQty = clampedVal; // Use object ref for updates
    }
    console.log(inputElem.value);
    return clampedVal; 
}



//Helper for handleVariationChange & initSelections
function updateSelectedVariationOption(selectElement) {
  //Extract the variation_id affected as integer (parseInt does conversion), assuming it's on the form "selectVariation:7"  -> replace: ("selectVariation:7") -> ("7")
  const variationId = parseInt(selectElement.id.replace("selectVariation:",""), 10); //the 10 specifies radix (base of number, i.e. not hex)

  //selectedVariationOptions is a global variable in this script
  selectedVariationOptions[variationId] = parseInt(selectElement.value, 10);

  console.log(selectedVariationOptions);
}

/* -------------------------- VARIATION & STORE MATCHING -  HAPENS MULTIPLE TIMES ---------------------------------------- */

/** Provides service for:   handleVariationChange & initSelections
 * Fully handles what happens, when a user changes variations */
function filterFromVariationSelection() {
   // console.log("entered filterFromVariationSelection")
  
  // 1. Recomputate matching product items based on user's new VARIATION selections.  filters allProductItems -> variationMatchedItems. If no match is found, variationMatchedItems = empty array.
  variationMatchedItems = findVariationMatches(selectedVariationOptions, allProductItems);

  // 2.Render store <select> options based on variation matches,  (possibly new set of items -> possibly new set of stores)
  renderStoreOptsFromMatches(variationMatchedItems);

  //´MAYBE RETHINK //SELECT A STORE
  const storeSelect = document.querySelector("#selectStore");
  selectedStoreId = storeSelect?.value || null;

  //4. Since variationMatched item has changed stores might have changed also
  filterFinalMatchAndRender();
}

//Provides service to filterFromVariationSelection
function findVariationMatches(selectedVariationOptions, allProductItems) {
  //Clear previous matching items, variations have changed
  variationMatchedItems = [];
  
  //console.log("Amount of selected options:",Object.keys(selectedVariationOptions).length);
  
  //Check all product items for a match with utility function 
  for (let productItem of allProductItems) {
    if (isProductItemMatch(selectedVariationOptions, productItem)) {
      variationMatchedItems.push(productItem);
    }
  }
  
  console.log("Items matching variations:",variationMatchedItems);
  
  return variationMatchedItems;
}

/** Utility function for findVariationMatches
 * Checks: does the provided (only one) productItem match all selected options?.
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

/** Provides service to filterFromVariationSelection
 * Updates the options available under the <select> for choosing store
 * @param {*} variationMatchedItems - Used to create one option for each
*/
function renderStoreOptsFromMatches(variationMatchedItems) {
  let selectElement = document.querySelector("#selectStore");
  
  //console.log("in renderStoreOptsFromMatches",variationMatchedItems);
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


/** Provides service for filterFromVariationSelection & handleStoreChange
 * Find final item, then show result to the user." 
 * Used in two places
 * After a user pics store manually
 * After variations have change*/
function filterFinalMatchAndRender() {
    //console.log("Entered filterFinalMatchAndRender - with selectedStoreId:", selectedStoreId)
    
  //finds the final item in
  findFullyMatchedItem();

  //new match, ensure selected qty is updated within the stock_qty
  clampAndUpdateQty({
        inputElemOrSelector: "#qtyInput", 
        max: fullyMatchedItem?.stock_qty, 
        updateGlobal: true
    });

  console.log("selectedQty:", selectedQty);
  renderItemView();
}

//Provides service to filterFinalMatchAndRender
function findFullyMatchedItem() {
  //Should only be one, long

    //console.log("Entered update final item with selectedStoreId", selectedStoreId)
    const fullyMatchingItems = variationMatchedItems.filter( (varMatchingItem) => varMatchingItem.store_id == selectedStoreId);
    

  if (fullyMatchingItems.length == 1) {
      fullyMatchedItem = fullyMatchingItems[0];
      console.log("Final fully matching item: ", fullyMatchedItem);
  } else if (fullyMatchingItems.length > 1) {
      console.warn("fullyMatchingItems is more than one? duplicate item?");
      fullyMatchedItem = fullyMatchingItems[0]; //maybe change to another criteria with stock i.e. instead of picking the first option
  } else {
      fullyMatchedItem = null;
      console.log("No fully matching item found");
  }    
}

//  ----------------------------- RENDER PRODUCT ITEM DETAILS -------------------------------------------

//** Provides service to filterFinalMatchAndRender */
function renderItemView() {
  //console.log("renderItemView")
  //If final item was not found
  if (!fullyMatchedItem) {
    //console.log("Not available screen should be")
    updateItemDisplay({
      imgSrc: "defaultImg",
      statusText: "Product not available for this combination.",
      priceText: "N/A",
      disableQtyInput: true, 
      disableCartButton: true
    });

  }  else {
    //console.log("available")

    updateItemDisplay({
      imgSrc: fullyMatchedItem.item_img ? fullyMatchedItem.item_img : "No pi_img, use product_img",

      // (condition) ? exprIfTrue : exprIfFalse
      statusText: fullyMatchedItem.stock_qty > 0 
        ? `In Stock: ${fullyMatchedItem.stock_qty}`
        : `Out of Stock ${fullyMatchedItem.stock_qty}`,
  
      priceText: fullyMatchedItem.price > 0
        ? `Price: ${fullyMatchedItem.price}`
        : `N/A`,
      disableQtyInput: (fullyMatchedItem.stock_qty <= 0),
      disableCartButton: (fullyMatchedItem.stock_qty <= 0)
    });
  }
}

//** Provides service to renderItemView */
function updateItemDisplay({imgSrc = null, statusText = "", priceText ="", disableQtyInput = false, disableCartButton = false} = {}) {
  //console.log("selected qty", selectedQty);
  //update Main Img
  const mainImgElem = document.querySelector(".mainIMG");
  if (mainImgElem && imgSrc) {
    mainImgElem.setAttribute("src", imgSrc);
  }

  //Update Status Shown
  const statusElem = document.querySelector("#itemStatus");
  if (statusElem) {
    statusElem.innerText = statusText;
  }

  //Update Price Shown
  const priceElem = document.querySelector("#itemPrice");
  if (priceElem) {
    priceElem.innerText = priceText;
  }


  //Disables cart if explicitly stated by options, otherwise defaults to false
  const qtyInputField = document.querySelector("#qtyInput")
  if (qtyInputField) {
    qtyInputField.disabled = disableQtyInput;
  }
  
  //Disables cart if explicitly stated by options, otherwise defaults to false
  const cartButton = document.querySelector("#cartButton")
  if (cartButton) {
    cartButton.disabled = disableCartButton;
  }


  //Update maps
}