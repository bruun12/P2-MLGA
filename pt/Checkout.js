// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = Stripe(
  'pk_test_51R3YdZC8ntCuIyv6Sx31HsMbq4cZLJiPTldO57oM25ZZBo15jSxyeNuxjiC6qgv1ydtqs4eeJnJ8bmndprxQz1Kd00E3SWRWwZ',
  {betas: ['custom_checkout_beta_5']},
);


fetch('/create-checkout-session', {method: 'POST'})
  .then((response) => response.json())
  .then((json) => stripe.initCheckout({clientSecret: json.checkoutSessionClientSecret}))
  .then((checkout) => {
    console.log(checkout);
  });

  stripe.initCheckout({clientSecret}).then((checkout) => {
    const emailInput = document.getElementById('email');
    const emailErrors = document.getElementById('email-errors');
  
    emailInput.addEventListener('change', () => {
      // Clear any validation errors
      emailErrors.textContent = '';
    });
  
    emailInput.addEventListener('blur', () => {
      const newEmail = emailInput.value;
      checkout.updateEmail(newEmail).then((result) => {
        if (result.error) {
          emailErrors.textContent = result.error.message;
        }
      });
    });
  });

  const paymentElement = checkout.createElement('payment', {layout: 'accordion'});
paymentElement.mount('#payment-element');

stripe.initCheckout({clientSecret}).then((checkout) => {
  const button = document.getElementById('pay-button');
  const errors = document.getElementById('confirm-errors');
  button.addEventListener('click', () => {
    // Clear any validation errors
    errors.textContent = '';

    checkout.confirm().then((result) => {
      if (result.type === 'error') {
        errors.textContent = result.error.message;
      }
    });
  });
});


const fetchClientSecret = () => {
  return fetch('/create-checkout-session', {method: 'POST'})
    .then((response) => response.json())
    .then((json) => json.checkoutSessionClientSecret);
};
stripe.initCheckout({fetchClientSecret})
  .then((checkout) => {
    const checkoutContainer = document.getElementById('checkout-container');
    checkoutContainer.append(JSON.stringify(checkout.lineItems, null, 2));
    checkoutContainer.append(document.createElement('br'));
    checkoutContainer.append(`Currency: ${checkout.session().currency}`);
    checkoutContainer.append(`Total: ${checkout.session().total.total.amount}`);
  });