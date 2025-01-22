const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    photo:{
        type:String,
        required:false
    },
    description: {
        type: String,
        trim: true,
    },
    stylecode: {
        type: String,
        required: true,
        trim: true,
    },
    pattern: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
     lengthType: {
        type: String,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
