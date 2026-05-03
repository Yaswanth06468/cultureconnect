import { useState, useEffect } from 'react';

const WelcomeModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
        if (!hasSeenSplash) {
            setIsVisible(true);
        }
    }, []);

    const handleEnter = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
    };

    if (!isVisible) return null;

    return (
        <div 
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black animate-fade-in"
            style={{ 
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(0,0,0,0.9)'
            }}
        >
            <div className="relative w-[90%] max-w-lg flex flex-col items-center gap-8 animate-scale-in">
                <div className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-square flex flex-col items-center justify-center overflow-hidden rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10">
                    {/* Background Image */}
                    <img 
                        src="/splash_bg.png" 
                        alt="Splash Background" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/20 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col items-center text-center p-8 w-full">
                        <p className="text-white/60 uppercase tracking-[0.4em] text-[10px] md:text-xs mb-8 font-bold animate-slide-down">
                            Introducing
                        </p>
                        
                        <div className="flex flex-col items-center gap-6 animate-fade-in delay-300">
                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                                <img 
                                    src="/culture_premium_logo_v2.png" 
                                    alt="Culture Logo" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <h1 className="text-white text-4xl md:text-6xl font-serif font-black tracking-tighter leading-[0.9] uppercase">
                                    Culture<br/>Connect
                                </h1>
                                <p className="text-white/80 uppercase tracking-[0.5em] text-[10px] md:text-xs font-bold mt-6 opacity-60">
                                    In Tradition
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Close button (top right) */}
                    <button 
                        onClick={handleEnter}
                        className="absolute top-8 right-8 z-20 text-white/40 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Enter Button - Now clearly below the card */}
                <button 
                    onClick={handleEnter}
                    className="group w-full max-w-sm flex items-center justify-center gap-4 bg-white text-black py-4 md:py-5 rounded-2xl font-serif font-black text-lg md:text-xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                >
                    <span>Enter Culture Connect</span>
                    <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            
            {/* Enter Button for mobile/scrolling if needed, but the absolute positioning above is better */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                .animate-scale-in { animation: scale-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-slide-down { animation: slide-down 1s ease-out forwards; }
                .delay-300 { animation-delay: 0.3s; }
            `}</style>
        </div>
    );
};

export default WelcomeModal;
