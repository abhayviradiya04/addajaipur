// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';

const ProductForm = ({ addProduct, editingProduct, setEditingProduct, updateProduct }) => {
    const [product, setProduct] = useState({
        id: Date.now(),
        name: '',
        stylecode: '',
        image: '',
        description: '',
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
            setProduct(editingProduct);
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            updateProduct(product);
        } else {
            addProduct(product);
        }
        setProduct({ id: Date.now(), name: '', stylecode: '', image: '', description: '', price: '', material: '', pattern: '', type: '', fabricCare: '', lengthType: '', neck: '', stock: '' });
        setEditingProduct(null);
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
            <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
            <input type="text" name="stylecode" placeholder="Style Code" value={product.stylecode} onChange={handleChange} required />
            <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} required></textarea>
            <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
            <input type="text" name="material" placeholder="Material" value={product.material} onChange={handleChange} required />
            <input type="text" name="pattern" placeholder="Pattern" value={product.pattern} onChange={handleChange} required />
            <input type="text" name="type" placeholder="Type" value={product.type} onChange={handleChange} required />
            <input type="text" name="fabricCare" placeholder="Fabric Care" value={product.fabricCare} onChange={handleChange} required />
            <input type="text" name="lengthType" placeholder="Length Type" value={product.lengthType} onChange={handleChange} required />
            <input type="text" name="neck" placeholder="Neck" value={product.neck} onChange={handleChange} required />
            <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} required />
            <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
        </form>
    );
};

export default ProductForm;