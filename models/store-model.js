/*Model file contains the logic to interact with the database. 
  Handles tasks such as querying, inserting, updating, and deleting records in the database.*/
import dbPool from "../database/database.js";

export async function getAllStores() {
    const [rows] = await dbPool.query(`SELECT id, name, img, phone
                                       FROM store;`);
    return rows;
}