/*Model file contains the logic to interact with the database. 
  Handles tasks such as querying, inserting, updating, and deleting records in the database.*/
import dbPool from "../database/database.js";

/*SYNTAX called Prepared Statement: sending sql and the values completely seperately to prevent sql injenction attacks 
  i.e.   dbPool.query("?", [id])    instead of     dbPool.query("${id}")    */

// Select all products from the database - overview, potentially limit
export async function getAllProducts() {
    // destructuring assignment, first item out of the resulting array,store it in rows variable. Means we don't get metadata
    const [rows] = await dbPool.query(`SELECT p.id, p.name AS title, pi.price, pi.img
                                       FROM product p
                                       JOIN (
                                           SELECT product_id, MIN(price) AS min_price
                                           FROM product_item
                                           GROUP BY product_id
                                       ) min_prices ON p.id = min_prices.product_id
                                       JOIN product_item pi ON pi.product_id = min_prices.product_id AND pi.price = min_prices.min_price
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
                                       WHERE ct.depth < 10
                                     )
                                     SELECT DISTINCT product.id, product.name AS title, 
                                           (SELECT price FROM product_item WHERE product_id = product.id LIMIT 1) AS price,
                                           (SELECT img FROM product_item WHERE product_id = product.id LIMIT 1) AS img,
                                           category_id
                                     FROM category_tree
                                     JOIN product ON product.category_id = category_tree.id
                                     WHERE (SELECT price FROM product_item WHERE product_id = product.id LIMIT 1) IS NOT NULL
                                     LIMIT 20;`, [categoryId]); // a depth of 10 is enough to get every element shown 
  return rows;
}

export async function searchedProducts(searchWord) {
  let key = "%"+searchWord+"%" //the % means that anything can be infront of it.
  const [rows] = await dbPool.query(`SELECT p.id, p.name AS title, pi.price, pi.img
                                     FROM product p
                                     JOIN (
                                         SELECT product_id, MIN(price) AS min_price
                                         FROM product_item
                                         GROUP BY product_id
                                     ) min_prices ON p.id = min_prices.product_id
                                     JOIN product_item pi ON pi.product_id = min_prices.product_id AND pi.price = min_prices.min_price
                                     WHERE p.name LIKE ?
                                     LIMIT 20;`, [key]);
  return rows;
}

export async function userInteractions() { // Select all bought items for each user. (Only members). Used in product-controller.
  const [rows] = await dbPool.query(`SELECT customer_order.member_id AS account_id,
                                            order_line.product_item_id
                                     FROM 
                                            order_line
                                     JOIN 
                                            customer_order ON order_line.order_number = customer_order.order_number
                                     WHERE 
                                            customer_order.member_id IS NOT NULL;`);
  return rows;
}

export async function getProductsByIds(productIds) {
  if (!Array.isArray(productIds) || productIds.length === 0) return [];

  const [rows] = await dbPool.query(
      `SELECT * FROM product WHERE product_item_id IN (?)`, [productIds]
  );

  return rows;
}


