/*Model file contains the logic to interact with the database. 
  Handles tasks such as querying, inserting, updating, and deleting records in the database.*/
import dbPool from "../database/database.js";

/*SYNTAX called Prepared Statement: sending sql and the values completely seperately to prevent sql injenction attacks 
  i.e.   dbPool.query("?", [id])    instead of     dbPool.query("${id}")    */

// Select all products from the database - overview, potentially limit
export async function getAllProducts() {
    // destructuring assignment, first item out of the resulting array,store it in rows variable. Means we don't get metadata
    const [rows] = await dbPool.query(`SELECT name title, price, product.img, product_id id
                                       FROM product_item right JOIN product
                                       ON product_item.product_id = product.id
                                       WHERE product_id IS NOT NULL
                                       LIMIT 15;`);
    return rows;
}

// Select a specific productItem by id
export async function getProductItem(id) {
    const [rows] = await dbPool.query("SELECT * FROM product_item WHERE id = ?", [id]); //Returns an array with the element with a matching primary key
    return rows[0];                                                                     //Only return the element, not the array
}



