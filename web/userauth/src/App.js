import RegistrationPage from './pages/registrationpage';
import LandingPage from './pages/landingpage';
import Dashboard from './pages/dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './pages/protectedroute';
import { UserProvider } from './pages/UserContext';
import './App.css';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
