import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { isDark } = useTheme();

    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
        setToken(localStorage.getItem('token'));
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsMobileMenuOpen(false);
        navigate('/login');
    };

    const navLinks = [
        { name: 'Feed', href: '/feed', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg> },
        { name: 'Events', href: '/events', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z"/></svg> },
        { name: 'Translate', href: '/translate', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5a18.022 18.022 0 01-3.827-5.802M13.43 5.34c-1.332 3.976-3.59 7.291-6.21 9.422M8 19l2-4m0 0l-5 5m5-5h10l-4-4l-4 4z"/></svg> },
        { name: 'Dances', href: '/dances', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/></svg> },
        { name: 'City Food', href: '/city-food', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg> },
        { name: 'Swap', href: '/culture-swap', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg> },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b theme-transition navbar-glass-mobile ${isScrolled || isMobileMenuOpen ? 'navbar-glass navbar-persistent py-3' : 'bg-transparent py-4'}`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-serif font-bold tracking-tight mr-8 flex-shrink-0" style={{ color: 'var(--theme-text-primary)' }}>
                    Culture
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-2 lg:gap-5 flex-1 justify-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="transition-all flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 group"
                        >
                            <span className="text-white/40 group-hover:text-accent-teal transition-colors">{link.icon}</span>
                            <span 
                                className="text-[12px] font-serif font-black uppercase tracking-widest transition-colors"
                                style={{ color: 'var(--theme-text-secondary)' }}
                                onMouseEnter={e => e.target.style.color = 'var(--theme-text-primary)'}
                                onMouseLeave={e => e.target.style.color = 'var(--theme-text-secondary)'}
                            >
                                {link.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-6 ml-8 flex-shrink-0">
                    {token ? (
                        <>
                            <span className="text-sm font-bold text-accent-teal">Hi, {username}</span>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 text-sm font-medium transition-colors duration-300 theme-transition"
                                style={{
                                    border: `1px solid var(--theme-text-primary)`,
                                    color: 'var(--theme-text-primary)',
                                }}
                                onMouseEnter={e => e.target.style.backgroundColor = 'var(--theme-bg-secondary)'}
                                onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-6 py-2 text-sm font-medium transition-colors duration-300 theme-transition"
                                style={{
                                    border: `1px solid var(--theme-text-primary)`,
                                    color: 'var(--theme-text-primary)',
                                }}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-6 py-2 text-sm font-medium transition-colors duration-300 theme-transition"
                                style={{
                                    backgroundColor: 'var(--theme-text-primary)',
                                    color: 'var(--theme-bg-primary)',
                                }}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden focus:outline-none"
                    style={{ color: 'var(--theme-text-primary)' }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden absolute top-full left-0 w-full p-6 flex flex-col gap-6 animate-fade-in shadow-xl theme-transition"
                    style={{
                        backgroundColor: 'var(--theme-bg-primary)',
                        borderBottom: `1px solid var(--theme-border)`,
                    }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="flex items-center gap-6 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="text-white/40 group-hover:text-accent-teal transition-colors scale-125">{link.icon}</span>
                            <span className="text-3xl font-serif font-black tracking-tight" style={{ color: 'var(--theme-text-primary)' }}>
                                {link.name}
                            </span>
                        </Link>
                    ))}
                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 font-medium"
                            style={{
                                border: `1px solid var(--theme-text-primary)`,
                                color: 'var(--theme-text-primary)',
                            }}
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full text-center py-3 font-medium"
                                style={{
                                    border: `1px solid var(--theme-text-primary)`,
                                    color: 'var(--theme-text-primary)',
                                }}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full text-center py-3 font-medium"
                                style={{
                                    backgroundColor: 'var(--theme-text-primary)',
                                    color: 'var(--theme-bg-primary)',
                                }}
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
