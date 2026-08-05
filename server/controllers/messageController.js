const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

let memoryMessages = [
  {
    _id: 'msg-1',
    name: 'Sarah Connor',
    email: 'sarah@techcorp.io',
    subject: 'Project Inquiry - Full Stack MERN App',
    message: 'Hi Ashutosh! Loved your portfolio. We are looking for a Senior Full Stack developer for our upcoming SaaS product.',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 5),
  },
];

// @desc    Submit contact message & send email notification
// @route   POST /api/messages
// @access  Public
const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please complete all required fields' });
    }

    let savedMessage;
    try {
      savedMessage = await Message.create({ name, email, subject, message });
    } catch (dbErr) {
      savedMessage = { _id: `msg-${Date.now()}`, name, email, subject, message, isRead: false, createdAt: new Date() };
      memoryMessages.unshift(savedMessage);
    }

    // Send email notification via Nodemailer
    try {
      await sendEmail({
        subject: `[Portfolio Contact] ${subject} from ${name}`,
        text: `New Portfolio Message from: ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #6366f1;">New Portfolio Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p><strong>Message:</strong></p>
            <p style="background: #f8fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${message}</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Email Dispatch Warning:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: savedMessage,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    if (!messages || messages.length === 0) {
      return res.json({ success: true, count: memoryMessages.length, data: memoryMessages });
    }
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.json({ success: true, count: memoryMessages.length, data: memoryMessages });
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
const markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      message.isRead = true;
      await message.save();
      return res.json({ success: true, data: message });
    }
    const memMsg = memoryMessages.find((m) => m._id === req.params.id);
    if (memMsg) {
      memMsg.isRead = true;
      return res.json({ success: true, data: memMsg });
    }
    res.status(404).json({ success: false, message: 'Message not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      await message.deleteOne();
      return res.json({ success: true, message: 'Message deleted' });
    }
    memoryMessages = memoryMessages.filter((m) => m._id !== req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendMessage, getMessages, markAsRead, deleteMessage };
