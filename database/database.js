/* General:
 * Purpose of file: Create connection to database
      Set environment variables in your own .env file with the credentials of your personal MYSQL TEST database
      i.e. MYSQL_HOST='localhost' 
 * Schema and queries in other files
*/

import mysql from 'mysql2';

/* Connection pooling to improve performance, avoid overloading MYSQL server with too many connections
  creates a pool of reusable connections to the database - instead of creating a new connection for each query*/
const dbPool = mysql.createPool({

    //Environment variables for: sensitive info & easy configuration/change of database
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();    //promise() allows use promise API version of mysql


/*SYNTAX called Prepared Statement: sending sql and the values completely seperately to prevent sql injenction attacks 
  i.e.   dbPool.query("?", [id])    instead of     dbPool.query("${id}")    */

// Select all products from the database - overview, potentially limit
export async function getAllProducts() {
    // destructuring assignment, first item out of the resulting array,store it in rows variable. Means we don't get metadata
    const [rows] = await dbPool.query("Select * FROM product LIMIT 10");
    return rows;
}

export async function getProductItem(id) {
    const [rows] = await dbPool.query("SELECT * FROM product_item WHERE id = ?", [id]); //Returns an array with the element with a matching primary key
    return rows[0];                                                                     //Only return the element, not the array
}

// Select all events from a particular store
export async function getStoreEvents(store_id) {
    const [rows] = await dbPool.query("SELECT * FROM `event` WHERE store_id = ?", [store_id]);
    return rows;
}

//Select one particular event
export async function getEvent(id){
    const [rows] = await dbPool.query("SELECT * FROM `event` WHERE id = ?", [id]); //Returns an array with the element with a matching primary key
    return rows[0];                                                                //Only return the element, not the array
}


/*
// Route to handle account creation
app.post('/create-account', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const [result] = await db.execute(
            'INSERT INTO customer (email, first_name, password) VALUES (?, ?, ?)',
            [email, username, hashedPassword]
        );
        res.status(201).json({ message: 'Account created successfully!' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Failed to create account.' });
    }
});

// Route to handle user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch user from the database
        const [rows] = await db.execute(
            'SELECT * FROM customer WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const user = rows[0];

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        res.status(200).json({ message: 'Login successful!', user: { id: user.id, email: user.email, first_name: user.first_name } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Failed to log in.' });
    }
});*/