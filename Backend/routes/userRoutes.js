const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

// Temporary storage for verification codes (Use Redis or DB in production)
const verificationCodes = {};

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password or app password
    }
});

// Send Verification Code
router.post('/sendVerification', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    // Generate a 6-digit verification code
    const code = crypto.randomInt(100000, 999999).toString();
    verificationCodes[email] = code;

    // Send email with verification code
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Verification Code',
            text: `Your verification code is: ${code}`,
        });

        res.json({ message: 'Verification code sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error); // Log the error to the server console
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
});

// Register User with Email Verification
router.post('/addUser', async (req, res) => {
    const { name, email, password, verificationCode, country, state, city, addressLine1, addressLine2, cityCode } = req.body;

    

    // Trim input values
    const trimmedData = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        verificationCode: verificationCode.trim(),
        country: country.trim(),
        state: state.trim(),
        city: city.trim(),
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2 ? addressLine2.trim() : '', // Handle optional field
        cityCode: cityCode.trim(), // Changed from countryCode to cityCode
    };

    // Validate required fields
    if (!trimmedData.name || !trimmedData.email || !trimmedData.password || !trimmedData.verificationCode || !trimmedData.country || !trimmedData.state || !trimmedData.city || !trimmedData.addressLine1 || !trimmedData.cityCode) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

 

    // Check verification code
    if (!verificationCodes[trimmedData.email] || verificationCodes[trimmedData.email] !== trimmedData.verificationCode) {
        return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Remove verification code after successful verification
    delete verificationCodes[trimmedData.email];

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(trimmedData.password, 10);
        const newUser = new User({ 
            name: trimmedData.name, 
            email: trimmedData.email, 
            password: hashedPassword,
            country: trimmedData.country,
            state: trimmedData.state,
            city: trimmedData.city,
            addressLine1: trimmedData.addressLine1,
            addressLine2: trimmedData.addressLine2,
            cityCode: trimmedData.cityCode, // Changed from countryCode to cityCode
            verificationCode: trimmedData.verificationCode // Optional: you may not need to store this in the database
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        console.error('Error creating user:', error); // Log the error to the server console
        res.status(500).json({ message: 'Error creating user.', error: error.message });
    }
});

// Login User with Password Hashing
router.post('/login', async (req, res) => {
     // Log the entire request body

    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Missing email or password'); // Log if email or password is missing
        return res.status(400).json({ message: 'Email and password are required.' });
    }

     // Log input email (not password for security)

    try {
        // Find the user by email (case insensitive)
        const user = await User.findOne({ email: email.toLowerCase() });
       
        if (!user) {
            
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
           
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Successful login response
        res.status(200).json({
            message: 'Login successful!',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error during login:', error); // Log the error
        res.status(500).json({ message: 'Error during login.', error: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .select('-password -verificationCode -wishlistItems -cartItems -orders')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password -verificationCode -wishlistItems -cartItems -orders');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
