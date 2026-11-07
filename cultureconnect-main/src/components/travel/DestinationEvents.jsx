import { useState } from 'react';
import { Link } from 'react-router-dom';

const DestinationEvents = ({ events = [], destinationName = 'Bangalore' }) => {
  const [bookmarkedEvents, setBookmarkedEvents] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('saved_travel_events') || '[]');
    } catch {
      return [];
    }
  });

  const toggleBookmark = (eventId) => {
    setBookmarkedEvents((prev) => {
      const updated = prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId];
      try {
        localStorage.setItem('saved_travel_events', JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      return updated;
    });
  };

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--theme-text-muted)]">
        No upcoming events currently scheduled for {destinationName}.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[var(--theme-border)]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
            Live Festivals & Exhibitions
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-black text-[var(--theme-text-primary)] mt-2">
            Upcoming Cultural Events in {destinationName}
          </h3>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
            Theater performances, classical sabhas, flower shows, and craft fairs happening during your travel.
          </p>
        </div>

        <Link
          to="/events"
          className="text-xs font-bold text-[var(--theme-accent-primary)] hover:underline inline-flex items-center gap-1 self-start md:self-auto"
        >
          <span>Explore All Events</span>
          <span>→</span>
        </Link>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => {
          const isSaved = bookmarkedEvents.includes(ev.id);
          return (
            <div
              key={ev.id}
              className="flat-card p-6 flex flex-col justify-between group hover:border-[var(--theme-accent-primary)] transition-all duration-300"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[var(--theme-bg-accent)] text-[var(--theme-accent-primary)] border border-[var(--theme-border)]">
                    {ev.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleBookmark(ev.id)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border text-sm transition-colors ${
                      isSaved
                        ? 'bg-[var(--theme-accent-primary)] text-white border-[var(--theme-accent-primary)]'
                        : 'bg-[var(--theme-bg-accent)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:text-[var(--theme-accent-primary)]'
                    }`}
                    title={isSaved ? 'Remove from My Plan' : 'Save to My Plan'}
                  >
                    {isSaved ? '★' : '☆'}
                  </button>
                </div>

                <h4 className="font-serif font-black text-xl text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent-primary)] transition-colors">
                  {ev.title}
                </h4>

                <p className="text-xs text-[var(--theme-text-secondary)] mt-2 leading-relaxed">
                  {ev.description}
                </p>

                {/* Venue & Date Details */}
                <div className="mt-4 pt-3 border-t border-[var(--theme-border)] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[var(--theme-text-primary)] font-medium">
                    <span>📅</span>
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--theme-text-secondary)]">
                    <span>📍</span>
                    <span className="truncate">{ev.venue}</span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--theme-text-muted)] block">
                    Tickets / Pass
                  </span>
                  <span className="font-bold text-sm text-[var(--theme-accent-jade)]">
                    {ev.ticketPrice}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleBookmark(ev.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    isSaved
                      ? 'bg-emerald-600 text-white'
                      : 'border border-[var(--theme-border)] bg-[var(--theme-bg-accent)] text-[var(--theme-text-primary)] hover:border-[var(--theme-accent-primary)]'
                  }`}
                >
                  {isSaved ? '✓ Added to My Trip' : '+ Add to Trip Plan'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DestinationEvents;
