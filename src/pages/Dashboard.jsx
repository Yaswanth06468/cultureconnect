import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const menuItems = [
        { 
            name: 'Home', 
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>, 
            path: '/' 
        },
        { 
            name: 'Jobs', 
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>, 
            path: '/feed' 
        },
        { 
            name: 'Events', 
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z"/></svg>, 
            path: '/events' 
        },
        { 
            name: 'Feed', 
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>, 
            path: '/feed' 
        },
        { 
            name: 'Resources', 
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>, 
            path: '/dances' 
        },
        { 
            name: 'Music', 
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>, 
            path: '/dances' 
        },
        { 
            name: 'Dashboard', 
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>, 
            path: '/dashboard' 
        },
        { 
            name: 'Settings', 
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>, 
            path: '/profile/user' 
        }
    ];

    return (
        <div className={`min-h-screen flex flex-col theme-transition ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} style={{ backgroundColor: isDark ? '#000000' : '#ffffff' }}>
            {/* Header / Close */}
            <div className="flex justify-end p-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="text-3xl hover:opacity-70 transition-opacity"
                >
                    ✕
                </button>
            </div>

            {/* Main Menu */}
            <div className="flex-1 flex flex-col items-start justify-center px-12 md:px-40 max-w-4xl">
                <div className="flex flex-col gap-6 w-full">
                    {menuItems.map((item, index) => (
                        <Link 
                            key={index}
                            to={item.path}
                            className="flex items-center gap-10 group hover:translate-x-6 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)"
                        >
                            <span className="text-white/40 group-hover:text-accent-teal transition-all duration-300 scale-100 group-hover:scale-125 transform-gpu">{item.icon}</span>
                            <span className="text-5xl md:text-6xl font-serif font-black tracking-tight text-white/90 group-hover:text-white transition-all duration-300 antialiased">{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Music Player Footer (Exactly like the image) */}
            <div className="p-4 bg-[#0a0a0a] border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col gap-4">
                    {/* Song Info & Emoji Bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-2">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-14 h-14 bg-accent-terra rounded-lg overflow-hidden shadow-2xl border border-white/10">
                                <img src="https://img.youtube.com/vi/Mmsu1uT0R0c/maxresdefault.jpg" alt="Song" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-black text-white uppercase tracking-tighter truncate max-w-[280px]">ARJUNAR VILLU - LYRIC VIDEO | GHILLI | VIJAY | TRI...</p>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-0.5">AYNGARAN</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 bg-white/5 p-2 rounded-full px-4 border border-white/5">
                            <span className="text-xl px-1 hover:scale-125 cursor-pointer transition-transform">🔥</span>
                            <span className="text-xl px-1 hover:scale-125 cursor-pointer transition-transform">😂</span>
                            <span className="text-xl px-1 hover:scale-125 cursor-pointer transition-transform">😍</span>
                            <span className="text-xl px-1 hover:scale-125 cursor-pointer transition-transform">🤯</span>
                            <span className="text-xl px-1 hover:scale-125 cursor-pointer transition-transform">🤘</span>
                            <span className="text-xl px-1 hover:scale-125 cursor-pointer transition-transform">👍</span>
                            <span className="text-xl px-1 hover:scale-125 cursor-pointer transition-transform">👎</span>
                            <span className="text-xl px-1 hover:scale-125 cursor-pointer transition-transform">🤓</span>
                        </div>
                    </div>
                    
                    {/* Progress Bar & Controls */}
                    <div className="flex items-center gap-8 w-full">
                        <div className="text-[10px] font-black text-accent-teal/80 w-12">0:00</div>
                        <div className="flex-1 h-0.5 bg-white/10 rounded-full relative">
                            <div className="absolute top-0 left-0 w-0 h-full bg-accent-teal"></div>
                            {/* Marker */}
                            <div className="absolute -top-1 left-0 w-2.5 h-2.5 bg-accent-teal rounded-full shadow-[0_0_8px_rgba(0,251,255,0.8)]"></div>
                        </div>
                        <div className="text-[10px] font-black text-gray-600 w-12 text-right">0:00</div>
                        
                        <div className="flex items-center gap-6">
                            <button className="text-accent-teal hover:scale-110 transition-transform">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                            </button>
                            <div className="px-6 py-1.5 border border-red-900/50 bg-red-950/20 rounded-full text-[10px] font-black text-red-500 uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                                CRINGE <span className="opacity-50 ml-1">0/0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
