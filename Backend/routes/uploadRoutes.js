const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary'); // Import the Cloudinary configuration
const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload image to Cloudinary
router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image file provided.' });
    }

    try {
        // Use upload_stream to upload the image from the buffer
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' }, // Automatically determine the resource type
            (error, result) => {
                if (error) {
                    return res.status(500).json({ message: 'Error uploading image.', error: error.message });
                }
                const imageUrl = result.secure_url; // Get the secure URL of the uploaded image
                res.status(201).json({ message: 'Image uploaded successfully!', imageUrl });
            }
        );

        // Pipe the buffer to the upload stream
        uploadStream.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image.', error: error.message });
    }
});

module.exports = router;