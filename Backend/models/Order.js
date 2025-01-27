const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the Product model
        quantity: { type: Number, required: true, default: 1 }, // Quantity of the product
    }],
    totalAmount: { type: Number, required: true }, // Total amount for the order
    orderDate: { type: Date, default: Date.now }, // Date of the order
    status: { type: String, default: 'Pending' }, // Order status
}, { timestamps: true }); // Optional: Adds createdAt and updatedAt fields

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;