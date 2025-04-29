import express from 'express';
import path from 'path';
import url from 'url';
import { getProductItem, getAllProducts } from '../database/database.js';

// Get the directory name from the current file's URL
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const router = express.Router();

// Frontpage
router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'front-page.html'))
});


// Product pages in some regard
router.get("/product", async (request, response) => {
    const product = await getProductItem(1);
    console.log(product);
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








































































export default router;