import React, { useState, useEffect } from 'react';
import './ProductList.css'; // Ensure you have appropriate styles in this CSS file
import ProductForm from './ProductForm'; // Import the ProductForm component

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); // State to hold the product being edited

    useEffect(() => {
        // Fetch products from the API when the component mounts
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products'); // Adjust the endpoint as necessary
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/deleteproduct/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            // Remove the deleted product from the state
            setProducts(products.filter(product => product._id !== id));
            console.log('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const updateProduct = async (updatedProduct) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/updateproduct/${updatedProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct), // Convert updated product object to JSON
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const newProduct = await response.json(); // Assuming the response returns the updated product
            setProducts(products.map(product => (product._id === newProduct._id ? newProduct : product))); // Update the product in the state
            setEditingProduct(null); // Clear the editing state
            console.log('Product updated successfully');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="product-list">
        <h2>Product List</h2>
        <ProductForm 
            editingProduct={editingProduct} 
            setEditingProduct={setEditingProduct} 
            updateProduct={updateProduct} 
        />
        <div className="product-grid">
            {products.map(product => (
                <div key={product._id} className="product-card">
                    <img 
                        src={product.image[0]} 
                        alt={product.name} 
                        className="product-image" 
                    />
                    <div className="product-details">
                        <h3>{product.name}</h3>
                        <p><strong>Style Code:</strong> {product.stylecode}</p>
                        <p><strong>Price:</strong> ₹{product.price}</p>
                        <div className="product-actions">
                            <button onClick={() => setEditingProduct(product)}>✏️ Edit</button>
                            <button onClick={() => deleteProduct(product._id)}>🗑️ Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    
    );
};

export default ProductList;
