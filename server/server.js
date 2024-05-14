import Stripe from 'stripe';
import express, {json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createStripeRoutes from './routes/stripe.js';
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const stripeRoutes = createStripeRoutes(stripe);

const corsOptions = {
    origin: 'https://rad-dasik-2ad96a.netlify.app',
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['POST, GET, PUT'],
    allowedHeaders: ['Content-Type']
}


const uri = `mongodb+srv://jjkjon21:${process.env.DATABASE_PASSWORD}@crescendowebsite.ssxyrz4.mongodb.net/?retryWrites=true&w=majority&appName=CrescendoWebsite`

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}

connect();

app.use(cors(corsOptions));
app.use(json());
app.use(stripeRoutes);

app.use((error, req, res, next) => {
    res.status(500).json({ error: error.message });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
