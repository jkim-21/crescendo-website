import express from "express";
import Order from "../models/order.js";

const createStripeRoutes = (stripe) => {
  const router = express.Router();
  router.post("/api/payment-intents", async (req, res) => {
    const { amount, firstName, lastName, email } = req.body;
    try {
      const customer = await stripe.customers.create({
        email: email,
        name: `${firstName} ${lastName}`,
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        customer: customer.id,
        receipt_email: email,
      });

      await createOrder(customer, paymentIntent);
      res.send({ paymentIntent });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/api/subscriptions", async (req, res) => {
    const { firstName, lastName, email, amount } = req.body;
    try {
      const customer = await stripe.customers.create({
        email: email,
        name: `${firstName} ${lastName}`,
      });

      const product = await stripe.products.create({
        name: "Monthly subscription",
      });

      const price = await stripe.prices.create({
        unit_amount: amount * 100,
        currency: "usd",
        recurring: { interval: "month" },
        product: product.id,
      });

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            price: price.id,
          },
        ],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
      });

      await createOrder(customer, subscription.latest_invoice.payment_intent);
      res.send({ paymentIntent: subscription.latest_invoice.payment_intent });
    } catch (error) {
      return res.status(500).send({ error: { message: error.message } });
    }
  });

  // Create order
  const createOrder = async (customer, paymentIntent) => {
    const newOrder = new Order({
      donatorId: customer.id,
      paymentIntentId: paymentIntent.id,
      totalAmount: paymentIntent.amount,
      paymentStatus: paymentIntent.status,
      name: customer.name,
      email: customer.email,
    });
    try {
      const savedOrder = await newOrder.save();
      console.log("Processed Order:", savedOrder);
    } catch (err) {
      console.log(err);
    }
  };

  //stripe webhook
  // This is your Stripe CLI webhook secret for testing your endpoint locally.
  let endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

  router.post(
    "/stripe/webhook",
    express.raw({ type: "application/json" }),
    (req, res) => {
      const sig = req.headers["stripe-signature"];

      let data;
      let eventType;

      if (endpointSecret) {
        let event;
        try {
          event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
          console.log("Webhook verified");
        } catch (error) {
          console.log(`Webhook Error: ${error.message}`);
          res.status(400).send(`Webhook Error: ${error.message}`);
          return;
        }
        data = event.data.object;
        eventType = event.type;
      } else {
        data = req.body.data.object;
        eventType = req.body.type;
      }

      //Handle the endpoint
      if (eventType === "payment_intent.succeeded") {
        stripe.customers
          .retrieve(data.customer)
          .then((customer) => {
            console.log(customer);
            createOrder(customer, data);
          })
          .catch((err) => console.log(err.message));
      }

      // Handle the event

      // Return a 200 response to acknowledge receipt of the event
      res.send().end();
    }
  );

  return router;
};

export default createStripeRoutes;
