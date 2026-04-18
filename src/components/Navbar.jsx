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
        { name: 'Feed', href: '/feed' },
        { name: 'Events Board', href: '/events' },
        { name: 'Translate', href: '/translate' },
        { name: 'Cultural Dances', href: '/dances' },
        { name: '🍽️ City Food', href: '/city-food' },
        { name: '🌏 Culture Swap', href: '/culture-swap' },
        { name: 'Discover', href: '/#discover' },
        { name: 'Community', href: '/#community' },
        { name: 'About', href: '/#about' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b theme-transition`}
            style={{
                backgroundColor: isScrolled ? 'var(--theme-bg-primary)' : 'transparent',
                borderColor: isScrolled ? 'var(--theme-border)' : 'transparent',
                padding: isScrolled ? '1rem 0' : '1.5rem 0',
                boxShadow: isScrolled ? `0 1px 8px var(--theme-shadow)` : 'none',
            }}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-serif font-bold tracking-tight mr-8 flex-shrink-0" style={{ color: 'var(--theme-text-primary)' }}>
                    Culture<span className="font-light italic text-accent-terra">Connect</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8 flex-1 justify-center">
                    {navLinks.map((link) => (
                        link.href.startsWith('/#') ? (
                            <a
                                key={link.name}
                                href={link.href}
                                className="transition-colors text-sm font-medium tracking-wide uppercase"
                                style={{ color: 'var(--theme-text-secondary)' }}
                                onMouseEnter={e => e.target.style.color = 'var(--theme-text-primary)'}
                                onMouseLeave={e => e.target.style.color = 'var(--theme-text-secondary)'}
                            >
                                {link.name}
                            </a>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="transition-colors text-sm font-medium tracking-wide uppercase"
                                style={{ color: 'var(--theme-text-secondary)' }}
                                onMouseEnter={e => e.target.style.color = 'var(--theme-text-primary)'}
                                onMouseLeave={e => e.target.style.color = 'var(--theme-text-secondary)'}
                            >
                                {link.name}
                            </Link>
                        )
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
                        link.href.startsWith('/#') ? (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-xl font-serif font-medium"
                                style={{ color: 'var(--theme-text-primary)' }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-xl font-serif font-medium"
                                style={{ color: 'var(--theme-text-primary)' }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        )
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
