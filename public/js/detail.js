// Import render-utilities and product handler
import { renderButtonElem, renderInputElem, renderTextElem, renderImgElem} from "./dom-utils.js";
import { productHandler } from "./product.js"


//Exstract URL Parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const type = urlParams.get('type'); //'product' or 'event'
const id = urlParams.get('id');


// DOM ELEMENTS
let infoContainer = document.querySelector("#infoTop");
let galleryContainer = document.querySelector("#gallery");
let actionContainer = document.querySelector("#actionContainer");


//Function that displays all functions that are both on event and product detail pages
async function commonDetail(type, id) {
  try {
    const response = await fetch(`/${type}/${id}`); //make sure to get the information based on the type (product/event)
    const data = await response.json();

    renderTextElem("H1","Title", data.name, infoContainer);
    renderTextElem("P", "description", data.description, infoContainer);
    renderImgElem("mainImg", data.img, galleryContainer);
    
    return data;
  }catch (error) {
    console.error('Error Loading Common Details:', error);
  }
}

// Handles rendering and actions for event detail pages
async function eventHandler(type, id ) {
  try {
    const response = await fetch(`/${type}/${id}`); //make sure to get the information based on the type (product/event)
    const data = await response.json();
    
    renderTextElem("P", "dateEvent", data.date, infoContainer);
    renderInputElem("emailEvent", "Insert your email", actionContainer);
    renderButtonElem("btnSignUpEvent", "Sign up", actionContainer);

  }catch (error) {
    console.error('Error in Event Handler:', error);
  }
}

async function signUpBtn() {
  console.log("sign up btn works");
  
  //get from event (via member_id) account get e*mail
  //join table customer with event, customer_id (fælles), event_id customer_email
}

//fetchEventData();
async function fetchEventData(id) {
  try {
    const response = await fetch(`/event/${id}`);
    const data = await response.json();
    //console.dir(data, { depth: null });
  } catch (error) {
    console.error('Error:', error);
  }
}

//Handler function to determine which element should be displayed on given pages
async function detailHandlers(type, id) {
  try {
    if(type === "product") {
      await commonDetail(type, id);
      await productHandler(id);

    } else if (type === "event") {
      await commonDetail(type, id);
      await eventHandler(type, id);
      
    } else {
      console.error(`Unknown type '${type}'`);
    }
  } catch {
    console.error("Error in detailHandlers:", error);
  }
} 

//shows information onto the page, when the document is fully loaded
addEventListener("DOMContentLoaded", detailHandlers(type, id));