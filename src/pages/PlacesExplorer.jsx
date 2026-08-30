import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { CITIES_METADATA, PLACES_DATA, CATEGORIES_LIST } from '../data/placesData';

const PlacesExplorer = () => {
  const { city: routeCity } = useParams();
  const navigate = useNavigate();

  // State
  const [selectedCity, setSelectedCity] = useState(routeCity || 'Hyderabad');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [savedPlaces, setSavedPlaces] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('saved_culture_places') || '[]');
    } catch {
      return [];
    }
  });
  const [showOnlySaved, setShowOnlySaved] = useState(false);
  const [recentCities, setRecentCities] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('recent_culture_cities') || '["Hyderabad", "Bengaluru", "Delhi"]');
    } catch {
      return ['Hyderabad', 'Bengaluru', 'Delhi'];
    }
  });

  // Cross-feature connections
  const [cityEvents, setCityEvents] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [loadingCrossData, setLoadingCrossData] = useState(false);

  // Share menu state
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const modalTopRef = useRef(null);

  // Sync route param with state
  useEffect(() => {
    if (routeCity) {
      const match = CITIES_METADATA.find(c => c.city.toLowerCase() === routeCity.toLowerCase());
      if (match) {
        setSelectedCity(match.city);
      }
    }
  }, [routeCity]);

  // Update recent cities when city changes
  useEffect(() => {
    if (selectedCity) {
      setRecentCities(prev => {
        const filtered = prev.filter(c => c.toLowerCase() !== selectedCity.toLowerCase());
        const updated = [selectedCity, ...filtered].slice(0, 6);
        try {
          localStorage.setItem('recent_culture_cities', JSON.stringify(updated));
        } catch { /* ignore */ }
        return updated;
      });
    }
  }, [selectedCity]);

  // Fetch places from backend API with fallback to local curated data
  useEffect(() => {
    let isMounted = true;
    const fetchPlaces = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();
        if (selectedCity && selectedCity !== 'All') queryParams.set('city', selectedCity);
        if (selectedCategory && selectedCategory !== 'All') queryParams.set('category', selectedCategory);
        if (searchQuery.trim()) queryParams.set('search', searchQuery.trim());

        const res = await fetch(`${API_BASE_URL}/api/places?${queryParams.toString()}`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();

        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setPlaces(data);
          } else {
            // Fallback filtering on static dataset
            const fallback = PLACES_DATA.filter(p => {
              const matchesCity = !selectedCity || selectedCity === 'All' || p.city.toLowerCase() === selectedCity.toLowerCase();
              const matchesCat = !selectedCategory || selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
              const q = searchQuery.toLowerCase().trim();
              const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) || (p.tags && p.tags.some(t => t.toLowerCase().includes(q)));
              return matchesCity && matchesCat && matchesSearch;
            });
            setPlaces(fallback);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('Backend places endpoint unreachable, using curated dataset:', err.message);
          // Fallback to local curated dataset
          const fallback = PLACES_DATA.filter(p => {
            const matchesCity = !selectedCity || selectedCity === 'All' || p.city.toLowerCase() === selectedCity.toLowerCase();
            const matchesCat = !selectedCategory || selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) || (p.tags && p.tags.some(t => t.toLowerCase().includes(q)));
            return matchesCity && matchesCat && matchesSearch;
          });
          setPlaces(fallback);
          setLoading(false);
        }
      }
    };

    fetchPlaces();
    return () => { isMounted = false; };
  }, [selectedCity, selectedCategory, searchQuery]);

  // Fetch cross-feature connected data (Events & Cultural Feed) when place/city changes
  useEffect(() => {
    let isMounted = true;
    const fetchCrossData = async () => {
      setLoadingCrossData(true);
      try {
        const [eventsRes, postsRes] = await Promise.allSettled([
          fetch(`${API_BASE_URL}/api/events`),
          fetch(`${API_BASE_URL}/api/posts`)
        ]);

        if (isMounted) {
          if (eventsRes.status === 'fulfilled' && eventsRes.value.ok) {
            const allEvents = await eventsRes.value.json();
            const currentCityStr = selectedCity.toLowerCase();
            const filteredEvents = (Array.isArray(allEvents) ? allEvents : []).filter(e => {
              const loc = (e.location || '').toLowerCase();
              const title = (e.title || '').toLowerCase();
              const desc = (e.description || '').toLowerCase();
              return loc.includes(currentCityStr) || title.includes(currentCityStr) || desc.includes(currentCityStr);
            });
            setCityEvents(filteredEvents.slice(0, 4));
          }

          if (postsRes.status === 'fulfilled' && postsRes.value.ok) {
            const allPosts = await postsRes.value.json();
            const currentCityStr = selectedCity.toLowerCase();
            const filteredPosts = (Array.isArray(allPosts) ? allPosts : []).filter(p => {
              const tag = (p.tag || '').toLowerCase();
              const desc = (p.description || '').toLowerCase();
              return tag.includes(currentCityStr) || desc.includes(currentCityStr);
            });
            setCommunityPosts(filteredPosts.slice(0, 4));
          }
        }
      } catch (err) {
        console.log('Cross data fetch non-critical fallback:', err);
      } finally {
        if (isMounted) setLoadingCrossData(false);
      }
    };

    fetchCrossData();
    return () => { isMounted = false; };
  }, [selectedCity]);

  // Bookmark Toggle
  const toggleBookmark = (placeId, e) => {
    if (e) e.stopPropagation();
    setSavedPlaces(prev => {
      let updated;
      if (prev.includes(placeId)) {
        updated = prev.filter(id => id !== placeId);
      } else {
        updated = [...prev, placeId];
      }
      try {
        localStorage.setItem('saved_culture_places', JSON.stringify(updated));
      } catch { /* ignore */ }
      return updated;
    });
  };

  // Get current city metadata
  const currentCityMeta = useMemo(() => {
    return CITIES_METADATA.find(c => c.city.toLowerCase() === selectedCity.toLowerCase()) || {
      city: selectedCity,
      state: 'India',
      tagline: 'Discover Heritage & Cultural Monuments',
      heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&auto=format&fit=crop&q=80',
      description: `Explore the vibrant history, stunning monuments, and timeless traditions of ${selectedCity}.`,
      historicalSignificance: 'Rich cultural legacy shaped across centuries by regional dynasties and historic traditions.',
      culturalSignificance: 'Vibrant center of regional arts, architecture, festivals, and authentic cuisine.',
      famousFor: ['Historical Monuments', 'Sacred Temples', 'Colonial Heritage', 'Local Arts'],
      bestTimeToVisit: 'October to March'
    };
  }, [selectedCity]);

  // Filtered displayed places
  const displayedPlaces = useMemo(() => {
    if (showOnlySaved) {
      return places.filter(p => savedPlaces.includes(p.id || p._id));
    }
    return places;
  }, [places, showOnlySaved, savedPlaces]);

  // Share handlers
  const handleShare = (platform, place) => {
    const title = `${place.name} — Explore Cultural Heritage in ${place.city} on CultureConnect`;
    const url = window.location.href;
    const text = `🏛️ Discover ${place.name} in ${place.city}: "${place.shortDescription}" on CultureConnect! ${url}`;

    if (platform === 'copy') {
      navigator.clipboard.writeText(`${title}\n${text}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    }
    setShareMenuOpen(false);
  };

  // Open Details Modal
  const openPlaceDetails = (place) => {
    setSelectedPlace(place);
    if (modalTopRef.current) {
      modalTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & SEARCH SECTION
      ───────────────────────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--theme-bg-accent)] text-[var(--theme-accent-primary)] text-xs font-bold uppercase tracking-widest mb-4 border border-[var(--theme-border)]">
          <span>🏛️</span> Heritage & Monuments
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-[var(--theme-text-primary)] mb-4">
          Explore Places & <span className="text-[var(--theme-accent-primary)]">Monuments</span>
        </h1>
        <p className="text-[var(--theme-text-secondary)] text-base md:text-lg leading-relaxed">
          Discover the soul of India’s most iconic cities — dive deep into ancient forts, sacred temples, regal palaces, and living cultural traditions.
        </p>

        {/* Search Bar */}
        <div className="mt-8 relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-[var(--theme-text-muted)] text-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search monuments, forts, temples, categories, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[var(--theme-card-bg)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent-primary)] shadow-sm transition-all text-sm md:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 p-1 rounded-full text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CITY SELECTOR & QUICK CHIPS
      ───────────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--theme-text-muted)]">Select City</span>
            <span className="text-xs text-[var(--theme-text-muted)]">({CITIES_METADATA.length} Major Cities Available)</span>
          </div>
          {savedPlaces.length > 0 && (
            <button
              onClick={() => setShowOnlySaved(!showOnlySaved)}
              className={`text-xs font-bold px-3 py-1 rounded-full transition-all flex items-center gap-1.5 border ${
                showOnlySaved
                  ? 'bg-[var(--theme-accent-primary)] text-white border-[var(--theme-accent-primary)]'
                  : 'bg-[var(--theme-card-bg)] text-[var(--theme-text-primary)] border-[var(--theme-border)] hover:border-[var(--theme-accent-primary)]'
              }`}
            >
              <span>{showOnlySaved ? '❤️ Showing Saved' : '🤍 View Saved Places'}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/10">{savedPlaces.length}</span>
            </button>
          )}
        </div>

        {/* City Pills Scrollable */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar">
          {CITIES_METADATA.map((meta) => {
            const isSelected = selectedCity.toLowerCase() === meta.city.toLowerCase();
            return (
              <button
                key={meta.city}
                onClick={() => {
                  setSelectedCity(meta.city);
                  setShowOnlySaved(false);
                  navigate(`/places/${meta.city.toLowerCase()}`);
                }}
                className={`px-4 py-2 rounded-full font-serif font-bold text-sm whitespace-nowrap transition-all duration-200 border flex items-center gap-2 flex-shrink-0 ${
                  isSelected
                    ? 'bg-[var(--theme-accent-primary)] text-white border-[var(--theme-accent-primary)] shadow-md scale-105'
                    : 'bg-[var(--theme-card-bg)] text-[var(--theme-text-primary)] border-[var(--theme-border)] hover:border-[var(--theme-accent-primary)] hover:bg-[var(--theme-bg-accent)]'
                }`}
              >
                <span>📍</span>
                <span>{meta.city}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. CITY OVERVIEW BANNER
      ───────────────────────────────────────────────────────────── */}
      {!showOnlySaved && (
        <div className="flat-card overflow-hidden mb-12 border border-[var(--theme-border)] bg-[var(--theme-card-bg)] relative">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: City Imagery Banner */}
            <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[280px]">
              <img
                src={currentCityMeta.heroImage}
                alt={currentCityMeta.city}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-saffron)]">
                  {currentCityMeta.state}, India
                </span>
                <h2 className="text-3xl lg:text-4xl font-serif font-black tracking-tight">{currentCityMeta.city}</h2>
                <p className="text-xs italic text-gray-200 mt-1">{currentCityMeta.tagline}</p>
              </div>
            </div>

            {/* Right: City Heritage Overview */}
            <div className="lg:col-span-7 p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[var(--theme-bg-accent)] text-[var(--theme-accent-primary)]">
                      {displayedPlaces.length} Monuments & Places Listed
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[var(--theme-bg-accent)] text-[var(--theme-accent-jade)]">
                      Best Time: {currentCityMeta.bestTimeToVisit}
                    </span>
                  </div>
                </div>

                <p className="text-sm md:text-base text-[var(--theme-text-primary)] leading-relaxed mb-4">
                  {currentCityMeta.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-4 pt-4 border-t border-[var(--theme-border)]">
                  <div>
                    <span className="font-bold text-[var(--theme-text-primary)] uppercase tracking-wider block mb-1">
                      👑 Historical Legacy
                    </span>
                    <p className="text-[var(--theme-text-secondary)] line-clamp-3">
                      {currentCityMeta.historicalSignificance}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-[var(--theme-text-primary)] uppercase tracking-wider block mb-1">
                      🎨 Cultural Identity
                    </span>
                    <p className="text-[var(--theme-text-secondary)] line-clamp-3">
                      {currentCityMeta.culturalSignificance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Famous For Chips */}
              {currentCityMeta.famousFor && (
                <div className="mt-5 pt-3 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-wider">Famous For:</span>
                  {currentCityMeta.famousFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--theme-bg-accent)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. CATEGORY FILTERS & PLACE STATS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES_LIST.map((cat) => {
            const isCatActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  isCatActive
                    ? 'bg-[var(--theme-accent-primary)] text-white border-[var(--theme-accent-primary)] shadow-sm'
                    : 'bg-[var(--theme-card-bg)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:border-[var(--theme-accent-primary)] hover:text-[var(--theme-accent-primary)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Count Label */}
        <div className="text-xs font-bold text-[var(--theme-text-muted)] flex-shrink-0">
          Showing <span className="text-[var(--theme-text-primary)]">{displayedPlaces.length}</span> {displayedPlaces.length === 1 ? 'place' : 'places'} in {selectedCity}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. PLACES CARD GRID
      ───────────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="flat-card h-96 rounded-2xl bg-[var(--theme-card-bg)] border border-[var(--theme-border)] p-4 flex flex-col justify-between">
              <div className="w-full h-48 bg-[var(--theme-bg-accent)] rounded-xl mb-4"></div>
              <div className="h-6 bg-[var(--theme-bg-accent)] rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-[var(--theme-bg-accent)] rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-[var(--theme-bg-accent)] rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      ) : displayedPlaces.length === 0 ? (
        <div className="flat-card p-12 text-center max-w-lg mx-auto bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl">
          <span className="text-5xl mb-4 block">🏛️</span>
          <h3 className="text-2xl font-serif font-bold text-[var(--theme-text-primary)] mb-2">No places found</h3>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-6">
            {showOnlySaved
              ? 'You have not bookmarked any places in this city yet. Click the heart icon on any card to save it!'
              : `We couldn't find any places matching "${searchQuery}" in ${selectedCity}. Try selecting a different category or search term.`}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setShowOnlySaved(false);
            }}
            className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] hover:opacity-90 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPlaces.map((place) => {
            const isSaved = savedPlaces.includes(place.id || place._id);
            const coverImage = (place.images && place.images[0]) || place.bannerImage || 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&auto=format&fit=crop&q=80';

            return (
              <div
                key={place.id || place._id || place.name}
                className="flat-card flex flex-col justify-between overflow-hidden bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl group cursor-pointer"
                onClick={() => openPlaceDetails(place)}
              >
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={coverImage}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-black/70 backdrop-blur-md text-white border border-white/20">
                      {place.category}
                    </span>
                  </div>

                  {/* Bookmark Heart Button */}
                  <button
                    onClick={(e) => toggleBookmark(place.id || place._id, e)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-lg hover:scale-110 active:scale-95 transition-all shadow-md"
                    title={isSaved ? 'Remove from saved' : 'Save place'}
                  >
                    {isSaved ? '❤️' : '🤍'}
                  </button>

                  {/* City pill at bottom */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <span>📍</span> {place.city}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-black tracking-tight text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent-primary)] transition-colors mb-2">
                      {place.name}
                    </h3>
                    <p className="text-xs text-[var(--theme-text-secondary)] line-clamp-3 leading-relaxed mb-4">
                      {place.shortDescription}
                    </p>
                  </div>

                  {/* Address Snippet & Explore Button */}
                  <div className="pt-3 border-t border-[var(--theme-border)] flex items-center justify-between mt-auto">
                    <span className="text-[11px] font-medium text-[var(--theme-text-muted)] truncate max-w-[60%]">
                      {place.address ? place.address.split(',')[0] : place.city}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openPlaceDetails(place);
                      }}
                      className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[var(--theme-bg-accent)] text-[var(--theme-accent-primary)] group-hover:bg-[var(--theme-accent-primary)] group-hover:text-white transition-all flex items-center gap-1"
                    >
                      Explore →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. DETAILED PLACE MODAL / FULL DRAWER
      ───────────────────────────────────────────────────────────── */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 md:p-6 animate-fade-in">
          <div
            className="relative bg-[var(--theme-card-bg)] text-[var(--theme-text-primary)] w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-[var(--theme-border)] shadow-2xl no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div ref={modalTopRef} />

            {/* Top Close Button & Action Bar */}
            <div className="sticky top-0 z-20 bg-[var(--theme-card-bg)]/95 backdrop-blur-md px-6 py-4 border-b border-[var(--theme-border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--theme-bg-accent)] text-[var(--theme-accent-primary)]">
                  {selectedPlace.category}
                </span>
                <span className="text-xs font-bold text-[var(--theme-text-muted)]">
                  📍 {selectedPlace.city}, {selectedPlace.state}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Bookmark Action */}
                <button
                  onClick={(e) => toggleBookmark(selectedPlace.id || selectedPlace._id, e)}
                  className="p-2 rounded-full hover:bg-[var(--theme-bg-accent)] text-base transition-colors"
                  title={savedPlaces.includes(selectedPlace.id || selectedPlace._id) ? 'Saved' : 'Save'}
                >
                  {savedPlaces.includes(selectedPlace.id || selectedPlace._id) ? '❤️' : '🤍'}
                </button>

                {/* Share Menu Toggle */}
                <div className="relative">
                  <button
                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                    className="p-2 rounded-full hover:bg-[var(--theme-bg-accent)] text-sm font-bold flex items-center gap-1 border border-[var(--theme-border)]"
                    title="Share place"
                  >
                    <span>🔗</span> Share
                  </button>

                  {/* Share Dropdown */}
                  {shareMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl shadow-xl p-2 z-30 flex flex-col gap-1 text-xs font-bold">
                      <button
                        onClick={() => handleShare('whatsapp', selectedPlace)}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-[var(--theme-bg-accent)] flex items-center gap-2 text-green-600"
                      >
                        <span>💬</span> WhatsApp
                      </button>
                      <button
                        onClick={() => handleShare('twitter', selectedPlace)}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-[var(--theme-bg-accent)] flex items-center gap-2 text-blue-400"
                      >
                        <span>🐦</span> Twitter / X
                      </button>
                      <button
                        onClick={() => handleShare('facebook', selectedPlace)}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-[var(--theme-bg-accent)] flex items-center gap-2 text-blue-600"
                      >
                        <span>📘</span> Facebook
                      </button>
                      <button
                        onClick={() => handleShare('linkedin', selectedPlace)}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-[var(--theme-bg-accent)] flex items-center gap-2 text-blue-700"
                      >
                        <span>💼</span> LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('copy', selectedPlace)}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-[var(--theme-bg-accent)] flex items-center gap-2 text-[var(--theme-text-primary)]"
                      >
                        <span>📋</span> {copiedLink ? 'Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Close X */}
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="w-8 h-8 rounded-full bg-[var(--theme-bg-accent)] flex items-center justify-center font-bold text-sm hover:bg-[var(--theme-accent-primary)] hover:text-white transition-all"
                  title="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-8">
              
              {/* Header Hero Banner */}
              <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 w-full">
                <img
                  src={(selectedPlace.images && selectedPlace.images[0]) || selectedPlace.bannerImage}
                  alt={selectedPlace.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase font-bold tracking-widest text-[var(--theme-accent-saffron)]">
                    {selectedPlace.city}, {selectedPlace.state}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight">{selectedPlace.name}</h2>
                  {selectedPlace.famousFor && (
                    <p className="text-xs md:text-sm text-gray-200 mt-1 italic">{selectedPlace.famousFor}</p>
                  )}
                </div>
              </div>

              {/* Accuracy Notice Banner */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2.5">
                <span className="text-base">⚠️</span>
                <span>{selectedPlace.verifiedInfoNotice || 'Information may change. Please verify opening hours and entry fees before visiting.'}</span>
              </div>

              {/* 1. ABOUT & INTRODUCTION */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-primary)] mb-2 flex items-center gap-2">
                  <span>📖</span> About
                </h3>
                <p className="text-sm md:text-base text-[var(--theme-text-primary)] leading-relaxed">
                  {selectedPlace.fullDescription || selectedPlace.shortDescription}
                </p>
              </div>

              {/* 2. HISTORY */}
              {selectedPlace.history && (
                <div className="pt-4 border-t border-[var(--theme-border)]">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-primary)] mb-2 flex items-center gap-2">
                    <span>⏳</span> Historical Background
                  </h3>
                  <p className="text-sm md:text-base text-[var(--theme-text-secondary)] leading-relaxed">
                    {selectedPlace.history}
                  </p>
                </div>
              )}

              {/* 3. CULTURAL SIGNIFICANCE */}
              {selectedPlace.culturalSignificance && (
                <div className="pt-4 border-t border-[var(--theme-border)]">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-primary)] mb-2 flex items-center gap-2">
                    <span>🪔</span> Cultural Significance
                  </h3>
                  <p className="text-sm md:text-base text-[var(--theme-text-secondary)] leading-relaxed">
                    {selectedPlace.culturalSignificance}
                  </p>
                </div>
              )}

              {/* 4. ARCHITECTURE */}
              {selectedPlace.architecture && (
                <div className="pt-4 border-t border-[var(--theme-border)]">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-primary)] mb-2 flex items-center gap-2">
                    <span>🏛️</span> Architecture & Design
                  </h3>
                  <p className="text-sm md:text-base text-[var(--theme-text-secondary)] leading-relaxed">
                    {selectedPlace.architecture}
                  </p>
                </div>
              )}

              {/* 5. WHAT TO SEE (Highlights) */}
              {selectedPlace.thingsToSee && selectedPlace.thingsToSee.length > 0 && (
                <div className="pt-4 border-t border-[var(--theme-border)]">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-primary)] mb-3 flex items-center gap-2">
                    <span>👀</span> What You Can See & Experience
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {selectedPlace.thingsToSee.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-[var(--theme-text-secondary)] bg-[var(--theme-bg-accent)] p-3 rounded-xl border border-[var(--theme-border)]">
                        <span className="text-[var(--theme-accent-primary)] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 6. VISITING INFORMATION CARDS */}
              <div className="pt-4 border-t border-[var(--theme-border)]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-primary)] mb-3 flex items-center gap-2">
                  <span>ℹ️</span> Visiting Information
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)]">
                    <span className="text-lg block mb-1">⏰</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] block">Opening Hours</span>
                    <span className="text-xs font-bold text-[var(--theme-text-primary)] mt-1 block">{selectedPlace.openingHours || '9:00 AM – 5:30 PM'}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)]">
                    <span className="text-lg block mb-1">🎟️</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] block">Entry Fee</span>
                    <span className="text-xs font-bold text-[var(--theme-text-primary)] mt-1 block">{selectedPlace.entryFee || 'Free / Nominal'}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)]">
                    <span className="text-lg block mb-1">⏳</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] block">Visit Duration</span>
                    <span className="text-xs font-bold text-[var(--theme-text-primary)] mt-1 block">{selectedPlace.visitDuration || '1 – 2 hours'}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)]">
                    <span className="text-lg block mb-1">🌤️</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] block">Best Time</span>
                    <span className="text-xs font-bold text-[var(--theme-text-primary)] mt-1 block">{selectedPlace.bestTimeToVisit || 'Oct – Mar'}</span>
                  </div>
                </div>
              </div>

              {/* 7. LOCATION & MAP */}
              <div className="pt-4 border-t border-[var(--theme-border)]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-primary)] mb-2 flex items-center gap-2">
                  <span>📍</span> Location & How to Reach
                </h3>
                <p className="text-xs md:text-sm text-[var(--theme-text-primary)] font-medium mb-3">
                  {selectedPlace.address}
                </p>

                {selectedPlace.howToReach && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-4">
                    {selectedPlace.howToReach.air && (
                      <div className="p-3 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)]">
                        <span className="font-bold text-[var(--theme-text-primary)] block mb-1">✈️ By Air</span>
                        <span className="text-[var(--theme-text-secondary)]">{selectedPlace.howToReach.air}</span>
                      </div>
                    )}
                    {selectedPlace.howToReach.train && (
                      <div className="p-3 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)]">
                        <span className="font-bold text-[var(--theme-text-primary)] block mb-1">🚆 By Train</span>
                        <span className="text-[var(--theme-text-secondary)]">{selectedPlace.howToReach.train}</span>
                      </div>
                    )}
                    {selectedPlace.howToReach.local && (
                      <div className="p-3 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)]">
                        <span className="font-bold text-[var(--theme-text-primary)] block mb-1">🛺 Local Transit</span>
                        <span className="text-[var(--theme-text-secondary)]">{selectedPlace.howToReach.local}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* View on Map Link */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedPlace.name} ${selectedPlace.city}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[var(--theme-accent-primary)] text-white hover:opacity-90 transition-all shadow-sm"
                >
                  <span>🗺️</span> View on Google Maps →
                </a>
              </div>

              {/* 8. NEARBY PLACES */}
              {selectedPlace.nearbyPlaces && selectedPlace.nearbyPlaces.length > 0 && (
                <div className="pt-4 border-t border-[var(--theme-border)]">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-primary)] mb-3 flex items-center gap-2">
                    <span>🧭</span> Nearby Attractions in {selectedPlace.city}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlace.nearbyPlaces.map((near, idx) => {
                      const matchNear = places.find(p => p.name.toLowerCase() === near.toLowerCase());
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (matchNear) {
                              setSelectedPlace(matchNear);
                              if (modalTopRef.current) modalTopRef.current.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              setSearchQuery(near);
                              setSelectedPlace(null);
                            }
                          }}
                          className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--theme-bg-accent)] text-[var(--theme-text-primary)] border border-[var(--theme-border)] hover:border-[var(--theme-accent-primary)] hover:text-[var(--theme-accent-primary)] transition-all flex items-center gap-1"
                        >
                          <span>📍</span> {near}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 9. CONNECTED CULTURAL EVENTS */}
              <div className="pt-4 border-t border-[var(--theme-border)]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-primary)] flex items-center gap-2">
                    <span>🎪</span> Cultural Events in {selectedPlace.city}
                  </h3>
                  <Link
                    to="/events"
                    className="text-xs font-bold text-[var(--theme-accent-primary)] hover:underline"
                    onClick={() => setSelectedPlace(null)}
                  >
                    View All Events →
                  </Link>
                </div>

                {loadingCrossData ? (
                  <p className="text-xs text-[var(--theme-text-muted)] animate-pulse">Loading connected events...</p>
                ) : cityEvents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cityEvents.map((evt) => (
                      <div key={evt.id || evt._id || evt.title} className="p-3.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[var(--theme-accent-primary)] uppercase tracking-wider">{evt.category || 'Cultural Event'}</span>
                          <h4 className="font-serif font-bold text-sm text-[var(--theme-text-primary)] mt-0.5">{evt.title}</h4>
                          <p className="text-xs text-[var(--theme-text-secondary)] line-clamp-2 mt-1">{evt.description}</p>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[var(--theme-text-muted)] mt-2 pt-2 border-t border-[var(--theme-border)]/50">
                          <span>📅 {evt.date || 'Upcoming'}</span>
                          <span className="font-bold text-[var(--theme-text-primary)]">{evt.price ? `₹${evt.price}` : 'Free'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[var(--theme-bg-accent)] text-center text-xs text-[var(--theme-text-muted)]">
                    No scheduled events in {selectedPlace.city} right now. Check back soon or <Link to="/events" className="text-[var(--theme-accent-primary)] font-bold underline" onClick={() => setSelectedPlace(null)}>browse other cities</Link>.
                  </div>
                )}
              </div>

              {/* 10. CONNECTED COMMUNITY EXPERIENCES (CULTURAL FEED) */}
              <div className="pt-4 border-t border-[var(--theme-border)]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-primary)] flex items-center gap-2">
                    <span>📸</span> Community Moments in {selectedPlace.city}
                  </h3>
                  <Link
                    to="/feed"
                    className="text-xs font-bold text-[var(--theme-accent-primary)] hover:underline"
                    onClick={() => setSelectedPlace(null)}
                  >
                    Visit Cultural Feed →
                  </Link>
                </div>

                {communityPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {communityPosts.map((p) => (
                      <div key={p.id || p._id} className="p-3.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] flex items-start gap-3">
                        {p.image_url && (
                          <img src={p.image_url} alt="Community" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-[var(--theme-text-muted)]">@{p.username || 'traveler'}</span>
                          <p className="text-xs text-[var(--theme-text-primary)] line-clamp-2 mt-0.5">{p.description}</p>
                          <span className="text-[10px] font-bold text-[var(--theme-accent-primary)] mt-1 block">#{p.tag || selectedPlace.city}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[var(--theme-bg-accent)] text-center text-xs text-[var(--theme-text-muted)]">
                    Be the first to share your moment from {selectedPlace.name}! <Link to="/feed" className="text-[var(--theme-accent-primary)] font-bold underline" onClick={() => setSelectedPlace(null)}>Post on Cultural Feed</Link>.
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-[var(--theme-card-bg)]/95 backdrop-blur-md px-6 py-4 border-t border-[var(--theme-border)] flex items-center justify-between">
              <span className="text-xs text-[var(--theme-text-muted)]">
                CultureConnect Heritage Explorer
              </span>
              <button
                onClick={() => setSelectedPlace(null)}
                className="px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] hover:opacity-90 transition-all"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PlacesExplorer;
