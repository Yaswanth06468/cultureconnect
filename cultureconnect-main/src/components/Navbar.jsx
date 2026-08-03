import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import React from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { isDark } = useTheme();

    const { user, logout } = React.useContext(AuthContext);
    
    // Fallback for role if still in localStorage
    const [role, setRole] = useState(localStorage.getItem('role'));

    useEffect(() => {
        setRole(localStorage.getItem('role'));
    }, [location]);

    const username = user?.username;
    const token = !!user || !!localStorage.getItem('token');
    const avatar = user?.avatar;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
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
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b navbar-glass-mobile ${isScrolled || isMobileMenuOpen ? 'navbar-glass py-3' : 'bg-[#0a0a0f]/60 backdrop-blur-md py-4 border-white/5'}`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 mr-8 flex-shrink-0 group">
                    <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-emerald-500/30 shadow-[0_0_15px_rgba(15,240,160,0.2)] group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-500">
                        <img 
                            src="/culture_premium_logo_v2.png" 
                            alt="Culture Logo" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0ff0a0]/20 to-transparent"></div>
                    </div>
                    <span className="text-2xl font-serif font-black tracking-tighter text-white group-hover:text-[#0ff0a0] transition-colors duration-300">
                        CULTURE<span className="text-[#0ff0a0]">CONNECT</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-1 justify-center">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`transition-all duration-300 flex items-center gap-2 px-3.5 py-1.5 rounded-full group ${isActive ? 'bg-emerald-500/10 border border-emerald-500/30 text-[#0ff0a0]' : 'hover:bg-white/5 border border-transparent'}`}
                            >
                                <span className={`transition-all duration-300 ${isActive ? 'text-[#0ff0a0]' : 'text-zinc-400 group-hover:text-[#0ff0a0]'}`}>{link.icon}</span>
                                <span className={`text-[12px] font-sans font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-[#0ff0a0]' : 'text-zinc-300 group-hover:text-white'}`}>
                                    {link.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4 ml-8 flex-shrink-0">
                    {role === 'admin' && (
                        <Link
                            to="/admin"
                            className="px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-1.5"
                            style={{
                                background: 'linear-gradient(135deg, #0ff0a0, #00b4d8)',
                                color: '#050508',
                                boxShadow: '0 0 20px rgba(15,240,160,0.3)',
                            }}
                        >
                            <span>🛡️</span> Admin
                        </Link>
                    )}
                    {token ? (
                        <>
                            <Link to={`/profile/${username}`} className="flex items-center gap-2.5 group px-3 py-1.5 rounded-full border border-white/10 hover:border-emerald-500/40 bg-white/5 transition-all duration-300">
                                {avatar ? (
                                    <img
                                        src={avatar}
                                        alt={username}
                                        className="w-7 h-7 rounded-full object-cover border border-[#0ff0a0]/60 group-hover:border-[#0ff0a0] transition-all duration-300 shadow-sm"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-emerald-500/20 text-[#0ff0a0] border border-[#0ff0a0]/40">
                                        {username?.[0]?.toUpperCase() || '?'}
                                    </div>
                                )}
                                <span className="text-xs font-bold text-zinc-200 group-hover:text-[#0ff0a0] transition-colors">{username}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 text-xs font-bold tracking-wider uppercase rounded-full border border-white/15 text-zinc-300 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-5 py-2 text-xs font-bold tracking-wider uppercase rounded-full border border-white/20 text-zinc-200 hover:text-white hover:border-[#0ff0a0]/50 hover:bg-[#0ff0a0]/10 transition-all duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-6 py-2 text-xs font-bold tracking-wider uppercase rounded-full transition-all duration-300 text-black bg-[#0ff0a0] hover:bg-[#34d399] shadow-[0_0_20px_rgba(15,240,160,0.3)] hover:shadow-[0_0_25px_rgba(15,240,160,0.5)]"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden focus:outline-none text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden absolute top-full left-0 w-full p-6 flex flex-col gap-6 animate-fade-in shadow-2xl obsidian-glass border-b border-white/10"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="flex items-center gap-5 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="text-zinc-400 group-hover:text-[#0ff0a0] transition-colors scale-125">{link.icon}</span>
                            <span className="text-2xl font-serif font-black tracking-tight text-zinc-200 group-hover:text-[#0ff0a0] transition-colors">
                                {link.name}
                            </span>
                        </Link>
                    ))}
                    {role === 'admin' && (
                        <Link
                            to="/admin"
                            className="flex items-center gap-5 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="scale-125">🛡️</span>
                            <span className="text-2xl font-serif font-black tracking-tight text-[#0ff0a0]">
                                Admin Portal
                            </span>
                        </Link>
                    )}
                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 text-sm font-bold tracking-wider uppercase rounded-xl border border-red-500/40 text-red-400 bg-red-500/10"
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="flex flex-col gap-3 pt-2">
                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full text-center py-3 font-bold rounded-xl border border-white/20 text-white bg-white/5"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full text-center py-3 font-bold rounded-xl text-black bg-[#0ff0a0] shadow-[0_0_20px_rgba(15,240,160,0.3)]"
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
