const express = require('express');
const User = require('../models/User'); // Import the User model
const Order = require('../models/Order'); // Import the Order model
const Product = require('../models/Product');
const router = express.Router();
const mongoose = require('mongoose')
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


// Create Order (Supports COD and Razorpay)
router.post('/order', async (req, res) => {
    const { userId, products, paymentId, paymentMethod } = req.body;
  
    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ message: 'User ID and products are required.' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Fetch product details for each product in the order
      let totalAmount = 0;
      const productDetails = await Promise.all(
        products.map(async (item) => {
          const product = await Product.findById(item._id);
          if (!product) {
            throw new Error(`Product with ID ${item._id} not found.`);
          }
          // Calculate subtotal for each product
          const subtotal = product.price * item.quantity;
          totalAmount += subtotal; // Add to total amount
          return {
            _id: item._id,
            quantity: item.quantity,
            price: product.price, // Include price in the order
          };
        })
      );
  
      console.log('Calculated Total Amount:', totalAmount); // Debug log
  
      // Create and save the order
      const newOrder = new Order({
        userId,
        products: productDetails, // Use productDetails with price included
        totalAmount,
        status: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      });
      console.log('New Order Object:', newOrder); // Debug log
  
      await newOrder.save();
      console.log('Saved Order:', newOrder); // Debug log
  
      // Add the order ID to the user's orders array
      user.orders.push(newOrder._id);
      await user.save();
  
      res.status(201).json({
        message: 'Order created successfully!',
        orderId: newOrder._id,
        paymentMethod,
        totalAmount,
      });
    } catch (error) {
      console.error('Error creating order:', error); // Debug log
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

// Clear Cart
router.delete('/cart/clear', async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Clear all cartItems
        user.cartItems = [];
        await user.save();

        res.status(200).json({ 
            message: 'Cart cleared successfully!',
            cartItems: user.cartItems 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error clearing cart.',
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
        const orders = await Order.find({ userId }).populate('products._id'); // Populate with product details
        if (!orders) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders.', error: error.message });
    }
});

router.delete('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully', deletedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
});



module.exports = router; 