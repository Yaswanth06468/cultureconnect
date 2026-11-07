const BookingConfirmation = ({ booking, onExploreCulture, onOpenMyTrips, onNewSearch }) => {
  if (!booking) return null;

  const {
    bookingId,
    pnr,
    trip,
    fromCity,
    toCity,
    travelDate,
    travelers,
    leadPassenger,
    fare
  } = booking;

  const formattedDate = new Date(travelDate).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="w-full bg-[var(--theme-card-bg)] rounded-3xl border border-[var(--theme-border)] shadow-2xl p-6 md:p-10 relative overflow-hidden transition-all duration-300 animate-fade-in">
      {/* Success Badge & Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-300 mx-auto flex items-center justify-center text-3xl mb-3 shadow-inner">
          ✓
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
          Mock Booking Confirmed
        </span>
        <h2 className="text-3xl font-serif font-black text-[var(--theme-text-primary)] mt-3">
          Pack Your Bags for {toCity}!
        </h2>
        <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
          Your travel ticket is verified. You have now unlocked the tailored cultural gateway to explore historical monuments, local dishes, dance traditions, and local phrases.
        </p>
      </div>

      {/* Styled Boarding Pass / Ticket Card */}
      <div className="max-w-2xl mx-auto bg-[var(--theme-bg-primary)] rounded-3xl border-2 border-dashed border-[var(--theme-border)] p-6 md:p-8 relative shadow-sm">
        {/* Top Header of Ticket */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[var(--theme-border)] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {trip?.mode === 'Flight' ? '✈️' : trip?.mode === 'Train' ? '🚆' : '🚌'}
              </span>
              <span className="font-serif font-black text-xl text-[var(--theme-text-primary)]">
                {trip?.operator}
              </span>
            </div>
            <p className="text-xs text-[var(--theme-text-muted)] font-mono mt-0.5">
              Service: {trip?.serviceNumber} • Class: {trip?.classType}
            </p>
          </div>

          <div className="sm:text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] block">
              Booking ID
            </span>
            <span className="font-mono font-black text-base text-[var(--theme-accent-primary)] bg-[var(--theme-card-bg)] px-3 py-1 rounded-lg border border-[var(--theme-border)] inline-block">
              {bookingId}
            </span>
            <span className="text-[10px] text-[var(--theme-text-muted)] block mt-0.5 font-mono">
              PNR: {pnr}
            </span>
          </div>
        </div>

        {/* Route Details */}
        <div className="grid grid-cols-3 items-center py-6 text-center border-b border-[var(--theme-border)]">
          <div className="text-left">
            <span className="text-xs uppercase font-bold text-[var(--theme-text-muted)] block">
              From
            </span>
            <span className="font-serif font-black text-xl md:text-2xl text-[var(--theme-text-primary)]">
              {fromCity}
            </span>
            <span className="text-xs font-mono font-bold text-[var(--theme-accent-primary)] block">
              {trip?.departureTime}
            </span>
            <span className="text-[11px] text-[var(--theme-text-muted)] block truncate max-w-[150px]">
              {trip?.fromStation}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-[var(--theme-text-muted)]">{trip?.duration}</span>
            <div className="w-full flex items-center my-1.5">
              <div className="h-[2px] w-full bg-[var(--theme-border)]"></div>
              <span className="text-xs text-[var(--theme-accent-primary)] px-1">➔</span>
              <div className="h-[2px] w-full bg-[var(--theme-border)]"></div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {trip?.mode}
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs uppercase font-bold text-[var(--theme-text-muted)] block">
              To
            </span>
            <span className="font-serif font-black text-xl md:text-2xl text-[var(--theme-text-primary)]">
              {toCity}
            </span>
            <span className="text-xs font-mono font-bold text-[var(--theme-accent-primary)] block">
              {trip?.arrivalTime}
            </span>
            <span className="text-[11px] text-[var(--theme-text-muted)] block truncate max-w-[150px]">
              {trip?.toStation}
            </span>
          </div>
        </div>

        {/* Passenger & Fare Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-[var(--theme-border)] text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--theme-text-muted)] block">Passenger</span>
            <span className="font-bold text-[var(--theme-text-primary)] block truncate">{leadPassenger?.name}</span>
            <span className="text-[10px] text-[var(--theme-text-muted)]">{travelers} Traveler(s)</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--theme-text-muted)] block">Travel Date</span>
            <span className="font-bold text-[var(--theme-text-primary)] block">{formattedDate}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--theme-text-muted)] block">Preference</span>
            <span className="font-bold text-[var(--theme-text-primary)] block">{leadPassenger?.seatPref}</span>
            <span className="text-[10px] text-[var(--theme-accent-jade)]">Assigned</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--theme-text-muted)] block">Total Fare</span>
            <span className="font-serif font-bold text-base text-[var(--theme-accent-primary)] block">
              ₹{fare?.totalAmount?.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">Paid (Mock)</span>
          </div>
        </div>

        {/* Mock QR Code & Culture Ticket Notice */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-xl flex items-center justify-center font-mono text-xl shadow-inner">
              ▦
            </div>
            <div>
              <span className="text-[11px] font-bold text-[var(--theme-text-primary)] block">
                CultureConnect Pass Active
              </span>
              <span className="text-[10px] text-[var(--theme-text-muted)] block">
                Show at local heritage monuments & partner cultural centers
              </span>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[var(--theme-accent-jade)]/10 text-[var(--theme-accent-jade)] font-bold border border-[var(--theme-accent-jade)]/20">
            ✓ Ticket Confirmed
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-2xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Primary CTA: Destination Cultural Experience */}
        <button
          type="button"
          onClick={onExploreCulture}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl font-serif font-black text-sm tracking-wide text-[var(--theme-btn-text)] bg-[var(--theme-btn-bg)] hover:opacity-95 shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 group"
        >
          <span>Discover {toCity} Cultural Experience</span>
          <span className="group-hover:translate-x-1 transition-transform">✨</span>
        </button>

        {/* "My Trip" Button */}
        <button
          type="button"
          onClick={onOpenMyTrips}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm border-2 border-[var(--theme-border)] hover:border-[var(--theme-accent-primary)] text-[var(--theme-text-primary)] bg-[var(--theme-card-bg)] hover:bg-[var(--theme-bg-accent)] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>📋 My Trips</span>
        </button>

        {/* Plan Another Trip */}
        <button
          type="button"
          onClick={onNewSearch}
          className="w-full sm:w-auto px-5 py-4 rounded-2xl font-medium text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] transition-colors"
        >
          Plan Another Trip
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
