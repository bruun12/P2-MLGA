/*
Acts as the business logic layer: Contains functions or methods that process incoming requests (e.g., GET, POST, PUT, DELETE)
- Receives requests from routes.
- Validates and processes input data.
- Calls the necessary model methods to interact with the database.
- Formats the output (e.g., JSON responses) to send back to the client.
- Handles errors, authentication, or other middleware operations as required.

They decide what happens when a specific route is hit.
*/

import { getAllStores } from "../models/store-model.js";

export const getStores = async (req, res) => {
    try {
      const stores = await getAllStores();
      res.json(stores); // Return JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
}