/* CODE BY STRIPE FOR API */
// This is your test secret API key.
const stripe = require('stripe')('sk_test_51R7EcUIX6mAD0y171jVAoalHC8iOsp5iTOiaDaKqNkuufYwPBmbVxRQSHQdX8JKam4PrC3h42G1VGJxe9R1xaZxX00wRN89NBf');
const express = require('express');
const app = express();
app.use(express.static('Html'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1R7EfMIX6mAD0y17cDftI52v',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));