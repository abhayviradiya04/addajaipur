import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import UserList from './UserList';

import './adminpanel.css';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        // Fetch users from the backend
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users'); // Adjust the API endpoint as necessary
                console.log(response.data)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        // Fetch products from the backend
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products'); // Adjust the API endpoint as necessary
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchUsers();
        fetchProducts();
    }, []);

    const addProduct = (product) => {
        setProducts([...products, product]);
    };

    const updateProduct = (updatedProduct) => {
        setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
        setEditingProduct(null); // Reset editing state
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/deleteProduct/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/deleteUser/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <div className="tabs">
                <button onClick={() => setActiveTab('products')}>Manage Products</button>
                <button onClick={() => setActiveTab('users')}>Manage Users</button>
            </div>
            <div className="content">
                {activeTab === 'products' ? (
                    <>
                        <ProductForm 
                            addProduct={addProduct} 
                            editingProduct={editingProduct} 
                            setEditingProduct={setEditingProduct} 
                            updateProduct={updateProduct} 
                        />
                        <ProductList 
                            products={products} 
                            updateProduct={updateProduct} 
                            deleteProduct={deleteProduct} 
                            setEditingProduct={setEditingProduct} 
                        />
                    </>
                ) : (
                    <UserList 
                        users={users} 
                        deleteUser={deleteUser} 
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPanel;