import RegistrationPage from './pages/registrationpage';
import LandingPage from './pages/landingpage';
import Dashboard from './pages/dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
