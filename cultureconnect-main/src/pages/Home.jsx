
import Hero from '../components/Hero';
import ProblemStatement from '../components/ProblemStatement';
import Features from '../components/Features';
import CulturalShowcase from '../components/CulturalShowcase';
import Community from '../components/Community';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="pt-24">
            <Hero />
            <ProblemStatement />
            <Features />
            <CulturalShowcase />
            <Community />
            <Footer />

            {/* Dark / Light Mode Toggle — only on Home page */}
            <div className="theme-toggle" id="theme-toggle">
                <span className="theme-toggle__label">
                    {isDark ? 'Dark' : 'Light'}
                </span>
                <button
                    className="theme-toggle__track"
                    onClick={toggleTheme}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    id="theme-toggle-button"
                >
                    <span className={`theme-toggle__knob ${isDark ? '' : ''}`} style={isDark ? { transform: 'translateX(26px)', background: '#2a2a2a' } : {}}>
                        <span className="theme-toggle__icon">
                            {isDark ? '🌙' : '☀️'}
                        </span>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Home;
