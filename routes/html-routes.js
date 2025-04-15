import express from 'express';
import path from 'path';
import url from 'url';
import { getAllProducts } from '../database/database.js';
// Get the directory name from the current file's URL
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const router = express.Router();

// Frontpage
router.get("/", async (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'front-page.html'))
});


// Product pages in some regard
router.get("/product", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'product.html'))
});

router.get("/product-overview", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'product-overview.html'))
});

//account administration 
router.get("/login", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'))
});

router.get("/create-account", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'create-account.html'))
});


//Lavet af Asta til admin-add-product-page
router.get("/admin-add-products", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'admin-add-products.html'))
});

export default router;