import React, { useRef, useState, useEffect } from 'react';

/**
 * DancePreviewVideo - Reusable cultural dance video preview player.
 * Plays automatically with sound (unmuted) when opened, with standard
 * video controls (Play/Pause, Volume, Progress bar, Fullscreen), responsive
 * 16:9 sizing, and rounded corners matching the cream/beige aesthetic.
 */
const DancePreviewVideo = ({ videoUrl, posterUrl, danceName = 'Dance' }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Automatically start playback with audio when videoUrl or dance changes
  useEffect(() => {
    setHasError(false);
    const video = videoRef.current;
    if (!video) return;

    // Ensure audio is enabled
    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // If the browser strictly enforces muted autoplay policy on cold navigation,
          // start muted so video doesn't stall, then offer 1-tap unmute
          video.muted = true;
          video.play()
            .then(() => {
              setIsPlaying(true);
              setIsMuted(true);
            })
            .catch((err) => {
              console.warn('Playback error:', err);
              setIsPlaying(false);
            });
        });
    }
  }, [videoUrl]);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <div
      className="dance-preview-section"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        margin: '2px 0 6px 0'
      }}
    >
      {/* Small "DANCE PREVIEW" Heading */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 6
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, lineHeight: 1 }} aria-hidden="true">🎬</span>
          <h4
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 800,
              color: 'var(--theme-accent-primary, #C1502E)',
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Dance Preview
          </h4>
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--theme-text-muted, #7E736A)',
            backgroundColor: 'var(--theme-bg-accent, #F2EBE1)',
            padding: '2px 8px',
            borderRadius: 10,
            letterSpacing: 0.3
          }}
        >
          {isMuted ? '30s Video • Muted' : '30s Video • Audio On 🔊'}
        </span>
      </div>

      {/* Video Player Frame with Rounded Corners & Warm Border */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#14100E',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1.5px solid var(--theme-border, #E5DFD3)',
          boxShadow: '0 8px 24px rgba(36, 31, 28, 0.08)',
          aspectRatio: '16/9',
          maxHeight: '440px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {videoUrl && !hasError ? (
          <>
            <video
              ref={videoRef}
              key={videoUrl}
              src={videoUrl}
              poster={posterUrl}
              autoPlay
              loop
              playsInline
              preload="auto"
              controls
              controlsList="nodownload"
              onVolumeChange={(e) => setIsMuted(e.target.muted)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onError={() => setHasError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                backgroundColor: '#14100E',
                borderRadius: 14
              }}
            />

            {/* Quick Unmute Button if browser forced mute policy */}
            {isMuted && (
              <button
                type="button"
                onClick={toggleMute}
                aria-label="Unmute audio"
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  backgroundColor: 'rgba(193, 80, 46, 0.95)',
                  color: '#FFFFFF',
                  border: '1.5px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: 20,
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                  zIndex: 3,
                  transition: 'transform 0.15s ease, background-color 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = '#a84122';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'rgba(193, 80, 46, 0.95)';
                }}
              >
                <span>🔊</span> Tap for Audio
              </button>
            )}
          </>
        ) : (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1a1614'
            }}
          >
            {posterUrl && (
              <img
                src={posterUrl}
                alt={danceName}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.6
                }}
              />
            )}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                backgroundColor: 'rgba(20, 16, 14, 0.85)',
                padding: '8px 16px',
                borderRadius: 12,
                color: '#fff',
                fontSize: 12,
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              Preview video currently unavailable
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DancePreviewVideo;
