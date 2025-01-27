import React, { useState, useEffect } from 'react';
import './ProductList.css'; // Import the CSS file for ProductList
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
                updateProduct={updateProduct} // Pass the updateProduct function to the form
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Style Code</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.stylecode}</td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => setEditingProduct(product)}>Edit</button> {/* Set the product to be edited */}
                                <button onClick={() => deleteProduct(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
