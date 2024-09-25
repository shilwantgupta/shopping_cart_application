import Order from '../models/order.model';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('items.product');
    res.status(200).json({
      data: orders,
      message: 'All orders fetched',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('user')
      .populate('items.product');
    res.status(200).json({
      data: orders,
      message: 'All orders fetched',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const orderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.findOne({ _id: id })
      .populate('user')
      .populate('items.product');
    res.status(200).json({
      data: orders,
      message: 'All orders fetched',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};
