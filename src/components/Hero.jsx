import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
    const { isDark } = useTheme();

    return (
        <section
            className="relative min-h-screen flex items-center pt-8 md:pt-12 overflow-hidden theme-transition"
            style={{ background: 'var(--theme-hero-gradient)' }}
        >
            {/* ... rest of the section ... */}
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="z-20 order-2 md:order-1 animate-slide-left">
                    <div className="mb-6 inline-flex items-center gap-3">
                        <span className="w-12 h-[1px] bg-accent-gold"></span>
                        <span className="text-accent-gold uppercase tracking-[0.2em] text-xs font-semibold">Bridging Worlds</span>
                    </div>

                    <h1
                        className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-[1.1] animate-slide-up-reveal"
                        style={{ color: 'var(--theme-text-primary)' }}
                    >
                        <span>Connect Through <br /></span>
                        <span className="italic text-accent-terra">Heritage.</span>
                    </h1>

                    <p
                        className="text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-light animate-fade-in-up delay-300"
                        style={{ color: 'var(--theme-text-secondary)' }}
                    >
                        A digital sanctuary preserving the world's rich traditions, diverse stories, and authentic voices.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-500">
                        <Link
                            to="/feed"
                            className="px-10 py-5 text-lg font-serif font-black transition-all duration-500 text-center hover:scale-105 active:scale-95 shadow-xl hover:shadow-accent-teal/20"
                            style={{
                                background: 'linear-gradient(135deg, #00fbff, #0080ff)',
                                color: '#000000',
                                borderRadius: '999px'
                            }}
                        >
                            Start Exploring
                        </Link>
                        <a
                            href="#about"
                            className="px-8 py-4 font-medium transition-colors duration-300 text-center hover:bg-bg-secondary"
                            style={{
                                border: `1px solid var(--theme-border)`,
                                color: 'var(--theme-text-primary)',
                            }}
                        >
                            Our Mission
                        </a>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative order-1 md:order-2 h-[50vh] md:h-[80vh] w-full flex items-center justify-center">
                    <div className="w-full h-full overflow-hidden rounded-2xl transition-all duration-500 shadow-2xl">
                        <img
                            src={isDark ? "/hero_dark.png" : "/hero_cultural.png"}
                            alt={isDark ? "Intricate Cultural Mandala" : "Indian Cultural Heritage"}
                            className="w-full h-full object-cover transition-opacity duration-700"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
