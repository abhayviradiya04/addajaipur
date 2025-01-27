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

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true, // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(express.json()); // Parse JSON bodies
app.use('/api/products', productRoutes); // Use product routes
app.use('/api/users', userRoutes); 
app.use('/api/upload', uploadRoutes); // Use upload routes
app.use('/api/user-actions', userActionsRoutes); // Use user actions routes

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