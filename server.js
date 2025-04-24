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

