import express from 'express';
import path from 'path';
import url from 'url';
import htmlRoutes from './routes/html-routes.js';
import accountRoutes from './routes/account-routes.js'; 
import adminRoutes from './routes/admin-routes.js'; 
import eventRoutes from './routes/event-routes.js';
import bcrypt from 'bcrypt'; // For password hashing
import dbPool from './database/database.js'; // For database connection
import bodyParser from 'body-parser';
import Stripe from 'stripe';
import { getCart } from './public/js/basketfill.js'


// Get the directory name from the current file's URL
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

//node0 port
const port = process.env.NODE0 || 3350;

//Initialize express
const app = express();

// built-in middleware for json
app.use(express.json());

//Use static files 
const staticDir = path.join(__dirname + '/public/node0');
app.use(express.static(staticDir));

app.use('/', htmlRoutes);

app.use('/', accountRoutes);

app.use('/', adminRoutes);

app.use('/', eventRoutes);

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
    console.log(staticDir);
});

// Stripe


const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

// https://www.youtube.com/watch?v=1r-F3FIONl8 stripe guide
app.post('/create-checkout-session', async (req, res) => {
    try {
        const items = req.body.items;
        // Create stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items.map(item => ({
                price_data: {
                    currency: 'dkk',
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.round(parseFloat(item.price) * 100) // Convert from kroner to ører / dollar to cent:  "24.99" -> 2499
                },
                quantity: item.quantity
            })),
            success_url: `${process.env.SERVER_URL}/success`,
            cancel_url: `${process.env.SERVER_URL}/basket`
        });
        
        res.json({url: session.url }) // return url from session
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})