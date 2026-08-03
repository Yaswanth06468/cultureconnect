const problems = [
    {
        title: "Diminishing Heritage",
        description: "Traditional knowledge and indigenous languages are fading away in the face of rapid modernization.",
        number: "01"
    },
    {
        title: "Cultural Barriers",
        description: "Relocating individuals often face significant difficulties in social integration and finding community.",
        number: "02"
    },
    {
        title: "Lost Documentation",
        description: "Many local customs, festivals, and oral histories remain undocumented and inaccessible.",
        number: "03"
    }
];

const ProblemStatement = () => {
    return (
        <section className="py-24 relative bg-[#0d0d14] border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div>
                        <span className="text-[#ff5e62] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">The Challenge</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-black mb-8 leading-tight text-white">
                            Why <br /><span className="italic font-light text-[#0ff0a0]">Culture Connect?</span>
                        </h2>
                        <p className="text-lg font-light mb-8 max-w-md text-zinc-400">
                            In a hyper-connected world, we are paradoxically losing the authentic threads that bind us to our past and to each other.
                        </p>

                        <div
                            id="about"
                            className="p-8 rounded-3xl obsidian-glass relative overflow-hidden border border-emerald-500/30 shadow-[0_0_30px_rgba(15,240,160,0.08)]"
                        >
                            <div className="w-12 h-1 bg-[#0ff0a0] rounded-full mb-4"></div>
                            <h3 className="text-2xl font-serif font-bold mb-4 text-white">Our Mission</h3>
                            <p className="font-light leading-relaxed text-zinc-300">
                                To build a unified platform that connects people based on cultural interests, fostering authentic, respectful, and educational interactions while preserving global heritage.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {problems.map((item, index) => (
                            <div key={index} className="flex gap-6 items-start group p-6 rounded-2xl obsidian-card hover:border-[#0ff0a0]/30 transition-all duration-300">
                                <span className="text-4xl font-serif font-black text-[#0ff0a0]/40 group-hover:text-[#0ff0a0] transition-colors">
                                    {item.number}
                                </span>
                                <div>
                                    <h3 className="text-xl font-serif font-bold mb-2 text-white group-hover:text-[#0ff0a0] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="font-light leading-relaxed text-zinc-400">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
