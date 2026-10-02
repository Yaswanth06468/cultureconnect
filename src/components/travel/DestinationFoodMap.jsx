import { useState } from 'react';

const DestinationFoodMap = ({ foodSpots = [], destinationName = 'Bangalore' }) => {
  const [activeSpot, setActiveSpot] = useState(foodSpots[0] || null);

  if (!foodSpots || foodSpots.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--theme-text-muted)]">
        No food spots map data available for {destinationName}.
      </div>
    );
  }

  const selected = activeSpot || foodSpots[0];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="pb-4 border-b border-[var(--theme-border)]">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
          Gastronomy Trail
        </span>
        <h3 className="text-2xl md:text-3xl font-serif font-black text-[var(--theme-text-primary)] mt-2">
          {destinationName} Local Food Map & Hotspots
        </h3>
        <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
          Explore celebrated food streets, heritage tiffin alleys, and evening chaat squares.
        </p>
      </div>

      {/* Interactive Map Layout: Grid with Visual Map Graphic + Spotlight Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Stylized Interactive Visual Map Canvas */}
        <div className="lg:col-span-7 flat-card p-6 relative overflow-hidden bg-[var(--theme-bg-accent)] flex flex-col justify-between min-h-[420px]">
          {/* Mock Map Background Grid Lines & Canvas */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Map Header Overlay */}
          <div className="relative z-10 flex items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🗺️</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-primary)]">
                Culinary District Map: {destinationName}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[var(--theme-card-bg)] text-[var(--theme-accent-primary)] px-2.5 py-1 rounded-full border border-[var(--theme-border)]">
              Interactive Pins
            </span>
          </div>

          {/* Visual Interactive Pins Container */}
          <div className="relative z-10 my-8 py-4 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {foodSpots.map((spot, idx) => {
                const isSelected = selected?.id === spot.id;
                return (
                  <button
                    key={spot.id || idx}
                    type="button"
                    onClick={() => setActiveSpot(spot)}
                    className={`text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[var(--theme-card-bg)] border-[var(--theme-accent-primary)] shadow-md translate-x-1'
                        : 'bg-[var(--theme-card-bg)]/70 border-[var(--theme-border)] hover:bg-[var(--theme-card-bg)]'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[var(--theme-accent-primary)] text-white shadow-sm'
                          : 'bg-[var(--theme-bg-accent)] text-[var(--theme-text-primary)] border border-[var(--theme-border)]'
                      }`}
                    >
                      📍
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-serif font-black text-xs text-[var(--theme-text-primary)] truncate">
                        {spot.area}
                      </h5>
                      <p className="text-[11px] text-[var(--theme-text-muted)] truncate">
                        {spot.neighborhood}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-bold text-[var(--theme-accent-jade)]">
                        ★ {spot.highlightDish || 'Iconic Street Foods'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Map Footer Note */}
          <div className="relative z-10 pt-3 border-t border-[var(--theme-border)] flex items-center justify-between text-[11px] text-[var(--theme-text-muted)]">
            <span>Click any hotspot pin to inspect street eats</span>
            <span className="font-mono text-xs">GPS: Verified Spots</span>
          </div>
        </div>

        {/* Right: Selected Hotspot Deep Dive Card */}
        <div className="lg:col-span-5 flat-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
                Featured Food Hub
              </span>
              <span className="text-xs text-[var(--theme-text-muted)]">
                🕒 {selected?.timings}
              </span>
            </div>

            <h4 className="font-serif font-black text-2xl text-[var(--theme-text-primary)]">
              {selected?.area}
            </h4>
            <p className="text-xs font-medium text-[var(--theme-accent-primary)] mt-0.5">
              {selected?.neighborhood}
            </p>

            {/* Atmosphere & Vibe */}
            <div className="mt-4 p-4 rounded-2xl bg-[var(--theme-bg-primary)] border border-[var(--theme-border)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] block mb-1">
                The Street Vibe
              </span>
              <p className="text-xs text-[var(--theme-text-primary)] leading-relaxed font-sans">
                "{selected?.vibe}"
              </p>
            </div>

            {/* Must Eat Dishes */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] block">
                🔥 Legendary Must-Eat Items:
              </span>
              <div className="p-4 rounded-2xl bg-[var(--theme-bg-accent)]/80 border border-[var(--theme-border)]">
                <p className="text-xs font-semibold text-[var(--theme-text-primary)] leading-relaxed">
                  {selected?.mustEat}
                </p>
              </div>
            </div>
          </div>

          {/* Action Helper */}
          <div className="mt-6 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between">
            <span className="text-xs text-[var(--theme-text-muted)]">
              Best time: Evening stroll
            </span>
            <button
              type="button"
              onClick={() => {
                alert(`Added ${selected?.area} to your travel notes!`);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-[var(--theme-border)] bg-[var(--theme-bg-accent)] hover:border-[var(--theme-accent-primary)] text-[var(--theme-text-primary)] transition-all"
            >
              + Save Street to Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationFoodMap;
