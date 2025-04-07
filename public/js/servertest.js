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

    try{
        const hashedPassword = await bcrypt.hash(password, 10); // hash the password using bcrypt

        const [result] = await db.query( // insert the new user into the database
            "INSERT INTO Users (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );
        res.status(201).json({ message: "User registered successfully!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user!" });
    }
});


// Log ind som bruger
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try { 
        const [rows] = await db.query("SELECT * FROM Users WHERE username = ?", [username]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in" });
    }
});

// Start serveren
app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`);
});