/*Model file contains the logic to interact with the database. 
  Handles tasks such as querying, inserting, updating, and deleting records in the database.*/
import dbPool from "../database/database.js";

/*SYNTAX called Prepared Statement: sending sql and the values completely seperately to prevent sql injenction attacks 
  i.e.   dbPool.query("?", [id])    instead of     dbPool.query("${id}")    */

// Select all products from the database - overview, potentially limit
export async function getAllEvents() {
    // destructuring assignment, first item out of the resulting array,store it in rows variable. Means we don't get metadata
    const [rows] = await dbPool.query("Select * FROM event LIMIT 25");
    return rows;
}

//Select one particular event
export async function getEvent(id){
  const [rows] = await dbPool.query("SELECT * FROM `event` WHERE id = ?", [id]); //Returns an array with the element with a matching primary key
  return rows[0];                                                                //Only return the element, not the array
}

// Select all events from a particular store
export async function getStoreEvents(store_id) {
  const [rows] = await dbPool.query("SELECT * FROM `event` WHERE id = ?", [store_id]);
  return rows;
}

// Select all events from a particular store
export async function getAllStoresWithEvents() {
  const [rows] = await dbPool.query(`SELECT distinct store.name, store.id
                                     FROM store INNER JOIN event
                                     ON store.id = event.store_id;`);
  return rows;
}