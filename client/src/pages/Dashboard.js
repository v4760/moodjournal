import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/journal`, { withCredentials: true })
      .then(res => setEntries(res.data))
      .catch(() => setMessage('Failed to load entries'));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/journal/${id}`, { withCredentials: true });
      setEntries(prev => prev.filter(e => e.entry_id !== id));
    } catch {
      setMessage('Delete failed');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/logout`, {}, { withCredentials: true });
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const getBgByWeather = (weather) => {
    if (!weather) return 'bg-white';
    const w = weather.toLowerCase();
    if (w.includes('rain')) return 'bg-blue-100';
    if (w.includes('sunny') || w.includes('clear')) return 'bg-yellow-100';
    if (w.includes('cloud')) return 'bg-gray-200';
    return 'bg-white';
  };

  const headerBg = entries[0] ? getBgByWeather(entries[0].weather_info) : 'bg-white';

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-start justify-center p-6"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80')`,
      }}
    >
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-lg p-6 shadow-lg mt-10">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Journal</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/create')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
            >
              ＋ New Entry
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow"
            >
              Logout
            </button>
          </div>
        </header>

        {message && <div className="mb-4 text-red-600">{message}</div>}

        <ul>
          {entries.map(e => (
            <li
              key={e.entry_id}
              className="bg-white rounded-xl shadow-md p-6 mb-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{e.title}</h3>
                  <p className="text-gray-600 mb-1"><strong>Mood:</strong> {e.mood?.mood_name}</p>
                  <p className="text-gray-600 mb-2"><strong>Weather:</strong> {e.weather_info}</p>
                  <p className="text-gray-700">{e.content}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/edit/${e.entry_id}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e.entry_id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
