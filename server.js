import express from 'express';
import path from 'path';
import url from 'url';
import htmlRoutes from './routes/html-routes.js';
import bcrypt from 'bcrypt'; // For password hashing
import dbPool from './database/database.js'; // For database connection
import mysql from 'mysql2';
import bodyParser from 'body-parser';


// Get the directory name from the current file's URL
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

//node0 port
const port = process.env.NODE0 || 3350;

//Initialize express
const app = express();

// built-in middleware for json
app.use(express.json());

//Use static files 
app.use(express.static(__dirname + '/public'));

app.use('/', htmlRoutes);

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API endpoint to add product
app.post('/api/products/add', async (req, res) => {
    const { product, productItem } = req.body;

    try {
        // Start transaction
        const connection = await dbPool.getConnection();
        await connection.beginTransaction();

        try {
            // Insert into product table
            const [productResult] = await connection.query(
                'INSERT INTO product (category_id, name, description, img) VALUES (?, ?, ?, ?)',
                [product.category_id, product.name, product.description, product.img]
            );

            const productId = productResult.insertId;

            // Insert into product_item table
            await connection.query(
                'INSERT INTO product_item (product_id, SKU, stock_qty, img, price, store_id) VALUES (?, ?, ?, ?, ?, ?)',
                [productId, productItem.SKU, productItem.stock_qty, productItem.img, productItem.price, productItem.store_id]
            );

            // Commit transaction
            await connection.commit();
            connection.release();

            res.json({
                success: true,
                message: 'Product added successfully',
                productId: productId
            });

        } catch (error) {
            // Rollback on error
            await connection.rollback();
            connection.release();
            throw error;
        }

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add product'
        });
    }
});

//Reveal error if any
app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send('Something broke! Check logs');
});

// Route test
/* app.get("/", (request, response) => {
    
    response.send("Hello world");
}); */


//Start the server & listen on a port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

