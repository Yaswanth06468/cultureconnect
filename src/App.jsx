import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import EventsBoard from './pages/EventsBoard';
import Translator from './pages/Translator';
import CulturalDances from './pages/CulturalDances';
import CityFoodExplorer from './pages/CityFoodExplorer';
import CultureSwap from './pages/CultureSwap';
import CultureMatching from './pages/CultureMatching';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import WelcomeModal from './components/WelcomeModal';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { API_BASE_URL } from './config';

function App() {
  useEffect(() => {
    // Wake up the Render server as soon as the user enters the site
    const wakeUpServer = async () => {
      try {
        await fetch(`${API_BASE_URL}/api/ping`);
        // Notify owner about the new visit
        await fetch(`${API_BASE_URL}/api/track-visit`);
      } catch (err) {
        console.log('Server is still waking up...');
      }
    };
    wakeUpServer();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <WelcomeModal />
      <BrowserRouter>
        <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-bg-primary)', color: 'var(--theme-text-primary)', transition: 'background-color 0.4s ease, color 0.4s ease' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/events" element={<EventsBoard />} />
            <Route path="/translate" element={<Translator />} />
            <Route path="/dances" element={<CulturalDances />} />
            <Route path="/city-food" element={<CityFoodExplorer />} />
            <Route path="/culture-swap" element={<CultureSwap />} />
            <Route path="/matching" element={<CultureMatching />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
