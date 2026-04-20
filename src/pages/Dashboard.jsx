import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Home', icon: '🏠', path: '/' },
        { name: 'Jobs', icon: '💼', path: '/feed' }, // Mapping to existing feed as placeholder
        { name: 'Events', icon: '📅', path: '/events' },
        { name: 'Feed', icon: '💬', path: '/feed' },
        { name: 'Resources', icon: '📚', path: '/dances' },
        { name: 'Music', icon: '🎵', path: '/dances' },
        { name: 'Dashboard', icon: '📊', path: '/dashboard' },
        { name: 'Settings', icon: '⚙️', path: '/profile/user' }
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
            <div className="flex-1 flex flex-col items-start justify-center px-12 md:px-32">
                <div className="flex flex-col gap-6 w-full max-w-sm">
                    {menuItems.map((item, index) => (
                        <Link 
                            key={index}
                            to={item.path}
                            className="flex items-center gap-6 group hover:translate-x-4 transition-all duration-500 ease-out"
                        >
                            <span className="text-2xl text-white/50 group-hover:text-white transition-colors">{item.icon}</span>
                            <span className="text-4xl font-serif font-medium tracking-tight text-white/80 group-hover:text-white transition-all">{item.name}</span>
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
