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
    const [rows] = await dbPool.execute(
        'SELECT * FROM member WHERE email = ?',
        [email]
    );
    return rows[0]; // Return the first row (user) if found, otherwise undefined
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
        service: 'Gmail', 
        auth: {
            user: 'Byhjerte@gmail.com', 
            pass: ''  
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
        throw error;
    }
}

export const getUserFavorites = async (userId) => {
    const [rows] = await dbPool.execute(
        "SELECT * FROM favorites WHERE user_id = ?",
        [userId]
    );
    return rows;
};
