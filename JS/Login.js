const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    checkInputs();
};







document.querySelector("form").addEventListener("submit", function(event) {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    if (username === "" || password === "") {
      alert("Please enter both username and password");
      event.preventDefault();
    }
  });

  //Lille test funktion
  window.attempt = 4;
  function validate(){
        if (username === "ElskerNorskeMænd" && password === "12345678") {
            alert("Login succesfully");
            window.location = "Brugerprofil.html"; // Dette skal ændres når de andre sider er færdige
            return false;
        } else {
            window.attempt--;
            alert("Du har kun " + window.attempt + "forsøg tilbage")
            if (attempt === 0) {
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true; 
            document.getElementById("login").disabled = true;
            return false;
            } 
        }
    };
