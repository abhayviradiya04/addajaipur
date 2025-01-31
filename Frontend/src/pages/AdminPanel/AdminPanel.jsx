import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import UserList from './UserList';
import Swal from 'sweetalert2';
import Login from '../Login/Login'
import './adminpanel.css';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        
        const user = localStorage.getItem('user');
        console.log(JSON.parse(user).admin)
        if(JSON.parse(user).admin === 0){
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'You are not authorized to access this panel.',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/login'); // Navigate to login after pressing OK
            });
            return;
        }
        // Fetch users from the backend
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://addajaipur.onrender.com/api/users'); // Adjust the API endpoint as necessary

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
                const response = await fetch('https://addajaipur.onrender.com/api/products'); // Adjust the API endpoint as necessary
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

    const addProduct = async (product) => {
        try {
            const response = await fetch('https://addajaipur.onrender.com/api/products/addproduct', {
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
            setProducts([...products, newProduct]);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const updateProduct = (updatedProduct) => {
        setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
        setEditingProduct(null); // Reset editing state
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`https://addajaipur.onrender.com/api/products/deleteProduct/${id}`, {
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
            const response = await fetch(`https://addajaipur.onrender.com/api/users/deleteUser/${id}`, {
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