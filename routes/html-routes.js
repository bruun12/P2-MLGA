import express from 'express';
import path from 'path';
import url from 'url';
//Importing database functions
import {getAllProducts} from '../database/database.js';

// Get the directory name from the current file's URL
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const router = express.Router();

// Frontpage
router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'front-page.html'))
});


// Product pages in some regard
router.get("/product", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'product.html'))
});



router.get("/product-overview", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'product-overview.html'));
});

router.get("/data", async (request, response) => {
    //Get list of products to show
    const products = await getAllProducts();
    response.json(products);
});

//account administration 
router.get("/login", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'))
});

router.get("/create-account", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'create-account.html'))
});


export default router;