const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Middleware to verify admin
const requireAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (user.role !== 'Admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// ADMIN: Create new user (Maker/Checker)
app.post('/api/admin/users', requireAdmin, async (req, res) => {
  try {
    const { userId, password, name, role } = req.body;
    
    // Check if userId exists
    const existing = await User.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: 'User ID already exists' });
    }

    const user = new User({ 
      userId, 
      password, 
      name, 
      role,
      createdBy: req.userId 
    });
    await user.save();

    res.status(201).json({ 
      message: 'User created successfully',
      user: { userId, name, role }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN (with userId instead of email)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { userId, password } = req.body;
    
    const user = await User.findOne({ userId });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Account deactivated' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ 
      token, 
      user: { id: user._id, userId: user.userId, name: user.name, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET CURRENT USER
app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// ADMIN: List all users
app.get('/api/admin/users', requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').populate('createdBy', 'name');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed admin account (run once)
app.post('/api/setup', async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ role: 'Admin' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = new User({
      userId: 'ADMIN001',
      password: 'admin123', // Change this!
      name: 'System Admin',
      role: 'Admin'
    });
    await admin.save();

    res.json({ message: 'Admin created', userId: 'ADMIN001', password: 'admin123' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch(err => console.error('❌ MongoDB error:', err));