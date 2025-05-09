import { getCart } from '../js/basketfill.js'

// This script handles the form submission and validation for the information page
document.querySelector("#info").addEventListener("submit", function(event) {
    let email = document.getElementById("email").value;
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let adresse = document.getElementById("adresse").value;
    let postnummer = document.getElementById("postnummer").value;
    let by = document.getElementById("by").value;

// Validation to check if all fields are filled, if not, alert the user, if yes, save the email and redirect to invoice.html
    if (email === "" || fname === "" || lname === "" || adresse === "" || postnummer === ""  || by === "") {
        alert("Udfyld alle felterne!");
        event.preventDefault();
      } else {
        saveEmail(email);
      }
  });

// Function to save and redirect to invoice.html
function saveEmail(email) {
    localStorage.setItem("email", email);
    window.location.href = "invoice.html";
}

// Promo code function
function rabat() {
    const rabatInput = document.getElementById("rabat").value; // Get the value of the input field
    if (rabatInput === "NorskSnack")
        alert("25% af din ordrer, den er 'mums'fri + fri fragt på the 'package'")
    if (rabatInput === "timler20") {
        alert("hvaaa du syns nok det lækkert med 20% af prisen din lille gris");
    } else {
        alert("1 forsøg tilbage eller du bliver data scraped");
    }
}


let basket=document.querySelector("#basket"); 

function getCookie(name){
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let result = null;
    
    cArray.forEach(element => {
        if(element.indexOf(name) == 0){
            result = element.substring(name.length + 1)
        }
    })
    return result;
} 

let checkOutBtn = document.querySelector("#maddog");
checkOutBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const cart = getCart(); // Get cart from cookies
    const items = Object.values(cart).map(item => ({ // Create object matching stripe requirements
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.cartQty
    }))

    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items })
    }).then(res => {
        if (res.ok) return res.json();
        return res.json().then(json => Promise.reject(json));
    }).then(({ url }) => {
        window.location = url
    }).catch(error => {
        console.error(error.error);
    });
});