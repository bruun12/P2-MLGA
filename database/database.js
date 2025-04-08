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

// Registrer en ny bruger
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try{
      const hashedPassword = await bcrypt.hash(password, 10); // hash the password using bcrypt

      const [result] = await db.query( // insert the new user into the database
          "INSERT INTO customer (username, password) VALUES (?, ?)",
          [username, hashedPassword]
      );
      res.status(201).json({ message: "User registered successfully!"});
  } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Error registering user!" });
  }
});


// Log ind som bruger
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try { 
      const [rows] = await db.query("SELECT * FROM customer WHERE username = ?", [username]);

      if (rows.length === 0) {
          return res.status(404).json({ message: "User not found" });
      }

      const user = rows[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      res.status(200).json({ message: "Login successful", user: { id: user.id, username: user.username } });
  } catch (error) {
      console.error("Error logging in", error);
      res.status(500).json({ message: "Error logging in" });
  }
});