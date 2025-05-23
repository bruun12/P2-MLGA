/* General:
 * Purpose of file: Create connection to database
      Set environment variables in your own .env file with the credentials of your personal MYSQL TEST database
      i.e. MYSQL_HOST='localhost' 
 * Schema and queries in other files
*/

import mysql from 'mysql2';

/* Connection pooling to improve performance, avoid overloading MYSQL server with too many connections
  creates a pool of reusable connections to the database - instead of creating a new connection for each query
  Each query uses this object, when querying
  */

const dbPool = mysql.createPool({

    //Environment variables for: sensitive info & easy configuration/change of database
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();    //promise() allows use promise API version of mysql

dbPool.query('SELECT DATABASE();') // Tjekker  hvilken database, den har oprettet forbinnelse til
    .then(([rows]) => {
        console.log('Connected to database:', rows[0]['DATABASE()']);
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

export default dbPool; // Export the connection pool for use in other files
