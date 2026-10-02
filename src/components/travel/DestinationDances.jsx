import { Link } from 'react-router-dom';

const DestinationDances = ({ dances = [], destinationName = 'Bangalore' }) => {
  if (!dances || dances.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--theme-text-muted)]">
        No dance and art forms documented for {destinationName}.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[var(--theme-border)]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
            Performing Arts & Folklore
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-black text-[var(--theme-text-primary)] mt-2">
            Traditional Dances & Arts of {destinationName}
          </h3>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
            Dynamic rhythmic footwork, intricate face cosmetics, sacred temple theatre, and folk percussion.
          </p>
        </div>

        <Link
          to="/dances"
          className="text-xs font-bold text-[var(--theme-accent-primary)] hover:underline inline-flex items-center gap-1 self-start md:self-auto"
        >
          <span>Open Full Dances Showcase</span>
          <span>→</span>
        </Link>
      </div>

      {/* Dance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dances.map((dance, idx) => (
          <div
            key={idx}
            className="flat-card overflow-hidden flex flex-col justify-between group hover:border-[var(--theme-accent-primary)] transition-all duration-300"
          >
            {/* Image Banner */}
            <div className="relative h-52 w-full overflow-hidden bg-[var(--theme-bg-accent)]">
              <img
                src={dance.imageUrl}
                alt={dance.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                {dance.category}
              </span>
              <h4 className="absolute bottom-3 left-4 right-4 font-serif font-black text-xl text-white">
                {dance.name}
              </h4>
            </div>

            {/* Description & Elements */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                {dance.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-[var(--theme-border)] text-xs">
                {dance.instruments && (
                  <div className="p-3 rounded-xl bg-[var(--theme-bg-accent)]/60 border border-[var(--theme-border)]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] block mb-0.5">
                      🎵 Rhythmic Instruments:
                    </span>
                    <span className="text-[var(--theme-text-primary)] font-medium">
                      {dance.instruments}
                    </span>
                  </div>
                )}

                {dance.whereToWatch && (
                  <div className="flex items-start gap-1.5 text-[var(--theme-text-muted)] text-[11px]">
                    <span>📍</span>
                    <span><strong>Where to Experience:</strong> {dance.whereToWatch}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationDances;
