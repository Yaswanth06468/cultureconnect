import { useState, useEffect } from 'react';

const CultureSwap = () => {
    const [isMatching, setIsMatching] = useState(false);
    const [activeSwap, setActiveSwap] = useState(null);
    const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds

    const partners = [
        {
            name: 'Priya',
            location: 'Rajasthan, India',
            culture: 'Marwari',
            avatar: '👤',
            food: 'Dal Baati Churma',
            routine: 'Morning prayer and spice grinding',
            words: ['Khamma Ghani (Hello)', 'Padharo (Welcome)', 'Dhanyavad (Thank you)'],
            color: '#e67300'
        },
        {
            name: 'Kenji',
            location: 'Kyoto, Japan',
            culture: 'Traditional Japanese',
            avatar: '👤',
            food: 'Miso Soup & Grilled Fish',
            routine: 'Morning Zen meditation and tea preparation',
            words: ['Ohayo (Good Morning)', 'Itadakimasu (Let\'s eat)', 'Arigato (Thank you)'],
            color: '#bc002d'
        },
        {
            name: 'Sofía',
            location: 'Oaxaca, Mexico',
            culture: 'Zapotec/Mexican',
            avatar: '👤',
            food: 'Mole Poblano with Tortillas',
            routine: 'Market visit for fresh cacao and chiles',
            words: ['Hola (Hello)', 'Provecho (Enjoy your meal)', 'Gracias (Thank you)'],
            color: '#006341'
        },
        {
            name: 'Amina',
            location: 'Marrakesh, Morocco',
            culture: 'Berber',
            avatar: '👤',
            food: 'Lamb Tagine with Prunes',
            routine: 'Afternoon mint tea ritual with family',
            words: ['Salam (Peace/Hello)', 'Bismillah (In the name of God)', 'Shukran (Thank you)'],
            color: '#c1272d'
        }
    ];

    useEffect(() => {
        let timer;
        if (activeSwap && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [activeSwap, timeLeft]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const startMatch = () => {
        setIsMatching(true);
        setTimeout(() => {
            const randomPartner = partners[Math.floor(Math.random() * partners.length)];
            setActiveSwap(randomPartner);
            setIsMatching(false);
            setTimeLeft(86400); // Reset timer
        }, 3000);
    };

    const stopSwap = () => {
        if (window.confirm('Are you sure you want to end this cultural exchange?')) {
            setActiveSwap(null);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary overflow-hidden">
            <div className="container mx-auto max-w-6xl relative">
                
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-terra/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1.5 bg-accent-terra/10 text-accent-terra rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4 border border-accent-terra/20 animate-fade-in">
                        World First Feature
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-text-primary mb-6 tracking-tighter leading-tight">
                        Culture <span className="text-accent-terra italic">Swap</span>
                    </h1>
                    <p className="text-xl text-text-muted max-w-3xl mx-auto font-medium">
                        Don't just chat. <span className="text-text-primary font-bold underline decoration-accent-teal/30">Exchange lifestyles.</span> Live another person's reality for 24 hours.
                    </p>
                </div>

                {!activeSwap ? (
                    <div className="bg-white border border-black/10 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden group">
                        {/* Interactive Matcher */}
                        <div className="relative z-10">
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-bg-secondary rounded-full mx-auto mb-10 flex items-center justify-center text-6xl shadow-xl border-4 border-white ring-1 ring-black/5 transition-transform duration-700 group-hover:rotate-12">
                                {isMatching ? '🌍' : '❓'}
                            </div>
                            
                            <h2 className="text-3xl font-serif font-bold text-text-primary mb-4">Ready to walk in someone else's shoes?</h2>
                            <p className="text-text-muted mb-10 max-w-xl mx-auto leading-relaxed">
                                Our AI will match you with a partner from a different culture. You'll swap food recipes, daily rituals, and language for exactly one day.
                            </p>

                            <button
                                onClick={startMatch}
                                disabled={isMatching}
                                className={`group relative px-12 py-5 rounded-2xl font-black text-lg transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl
                                    ${isMatching ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-text-primary text-white hover:bg-black'}`}
                            >
                                <span className={isMatching ? 'opacity-0' : 'opacity-100'}>Launch lifestyle Swap</span>
                                {isMatching && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Feature Badges */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left border-t border-black/5 pt-10">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center text-2xl">🥘</div>
                                <div>
                                    <h4 className="font-bold text-text-primary">Culinary Swap</h4>
                                    <p className="text-xs text-text-muted">Cook exactly what they eat today.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-2xl">⚡</div>
                                <div>
                                    <h4 className="font-bold text-text-primary">Ritual Mirror</h4>
                                    <p className="text-xs text-text-muted">Adopt their morning/evening routine.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-teal/10 flex items-center justify-center text-2xl">🗣️</div>
                                <div>
                                    <h4 className="font-bold text-text-primary">Voice Gift</h4>
                                    <p className="text-xs text-text-muted">Learn 3 sacred words of their heritage.</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Eye Candy */}
                        <div className="absolute -top-24 -left-24 w-60 h-60 bg-accent-terra/10 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-accent-teal/10 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                        
                        {/* Live Status Sidebar */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="bg-white border border-black/10 rounded-3xl p-8 shadow-lg">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest animate-pulse">Live Exchange</span>
                                    <div className="text-xl font-mono font-bold text-text-primary">{formatTime(timeLeft)}</div>
                                </div>
                                
                                <div className="text-center mb-6">
                                    <div className="w-24 h-24 rounded-full bg-bg-secondary mx-auto mb-4 flex items-center justify-center text-5xl border-4 border-white shadow-md ring-1 ring-black/5">
                                        {activeSwap.avatar}
                                    </div>
                                    <h2 className="text-2xl font-serif font-black text-text-primary leading-tight">Swapping with {activeSwap.name}</h2>
                                    <p className="text-sm font-bold text-accent-terra uppercase tracking-wider mt-1">{activeSwap.culture} Culture</p>
                                    <p className="text-xs text-text-muted mt-2">📍 {activeSwap.location}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-bg-secondary rounded-2xl border border-black/5">
                                        <h4 className="text-xs font-black text-text-muted uppercase mb-2">Challenge Progress</h4>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-accent-terra transition-all" style={{ width: '33%' }}></div>
                                        </div>
                                        <p className="text-[10px] text-right mt-1 font-bold">1 / 3 Tasks Complete</p>
                                    </div>
                                </div>

                                <button 
                                    onClick={stopSwap}
                                    className="w-full mt-8 py-4 text-xs font-black text-red-500 uppercase tracking-widest hover:bg-red-50 rounded-2xl transition-colors"
                                >
                                    Cancel Exchange
                                </button>
                            </div>

                            <div className="bg-text-primary p-8 rounded-3xl text-white shadow-xl">
                                <h4 className="text-xs font-black uppercase tracking-widest text-white/50 mb-4">Culture Tip</h4>
                                <p className="font-serif italic text-lg leading-relaxed">
                                    "To truly understand a people, you must not only hear their stories but eat their salt and walk their paths."
                                </p>
                            </div>
                        </div>

                        {/* Main Challenge Content */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            
                            {/* Theme Header */}
                            <div className="bg-white border-4 border-black rounded-[2.5rem] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" 
                                style={{ borderColor: activeSwap.color }}>
                                <div className="relative z-10">
                                    <h3 className="text-4xl font-serif font-black text-text-primary mb-2">Today's Lifestyle Blueprint</h3>
                                    <p className="text-text-muted">Adopt these elements of {activeSwap.name}'s life to earn your <span className="font-bold text-text-primary">Cultural Empathy badge</span>.</p>
                                </div>
                                <div className="absolute -top-10 -right-10 w-40 h-40 opacity-10 font-bold text-9xl pointer-events-none" style={{ color: activeSwap.color }}>
                                    {activeSwap.avatar}
                                </div>
                            </div>

                            {/* Task Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Food Task */}
                                <div className="bg-white border border-black/10 rounded-3xl p-8 hover:shadow-xl transition-shadow group relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🥘</div>
                                        <button className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-green-50 hover:border-green-200 transition-colors">
                                            <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
                                        </button>
                                    </div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-accent-terra mb-2">The Culinary Oath</h4>
                                    <h3 className="text-2xl font-serif font-bold text-text-primary mb-3">Cook: {activeSwap.food}</h3>
                                    <p className="text-sm text-text-muted leading-relaxed">
                                        This dish is a staple in {activeSwap.culture} homes. The recipe has been sent to your meal planner.
                                    </p>
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 -z-10 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
                                </div>

                                {/* Ritual Task */}
                                <div className="bg-white border border-black/10 rounded-3xl p-8 hover:shadow-xl transition-shadow group relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">⚡</div>
                                        <button className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-green-50 hover:border-green-200 transition-colors">
                                            <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
                                        </button>
                                    </div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-accent-blue mb-2">The Ritual Mirror</h4>
                                    <h3 className="text-2xl font-serif font-bold text-text-primary mb-3">{activeSwap.routine}</h3>
                                    <p className="text-sm text-text-muted leading-relaxed">
                                        Synchronize your day. Adopt this specific ritual to align your body with {activeSwap.culture} time.
                                    </p>
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 -z-10 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
                                </div>

                                {/* Language Task */}
                                <div className="bg-white border border-black/10 rounded-3xl p-8 hover:shadow-xl transition-shadow group md:col-span-2 relative overflow-hidden">
                                    <div className="flex flex-col md:flex-row items-center gap-10">
                                        <div className="flex-1">
                                            <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🗣️</div>
                                            <h4 className="text-xs font-black uppercase tracking-widest text-accent-teal mb-2">The Oral Heritage</h4>
                                            <h3 className="text-2xl font-serif font-bold text-text-primary mb-3">Speak 3 Words</h3>
                                            <p className="text-sm text-text-muted leading-relaxed">
                                                Language is the key to the soul. Record yourself saying these words properly to {activeSwap.name}.
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-4 flex-1">
                                            {activeSwap.words.map((word, idx) => (
                                                <div key={idx} className="px-6 py-4 bg-bg-secondary rounded-2xl border border-black/5 flex items-center gap-3 hover:border-accent-teal transition-colors cursor-pointer group/word">
                                                    <span className="text-xl">🔊</span>
                                                    <div>
                                                        <p className="font-serif font-bold text-text-primary">{word.split(' ')[0]}</p>
                                                        <p className="text-[10px] text-text-muted font-bold uppercase">{word.split(' ')[1]}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-50 -z-10 rounded-tl-[6rem] group-hover:scale-110 transition-transform"></div>
                                </div>
                            </div>

                        </div>

                    </div>
                )}
            </div>
            
            {/* Custom Styles for Animations */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes scale-up {
                    0% { transform: scale(0.9); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-scale-up {
                    animation: scale-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
        </div>
    );
};

export default CultureSwap;
