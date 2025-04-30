import express from 'express';
import { addProduct, createNewStore } from "../controllers/admin-controller.js";

const router = express.Router(); 

router.post('/api/products/add', addProduct);

router.post('/api/createStore', createNewStore);



export default router; 