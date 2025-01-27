// src/components/UserList.jsx
import React, { useState, useEffect } from 'react';
import './UserList.css'; // Import the CSS file for UserList

const UserList = ({ users, deleteUser }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userOrders, setUserOrders] = useState([]);

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

    return (
        <div className="user-list">
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="user-item">
                        <div onClick={() => handleUserClick(user)} className="user-info" style={{ cursor: 'pointer' }}>
                            {user.name} - {user.email} (Orders: {user.orders.length})
                        </div>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
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