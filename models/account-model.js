import bcrypt from 'bcrypt';
import dbPool from "../database/database.js";
import nodemailer from 'nodemailer'; // For sending emails

export async function insertAccount (email, firstname, lastname, phone, hashedPassword){
    const [result] = await dbPool.execute(
        'INSERT INTO account (email, first_name, last_name, phone, password) VALUES (?, ?, ?, ?, ?)',
        [email, firstname, lastname, phone, hashedPassword]
);
 } 

// Fetch user from the database
export const checkMember = async (email) => {
    try {
        console.log("Checking member with email:", email);
        const [rows] = await dbPool.execute(
        'SELECT * FROM account WHERE email = ?',
        [email]
    );
    console.log("Rows fetched:", rows);
    return rows[0]; // Return the first row (user) if found, otherwise undefined
    } catch (error) {
        console.error("Error fetching member:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
};


// Hash the temporary password and save it in the database
export async function updateCustomerPassword(email, tempPassword) {
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    await dbPool.execute(
        "UPDATE account SET password = ? WHERE email = ?",
        [hashedPassword, email]
    );
}

export async function sendEmail(to, subject, text) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
            user: 'Byhjerte@gmail.com', 
            pass: 'pash dfvd dkep fqwf'  
        }
    });

    const mailOptions = {
        from: 'Byhjerte@gmail.com',
        to,
        subject,
        text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        console.error('full error:', error); // Log the full error for debugging
        throw error;
    }
}

export const getUserFavorites = async (userId) => {
    const [rows] = await dbPool.execute(
        "SELECT * FROM favorite WHERE user_id = ?",
        [userId]
    );
    return rows;
};
