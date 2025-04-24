import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`, 
        form, 
        {
          withCredentials: true,
        }
      );
      navigate('/dashboard');
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Login failed';
      setMessage(errMsg);
    }
  }

  return (
    <div className="h-screen w-full bg-gradient-to-b from-sky-200 to-blue-100 flex flex-col relative overflow-hidden">
      {/* Sun & Clouds */}
      <div className="absolute top-[-5%] left-[10%] w-40 h-40 bg-yellow-300 rounded-full shadow-lg animate-bounce-slow z-0" />
      <div className="absolute top-[15%] right-[5%] w-60 h-40 bg-white rounded-full blur-xl opacity-70 z-0" />
      <div className="absolute top-[25%] left-[20%] w-40 h-24 bg-white rounded-full blur-md opacity-60 z-0" />

      {/* Title */}
      <h1 className="text-5xl font-bold text-gray-700 text-center mt-12 z-10">Mood Journal</h1>

      {/* Login Card */}
      <div className="flex-grow flex items-end justify-center pb-20 z-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Login
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="w-full mt-4 text-sky-600 underline hover:text-sky-800 transition"
          >
            New here? Register
          </button>

          {message && (
            <p className="text-red-500 text-sm text-center mt-3">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
