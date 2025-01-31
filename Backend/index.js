require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const uploadRoutes = require("./routes/uploadRoutes")
const userActionsRoutes = require('./routes/userActionsRoutes'); // Import the user actions routes
const Razorpay = require('razorpay');
// Middleware
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3002','https://adaajaipur-frontend.vercel.app'], // Your frontend URL
    credentials: true, // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
const razorpay = new Razorpay({
    key_id: 'rzp_test_2K2eGnhmTiYi44', // Replace with your Razorpay key ID
    key_secret: 'BmDwbJq0aEFysVnQ9Vr6Q8q4', // Replace with your Razorpay key secret
  });
app.use(bodyParser.json());
app.use(express.json()); // Parse JSON bodies
app.use('/api/products', productRoutes); // Use product routes
app.use('/api/users', userRoutes); 
app.use('/api/upload', uploadRoutes); // Use upload routes
app.use('/api/user-actions', userActionsRoutes); // Use user actions routes
app.post('/api/create-order', async (req, res) => {
    const { products } = req.body;
  
    // Calculate total amount
    const amount = products.reduce((total, product) => total + (product.price * product.quantity), 0) * 100; // Convert to paise
    const currency = 'INR'; // Change to your currency if needed
  
    const options = {
      amount: amount, // amount in paise
      currency: currency,
      receipt: 'receipt#1', // Optional: you can use a unique receipt ID
    };
  
    try {
      const order = await razorpay.orders.create(options);
      res.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating order');
    }
  });
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { // Use the MONGO_URL from .env
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});