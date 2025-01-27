// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, editingUser, setEditingUser, updateUser }) => {
    const [user, setUser] = useState({
        id: Date.now(),
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (editingUser) {
            setUser(editingUser);
        }
    }, [editingUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            // Update existing user
            updateUser(user); // Call update function
        } else {
            addUser(user);
        }
        setUser({ id: Date.now(), name: '', email: '', password: '' }); // Reset form
        setEditingUser(null); // Reset editing state
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
            <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
            <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
        </form>
    );
};

export default UserForm;