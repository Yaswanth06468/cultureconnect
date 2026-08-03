import { Link } from 'react-router-dom';

const features = [
    {
        title: "Cultural Storytelling",
        description: "Discover authentic stories, folklore, and traditions passed down through generations.",
        href: "/feed",
        icon: (
            <svg className="w-8 h-8 text-[#ffc857]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
    },
    {
        title: "Global Events",
        description: "Participate in festivals, workshops, and exhibitions happening physically and virtually.",
        href: "/events",
        icon: (
            <svg className="w-8 h-8 text-[#ff5e62]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: "Language Exchange",
        description: "Connect with native speakers to practice languages in a culturally rich context.",
        href: "/translate",
        icon: (
            <svg className="w-8 h-8 text-[#0ff0a0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
        ),
    }
];

const Features = () => {
    return (
        <section id="discover" className="py-24 relative bg-[#0a0a0f] border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-serif font-black mb-6 text-white">
                            Experience the <span className="italic text-[#0ff0a0]">Unseen</span>
                        </h2>
                        <p className="text-lg font-light leading-relaxed text-zinc-400">
                            Our platform provides structured, inclusive spaces for meaningful cultural exchange, moving beyond surface-level tourism to deep understanding.
                        </p>
                    </div>
                    <div className="hidden md:block w-24 h-[1px] bg-gradient-to-r from-[#0ff0a0]/60 to-transparent mb-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="obsidian-card p-8 rounded-3xl group flex flex-col justify-between"
                        >
                            <div>
                                <div className="mb-6 p-4 inline-block rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#0ff0a0]/40 group-hover:bg-[#0ff0a0]/10 transition-all duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-3 text-white group-hover:text-[#0ff0a0] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="leading-relaxed font-light mb-8 text-zinc-400">
                                    {feature.description}
                                </p>
                            </div>
                            <Link
                                to={feature.href}
                                className="text-xs font-bold uppercase tracking-widest text-[#0ff0a0] flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300"
                            >
                                Explore
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
