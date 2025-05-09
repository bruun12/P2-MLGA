/* Defines the API endpoints and maps them to the appropriate controller functions */
/* Responsible for routing HTTP methods (GET, POST, PUT, DELETE, etc.) to their corresponding handlers */
import express from 'express';
import path from 'path';
import url from 'url';
//Importing database functions
import { getProducts, getCategories, getFilteredProducts, getSearchedProducts, getProductItemById, getUserInteractions, getRecommendedProducts } from '../controllers/product-controller.js';

import { getEvents, getStoresWithEvents, storeEvents } from '../controllers/event-controller.js';
import { getStores } from "../controllers/store-controller.js";

import { getAllProductItems, getProductDetails, getVariationData } from '../controllers/product-controller4Tim.js'
import { getEventDetails } from '../controllers/product-controller4Tim.js';

// Get the directory name from the current file's URL
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const router = express.Router();

// Frontpage
router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'front-page.html'));
});


// Product pages in some regard
router.get("/overview", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'overview.html'));
});

router.get("/detail", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'detail.html'));
});


//account administration 
router.get("/login", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});

router.get("/profile", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'profile-page.html'));
});

router.get("/create-account", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'create-account.html'));
});

router.get("/forgot-password", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'forgot-password.html'));
});

router.get("/admin", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'adminPages', 'adminFrontPage.html'));
});

router.get("/addProducts", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'adminPages', 'addProductPage.html'));
});

router.get("/createStore", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'adminPages', 'createStorePage.html'));
});


// Checkout
router.get("/basket", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'invoice.html'));
});

router.get("/success", (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'html', 'success.html'));
});

//Endpoint used in product-overview.js. Receives internal get request and routes it to getProducts from the product-controller, which handles it.
router.get("/allProducts", getProducts);

router.get("/filteredProducts/:id", getFilteredProducts);

router.get("/searchedProducts/:searchword", getSearchedProducts);

router.get("/ProductItemById/:id", getProductItemById)

/* Endpoint /allEvents also used in front-page.js for slideshow */
router.get("/allEvents", getEvents);

router.get("/allStoresWithEvents", getStoresWithEvents);

router.get("/storeEvents/:id", storeEvents);

router.get("/allCategories", getCategories);

// Used in recommendation of products.
router.get("/userInteractions", getUserInteractions);

// Used in recommendation of products.
router.post('/recProducts', getRecommendedProducts);


// Endpoints used for stores in overview.js, store-model.js, and store-controller.js
router.get("/allStores", getStores);

//KIG HER ABTIN ASTA
router.get("/product/:id", getProductDetails);
router.get("/product/:id/variations", getVariationData);
router.get("/product/:id/allItems", getAllProductItems);

router.get("/event/:id", getEventDetails);


export default router;