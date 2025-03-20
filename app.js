import mysql from "mysql";
import express from 'express';
// ændre måske til at importe frem for at require
//const express = require("express");
const app = express();
//const mysql = require('mysql');

//Connection Pooling is a mechanism to maintain a cache of database connection so that the connection can be reused after releasing it.
//Support connection pooling, avoid server crash concurrent requests
const pool = mysql.createPool({
    host: 'localhost',
    user: 'cs-25-sw-2-05@student.aau.dk',
    password: 'FKmPu3CC@2CbPPPj',
    database: 'cs_25_sw_2_05'
});

app.get("/", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as id'+ connection.threadId);
        connection.query('SELECT * from users LIMIT 1', (err, rows) => {
            connection.release(); // return the connection to pool
            if (err) throw err;
            console.log('The data from users table are: \n', rows);
        });
    });
});

const port = 3350;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});