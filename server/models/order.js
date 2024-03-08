import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    donatorId: { type: String, required: true },
    paymentIntentId: { type: String },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
},
{timestamps: true});

const Order = mongoose.model("Order", orderSchema)

export default Order;