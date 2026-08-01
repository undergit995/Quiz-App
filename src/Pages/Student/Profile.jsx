import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Or your preferred API client

// Base URL for your backend API
const API_BASE_URL = 'https://quiz-backend-cw2w.onrender.com';

const StudentProfile = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    profilePic: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Function to get the auth token (replace with your actual logic)
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Create an Axios instance with default headers
  const apiClient = axios.create({
    baseURL: `${API_BASE_URL}`,
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('');
        setStudentData(response.data.student);
        setPreviewImage(`${API_BASE_URL}/${response.data.student.profilePic}`);
      } catch (err) {
        setError('Failed to fetch profile data.');
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview of new image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const formData = new FormData();
    formData.append('name', studentData.name);
    formData.append('email', studentData.email);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const response = await apiClient.put('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setStudentData(response.data.student);
      setPreviewImage(`${API_BASE_URL}/${response.data.student.profilePic}`);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>My Profile</h2>
      {previewImage && (
        <img
          src={previewImage}
          alt="Profile"
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', display: 'block', margin: '1rem auto' }}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={studentData.name}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={studentData.email}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="profilePic">Change Profile Picture:</label>
          <input
            type="file"
            id="profilePic"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ width: '100%', marginTop: '4px' }}
          />
        </div>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Update Profile</button>
      </form>
    </div>
  );
};

export default StudentProfile;