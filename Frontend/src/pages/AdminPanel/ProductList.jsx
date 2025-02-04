import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://addajaipur.onrender.com/api/products');
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

                setProducts(products.filter(product => product._id !== id));
                Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div className="product-list-admin">
            <h2>Product List</h2>
            <div className="product-grid-admin">
                {products.map(product => (
                    <div key={product._id} className="product-card-admin">
                        <img src={product.image[0]} alt={product.name} className="product-image-admin" />
                        <div className="product-details-admin">
                            <h3>{product.name}</h3>
                            <p>Style Code: {product.stylecode}</p>
                            <p>Price: ₹{product.price}</p>
                            <div className="product-actions-admin">
                                <button onClick={() => navigate('/admin/form', { state: { product } })}>Edit</button>
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
