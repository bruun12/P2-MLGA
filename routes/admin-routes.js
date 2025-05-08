import express from 'express';
import { addProduct, createNewStore } from "../controllers/admin-controller.js";

const router = express.Router(); 

router.post('/products/add', addProduct);

router.post('/createStore', createNewStore);



export default router; 