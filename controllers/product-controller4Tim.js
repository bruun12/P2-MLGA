/*
Acts as the business logic layer: Contains functions or methods that process incoming requests (e.g., GET, POST, PUT, DELETE)
- Receives requests from routes.
- Validates and processes input data.
- Calls the necessary model methods to interact with the database.
- Formats the output (e.g., JSON responses) to send back to the client.
- Handles errors, authentication, or other middleware operations as required.

They decide what happens when a specific route is hit.
*/
import dbPool from '../database/database.js';
import { getProductInfo } from '../models/product-model4Tim.js';
import { getProductVariations } from '../models/product-model4Tim.js';
import { getProductItems } from '../models/product-model4Tim.js';
import { getEventInfo, getStoreInfo } from '../models/product-model4Tim.js';
import { getAddressJoinEventInfo, getAddressJoinStoreInfo } from '../models/product-model4Tim.js';
//import { getAccountEventInfo } from '../models/product-model4Tim.js';
import { getAccountInfo } from '../models/product-model4Tim.js';
import { insertEventMemberModel } from '../models/product-model4Tim.js';

export const getAccounts = async (req, res) => {
  try {
    const accountInfo = await getAccountInfo(); 

    if (Array.isArray(accountInfo) && accountInfo.length > 0) {
      res.json(accountInfo);
    } else {
      res.status(404).json({ error: 'No accounts found :-(' });
    }
  } catch (error) {
    console.error("Error getting accounts", error.stack || error);
    res.status(500).json({ error: 'Server error ;-(' });
  }
}
//inserts account id and event id into membe_event table ============
export async function insertEventMember(req, res) {
  const connection = await dbPool.getConnection();
  const {eventId, accountId} = req.body;//får det rigtig data/info????
  try {
    await connection.beginTransaction();
    
    const result = await insertEventMemberModel(eventId, accountId);
    await connection.commit();

    res.status(200).json({ success: true, result });

  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ success: false, error: error.message });

    throw error;
  } finally {
    connection.release();
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
/*
//!!!!!!!!!!!!Bruges IKKE
//gets event_id from URL and then uses it to get the correct account
export const getAccountForEvent = async (req, res)=> {
  try {
    // Extract event id from request parameters
    const id = req.params.id;
    const accountInfo = await getAccountEventInfo(id); 

    if(accountInfo) {
      res.json(accountInfo);
    } else {
      res.status(404).json({error: 'account not found for event:-('});
    }
  } catch (error) {
    console.error("Error getting account: event", error);
    res.status(500).json({error: 'Server error ;-('});
  }
}
*/

//gets event_id from URL and then uses it to get the correct address
export const getAddressJoinEvent = async (req, res)=> {
  try {
    // Extract event id from request parameters
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

//gets event_id from URL and then uses it to get the correct address
export const getAddressJoinStore = async (req, res)=> {
  try {
    // Extract store id from request parameters
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
    // Extract store id from request parameters????
    
    const id = req.body.addressInfo; //!!!!!!virker ikke som ønsket
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
