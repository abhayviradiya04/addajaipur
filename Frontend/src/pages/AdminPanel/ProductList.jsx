import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './ProductList.css'; // Ensure you have appropriate styles in this CSS file
import ProductForm from './ProductForm'; // Import the ProductForm component

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); // State to hold the product being edited

    useEffect(() => {
        // Fetch products from the API when the component mounts
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://addajaipur.onrender.com/api/products'); // Adjust the endpoint as necessary
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://addajaipur.onrender.com/api/products/deleteproduct/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete product');
                }

                // Remove the deleted product from the state
                setProducts(products.filter(product => product._id !== id));
                Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const updateProduct = async (updatedProduct) => {
        try {
            const response = await fetch(`https://addajaipur.onrender.com/api/products/updateproduct/${updatedProduct._id}`, {
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
            Swal.fire('Updated!', 'Your product has been updated.', 'success'); // Show success message
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="product-list-admin">
            <h2>Product List</h2>
            <ProductForm 
                editingProduct={editingProduct} 
                setEditingProduct={setEditingProduct} 
                updateProduct={updateProduct} // Pass the updateProduct function to the form
            />
            <div className="product-grid-admin">
                {products.map(product => (
                    <div key={product._id} className="product-card-admin">
                        <img 
                            src={product.image[0]} 
                            alt={product.name} 
                            className="product-image-admin" 
                        />
                        <div className="product-details-admin">
                            <h3>{product.name}</h3>
                            <p>Style Code: {product.stylecode}</p>
                            <p>Price: ₹{product.price}</p>
                            <div className="product-actions-admin">
                                <button onClick={() => setEditingProduct(product)}>Edit</button>
                                <button onClick={() => deleteProduct(product._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
