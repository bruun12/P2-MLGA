/*
Acts as the business logic layer: Contains functions or methods that process incoming requests (e.g., GET, POST, PUT, DELETE)
- Receives requests from routes.
- Validates and processes input data.
- Calls the necessary model methods to interact with the database.
- Formats the output (e.g., JSON responses) to send back to the client.
- Handles errors, authentication, or other middleware operations as required.

They decide what happens when a specific route is hit.
*/
import {getAllProducts} from '../models/product-model.js';

/* Uses getAllProducts from product-model to return a list of all products in json format */
export const getProducts = async (req, res) => {
    try {
      const products = await getAllProducts();
      res.json(products); // Return JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
}