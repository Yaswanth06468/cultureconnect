import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DestinationDances = ({ dances = [], destinationName = 'Bangalore' }) => {
  const [selectedDance, setSelectedDance] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  // Auto-play when dance is selected
  useEffect(() => {
    if (selectedDance && videoRef.current) {
      setVideoError(false);
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [selectedDance]);

  // Sync mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleOpen = (dance) => {
    setSelectedDance(dance);
    setVideoError(false);
    setIsPlaying(true);
    setIsMuted(false);
  };

  const handleClose = () => {
    if (videoRef.current) videoRef.current.pause();
    setSelectedDance(null);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  if (!dances || dances.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--theme-text-muted)]">
        No dance and art forms documented for {destinationName}.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[var(--theme-border)]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
              Performing Arts &amp; Folklore
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-black text-[var(--theme-text-primary)] mt-2">
              Traditional Dances &amp; Arts of {destinationName}
            </h3>
            <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
              Click any dance card to watch an authentic preview video.
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
              onClick={() => handleOpen(dance)}
              className="flat-card overflow-hidden flex flex-col justify-between group hover:border-[var(--theme-accent-primary)] transition-all duration-300 cursor-pointer"
              style={{ borderRadius: 16, transform: 'translateY(0)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                  {dance.category}
                </span>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div
                    style={{
                      width: 54, height: 54, borderRadius: '50%',
                      background: 'var(--theme-accent-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, color: '#fff',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
                      border: '2px solid rgba(255,255,255,0.3)'
                    }}
                  >
                    ▶
                  </div>
                </div>

                {/* Video available indicator */}
                {dance.videoPath && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white rounded-full px-2 py-1" style={{ fontSize: 10, fontWeight: 700 }}>
                    <span style={{ color: '#ef4444' }}>●</span> VIDEO
                  </div>
                )}

                <h4 className="absolute bottom-3 left-4 right-16 font-serif font-black text-xl text-white">
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

                  <button
                    onClick={(e) => { e.stopPropagation(); handleOpen(dance); }}
                    style={{
                      width: '100%', marginTop: 6,
                      background: 'var(--theme-accent-primary)',
                      color: '#fff', border: 'none', borderRadius: 10,
                      padding: '8px 0', fontSize: 12, fontWeight: 800,
                      cursor: 'pointer', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: 6,
                      transition: 'opacity 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    ▶ Watch Preview Video
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Video Modal ───────────────────────────────────────────────────────── */}
      {selectedDance && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1100,
            backgroundColor: 'rgba(0,0,0,0.82)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20, overflowY: 'auto'
          }}
          onClick={handleClose}
        >
          <div
            style={{
              backgroundColor: 'var(--theme-bg-primary)',
              borderRadius: 22, width: '100%', maxWidth: 760,
              maxHeight: '92vh', overflowY: 'auto',
              boxShadow: '0 32px 100px rgba(0,0,0,0.5)',
              border: '1px solid var(--theme-border)',
              display: 'flex', flexDirection: 'column'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              position: 'sticky', top: 0, zIndex: 10,
              backgroundColor: 'var(--theme-bg-primary)',
              borderBottom: '1px solid var(--theme-border)',
              padding: '14px 20px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <span style={{
                  fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
                  letterSpacing: 1.2, color: 'var(--theme-accent-primary)',
                  background: 'var(--theme-bg-accent)',
                  padding: '3px 10px', borderRadius: 10
                }}>
                  {selectedDance.category}
                </span>
                <h3 style={{
                  margin: '4px 0 0', fontSize: 22, fontWeight: 900,
                  color: 'var(--theme-text-primary)', fontFamily: 'Fraunces, serif'
                }}>
                  {selectedDance.name}
                </h3>
              </div>
              <button
                onClick={handleClose}
                style={{
                  background: 'var(--theme-bg-accent)',
                  border: '1px solid var(--theme-border)',
                  borderRadius: '50%', width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, cursor: 'pointer', color: 'var(--theme-text-primary)',
                  flexShrink: 0
                }}
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div style={{ position: 'relative', width: '100%', backgroundColor: '#000', aspectRatio: '16/9', overflow: 'hidden' }}>
              {(selectedDance.videoUrl || selectedDance.videoPath) && !videoError ? (
                <video
                  ref={videoRef}
                  src={selectedDance.videoUrl || selectedDance.videoPath}
                  poster={selectedDance.imageUrl}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={() => setVideoError(true)}
                  onClick={togglePlay}
                />
              ) : (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src={selectedDance.imageUrl}
                    alt={selectedDance.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80'; }}
                  />
                  <div style={{
                    position: 'absolute', bottom: 12, left: 16,
                    background: 'rgba(0,0,0,0.7)', padding: '6px 14px',
                    borderRadius: 12, color: '#fff', fontSize: 12, fontWeight: 600
                  }}>
                    🏛️ Cultural Visual Showcase
                  </div>
                </div>
              )}

              {/* Video Controls Overlay */}
              {(selectedDance.videoUrl || selectedDance.videoPath) && !videoError && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '16px 20px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  color: '#fff'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {/* Play / Pause */}
                    <button
                      onClick={togglePlay}
                      style={{
                        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255,255,255,0.25)', borderRadius: '50%',
                        width: 38, height: 38, fontSize: 14, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      {isPlaying ? '⏸' : '▶'}
                    </button>

                    {/* Mute / Unmute */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      style={{
                        background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20,
                        padding: '6px 14px', fontSize: 12, fontWeight: 700, color: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      {isMuted ? '🔇 Unmute' : '🔊 Mute'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.9 }}>
                      VIDEO PREVIEW
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Dance Details */}
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Description */}
              <div>
                <h4 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 800, color: 'var(--theme-accent-primary)', textTransform: 'uppercase', letterSpacing: 1 }}>
                  📖 About this Dance
                </h4>
                <p style={{ margin: 0, fontSize: 15, color: 'var(--theme-text-secondary)', lineHeight: 1.7 }}>
                  {selectedDance.description}
                </p>
              </div>

              {/* Instruments & Where to Watch */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
                {selectedDance.instruments && (
                  <div style={{ background: 'var(--theme-bg-secondary)', padding: '16px', borderRadius: 14, border: '1px solid var(--theme-border)' }}>
                    <h4 style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 800, color: 'var(--theme-text-primary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      🎵 Instruments
                    </h4>
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--theme-text-secondary)', lineHeight: 1.6 }}>
                      {selectedDance.instruments}
                    </p>
                  </div>
                )}
                {selectedDance.whereToWatch && (
                  <div style={{ background: 'var(--theme-bg-secondary)', padding: '16px', borderRadius: 14, border: '1px solid var(--theme-border)' }}>
                    <h4 style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 800, color: 'var(--theme-text-primary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      📍 Where to Experience
                    </h4>
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--theme-text-secondary)', lineHeight: 1.6 }}>
                      {selectedDance.whereToWatch}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--theme-border)' }}>
                <Link
                  to="/dances"
                  style={{
                    fontSize: 13, fontWeight: 700, color: 'var(--theme-accent-primary)',
                    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5
                  }}
                >
                  Explore all Indian dances →
                </Link>
                <button
                  onClick={handleClose}
                  style={{
                    background: 'var(--theme-btn-bg)', color: 'var(--theme-btn-text)',
                    border: 'none', borderRadius: 12, padding: '10px 22px',
                    fontWeight: 800, fontSize: 13, cursor: 'pointer'
                  }}
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DestinationDances;
