const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    admin: {
        type: Number,
        required: true,
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
   
    cityCode: {
        type: String,
        required: true,
    },
    verificationCode: {
        type: String,
        required: true,
    },
    wishlistItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assuming you have a Product model
    }],
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assuming you have a Product model
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Assuming you have an Order model
    }],
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
