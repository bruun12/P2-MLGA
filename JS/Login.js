// New user (brugernavnet og password i local storage)
async function registerUser() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    const response = await fetch("http://localhost:3000/create-account.html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message);
}

async function loginUser(username, password) {
   const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:3000/login.html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        sessionStorage.setItem("loggedInUser", JSON.stringify(data.user));
        window.location.href = "front-page.html"; 
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
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    loginUser(username, password);
});

// Check if user repeated password is the same as the first password
document.getElementById("registerPassword").addEventListener("input", function () {
    const password = document.getElementById("registerPassword").value;
    const repeatPassword = document.getElementById("repeatPassword").value;
    if (password !== repeatPassword) {
        document.getElementById("passwordMatch").innerText = "Passwords do not match";
    } else {
        document.getElementById("passwordMatch").innerText = "";
    }
});

// Handle password reset request
document.getElementById("resetPasswordForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("resetEmail").value;

    fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
});