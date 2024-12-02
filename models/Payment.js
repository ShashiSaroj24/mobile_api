import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderDate: { type: Date, default: Date.now },
  paymentId: { type: String, required: true },
  amount: { type: Number, required: true },
  cartItems: { type: Array, default: [] },
  userAddress: { type: Object },
  payStatus: { type: String, default: 'Success' },
  
}, { strict: false });

export const Payment = mongoose.model('Payment', paymentSchema);
