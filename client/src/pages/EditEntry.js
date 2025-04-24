import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditEntry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', mood_id: '' });
  const [moods, setMoods] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/journal/moods`, {
        withCredentials: true,
      })
      .then(res => setMoods(res.data))
      .catch(() => setMessage('Failed to load moods'));

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/journal/${id}`, {
        withCredentials: true,
      })
      .then(res => {
        const e = res.data;
        setForm({ title: e.title, content: e.content, mood_id: e.mood_id });
      })
      .catch(() => setMessage('Failed to load entry'));
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'mood_id' ? parseInt(value) : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/journal/${id}`, form, {
        withCredentials: true,
      });
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-700 via-blue-900 to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Animated raindrops */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-white opacity-20 rounded-full"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 15 + 10}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `rain ${Math.random() * 2 + 1.5}s linear infinite`,
          }}
        ></div>
      ))}

      {/* Form Card */}
      <div className="bg-white shadow-2xl rounded-xl px-8 py-10 w-[90%] max-w-lg z-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Edit Journal Entry</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="What’s on your mind?"
            required
            className="p-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <select
            name="mood_id"
            value={form.mood_id}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Mood</option>
            {moods.map(m => (
              <option key={m.mood_id} value={m.mood_id}>
                {m.mood_name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
          >
            Save Changes
          </button>
        </form>
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
}
