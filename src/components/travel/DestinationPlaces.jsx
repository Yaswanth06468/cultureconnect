import { useState } from 'react';
import { Link } from 'react-router-dom';

const DestinationPlaces = ({ places = [], destinationName = 'Bangalore' }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  if (!places || places.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--theme-text-muted)]">
        No places data available for {destinationName}.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[var(--theme-border)]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
            Historical & Architectural Wonders
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-black text-[var(--theme-text-primary)] mt-2">
            Explore Famous Places in {destinationName}
          </h3>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
            Centuries of dynastic reign, sacred temple sanctums, and heritage botanical gardens.
          </p>
        </div>

        <Link
          to={`/places/${destinationName}`}
          className="text-xs font-bold text-[var(--theme-accent-primary)] hover:underline inline-flex items-center gap-1 self-start md:self-auto"
        >
          <span>Open Full Places Explorer</span>
          <span>→</span>
        </Link>
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <div
            key={place.id}
            className="flat-card overflow-hidden flex flex-col justify-between group hover:border-[var(--theme-accent-primary)] transition-all duration-300"
          >
            {/* Image Container with Category Badge */}
            <div className="relative h-52 w-full overflow-hidden bg-[var(--theme-bg-accent)]">
              <img
                src={place.imageUrl}
                alt={place.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              {place.category && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-black/60 text-white backdrop-blur-md">
                  {place.category}
                </span>
              )}
              {place.entryFee && (
                <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-white/90 text-stone-900 backdrop-blur-md">
                  {place.entryFee.split('|')[0]}
                </span>
              )}
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-black text-xl text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent-primary)] transition-colors">
                  {place.name}
                </h4>
                <p className="text-xs text-[var(--theme-text-secondary)] mt-2 line-clamp-2 leading-relaxed">
                  {place.shortDescription}
                </p>

                {/* Location & Timings */}
                <div className="mt-4 pt-3 border-t border-[var(--theme-border)] space-y-1.5 text-xs text-[var(--theme-text-muted)]">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span className="truncate">{place.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕒</span>
                    <span className="truncate">{place.openingHours}</span>
                  </div>
                </div>
              </div>

              {/* Explore Button */}
              <div className="mt-5 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlace(place)}
                  className="w-full py-2.5 px-4 rounded-xl border border-[var(--theme-border)] hover:border-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] hover:bg-[var(--theme-accent-primary)] hover:text-white font-serif font-bold text-xs uppercase tracking-wider text-[var(--theme-text-primary)] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Explore Monument</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Place Detail Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[var(--theme-card-bg)] rounded-3xl border border-[var(--theme-border)] shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative">
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[var(--theme-bg-accent)] hover:bg-[var(--theme-border)] flex items-center justify-center text-sm font-bold text-[var(--theme-text-primary)] transition-colors"
            >
              ✕
            </button>

            <div className="relative h-60 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 overflow-hidden rounded-t-3xl">
              <img
                src={selectedPlace.imageUrl}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--theme-accent-primary)]">
                  {selectedPlace.category}
                </span>
                <h3 className="font-serif font-black text-2xl mt-1 text-white">
                  {selectedPlace.name}
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[var(--theme-text-secondary)]">
              <p className="leading-relaxed text-[var(--theme-text-primary)] font-medium">
                {selectedPlace.shortDescription}
              </p>

              {selectedPlace.highlight && (
                <div className="p-3.5 rounded-2xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)]">
                  <span className="text-xs font-bold text-[var(--theme-accent-primary)] uppercase tracking-wider block mb-1">
                    ✨ Cultural Highlight
                  </span>
                  <p className="text-xs text-[var(--theme-text-primary)] font-sans">
                    {selectedPlace.highlight}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-[var(--theme-bg-primary)] border border-[var(--theme-border)]">
                  <span className="text-[10px] uppercase font-bold text-[var(--theme-text-muted)] block">Location</span>
                  <span className="font-bold text-[var(--theme-text-primary)] block mt-0.5">{selectedPlace.location}</span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--theme-bg-primary)] border border-[var(--theme-border)]">
                  <span className="text-[10px] uppercase font-bold text-[var(--theme-text-muted)] block">Timings</span>
                  <span className="font-bold text-[var(--theme-text-primary)] block mt-0.5">{selectedPlace.openingHours}</span>
                </div>
                <div className="col-span-2 p-3 rounded-xl bg-[var(--theme-bg-primary)] border border-[var(--theme-border)]">
                  <span className="text-[10px] uppercase font-bold text-[var(--theme-text-muted)] block">Entry Fee & Tickets</span>
                  <span className="font-bold text-[var(--theme-text-primary)] block mt-0.5">{selectedPlace.entryFee}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedPlace(null)}
                className="px-5 py-2.5 rounded-xl border border-[var(--theme-border)] text-xs font-bold uppercase tracking-wider text-[var(--theme-text-secondary)]"
              >
                Close
              </button>

              <Link
                to={`/places/${destinationName}`}
                className="px-6 py-2.5 rounded-xl font-serif font-bold text-xs uppercase tracking-wider text-[var(--theme-btn-text)] bg-[var(--theme-btn-bg)] hover:opacity-90 flex items-center gap-1.5"
              >
                <span>Full Guide in Places Explorer</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationPlaces;
