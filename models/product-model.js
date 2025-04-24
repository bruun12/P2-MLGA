/*Model file contains the logic to interact with the database. 
  Handles tasks such as querying, inserting, updating, and deleting records in the database.*/
  import dbPool from "../database/database.js";

  /*SYNTAX called Prepared Statement: sending sql and the values completely seperately to prevent sql injenction attacks 
    i.e.   dbPool.query("?", [id])    instead of     dbPool.query("${id}")    */
  
  // Select all products from the database - overview, potentially limit
  export async function getAllProducts() {
    // destructuring assignment, first item out of the resulting array,store it in rows variable. Means we don't get metadata
    const [rows] = await dbPool.query(`SELECT title, price, product.img 
                                       FROM product_item right JOIN product
                                       ON product_item.product_id = product.id
                                       LIMIT 15;`);
    return rows;
  }
  
  // Select a specific productItem by id
  // Namings shortened for readability example: product_item -> pi, 
  export async function getProductItem(id) {
    const [rows] = await dbPool.query(`
      SELECT 
        product.*,
        product_item.*
      FROM product
      LEFT JOIN product_item ON product.id = product_item.product_id
      WHERE product.id = ?
    `, [id]);
    
    if (!rows.length) return null; // Return null if nothing is found
  
    const productItem = rows; //Load productRows data into productItem variable and join them with variation options
  
    return productItem;
  }

