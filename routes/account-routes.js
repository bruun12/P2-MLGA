import { createAccount, memberLogin, useTempPassword } from "../controllers/account-controller";


// Route to handle account creation
app.post('/create-account', createAccount);

app.post('/login', memberLogin);

app.post("/send-temp-password", useTempPassword);