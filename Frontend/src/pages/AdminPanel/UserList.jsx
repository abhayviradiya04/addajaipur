// src/components/UserList.jsx
import React, { useState, useEffect } from 'react';
import './UserList.css'; // Import the CSS file for UserList
import Swal from 'sweetalert2';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users'); // Adjust the endpoint as necessary
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                Swal.fire('Error!', 'There was an error fetching the user list.', 'error');
            }
        };

        fetchUsers();
    }, []);

    const handleUserClick = async (user) => {
        if (selectedUser === user) {
            setSelectedUser(null);
            setUserOrders([]); // Clear orders if the same user is clicked again
        } else {
            setSelectedUser(user);
            // Fetch orders for the selected user
            try {
                const response = await fetch(`http://localhost:5000/api/users/orders/${user._id}`); // Adjust the API endpoint as necessary
            
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserOrders(data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
    };

    const deleteUser = async (id) => {
        console.log('Deleting user with ID:', id); // Log the ID
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
                const response = await fetch(`http://localhost:5000/api/users/deleteUser/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to delete user: ${errorData.message}`);
                }

                // Remove the deleted user from the state
                setUsers(users.filter(user => user._id !== id));
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting user:', error);
                Swal.fire('Error!', 'There was an error deleting the user.', 'error');
            }
        }
    };

    return (
        <div className="user-list">
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id} className="user-item">
                        <div onClick={() => handleUserClick(user)} className="user-info" style={{ cursor: 'pointer' }}>
                            {user.name} - {user.email} (Orders: {user.orders.length})
                        </div>
                        <button onClick={() => deleteUser(user._id)}>Delete</button>
                        {selectedUser === user && userOrders.length > 0 && (
                            <div className="order-details">
                                <h4>Order Details:</h4>
                                <ul>
                                    {userOrders.map(order => (
                                        <li key={order.id} className="order-item">
                                            Order ID: {order.id} - Products:
                                            <ul>
                                                {order.products.map(product => (
                                                    <li key={product.productId}>
                                                        {product.productName} (Quantity: {product.quantity})
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;