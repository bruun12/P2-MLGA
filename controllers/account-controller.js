import { insertAccount, checkMember, updateCustomerPassword} from "../models/account-model.js";
import bcrypt from 'bcrypt'; // For password hashing
import nodemailer from 'nodemailer'; // For sending emails

export const createAccount = async (req, res) => {
    const { email, password, firstname, lastname, phone } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        insertAccount(email, firstname, lastname, phone, hashedPassword);
        res.status(201).json({ message: 'Account created successfully!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
        console.error('Duplicate email error:', error);
        res.status(400).json({ message: 'Email is already in use. Please use a different email.' });
        } else {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Failed to create account.' });
        }
    }
}

export async function memberLogin(req, res) {
    const { email, password } = req.body;

    try {
        console.log("Login attempt:", { email, password });

        const rows = await checkMember(email); 
        console.log("Query result:", rows);

        if (rows.length === 0) {
            console.log("User not found for email:", email);
            return res.status(404).json({ message: 'User not found.' });
        }

        const user = rows[0];
        console.log("User found:", user);

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password comparison result:", isPasswordValid);

        if (!isPasswordValid) {
            console.log("Invalid credentials for user:", email);
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        res.status(200).json({ message: 'Login successful!', user: { id: user.id, email: user.email, first_name: user.first_name } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Failed to log in.' });
    }
};

export async function useTempPassword(req, res) {
    const { email } = req.body;

    try {
        // Generer et midlertidigt password
        const tempPassword = Math.random().toString(36).slice(-8);

        updateCustomerPassword(email, tempPassword);

        // Send det midlertidige password via e-mail
        const transporter = nodemailer.createTransport({
            service: "Yahoo",
            auth: {
                user: "Byhjerte@yahoo.dk",
                pass: ""
            }
        });

        const mailOptions = {
            from: "Byhjerte@yahoo.dk",
            to: email,
            subject: "Your Temporary Password",
            text: `Your temporary password is: ${tempPassword}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Temporary password sent successfully." });
    } catch (error) {
        console.error("Error sending temporary password:", error);
        res.status(500).json({ message: "Failed to send temporary password." });
    }
};
