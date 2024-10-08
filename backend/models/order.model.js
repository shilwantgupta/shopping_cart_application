import mongoose from 'mongoose';
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderno: {
    type: String,
    unique: true,
    default: () => Math.random().toString(36).substr(2, 9),
  }, // Unique random value

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      title: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  paymentMethod: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Order', OrderSchema);
