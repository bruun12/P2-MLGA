/*
Acts as the business logic layer: Contains functions or methods that process incoming requests (e.g., GET, POST, PUT, DELETE)
- Receives requests from routes.
- Validates and processes input data.
- Calls the necessary model methods to interact with the database.
- Formats the output (e.g., JSON responses) to send back to the client.
- Handles errors, authentication, or other middleware operations as required.

They decide what happens when a specific route is hit.
*/
import {getAllProducts, getAllCategories, filteredProducts, searchedProducts, userInteractions, getProductsByIds } from '../models/product-model.js';

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

export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories); // Return JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

export const getFilteredProducts = async (req, res) => {
  const {id} = req.params;
  try {
    const products = await filteredProducts(id);
    res.json(products); // Return JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

export const getSearchedProducts = async (req, res) => {
  const {searchword} = req.params;
  console.log(req.params);
  try {
    const products = await searchedProducts(searchword);
    res.json(products); // Return JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

// Get user interactions from database using userInteractions from product-model.js
export const getUserInteractions = async (req,res) => {
  try{
    const interactions = await userInteractions();
    res.json(interactions);
  }catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error'});
  }
} 

// Get recommended products from database using array of product ids
export const getRecommendedProducts = async (req, res) => {
  try {
      const { product_id } = req.body;
      const products = await getProductsByIds(product_id);
      res.json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
  }
};