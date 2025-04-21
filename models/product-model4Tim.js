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
  // First: get base product + product_item info
  const [productRows] = await dbPool.query(`
      SELECT 
          -- Product_item info
          pi.id AS product_item_id,
          pi.SKU,
          pi.stock_qty,
          pi.img AS item_img,
          pi.price,

          -- Product details
          p.id AS product_id,
          p.name AS product_name,
          p.description,
          p.img AS product_img

      FROM product_item pi
      JOIN product p ON pi.product_id = p.id
      WHERE pi.id = ?
  `, [id]);

  if (!productRows.length) return null; // Return null if nothing is found

  const productItem = productRows[0]; //Load productRows data into productItem variable and join them with variation options

  // Second: get all variations for that product item
  const [variationRows] = await dbPool.query(`
      SELECT 
          v.name AS variation_name,
          vo.value AS option_value
      FROM item_variation_mapping ivm
      JOIN variation_opt vo ON ivm.variation_opt_id = vo.id
      JOIN variation v ON vo.variation_id = v.id
      WHERE ivm.product_item_id = ?
  `, [id]);

  // Add variations as array to productItem
  productItem.variations = variationRows;

  return productItem;
}