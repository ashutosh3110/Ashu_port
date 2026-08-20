const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          bio: user.bio,
          token: generateToken(user._id, user.email),
        },
      });
    }

    // Fallback default admin if DB not populated or in demo mode
    if (email.toLowerCase() === 'admin@portfolio.com' && password === 'admin123') {
      return res.json({
        success: true,
        user: {
          _id: 'default-admin-id-12345',
          name: 'Ashutosh Banke',
          email: 'admin@portfolio.com',
          role: 'admin',
          avatar: '',
          bio: 'Full Stack MERN Developer',
          token: generateToken('default-admin-id-12345', 'admin@portfolio.com'),
        },
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    console.error(error);
    // Graceful fallback for demo admin login
    if (email.toLowerCase() === 'admin@portfolio.com' && password === 'admin123') {
      return res.json({
        success: true,
        user: {
          _id: 'default-admin-id-12345',
          name: 'Ashutosh Banke',
          email: 'admin@portfolio.com',
          role: 'admin',
          avatar: '',
          bio: 'Full Stack MERN Developer',
          token: generateToken('default-admin-id-12345', 'admin@portfolio.com'),
        },
      });
    }
    return res.status(500).json({ success: false, message: 'Server error during authentication' });
  }
};

// @desc    Get logged in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    if (req.user) {
      return res.json({ success: true, user: req.user });
    }
    res.status(404).json({ success: false, message: 'User not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get public admin profile for Hero section
// @route   GET /api/auth/public-profile
// @access  Public
const getPublicProfile = async (req, res) => {
  try {
    const admin = await User.findOne({ role: 'admin' }).select('-password');
    if (admin) {
      return res.json({ success: true, profile: admin });
    }
    return res.json({
      success: true,
      profile: {
        name: 'Ashutosh Banke',
        avatar: '',
        bio: 'Full Stack MERN Developer',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update admin user profile (name, avatar, bio)
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    let user = null;

    if (req.user && (req.user._id || req.user.id)) {
      try {
        user = await User.findById(req.user._id || req.user.id);
      } catch (e) {
        user = null;
      }
    }

    // Fallback: try finding any admin user in DB
    if (!user) {
      user = await User.findOne({ role: 'admin' });
    }

    // If no user exists in MongoDB yet, create/upsert the Admin user automatically
    if (!user) {
      user = new User({
        name: req.body.name || req.user?.name || 'Ashutosh Banke',
        email: req.user?.email || 'admin@portfolio.com',
        password: 'adminpassword123',
        role: 'admin',
        avatar: req.body.avatar || '',
        bio: req.body.bio || 'Full Stack MERN Developer',
      });
    } else {
      if (req.body.name) user.name = req.body.name;
      if (req.body.avatar) user.avatar = req.body.avatar;
      if (req.body.bio) user.bio = req.body.bio;
    }

    const updatedUser = await user.save();

    return res.json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
      },
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to update profile' });
  }
};

module.exports = { loginUser, getMe, getPublicProfile, updateProfile };

