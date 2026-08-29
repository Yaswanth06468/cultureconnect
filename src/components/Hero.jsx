import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center pt-2 md:pt-4 pb-12 overflow-hidden bg-[var(--theme-bg-primary)] transition-colors duration-400">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Text Content */}
                <div className="order-2 md:order-1 animate-slide-left">
                    <div className="mb-6 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg-secondary)] shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[var(--theme-accent-primary)] animate-pulse"></span>
                        <span className="text-[var(--theme-accent-primary)] uppercase tracking-[0.2em] text-xs font-bold">Bridging Global Heritage</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black mb-6 leading-[1.05] text-[var(--theme-text-primary)]">
                        Connect Through <br />
                        <span className="italic text-[var(--theme-accent-primary)]">
                            Heritage.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-light text-[var(--theme-text-secondary)]">
                        A digital sanctuary preserving the world's rich traditions, diverse stories, vibrant foods, and authentic voices.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <Link
                            to="/feed"
                            className="px-8 py-4 text-base font-bold transition-all duration-300 text-center text-[var(--theme-btn-text)] bg-[var(--theme-btn-bg)] hover:bg-[#A33E20] rounded-xl flex items-center justify-center gap-2 hover:-translate-y-1"
                        >
                            <span>Start Exploring</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <a
                            href="#about"
                            className="px-8 py-4 font-bold transition-all duration-300 text-center text-[var(--theme-text-primary)] hover:text-[var(--theme-accent-primary)] rounded-xl border border-[var(--theme-border)] hover:border-[var(--theme-accent-primary)] bg-[var(--theme-bg-secondary)]"
                        >
                            Our Mission
                        </a>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative order-1 md:order-2 h-[45vh] md:h-[70vh] w-full flex items-center justify-center">
                    {/* Ambient warm glow behind floating image */}
                    <div className="absolute w-[80%] h-[80%] rounded-full bg-[var(--theme-accent-primary)]/15 blur-3xl animate-float pointer-events-none"></div>
                    
                    {/* Floating photo with radial gradient mask for seamless background blending */}
                    <div className="w-full h-full relative group animate-float [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_98%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_98%)]">
                        <img
                            src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2670&auto=format&fit=crop"
                            alt="Documentary style photo of a cultural market in Marrakech"
                            className="w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full">
                <div className="stitched-divider mb-0"></div>
            </div>
        </section>
    );
};

export default Hero;
