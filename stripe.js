npm install stripe@17.4.0-beta.2 --save
   
import Stripe from 'stripe';
    const stripe = new Stripe('sk_test_51R3YdZC8ntCuIyv6cG66OVNkwX2sn8gSKTBBskAoGceyLJVYtuztwVVGs5woDxPiY5B20N4j35CmeiiejsAUPFWR00WPJ5IVuM', {
      apiVersion: '2025-02-24.acacia; custom_checkout_beta=v1' as any,
    });