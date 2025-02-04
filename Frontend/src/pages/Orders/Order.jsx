import React, { useEffect, useState } from 'react';
import ProductCard from '../../component/product/ProductCard';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './Order.css'; // Import the CSS file

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user ? user._id : null;

                if (!userId) {
                    throw new Error('User not logged in');
                }

                const response = await fetch(`https://addajaipur.onrender.com/api/user-actions/orders/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data.orders);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Function to handle order cancellation
    const handleCancelOrder = async (orderId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to cancel this order?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`https://addajaipur.onrender.com/api/user-actions/orders/${orderId}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        throw new Error('Failed to cancel the order');
                    }

                    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));

                    Swal.fire('Cancelled!', 'Your order has been cancelled.', 'success');
                } catch (error) {
                    Swal.fire('Error!', error.message, 'error');
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="orders-container">
                <h1 className="orders-title">Your Orders</h1>
                <div className="skeleton-grid">
                    <div className="skeleton-loader"></div>
                    <div className="skeleton-loader"></div>
                    <div className="skeleton-loader"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="orders-error">Error: {error}</div>;
    }

    return (
        <div className="orders-container">
            <h1 className="orders-title">Your Orders</h1>
            {orders.length === 0 ? (
                <p className="orders-empty">No orders found.</p>
            ) : (
                <div className="orders-grid">
                    {orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <h2 className="order-id">Order ID: {order._id}</h2>
                            <p className="order-date">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p className="order-status">Status: {order.status}</p>
                            <h3 className="order-products-title">Products:</h3>
                            <div className="order-products">
                                {order.products.map((product) => (
                                    <ProductCard key={product._id._id} product={product._id} quantity={product.quantity} />
                                ))}
                            </div>
                            <button className="cancel-order-btn" onClick={() => handleCancelOrder(order._id)}>
                                Cancel Order
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
