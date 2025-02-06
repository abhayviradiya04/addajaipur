import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Swal from 'sweetalert2';

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
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [cityCode, setCityCode] = useState('');

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
        setAddressLine1(data.addressLine1 || '');
        setAddressLine2(data.addressLine2 || '');
        setCity(data.city || '');
        setState(data.state || '');
        setCountry(data.country || '');
        setCityCode(data.cityCode || '');
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
      const response = await fetch(` http://localhost:5000/api/users/updateUser/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          name, 
          email,
          addressLine1,
          addressLine2,
          city,
          state,
          country,
          cityCode
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      // Refresh user data after successful update
      const refreshedResponse = await fetch(`https://addajaipur.onrender.com/api/users/${user._id}`);
      const refreshedData = await refreshedResponse.json();
      
      // Update all state variables
      setUser(refreshedData);
      setName(refreshedData.name);
      setEmail(refreshedData.email);
      setAddressLine1(refreshedData.addressLine1);
      setAddressLine2(refreshedData.addressLine2);
      setCity(refreshedData.city);
      setState(refreshedData.state);
      setCountry(refreshedData.country);
      setCityCode(refreshedData.cityCode);

      await Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Changes will reflect immediately',
        timer: 2000,
        showConfirmButton: false
      });

      setEditMode(false);
      navigate('/profile');

    } catch (err) {
      setError('Failed to update profile.');
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err.message || 'Could not update profile',
      });
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
            <div className="form-group">
              <label>Address Line 1:</label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Address Line 2:</label>
              <input
                type="text"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>State:</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Country:</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>ZIP Code:</label>
              <input
                type="text"
                value={cityCode}
                onChange={(e) => setCityCode(e.target.value)}
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
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong></p>
            <p>{user.addressLine1}</p>
            {user.addressLine2 && <p>{user.addressLine2}</p>}
            <p>{user.city}, {user.state}</p>
            <p>{user.country} - {user.cityCode}</p>
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