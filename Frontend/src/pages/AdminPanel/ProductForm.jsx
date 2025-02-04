import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

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
        subtype: '', // Added subtype field
        size: '', // Added size field
        fabricCare: '',
        lengthType: '',
        neck: '',
        stock: '',
    });

    useEffect(() => {
        if (editingProduct) {
            // Fetch the product data for editing
            const fetchProductData = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/products/${editingProduct._id}`);
                    const data = await response.json();
                    setProduct(data);  // Populate the form with the fetched product data
                } catch (error) {
                    console.error('Error fetching product data:', error);
                }
            };
            fetchProductData();
        } else {
            setProduct({
                name: '',
                stylecode: '',
                image: [],
                description: '',
                brand: { name: 'Adaa Jaipur' },
                price: '',
                material: '',
                pattern: '',
                type: '',
                subtype: '',
                size: '',
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
        const files = e.target.files;
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
                uploadedImageUrls.push(data.imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        setProduct({ ...product, image: [...product.image, ...uploadedImageUrls] });
    };

    const removeImage = (index) => {
        const newImages = product.image.filter((_, i) => i !== index);
        setProduct({ ...product, image: newImages });
    };

    const addProduct = async (product) => {
        try {
            const response = await fetch('http://localhost:5000/api/products/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            const newProduct = await response.json();
            return newProduct;
        } catch (error) {
            console.error('Error adding product:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingProduct) {
            // When editing, update the product via API
            
            try {
                console.log(editingProduct);
                const response = await fetch(`http://localhost:5000/api/products/updateProduct/${editingProduct._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                if (!response.ok) {
                    throw new Error('Failed to update product');
                }

                const updatedProduct = await response.json();
                Swal.fire('Updated!', 'Your product has been updated.', 'success');
                // Optionally reload the page or update local state with the updated product
                setEditingProduct(null); // Close the form after successful update
                window.location.reload(); // Reload the page or navigate to another view if needed
            } catch (error) {
                console.error('Error updating product:', error);
            }
        } else {
            // Add new product if not editing
            const newProduct = await addProduct(product);
            if (newProduct) {
                Swal.fire('Added!', 'Your product has been added.', 'success');
                window.location.reload(); // Reload the page after successful submission
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="stylecode"
                placeholder="Style Code"
                value={product.stylecode}
                onChange={handleChange}
                required
            />
            <input
                type="file"
                name="image"
                placeholder="Upload Images"
                onChange={handleFileChange}
                multiple
            />
            <textarea
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
                required
            ></textarea>
            <input
                type="text"
                name="brand"
                value={product.brand.name}
                readOnly
                placeholder="Brand"
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="material"
                placeholder="Material"
                value={product.material}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="pattern"
                placeholder="Pattern"
                value={product.pattern}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="type"
                placeholder="Type"
                value={product.type}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="subtype"
                placeholder="Subtype"
                value={product.subtype}
                onChange={handleChange}
                required
            />
            {/* Size dropdown */}
            <select name="size" value={product.size} onChange={handleChange} required>
                <option value="">Select Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            <input
                type="text"
                name="fabricCare"
                placeholder="Fabric Care"
                value={product.fabricCare}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="lengthType"
                placeholder="Length Type"
                value={product.lengthType}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="neck"
                placeholder="Neck"
                value={product.neck}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={product.stock}
                onChange={handleChange}
                required
            />
            <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
            <div>
                <h3>Uploaded Images:</h3>
                {product.image.map((img, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={img}
                            alt={`Product Image ${index + 1}`}
                            style={{ width: '100px', margin: '5px' }}
                        />
                        <button type="button" onClick={() => removeImage(index)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </form>
    );
};

export default ProductForm;
