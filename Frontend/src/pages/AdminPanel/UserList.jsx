import React, { useState, useEffect } from 'react';
import './UserList.css';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://addajaipur.onrender.com/api/users');
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                console.log("User",data)
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                Swal.fire('Error!', 'There was an error fetching the user list.', 'error');
            }
        };
        fetchUsers();
    }, []);

    const handleUserClick = async (user) => {
        if (selectedUser?._id === user._id) {
            setSelectedUser(null);
            setUserOrders([]);
        } else {
            setSelectedUser(user);
            try {
                const response = await fetch(`https://addajaipur.onrender.com/api/user-actions/orders/${user._id}`);
                if (!response.ok) throw new Error('Failed to fetch orders');
                const data = await response.json();
                setUserOrders(data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
                Swal.fire('Error!', 'Could not fetch user orders.', 'error');
            }
        }
    };

    const deleteUser = async (id) => {
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
                const response = await fetch(`https://addajaipur.onrender.com/api/users/deleteUser/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to delete user: ${errorData.message}`);
                }

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
            <h2>Manage Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id} className="user-item">
                        <div className="user-info" onClick={() => handleUserClick(user)}>
                            <span className="user-name">{user.name}</span>
                            <span className="user-email">{user.email}</span>
                            <span className="user-orders">Orders: {user.orders.length}</span>
                        </div>
                        <button className="delete-btn" onClick={() => deleteUser(user._id)}>
                            <FaTrashAlt />
                        </button>
                    </li>
                ))}
            </ul>

            {selectedUser && userOrders.length > 0 && (
                <div className="order-details">
                    <h4>Orders for {selectedUser.name}:</h4>
                    <ul>
                        {userOrders.map(order => (
                            <li key={order._id} className="order-item">
                                <strong>Order ID:</strong> {order._id}
                                <ul>
                                    {order.products.map(product => (
                                        <li key={product._id._id} className="product-item">
                                            <strong>{product._id.name}</strong> <br/><br/>(Qty: {product.quantity}) <br/>
                                            <span className="product-price"> {product._id.price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserList;
