import Cart from '../models/cart.model';
import Product from './../models/product.model';
import DiscountEngine from '../services/discount.service';
import Order from '../models/order.model';
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product'
    );

    res.status(200).json({
      data: cart,
      message: 'Get Cart',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const addItem = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product == productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    let cartData = await Cart.findOne({ user: req.user._id }).populate(
      'items.product'
    );

    res.status(201).json({
      data: cartData,
      message: 'Added to cart.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (quantity == 0) {
      cart.items = cart.items.filter((item) => item.product != productId);
    }

    const itemIndex = cart.items.findIndex((item) => item.product == productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = Number(quantity);
    }

    await cart.save();
    let cartData = await Cart.findOne({ user: req.user._id }).populate(
      'items.product'
    );

    res.status(200).json({
      data: cartData,
      message: 'Item qunatity updated.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const removeItem = async (req, res) => {
  const { productId } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter((item) => item.product != productId);
    await cart.save();
    res.status(200).json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const cartCheckout = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product'
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total with discounts
    const discountEngine = new DiscountEngine(cart.items);
    const { total, discountsApplied } = discountEngine.calculateTotal();

    // Check stock and prepare order items
    const orderItems = [];
    for (let item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (!product) {
        return res.status(404).json({ message: `Product not found` });
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${product.title}` });
      }
      product.stock -= item.quantity;
      orderItems.push({
        product: item.product._id,
        title: item.product.title,
        quantity: item.quantity,
        price: item.product.price,
      });
      await product.save();
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount: total,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
    });
    console.log(order)
    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(200).json({
      data:cart,
      message: 'Successfully ordered.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
