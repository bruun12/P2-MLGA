// New user (brugernavnet og password i local storage)
async function registerUser() {
    try {
        const email = document.getElementById("registerEmail").value; // Gets input from the user
        const password = document.getElementById("registerPassword").value; // Gets input from the user
        const firstname = document.getElementById("registerFirstname").value; // Gets input from the user
        const lastname = document.getElementById("registerLastname").value; // Gets input from the user
        const phone = document.getElementById("registerPhone").value; // Gets input from the user

        const response = await fetch("create-account", { // Sends the data to the server
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstname, lastname, phone })
        });

        const data = await response.json(); // Converts the response to JSON
        if (response.ok) { // If the response is ok, it means the registration was successful
            alert(data.message);
            window.location.href = "login"
        } else {
            alert(`Error: ${data.message}`)
        }
    } catch (error) {
        console.error("Error:", error); // Logs the error to the console
        alert("An error occurred. Please try again."); // Alerts the user that an error occurred
    }

}

async function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch('login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data.user)); // Save user data to local storage
            console.log("User data saved to localStorage:", data.user);

            window.location.href = 'https://cs-25-sw-2-05.p2datsw.cs.aau.dk/node0/profile'; // Naviger til en ny side
        } else {
            // Login failed, show error message
            alert(data.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        registerUser();
    });
}

const loginForm = document.getElementById("loginform");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        loginUser();
    });
}

const registerPassword = document.getElementById("registerPassword");
if (registerPassword) {
    registerPassword.addEventListener("input", function () {
        const password = document.getElementById("registerPassword").value;
        const repeatPassword = document.getElementById("repeatPassword").value;
        if (password !== repeatPassword) {
            document.getElementById("passwordMatch").innerText = "Passwords do not match";
        } else {
            document.getElementById("passwordMatch").innerText = "";
        }
    });
}

// Hvis der skal sendes en mail om nyt paassword til brugeren
const forgotPasswordForm = document.getElementById("forgotPassword");
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("resetEmail").value;

        fetch("forgot-password", {
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
}




