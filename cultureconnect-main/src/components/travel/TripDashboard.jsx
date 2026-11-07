import { useState } from 'react';
import DestinationPlaces from './DestinationPlaces';
import DestinationFood from './DestinationFood';
import DestinationCulture from './DestinationCulture';
import DestinationDances from './DestinationDances';
import DestinationEvents from './DestinationEvents';
import DestinationLanguage from './DestinationLanguage';

const TripDashboard = ({
  cultureData,
  booking,
  destinationName = 'Bangalore',
  originName = 'Hyderabad',
  onViewTicket,
  onOpenMyTrips,
  onPlanNewTrip
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!cultureData) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-bold">No cultural data found for {destinationName}</h3>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'All Highlights', icon: '✨' },
    { id: 'places', label: 'Places', icon: '🏛️', count: cultureData.places?.length },
    { id: 'dances', label: 'Traditional Dances', icon: '🎭', count: cultureData.dancesAndArts?.length },
    { id: 'food', label: 'Local Food', icon: '🍛', count: cultureData.foods?.length },
    { id: 'culture', label: 'Local Culture', icon: '🪔' },
    { id: 'events', label: 'Events', icon: '🎪', count: cultureData.events?.length },
    { id: 'translate', label: 'Translate', icon: '🗣️', count: cultureData.languagePhrases?.length }
  ];

  return (
    <div className="w-full space-y-8 animate-fade-in">
      {/* ── Active Journey Top Badge Strip ── */}
      <div className="p-4 md:p-5 rounded-3xl bg-[var(--theme-card-bg)] border border-[var(--theme-border)] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] flex items-center justify-center text-2xl flex-shrink-0">
            {booking?.trip?.mode === 'Flight' ? '✈️' : booking?.trip?.mode === 'Train' ? '🚆' : '🚌'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-2.5 py-0.5 rounded-full">
                Active Journey
              </span>
              {booking?.bookingId && (
                <span className="text-xs font-mono font-bold text-[var(--theme-text-muted)]">
                  ID: #{booking.bookingId}
                </span>
              )}
            </div>
            <h3 className="font-serif font-black text-lg md:text-xl text-[var(--theme-text-primary)] mt-0.5">
              {originName} <span className="text-[var(--theme-accent-primary)]">→</span> {destinationName}
            </h3>
            <p className="text-xs text-[var(--theme-text-muted)] font-mono">
              {booking?.trip?.operator || 'Confirmed Journey'} • {booking?.travelers || 1} Traveler(s)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {booking && (
            <button
              type="button"
              onClick={onViewTicket}
              className="px-4 py-2 rounded-xl text-xs font-serif font-bold tracking-wide border border-[var(--theme-border)] hover:border-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] text-[var(--theme-text-primary)] transition-all flex items-center gap-1.5"
            >
              <span>🎟️</span>
              <span>View Ticket</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenMyTrips}
            className="px-4 py-2 rounded-xl text-xs font-serif font-bold tracking-wide border border-[var(--theme-border)] hover:border-[var(--theme-accent-primary)] bg-[var(--theme-card-bg)] text-[var(--theme-text-primary)] transition-all flex items-center gap-1.5"
          >
            <span>📋</span>
            <span>My Trips</span>
          </button>

          <button
            type="button"
            onClick={onPlanNewTrip}
            className="px-4 py-2 rounded-xl text-xs font-serif font-bold tracking-wide text-[var(--theme-btn-text)] bg-[var(--theme-btn-bg)] hover:opacity-90 transition-all flex items-center gap-1.5"
          >
            <span>🧭</span>
            <span>Plan Another Trip</span>
          </button>
        </div>
      </div>

      {/* ── Destination Cultural Hero Showcase ── */}
      <div className="relative rounded-3xl overflow-hidden border border-[var(--theme-border)] shadow-xl min-h-[340px] md:min-h-[400px] flex flex-col justify-end p-6 md:p-12 text-white">
        {/* Background Image with Dark Vignette */}
        <img
          src={cultureData.heroImage}
          alt={destinationName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white">
            <span>✨ Cultural Portal Unlocked</span>
            <span>•</span>
            <span>{cultureData.state}</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white">
            {destinationName} Cultural Experience
          </h2>

          <p className="text-base md:text-lg font-serif italic text-amber-200">
            "{cultureData.tagline}"
          </p>

          <p className="text-xs md:text-sm text-stone-200 leading-relaxed font-sans max-w-2xl pt-1">
            {cultureData.introQuote}
          </p>
        </div>
      </div>

      {/* ── Sub-Navigation Tabs ── */}
      <div className="sticky top-20 z-30 py-3 bg-[var(--theme-bg-primary)]/90 backdrop-blur-md border-y border-[var(--theme-border)] transition-colors">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-serif font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--theme-accent-primary)] text-white shadow-md scale-105'
                    : 'bg-[var(--theme-card-bg)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)] hover:border-[var(--theme-accent-primary)] hover:text-[var(--theme-accent-primary)]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/30 text-white' : 'bg-[var(--theme-bg-accent)] text-[var(--theme-text-muted)]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tab Panels Content ── */}
      <div className="transition-opacity duration-300">
        {/* OVERVIEW TAB: Shows Curated Highlights from all modules */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Quick summary grid of 6 sections */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { title: 'Explore Places', icon: '🏛️', desc: `${cultureData.places?.length || 5}+ Monuments`, tab: 'places' },
                { title: 'Traditional Dances', icon: '🎭', desc: `${cultureData.dancesAndArts?.length || 3}+ Art Forms (Videos)`, tab: 'dances' },
                { title: 'Local Food', icon: '🍛', desc: `${cultureData.foods?.length || 6}+ Iconic Dishes`, tab: 'food' },
                { title: 'Local Culture', icon: '🪔', desc: 'Traditions & Customs', tab: 'culture' },
                { title: 'Events', icon: '🎪', desc: `${cultureData.events?.length || 4}+ Live Festivals`, tab: 'events' },
                { title: 'Local Phrases', icon: '🗣️', desc: 'Pronunciation Guide', tab: 'translate' }
              ].map((card, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(card.tab)}
                  className="flat-card p-4 text-left group hover:border-[var(--theme-accent-primary)] transition-all flex flex-col justify-between"
                >
                  <span className="text-2xl mb-2 block">{card.icon}</span>
                  <div>
                    <h5 className="font-serif font-black text-sm text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent-primary)] transition-colors">
                      {card.title}
                    </h5>
                    <p className="text-[11px] text-[var(--theme-text-muted)] mt-0.5 font-medium">
                      {card.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* A. Explore Places */}
            <section id="destination-places-section">
              <DestinationPlaces places={cultureData.places} destinationName={destinationName} />
            </section>

            {/* B. Discover Traditional Dances */}
            <section id="destination-dances-section" className="pt-8 border-t border-[var(--theme-border)]">
              <DestinationDances dances={cultureData.dancesAndArts} destinationName={destinationName} />
            </section>

            {/* C. Explore Local Food */}
            <section id="destination-food-section" className="pt-8 border-t border-[var(--theme-border)]">
              <DestinationFood foods={cultureData.foods} destinationName={destinationName} />
            </section>

            {/* D. Local Culture */}
            <section className="pt-8 border-t border-[var(--theme-border)]">
              <DestinationCulture culture={cultureData.culture} destinationName={destinationName} />
            </section>

            {/* E. Events */}
            <section className="pt-8 border-t border-[var(--theme-border)]">
              <DestinationEvents events={cultureData.events} destinationName={destinationName} />
            </section>

            {/* F. Translate */}
            <section className="pt-8 border-t border-[var(--theme-border)]">
              <DestinationLanguage phrases={cultureData.languagePhrases} destinationName={destinationName} />
            </section>
          </div>
        )}

        {/* INDIVIDUAL TABS */}
        {activeTab === 'places' && (
          <DestinationPlaces places={cultureData.places} destinationName={destinationName} />
        )}

        {activeTab === 'food' && (
          <DestinationFood foods={cultureData.foods} destinationName={destinationName} />
        )}

        {activeTab === 'culture' && (
          <DestinationCulture culture={cultureData.culture} destinationName={destinationName} />
        )}

        {activeTab === 'dances' && (
          <DestinationDances dances={cultureData.dancesAndArts} destinationName={destinationName} />
        )}

        {activeTab === 'events' && (
          <DestinationEvents events={cultureData.events} destinationName={destinationName} />
        )}

        {activeTab === 'translate' && (
          <DestinationLanguage phrases={cultureData.languagePhrases} destinationName={destinationName} />
        )}
      </div>
    </div>
  );
};

export default TripDashboard;
