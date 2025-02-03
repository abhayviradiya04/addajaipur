// Backend/routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product'); // Adjust the path as necessary
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
        console.log(req.params.subtype);
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

module.exports = router;