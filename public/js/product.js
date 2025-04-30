const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const detailId = urlParams.get("id");

//import dom utile functions
import { renderBtn, renderInputElem, renderTextElem, renderImgElem} from "./dom-utils.js";

//Function that displays all functions that are both on event and product detail pages
async function commonDetail() {
  try {
    const response = await fetch(`/${urlParams.get('type')}/${detailId}`); //make sure to get the information based on the type (product/event)
    const data = await response.json();
    
    renderImgElem("mainImg", data.img);
    renderTextElem("P", "description", data.description);

    return data;
  }catch (error) {
    console.error('Error:', error);
  }
}

async function productRenderDetail() {
  try {
    const response = await fetch(`/${urlParams.get('type')}/${detailId}`); //make sure to get the information based on the type (product/event)
    const data = await response.json();
    renderTextElem("H1","Title", data.name);
    //ABTIN indsætter sine funktioner her
  }catch (error) {
    console.error('Error:', error);
  }
}

async function eventRenderDetail() {
  try {
    const response = await fetch(`/${urlParams.get('type')}/${detailId}`); //make sure to get the information based on the type (product/event)
    const data = await response.json();
    renderTextElem("H1","titleEvent", data.title);
    renderTextElem("P", "dateEvent", data.date);
    renderInputElem("emailEvent", "Insert your email");
    renderBtn("btnSignUpEvent", "Sign up");

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
    productRenderDetail(id);
  }, 
  event: (id) => {
    commonDetail(id);
    eventRenderDetail(id);
    addEventListener("click", signUpBtn);
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
