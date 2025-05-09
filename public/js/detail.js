const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const detailId = urlParams.get("id");
let infoContainer = document.querySelector("#infoTop");
let galleryContainer = document.querySelector("#gallery");
let actionContainer = document.querySelector("#actionContainer");
//import dom util functions
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
    renderInputElem("inputEmailEvent", "Insert your email", actionContainer);
    renderBtn("btnSignUpEvent", "Sign up", actionContainer);

    btnSignUpEvent.addEventListener("click", signUpBtn);
    } catch (error) {
    console.error('Error:', error);
  }
}

async function signUpBtn() {
  const response = await fetch(`/${urlParams.get('type')}/${detailId}/accounts`);//der skal laves en sti der finder memberid ud fra mail
  const data = await response.json();
  console.dir(data);
  
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
    if (confirm("Do you want to sign up for the event with the email: " + emailInput)) {
      console.log("Account: " + matchedAccount.id + " with email: " + matchedAccount.email + ". Ready to sign up")
      addEventMember(1,2);
    } else {
      alert("You have NOT signed up for the event")
    }
  } else {
    alert("The email; " + emailInput + " is not a member. Please use an email which is a memeber to sign up for the event.")
  }
}

async function compareEmails(emailDatabase, emailInput) {
  console.log("Compare:" + emailInput + "to:" + emailDatabase);
  return emailInput === emailDatabase; //return true if a match is found
}

//!!!!!!!!!Virker ikke helt,  men du er nået hertil til find i de andre filer med ============
//Kig på ting der ikke bruges og evt slet...
//add en member to event_member table
async function addEventMember(eventId, accountId) {
  const response = await fetch(`/${urlParams.get('type')}/${detailId}/eventMember`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ eventId, accountId})
  });
  console.log("Check for eventId: " + eventId +" accountId: " + accountId);
    
  const result = await response.json();
  if(result.success) {
    console.log("succesfully add to event_member");
  }else {
    console.error(result.error);
    console.log("error adding to event-member");
  }
}

//Makes a map from the data in the database
//!!!!!!!!!!!!!!  if not null get store_add til product
async function getAddress() {
  try {
    const response = await fetch(`/${urlParams.get('type')}/${detailId}/address`); //make sure to get the information based on the type (product/event)
    const data = await response.json();
    //console.dir(data, {depth: null});

    //filters data so the id numbers will not be part of the address search
    const excludedKeys = ['ev_id', 'add_id', 'st_id'];
    const filteredAddressData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => !excludedKeys.includes(key))
    );
    const address = Object.values(filteredAddressData).join(' ');
    //insert map  with address from database
    renderMap("map", address);
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