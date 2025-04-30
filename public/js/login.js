// New user (brugernavnet og password i local storage)
async function registerUser() {
    try {
        const email = document.getElementById("registerEmail").value; // Gets input from the user
        const password = document.getElementById("registerPassword").value; // Gets input from the user
        const firstname = document.getElementById("registerFirstname").value; // Gets input from the user
        const lastname = document.getElementById("registerLastname").value; // Gets input from the user
        const phone = document.getElementById("registerPhone").value; // Gets input from the user

        const response = await fetch("http://localhost:3350/create-account", { // Sends the data to the server
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstname, lastname, phone })
        });

        const data = await response.json(); // Converts the response to JSON
        if (response.ok) { // If the response is ok, it means the registration was successful
            alert(data.message);
        } else {
            alert(`Error: ${data.message}`)
        }
    } catch (error) {
        console.error("Error:", error); // Logs the error to the console
        alert("An error occurred. Please try again."); // Alerts the user that an error occurred
    }

}

async function loginUser() {
    const email = document.getElementById("loginEmail").value; // Gets input from the user
    const password = document.getElementById("loginPassword").value; // Gets input from the user

    const response = await fetch("http://localhost:3350/login", { // Sends the data to the server
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (response.ok) { // If the response is ok, it means the login was successful
        alert(data.message);
        sessionStorage.setItem("loggedInUser", JSON.stringify(data.user));
        window.location.href = `https://cs-25-sw-2-05.p2datsw.cs.aau.dk/node0/profil-page.html?userId=${data.user.id}`; 
    } else {
        alert(data.message);
    }
}

// Make user login
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    registerUser();
});

// Let user login
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    loginUser();
});

// Check if user repeated password is the same as the first password
document.getElementById("registerPassword").addEventListener("input", function () {
    const password = document.getElementById("registerPassword").value; // Gets input from the user
    const repeatPassword = document.getElementById("repeatPassword").value;
    if (password !== repeatPassword) { // If the passwords do not match, show an error message
        document.getElementById("passwordMatch").innerText = "Passwords do not match";
    } else {
        document.getElementById("passwordMatch").innerText = "";
    }
});

// Hvis der skal sendes en mail om nyt paassword til brugeren

document.getElementById("forgotPassword").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("resetEmail").value;

    fetch("http://localhost:3350/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (response.ok) {
            alert(data.message);
        } else {
            alert("A temporary password has been sent to your email. " + data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
});





