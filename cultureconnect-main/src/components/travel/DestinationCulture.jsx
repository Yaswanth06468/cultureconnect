const DestinationCulture = ({ culture, destinationName = 'Bangalore' }) => {
  if (!culture) {
    return (
      <div className="text-center py-12 text-[var(--theme-text-muted)]">
        No cultural data available for {destinationName}.
      </div>
    );
  }

  const { traditions = [], festivals = [], languages = '', culturalPractices = [], customs = [] } = culture;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="pb-4 border-b border-[var(--theme-border)]">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
          Living Heritage & Customs
        </span>
        <h3 className="text-2xl md:text-3xl font-serif font-black text-[var(--theme-text-primary)] mt-2">
          Local Culture of {destinationName}
        </h3>
        <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
          Immerse yourself in community festivals, language nuances, everyday rituals, and respectful travel etiquette.
        </p>
      </div>

      {/* Grid of Cultural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Local Traditions */}
        <div className="flat-card p-6 border-l-4 border-l-[var(--theme-accent-primary)]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🪔</span>
            <div>
              <h4 className="font-serif font-black text-xl text-[var(--theme-text-primary)]">
                Local Traditions
              </h4>
              <span className="text-xs text-[var(--theme-text-muted)]">Passed down through generations</span>
            </div>
          </div>
          <ul className="space-y-3 text-xs md:text-sm text-[var(--theme-text-secondary)]">
            {traditions.map((trad, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[var(--theme-accent-primary)] font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{trad}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Languages & Dialects */}
        <div className="flat-card p-6 border-l-4 border-l-[var(--theme-accent-jade)]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🗣️</span>
            <div>
              <h4 className="font-serif font-black text-xl text-[var(--theme-text-primary)]">
                Languages & Dialects
              </h4>
              <span className="text-xs text-[var(--theme-text-muted)]">How the city communicates</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--theme-bg-accent)]/60 border border-[var(--theme-border)]">
            <p className="text-sm font-medium text-[var(--theme-text-primary)] leading-relaxed">
              {languages}
            </p>
          </div>
          <p className="text-xs text-[var(--theme-text-muted)] mt-3">
            Tip: Even speaking a few respectful greeting words in the regional tongue opens heartwarming local conversations!
          </p>
        </div>

        {/* 3. Cultural Practices */}
        <div className="flat-card p-6 border-l-4 border-l-[var(--theme-accent-saffron)]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🌾</span>
            <div>
              <h4 className="font-serif font-black text-xl text-[var(--theme-text-primary)]">
                Everyday Cultural Practices
              </h4>
              <span className="text-xs text-[var(--theme-text-muted)]">Daily life & street rhythms</span>
            </div>
          </div>
          <ul className="space-y-3 text-xs md:text-sm text-[var(--theme-text-secondary)]">
            {culturalPractices.map((practice, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[var(--theme-accent-saffron)] font-bold mt-0.5">✓</span>
                <span className="leading-relaxed">{practice}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Important Customs & Etiquette */}
        <div className="flat-card p-6 border-l-4 border-l-amber-600">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🤝</span>
            <div>
              <h4 className="font-serif font-black text-xl text-[var(--theme-text-primary)]">
                Important Customs & Etiquette
              </h4>
              <span className="text-xs text-[var(--theme-text-muted)]">Traveler advice for respectful exploration</span>
            </div>
          </div>
          <ul className="space-y-3 text-xs md:text-sm text-[var(--theme-text-secondary)]">
            {customs.map((custom, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-amber-600 font-bold mt-0.5">✦</span>
                <span className="leading-relaxed">{custom}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grand Festivals Showcase */}
      <div className="mt-8 pt-6 border-t border-[var(--theme-border)]">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🎉</span>
          <h4 className="font-serif font-black text-2xl text-[var(--theme-text-primary)]">
            Iconic Festivals of {destinationName}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {festivals.map((fest, idx) => (
            <div key={idx} className="flat-card p-6 relative overflow-hidden bg-gradient-to-br from-[var(--theme-card-bg)] to-[var(--theme-bg-accent)]">
              <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent-primary)]/10 text-[var(--theme-accent-primary)] border border-[var(--theme-accent-primary)]/20 flex items-center justify-center font-bold text-sm mb-3">
                0{idx + 1}
              </div>
              <h5 className="font-serif font-black text-lg text-[var(--theme-text-primary)]">
                {fest.name}
              </h5>
              <p className="text-xs text-[var(--theme-text-secondary)] mt-2 leading-relaxed">
                {fest.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationCulture;
