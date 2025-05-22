/*
Acts as the business logic layer: Contains functions or methods that process incoming requests (e.g., GET, POST, PUT, DELETE)
- Receives requests from routes.
- Validates and processes input data.
- Calls the necessary model methods to interact with the database.
- Formats the output (e.g., JSON responses) to send back to the client.
- Handles errors, authentication, or other middleware operations as required.

They decide what happens when a specific route is hit.
*/

import {getAllEvents, getAllStoresWithEvents, getStoreEvents, insertEvent} from '../models/event-model.js';


export const getEvents = async (req, res) => {
    try {
      const events = await getAllEvents();
      res.json(events); // Return JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const getStoresWithEvents = async (req, res) => {
    try {
      const events = await getAllStoresWithEvents();
      res.json(events); // Return JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const storeEvents = async (req, res) => {
    const {id} = req.params;
    try {
      const events = await getStoreEvents(id);
      res.json(events); // Return JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const createEvent = async (req, res) => {
  const { storeId, eventImage, eventTitle, eventDescription, eventDate, addressId, memberId } = req.body;
  console.log("hej");
  try {
      // Call the model function to insert the event
      const result = await insertEvent(storeId, eventImage, eventTitle, eventDescription, eventDate, addressId, memberId);
      res.status(201).json({ success: true, message: 'Event created successfully', eventId: result.insertId });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to create event' });
  }
};