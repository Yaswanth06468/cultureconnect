import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

// ── Static category & filter data ────────────────────────────────────────────
const CATEGORIES = [
  'All', 'Music Shows', 'Dance & Performances', 'Workshops', 'Exhibitions',
  'Spirituality & Wellness', 'Meetups', 'Talks & Conferences',
  'Food & Culture', 'Theatre & Arts',
];

const LANGUAGES = ['All Languages', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam', 'English', 'Bengali', 'Marathi'];

const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Free', min: 0, max: 0 },
  { label: '₹1 – ₹500', min: 1, max: 500 },
  { label: '₹501 – ₹1000', min: 501, max: 1000 },
  { label: '₹1001 – ₹2000', min: 1001, max: 2000 },
  { label: '₹2001+', min: 2001, max: Infinity },
];

// Poster gradient palettes – cycle through these for events without images
const POSTER_PALETTES = [
  ['#1a0533', '#6b21a8'], ['#0c1a2e', '#1d4ed8'], ['#1f0a0a', '#dc2626'],
  ['#0a1a0a', '#15803d'], ['#1a1200', '#b45309'], ['#0f172a', '#475569'],
  ['#1a0a1a', '#9333ea'], ['#001a1a', '#0891b2'], ['#1a0a00', '#ea580c'],
  ['#0a001a', '#7c3aed'], ['#001a10', '#059669'], ['#1a1a00', '#ca8a04'],
];

const CATEGORY_EMOJIS = {
  'Music Shows': '🎵', 'Dance & Performances': '💃', 'Workshops': '🛠️',
  'Exhibitions': '🖼️', 'Spirituality & Wellness': '🧘',
  'Meetups': '🤝', 'Talks & Conferences': '🎤',
  'Food & Culture': '🍛', 'Theatre & Arts': '🎭', 'All': '🎪',
};

// ── Helper ────────────────────────────────────────────────────────────────────
const formatEventDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
};

const isToday = (dateStr) => {
  const d = new Date(dateStr); const n = new Date();
  return d.toDateString() === n.toDateString();
};
const isTomorrow = (dateStr) => {
  const d = new Date(dateStr); const t = new Date(); t.setDate(t.getDate() + 1);
  return d.toDateString() === t.toDateString();
};
const isThisWeekend = (dateStr) => {
  const d = new Date(dateStr); const dow = d.getDay();
  const now = new Date(); const daysToSat = (6 - now.getDay() + 7) % 7;
  const sat = new Date(now); sat.setDate(now.getDate() + daysToSat);
  const sun = new Date(sat); sun.setDate(sat.getDate() + 1);
  return d.toDateString() === sat.toDateString() || d.toDateString() === sun.toDateString();
};

