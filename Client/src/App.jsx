import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/DashboardPage';
import FormInput from './Components/FormInput';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/form" element={<FormInput />} />
    </Routes>
  );
}