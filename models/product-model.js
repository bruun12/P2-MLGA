/*Model file contains the logic to interact with the database. 
  Handles tasks such as querying, inserting, updating, and deleting records in the database.*/
import dbPool from "../database/database.js";

/*SYNTAX called Prepared Statement: sending sql and the values completely seperately to prevent sql injenction attacks 
  i.e.   dbPool.query("?", [id])    instead of     dbPool.query("${id}")    */

// Select all products from the database - overview, potentially limit
export async function getAllProducts() {
    // destructuring assignment, first item out of the resulting array,store it in rows variable. Means we don't get metadata
    const [rows] = await dbPool.query(`SELECT name title, price, product_item.img, product_id id
                                       FROM product_item right JOIN product
                                       ON product_item.product_id = product.id
                                       WHERE product_id IS NOT NULL
                                       LIMIT 20;`);
    return rows;
}

// Select a specific productItem by id
export async function getProductItem(id) {
    const [rows] = await dbPool.query("SELECT * FROM product_item WHERE id = ?", [id]); //Returns an array with the element with a matching primary key
    return rows[0];                                                                     //Only return the element, not the array
}

// Select a specific productItem 
export async function getAllCategories() {
    const [rows] = await dbPool.query("SELECT * FROM category"); //Returns an array with the element with a matching primary key
    return rows;                                                                     //Only return the element, not the array
}

export async function filteredProducts(categoryId) {
  const [rows] = await dbPool.query(`WITH RECURSIVE category_tree (id, name, parent_id, depth) AS (
                                      
                                      SELECT id, name, parent_id, 0
                                      FROM category
                                      WHERE id = ?

                                      UNION ALL

                                      SELECT c.id, c.name, c.parent_id, ct.depth + 1
                                      FROM category c
                                      JOIN category_tree ct ON c.parent_id = ct.id
                                      WHERE ct.depth < 5  
                                    )
                                    SELECT DISTINCT product.id, product.name AS title, product_item.price, product_item.img     
                                    FROM category_tree JOIN product JOIN product_item
                                    WHERE product.category_id = category_tree.id AND product_item.product_id = product.id
                                    LIMIT 20;`, [categoryId]);
  return rows;
}

export async function searchedProducts(searchWord) {
  let key = "%"+searchWord+"%" //the % means that anything can be infront of it.
  const [rows] = await dbPool.query(`SELECT name title, price, product_item.img, product_id id
                                     FROM product_item right JOIN product
                                     ON product_item.product_id = product.id
                                     WHERE name LIKE ? AND product_id IS NOT NULL
                                     LIMIT 20;`, [key]);
  return rows;
}



