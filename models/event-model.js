/*Model file contains the logic to interact with the database. 
  Handles tasks such as querying, inserting, updating, and deleting records in the database.*/
import dbPool from "../database/database.js";

  // Select all events from a particular store
export async function getStoreEvents(store_id) {
  const [rows] = await dbPool.query("SELECT * FROM `event` WHERE store_id = ?", [store_id]);
  return rows;
}

//Select one particular event
export async function getEvent(id){
  const [rows] = await dbPool.query("SELECT * FROM `event` WHERE id = ?", [id]); //Returns an array with the element with a matching primary key
  return rows[0];                                                                //Only return the element, not the array
}