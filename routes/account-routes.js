/* Routers:
    - Defines the API endpoints and maps them to the appropriate controller functions
    - Responsible for routing HTTP methods (GET, POST, PUT, DELETE, etc.) to their corresponding handlers */
import { createAccount, memberLogin, useTempPassword } from "../controllers/account-controller";


// Route to handle account creation
app.post('/create-account', createAccount);

app.post('/login', memberLogin);

app.post("/send-temp-password", useTempPassword);
