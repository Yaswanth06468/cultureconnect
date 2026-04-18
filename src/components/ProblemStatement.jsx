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
        <section
            className="py-24 theme-transition"
            style={{ backgroundColor: 'var(--theme-bg-secondary)' }}
        >
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div>
                        <span className="text-accent-terra uppercase tracking-widest text-xs font-bold mb-4 block">The Challenge</span>
                        <h2
                            className="text-3xl md:text-5xl font-serif font-medium mb-8 leading-tight"
                            style={{ color: 'var(--theme-text-primary)' }}
                        >
                            Why <br /><span className="italic font-light">Culture Connect?</span>
                        </h2>
                        <p
                            className="text-lg font-light mb-8 max-w-md"
                            style={{ color: 'var(--theme-text-secondary)' }}
                        >
                            In a hyper-connected world, we are paradoxically losing the authentic threads that bind us to our past and to each other.
                        </p>

                        <div
                            id="about"
                            className="p-8 border shadow-sm relative overflow-hidden theme-transition"
                            style={{
                                backgroundColor: 'var(--theme-card-bg)',
                                borderColor: 'var(--theme-border)',
                            }}
                        >
                            <h3
                                className="text-xl font-serif font-medium mb-4"
                                style={{ color: 'var(--theme-text-primary)' }}
                            >Our Mission</h3>
                            <p
                                className="font-light leading-relaxed"
                                style={{ color: 'var(--theme-text-secondary)' }}
                            >
                                To build a unified platform that connects people based on cultural interests, fostering authentic, respectful, and educational interactions while preserving global heritage.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {problems.map((item, index) => (
                            <div key={index} className="flex gap-6 items-start group">
                                <span
                                    className="text-4xl font-serif group-hover:text-accent-terra/30 transition-colors font-bold"
                                    style={{ color: 'color-mix(in srgb, var(--theme-text-primary) 10%, transparent)' }}
                                >
                                    {item.number}
                                </span>
                                <div>
                                    <h3
                                        className="text-xl font-serif font-medium mb-2"
                                        style={{ color: 'var(--theme-text-primary)' }}
                                    >{item.title}</h3>
                                    <p
                                        className="font-light leading-relaxed pb-6 group-last:border-0 group-last:pb-0"
                                        style={{
                                            color: 'var(--theme-text-secondary)',
                                            borderBottom: `1px solid var(--theme-border)`,
                                        }}
                                    >
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
