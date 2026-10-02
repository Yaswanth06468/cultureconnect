const TripCard = ({ trip, travelers = 1, onBook }) => {
  const getModeIcon = (mode) => {
    switch (mode) {
      case 'Flight':
        return '✈️';
      case 'Train':
        return '🚆';
      case 'Bus':
        return '🚌';
      default:
        return '🧭';
    }
  };

  const getModeBadgeClass = (mode) => {
    switch (mode) {
      case 'Flight':
        return 'bg-amber-500/10 text-amber-700 border-amber-300';
      case 'Train':
        return 'bg-emerald-500/10 text-emerald-700 border-emerald-300';
      case 'Bus':
        return 'bg-blue-500/10 text-blue-700 border-blue-300';
      default:
        return 'bg-[var(--theme-bg-accent)] text-[var(--theme-text-primary)] border-[var(--theme-border)]';
    }
  };

  const totalFare = trip.price * travelers;

  return (
    <div className="flat-card p-5 md:p-6 flex flex-col justify-between relative group hover:border-[var(--theme-accent-primary)] transition-all duration-300">
      {/* Top Banner: Mode, Operator, Highlights */}
      <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-[var(--theme-border)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
            {getModeIcon(trip.mode)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getModeBadgeClass(trip.mode)}`}>
                {trip.mode}
              </span>
              {trip.badge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--theme-accent-primary)]/10 text-[var(--theme-accent-primary)] border border-[var(--theme-accent-primary)]/20">
                  {trip.badge}
                </span>
              )}
            </div>
            <h3 className="font-serif font-black text-lg text-[var(--theme-text-primary)] mt-1">
              {trip.operator}
            </h3>
            <p className="text-xs text-[var(--theme-text-muted)] font-mono">
              {trip.serviceNumber} • {trip.classType}
            </p>
          </div>
        </div>

        {/* Rating & Punctuality */}
        <div className="text-right">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-700 font-bold text-xs">
            <span>★</span>
            <span>{trip.rating}</span>
          </div>
          <p className="text-[11px] text-[var(--theme-text-muted)] mt-1">
            {trip.punctuality}
          </p>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="grid grid-cols-3 items-center text-center my-3 py-2 bg-[var(--theme-bg-accent)]/50 rounded-2xl px-4">
        {/* Departure */}
        <div className="text-left">
          <span className="text-xs uppercase font-bold tracking-wider text-[var(--theme-text-muted)] block">
            Departure
          </span>
          <span className="font-serif font-black text-xl text-[var(--theme-text-primary)]">
            {trip.departureTime}
          </span>
          <span className="text-xs text-[var(--theme-text-secondary)] block truncate max-w-[140px]" title={trip.fromStation}>
            {trip.fromStation}
          </span>
        </div>

        {/* Duration Arrow */}
        <div className="flex flex-col items-center justify-center px-2">
          <span className="text-[11px] font-bold text-[var(--theme-text-muted)]">
            {trip.duration}
          </span>
          <div className="w-full flex items-center my-1">
            <div className="h-[2px] w-full bg-[var(--theme-border)]"></div>
            <span className="text-xs text-[var(--theme-accent-primary)] px-1">●</span>
            <div className="h-[2px] w-full bg-[var(--theme-border)]"></div>
          </div>
          <span className="text-[10px] text-[var(--theme-accent-jade)] font-medium">
            {trip.stops}
          </span>
        </div>

        {/* Arrival */}
        <div className="text-right">
          <span className="text-xs uppercase font-bold tracking-wider text-[var(--theme-text-muted)] block">
            Arrival
          </span>
          <span className="font-serif font-black text-xl text-[var(--theme-text-primary)]">
            {trip.arrivalTime}
          </span>
          <span className="text-xs text-[var(--theme-text-secondary)] block truncate max-w-[140px]" title={trip.toStation}>
            {trip.toStation}
          </span>
        </div>
      </div>

      {/* Amenities Tags */}
      <div className="flex flex-wrap items-center gap-1.5 my-3">
        {trip.amenities?.map((amenity, idx) => (
          <span
            key={idx}
            className="text-[11px] px-2 py-0.5 rounded-lg bg-[var(--theme-bg-primary)] border border-[var(--theme-border)] text-[var(--theme-text-secondary)]"
          >
            ✓ {amenity}
          </span>
        ))}
      </div>

      {/* Bottom Bar: Price, Seats & Book Button */}
      <div className="pt-4 mt-2 border-t border-[var(--theme-border)] flex items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-black text-2xl text-[var(--theme-text-primary)]">
              ₹{totalFare.toLocaleString()}
            </span>
            {trip.originalPrice && (
              <span className="text-xs line-through text-[var(--theme-text-muted)]">
                ₹{(trip.originalPrice * travelers).toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--theme-text-muted)]">
              {travelers > 1 ? `Total for ${travelers} travelers (₹${trip.price}/person)` : 'Per traveler'}
            </span>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.2 rounded-full border border-amber-200">
              {trip.availableSeats} seats left
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onBook(trip)}
          className="px-6 py-3 rounded-2xl font-serif font-bold text-sm tracking-wide text-[var(--theme-btn-text)] bg-[var(--theme-btn-bg)] hover:opacity-95 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 flex-shrink-0"
        >
          <span>Book Now</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default TripCard;
