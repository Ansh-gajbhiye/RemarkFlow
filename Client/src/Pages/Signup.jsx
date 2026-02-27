import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    console.log('Signup:', formData);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        
        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border rounded"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;