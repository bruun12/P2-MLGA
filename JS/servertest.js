const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors());

// Opret forbindelse til MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "", 
    database: "UserDatabase",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Forbundet til MySQL-databasen!");
});

// Registrer en ny bruger
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO Users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({ message: "Brugernavn er allerede taget!" });
            }
            return res.status(500).json({ message: "Fejl ved registrering!" });
        }
        res.status(201).json({ message: "Bruger registreret!" });
    });
});

// Log ind som bruger
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM Users WHERE username = ?";
    db.query(query, [username], async (err, results) => {
        if (err) return res.status(500).json({ message: "Fejl ved login!" });

        if (results.length === 0) {
            return res.status(400).json({ message: "Brugernavn eller adgangskode er forkert!" });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Brugernavn eller adgangskode er forkert!" });
        }

        res.status(200).json({ message: "Login succesfuldt!", user: { id: user.id, username: user.username } });
    });
});

// Start serveren
app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`);
});