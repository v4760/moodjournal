import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/register`,
        form,
        {
          withCredentials: true,
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-yellow-100 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ocean Waves */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-blue-400 to-sky-300 rounded-t-[50%] z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-white opacity-70 rounded-t-[50%] z-0"></div>

      {/* Sun */}
      <div className="absolute top-[5%] right-[10%] w-24 h-24 bg-yellow-300 rounded-full shadow-xl z-0 animate-pulse" />

      {/* Title */}
      <h1 className="text-5xl font-bold text-blue-700 mb-8 z-10">Your journey starts here...</h1>

      {/* Register Form */}
      <div className="bg-white shadow-2xl rounded-xl px-8 py-10 w-[90%] max-w-md z-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>
        {message && (
          <p className="text-center text-green-600 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Register;
