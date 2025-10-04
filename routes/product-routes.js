/* Routers:
    - Defines the API endpoints and maps them to the appropriate controller functions
    - Responsible for routing HTTP methods (GET, POST, PUT, DELETE, etc.) to their corresponding handlers */

// Not sure if it's imported correctly
import { router } from 'html-routes.js';

//Endpoint used in product-overview.js. Receives internal get request and routes it to getProducts from the product-controller, which handles it.
router.get("/allProducts", getProducts);
//