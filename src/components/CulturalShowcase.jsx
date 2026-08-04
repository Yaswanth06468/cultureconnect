import { Link } from 'react-router-dom';

const cultures = [
    {
        name: "Kyoto, Japan",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop",
        tag: "Tradition"
    },
    {
        name: "Jaipur, India",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2670&auto=format&fit=crop",
        tag: "Architecture"
    },
    {
        name: "Marrakech, Morocco",
        image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2670&auto=format&fit=crop",
        tag: "Colors"
    },
    {
        name: "Cusco, Peru",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2676&auto=format&fit=crop",
        tag: "History"
    },
    {
        name: "Santorini, Greece",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2938&auto=format&fit=crop",
        tag: "Views"
    }
];

const CulturalShowcase = () => {
    return (
        <section className="py-24 overflow-hidden bg-[var(--theme-bg-primary)] border-t border-[var(--theme-border)] relative transition-colors duration-400">
            <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
                <div>
                    <span className="text-[#0ff0a0] uppercase tracking-[0.2em] text-xs font-bold mb-2 block">Curated Journeys</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-black text-[var(--theme-text-primary)]">
                        Cultural <span className="italic text-[#ffc857]">Highlights</span>
                    </h2>
                </div>
                <Link
                    to="/dances"
                    className="hidden md:flex items-center gap-2 text-[#0ff0a0] hover:text-white font-bold text-sm transition-colors group"
                >
                    <span>View All Destinations</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>

            {/* Scroll Container with Hidden Scrollbar */}
            <div className="flex gap-6 overflow-x-auto pb-8 px-6 container mx-auto snap-x no-scrollbar">
                {cultures.map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-72 md:w-80 h-[460px] relative group snap-center cursor-pointer overflow-hidden rounded-3xl border border-white/10 hover:border-[#0ff0a0]/50 transition-all duration-500 shadow-2xl"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg-primary)] via-[var(--theme-bg-primary)]/40 to-transparent opacity-90"></div>

                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#0ff0a0]/20 text-[#0ff0a0] border border-[#0ff0a0]/40 backdrop-blur-md mb-3">
                                {item.tag}
                            </span>
                            <h3 className="text-2xl font-serif font-bold text-[var(--theme-text-primary)] group-hover:text-[#0ff0a0] transition-colors">
                                {item.name}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CulturalShowcase;
