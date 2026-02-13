import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from '../Stores/authStore';
import Login from './Pages/Login';

const Dashboard = () => {
  const logout = useAuthStore((s) => s.logout);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <button onClick={logout} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">Logout</button>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  useEffect(() => useAuthStore.getState().checkAuth(), []);
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;