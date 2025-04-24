import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateEntry() {
  const [form, setForm] = useState({ title: '', content: '', mood_id: '' });
  const [moods, setMoods] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Get mood list from backend
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/journal/moods`, {
        withCredentials: true,
      })
      .then(res => setMoods(res.data))
      .catch(err => console.error('Failed to fetch moods', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get user location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;

        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/journal`,
            { ...form, lat, lon },
            { withCredentials: true }
          );

          setMessage('Entry created!');
          setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
          setMessage(err.response?.data?.message || 'Failed to create entry');
        }
      },
      () => {
        setMessage('Location permission denied');
      }
    );
  };

  return (
    <div className="min-h-screen bg-sky-200 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Sun */}
      <div className="absolute top-[-3rem] right-[10%] w-36 h-36 bg-yellow-300 rounded-full shadow-lg z-0 animate-pulse" />

      {/* Triangular Mountains */}
      {[
        { left: '5%', height: '80px', width: '60px' },
        { left: '15%', height: '120px', width: '80px' },
        { left: '25%', height: '100px', width: '70px' },
        { left: '40%', height: '140px', width: '100px' },
        { left: '55%', height: '110px', width: '75px' },
        { left: '70%', height: '130px', width: '85px' },
        { left: '85%', height: '90px', width: '60px' },
      ].map((t, i) => (
        <div
          key={i}
          className="absolute bottom-0 z-0"
          style={{
            left: t.left,
            width: t.width,
            height: t.height,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            backgroundColor: '#ffffff',
          }}
        />
      ))}

      {/* Title */}
      <h1 className="text-4xl font-bold text-blue-700 mb-8 z-10">Write from the mountains...</h1>

      {/* Form Card */}
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl px-8 py-10 z-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Create New Journal Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <textarea
            name="content"
            placeholder="What’s on your mind?"
            value={form.content}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <select
            name="mood_id"
            value={form.mood_id}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Mood</option>
            {moods.map((mood) => (
              <option key={mood.mood_id} value={mood.mood_id}>
                {mood.mood_name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Save Entry
          </button>
        </form>
        {message && <p className="text-center text-green-700 mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default CreateEntry;
