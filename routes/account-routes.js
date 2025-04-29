/* Routers:
    - Defines the API endpoints and maps them to the appropriate controller functions
    - Responsible for routing HTTP methods (GET, POST, PUT, DELETE, etc.) to their corresponding handlers */
import { createAccount, memberLogin, useTempPassword, getFavorites, sendTestEmail} from "../controllers/account-controller.js";
import express from "express";

const router = express.Router(); // Create a new router instance

// Route to handle account creation
router.post('/create-account', createAccount);

router.post('/login', memberLogin);

router.post("/send-temp-password", useTempPassword);

router.post('/send-test-email', sendTestEmail);

router.get("/get-favorites", getFavorites);

export default router;