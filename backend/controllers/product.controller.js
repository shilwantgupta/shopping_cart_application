import Product from '../models/product.model';
import redisClient from '../services/redis.service';

export const addProduct = async (req, res) => {
  const { title, description, price, stock, category } = req.body;

  try {
    const product = new Product({ title, description, price, stock, category });
    await product.save();

    redisClient.del('products');
    res.status(201).json({ data: product, message: 'Product added' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const cachedProducts = await redisClient.get('products');
    if (cachedProducts) {
      return res.status(200).json({
        data: JSON.parse(cachedProducts),
        message: 'Products fetched!',
      });
    }

    const products = await Product.find({});
    redisClient.set('products', JSON.stringify(products)); // Ensure products are stored as a JSON string

    res.status(200).json({ data: products, message: 'Products Fetched!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const cachedProduct = await redisClient.get(`product:${id}`);
    if (cachedProduct) {
      return res.status(200).json({
        data: JSON.parse(cachedProduct),
        message: 'Product fetched',
      });
    }
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: 'Product not found.' });

    redisClient.set(`product:${id}`, JSON.stringify(product));
    res.status(200).json({ data: product, message: 'Product fetched' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' + error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product)
      return res.status(404).json({ message: 'Product not found.' });

    redisClient.del('products');
    redisClient.del(`product:${id}`);

    return res.status(200).json({
      data: product,
      message: 'Product updated',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    redisClient.del('products');
    redisClient.del(`product:${id}`);
    res.status(200).json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
