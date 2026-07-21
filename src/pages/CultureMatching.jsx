import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const CultureMatching = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [toasts, setToasts] = useState([]);
    const [connectedPeers, setConnectedPeers] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('connectedPeers') || '[]');
        } catch { return []; }
    });
    const suggestionsRef = useRef(null);
    const peersRef = useRef(null);

    // Culture → relevant navigation targets
    const cultureRoutes = {
        Marathi: { path: '/culture-swap', state: 'Maharashtra' },
        Malayalam: { path: '/culture-swap', state: 'Kerala' },
        Tamil: { path: '/culture-swap', state: 'Tamil Nadu' },
        Telugu: { path: '/culture-swap', state: 'Andhra Pradesh' },
        Bengali: { path: '/culture-swap', state: 'West Bengal' },
        Punjabi: { path: '/culture-swap', state: 'Punjab' },
    };

    const suggestions = [
        {
            from: "Telugu",
            to: "Marathi",
            description: "Since you explored the classical rhythms of Kuchipudi, you'll love the energetic beats of Lavani.",
            fromImg: "/telugu_culture.png",
            toImg: "/marathi_culture.png",
            color: "var(--theme-accent-purple)"
        },
        {
            from: "Bengali",
            to: "Malayalam",
            description: "Your interest in Baul music pairs perfectly with the soulful Sopana Sangeetham of Kerala.",
            fromImg: "https://images.unsplash.com/photo-1582376432754-b63cc6a9b8c3?auto=format&fit=crop&q=80&w=800",
            toImg: "https://images.unsplash.com/photo-1602216056096-3c40cc0c9944?auto=format&fit=crop&q=80&w=800",
            color: "var(--theme-accent-teal)"
        },
        {
            from: "Punjabi",
            to: "Tamil",
            description: "The vibrant colors of Phulkari find a beautiful contrast in the intricate weaves of Kanjeevaram.",
            fromImg: "https://images.unsplash.com/photo-1597113366853-9a959195d4ed?auto=format&fit=crop&q=80&w=800",
            toImg: "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?auto=format&fit=crop&q=80&w=800",
            color: "var(--theme-accent-terra)"
        }
    ];

    const peers = [
        { name: "Arjun Rao", state: "Andhra Pradesh", culture: "Telugu", bio: "Kuchipudi practitioner & History buff." },
        { name: "Priya Deshmukh", state: "Maharashtra", culture: "Marathi", bio: "Lavani dancer & Traditional chef." },
        { name: "Rahul Nair", state: "Kerala", culture: "Malayalam", bio: "Kathakali enthusiast & Travel blogger." },
        { name: "Ananya Das", state: "West Bengal", culture: "Bengali", bio: "Rabindra Sangeet singer & Poet." }
    ];

    // Toast notification system
    const showToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3500);
    }, []);

    // Save connected peers to localStorage
    useEffect(() => {
        localStorage.setItem('connectedPeers', JSON.stringify(connectedPeers));
    }, [connectedPeers]);

    // Auto-cycle suggestions
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSuggestion(prev => (prev + 1) % suggestions.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [suggestions.length]);

    const handleExploreCulture = (cultureName) => {
        const route = cultureRoutes[cultureName];
        if (route) {
            navigate(route.path);
            showToast(`🌍 Exploring ${cultureName} culture from ${route.state}!`);
        } else {
            navigate('/culture-swap');
            showToast(`🌍 Explore ${cultureName} on Culture Swap!`);
        }
    };

    const handleStartExploration = () => {
        suggestionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showToast('🔍 Scroll through our curated cultural pairings below!', 'info');
    };

    const handleLearnMore = () => {
        peersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleSendConnect = (peer) => {
        if (connectedPeers.includes(peer.name)) {
            showToast(`You've already sent a request to ${peer.name}`, 'info');
            return;
        }
        setConnectedPeers(prev => [...prev, peer.name]);
        showToast(`✅ Connection request sent to ${peer.name} from ${peer.state}!`);
    };

    const handleViewAllStudents = () => {
        navigate('/culture-swap');
        showToast('👥 Browse all cultural peers on Culture Swap!');
    };

    const handleJoinMovement = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/culture-swap');
            showToast('🎉 You\'re already part of the movement! Start swapping cultures.');
        } else {
            navigate('/signup');
            showToast('🚀 Sign up to join 5,000+ cultural explorers!');
        }
    };

    return (
        <div className="pt-24 pb-20 px-6 min-h-screen theme-transition" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
            {/* Toast Notifications */}
            <div style={{
                position: 'fixed',
                top: '90px',
                right: '24px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                pointerEvents: 'none',
            }}>
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        style={{
                            padding: '14px 24px',
                            borderRadius: '16px',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '14px',
                            backdropFilter: 'blur(20px)',
                            background: toast.type === 'info'
                                ? 'linear-gradient(135deg, rgba(59,130,246,0.9), rgba(99,102,241,0.9))'
                                : 'linear-gradient(135deg, rgba(16,185,129,0.9), rgba(5,150,105,0.9))',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                            animation: 'slideInRight 0.4s cubic-bezier(0.16,1,0.3,1), fadeOutRight 0.4s 3s forwards',
                            pointerEvents: 'auto',
                            maxWidth: '380px',
                        }}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>

            {/* Hero Section */}
            <div className="container mx-auto max-w-7xl">
                <div className="relative rounded-[2.5rem] overflow-hidden mb-20 group animate-fade-in">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="/cultural_connection_hero.png" 
                            alt="Cultural Connection" 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 p-12 md:p-20 flex flex-col justify-center min-h-[500px]">
                        <h4 className="text-accent-teal font-bold tracking-[0.3em] uppercase mb-4 animate-slide-left">Intelligent Matching</h4>
                        <h1 className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-8 max-w-2xl animate-fade-in-up">
                            Bridge the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-teal">Gap</span> Between States.
                        </h1>
                        <p className="text-xl text-white/70 max-w-xl mb-10 animate-fade-in-up delay-100">
                            Our AI-driven cross-culture engine suggests new experiences based on your journey and connects you with students from across India.
                        </p>
                        <div className="flex gap-4 animate-fade-in-up delay-200">
                            <button 
                                onClick={handleStartExploration}
                                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform cursor-pointer"
                            >
                                Start Exploration
                            </button>
                            <button 
                                onClick={handleLearnMore}
                                className="px-8 py-4 border border-white/30 text-white font-bold rounded-full backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Suggestions Engine */}
                <div className="mb-24" ref={suggestionsRef}>
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-serif font-black mb-4">Discovery Pairings</h2>
                            <p className="text-theme-text-secondary max-w-lg">
                                Based on your recent explorations, we think you'll appreciate these cultural transitions.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {suggestions.map((_, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setActiveSuggestion(idx)}
                                    className={`w-12 h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSuggestion === idx ? 'bg-accent-purple w-20' : 'bg-theme-border hover:bg-theme-text-muted'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[450px] rounded-[2rem] overflow-hidden shadow-2xl animate-scale-in">
                            <div className="absolute inset-0 flex">
                                <div className="w-1/2 h-full overflow-hidden border-r-4 border-white/20">
                                    <img src={suggestions[activeSuggestion].fromImg} alt={suggestions[activeSuggestion].from} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/30"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="text-xs uppercase tracking-widest opacity-70">You Explored</p>
                                        <p className="text-2xl font-serif font-bold">{suggestions[activeSuggestion].from}</p>
                                    </div>
                                </div>
                                <div className="w-1/2 h-full overflow-hidden">
                                    <img src={suggestions[activeSuggestion].toImg} alt={suggestions[activeSuggestion].to} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/30"></div>
                                    <div className="absolute bottom-6 right-6 text-right text-white">
                                        <p className="text-xs uppercase tracking-widest opacity-70">Try Next</p>
                                        <p className="text-2xl font-serif font-bold">{suggestions[activeSuggestion].to}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl z-20">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-8 animate-slide-right">
                            <div className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: `${suggestions[activeSuggestion].color}20`, color: suggestions[activeSuggestion].color }}>
                                AI Recommendation
                            </div>
                            <h3 className="text-5xl font-serif font-black leading-tight">
                                From {suggestions[activeSuggestion].from} to {suggestions[activeSuggestion].to}: <br/>
                                <span className="text-theme-text-secondary opacity-50 italic">A Natural Journey.</span>
                            </h3>
                            <p className="text-xl leading-relaxed text-theme-text-secondary">
                                {suggestions[activeSuggestion].description}
                            </p>
                            <div className="pt-4">
                                <button 
                                    onClick={() => handleExploreCulture(suggestions[activeSuggestion].to)}
                                    className="px-10 py-5 bg-accent-purple text-white font-black rounded-2xl shadow-xl shadow-accent-purple/30 hover:-translate-y-1 transition-all cursor-pointer active:scale-95"
                                >
                                    Explore {suggestions[activeSuggestion].to} Culture
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Peer Connections */}
                <div ref={peersRef} className="rounded-[3rem] p-12 md:p-20 theme-transition overflow-hidden relative" style={{ backgroundColor: 'var(--theme-bg-accent)' }}>
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                        <svg className="w-full h-full text-accent-gold" fill="currentColor" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
                            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-serif font-black mb-6">Connect with Cultural Peers</h2>
                            <p className="text-xl text-theme-text-secondary max-w-2xl mx-auto">
                                Meet students from different states who share your passion for cultural exchange.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {peers.map((peer, idx) => {
                                const isConnected = connectedPeers.includes(peer.name);
                                return (
                                    <div key={idx} className="group bg-theme-card-bg p-8 rounded-[2rem] border border-theme-border hover:border-accent-teal transition-all hover:shadow-2xl hover:-translate-y-2">
                                        <div className="w-16 h-16 rounded-2xl bg-accent-teal/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                            👤
                                        </div>
                                        <h4 className="text-xl font-bold mb-1">{peer.name}</h4>
                                        <p className="text-accent-teal text-sm font-bold uppercase tracking-tighter mb-4">{peer.state}</p>
                                        <p className="text-theme-text-secondary text-sm mb-6 leading-relaxed">
                                            {peer.bio}
                                        </p>
                                        <button 
                                            onClick={() => handleSendConnect(peer)}
                                            disabled={isConnected}
                                            className="w-full py-3 rounded-xl border font-bold text-sm transition-all cursor-pointer active:scale-95"
                                            style={isConnected ? {
                                                backgroundColor: 'var(--theme-accent-teal, #14b8a6)',
                                                color: '#fff',
                                                borderColor: 'var(--theme-accent-teal, #14b8a6)',
                                                cursor: 'default',
                                            } : {
                                                borderColor: 'var(--theme-border)',
                                            }}
                                            onMouseEnter={e => {
                                                if (!isConnected) {
                                                    e.target.style.backgroundColor = 'var(--theme-accent-teal, #14b8a6)';
                                                    e.target.style.color = '#fff';
                                                    e.target.style.borderColor = 'var(--theme-accent-teal, #14b8a6)';
                                                }
                                            }}
                                            onMouseLeave={e => {
                                                if (!isConnected) {
                                                    e.target.style.backgroundColor = 'transparent';
                                                    e.target.style.color = '';
                                                    e.target.style.borderColor = 'var(--theme-border)';
                                                }
                                            }}
                                        >
                                            {isConnected ? '✓ Request Sent' : 'Send Connect'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-16 text-center">
                            <button 
                                onClick={handleViewAllStudents}
                                className="inline-flex items-center gap-3 text-lg font-black group cursor-pointer"
                            >
                                <span>View all students</span>
                                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-24 text-center px-6">
                    <div className="max-w-4xl mx-auto py-20 rounded-[4rem] bg-gradient-to-br from-accent-purple to-accent-blue text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-serif font-black mb-8">Ready to expand your <br/> cultural horizon?</h2>
                            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                                Join 5,000+ students already participating in cross-state cultural matching.
                            </p>
                            <button 
                                onClick={handleJoinMovement}
                                className="px-12 py-6 bg-white text-accent-purple font-black text-xl rounded-full shadow-2xl hover:scale-110 transition-transform cursor-pointer active:scale-95"
                            >
                                Join the Movement
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast animation keyframes */}
            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(120%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(120%); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default CultureMatching;
