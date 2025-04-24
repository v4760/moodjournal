import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import Login       from './pages/Login';
import Register    from './pages/Register';
import Dashboard   from './pages/Dashboard';
import CreateEntry from './pages/CreateEntry';
import EditEntry   from './pages/EditEntry';

// Send cookies on all requests
axios.defaults.withCredentials = true;

// Guard for protected routes with debug logs
function ProtectedRoute({ children }) {
  const [ok, setOk] = useState(null);
  const loc = useLocation();

  useEffect(() => {
    console.log('[ProtectedRoute] ping:', `${process.env.REACT_APP_API_URL}/ping`);
    axios.get(`${process.env.REACT_APP_API_URL}/ping`)
      .then(() => {
        console.log('[ProtectedRoute] ping success');
        setOk(true);
      })
      .catch(err => {
        console.error('[ProtectedRoute] ping error:', err);
        setOk(false);
      });
  }, [loc]);

  console.log('[ProtectedRoute] ok state:', ok, 'at', loc.pathname);

  if (ok === null) return <div>Loading…</div>;
  if (ok === false) {
    console.log('[ProtectedRoute] redirect to /login');
    return <Navigate to="/login" replace />;
  }
  console.log('[ProtectedRoute] rendering children');
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateEntry />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditEntry />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;