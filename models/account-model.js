/*Model file contains the logic to interact with the database. 
  Handles tasks such as querying, inserting, updating, and deleting records in the database.*/
import dbPool from "../database/database";

export async function insertAccount (email, firstname, lastname, phone, hashedPassword){
    const [result] = await dbPool.execute(
        'INSERT INTO account (email, first_name, last_name, phone, password) VALUES (?, ?, ?, ?, ?)',
        [email, firstname, lastname, phone, hashedPassword]
);
 } //Ændrer det til account, så det kan bruges til at oprette en ny bruger i databasen.

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
