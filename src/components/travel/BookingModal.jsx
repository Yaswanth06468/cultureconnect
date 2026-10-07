import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const BookingModal = ({ trip, fromCity, toCity, travelDate, travelers = 1, onClose, onConfirm }) => {
  const { user } = useContext(AuthContext);

  const [leadName, setLeadName] = useState(user?.username ? user.username : 'Priya Sharma');
  const [leadEmail, setLeadEmail] = useState(user?.email ? user.email : 'priya.traveler@cultureconnect.in');
  const [leadPhone, setLeadPhone] = useState('+91 98765 43210');
  const [seatPref, setSeatPref] = useState(trip?.mode === 'Flight' ? 'Window' : trip?.mode === 'Train' ? 'Lower Berth' : 'Single Sleeper');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!trip) return null;

  const baseFare = trip.price * travelers;
  const taxesAndFees = Math.round(baseFare * 0.05); // 5% mock tax
  const totalAmount = baseFare + taxesAndFees;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      // Generate realistic booking ID
      const cityCode = (toCity || 'BLR').substring(0, 3).toUpperCase();
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const bookingId = `CC-TRV-${randomNum}${cityCode}`;
      const pnr = `PNR${Math.floor(100000 + Math.random() * 900000)}`;

      const bookingRecord = {
        bookingId,
        pnr,
        trip,
        fromCity,
        toCity,
        travelDate,
        travelers,
        leadPassenger: {
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          seatPref
        },
        fare: {
          baseFare,
          taxesAndFees,
          totalAmount
        },
        bookedAt: new Date().toISOString(),
        status: 'Confirmed'
      };

      // Save to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('culture_travel_bookings') || '[]');
        localStorage.setItem('culture_travel_bookings', JSON.stringify([bookingRecord, ...existing]));
        localStorage.setItem('active_travel_trip', JSON.stringify(bookingRecord));
      } catch (err) {
        console.error('Failed to save booking to localStorage:', err);
      }

      setIsProcessing(false);
      onConfirm(bookingRecord);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[var(--theme-card-bg)] rounded-3xl border border-[var(--theme-border)] shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 md:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[var(--theme-bg-accent)] hover:bg-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-[var(--theme-border)]">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
            Instant Ticket Confirmation
          </span>
          <h2 className="text-2xl font-serif font-black text-[var(--theme-text-primary)] mt-2">
            Confirm Your Journey to {toCity}
          </h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-0.5">
            After booking, you will instantly unlock the curated {toCity} Cultural Experience!
          </p>
        </div>

        {/* Journey Quick Summary */}
        <div className="p-4 rounded-2xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {trip.mode === 'Flight' ? '✈️' : trip.mode === 'Train' ? '🚆' : '🚌'}
              </span>
              <div>
                <h4 className="font-bold text-sm text-[var(--theme-text-primary)]">
                  {trip.operator} ({trip.serviceNumber})
                </h4>
                <p className="text-xs text-[var(--theme-text-muted)]">
                  {trip.mode} • {trip.classType}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[var(--theme-text-muted)] block">Date</span>
              <span className="text-xs font-bold text-[var(--theme-text-primary)]">
                {new Date(travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center text-center pt-2 border-t border-[var(--theme-border)]">
            <div className="text-left">
              <span className="text-[11px] text-[var(--theme-text-muted)] block">From</span>
              <div className="font-bold text-sm text-[var(--theme-text-primary)]">{fromCity}</div>
              <div className="text-xs font-mono text-[var(--theme-accent-primary)]">{trip.departureTime}</div>
            </div>
            <div className="text-center">
              <span className="text-[11px] text-[var(--theme-text-muted)] block">Duration</span>
              <span className="text-xs font-bold text-[var(--theme-text-secondary)]">{trip.duration}</span>
              <span className="text-[10px] text-[var(--theme-accent-jade)] block">{trip.stops}</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-[var(--theme-text-muted)] block">To</span>
              <div className="font-bold text-sm text-[var(--theme-text-primary)]">{toCity}</div>
              <div className="text-xs font-mono text-[var(--theme-accent-primary)]">{trip.arrivalTime}</div>
            </div>
          </div>
        </div>

        {/* Passenger Information Form */}
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1">
                Lead Passenger Name
              </label>
              <input
                type="text"
                required
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="Full Name as on ID"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-input-bg)] text-[var(--theme-text-primary)] text-sm focus:outline-none focus:border-[var(--theme-accent-primary)]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="ticket-updates@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-input-bg)] text-[var(--theme-text-primary)] text-sm focus:outline-none focus:border-[var(--theme-accent-primary)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-input-bg)] text-[var(--theme-text-primary)] text-sm focus:outline-none focus:border-[var(--theme-accent-primary)]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1">
                Seat / Berth Preference
              </label>
              <select
                value={seatPref}
                onChange={(e) => setSeatPref(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-input-bg)] text-[var(--theme-text-primary)] text-sm focus:outline-none focus:border-[var(--theme-accent-primary)]"
              >
                {trip.mode === 'Flight' ? (
                  <>
                    <option value="Window">Window Seat</option>
                    <option value="Aisle">Aisle Seat</option>
                    <option value="Extra Legroom">Extra Legroom</option>
                  </>
                ) : trip.mode === 'Train' ? (
                  <>
                    <option value="Lower Berth">Lower Berth</option>
                    <option value="Middle Berth">Middle Berth</option>
                    <option value="Upper Berth">Upper Berth</option>
                    <option value="Side Lower">Side Lower</option>
                  </>
                ) : (
                  <>
                    <option value="Lower Sleeper">Lower Sleeper</option>
                    <option value="Upper Sleeper">Upper Sleeper</option>
                    <option value="Window Semi-Sleeper">Window Semi-Sleeper</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Fare Summary Breakdown */}
          <div className="p-4 rounded-2xl bg-[var(--theme-bg-primary)] border border-[var(--theme-border)] text-xs space-y-1.5 mt-4">
            <div className="flex justify-between text-[var(--theme-text-secondary)]">
              <span>Base Fare ({travelers} {travelers === 1 ? 'Traveler' : 'Travelers'} × ₹{trip.price})</span>
              <span>₹{baseFare.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[var(--theme-text-secondary)]">
              <span>Taxes, Station Dues & Platform Service (5%)</span>
              <span>₹{taxesAndFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[var(--theme-text-muted)] text-[11px]">
              <span>CultureConnect Heritage Discovery Pass</span>
              <span className="text-[var(--theme-accent-jade)] font-bold">FREE INCLUDED</span>
            </div>
            <div className="pt-2 border-t border-[var(--theme-border)] flex justify-between font-serif font-black text-sm text-[var(--theme-text-primary)]">
              <span>Total Mock Journey Amount</span>
              <span className="text-base text-[var(--theme-accent-primary)]">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-bg-accent)] text-xs font-bold uppercase tracking-wider transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-7 py-3 rounded-2xl font-serif font-bold text-sm tracking-wide text-[var(--theme-btn-text)] bg-[var(--theme-btn-bg)] hover:opacity-95 shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Issuing Mock Ticket...</span>
                </>
              ) : (
                <>
                  <span>Confirm Booking & Unlock Culture</span>
                  <span>✨</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
