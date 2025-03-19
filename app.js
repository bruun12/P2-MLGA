import mysql from "mysql";

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'cs-25-sw-2-05@student.aau.dk',
    password: 'FKmPu3CC@2CbPPPj',
    database: 'cs_25_sw_2_05'
});

dbConnection.connect((err) => { 
    if (err) throw err; 
    console.log('MySQL connected :-)'); 
});
