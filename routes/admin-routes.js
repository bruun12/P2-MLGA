import { addProduct, createNewStore } from "../controllers/admin-controller";

app.post('/api/products/add', addProduct);

app.post('/api/createStore', createNewStore);