import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const ProfileDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetchProfile(user.id);
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/members/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProfile(response.data);
      // setEditedProfile(response.data); // Initialize editedProfile with profile data
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedProfile(profile); // Revert changes
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:8080/api/members/${user.id}`, editedProfile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center mb-2">
          <span className="font-semibold text-gray-600 w-1/3">First Name:</span>
          {isEditing ? (
            <input
              type="text"
              name="prenom"
              value={editedProfile.prenom || ''}
              onChange={handleInputChange}
              className="ml-2 text-gray-800 border border-gray-300 rounded px-2 py-1 w-full"
            />
          ) : (
            <input
              type="text"
              value={profile.prenom}
              disabled
              className="ml-2 text-gray-800 border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
            />
          )}
        </div>
        <div className="flex items-center mb-2">
          <span className="font-semibold text-gray-600 w-1/3">Last Name:</span>
          {isEditing ? (
            <input
              type="text"
              name="nom"
              value={editedProfile.nom || ''}
              onChange={handleInputChange}
              className="ml-2 text-gray-800 border border-gray-300 rounded px-2 py-1 w-full"
            />
          ) : (
            <input
              type="text"
              value={profile.nom}
              disabled
              className="ml-2 text-gray-800 border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
            />
          )}
        </div>
        <div className="flex items-center mb-2">
          <span className="font-semibold text-gray-600 w-1/3">Email:</span>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedProfile.email || ''}
              onChange={handleInputChange}
              className="ml-2 text-gray-800 border border-gray-300 rounded px-2 py-1 w-full"
            />
          ) : (
            <input
              type="email"
              value={profile.email}
              disabled
              className="ml-2 text-gray-800 border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
            />
          )}
        </div>
        <div className="flex items-center mb-2">
          <span className="font-semibold text-gray-600 w-1/3">Date of Registration:</span>
          <input
            type="text"
            value={new Date(profile.date_inscription).toLocaleDateString()}
            disabled
            className="ml-2 text-gray-800 border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="font-semibold text-gray-600 w-1/3">Account Verified:</span>
          <input
            type="text"
            value={profile.compte_verifie ? 'Yes' : 'No'}
            disabled
            className="ml-2 text-gray-800 border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
          />
        </div>
      </div>
      <div className="mt-6 text-center">
        {isEditing ? (
          <div>
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-2"
            >
              <FaSave className="inline-block mr-1" /> Save
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              <FaTimes className="inline-block mr-1" /> Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            <FaEdit className="inline-block mr-1" /> Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;
