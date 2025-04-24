/*Model file contains the logic to interact with the database. 
  Handles tasks such as querying, inserting, updating, and deleting records in the database.*/
  import dbPool from "../database/database.js";

  /*SYNTAX called Prepared Statement: sending sql and the values completely seperately to prevent sql injenction attacks 
    i.e.   dbPool.query("?", [id])    instead of     dbPool.query("${id}")    */
  
  
  //1. Get product basic info - for detailed view: name, desc, img
  export async function getProductInfo(product_id) {
    const [rows] = await dbPool.query("SELECT `name`, `description`, img, category_id FROM product WHERE id = ?", [product_id]); //Returns an array with the element with a matching primary key
    return rows[0];                                                                     //Only return the element, not the array
  }
  
  
  /*2. Get the id and name for variations and options for a product i.e. providing a product id
       2, Size, 3, S
       2, Size, 5, L
      Try product id 252, most rows 5 distinct + 1 duplicate */
  
  /* From a product_item (pi), then
     connect table item_varriation-mappings (ivm) (through the product_item_id),
     connect table variation_opt (vo)             (through the variation_option_id)
     connect table variation (v)                  (through the variation_id)
  
     With this new unioned table, select variation.id, variation.name, variation_opt.id, and variation_opt.value 
     Distinct to avoid duplicate rows
  
  */
  export async function getProductVariations(product_id) {
    const [rows] = await dbPool.query(`
      SELECT DISTINCT 
      v.id AS variation_id, v.name AS variation_name,
      vo.id AS option_id, vo.value AS option_value
      FROM product_item pi
      JOIN item_variation_mapping ivm ON pi.id = ivm.product_item_id
      JOIN variation_opt vo ON ivm.variation_opt_id = vo.id
      JOIN variation v ON vo.variation_id = v.id
      WHERE pi.product_id = ?
    `, [product_id]); //Returns an array with the element with a matching primary key
    return rows;                                                                     //Only return the element, not the array
  }
  
  //2.alternativ
  export async function getVariationsByCat(cat_id) {
    
  }
  
  //KIG HER ABTINASTA 
  // Select a specific productItem by id
  // Namings shortened for readability example: product_item -> pi, 
  export async function getProductItems(id) {
    // destructuring assignment, first item out of the resulting array,store it in rows variable. Means we don't get metadata
    const [rows] = await dbPool.query(`
      SELECT 
        p.*,
        p_item.*
      FROM product as p
      LEFT JOIN product_item as p_item ON p.id = p_item.product_id
      WHERE p.id = ?
    `, [id]);
    
    if (!rows.length) return null; // Return null if nothing is found
  
    const productItem = rows; //Load productRows data into productItem variable and join them with variation options
  
    return productItem;
  }
  
  
  //For each variation, create a container,
    //for each option, create a container.
  
  //For each variation, where 
  