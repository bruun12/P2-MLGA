import express from 'express';
import path from 'path';
import url from 'url';
import htmlRoutes from './routes/html-routes.js';

// Get the directory name from the current file's URL
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

//node0 port
const port = process.env.NODE0 || 3350;

//Initialize express
const app = express();

// built-in middleware for json
app.use(express.json());

//Use static files 
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', htmlRoutes);

//Reveal error if any
app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send('Something broke! Check logs');
});

// Route test
/* app.get("/", (request, response) => {
    
    response.send("Hello world");
}); */

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


//Start the server & listen on a port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
