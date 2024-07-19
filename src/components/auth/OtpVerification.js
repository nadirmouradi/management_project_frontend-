import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/verify-otp', { otp });
      setMessage(response.data.message);
      if (response.data.success) {
        navigate(`/reset-password/${response.data.token}`);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Erreur lors de la vérification du code.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6" style={{ color: '#429BEE' }}>
          Vérification du code
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Code de vérification:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: '#429BEE' }}
          >
            Vérifier
          </button>
        </form>
        {message && <p className="text-red-500 text-sm mt-1">{message}</p>}
      </div>
    </div>
  );
};

export default OtpVerification;
