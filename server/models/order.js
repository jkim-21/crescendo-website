import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    donatorId: { type: String, required: true },
    paymentIntentId: { type: String },
    totalAmount: { type: Number, required: true },
    payment_status: { type: String, required: true }
},
{timestamps: true});

const Order = mongoose.model("Order", orderSchema)

export default Order;