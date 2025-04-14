import express from 'express';
import path from 'path';
import url from 'url';
import htmlRoutes from './routes/html-routes.js';
import bcrypt from 'bcrypt'; // For password hashing
import dbPool from './database/database.js'; // For database connection


// Get the directory name from the current file's URL
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

//node0 port
const port = process.env.NODE0 || 3350;

//Initialize express
const app = express();

// built-in middleware for json
app.use(express.json());

//Use static files 
app.use(express.static(__dirname + '/public'));

app.use('/', htmlRoutes);

const password = 'password123';
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed password:', hash);
    }
});


// Route to handle account creation
app.post('/create-account', async (req, res) => {
    const { email, password, firstname } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const [result] = await dbPool.execute(
            'INSERT INTO customer (email, first_name, password) VALUES (?, ?, ?)',
            [email, firstname, hashedPassword]
        );
        res.status(201).json({ message: 'Account created successfully!' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Failed to create account.' });
    }
});

// Route to handle user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login attempt:", { email, password });

        // Fetch user from the database
        const [rows] = await dbPool.execute(
            'SELECT * FROM customer WHERE email = ?',
            [email]
        );

        console.log("Query result:", rows);

        if (rows.length === 0) {
            console.log("User not found for email:", email);
            return res.status(404).json({ message: 'User not found.' });
        }

        const user = rows[0];
        console.log("User found:", user);

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password comparison result:", isPasswordValid);

        if (!isPasswordValid) {
            console.log("Invalid credentials for user:", email);
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        res.status(200).json({ message: 'Login successful!', user: { id: user.id, email: user.email, first_name: user.first_name } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Failed to log in.' });
    }
});

(async () => {
    try {
        const [results] = await dbPool.query('SELECT 1');
        console.log('Database connection test succeeded:', results);
    } catch (err) {
        console.error('Database connection test failed:', err);
    }
})();


//Reveal error if any
app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send('Something broke! Check logs');
});

// Route test
/* app.get("/", (request, response) => {
    
    response.send("Hello world");
}); */


//Start the server & listen on a port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

