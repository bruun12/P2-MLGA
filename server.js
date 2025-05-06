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
});

// Stripe
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
    [1, {priceInCents: 10000, name: 'Learn Fortnite Today'}],
    [2, {priceInCents: 20000, name: 'Peters fødselvideo'}]
])
// https://www.youtube.com/watch?v=1r-F3FIONl8 stripe guide
app.post('/create-checkout-session', async (req, res) => {
    try {
        // Create stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'dkk',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`
        })
        res.json({url: session.url }) // return url from session
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})