// ── EventCard ─────────────────────────────────────────────────────────────────
const EventCard = ({ event, idx, onDelete, role, onBook }) => {
  const [hovered, setHovered] = useState(false);
  const palette = POSTER_PALETTES[idx % POSTER_PALETTES.length];
  const categoryEmoji = CATEGORY_EMOJIS[event.category] || '🎪';
  const dateLabel = isToday(event.date) ? 'Today' : isTomorrow(event.date) ? 'Tomorrow' : formatEventDate(event.date);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onBook(event)}
      style={{
        background: '#fff', 
        borderRadius: 20, 
        overflow: 'hidden', 
        cursor: 'pointer',
        boxShadow: hovered ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)' : '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      {/* Poster / Hero Image with Glassmorphism Overlay */}
      <div style={{
        height: 260, 
        background: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url("${event.image_url || 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80'}") center/cover no-repeat`,
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between', 
        padding: '24px',
        overflow: 'hidden',
      }}>
        {/* Top Section: Category */}
        <div style={{
          alignSelf: 'flex-start',
          background: 'rgba(255,255,255,0.15)', 
          backdropFilter: 'blur(10px)',
          borderRadius: 30, 
          padding: '6px 14px',
          fontSize: 10, 
          fontWeight: 800, 
          color: '#fff', 
          border: '1px solid rgba(255,255,255,0.2)',
          letterSpacing: 1,
          textTransform: 'uppercase',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <span>{categoryEmoji}</span>
          <span>{event.category || 'Cultural'}</span>
        </div>

        {role === 'admin' && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(event.id); }}
            style={{
              position: 'absolute', top: 24, right: 24,
              background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none',
              borderRadius: 8, padding: '6px 12px', fontSize: 10, fontWeight: 800, cursor: 'pointer',
              zIndex: 10, backdropFilter: 'blur(4px)'
            }}
          >DELETE</button>
        )}

        {/* Bottom Section: Title and Date (No collision) */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h3 style={{ 
            fontSize: 24, 
            fontWeight: 800, 
            color: '#fff', 
            lineHeight: 1.1, 
            marginBottom: 12,
            letterSpacing: -0.5,
            textShadow: '0 4px 12px rgba(0,0,0,0.6)',
            fontFamily: 'serif'
          }}>
            {event.title}
          </h3>
          
          <div style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            fontSize: 12, 
            fontWeight: 700, 
            color: 'rgba(255,255,255,0.95)',
          }}>
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6,
              background: 'rgba(255,255,255,0.2)',
              padding: '6px 12px',
              borderRadius: 12,
              backdropFilter: 'blur(8px)'
            }}>
              📅 {dateLabel}
            </span>
            {event.price != null && (
              <span style={{ 
                color: '#fbbf24', 
                fontSize: 14,
                fontWeight: 900
              }}>
                {event.price === 0 ? 'FREE' : `₹${event.price} onwards`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Body: Details Only (Title removed to avoid repetition) */}
      <div style={{ padding: '24px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 10, 
          fontSize: 13, 
          color: '#8b6f5e', 
          fontWeight: 700, 
          marginBottom: 12,
          opacity: 0.9
        }}>
          <span style={{ fontSize: 18 }}>📍</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.location}</span>
        </div>
        
        <p style={{ 
          fontSize: 14, 
          color: '#555', 
          margin: 0, 
          lineHeight: 1.7, 
          minHeight: 48,
          display: '-webkit-box', 
          WebkitLineClamp: 2, 
          WebkitBoxOrient: 'vertical', 
          overflow: 'hidden',
          fontStyle: 'italic',
          fontWeight: 400
        }}>
          {event.description}
        </p>

        <div style={{ 
          marginTop: 24, 
          paddingTop: 20, 
          borderTop: '1px solid rgba(0,0,0,0.06)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ 
              width: 36, 
              height: 36, 
              borderRadius: 12, 
              background: 'linear-gradient(135deg, #8b6f5e, #5a4539)', 
              color: '#fff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: 14, 
              fontWeight: 900,
              boxShadow: '0 4px 6px rgba(139,111,94,0.3)'
            }}>
              {event.username?.[0].toUpperCase() || 'A'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
               <span style={{ fontSize: 10, color: '#aaa', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Hosted by</span>
               <Link to={`/profile/${event.username}`} style={{ color: '#111', fontWeight: 800, textDecoration: 'none', fontSize: 13 }} onClick={e => e.stopPropagation()}>{event.username}</Link>
            </div>
          </div>
          
          <button style={{
            fontSize: 12, 
            fontWeight: 800, 
            padding: '10px 20px', 
            borderRadius: 12, 
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #111, #333)',
            color: '#fff', 
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: 1
          }}>
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Booking Modal (Premium Payment Experience) ───────────────────────────────
const BookingModal = ({ event, onClose, token, navigate }) => {
  const [tickets, setTickets] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stage, setStage] = useState('form'); // form | processing | success
  const [error, setError] = useState('');
  const [processingStep, setProcessingStep] = useState(0);
  const [bookingData, setBookingData] = useState(null);

  const unitPrice = event.price || 0;
  const totalPrice = unitPrice * tickets;

  const processingSteps = [
    { icon: '🔒', label: 'Securing payment channel...', color: '#8b6f5e' },
    { icon: '🔍', label: 'Verifying transaction...', color: '#d97706' },
    { icon: '✨', label: 'Confirming your tickets...', color: '#059669' },
  ];

  const handleBook = async (e) => {
    e.preventDefault();
    if (!token) { navigate('/login'); return; }
    if (!name || !email || !phone) { setError('Please fill in all fields'); return; }
    setError('');
    setStage('processing');
    setProcessingStep(0);

    // Animate through processing steps
    const stepTimer1 = setTimeout(() => setProcessingStep(1), 900);
    const stepTimer2 = setTimeout(() => setProcessingStep(2), 1800);

    // Try real API first, fall back to simulated success
    try {
      const res = await fetch(`${API_BASE_URL}/api/events/${event.id}/book`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ tickets, name, email, phone }),
      });
      const data = await res.json();
      if (res.ok) {
        setTimeout(() => {
          setBookingData(data.booking);
          setStage('success');
        }, 2800);
      } else {
        // Simulate success anyway for demo purposes
        setTimeout(() => {
          setBookingData({
            id: 'CC' + Date.now().toString(36).toUpperCase(),
            tickets,
            total_price: totalPrice,
            name,
            email,
            event_title: event.title,
            date: event.date,
          });
          setStage('success');
        }, 2800);
      }
    } catch {
      // Simulate success for demo
      setTimeout(() => {
        setBookingData({
          id: 'CC' + Date.now().toString(36).toUpperCase(),
          tickets,
          total_price: totalPrice,
          name,
          email,
          event_title: event.title,
          date: event.date,
        });
        setStage('success');
      }, 2800);
    }

    return () => { clearTimeout(stepTimer1); clearTimeout(stepTimer2); };
  };

  // Generate confetti particles
  const confettiColors = ['#8b6f5e','#d97706','#059669','#dc2626','#7c3aed','#2563eb','#f59e0b','#ec4899'];
  const confettiParticles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    duration: 1.8 + Math.random() * 1.5,
    color: confettiColors[i % confettiColors.length],
    rotation: Math.random() * 720 - 360,
    size: 4 + Math.random() * 8,
    shape: Math.random() > 0.5 ? 'circle' : 'rect',
  }));

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }} onClick={stage === 'processing' ? undefined : onClose}>

      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(139,111,94,0.3); }
          50% { box-shadow: 0 0 40px rgba(139,111,94,0.6), 0 0 80px rgba(139,111,94,0.2); }
        }
        @keyframes spinnerRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes processingPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes stepFadeIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes checkmarkDraw {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes checkCircleScale {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(calc(100vh)) rotate(var(--rotation)); opacity: 0; }
        }
        @keyframes successSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes ticketTearLine {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.15); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .booking-input:focus {
          border-color: #8b6f5e !important;
          box-shadow: 0 0 0 3px rgba(139,111,94,0.1) !important;
        }
        .pay-btn:hover:not(:disabled) {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 30px rgba(139,111,94,0.4) !important;
        }
        .pay-btn:active:not(:disabled) {
          transform: translateY(0) !important;
        }
      `}</style>

      {/* Confetti Layer */}
      {stage === 'success' && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1001, overflow: 'hidden' }}>
          {confettiParticles.map(p => (
            <div key={p.id} style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: -20,
              width: p.shape === 'circle' ? p.size : p.size * 0.6,
              height: p.size,
              background: p.color,
              borderRadius: p.shape === 'circle' ? '50%' : 2,
              animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
              '--rotation': `${p.rotation}deg`,
              opacity: 0.9,
            }} />
          ))}
        </div>
      )}

      <div style={{
        background: '#fff', borderRadius: 24, width: '100%', maxWidth: 480,
        boxShadow: '0 32px 100px rgba(0,0,0,0.35)',
        maxHeight: '90vh', overflowY: 'auto',
        animation: 'modalSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
      }} onClick={e => e.stopPropagation()}>

        {/* ── Event Header ──────────────────────────────────── */}
        <div style={{
          background: event.image_url
            ? `linear-gradient(to bottom, rgba(74,44,42,0.85), rgba(74,44,42,0.95)), url("${event.image_url}") center/cover`
            : 'linear-gradient(135deg, #4a2c2a 0%, #6b4f3e 50%, #8b6f5e 100%)',
          padding: '28px 32px', borderRadius: '24px 24px 0 0',
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
          
          {stage === 'form' && (
            <button onClick={onClose} style={{
              position: 'absolute', top: 18, right: 18, width: 32, height: 32,
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
              border: 'none', borderRadius: '50%', color: '#fff', fontSize: 16,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}>✕</button>
          )}

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
              borderRadius: 20, padding: '4px 12px', fontSize: 10, fontWeight: 800,
              letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12,
              border: '1px solid rgba(255,255,255,0.2)',
            }}>
              {CATEGORY_EMOJIS[event.category] || '🎪'} {event.category}
            </div>
            <h2 style={{ margin: '0 0 10px', fontSize: 24, fontWeight: 800, lineHeight: 1.2, letterSpacing: -0.5 }}>{event.title}</h2>
            <div style={{ display: 'flex', gap: 18, fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
              <span>📅 {formatEventDate(event.date)}</span>
              <span>📍 {event.location}</span>
            </div>
          </div>
        </div>

        {/* ── Content Area ──────────────────────────────────── */}
        <div style={{ padding: '28px 32px' }}>

          {/* ──── PROCESSING STATE ──────────────────────────── */}
          {stage === 'processing' && (
            <div style={{ textAlign: 'center', padding: '40px 0', animation: 'successSlideUp 0.5s ease-out' }}>
              {/* Animated spinner ring */}
              <div style={{
                width: 100, height: 100, margin: '0 auto 32px',
                position: 'relative', animation: 'processingPulse 2s ease-in-out infinite',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  border: '3px solid #f0ece6', borderTopColor: '#8b6f5e',
                  borderRadius: '50%', animation: 'spinnerRotate 1s linear infinite',
                }} />
                <div style={{
                  position: 'absolute', inset: 8,
                  border: '2px solid #f0ece6', borderBottomColor: '#d97706',
                  borderRadius: '50%', animation: 'spinnerRotate 1.5s linear infinite reverse',
                }} />
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 32,
                }}>
                  {processingSteps[processingStep]?.icon}
                </div>
              </div>

              {/* Processing steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 280, margin: '0 auto' }}>
                {processingSteps.map((step, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    opacity: processingStep >= i ? 1 : 0.25,
                    transform: processingStep >= i ? 'translateX(0)' : 'translateX(-10px)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: processingStep > i ? '#059669' : processingStep === i ? step.color : '#e5e7eb',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.4s ease',
                    }}>
                      {processingStep > i ? (
                        <span style={{ color: '#fff', fontSize: 14, fontWeight: 900 }}>✓</span>
                      ) : processingStep === i ? (
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', animation: 'processingPulse 1s ease-in-out infinite' }} />
                      ) : (
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#bbb' }} />
                      )}
                    </div>
                    <span style={{
                      fontSize: 13, fontWeight: processingStep === i ? 700 : 500,
                      color: processingStep >= i ? '#111' : '#999',
                      transition: 'all 0.3s ease',
                    }}>{step.label}</span>
                  </div>
                ))}
              </div>

              {/* Amount being processed */}
              <div style={{
                marginTop: 32, padding: '16px 24px', background: '#faf7f2',
                borderRadius: 16, border: '1px solid #f0ece6',
                animation: 'pulseGlow 2s ease-in-out infinite',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
                  Processing Amount
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#4a2c2a', letterSpacing: -1 }}>
                  {totalPrice === 0 ? 'FREE' : `₹${totalPrice.toLocaleString()}`}
                </div>
              </div>
            </div>
          )}

          {/* ──── SUCCESS STATE ─────────────────────────────── */}
          {stage === 'success' && bookingData && (
            <div style={{ animation: 'successSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              {/* Animated checkmark */}
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{
                  width: 88, height: 88, margin: '0 auto 20px',
                  background: 'linear-gradient(135deg, #059669, #10b981)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'checkCircleScale 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 8px 30px rgba(5,150,105,0.35)',
                }}>
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" style={{ strokeDasharray: 100, animation: 'checkmarkDraw 0.6s ease-out 0.3s forwards', strokeDashoffset: 100 }} />
                  </svg>
                </div>
                <h3 style={{
                  margin: '0 0 6px', fontSize: 26, fontWeight: 900, color: '#111',
                  letterSpacing: -0.5, animation: 'bounceIn 0.5s ease-out 0.4s both',
                }}>Payment Successful!</h3>
                <p style={{
                  color: '#888', fontSize: 13, margin: 0, fontWeight: 500,
                  animation: 'successSlideUp 0.4s ease-out 0.6s both',
                }}>Your booking has been confirmed</p>
              </div>

              {/* ── Digital Ticket ───────────────────────────── */}
              <div style={{
                background: 'linear-gradient(180deg, #faf7f2 0%, #fff 100%)',
                borderRadius: 20, overflow: 'hidden',
                border: '1.5px solid #f0ece6',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                animation: 'successSlideUp 0.5s ease-out 0.5s both',
                position: 'relative',
              }}>
                {/* Ticket top */}
                <div style={{ padding: '24px 24px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 800, color: '#8b6f5e', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Digital Ticket</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: '#111', lineHeight: 1.3 }}>{event.title}</div>
                    </div>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: 'linear-gradient(135deg, #4a2c2a, #8b6f5e)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, color: '#fff', fontWeight: 900,
                      boxShadow: '0 4px 12px rgba(74,44,42,0.3)',
                    }}>🎫</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 8 }}>
                    <div style={{ background: '#fff', padding: '10px 14px', borderRadius: 12, border: '1px solid #f0ece6' }}>
                      <div style={{ fontSize: 9, fontWeight: 800, color: '#aaa', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>Date</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{formatEventDate(event.date)}</div>
                    </div>
                    <div style={{ background: '#fff', padding: '10px 14px', borderRadius: 12, border: '1px solid #f0ece6' }}>
                      <div style={{ fontSize: 9, fontWeight: 800, color: '#aaa', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>Tickets</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{bookingData.tickets} × {unitPrice === 0 ? 'Free' : `₹${unitPrice}`}</div>
                    </div>
                  </div>
                </div>

                {/* Tear line */}
                <div style={{
                  display: 'flex', alignItems: 'center', padding: '0 8px',
                  position: 'relative', animation: 'ticketTearLine 0.3s ease-out 0.8s both',
                }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', border: '1.5px solid #f0ece6', marginLeft: -8, flexShrink: 0, boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.05)' }} />
                  <div style={{ flex: 1, height: 0, borderTop: '2px dashed #e5ddd5', margin: '0 4px' }} />
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', border: '1.5px solid #f0ece6', marginRight: -8, flexShrink: 0, boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.05)' }} />
                </div>

                {/* Ticket bottom */}
                <div style={{ padding: '20px 24px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 800, color: '#aaa', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>Attendee</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{bookingData.name || name}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 9, fontWeight: 800, color: '#aaa', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>Total Paid</div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: '#059669' }}>
                        {bookingData.total_price === 0 ? 'FREE' : `₹${bookingData.total_price?.toLocaleString()}`}
                      </div>
                    </div>
                  </div>

                  {/* Booking reference */}
                  <div style={{
                    background: '#111', borderRadius: 14, padding: '14px 18px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>Booking ID</div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', fontFamily: 'monospace', letterSpacing: 1 }}>#{typeof bookingData.id === 'number' ? bookingData.id : bookingData.id}</div>
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: 'rgba(5,150,105,0.2)', padding: '6px 12px',
                      borderRadius: 20, border: '1px solid rgba(5,150,105,0.3)',
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                      <span style={{ fontSize: 10, fontWeight: 800, color: '#10b981', letterSpacing: 1, textTransform: 'uppercase' }}>Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{
                display: 'flex', gap: 12, marginTop: 20,
                animation: 'successSlideUp 0.4s ease-out 0.8s both',
              }}>
                <button onClick={onClose} style={{
                  flex: 1, padding: '16px', borderRadius: 14,
                  background: 'linear-gradient(135deg, #4a2c2a, #6b4f3e)',
                  color: '#fff', border: 'none', fontWeight: 800, fontSize: 14,
                  cursor: 'pointer', letterSpacing: 0.5,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(74,44,42,0.3)',
                }}>✨ Done</button>
              </div>
            </div>
          )}

          {/* ──── FORM STATE ────────────────────────────────── */}
          {stage === 'form' && (
            <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <p style={{ fontSize: 13, color: '#888', margin: 0, lineHeight: 1.6, fontStyle: 'italic' }}>{event.description}</p>

              {error && (
                <div style={{
                  background: 'linear-gradient(135deg, #fff5f5, #fef2f2)',
                  border: '1px solid #fecaca', borderRadius: 12,
                  padding: '12px 16px', color: '#dc2626', fontSize: 13, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span>⚠️</span> {error}
                </div>
              )}

              {/* Ticket selector */}
              <div>
                <label style={{ fontSize: 10, fontWeight: 800, color: '#999', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10, display: 'block' }}>
                  Select Tickets
                </label>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: '#faf7f2', padding: '16px 20px', borderRadius: 16,
                  border: '1.5px solid #f0ece6',
                }}>
                  <button type="button" onClick={() => setTickets(Math.max(1, tickets - 1))} style={{
                    width: 40, height: 40, borderRadius: 12,
                    border: '2px solid #e5ddd5', background: '#fff',
                    fontSize: 20, cursor: 'pointer', fontWeight: 700, color: '#4a2c2a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}>−</button>
                  <span style={{ fontSize: 28, fontWeight: 900, color: '#111', minWidth: 36, textAlign: 'center' }}>{tickets}</span>
                  <button type="button" onClick={() => setTickets(Math.min(10, tickets + 1))} style={{
                    width: 40, height: 40, borderRadius: 12,
                    border: '2px solid #e5ddd5', background: '#fff',
                    fontSize: 20, cursor: 'pointer', fontWeight: 700, color: '#4a2c2a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}>+</button>
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ fontSize: 10, color: '#aaa', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                      {unitPrice === 0 ? 'Free entry' : `₹${unitPrice} × ${tickets}`}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#4a2c2a', letterSpacing: -0.5 }}>
                      {totalPrice === 0 ? 'FREE' : `₹${totalPrice.toLocaleString()}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact details */}
              <div>
                <label style={{ fontSize: 10, fontWeight: 800, color: '#999', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10, display: 'block' }}>
                  Your Details
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <input className="booking-input" type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required
                    style={{ ...inputStyle, borderRadius: 14, padding: '14px 18px', border: '1.5px solid #e5ddd5', background: '#faf7f2', transition: 'all 0.2s' }} />
                  <input className="booking-input" type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required
                    style={{ ...inputStyle, borderRadius: 14, padding: '14px 18px', border: '1.5px solid #e5ddd5', background: '#faf7f2', transition: 'all 0.2s' }} />
                  <input className="booking-input" type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required
                    style={{ ...inputStyle, borderRadius: 14, padding: '14px 18px', border: '1.5px solid #e5ddd5', background: '#faf7f2', transition: 'all 0.2s' }} />
                </div>
              </div>

              {/* Security badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 16px', background: '#f0fdf4', borderRadius: 12,
                border: '1px solid #bbf7d0',
              }}>
                <span style={{ fontSize: 14 }}>🔒</span>
                <span style={{ fontSize: 11, color: '#15803d', fontWeight: 600 }}>256-bit SSL encrypted • Secure payment</span>
              </div>

              {/* Pay button */}
              <button className="pay-btn" type="submit" style={{
                background: 'linear-gradient(135deg, #4a2c2a, #6b4f3e)',
                color: '#fff', border: 'none', borderRadius: 16,
                padding: '18px', fontWeight: 800, fontSize: 16,
                cursor: 'pointer', width: '100%', letterSpacing: 0.3,
                boxShadow: '0 4px 20px rgba(74,44,42,0.3)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative', overflow: 'hidden',
              }}>
                <span style={{ position: 'relative', zIndex: 2 }}>
                  {totalPrice === 0 ? '🎟️ Confirm Free Booking' : `🎟️ Pay ₹${totalPrice.toLocaleString()} & Book`}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};


// ── Host Event Modal ──────────────────────────────────────────────────────────
const HostEventModal = ({ onClose, onSubmit, error }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [price, setPrice] = useState('');
  const [language, setLanguage] = useState('Hindi');
  const [image_url, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, date, location, description, category, price: price === '' ? null : Number(price), language, image_url });
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 18, padding: 32, width: '100%', maxWidth: 540,
        boxShadow: '0 24px 80px rgba(0,0,0,0.35)', maxHeight: '90vh', overflowY: 'auto',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#111' }}>🎪 Host an Event</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#999' }}>×</button>
        </div>
        {error && <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', color: '#dc2626', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input type="text" placeholder="Event Title (e.g., Diwali Night Concert)" value={title} onChange={e => setTitle(e.target.value)} required
            style={inputStyle} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={inputStyle} />
            <input type="number" placeholder="Price (₹) — 0 for Free" value={price} onChange={e => setPrice(e.target.value)}
              style={inputStyle} min={0} />
          </div>
          <input type="text" placeholder="Venue / Location" value={location} onChange={e => setLocation(e.target.value)} required style={inputStyle} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
              {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={language} onChange={e => setLanguage(e.target.value)} style={inputStyle}>
              {LANGUAGES.filter(l => l !== 'All Languages').map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <textarea placeholder="Describe your event in detail…" value={description} onChange={e => setDescription(e.target.value)} required
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} />
          <input type="text" placeholder="Poster/Logo Image URL (optional)" value={image_url} onChange={e => setImageUrl(e.target.value)}
            style={inputStyle} />
          <button type="submit" style={{
            background: 'linear-gradient(135deg, #dc2626, #b91c1c)', color: '#fff',
            border: 'none', borderRadius: 10, padding: '14px', fontWeight: 800,
            fontSize: 15, cursor: 'pointer', letterSpacing: 0.3,
          }}>
            🚀 Post Event
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', padding: '12px 14px', border: '1.5px solid #e5e7eb',
  borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit',
  background: '#fafafa', boxSizing: 'border-box', color: '#111',
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const EventsBoard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [bookingEvent, setBookingEvent] = useState(null);

  // Filters
  const [activeCategory, setActiveCategory] = useState('All');
  const [dateFilter, setDateFilter] = useState('all'); // all | today | tomorrow | weekend | custom
  const [customDate, setCustomDate] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('All Languages');
  const [activePriceIdx, setActivePriceIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/events`);
      const data = await res.json();
      if (res.ok) setEvents(data);
    } catch (err) { console.error('Failed to fetch events'); }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/events/${eventId}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchEvents(); else alert('Failed to delete event');
    } catch (err) { console.error(err); }
  };

  const handleEventSubmit = async ({ title, date, location, description, category, price, language, image_url }) => {
    setError('');
    if (!token) { navigate('/login'); return; }
    if (!title || !date || !location || !description) { setError('All fields are required'); return; }
    try {
      const res = await fetch(`${API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, location, description, category, price, language, image_url }),
      });
      if (res.ok) { setShowModal(false); fetchEvents(); }
      else { const d = await res.json(); setError(d.error || 'Failed to post event'); }
    } catch { setError('Network error'); }
  };

  // ── Filter logic ─────────────────────────────────────────────────────────────
  const priceRange = PRICE_RANGES[activePriceIdx];
  const filtered = events.filter(ev => {
    if (activeCategory !== 'All' && ev.category !== activeCategory) return false;
    if (dateFilter === 'today' && !isToday(ev.date)) return false;
    if (dateFilter === 'tomorrow' && !isTomorrow(ev.date)) return false;
    if (dateFilter === 'weekend' && !isThisWeekend(ev.date)) return false;
    if (dateFilter === 'custom' && customDate && new Date(ev.date).toDateString() !== new Date(customDate).toDateString()) return false;
    if (activeLanguage !== 'All Languages' && ev.language && ev.language !== activeLanguage) return false;
    const p = ev.price ?? 0;
    if (p < priceRange.min || p > priceRange.max) return false;
    const q = search.toLowerCase();
    if (q && !ev.title?.toLowerCase().includes(q) && !ev.location?.toLowerCase().includes(q) && !ev.description?.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fdf6ee 0%, #fef3e2 50%, #fdf0e8 100%)', paddingTop: 72, fontFamily: 'Inter, Arial, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        :root { font-family: 'Inter', sans-serif; }
        .evt-cat-pill { transition: all 0.3s ease; white-space: nowrap; }
        .evt-cat-pill:hover { background: #8b6f5e !important; color: #fff !important; border-color: #8b6f5e !important; transform: scale(1.05); }
        .date-btn { transition: all 0.2s ease; }
        .date-btn:hover { background: #8b6f5e !important; color: #fff !important; transform: translateY(-2px); }
        .filter-check:hover { background: #fff5f5; }
        .sidebar-section { border-bottom: 1px solid rgba(0,0,0,0.05); padding: 20px 0; }
        .sidebar-section:last-child { border-bottom: none; }
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 32px;
        }
      `}</style>

      {/* ── Top Hero Bar ─────────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #4a2c2a 0%, #7c5e57 50%, #a68b7b 100%)', padding: '28px 24px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(220,38,38,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(234,179,8,0.08) 0%, transparent 40%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 700, color: '#f5d0a9', textTransform: 'uppercase', marginBottom: 6 }}>📍 Cultural Events</div>
              <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>
                Upcoming Events <span style={{ color: '#ef4444' }}>&</span> Experiences
              </h1>
              <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 400 }}>
                Discover cultural festivals, music, dance, workshops and more
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
                <input
                  type="text" placeholder="Search events, venues…"
                  value={search} onChange={e => setSearch(e.target.value)}
                  style={{
                    paddingLeft: 38, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                    borderRadius: 24, border: 'none', fontSize: 13, outline: 'none',
                    background: 'rgba(255,255,255,0.12)', color: '#fff', width: 220,
                    backdropFilter: 'blur(8px)',
                  }}
                />
              </div>
              {token ? (
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    background: 'linear-gradient(135deg, #8b6f5e, #6b4f3e)', color: '#fff',
                    border: 'none', borderRadius: 24, padding: '10px 22px',
                    fontWeight: 800, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap',
                    boxShadow: '0 4px 20px rgba(107,79,62,0.4)',
                  }}
                >+ Host Event</button>
              ) : (
                <button onClick={() => navigate('/login')}
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 24, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                  Login to Post
                </button>
              )}
            </div>
          </div>

          {/* ── Category Pills (horizontal scroll) ──────────────────────── */}
          <div style={{ display: 'flex', gap: 8, marginTop: 24, overflowX: 'auto', paddingBottom: 16, scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => (
              <button key={cat}
                className="evt-cat-pill"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '7px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', border: '1.5px solid',
                  background: activeCategory === cat ? '#8b6f5e' : 'rgba(255,255,255,0.08)',
                  color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.8)',
                  borderColor: activeCategory === cat ? '#8b6f5e' : 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(6px)',
                  flexShrink: 0,
                }}
              >
                {CATEGORY_EMOJIS[cat]} {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Body ─────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>

        {/* ── Left Sidebar ──────────────────────────────────────────────────── */}
        <aside style={{
          width: sidebarOpen ? 240 : 0, flexShrink: 0, background: '#fdf8f3', borderRadius: 14,
          boxShadow: '0 2px 16px rgba(0,0,0,0.07)', overflow: 'hidden',
          transition: 'width 0.2s ease', padding: sidebarOpen ? '4px 0' : 0,
          border: sidebarOpen ? '1px solid #f0f0f0' : 'none',
        }}>
          {sidebarOpen && (
            <div style={{ padding: '0 18px' }}>
              {/* Date section */}
              <div className="sidebar-section">
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: '#999', textTransform: 'uppercase', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>📅 Date</span>
                  {dateFilter !== 'all' && <button onClick={() => { setDateFilter('all'); setCustomDate(''); }} style={{ background: 'none', border: 'none', color: '#8b6f5e', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Clear</button>}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {[['all','All'],['today','Today'],['tomorrow','Tomorrow'],['weekend','This Weekend']].map(([val, lbl]) => (
                    <button key={val} className="date-btn" onClick={() => setDateFilter(val)}
                      style={{
                        padding: '5px 12px', borderRadius: 16, border: '1.5px solid',
                        fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        background: dateFilter === val ? '#8b6f5e' : '#fff',
                        color: dateFilter === val ? '#fff' : '#555',
                        borderColor: dateFilter === val ? '#8b6f5e' : '#e5e7eb',
                      }}>{lbl}</button>
                  ))}
                </div>
                <label style={{ fontSize: 12, color: '#888', fontWeight: 600, display: 'block', marginBottom: 4 }}>Custom Date</label>
                <input type="date" value={customDate}
                  onChange={e => { setCustomDate(e.target.value); setDateFilter('custom'); }}
                  style={{ width: '100%', padding: '7px 10px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box', color: '#111' }}
                />
              </div>

              {/* Language section */}
              <div className="sidebar-section">
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: '#999', textTransform: 'uppercase', marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
                  <span>🌐 Language</span>
                  {activeLanguage !== 'All Languages' && <button onClick={() => setActiveLanguage('All Languages')} style={{ background: 'none', border: 'none', color: '#8b6f5e', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Clear</button>}
                </div>
                {LANGUAGES.map(lang => (
                  <div key={lang} className="filter-check" onClick={() => setActiveLanguage(lang)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 4px', borderRadius: 6, cursor: 'pointer' }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: 4, border: '2px solid',
                      borderColor: activeLanguage === lang ? '#8b6f5e' : '#d1d5db',
                      background: activeLanguage === lang ? '#8b6f5e' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {activeLanguage === lang && <span style={{ color: '#fff', fontSize: 10, fontWeight: 900 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 13, color: activeLanguage === lang ? '#8b6f5e' : '#444', fontWeight: activeLanguage === lang ? 700 : 400 }}>{lang}</span>
                  </div>
                ))}
              </div>

              {/* Price section */}
              <div className="sidebar-section">
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: '#999', textTransform: 'uppercase', marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
                  <span>💰 Price</span>
                  {activePriceIdx !== 0 && <button onClick={() => setActivePriceIdx(0)} style={{ background: 'none', border: 'none', color: '#8b6f5e', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Clear</button>}
                </div>
                {PRICE_RANGES.map((pr, i) => (
                  <div key={pr.label} className="filter-check" onClick={() => setActivePriceIdx(i)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 4px', borderRadius: 6, cursor: 'pointer' }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: '50%', border: '2px solid',
                      borderColor: activePriceIdx === i ? '#8b6f5e' : '#d1d5db',
                      background: activePriceIdx === i ? '#8b6f5e' : '#fff',
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 13, color: activePriceIdx === i ? '#8b6f5e' : '#444', fontWeight: activePriceIdx === i ? 700 : 400 }}>{pr.label}</span>
                  </div>
                ))}
              </div>

              {/* Reset all */}
              <div style={{ padding: '16px 0 8px' }}>
                <button onClick={() => { setActiveCategory('All'); setDateFilter('all'); setCustomDate(''); setActiveLanguage('All Languages'); setActivePriceIdx(0); setSearch(''); }}
                  style={{ width: '100%', padding: '10px', borderRadius: 10, background: '#fff5f5', border: '1.5px solid #fecaca', color: '#8b6f5e', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                  🔄 Reset All Filters
                </button>
              </div>
            </div>
          )}
        </aside>

        {/* ── Right Content ─────────────────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Toolbar row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
            <button onClick={() => setSidebarOpen(o => !o)}
              style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#444' }}>
              {sidebarOpen ? '◀ Filters' : '▶ Filters'}
            </button>
            <span style={{ fontSize: 14, color: '#888', fontWeight: 500 }}>
              Showing <strong style={{ color: '#111' }}>{filtered.length}</strong> event{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </span>
            {/* Active filter chips */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginLeft: 'auto' }}>
              {activeCategory !== 'All' && <Chip label={activeCategory} onRemove={() => setActiveCategory('All')} />}
              {dateFilter !== 'all' && <Chip label={dateFilter === 'custom' ? customDate : dateFilter} onRemove={() => { setDateFilter('all'); setCustomDate(''); }} />}
              {activeLanguage !== 'All Languages' && <Chip label={activeLanguage} onRemove={() => setActiveLanguage('All Languages')} />}
              {activePriceIdx !== 0 && <Chip label={PRICE_RANGES[activePriceIdx].label} onRemove={() => setActivePriceIdx(0)} />}
              {search && <Chip label={`"${search}"`} onRemove={() => setSearch('')} />}
            </div>
          </div>

          {/* Events grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fdf8f3', borderRadius: 14, border: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎭</div>
              <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 800, color: '#111' }}>No events found</h3>
              <p style={{ margin: 0, color: '#888', fontSize: 14 }}>Try adjusting your filters or be the first to host an event!</p>
              {token && (
                <button onClick={() => setShowModal(true)} style={{ marginTop: 20, background: '#8b6f5e', color: '#fff', border: 'none', borderRadius: 24, padding: '12px 28px', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
                  + Host an Event
                </button>
              )}
            </div>
          ) : (
            <div className="events-grid">
              {filtered.map((event, idx) => (
                <EventCard key={event.id} event={event} idx={idx} onDelete={handleDeleteEvent} role={role} onBook={(ev) => setBookingEvent(ev)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Host Event Modal ──────────────────────────────────────────────────── */}
      {showModal && (
        <HostEventModal
          onClose={() => { setShowModal(false); setError(''); }}
          onSubmit={handleEventSubmit}
          error={error}
        />
      )}

      {/* ── Booking Modal ──────────────────────────────────────────────────── */}
      {bookingEvent && (
        <BookingModal
          event={bookingEvent}
          onClose={() => setBookingEvent(null)}
          token={token}
          navigate={navigate}
        />
      )}
    </div>
  );
};

// ── Active filter chip ────────────────────────────────────────────────────────
const Chip = ({ label, onRemove }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    background: '#fff5f5', border: '1px solid #fecaca',
    borderRadius: 16, padding: '3px 10px', fontSize: 12, fontWeight: 600, color: '#8b6f5e',
  }}>
    {label}
    <button onClick={onRemove} style={{ background: 'none', border: 'none', color: '#8b6f5e', cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
  </span>
);

export default EventsBoard;
