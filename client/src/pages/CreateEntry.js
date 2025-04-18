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
    axios.get('/api/journal/moods')
      .then(res => setMoods(res.data))
      .catch(err => console.error('Failed to fetch moods', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get user location
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude: lat, longitude: lon } = position.coords;

      try {
        await axios.post('/api/journal', {
          ...form,
          lat,
          lon
        });

        setMessage('Entry created!');
        setTimeout(() => navigate('/dashboard'), 1500);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to create entry');
      }
    }, () => {
      setMessage('Location permission denied');
    });
  };

  return (
    <div className="min-h-screen bg-sky-200 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Sun */}
      <div className="absolute top-[-3rem] right-[10%] w-36 h-36 bg-yellow-300 rounded-full shadow-lg z-0 animate-pulse" />

      {/* Triangular Mountains */}
      {[
        { left: "5%", height: "80px", width: "60px" },
        { left: "15%", height: "120px", width: "80px" },
        { left: "25%", height: "100px", width: "70px" },
        { left: "40%", height: "140px", width: "100px" },
        { left: "55%", height: "110px", width: "75px" },
        { left: "70%", height: "130px", width: "85px" },
        { left: "85%", height: "90px", width: "60px" },
      ].map((t, i) => (
        <div
          key={i}
          className="absolute bottom-0 z-0"
          style={{
            left: t.left,
            width: t.width,
            height: t.height,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            backgroundColor: "#ffffff",
          }}
        />
      ))}

      {/* Title */}
      <h1
