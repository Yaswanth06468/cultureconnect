const testimonials = [
    {
        name: "Elena Rodriguez",
        role: "Language Learner",
        location: "Madrid, Spain",
        text: "Culture Connect helped me not just learn Japanese, but understand the soul behind the language. The community is incredibly supportive.",
    },
    {
        name: "Kenji Tanaka",
        role: "Cultural Guide",
        location: "Kyoto, Japan",
        text: "Sharing my local traditions with people from around the world has been a life-changing experience. This platform bridges gaps like no other.",
    },
    {
        name: "Sarah Jenkins",
        role: "Travel Enthusiast",
        location: "New York, USA",
        text: "I found a hidden festival in Peru through this app that wasn't on any tourist guide. It was the highlight of my trip!",
    }
];

const Community = () => {
    return (
        <section id="community" className="py-24 relative bg-[var(--theme-bg-secondary)] border-t border-[var(--theme-border)] transition-colors duration-400">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[var(--theme-accent-primary)] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Our Community</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-black text-[var(--theme-text-primary)] mb-4">
                        Voices of <span className="italic font-light text-[var(--theme-accent-primary)]">Connection</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-3xl flat-card group hover:border-[var(--theme-accent-primary)] transition-all duration-300 relative flex flex-col justify-between"
                        >
                            <p className="leading-relaxed mb-8 font-light text-[var(--theme-text-secondary)] relative z-10 italic">
                                "{item.text}"
                            </p>

                            <div className="flex items-center gap-4 pt-6 border-t border-[var(--theme-border)]">
                                <div>
                                    <h4 className="font-bold text-base font-serif text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent-primary)] transition-colors">
                                        {item.name}
                                    </h4>
                                    <p className="text-[var(--theme-accent-primary)] text-xs uppercase tracking-wider font-bold mb-0.5">{item.role}</p>
                                    <p className="text-xs text-[var(--theme-text-muted)]">{item.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Community;
