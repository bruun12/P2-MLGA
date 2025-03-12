document.querySelector("form").addEventListener("submit", function(event) {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    if (username === "" || password === "") {
      alert("Please enter both username and password");
      event.preventDefault();
    }
  });