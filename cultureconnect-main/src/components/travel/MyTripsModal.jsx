const MyTripsModal = ({ isOpen, onClose, onSelectTrip, onNewJourney }) => {
  if (!isOpen) return null;

  const bookings = (() => {
    try {
      return JSON.parse(localStorage.getItem('culture_travel_bookings') || '[]');
    } catch {
      return [];
    }
  })();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[var(--theme-card-bg)] rounded-3xl border border-[var(--theme-border)] shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 relative flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[var(--theme-bg-accent)] hover:bg-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6 pb-4 border-b border-[var(--theme-border)]">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
            Stored Journeys
          </span>
          <h2 className="text-2xl font-serif font-black text-[var(--theme-text-primary)] mt-2">
            My Cultural Trips
          </h2>
          <p className="text-xs text-[var(--theme-text-secondary)] mt-0.5">
            Access your saved tickets, booking IDs, and unlocked destination cultural experiences.
          </p>
        </div>

        {/* Bookings List */}
        <div className="space-y-4 flex-1">
          {bookings.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-[var(--theme-bg-accent)]/50 border border-dashed border-[var(--theme-border)]">
              <span className="text-4xl block mb-2">🧭</span>
              <h4 className="font-serif font-bold text-base text-[var(--theme-text-primary)]">
                No trips booked yet
              </h4>
              <p className="text-xs text-[var(--theme-text-muted)] mt-1 max-w-sm mx-auto">
                Search for your next journey from Hyderabad to Bangalore or across India to unlock its culture!
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNewJourney();
                }}
                className="mt-4 px-5 py-2.5 rounded-xl font-serif font-bold text-xs uppercase tracking-wider text-[var(--theme-btn-text)] bg-[var(--theme-btn-bg)] hover:opacity-90"
              >
                Plan a Journey Now
              </button>
            </div>
          ) : (
            bookings.map((b, idx) => (
              <div
                key={b.bookingId || idx}
                className="flat-card p-5 border border-[var(--theme-border)] hover:border-[var(--theme-accent-primary)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {b.trip?.mode === 'Flight' ? '✈️' : b.trip?.mode === 'Train' ? '🚆' : '🚌'}
                    </span>
                    <span className="font-serif font-black text-base text-[var(--theme-text-primary)]">
                      {b.fromCity} → {b.toCity}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-bg-accent)] text-[var(--theme-accent-primary)] font-bold">
                      {b.bookingId}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--theme-text-muted)] font-mono">
                    {b.trip?.operator} • {new Date(b.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {b.travelers} Traveler(s)
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTrip(b);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-serif font-bold tracking-wide text-[var(--theme-btn-text)] bg-[var(--theme-btn-bg)] hover:opacity-95 transition-all"
                  >
                    View Culture Experience ✨
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between">
          <span className="text-xs text-[var(--theme-text-muted)]">
            Total Bookings: {bookings.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-[var(--theme-border)] text-xs font-bold uppercase tracking-wider text-[var(--theme-text-secondary)] hover:bg-[var(--theme-bg-accent)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyTripsModal;
