// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';

const ProductForm = ({ editingProduct, setEditingProduct, updateProduct }) => {
    const [product, setProduct] = useState({
        id: Date.now(),
        name: '',
        stylecode: '',
        image: [], // Array to hold multiple image URLs
        description: '',
        brand: { name: 'Adaa Jaipur' }, // Fixed brand name
        price: '',
        material: '',
        pattern: '',
        type: '',
        fabricCare: '',
        lengthType: '',
        neck: '',
        stock: '',
    });

    useEffect(() => {
        if (editingProduct) {
            setProduct(editingProduct); // Populate the form with the editing product data
        } else {
            // Reset the form if no product is being edited
            setProduct({
                id: Date.now(),
                name: '',
                stylecode: '',
                image: [],
                description: '',
                brand: { name: 'Adaa Jaipur' },
                price: '',
                material: '',
                pattern: '',
                type: '',
                fabricCare: '',
                lengthType: '',
                neck: '',
                stock: '',
            });
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = async (e) => {
        const files = e.target.files; // Get the selected files
        const uploadedImageUrls = [];

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('image', files[i]);

            try {
                const response = await fetch(`http://localhost:5000/api/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Error uploading image');
                }

                const data = await response.json();
                uploadedImageUrls.push(data.imageUrl); // Assuming the response contains the image URL
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        setProduct({ ...product, image: [...product.image, ...uploadedImageUrls] }); // Update the product state with the uploaded image URLs
    };

    const addProduct = async (product) => {
        try {
            const response = await fetch('http://localhost:5000/api/products/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product), // Convert product object to JSON
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            const newProduct = await response.json(); // Assuming the response returns the added product
            return newProduct; // Return the newly added product
        } catch (error) {
            console.error('Error adding product:', error);
            return null; // Return null in case of error
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingProduct) {
            await updateProduct(product); // Call updateProduct to update the product
        } else {
            const newProduct = await addProduct(product); // Call addProduct to add the product
            if (newProduct) {
                console.log('Product added successfully:', newProduct);
            }
        }
        setEditingProduct(null); // Clear the editing state after submission
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
            <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
            <input type="text" name="stylecode" placeholder="Style Code" value={product.stylecode} onChange={handleChange} required />
            <input type="file" name="image" placeholder="Upload Images" onChange={handleFileChange} multiple required />
            <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} required></textarea>
            <input type="text" name="brand" value={product.brand.name} readOnly placeholder="Brand" /> {/* Fixed brand name */}
            <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
            <input type="text" name="material" placeholder="Material" value={product.material} onChange={handleChange} required />
            <input type="text" name="pattern" placeholder="Pattern" value={product.pattern} onChange={handleChange} required />
            <input type="text" name="type" placeholder="Type" value={product.type} onChange={handleChange} required />
            <input type="text" name="fabricCare" placeholder="Fabric Care" value={product.fabricCare} onChange={handleChange} required />
            <input type="text" name="lengthType" placeholder="Length Type" value={product.lengthType} onChange={handleChange} required />
            <input type="text" name="neck" placeholder="Neck" value={product.neck} onChange={handleChange} required />
            <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} required />
            <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
            <div>
                <h3>Uploaded Images:</h3>
                {product.image.map((img, index) => (
                    <img key={index} src={img} alt={`Product Image ${index + 1}`} style={{ width: '100px', margin: '5px' }} />
                ))}
            </div>
        </form>
    );
};

export default ProductForm;