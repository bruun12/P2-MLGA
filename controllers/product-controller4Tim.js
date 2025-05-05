/*
Acts as the business logic layer: Contains functions or methods that process incoming requests (e.g., GET, POST, PUT, DELETE)
- Receives requests from routes.
- Validates and processes input data.
- Calls the necessary model methods to interact with the database.
- Formats the output (e.g., JSON responses) to send back to the client.
- Handles errors, authentication, or other middleware operations as required.

They decide what happens when a specific route is hit.
*/
import { getProductInfo } from '../models/product-model4Tim.js';
import { getProductVariations } from '../models/product-model4Tim.js';
import {getProductItems } from '../models/product-model4Tim.js';
import { getEventInfo } from '../models/product-model4Tim.js';
import { getStoreInfo } from '../models/product-model4Tim.js';
import { getAddressJoinEventInfo } from '../models/product-model4Tim.js';
import { getAddressJoinStoreInfo } from '../models/product-model4Tim.js';

//gets event_id from URL and then uses it to get the correct address
export const getAddressJoinEvent = async (req, res)=> {
  try {
    // Extract product id from request parameters
    const id = req.params.id;
    const addressInfo = await getAddressJoinEventInfo(id); 

    if(addressInfo) {
      res.json(addressInfo);
    } else {
      res.status(404).json({error: 'address not found for event:-('});
    }
  } catch (error) {
    console.error("Error getting address: event", error);
    res.status(500).json({error: 'Server error ;-('});
  }
}

//gets event_id from URL and then uses it to get the correct address
export const getAddressJoinStore = async (req, res)=> {
  try {
    // Extract product id from request parameters
    const id = req.params.id;
    const storeInfo = await getAddressJoinStoreInfo(id); 

    if(storeInfo) {
      res.json(storeInfo);
    } else {
      res.status(404).json({error: 'address not found for store :-('});
    }
  } catch (error) {
    console.error("Error getting address from store:", error);
    res.status(500).json({error: 'Server error ;-('});
  }
}

//gets event_id from URL and then uses it to get the correct address
export const getAddressJoinStoreProduct = async (req, res)=> {
  try {
    // Extract product id from request parameters
    const id = req.params.id;
    const storeInfo = await getAddressJoinStoreInfo(id); 

    if(storeInfo) {
      res.json(storeInfo);
    } else {
      res.status(404).json({error: 'address not found for store :-('});
    }
  } catch (error) {
    console.error("Error getting address from store:", error);
    res.status(500).json({error: 'Server error ;-('});
  }
}

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

//gets detail from the store table
export const getStoreDetails = async (req, res)=> {
  try {
    // Extract event id from request parameters
    const id = req.params.id;

    const storeInfo = await getStoreInfo(id);

    if(storeInfo) {
      res.json(storeInfo);
    } else {
      res.status(404).json({error: 'Store not found :-('});
    }

  } catch (error) {
    console.error("Error getting store:", error);
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
  console.error("Error getting VariationData:", error);
  res.status(500).json({error: 'Server error ;-('});
  }
}

export const getAllProductItems= async (req, res) => {
  // Extract product id from request parameters
  try { 
    const id = req.params.id;
    const variationData = await getProductItems(id)

    if(variationData) {
      res.json(variationData);
    } else {
      res.status(404).json({error: 'VariationData not found :-('});
    } 
  } catch (error) {
  console.error("Error getting VariationData:", error);
  res.status(500).json({error: 'Server error ;-('});
  }
}
