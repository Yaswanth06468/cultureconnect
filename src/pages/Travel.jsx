import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TravelSearch from '../components/travel/TravelSearch';
import TripCard from '../components/travel/TripCard';
import BookingModal from '../components/travel/BookingModal';
import BookingConfirmation from '../components/travel/BookingConfirmation';
import TripDashboard from '../components/travel/TripDashboard';
import MyTripsModal from '../components/travel/MyTripsModal';
import { generateMockTrips, getDestinationCulture, normalizeCity } from '../data/travelData';

// ── Decorative hero stats ─────────────────────────────────────────────────────
const HERO_STATS = [
  { icon: '🏙️', label: 'Cities', value: '50+' },
  { icon: '🚆', label: 'Routes', value: '200+' },
  { icon: '🎭', label: 'Culture Guides', value: '30+' },
  { icon: '🍛', label: 'Food Trails', value: '150+' },
];

const POPULAR_DEST_PREVIEW = [
  { city: 'Jaipur', tagline: 'City of Palaces', emoji: '🏯' },
  { city: 'Goa', tagline: 'Sun, Sea & Culture', emoji: '🌴' },
  { city: 'Varanasi', tagline: 'Spiritual Capital', emoji: '🪔' },
  { city: 'Kerala', tagline: "God's Own Country", emoji: '🌿' },
  { city: 'Mumbai', tagline: 'Maximum City', emoji: '🌆' },
];

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
  const [sortOption, setSortOption] = useState('recommended');
  const [heroDestIdx, setHeroDestIdx] = useState(0);

  // Cycle popular destinations in hero
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroDestIdx((prev) => (prev + 1) % POPULAR_DEST_PREVIEW.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Pre-load default trips on mount
  useEffect(() => {
    try {
      const savedActive = localStorage.getItem('active_travel_trip');
      if (savedActive) {
        const parsed = JSON.parse(savedActive);
        setActiveBooking(parsed);
      }
    } catch {
      /* ignore */
    }
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

  const handleBookClick = (trip) => setSelectedTripForBooking(trip);

  const handleBookingConfirmed = (bookingRecord) => {
    setActiveBooking(bookingRecord);
    setSelectedTripForBooking(null);
    setViewMode('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const currentDestination = activeBooking ? activeBooking.toCity : searchState.toCity;
  const currentOrigin = activeBooking ? activeBooking.fromCity : searchState.fromCity;
  const destinationCulture = getDestinationCulture(currentDestination);
  const heroDest = POPULAR_DEST_PREVIEW[heroDestIdx];

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>

      {/* ══════════════════════════════════════════════════════════
          LIGHT HERO — cream background, dark text, orange accent
      ══════════════════════════════════════════════════════════ */}
      <div className="pt-20 md:pt-22 pb-5 px-4 md:px-8" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Top Bar: Badge centered, My Trips on far right */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{
                background: 'var(--theme-bg-accent)',
                border: '1px solid var(--theme-border)',
                color: 'var(--theme-accent-primary)'
              }}
            >
              <span>✈️</span>
              <span>Travel Experience</span>
            </div>

            {/* Top Right Actions */}
            <div className="flex items-center gap-2.5">
              {activeBooking && viewMode !== 'experience' && (
                <button
                  type="button"
                  onClick={() => setViewMode('experience')}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl font-serif font-bold text-xs transition-all hover:opacity-90 active:scale-95"
                  style={{
                    background: 'var(--theme-btn-bg)',
                    color: 'var(--theme-btn-text)',
                    boxShadow: '0 2px 10px rgba(193,80,46,0.2)'
                  }}
                >
                  <span>✨</span>
                  <span>Open {activeBooking.toCity} Culture</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setMyTripsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl font-serif font-bold text-xs transition-all hover:bg-[var(--theme-bg-accent)]"
                style={{
                  background: 'var(--theme-card-bg)',
                  border: '1px solid var(--theme-border)',
                  color: 'var(--theme-text-primary)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}
              >
                <span>📋</span>
                <span>My Trips</span>
              </button>
            </div>
          </div>

          {/* Heading — centered, shorter */}
          <h1
            className="font-serif font-black tracking-tight mb-3"
            style={{
              fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
              lineHeight: 1.2,
              color: 'var(--theme-text-primary)'
            }}
          >
            Travel India & <span style={{ color: 'var(--theme-accent-primary)' }}>Discover Its Soul</span>
          </h1>

          {/* Subtitle — centered */}
          <p
            className="text-sm md:text-base leading-relaxed mb-5 mx-auto"
            style={{ color: 'var(--theme-text-secondary)', maxWidth: 560 }}
          >
            Book your journey and unlock a curated cultural gateway — monuments, food trails,
            folk dances, and native language phrases for every city.
          </p>

          {/* Animated destination preview pill — centered */}
          <div className="flex justify-center mb-4">
            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl"
              style={{
                background: 'var(--theme-card-bg)',
                border: '1px solid var(--theme-border)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <span className="text-xl">{heroDest.emoji}</span>
              <div>
                <div className="font-serif font-black text-sm leading-tight" style={{ color: 'var(--theme-text-primary)' }}>
                  {heroDest.city}
                </div>
                <div className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>{heroDest.tagline}</div>
              </div>
              <div className="flex gap-1.5 ml-1">
                {POPULAR_DEST_PREVIEW.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: i === heroDestIdx ? 18 : 6,
                      height: 6,
                      background: i === heroDestIdx ? 'var(--theme-accent-primary)' : 'var(--theme-border)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats row — centered */}
          <div className="flex flex-wrap justify-center items-center gap-3">
            {HERO_STATS.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl"
                style={{
                  background: 'var(--theme-card-bg)',
                  border: '1px solid var(--theme-border)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}
              >
                <span className="text-base">{stat.icon}</span>
                <div>
                  <div className="font-serif font-black text-sm leading-none" style={{ color: 'var(--theme-text-primary)' }}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thin accent divider below hero */}
      <div style={{ height: 1, background: 'var(--theme-border)', maxWidth: '100%' }} />

      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">

        {/* ── Mode 1: Confirmation Screen ── */}
        {viewMode === 'confirmation' && activeBooking && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'var(--theme-bg-accent)', border: '1px solid var(--theme-border)' }}
              >
                🎟️
              </div>
              <div>
                <h2 className="font-serif font-black text-2xl" style={{ color: 'var(--theme-text-primary)' }}>Booking Confirmed</h2>
                <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>Your journey from {activeBooking.fromCity} → {activeBooking.toCity} is all set</p>
              </div>
            </div>
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
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'var(--theme-bg-accent)', border: '1px solid var(--theme-border)' }}
              >
                🌏
              </div>
              <div>
                <h2 className="font-serif font-black text-2xl" style={{ color: 'var(--theme-text-primary)' }}>
                  Cultural Portal — {normalizeCity(currentDestination)}
                </h2>
                <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>Deep-dive cultural experience unlocked for your destination</p>
              </div>
            </div>
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
          <div className="space-y-10 animate-fade-in-up">

            {/* Search section */}
            <section>
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{
                    color: 'var(--theme-accent-primary)',
                    background: 'var(--theme-bg-accent)',
                    border: '1px solid var(--theme-border)'
                  }}
                >
                  🔍 Plan Your Journey
                </span>
              </div>
              <TravelSearch
                onSearch={handleSearch}
                initialFrom={searchState.fromCity}
                initialTo={searchState.toCity}
                initialDate={searchState.travelDate}
                initialMode={searchState.travelMode}
              />
            </section>

            {/* Visual divider */}
            <div className="stitched-divider" />

            {/* Results Section */}
            <section className="space-y-6">
              {/* Results header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl"
                style={{
                  background: 'var(--theme-card-bg)',
                  border: '1px solid var(--theme-border)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
                }}
              >
                <div className="flex items-center justify-center gap-3 flex-wrap w-full sm:w-auto">
                  <div
                    className="flex items-center gap-3 px-5 py-2 rounded-2xl"
                    style={{
                      background: 'var(--theme-bg-accent)',
                      border: '1px solid var(--theme-border)',
                      color: 'var(--theme-text-primary)'
                    }}
                  >
                    <span style={{ color: 'var(--theme-text-secondary)', fontSize: 14, fontWeight: 500 }}>
                      {searchState.fromCity}
                    </span>
                    <span style={{ color: 'var(--theme-accent-primary)', fontSize: 15 }}>➔</span>
                    <span style={{ color: 'var(--theme-text-primary)', fontSize: 14, fontWeight: 500 }}>{searchState.toCity}</span>
                  </div>
                  <p className="text-xs font-medium" style={{ color: 'var(--theme-text-muted)' }}>
                    {sortedTrips.length} transport options &bull;{' '}
                    {new Date(searchState.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold" style={{ color: 'var(--theme-text-muted)' }}>Sort by:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="px-3 py-2 rounded-xl font-medium focus:outline-none transition-all"
                    style={{
                      border: '1px solid var(--theme-border)',
                      background: 'var(--theme-bg-accent)',
                      color: 'var(--theme-text-primary)'
                    }}
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price_asc">Lowest Price (₹)</option>
                    <option value="duration_asc">Shortest Duration</option>
                  </select>
                </div>
              </div>

              {/* Trip Cards */}
              {sortedTrips.length === 0 ? (
                <div
                  className="text-center py-20 px-6 rounded-3xl"
                  style={{ background: 'var(--theme-card-bg)', border: '1px solid var(--theme-border)' }}
                >
                  <span className="text-5xl block mb-4">🧭</span>
                  <h4 className="font-serif font-bold text-xl mb-2" style={{ color: 'var(--theme-text-primary)' }}>
                    No trips found for this selection
                  </h4>
                  <p className="text-sm max-w-sm mx-auto" style={{ color: 'var(--theme-text-muted)' }}>
                    Try changing travel mode to "All Modes" or select popular hubs like Hyderabad, Bangalore, Mumbai, or Goa.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sortedTrips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} travelers={searchState.travelers} onBook={handleBookClick} />
                  ))}
                </div>
              )}
            </section>

            {/* ── Destination Culture Preview Teaser — light card style ── */}
            <section>
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: 'var(--theme-card-bg)',
                  border: '1px solid var(--theme-border)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}
              >
                {/* Thin colored top strip */}
                <div style={{ height: 4, background: 'linear-gradient(90deg, var(--theme-accent-primary), var(--theme-accent-saffron), var(--theme-accent-jade))' }} />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 md:p-10">
                  <div className="space-y-4 max-w-2xl">
                    {/* Label */}
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block"
                      style={{
                        background: 'var(--theme-bg-accent)',
                        border: '1px solid var(--theme-border)',
                        color: 'var(--theme-accent-primary)'
                      }}
                    >
                      ✨ Destination Sneak Peek
                    </span>

                    <h4
                      className="text-2xl md:text-3xl font-serif font-black"
                      style={{ color: 'var(--theme-text-primary)' }}
                    >
                      Traveling to {searchState.toCity}?
                    </h4>

                    <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                      Booking any ticket unlocks {searchState.toCity}'s curated cultural guide — famous places like{' '}
                      <span style={{ color: 'var(--theme-accent-primary)', fontWeight: 700 }}>
                        {destinationCulture.places?.[0]?.name || 'historic palaces'}
                      </span>,
                      iconic foods like{' '}
                      <span style={{ color: 'var(--theme-accent-primary)', fontWeight: 700 }}>
                        {destinationCulture.foods?.[0]?.name || 'signature dishes'}
                      </span>,
                      native regional phrases, and a custom 2-day itinerary!
                    </p>

                    {/* Culture tag pills — light */}
                    <div className="flex flex-wrap gap-2">
                      {['🏛️ Monuments', '🍛 Food Trails', '💃 Folk Dances', '🗣️ Language Guide', '📅 Itinerary'].map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-3 py-1 rounded-full"
                          style={{
                            background: 'var(--theme-bg-accent)',
                            border: '1px solid var(--theme-border)',
                            color: 'var(--theme-text-secondary)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setViewMode('experience')}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-serif font-bold text-sm tracking-wide flex-shrink-0 self-start md:self-auto active:scale-95 transition-all hover:opacity-90"
                    style={{
                      background: 'var(--theme-btn-bg)',
                      color: 'var(--theme-btn-text)',
                      boxShadow: '0 4px 16px rgba(193,80,46,0.2)'
                    }}
                  >
                    <span>Preview {searchState.toCity} Culture</span>
                    <span>✨</span>
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}
      </div>

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
