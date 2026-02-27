import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import useAuthStore from './stores/authStore';

function App() {
  useEffect(() => {
    const checkAuth = useAuthStore.getState().checkAuth;
    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;