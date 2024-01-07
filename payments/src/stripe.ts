import Stripe from "stripe";

// Stripe instance with API Key
export const stripe = new Stripe( process.env.STRIPE_KEY!, {
  apiVersion: '2023-10-16'
} );