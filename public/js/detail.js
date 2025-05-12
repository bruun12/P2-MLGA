// Import render-utilities and product handler
import { renderButtonElem, renderInputElem, renderTextElem, renderImgElem, renderMap} from "./dom-utils.js";
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
    //insert alle text element from database
    renderTextElem("H1","Title", data.name, infoContainer);
    renderTextElem("P", "description", data.description, infoContainer);
    //insert img from database
    renderImgElem("mainImg", data.img, galleryContainer);
    //insert map if address is in the database
    getAddress();
    
  }catch (error) {
    console.error('Error Loading Common Details:', error);
  }
}

// Handles rendering and actions for event detail pages
async function eventHandler(id) {
  try {
    renderInputElem({id: "inputEmailEvent", placeholder: "Insert your email", parent: actionContainer});
    let button = renderButtonElem({id: "btnSignUpEvent", text: "Sign up", parent: actionContainer});

    button.addEventListener("click", (id) => signUpBtn(id));
    } catch (error) {
    console.error('Error in Event Handler', error);
  }
}

async function signUpBtn(id) {
  const response = await fetch(`/event/${id}/accounts`);//der skal laves en sti der finder memberid ud fra mail
  const data = await response.json();
  
  let emailInput = document.getElementById("inputEmailEvent").value.trim(); //Gets the value from the inputfield. Removes the whitespace with .trim
  let matchedAccount = null; //variable to determine if an email matched the input to the database members

  //Checks if the input email is also in the database. Goes through all account is the array data
  for (const account of data) {
    if (await compareEmails(account.email, emailInput)) { //when true it assigns the matched account to the variable matchedAccount
      matchedAccount = account;
      break;
    }
  }

  //if there is a matching email in the database the account can sign up for an event
  if (matchedAccount){
    //if(matchedAccount.member_id !== null){}
    let matchedAccountId = matchedAccount.id;

    if (confirm("Do you want to sign up for the event with the email: " + emailInput)) {
      addEventMember(matchedAccountId);
    } else {
      alert("You have NOT signed up for the event")
    }
  } else {
    alert("The email " + emailInput + " is not a member.\nPlease use an email which is a member to sign up for the event.")
  }
}

async function compareEmails(emailDatabase, emailInput) {
  return emailInput === emailDatabase; //return true if a match is found
}

//add a member to event_member table
async function addEventMember(accountId) {
  const response = await fetch(`/${urlParams.get('type')}/${id}/eventMember`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ id, accountId})
  });
 
  const result = await response.json();
  if(result.success) {
    console.log("Succesfully added to event_member");
  }else {
    console.error("error adding to event-member", error);
  }
}


//Makes a map from the data in the database
async function getAddress() {
  try {
    const response = await fetch(`/${urlParams.get('type')}/${id}/address`); //make sure to get the information based on the type (product/event)
    const data = await response.json();

    //filters data so the id numbers will not be part of the address search
    const excludedKeys = ['ev_id', 'add_id', 'st_id'];
    const filteredAddressData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => !excludedKeys.includes(key))
    );
    const address = Object.values(filteredAddressData).join(' ');
    console.log(address);
    //insert map  with address from database
    if(address != "address not found for store :-("){
      renderMap("map", address);
    } else (
      console.error("ERROR: addresss is not found for the product", error)
    )
  } catch (error) {
    console.error('Error fetching the address', error);
  }
}


//Handler function to determine which element should be displayed on given pages //LAV FOR STORE
async function detailHandlers(type, id) {
  try {
    if(type === "product") {
      await commonDetail(type, id);
      await productHandler(id);

    } else if (type === "event") {
      await commonDetail(type, id);
      await eventHandler(id);

    } else if (type === "store") {
      await commonDetail(type, id);      
    } else {
      console.error(`Unknown type '${type}'`);
    }
  } catch {
    console.error("Error in detailHandlers:", error);
  }
} 

//shows information onto the page, when the document is fully loaded
addEventListener("DOMContentLoaded", () => {detailHandlers(type, id)});