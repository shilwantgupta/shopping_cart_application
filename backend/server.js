import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import morgan from 'morgan'; // For logging HTTP requests
// import helmet from 'helmet'; // For securing HTTP headers
// import rateLimit from 'express-rate-limit'; // For rate limiting
import mongoose from 'mongoose';
dotenv.config();

import authRoutes from './routes/auth.route';
import productRoutes from './routes/product.route';
import cartRoutes from './routes/cart.route';

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
