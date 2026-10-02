import { useState } from 'react';

const TripItinerary = ({ itinerary = [], destinationName = 'Bangalore' }) => {
  const [activeDay, setActiveDay] = useState(1);
  const [completedStops, setCompletedStops] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('completed_itinerary_stops') || '[]');
    } catch {
      return [];
    }
  });

  const toggleStop = (stopId) => {
    setCompletedStops((prev) => {
      const updated = prev.includes(stopId)
        ? prev.filter((id) => id !== stopId)
        : [...prev, stopId];
      try {
        localStorage.setItem('completed_itinerary_stops', JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      return updated;
    });
  };

  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--theme-text-muted)]">
        No itinerary available for {destinationName}.
      </div>
    );
  }

  const currentDayData = itinerary.find((d) => d.day === activeDay) || itinerary[0];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[var(--theme-border)]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
            Automated Cultural Itinerary
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-black text-[var(--theme-text-primary)] mt-2">
            Curated {destinationName} Trip Schedule
          </h3>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
            Optimized day-by-day sequence uniting heritage sights, authentic meals, and cultural performances.
          </p>
        </div>

        {/* Day Switcher Buttons */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] self-start md:self-auto">
          {itinerary.map((d) => (
            <button
              key={d.day}
              type="button"
              onClick={() => setActiveDay(d.day)}
              className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all duration-200 ${
                activeDay === d.day
                  ? 'bg-[var(--theme-card-bg)] text-[var(--theme-accent-primary)] shadow-sm'
                  : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>
      </div>

      {/* Active Day Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[var(--theme-bg-accent)] to-[var(--theme-card-bg)] border border-[var(--theme-border)]">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-primary)] block">
          Day {currentDayData.day} Exploration
        </span>
        <h4 className="text-xl md:text-2xl font-serif font-black text-[var(--theme-text-primary)] mt-1">
          {currentDayData.title}
        </h4>
        <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
          <strong>Theme:</strong> {currentDayData.theme}
        </p>
      </div>

      {/* Timeline Schedule Cards */}
      <div className="relative pl-6 md:pl-8 border-l-2 border-dashed border-[var(--theme-border)] space-y-6 my-6">
        {currentDayData.schedule?.map((item, idx) => {
          const stopId = `day-${currentDayData.day}-stop-${idx}`;
          const isDone = completedStops.includes(stopId);

          return (
            <div key={idx} className="relative group">
              {/* Timeline Pin Indicator */}
              <div
                className={`absolute -left-[31px] md:-left-[39px] top-4 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                  isDone
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-[var(--theme-card-bg)] border-[var(--theme-accent-primary)] text-[var(--theme-accent-primary)]'
                }`}
              >
                {isDone ? '✓' : idx + 1}
              </div>

              {/* Card Container */}
              <div className="flat-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group-hover:border-[var(--theme-accent-primary)] transition-all">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--theme-accent-primary)]/10 text-[var(--theme-accent-primary)] border border-[var(--theme-accent-primary)]/20">
                      {item.period}
                    </span>
                    <span className="text-xs font-mono font-bold text-[var(--theme-text-muted)]">
                      🕒 {item.time}
                    </span>
                    {item.tag && (
                      <span className="text-[10px] px-2 py-0.5 rounded-lg bg-[var(--theme-bg-accent)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)]">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <h5
                    className={`font-serif font-black text-lg md:text-xl text-[var(--theme-text-primary)] ${
                      isDone ? 'line-through opacity-70' : ''
                    }`}
                  >
                    {item.activity}
                  </h5>

                  <p className="text-xs text-[var(--theme-text-secondary)] mt-2 leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </div>

                {/* Mark as Completed Toggle */}
                <button
                  type="button"
                  onClick={() => toggleStop(stopId)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 self-start md:self-auto flex-shrink-0 ${
                    isDone
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'border border-[var(--theme-border)] bg-[var(--theme-bg-accent)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-accent-primary)]'
                  }`}
                >
                  <span>{isDone ? '✓ Visited' : 'Mark Visited'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TripItinerary;
