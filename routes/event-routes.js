/* Routers:
    - Defines the API endpoints and maps them to the appropriate controller functions
    - Responsible for routing HTTP methods (GET, POST, PUT, DELETE, etc.) to their corresponding handlers */    
import { createEvent } from '../controllers/event-controller.js';
import express from 'express';

const router = express.Router();

router.post('/events', createEvent);

export default router;