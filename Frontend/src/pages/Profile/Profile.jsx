import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const ProfileSkeleton = () => {
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-button"></div>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`https://addajaipur.onrender.com/api/users/${userData._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://addajaipur.onrender.com/api/users/updateUser/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {error && <p className="error">{error}</p>}
      <div className="profile-content">
        <div className="profile-image">
          <img
            src="data:image/png;base64,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" // Static user image placeholder
            alt="User"
            className="user-image"
          />
        </div>
        {editMode ? (
          <form onSubmit={handleUpdate} className="profile-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button onClick={() => setEditMode(true)} className="edit-button">
              Edit Profile
            </button>
          </div>
        )}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;