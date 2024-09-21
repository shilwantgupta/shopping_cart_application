import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ['Electronics', 'Fitness', 'Outdoor', 'Accessories', 'Travel'],
      required: true,
    },
    rating: { type: Number, min: 0, max: 5 },
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
