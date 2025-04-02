// New user (brugernavnet og password i local storage)
async function registerUser() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    const response = await fetch("http://localhost:3000/Opretprofil.html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message);
}

async function loginUser(username, password) {
   const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        sessionStorage.setItem("loggedInUser", JSON.stringify(data.user));
        window.location.href = "frontpage.html"; 
    } else {
        alert(data.message);
    }
}

// Make user login
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    registerUser(username, password);
});

// Let user login
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    loginUser(username, password);
});