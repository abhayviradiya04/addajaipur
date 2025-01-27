const express = require('express');
const User = require('../models/User'); // Import the User model
const Order = require('../models/Order'); // Import the Order model
const Product = require('../models/Product');
const router = express.Router();

// Add to Wishlist
router.post('/wishlist', async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Add productId to wishlistItems
        if (!user.wishlistItems.includes(productId)) {
            user.wishlistItems.push(productId);
            await user.save();
        }

        res.status(200).json({ message: 'Product added to wishlist successfully!', wishlistItems: user.wishlistItems });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to wishlist.', error: error.message });
    }
});

// Add to Cart
router.post('/cart', async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Add productId to cartItems
        if (!user.cartItems.includes(productId)) {
            user.cartItems.push(productId);
            await user.save();
        }

        res.status(200).json({ message: 'Product added to cart successfully!', cartItems: user.cartItems });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart.', error: error.message });
    }
});

// Create Order
router.post('/order', async (req, res) => {
    const { userId, products } = req.body; // products should be an array of { productId, quantity }

    if (!userId || !products || products.length === 0) {
        return res.status(400).json({ message: 'User ID and products are required.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Calculate total amount
        let totalAmount = 0;
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (product) {
                totalAmount += product.price * item.quantity; // Assuming product has a price field
            }
        }

        // Create a new order
        const order = new Order({
            userId,
            products,
            totalAmount,
        });

        await order.save();
        res.status(201).json({ message: 'Order created successfully!', order });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order.', error: error.message });
    }
});
// Remove from Wishlist
router.delete('/wishlist/remove', async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Remove productId from wishlistItems
        user.wishlistItems = user.wishlistItems.filter(
            item => item.toString() !== productId
        );
        
        await user.save();

        res.status(200).json({ 
            message: 'Product removed from wishlist successfully!',
            wishlistItems: user.wishlistItems 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error removing from wishlist.',
            error: error.message 
        });
    }
});

// Remove from Cart
router.delete('/cart/remove', async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Remove productId from cartItems
        user.cartItems = user.cartItems.filter(
            item => item.toString() !== productId
        );
        
        await user.save();

        res.status(200).json({ 
            message: 'Product removed from cart successfully!',
            cartItems: user.cartItems 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error removing from cart.',
            error: error.message 
        });
    }
});


// Get Wishlist
router.get('/wishlist/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('wishlistItems'); // Populate with product details
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ wishlistItems: user.wishlistItems });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist.', error: error.message });
    }
});

// Get Cart
router.get('/cart/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('cartItems'); // Populate with product details
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ cartItems: user.cartItems });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart.', error: error.message });
    }
});

// Get Orders
router.get('/orders/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId }).populate('products.productId'); // Populate with product details
        if (!orders) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders.', error: error.message });
    }
});

module.exports = router; 