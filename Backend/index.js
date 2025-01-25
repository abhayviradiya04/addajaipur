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
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Parse JSON bodies
app.use('/api/products', productRoutes); // Use product routes
app.use('/api/users', userRoutes); 
app.use('/api/upload', uploadRoutes); // Use upload routes
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