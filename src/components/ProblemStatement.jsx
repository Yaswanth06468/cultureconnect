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
        <section className="py-24 relative bg-[var(--theme-bg-secondary)] border-t border-[var(--theme-border)] transition-colors duration-400">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div>
                        <span className="text-[var(--theme-accent-primary)] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">The Challenge</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-black mb-8 leading-tight text-[var(--theme-text-primary)]">
                            Why <br /><span className="italic font-light text-[var(--theme-accent-primary)]">Culture Connect?</span>
                        </h2>
                        <p className="text-lg font-light mb-8 max-w-md text-[var(--theme-text-secondary)]">
                            In a hyper-connected world, we are paradoxically losing the authentic threads that bind us to our past and to each other.
                        </p>

                        <div
                            id="about"
                            className="flat-card p-8 relative overflow-hidden"
                        >
                            <div className="w-12 h-1 bg-[var(--theme-accent-primary)] rounded-full mb-4"></div>
                            <h3 className="text-2xl font-serif font-bold mb-4 text-[var(--theme-text-primary)]">Our Mission</h3>
                            <p className="font-light leading-relaxed text-[var(--theme-text-secondary)]">
                                To build a unified platform that connects people based on cultural interests, fostering authentic, respectful, and educational interactions while preserving global heritage.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {problems.map((item, index) => (
                            <div key={index} className="flat-card flex gap-6 items-start group p-6 transition-all duration-300">
                                <span className="text-4xl font-serif font-black text-[var(--theme-border)] group-hover:text-[var(--theme-accent-primary)] transition-colors">
                                    {item.number}
                                </span>
                                <div>
                                    <h3 className="text-xl font-serif font-bold mb-2 text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent-primary)] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="font-light leading-relaxed text-[var(--theme-text-secondary)]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full">
                <div className="stitched-divider mt-0"></div>
            </div>
        </section>
    );
};

export default ProblemStatement;
