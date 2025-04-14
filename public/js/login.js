// New user (brugernavnet og password i local storage)
async function registerUser() {
    const email = document.getElementById("registerEmail").value; // Gets input from the user
    const password = document.getElementById("registerPassword").value; // Gets input from the user
    const firstname = document.getElementById("registerFirstname").value; // Gets input from the user

    const response = await fetch("http://localhost:3350/create-account", { // Sends the data to the server
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstname })
    });

    const data = await response.json(); // Converts the response to JSON
    alert(data.message);
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
        window.location.href = "https://cs-25-sw-2-05.p2datsw.cs.aau.dk/node0/"; 
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

// Viser bare passwordet til brugeren (hvis brugeren har glemt sit password) (Dette er blot et eksampel fundet på nettet)
document.getElementById("forgotpassword").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("showPasswordEmail").value;

    fetch("http://localhost:3350/show-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (response.ok) {
            alert(`Your password is: ${data.password}`);
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
});

// Funktion til at serveren hvis denne funktion skal virke 
/* app.post("/show-password", async (req, res) => {
    const { email } = req.body;

    const user = await getUserByEmail(email); // Replace with your database query
    if (user) {
        res.status(200).json({ password: user.password });
    } else {
        res.status(404).json({ message: "User not found." });
    }
});
 */



// Hvis der skal sendes en mail om nyt paassword til brugeren

/* document.getElementById("forgotPassword").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("resetEmail").value;

    fetch("http://localhost:3000/reset-password", {
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
}); */

// Hvis denne funktion skal virke, så skal serveren have denne funktion (Dette er blot et eksampel fundet på nettet)
/* app.post("/send-temp-password", async (req, res) => {
    const { email } = req.body;

    // Generate a random temporary password
    const tempPassword = crypto.randomBytes(8).toString("hex");

    // Save the hashed password to the database (pseudo-code)
    // await saveTempPasswordToDatabase(email, hashPassword(tempPassword));

    // Send the temporary password via email
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "hest@gmail.com",
            pass: "hestepassword" // En skal logge in med en mail eller oprette en ny
        }
    });

    const mailOptions = {
        from: "hest@gmail.com", // Samme mail som før
        to: email,
        subject: "Your Temporary Password",
        text: `Your temporary password is: ${tempPassword}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Temporary password sent successfully." });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send temporary password." });
    }
}); */



