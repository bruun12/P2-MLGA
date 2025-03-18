document.querySelector("#info").addEventListener("submit", function(event) {
    var email = document.getElementById("email").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var adresse = document.getElementById("adresse").value;
    var postnummer = document.getElementById("postnummer").value;
    var by = document.getElementById("by").value;

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
