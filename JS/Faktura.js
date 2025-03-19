document.querySelector("#info").addEventListener("submit", function(event) {
    let email = document.getElementById("email").value;
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let adresse = document.getElementById("adresse").value;
    let postnummer = document.getElementById("postnummer").value;
    let by = document.getElementById("by").value;

    if (email === "" || fname === "" || lname === "" || adresse === "" || postnummer === ""  || by === "") {
        alert("Udfyld alle felterne!");
        event.preventDefault();
      } else {
        saveEmail(email);
      }
  });

function saveEmail(email) {
    localStorage.setItem("email", email);
    window.location.href = "checkout.html";
}

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

function change(event) {
    event.preventDefault();
    
    let infobox = document.querySelector("#info");
    infobox.style.display = "none"   
}


document.querySelector("#fortnite").addEventListener("click", change);
