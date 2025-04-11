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
});