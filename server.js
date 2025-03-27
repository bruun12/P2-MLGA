import express from 'express';

//node0 port
const port = process.env.NODE0 || 3350;

//Initialize express
const app = express();

// Use static files 
app.use(express.static('public'));

// Route test
app.get("/", (request, response) => {
    response.send("Hello world");
})

//Start the server & listen on a port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
