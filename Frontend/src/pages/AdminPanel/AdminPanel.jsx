import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import UserList from './UserList';
import { Link } from 'react-router-dom';
import './adminpanel.css';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (JSON.parse(user).admin === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'You are not authorized to access this panel.',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/login'); 
            });
            return;
        }

        // Fetch users and products from the backend
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://addajaipur.onrender.com/api/users');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await fetch('https://addajaipur.onrender.com/api/products');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchUsers();
        fetchProducts();
    }, [navigate]);

    const addProduct = async (product) => {
        try {
            const response = await fetch('https://addajaipur.onrender.com/api/products/addproduct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            if (!response.ok) throw new Error('Failed to add product');
            const newProduct = await response.json();
            setProducts([...products, newProduct]);
            Swal.fire('Success', 'Product added successfully', 'success');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding product:', error);
            Swal.fire('Error', 'Failed to add product', 'error');
        }
    };

    const updateProduct = async (updatedProduct) => {
        try {
            const response = await fetch(`https://addajaipur.onrender.com/api/products/updateProduct/${updatedProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) throw new Error('Failed to update product');
            setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
            Swal.fire('Success', 'Product updated successfully', 'success');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating product:', error);
            Swal.fire('Error', 'Failed to update product', 'error');
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`https://addajaipur.onrender.com/api/products/deleteProduct/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete product');
            setProducts(products.filter(product => product.id !== id));
            Swal.fire('Success', 'Product deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting product:', error);
            Swal.fire('Error', 'Failed to delete product', 'error');
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`https://addajaipur.onrender.com/api/users/deleteUser/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete user');
            setUsers(users.filter(user => user.id !== id));
            Swal.fire('Success', 'User deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting user:', error);
            Swal.fire('Error', 'Failed to delete user', 'error');
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
                            deleteProduct={deleteProduct} 
                            setEditingProduct={setEditingProduct} 
                            updateProduct={updateProduct} 
                        />
                    </>
                ) : (
                    <UserList users={users} deleteUser={deleteUser} />
                )}
            </div>

            <div>
                    <Link className="add-tour-btn position-fixed bottom-0 end-0 m-5" 
                        style={{background:"#007bff"}} 
                        to={"/admin/form"}
                    >
                        +
                    </Link>
                </div>

            {/* Modal for adding or editing product */}
            {isModalOpen && (
                <ProductForm 
                    product={editingProduct} 
                    addProduct={addProduct} 
                    updateProduct={updateProduct} 
                    setIsModalOpen={setIsModalOpen} 
                />
            )}
            
            
        </div>
    );
};

export default AdminPanel;
