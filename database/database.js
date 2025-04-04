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
    host: "localhost", //process.env.MYSQL_HOST,
    user: "cs-25-sw-2-05@student.aau.dk", //process.env.MYSQL_USER,
    password: "FKmPu3CC@2CbPPPj", //process.env.MYSQL_PASSWORD,
    database: "cs_25_sw_2_05" //process.env.MYSQL_DATABASE
}).promise();    //promise() allows use promise API version of mysql

const result = await dbPool.query("SELECT street FROM address")

console.log(result);
