import { useState } from 'react';
import { POPULAR_CITIES, POPULAR_ROUTES } from '../../data/travelData';

const TravelSearch = ({ onSearch, initialFrom = 'Hyderabad', initialTo = 'Bangalore', initialDate = '', initialMode = 'All' }) => {
  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);
  const [travelDate, setTravelDate] = useState(() => {
    if (initialDate) return initialDate;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [travelers, setTravelers] = useState(1);
  const [travelMode, setTravelMode] = useState(initialMode);
  const [isSearching, setIsSearching] = useState(false);

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleRouteClick = (from, to) => {
    setFromCity(from);
    setToCity(to);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromCity || !toCity) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      onSearch({
        fromCity: fromCity.trim(),
        toCity: toCity.trim(),
        travelDate,
        travelers: Math.max(1, parseInt(travelers, 10) || 1),
        travelMode
      });
    }, 300);
  };

  return (
    <div className="w-full bg-[var(--theme-card-bg)] rounded-3xl border border-[var(--theme-border)] shadow-xl p-6 md:p-8 relative overflow-hidden transition-all duration-300">
      {/* Decorative Warm Accent Header Strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--theme-accent-primary)] via-[var(--theme-accent-saffron)] to-[var(--theme-accent-jade)]"></div>

      {/* Title & Philosophy */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[var(--theme-border)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[var(--theme-bg-accent)] text-[var(--theme-accent-primary)] mb-2">
            <span>✨ Culture Journey Planner</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-black text-[var(--theme-text-primary)]">
            Travel to a Place <span className="text-[var(--theme-accent-primary)]">→</span> Discover Its Culture
          </h2>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-1 font-sans">
            Book your journey and instantly unlock deep-rooted places, authentic food trails, traditions, dances, and local phrases.
          </p>
        </div>

        {/* Travel Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--theme-bg-accent)] rounded-2xl border border-[var(--theme-border)] self-start md:self-auto">
          {[
            { id: 'All', label: 'All Modes', icon: '🧭' },
            { id: 'Flight', label: 'Flight', icon: '✈️' },
            { id: 'Train', label: 'Train', icon: '🚆' },
            { id: 'Bus', label: 'Bus', icon: '🚌' }
          ].map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setTravelMode(mode.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                travelMode === mode.id
                  ? 'bg-[var(--theme-card-bg)] text-[var(--theme-accent-primary)] shadow-sm'
                  : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
              }`}
            >
              <span>{mode.icon}</span>
              <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Search Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* From City */}
          <div className="md:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1.5">
              From City
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg">🛫</span>
              <input
                type="text"
                list="from-cities-list"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                placeholder="e.g. Hyderabad"
                required
                className="w-full pl-11 pr-4 py-3 bg-[var(--theme-input-bg)] border border-[var(--theme-border)] rounded-2xl text-[var(--theme-text-primary)] font-medium text-sm focus:outline-none focus:border-[var(--theme-accent-primary)] focus:ring-1 focus:ring-[var(--theme-accent-primary)] transition-all"
              />
              <datalist id="from-cities-list">
                {POPULAR_CITIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center -my-2 md:my-0">
            <button
              type="button"
              onClick={handleSwap}
              title="Swap From and To Cities"
              className="w-10 h-10 rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg-accent)] hover:bg-[var(--theme-border)] text-[var(--theme-text-primary)] flex items-center justify-center transition-all duration-200 hover:rotate-180 hover:scale-105"
            >
              <svg className="w-5 h-5 text-[var(--theme-accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>

          {/* To City */}
          <div className="md:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1.5">
              To City (Destination)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg">📍</span>
              <input
                type="text"
                list="to-cities-list"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                placeholder="e.g. Bangalore"
                required
                className="w-full pl-11 pr-4 py-3 bg-[var(--theme-input-bg)] border border-[var(--theme-border)] rounded-2xl text-[var(--theme-text-primary)] font-medium text-sm focus:outline-none focus:border-[var(--theme-accent-primary)] focus:ring-1 focus:ring-[var(--theme-accent-primary)] transition-all"
              />
              <datalist id="to-cities-list">
                {POPULAR_CITIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Travel Date */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1.5">
              Travel Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full px-3.5 py-3 bg-[var(--theme-input-bg)] border border-[var(--theme-border)] rounded-2xl text-[var(--theme-text-primary)] font-medium text-sm focus:outline-none focus:border-[var(--theme-accent-primary)] focus:ring-1 focus:ring-[var(--theme-accent-primary)] transition-all"
              />
            </div>
          </div>

          {/* Number of Travelers */}
          <div className="md:col-span-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1.5">
              Travelers
            </label>
            <div className="relative">
              <select
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value, 10))}
                className="w-full px-3 py-3 bg-[var(--theme-input-bg)] border border-[var(--theme-border)] rounded-2xl text-[var(--theme-text-primary)] font-medium text-sm focus:outline-none focus:border-[var(--theme-accent-primary)] transition-all"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Person' : 'People'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={isSearching}
              className="w-full py-3.5 px-6 rounded-2xl font-serif font-bold text-sm tracking-wide text-[var(--theme-btn-text)] bg-[var(--theme-btn-bg)] hover:opacity-95 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <span>Search Trips</span>
                  <span>✨</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Popular Routes Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] mr-1">
            Popular Journeys:
          </span>
          {POPULAR_ROUTES.map((route, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleRouteClick(route.from, route.to)}
              className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--theme-border)] bg-[var(--theme-bg-accent)] hover:border-[var(--theme-accent-primary)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent-primary)] transition-all duration-200"
            >
              {route.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default TravelSearch;
