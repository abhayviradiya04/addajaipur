// Backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.json()); // Parse JSON bodies
app.use('/api/products', productRoutes); // Use product routes
app.use('/api/users', userRoutes); 

// Connect to MongoDB
mongoose.connect('mongodb+srv://adaajaipur:adaajaipur123@adaajaipur.dhmxx.mongodb.net/', { // Replace with your MongoDB connection string
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