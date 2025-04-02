// New user (brugernavnet og password i local storage)
function registerUser(username, password) {
    let users = Jason.parse(localStorage.getItem("users")) || []; 
    // Check if the username already exists

    if (!username || !password) {
        alert("Please enter a username and password.");
        return;
    }

    // Check if the user already exists
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
        alert("Username already exists. Please choose a different username.");
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered successfully!");
    return true;

}

function loginUser(username, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username and password are correct
    const validUser = users.find(user => user.username === username && user.password === password);
    if (validUser) {
        alert("Login successful!");
        sessionStorage.setItem("loggedInUser", JSON.stringify(validUser));
        window.location.href = "frontpage.html"; // Redirect to Frontpage.html
    } else {
        alert("Invalid username or password.");
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