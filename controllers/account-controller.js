/*
Acts as the business logic layer: Contains functions or methods that process incoming requests (e.g., GET, POST, PUT, DELETE)
- Receives requests from routes.
- Validates and processes input data.
- Calls the necessary model methods to interact with the database.
- Formats the output (e.g., JSON responses) to send back to the client.
- Handles errors, authentication, or other middleware operations as required.

They decide what happens when a specific route is hit.
*/

import { insertAccount, checkMember, updateCustomerPassword, getUserFavorites, sendEmail } from "../models/account-model.js";
import bcrypt from 'bcrypt'; // For password hashing
import nodemailer from 'nodemailer'; // For sending emails

export const createAccount = async (req, res) => {
    const { email, password, firstname, lastname, phone } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        await insertAccount(email, firstname, lastname, phone, hashedPassword);
        res.status(201).json({ message: 'Account created successfully!' });
    } catch (error) {
        console.error('Error in createaccount:', error);
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
        const user = await checkMember(email); 
        
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password comparison result:", isPasswordValid);

        if (!isPasswordValid) {
            console.log("Invalid credentials for user:", email);
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        
        res.status(200).json({
            message: 'Login successful!',
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
        }
    });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Failed to log in.' });
    }
};

export async function useTempPassword(req, res) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }

    try {
        // Generer et midlertidigt password
        const tempPassword = Math.random().toString(36).slice(-8);

        // Update the customer's password in the database
        await updateCustomerPassword(email, tempPassword);

        const subject = 'Your Temporary Password';
        const text = `Your temporary password is: ${tempPassword}`;
        await sendEmail(email, subject, text);
                        
        res.status(200).json({ message: "a temporary password sent has been sent to your email." });
    } catch (error) {
        console.error("Error sending temporary password:", error);
        res.status(500).json({ message: "Failed to send temporary password." });
    }
};

export async function sendTestEmail(req, res) {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ message: 'All fields (to, subject, text) are required.' });
    }

    try {
        await sendEmail(to, subject, text);
        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email.', error: error.message });
    }
}



export const getFavorites = async (req, res) => {
    const userId = req.query.userId; // Assuming userId is passed as a query parameter

    if (!userId) {
        return res.status(401).json({ message: "User ID is required" });
    }

    try {
        const favorites = await getUserFavorites(userId);
        res.status(200).json(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ message: "Failed to fetch favorites." });
    }
};
