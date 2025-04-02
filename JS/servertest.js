const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Opret forbindelse til MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'UserDatabase'
});

db.connect(err => {
    if (err) throw err;
    console.log('Forbundet til MySQL-databasen!');
});

// Registrer en ny bruger
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO Users (firstname, lastname, email, username, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [firstname, lastname, email, username, hashedPassword], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Brugernavn eller email er allerede taget!' });
            }
            return res.status(500).json({ message: 'Fejl ved registrering!' });
        }
        res.status(201).json({ message: 'Bruger registreret!' });
    });
});

// Login en bruger
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM Users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Fejl ved login!' });

        if (results.length === 0) {
            return res.status(400).json({ message: 'Brugernavn eller adgangskode er forkert!' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Brugernavn eller adgangskode er forkert!' });
        }

        res.status(200).json({ message: 'Login succesfuldt!', user: { id: user.id, username: user.username } });
    });
});

// Start serveren
app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`);
});




async function registerUser() {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, username, password })
    });

    const data = await response.json();
    alert(data.message);
}



async function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        
        sessionStorage.setItem('loggedInUser', JSON.stringify(data.user));
        window.location.href = 'Brugerprofil.html'; 
    } else {
        alert(data.message);
    }
}