// Backend/routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');
const mongoose = require('mongoose') // Adjust the path as necessary
const router = express.Router();

// Create a new product
router.post('/addProduct', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});
// Get products by type
router.get('/type/:type', async (req, res) => {
    try {
        const products = await Product.find({ 
            type: req.params.type 
        }).populate('brand');
        
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching products by type.',
            error: error.message 
        });
    }
});
router.get('/subtype/:subtype', async (req, res) => {
    try {
        const products = await Product.find({ 
            subtype: req.params.subtype 
        }).populate('brand');
        
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching products by subtype.',
            error: error.message 
        });
    }
});
// Get all products
router.get('/', async (req, res) => {
   
    try {
        const products = await Product.find();
        res.status(200).json(products);
       
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a product by ID
router.put('/updateProduct/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a product by ID
router.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get Products by Type
router.get('/type/:type', async (req, res) => {
    const { type } = req.params;

    try {
        const products = await Product.find({ type }); // Find products by type
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this type.' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products by type.', error: error.message });
    }
});

//Update Product Stock
router.put('/update-quantity', async (req, res) => {
    const { products } = req.body; // Expect an array of products with their quantities
  
    try {
      // Validate input
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'Invalid products data' });
      }
  
      // Loop through each product and update its stock
      for (const item of products) {
        const { _id, quantity } = item;
  
        // Validate productId and quantity
        if (!mongoose.Types.ObjectId.isValid(_id) || typeof quantity !== 'number' || quantity <= 0) {
          return res.status(400).json({ message: 'Invalid product ID or quantity' });
        }
  
        // Find the product in the database
        const product = await Product.findById(_id);
        if (!product) {
          return res.status(404).json({ message: `Product not found: ${_id}` });
        }
  
        // Check if there's enough stock
        if (product.stock < quantity) {
          return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
        }
  
        // Update the stock
        product.stock -= quantity;
        await product.save();
      }
  
      // Return success response
      res.status(200).json({ message: 'Product quantities updated successfully' });
    } catch (error) {
      console.error('Error updating product quantities:', error);
      res.status(500).json({ message: 'Failed to update product quantities' });
    }
  });

module.exports = router;