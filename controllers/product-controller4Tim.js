/*
Acts as the business logic layer: Contains functions or methods that process incoming requests (e.g., GET, POST, PUT, DELETE)
- Receives requests from routes.
- Validates and processes input data.
- Calls the necessary model methods to interact with the database.
- Formats the output (e.g., JSON responses) to send back to the client.
- Handles errors, authentication, or other middleware operations as required.

They decide what happens when a specific route is hit.
*/
import {getProductItems } from '../models/product-model4Tim.js';
import { getProductInfo } from '../models/product-model4Tim.js';
import { getProductVariations } from '../models/product-model4Tim.js';
import { getEventInfo } from '../models/product-model4Tim.js';
//import { eventJoinStore } from '../models/product-model4Tim.js';

//gets detail from the event table
export const getEventDetails = async (req, res)=> {
  try {
    // Extract event id from request parameters
    const id = req.params.id;

    const eventInfo = await getEventInfo(id);

    if(eventInfo) {
      res.json(eventInfo);
    } else {
      res.status(404).json({error: 'Event not found :-('});
    }

  } catch (error) {
    console.error("Error getting event:", error);
    res.status(500).json({error: 'Server error ;-('});
  }
}

// KIG HER ABTIN PASTA
/* Uses ... from product-model to return a product in json format */
export const getProductDetails = async (req, res)=> {
    try {
      // Extract product id from request parameters
      const id = req.params.id;

      const productInfo = await getProductInfo(id);

      if(productInfo) {
        res.json(productInfo);
      } else {
        res.status(404).json({error: 'Product not found :-('});
      }
    } catch (error) {
      console.error("Error getting product:", error);
      res.status(500).json({error: 'Server error ;-('});
    }
}

export const getVariationData = async (req, res) => {
  // Extract product id from request parameters
  try { 
    const id = req.params.id;
    const variationData = await getProductVariations(id)

    if(variationData) {
      res.json(variationData);
    } else {
      res.status(404).json({error: 'VariationData not found :-('});
    } 
  } catch (error) {
  console.error("Error getting VriationData:", error);
  res.status(500).json({error: 'Server error ;-('});
  }
}
