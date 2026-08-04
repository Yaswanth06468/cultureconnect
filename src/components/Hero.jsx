import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
    const { isDark } = useTheme();

    return (
        <section className="relative min-h-[92vh] flex items-center pt-8 pb-16 overflow-hidden bg-[var(--theme-bg-primary)] transition-colors duration-400">
            {/* Ambient Background Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0ff0a0]/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>
            <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-float-orb"></div>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Text Content */}
                <div className="order-2 md:order-1 animate-slide-left">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-[#0ff0a0] animate-ping"></span>
                            <span className="text-[#0ff0a0] uppercase tracking-[0.2em] text-xs font-bold">Bridging Global Heritage</span>
                        </div>

                        {/* Light Mode & Dark Mode Switcher */}
                        <ThemeToggle variant="default" className="shadow-xl" />
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black mb-6 leading-[1.05] text-[var(--theme-text-primary)]">
                        Connect Through <br />
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#0ff0a0] via-[#34d399] to-[#3b82f6]">
                            Heritage.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-light text-[var(--theme-text-secondary)]">
                        A digital sanctuary preserving the world's rich traditions, diverse stories, vibrant foods, and authentic voices.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center">
                        <Link
                            to="/feed"
                            className="px-8 py-4 text-base font-bold transition-all duration-300 text-center text-black bg-[#0ff0a0] hover:bg-[#34d399] rounded-full shadow-[0_0_30px_rgba(15,240,160,0.35)] hover:shadow-[0_0_40px_rgba(15,240,160,0.55)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>Start Exploring</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <a
                            href="#about"
                            className="px-8 py-4 font-bold transition-all duration-300 text-center text-[var(--theme-text-primary)] rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 backdrop-blur-md"
                        >
                            Our Mission
                        </a>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative order-1 md:order-2 h-[45vh] md:h-[75vh] w-full flex items-center justify-center">
                    <div className="w-full h-full overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative group">
                        <img
                            src="/hero_dark.png"
                            alt="Intricate Cultural Heritage Artwork"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg-primary)] via-transparent to-transparent opacity-60"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

