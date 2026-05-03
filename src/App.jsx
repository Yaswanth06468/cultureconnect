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
import AdminDashboard from './pages/AdminDashboard';
import WelcomeModal from './components/WelcomeModal';
import Navbar from './components/Navbar';
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
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
