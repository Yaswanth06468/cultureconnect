import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TravelSearch from '../components/travel/TravelSearch';
import TripCard from '../components/travel/TripCard';
import BookingModal from '../components/travel/BookingModal';
import BookingConfirmation from '../components/travel/BookingConfirmation';
import TripDashboard from '../components/travel/TripDashboard';
import MyTripsModal from '../components/travel/MyTripsModal';
import { generateMockTrips, getDestinationCulture, normalizeCity } from '../data/travelData';

const Travel = () => {
  const [searchParams] = useSearchParams();
  const urlCity = searchParams.get('to') || 'Bangalore';
  const urlFrom = searchParams.get('from') || 'Hyderabad';

  // Search parameters
  const [searchState, setSearchState] = useState({
    fromCity: urlFrom,
    toCity: urlCity,
    travelDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
    })(),
    travelers: 1,
    travelMode: 'All'
  });

  // State
  const [trips, setTrips] = useState([]);
  const [selectedTripForBooking, setSelectedTripForBooking] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);
  const [viewMode, setViewMode] = useState('search'); // 'search' | 'confirmation' | 'experience'
  const [myTripsOpen, setMyTripsOpen] = useState(false);
  const [sortOption, setSortOption] = useState('recommended'); // 'recommended', 'price_asc', 'duration_asc'

  // Pre-load default trips on mount
  useEffect(() => {
    // Check if there is an active trip in localStorage
    try {
      const savedActive = localStorage.getItem('active_travel_trip');
      if (savedActive) {
        const parsed = JSON.parse(savedActive);
        setActiveBooking(parsed);
        // If user navigated directly or already booked, give them option
      }
    } catch {
      /* ignore */
    }

    // Generate initial trip list for default route
    const initialTrips = generateMockTrips(searchState.fromCity, searchState.toCity, searchState.travelDate, searchState.travelMode);
    setTrips(initialTrips);
  }, []);

  // Handle Search Submission
  const handleSearch = (newParams) => {
    setSearchState(newParams);
    const results = generateMockTrips(newParams.fromCity, newParams.toCity, newParams.travelDate, newParams.travelMode);
    setTrips(results);
    setViewMode('search');
  };

  // Sort trips
  const sortedTrips = [...trips].sort((a, b) => {
    if (sortOption === 'price_asc') return a.price - b.price;
    if (sortOption === 'duration_asc') {
      const getMins = (dur) => {
        const parts = dur.split(' ');
        let mins = 0;
        parts.forEach((p) => {
          if (p.includes('h')) mins += parseInt(p) * 60;
          if (p.includes('m')) mins += parseInt(p);
        });
        return mins || 1000;
      };
      return getMins(a.duration) - getMins(b.duration);
    }
    return 0;
  });

  // Trigger Booking Modal
  const handleBookClick = (trip) => {
    setSelectedTripForBooking(trip);
  };

  // On Booking Confirmed
  const handleBookingConfirmed = (bookingRecord) => {
    setActiveBooking(bookingRecord);
    setSelectedTripForBooking(null);
    setViewMode('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select a stored trip from MyTrips
  const handleSelectStoredTrip = (tripRecord) => {
    setActiveBooking(tripRecord);
    setSearchState((prev) => ({
      ...prev,
      fromCity: tripRecord.fromCity,
      toCity: tripRecord.toCity,
      travelers: tripRecord.travelers || 1
    }));
    setViewMode('experience');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get dynamic culture data for current destination
  const currentDestination = activeBooking ? activeBooking.toCity : searchState.toCity;
  const currentOrigin = activeBooking ? activeBooking.fromCity : searchState.fromCity;
  const destinationCulture = getDestinationCulture(currentDestination);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* ── Page Hero Header ── */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--theme-bg-accent)] text-[var(--theme-accent-primary)] mb-2">
            <span>✈️ CultureConnect Travel Experience</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-[var(--theme-text-primary)]">
            Travel & Cultural Discovery
          </h1>
          <p className="text-sm md:text-base text-[var(--theme-text-secondary)] mt-1 font-sans max-w-2xl">
            Book your journey across India and instantly discover the living culture, iconic monuments, regional food trails, folk dances, and local language phrases of your destination.
          </p>
        </div>

        {/* Global Action Header */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {activeBooking && viewMode !== 'experience' && (
            <button
              type="button"
              onClick={() => setViewMode('experience')}
              className="px-4 py-2.5 rounded-2xl text-xs font-serif font-bold text-[var(--theme-btn-text)] bg-[var(--theme-btn-bg)] hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>✨</span>
              <span>Open {activeBooking.toCity} Culture</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMyTripsOpen(true)}
            className="px-4 py-2.5 rounded-2xl text-xs font-serif font-bold border border-[var(--theme-border)] bg-[var(--theme-card-bg)] hover:bg-[var(--theme-bg-accent)] text-[var(--theme-text-primary)] transition-all flex items-center gap-1.5"
          >
            <span>📋</span>
            <span>My Trips</span>
          </button>
        </div>
      </div>

      {/* ── Mode 1: Confirmation Screen ── */}
      {viewMode === 'confirmation' && activeBooking && (
        <div className="space-y-8">
          <BookingConfirmation
            booking={activeBooking}
            onExploreCulture={() => setViewMode('experience')}
            onOpenMyTrips={() => setMyTripsOpen(true)}
            onNewSearch={() => setViewMode('search')}
          />
        </div>
      )}

      {/* ── Mode 2: Destination Cultural Experience ── */}
      {viewMode === 'experience' && (
        <div className="space-y-8">
          <TripDashboard
            cultureData={destinationCulture}
            booking={activeBooking}
            destinationName={normalizeCity(currentDestination)}
            originName={normalizeCity(currentOrigin)}
            onViewTicket={() => setViewMode('confirmation')}
            onOpenMyTrips={() => setMyTripsOpen(true)}
            onPlanNewTrip={() => setViewMode('search')}
          />
        </div>
      )}

      {/* ── Mode 3: Search & Trip Listings ── */}
      {viewMode === 'search' && (
        <div className="space-y-10">
          {/* Search Box */}
          <TravelSearch
            onSearch={handleSearch}
            initialFrom={searchState.fromCity}
            initialTo={searchState.toCity}
            initialDate={searchState.travelDate}
            initialMode={searchState.travelMode}
          />

          {/* Results Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--theme-border)]">
              <div>
                <h3 className="font-serif font-black text-2xl text-[var(--theme-text-primary)]">
                  Available Trips: {searchState.fromCity} <span className="text-[var(--theme-accent-primary)]">➔</span> {searchState.toCity}
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                  Showing {sortedTrips.length} verified mock transport options for {new Date(searchState.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              {/* Sorting Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-[var(--theme-text-muted)]">Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card-bg)] text-[var(--theme-text-primary)] font-medium focus:outline-none focus:border-[var(--theme-accent-primary)]"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_asc">Lowest Price (₹)</option>
                  <option value="duration_asc">Shortest Duration</option>
                </select>
              </div>
            </div>

            {/* Trip Cards Grid */}
            {sortedTrips.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl bg-[var(--theme-card-bg)] border border-[var(--theme-border)]">
                <span className="text-4xl block mb-2">🧭</span>
                <h4 className="font-serif font-bold text-lg text-[var(--theme-text-primary)]">
                  No trips found for this selection
                </h4>
                <p className="text-xs text-[var(--theme-text-muted)] mt-1">
                  Try changing travel mode to "All Modes" or select popular hubs like Hyderabad, Bangalore, Mumbai, or Goa.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sortedTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    travelers={searchState.travelers}
                    onBook={handleBookClick}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick Destination Cultural Preview Teaser */}
          <div className="mt-16 p-8 rounded-3xl bg-[var(--theme-card-bg)] border border-[var(--theme-border)] shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
                  Destination Sneak Peek
                </span>
                <h4 className="text-2xl font-serif font-black text-[var(--theme-text-primary)]">
                  Traveling to {searchState.toCity}?
                </h4>
                <p className="text-xs md:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                  Booking any ticket unlocks {searchState.toCity}’s curated cultural guide — including famous places like {destinationCulture.places?.[0]?.name || 'historic palaces'}, iconic foods like {destinationCulture.foods?.[0]?.name || 'signature dishes'}, native Kannada/regional phrases, and custom 2-day itineraries!
                </p>
              </div>

              <button
                type="button"
                onClick={() => setViewMode('experience')}
                className="px-6 py-3.5 rounded-2xl font-serif font-bold text-xs uppercase tracking-wider text-[var(--theme-btn-text)] bg-[var(--theme-btn-bg)] hover:opacity-90 flex items-center justify-center gap-2 self-start md:self-auto flex-shrink-0"
              >
                <span>Preview {searchState.toCity} Culture</span>
                <span>✨</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Booking Modal ── */}
      {selectedTripForBooking && (
        <BookingModal
          trip={selectedTripForBooking}
          fromCity={searchState.fromCity}
          toCity={searchState.toCity}
          travelDate={searchState.travelDate}
          travelers={searchState.travelers}
          onClose={() => setSelectedTripForBooking(null)}
          onConfirm={handleBookingConfirmed}
        />
      )}

      {/* ── My Trips Drawer/Modal ── */}
      <MyTripsModal
        isOpen={myTripsOpen}
        onClose={() => setMyTripsOpen(false)}
        onSelectTrip={handleSelectStoredTrip}
        onNewJourney={() => {
          setViewMode('search');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export default Travel;
