import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../Components/FormInput';
import useAuthStore from "../stores/authStore";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Sign in to RemarksFlow</h2>
        
        {error && <div className="bg-red-50 p-4 rounded text-red-800 mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput label="Email" type="email" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} />
          <FormInput label="Password" type="password" value={formData.password} onChange={(v) => setFormData({...formData, password: v})} />
          
          <button type="submit" disabled={isLoading} className="w-full py-2 bg-blue-600 text-white rounded">
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
        <Link to="/register" className="block text-center mt-4 text-blue-600">Register</Link>
      </div>
    </div>
  );
};

export default Login;