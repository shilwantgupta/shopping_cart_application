import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from './../models/user.model';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exist!' });

    user = new User({ name, email, password });

    await user.save();

    let token = generateToken(user);

    res.status(201).json({
      token,
      message: 'Signup success!',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User doesn't exist!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    const userData = user.toObject();
    delete userData.password;
    res.status(200).json({
      data: userData,
      token,
      message: 'Login success',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' + error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const cachedUser = await redisClient.get('users');
    if (cachedUser) {
      return res.status(200).json({
        data: JSON.parse(cachedUser),
        message: 'Users fetched!',
      });
    }

    const users = await User.find();
    redisClient.set('users', JSON.stringify(users)); 

    res.status(200).json({ data: users, message: 'Fetched' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' });
  }
};
