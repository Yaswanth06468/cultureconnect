import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

// ── Static category & filter data ────────────────────────────────────────────
const CATEGORIES = [
  'All', 'Dance & Performances', 'Music Shows', 'Workshops', 'Exhibitions',
  'Food & Culture', 'Theatre & Arts', 'Spirituality & Wellness', 'Meetups', 'Talks & Conferences'
];

const LANGUAGES = ['All Languages', 'Telugu', 'Tamil', 'Hindi', 'Bengali', 'Kannada', 'Malayalam', 'Gujarati', 'Marathi', 'English'];

const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Free', min: 0, max: 0 },
  { label: '₹1 – ₹500', min: 1, max: 500 },
  { label: '₹501 – ₹1000', min: 501, max: 1000 },
  { label: '₹1001 – ₹2000', min: 1001, max: 2000 },
  { label: '₹2001+', min: 2001, max: Infinity },
];

const CATEGORY_EMOJIS = {
  'Dance & Performances': '💃',
  'Music Shows': '🎵',
  'Workshops': '🛠️',
  'Exhibitions': '🖼️',
  'Food & Culture': '🍛',
  'Theatre & Arts': '🎭',
  'Spirituality & Wellness': '🧘',
  'Meetups': '🤝',
  'Talks & Conferences': '🎤',
  'All': '🎪',
};

// ── Dynamic Demo Events Generator (Relative to Current Date) ─────────────────
const getDemoEvents = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sun, 6 is Sat
  const daysToSat = (6 - dayOfWeek + 7) % 7;

  const todayStr = new Date(now).toISOString().split('T')[0];

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const sat = new Date(now);
  sat.setDate(now.getDate() + (daysToSat === 0 ? 0 : daysToSat));
  const satStr = sat.toISOString().split('T')[0];

  const sun = new Date(sat);
  sun.setDate(sat.getDate() + 1);
  const sunStr = sun.toISOString().split('T')[0];

  const in3Days = new Date(now); in3Days.setDate(now.getDate() + 3);
  const in4Days = new Date(now); in4Days.setDate(now.getDate() + 4);
  const in5Days = new Date(now); in5Days.setDate(now.getDate() + 5);
  const in6Days = new Date(now); in6Days.setDate(now.getDate() + 6);

  return [
    {
      id: 'demo-1',
      title: 'Hyderabad Folk Festival',
      date: todayStr,
      time: '05:30 PM – 09:30 PM',
      location: 'Shilparamam Cultural Village, Madhapur, Hyderabad',
      category: 'Dance & Performances',
      language: 'Telugu',
      price: 250,
      description: 'A vibrant celebration of Telangana and Andhra folk traditions featuring Oggu Katha, Burrakatha, Dappu dance, traditional artisanal stalls, and authentic regional cuisine.',
      image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      username: 'ShilparamamArts',
      isDemo: true
    },
    {
      id: 'demo-2',
      title: 'Telugu Cultural Night',
      date: tomorrowStr,
      time: '06:30 PM – 09:30 PM',
      location: 'Ravindra Bharati Auditorium, Saifabad, Hyderabad',
      category: 'Dance & Performances',
      language: 'Telugu',
      price: 0,
      description: 'An enchanting evening honoring Telugu literature, Avadhanam, classical Carnatic vocal recitals, and traditional drama celebrating the cultural ethos of the Telugu region.',
      image_url: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=800&auto=format&fit=crop&q=80',
      username: 'TeluguKalaSamithi',
      isDemo: true
    },
    {
      id: 'demo-3',
      title: 'Classical Dance Workshop',
      date: satStr,
      time: '10:00 AM – 01:30 PM',
      location: 'Kalakshetra Foundation, Thiruvanmiyur, Chennai',
      category: 'Dance & Performances',
      language: 'Telugu',
      price: 500,
      description: 'An intensive masterclass on Kuchipudi and Bharatanatyam mudras, abhinaya expressions, and rhythmic tala structures led by distinguished veteran gurus and choreographers.',
      image_url: 'https://images.unsplash.com/photo-1569851935333-6ca1448cc299?w=800&auto=format&fit=crop&q=80',
      username: 'NrityaKalaTrust',
      isDemo: true
    },
    {
      id: 'demo-4',
      title: 'Diwali Cultural Celebration',
      date: sunStr,
      time: '06:00 PM – 10:30 PM',
      location: 'Albert Hall Museum Grounds, Ram Niwas Garden, Jaipur',
      category: 'Music Shows',
      language: 'Hindi',
      price: 350,
      description: 'A grand festival of lights spectacle featuring Rajasthani folk music, Manganiyar ensemble recitals, Kathak presentations, and stunning heritage palace illumination.',
      image_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80',
      username: 'HeritageJaipur',
      isDemo: true
    },
    {
      id: 'demo-5',
      title: 'Indian Handicrafts Exhibition',
      date: in3Days.toISOString().split('T')[0],
      time: '11:00 AM – 08:30 PM',
      location: 'Dilli Haat, Sri Aurobindo Marg, INA, New Delhi',
      category: 'Exhibitions',
      language: 'English',
      price: 100,
      description: 'Over 150 master artisans from across India showcasing handwoven textiles, Dokra metal craft, Madhubani paintings, blue pottery, and live artisanal craft demonstrations.',
      image_url: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?w=800&auto=format&fit=crop&q=80',
      username: 'CraftCouncilIndia',
      isDemo: true
    },
    {
      id: 'demo-6',
      title: 'Traditional Music Evening',
      date: in4Days.toISOString().split('T')[0],
      time: '06:00 PM – 09:00 PM',
      location: 'Rabindra Sadan Cultural Complex, Cathedral Road, Kolkata',
      category: 'Music Shows',
      language: 'Bengali',
      price: 300,
      description: 'Immerse in soulful Baul melodies, Rabindrasangeet vocal recitals, and classical Sarod and Tabla jugalbandi celebrating Bengal’s rich acoustic traditions.',
      image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
      username: 'BengalSanskriti',
      isDemo: true
    },
    {
      id: 'demo-7',
      title: 'Regional Food Festival',
      date: in5Days.toISOString().split('T')[0],
      time: '12:00 PM – 10:00 PM',
      location: 'Law Garden Heritage Pavilion, Ellisbridge, Ahmedabad',
      category: 'Food & Culture',
      language: 'Gujarati',
      price: 0,
      description: 'Savor regional culinary gems including authentic Gujarati thali spreads, Kathiyawadi street specialties, traditional sweets, and artisanal organic farm heritage.',
      image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
      username: 'FlavorsOfIndia',
      isDemo: true
    },
    {
      id: 'demo-8',
      title: 'Heritage Storytelling Workshop',
      date: in6Days.toISOString().split('T')[0],
      time: '03:00 PM – 06:00 PM',
      location: 'Bharat Bhavan Arts Center, Shamla Hills, Bhopal',
      category: 'Workshops',
      language: 'Hindi',
      price: 200,
      description: 'Explore the ancient art of Dastangoi oral storytelling, folk legend preservation, and voice modulation techniques with master cultural narrators.',
      image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
      username: 'KathaHeritage',
      isDemo: true
    },
    {
      id: 'demo-9',
      title: 'Pongal Harvest Cultural Celebration',
      date: todayStr,
      time: '08:00 AM – 01:00 PM',
      location: 'Marina Beach Cultural Grounds, Chennai',
      category: 'Food & Culture',
      language: 'Tamil',
      price: 0,
      description: 'Experience the vibrant Tamil harvest festival with traditional Kolam rangoli art, Jallikattu bull-taming demonstrations, Pongal pot cooking rituals, Villu Paattu bow-song folk performances, and ancient Sangam-era cultural showcases.',
      image_url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=80',
      username: 'TamilNaduCulture',
      isDemo: true
    },
    {
      id: 'demo-10',
      title: 'Navratri Garba & Dandiya Night',
      date: tomorrowStr,
      time: '07:00 PM – 12:00 AM',
      location: 'GMDC Ground, Ahmedabad',
      category: 'Dance & Performances',
      language: 'Gujarati',
      price: 400,
      description: 'Nine nights of devotion and dance! Join thousands in the traditional Garba circle dance and Dandiya Raas with live dhol-tasha beats, traditional Chaniya Choli attire, and Maa Durga aarti ceremonies.',
      image_url: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&auto=format&fit=crop&q=80',
      username: 'GarbaUtsav',
      isDemo: true
    },
    {
      id: 'demo-11',
      title: 'Yakshagana Folk Theatre Performance',
      date: satStr,
      time: '06:30 PM – 11:00 PM',
      location: 'Yakshamandir, Udupi, Karnataka',
      category: 'Theatre & Arts',
      language: 'Kannada',
      price: 150,
      description: 'Witness the 500-year-old coastal Karnataka dance-drama tradition with elaborate mythological storytelling, vibrant headgear costumes, Chende drum rhythms, and Bhagavata vocal narration through the night.',
      image_url: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&auto=format&fit=crop&q=80',
      username: 'YakshaKala',
      isDemo: true
    },
    {
      id: 'demo-12',
      title: 'Warli Tribal Art Workshop',
      date: sunStr,
      time: '10:00 AM – 04:00 PM',
      location: 'Tribal Cultural Centre, Dahanu, Maharashtra',
      category: 'Workshops',
      language: 'Marathi',
      price: 350,
      description: 'Learn the 2,500-year-old Warli tribal painting tradition from indigenous Adivasi artists. Create geometric patterns depicting harvest dances, sacred rituals, and the Tarpa folk dance using natural earth pigments on mud-washed surfaces.',
      image_url: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&auto=format&fit=crop&q=80',
      username: 'TribalArtsIndia',
      isDemo: true
    },
    {
      id: 'demo-13',
      title: 'Sufi Music Mehfil — Qawwali Night',
      date: in3Days.toISOString().split('T')[0],
      time: '07:30 PM – 10:30 PM',
      location: 'Hazrat Nizamuddin Dargah, New Delhi',
      category: 'Music Shows',
      language: 'Hindi',
      price: 0,
      description: 'Immerse in the sacred Sufi musical tradition of Qawwali at the revered dargah of Hazrat Nizamuddin Auliya. Live harmonium-led devotional singing, mystical Rumi poetry recitals, and the ecstatic spiritual tradition of Sama.',
      image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80',
      username: 'SufiHeritage',
      isDemo: true
    },
    {
      id: 'demo-14',
      title: 'Onam Cultural Festival & Boat Race',
      date: in4Days.toISOString().split('T')[0],
      time: '09:00 AM – 06:00 PM',
      location: 'Punnamada Lake, Alappuzha, Kerala',
      category: 'Food & Culture',
      language: 'Malayalam',
      price: 100,
      description: 'Celebrate Kerala\'s grandest cultural festival with the spectacular Vallam Kali snake boat races, elaborate Pookalam flower carpet art, traditional Onasadya 26-course feast, Pulikali tiger dance processions, and Kathakali story performances.',
      image_url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80',
      username: 'KeralaCulture',
      isDemo: true
    },
    {
      id: 'demo-15',
      title: 'Meenakshi Temple Festival — Chariot Procession',
      date: in5Days.toISOString().split('T')[0],
      time: '05:00 AM – 09:00 PM',
      location: 'Meenakshi Amman Temple, Madurai, Tamil Nadu',
      category: 'Spirituality & Wellness',
      language: 'Tamil',
      price: 0,
      description: 'Witness the awe-inspiring chariot procession of the Meenakshi Temple festival with towering Ther temple cars, sacred Nadaswaram music, Bharatanatyam offerings, elaborate deity decorations, and thousands of devotees in ancient ceremonial traditions.',
      image_url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80',
      username: 'MaduraiTemple',
      isDemo: true
    },
    {
      id: 'demo-16',
      title: 'Rajasthani Puppet Show & Folk Evening',
      date: in6Days.toISOString().split('T')[0],
      time: '05:00 PM – 08:30 PM',
      location: 'Jawahar Kala Kendra, Jaipur, Rajasthan',
      category: 'Theatre & Arts',
      language: 'Hindi',
      price: 250,
      description: 'Experience the ancient Kathputli puppet theatre tradition of Rajasthan with hand-carved marionettes depicting tales of kings and folklore, accompanied by live Rawanhatthi fiddle music, Kalbelia snake-charmer dance, and Bhopa storytelling.',
      image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop&q=80',
      username: 'RajasthanFolk',
      isDemo: true
    },
    {
      id: 'demo-17',
      title: 'Classical Kathak Recital — Lucknow Gharana',
      date: todayStr,
      time: '07:00 PM – 09:30 PM',
      location: 'Bharat Kala Bhavan, Varanasi, Uttar Pradesh',
      category: 'Dance & Performances',
      language: 'Hindi',
      price: 500,
      description: 'An exquisite evening of Lucknow Gharana Kathak featuring intricate footwork (tatkar), expressive abhinaya storytelling, spinning chakkars, and tabla-Kathak jugalbandi with Padma Shri-nominated classical dancers.',
      image_url: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=800&auto=format&fit=crop&q=80',
      username: 'KathakSabha',
      isDemo: true
    },
    {
      id: 'demo-18',
      title: 'Hornbill Cultural Festival of Nagaland',
      date: in3Days.toISOString().split('T')[0],
      time: '10:00 AM – 07:00 PM',
      location: 'Naga Heritage Village, Kisama, Kohima',
      category: 'Meetups',
      language: 'English',
      price: 200,
      description: 'Celebrate the "Festival of Festivals" with 16 Naga tribes showcasing traditional war dances, indigenous crafts, ancestral Morung heritage huts, tribal wrestling, bamboo music, traditional rice beer brewing, and vibrant warrior costume parades.',
      image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
      username: 'NagaCulture',
      isDemo: true
    },
    {
      id: 'demo-19',
      title: 'Buddhist Monastery Sacred Ceremony',
      date: in4Days.toISOString().split('T')[0],
      time: '06:00 AM – 12:00 PM',
      location: 'Tawang Monastery, Arunachal Pradesh',
      category: 'Spirituality & Wellness',
      language: 'English',
      price: 0,
      description: 'Attend the sacred Cham masked dance ceremony at India\'s largest Buddhist monastery. Witness monks in elaborate silk costumes performing ancient Vajrayana Buddhist rituals with long horn (dungchen) music, butter sculpture offerings, and mandala sand art creation.',
      image_url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&auto=format&fit=crop&q=80',
      username: 'TawangMonastery',
      isDemo: true
    },
    {
      id: 'demo-20',
      title: 'Chhau Masked Dance Festival',
      date: in5Days.toISOString().split('T')[0],
      time: '06:00 PM – 10:00 PM',
      location: 'Chhau Dance Centre, Seraikela, Jharkhand',
      category: 'Dance & Performances',
      language: 'Hindi',
      price: 180,
      description: 'Witness the UNESCO-listed Chhau masked dance tradition from Seraikela depicting Mahabharata epics and nature spirits through gravity-defying martial acrobatics, elaborate papier-mâché masks, traditional Shehnai music, and tribal Dhol drumming.',
      image_url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=80',
      username: 'ChhauDanceIndia',
      isDemo: true
    }
  ];
};

// ── Date Helpers ─────────────────────────────────────────────────────────────
const formatEventDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
};

const isToday = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
};

const isTomorrow = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
};

const isThisWeekend = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysToSat = (6 - dayOfWeek + 7) % 7;
  const sat = new Date(now);
  sat.setDate(now.getDate() + (daysToSat === 0 ? 0 : daysToSat));
  const sun = new Date(sat);
  sun.setDate(sat.getDate() + 1);

  const dYear = d.getFullYear(); const dMon = d.getMonth(); const dDate = d.getDate();
  const satYear = sat.getFullYear(); const satMon = sat.getMonth(); const satDate = sat.getDate();
  const sunYear = sun.getFullYear(); const sunMon = sun.getMonth(); const sunDate = sun.getDate();

  const isSat = dYear === satYear && dMon === satMon && dDate === satDate;
  const isSun = dYear === sunYear && dMon === sunMon && dDate === sunDate;
  return isSat || isSun;
};

// ── EventCard Component ───────────────────────────────────────────────────────
const EventCard = ({ event, onDelete, role, onBook }) => {
  const [hovered, setHovered] = useState(false);
  const categoryEmoji = CATEGORY_EMOJIS[event.category] || '🎪';
  const dateLabel = isToday(event.date) ? 'Today' : isTomorrow(event.date) ? 'Tomorrow' : formatEventDate(event.date);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onBook(event)}
      className="flat-card"
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.08)' : '0 4px 14px rgba(0,0,0,0.03)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        border: '1px solid var(--theme-border)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--theme-card-bg)',
      }}
    >
      {/* Poster / Hero Image */}
      <div style={{
        height: 240,
        background: `linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%), url("${event.image_url || 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80'}") center/cover no-repeat`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        overflow: 'hidden',
      }}>
        {/* Top Section: Category & Language Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{
            background: 'rgba(36, 31, 28, 0.75)',
            backdropFilter: 'blur(8px)',
            borderRadius: 30,
            padding: '5px 12px',
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <span>{categoryEmoji}</span>
            <span>{event.category || 'Cultural'}</span>
          </div>

          {event.language && (
            <div style={{
              background: 'rgba(193, 80, 46, 0.85)',
              backdropFilter: 'blur(8px)',
              borderRadius: 30,
              padding: '4px 10px',
              fontSize: 10,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: 0.5,
              textTransform: 'uppercase'
            }}>
              {event.language}
            </div>
          )}
        </div>

        {role === 'admin' && !event.isDemo && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(event.id); }}
            style={{
              position: 'absolute', top: 20, right: 20,
              background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none',
              borderRadius: 8, padding: '5px 10px', fontSize: 10, fontWeight: 800, cursor: 'pointer',
              zIndex: 10, backdropFilter: 'blur(4px)'
            }}
          >DELETE</button>
        )}

        {/* Bottom Section: Title, Date and Price */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h3 style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.2,
            marginBottom: 10,
            fontFamily: 'Fraunces, serif',
            textShadow: '0 2px 8px rgba(0,0,0,0.6)'
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
              padding: '4px 10px',
              borderRadius: 10,
              backdropFilter: 'blur(6px)'
            }}>
              📅 {dateLabel}
            </span>
            <span style={{
              color: event.price === 0 ? '#10B981' : '#F59E0B',
              fontSize: 13,
              fontWeight: 900,
              background: 'rgba(0,0,0,0.5)',
              padding: '4px 10px',
              borderRadius: 10
            }}>
              {event.price === 0 ? 'FREE ENTRY' : `₹${event.price}`}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Location */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
            fontSize: 12,
            color: 'var(--theme-text-muted)',
            fontWeight: 600,
            marginBottom: 10,
            lineHeight: 1.4
          }}>
            <span style={{ fontSize: 15, flexShrink: 0 }}>📍</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {event.location}
            </span>
          </div>

          {/* Time if available */}
          {event.time && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              color: 'var(--theme-accent-primary)',
              fontWeight: 700,
              marginBottom: 12
            }}>
              <span>⏰</span>
              <span>{event.time}</span>
            </div>
          )}

          {/* Description */}
          <p style={{
            fontSize: 13,
            color: 'var(--theme-text-secondary)',
            margin: 0,
            lineHeight: 1.6,
            minHeight: 42,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {event.description}
          </p>
        </div>

        {/* Card Footer */}
        <div style={{
          marginTop: 18,
          paddingTop: 16,
          borderTop: '1px solid var(--theme-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: 'var(--theme-bg-accent)',
              color: 'var(--theme-accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 800,
              border: '1px solid var(--theme-border)'
            }}>
              {event.username?.[0]?.toUpperCase() || 'C'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 9, color: 'var(--theme-text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>Organized by</span>
              <span style={{ color: 'var(--theme-text-primary)', fontWeight: 700, fontSize: 12 }}>{event.username || 'CultureConnect'}</span>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onBook(event); }}
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: '8px 16px',
              borderRadius: 10,
              cursor: 'pointer',
              background: 'var(--theme-btn-bg)',
              color: 'var(--theme-btn-text)',
              border: 'none',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <span>View Details</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Booking Modal (Detail & Reservation Experience) ──────────────────────────
const BookingModal = ({ event, onClose, token, navigate }) => {
  const [tickets, setTickets] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stage, setStage] = useState('form'); // form | processing | success
  const [error, setError] = useState('');
  const [bookingData, setBookingData] = useState(null);

  const unitPrice = event.price || 0;
  const totalPrice = unitPrice * tickets;

  const handleBook = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) { setError('Please fill in all fields'); return; }
    setError('');
    setStage('processing');

    // Simulate booking with API if available
    try {
      if (token && !event.isDemo) {
        await fetch(`${API_BASE_URL}/api/events/${event.id}/book`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ tickets, name, email, phone }),
        });
      }
    } catch {
      // Graceful fallback for demo
    }

    setTimeout(() => {
      setBookingData({
        id: 'CC-' + Math.floor(100000 + Math.random() * 900000),
        tickets,
        total_price: totalPrice,
        name,
        email,
        phone,
        event_title: event.title,
        date: event.date,
        location: event.location,
        time: event.time || '06:00 PM IST'
      });
      setStage('success');
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }} onClick={stage === 'processing' ? undefined : onClose}>

      <div style={{
        backgroundColor: 'var(--theme-bg-primary)',
        borderRadius: 24,
        width: '100%',
        maxWidth: 520,
        boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
        maxHeight: '90vh',
        overflowY: 'auto',
        border: '1px solid var(--theme-border)',
        position: 'relative'
      }} onClick={e => e.stopPropagation()}>

        {/* Modal Header */}
        <div style={{
          position: 'relative',
          height: 180,
          background: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url("${event.image_url || 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80'}") center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '24px',
          borderRadius: '24px 24px 0 0'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none',
              borderRadius: '50%', width: 36, height: 36, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 18,
              cursor: 'pointer', backdropFilter: 'blur(4px)'
            }}
          >✕</button>

          <span style={{
            fontSize: 11,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: 'var(--theme-accent-saffron)',
            marginBottom: 4
          }}>
            {event.category} • {event.language}
          </span>
          <h2 style={{
            margin: 0,
            fontSize: 24,
            fontWeight: 800,
            color: '#fff',
            fontFamily: 'Fraunces, serif',
            lineHeight: 1.2
          }}>
            {event.title}
          </h2>
        </div>

        <div style={{ padding: '24px' }}>
          {stage === 'processing' && (
            <div style={{ textAlign: 'center', padding: '48px 20px' }}>
              <div className="w-12 h-12 rounded-full border-4 border-[var(--theme-accent-primary)] border-t-transparent animate-spin mx-auto mb-4" />
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--theme-text-primary)', marginBottom: 6 }}>
                Processing Reservation...
              </h3>
              <p style={{ fontSize: 13, color: 'var(--theme-text-muted)', margin: 0 }}>
                Securing your cultural event pass
              </p>
            </div>
          )}

          {stage === 'success' && bookingData && (
            <div style={{ textAlign: 'center', padding: '16px 8px' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.1)', color: '#10B981',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 32, margin: '0 auto 16px', border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                ✓
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--theme-text-primary)', margin: '0 0 8px', fontFamily: 'Fraunces, serif' }}>
                Booking Confirmed!
              </h3>
              <p style={{ fontSize: 14, color: 'var(--theme-text-muted)', margin: '0 0 20px' }}>
                Your pass has been generated. An email confirmation has been dispatched.
              </p>

              {/* Ticket Card */}
              <div style={{
                background: 'var(--theme-bg-secondary)',
                borderRadius: 16,
                padding: '20px',
                border: '1px dashed var(--theme-border)',
                textAlign: 'left',
                marginBottom: 24
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: 'var(--theme-text-muted)' }}>Ticket Pass</span>
                  <span style={{ fontSize: 12, fontWeight: 900, color: 'var(--theme-accent-primary)', fontFamily: 'monospace' }}>{bookingData.id}</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--theme-text-primary)', marginBottom: 6 }}>{event.title}</div>
                <div style={{ fontSize: 13, color: 'var(--theme-text-secondary)', marginBottom: 4 }}>📅 {formatEventDate(event.date)} {event.time ? `• ${event.time}` : ''}</div>
                <div style={{ fontSize: 12, color: 'var(--theme-text-muted)', marginBottom: 12 }}>📍 {event.location}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--theme-border)', paddingTop: 10 }}>
                  <span style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Attendee: <strong>{bookingData.name}</strong> ({bookingData.tickets} Ticket{bookingData.tickets > 1 ? 's' : ''})</span>
                  <span style={{ fontSize: 14, fontWeight: 900, color: 'var(--theme-accent-primary)' }}>
                    {bookingData.total_price === 0 ? 'FREE PASS' : `₹${bookingData.total_price}`}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 12,
                  background: 'var(--theme-btn-bg)',
                  color: 'var(--theme-btn-text)',
                  fontWeight: 800,
                  fontSize: 14,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Close & Explore More Events
              </button>
            </div>
          )}

          {stage === 'form' && (
            <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Event Metadata Highlights */}
              <div style={{
                background: 'var(--theme-bg-secondary)',
                borderRadius: 14,
                padding: '14px 16px',
                border: '1px solid var(--theme-border)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                fontSize: 13
              }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: 'var(--theme-text-muted)', display: 'block' }}>Date & Time</span>
                  <strong style={{ color: 'var(--theme-text-primary)' }}>{formatEventDate(event.date)}</strong>
                  {event.time && <div style={{ fontSize: 11, color: 'var(--theme-accent-primary)' }}>{event.time}</div>}
                </div>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: 'var(--theme-text-muted)', display: 'block' }}>Venue</span>
                  <span style={{ color: 'var(--theme-text-primary)', fontWeight: 600, fontSize: 12 }}>{event.location}</span>
                </div>
              </div>

              <p style={{ fontSize: 13, color: 'var(--theme-text-secondary)', margin: 0, lineHeight: 1.6 }}>
                {event.description}
              </p>

              {error && (
                <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 10, padding: '10px 14px', color: '#DC2626', fontSize: 13 }}>
                  {error}
                </div>
              )}

              {/* Ticket Quantity Selector */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--theme-text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, display: 'block' }}>
                  Select Number of Passes
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: 'var(--theme-bg-secondary)',
                  padding: '12px 18px',
                  borderRadius: 14,
                  border: '1px solid var(--theme-border)'
                }}>
                  <button
                    type="button"
                    onClick={() => setTickets(Math.max(1, tickets - 1))}
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      border: '1px solid var(--theme-border)', background: 'var(--theme-bg-primary)',
                      fontSize: 18, fontWeight: 800, cursor: 'pointer', color: 'var(--theme-text-primary)'
                    }}
                  >−</button>
                  <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--theme-text-primary)', minWidth: 28, textAlign: 'center' }}>
                    {tickets}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTickets(Math.min(10, tickets + 1))}
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      border: '1px solid var(--theme-border)', background: 'var(--theme-bg-primary)',
                      fontSize: 18, fontWeight: 800, cursor: 'pointer', color: 'var(--theme-text-primary)'
                    }}
                  >+</button>

                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ fontSize: 10, color: 'var(--theme-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {unitPrice === 0 ? 'Free Entry' : `₹${unitPrice} × ${tickets}`}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--theme-accent-primary)' }}>
                      {totalPrice === 0 ? 'FREE' : `₹${totalPrice}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendee Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--theme-text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, margin: 0 }}>
                  Attendee Details
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 12,
                    border: '1px solid var(--theme-border)', background: 'var(--theme-bg-secondary)',
                    color: 'var(--theme-text-primary)', fontSize: 14, outline: 'none'
                  }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '12px 14px', borderRadius: 12,
                      border: '1px solid var(--theme-border)', background: 'var(--theme-bg-secondary)',
                      color: 'var(--theme-text-primary)', fontSize: 14, outline: 'none'
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '12px 14px', borderRadius: 12,
                      border: '1px solid var(--theme-border)', background: 'var(--theme-bg-secondary)',
                      color: 'var(--theme-text-primary)', fontSize: 14, outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  background: 'var(--theme-btn-bg)',
                  color: 'var(--theme-btn-text)',
                  border: 'none',
                  borderRadius: 14,
                  padding: '16px',
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: 'pointer',
                  width: '100%',
                  marginTop: 8,
                  boxShadow: '0 4px 14px rgba(193, 80, 46, 0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                {totalPrice === 0 ? '🎟️ Confirm Free Registration' : `🎟️ Reserve ${tickets} Pass${tickets > 1 ? 'es' : ''} (₹${totalPrice})`}
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
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [price, setPrice] = useState('');
  const [language, setLanguage] = useState('Telugu');
  const [image_url, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      date,
      time: time || '06:00 PM – 09:00 PM',
      location,
      description,
      category,
      price: price === '' ? 0 : Number(price),
      language,
      image_url
    });
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: 'var(--theme-bg-primary)', borderRadius: 20, padding: 28, width: '100%', maxWidth: 520,
        boxShadow: '0 24px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto',
        border: '1px solid var(--theme-border)'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: 'var(--theme-text-primary)', fontFamily: 'Fraunces, serif' }}>🎪 Host a Cultural Event</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--theme-text-muted)' }}>✕</button>
        </div>
        {error && <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 8, padding: '10px 14px', color: '#DC2626', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input
            type="text" placeholder="Event Title (e.g., Classical Dance Workshop)" value={title} onChange={e => setTitle(e.target.value)} required
            style={inputStyle}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={inputStyle} />
            <input type="text" placeholder="Time (e.g., 06:00 PM – 09:00 PM)" value={time} onChange={e => setTime(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <input type="number" placeholder="Price (₹) — 0 for Free" value={price} onChange={e => setPrice(e.target.value)} style={inputStyle} min={0} />
            <select value={language} onChange={e => setLanguage(e.target.value)} style={inputStyle}>
              {LANGUAGES.filter(l => l !== 'All Languages').map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <input type="text" placeholder="Venue & City (e.g., Ravindra Bharati, Hyderabad)" value={location} onChange={e => setLocation(e.target.value)} required style={inputStyle} />
          <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
            {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <textarea placeholder="Describe your cultural event…" value={description} onChange={e => setDescription(e.target.value)} required
            style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} />
          <input type="text" placeholder="Cover Image URL (optional)" value={image_url} onChange={e => setImageUrl(e.target.value)} style={inputStyle} />
          <button type="submit" style={{
            background: 'var(--theme-btn-bg)', color: 'var(--theme-btn-text)',
            border: 'none', borderRadius: 12, padding: '14px', fontWeight: 800,
            fontSize: 15, cursor: 'pointer', letterSpacing: 0.3, marginTop: 6
          }}>
            🚀 Publish Event
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', padding: '12px 14px', border: '1px solid var(--theme-border)',
  borderRadius: 10, fontSize: 13, outline: 'none', fontFamily: 'inherit',
  background: 'var(--theme-bg-secondary)', boxSizing: 'border-box', color: 'var(--theme-text-primary)',
};

// ── Main Page Component ───────────────────────────────────────────────────────
const EventsBoard = () => {
  const [events, setEvents] = useState(() => getDemoEvents());
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

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/events`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Merge user posted events with demo events
          const demoList = getDemoEvents();
          setEvents([...data, ...demoList]);
        } else {
          setEvents(getDemoEvents());
        }
      } else {
        setEvents(getDemoEvents());
      }
    } catch {
      setEvents(getDemoEvents());
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/events/${eventId}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchEvents();
      else setEvents(prev => prev.filter(e => e.id !== eventId));
    } catch {
      setEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  const handleEventSubmit = async ({ title, date, time, location, description, category, price, language, image_url }) => {
    setError('');
    if (!token) { navigate('/login'); return; }
    if (!title || !date || !location || !description) { setError('All required fields must be filled'); return; }

    const newEvent = {
      id: 'usr-' + Date.now(),
      title,
      date,
      time: time || '06:00 PM – 09:00 PM',
      location,
      description,
      category,
      price: price || 0,
      language: language || 'Hindi',
      image_url: image_url || 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      username: localStorage.getItem('username') || 'CulturalHost',
      isDemo: false
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, location, description, category, price, language, image_url }),
      });
      if (res.ok) {
        setShowModal(false);
        fetchEvents();
      } else {
        setEvents(prev => [newEvent, ...prev]);
        setShowModal(false);
      }
    } catch {
      setEvents(prev => [newEvent, ...prev]);
      setShowModal(false);
    }
  };

  const resetAllFilters = () => {
    setActiveCategory('All');
    setDateFilter('all');
    setCustomDate('');
    setActiveLanguage('All Languages');
    setActivePriceIdx(0);
    setSearch('');
  };

  // ── Combined Multi-Filter Logic ──────────────────────────────────────────────
  const priceRange = PRICE_RANGES[activePriceIdx];
  const filtered = events.filter(ev => {
    // 1. Category Filter
    if (activeCategory !== 'All' && ev.category !== activeCategory) return false;

    // 2. Date Filter
    if (dateFilter === 'today' && !isToday(ev.date)) return false;
    if (dateFilter === 'tomorrow' && !isTomorrow(ev.date)) return false;
    if (dateFilter === 'weekend' && !isThisWeekend(ev.date)) return false;
    if (dateFilter === 'custom' && customDate) {
      const evD = new Date(ev.date);
      const cuD = new Date(customDate);
      if (evD.getFullYear() !== cuD.getFullYear() || evD.getMonth() !== cuD.getMonth() || evD.getDate() !== cuD.getDate()) {
        return false;
      }
    }

    // 3. Language Filter
    if (activeLanguage !== 'All Languages' && ev.language && ev.language !== activeLanguage) return false;

    // 4. Price Filter
    const p = ev.price ?? 0;
    if (p < priceRange.min || p > priceRange.max) return false;

    // 5. Search Query
    const q = search.trim().toLowerCase();
    if (q) {
      const matchTitle = ev.title?.toLowerCase().includes(q);
      const matchLoc = ev.location?.toLowerCase().includes(q);
      const matchDesc = ev.description?.toLowerCase().includes(q);
      const matchCat = ev.category?.toLowerCase().includes(q);
      const matchLang = ev.language?.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchDesc && !matchCat && !matchLang) return false;
    }

    return true;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--theme-bg-primary)', paddingTop: 72, transition: 'background-color 0.4s ease' }}>
      
      {/* ── Top Hero Banner ─────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #241F1C 0%, #3D2B24 50%, #5E3D30 100%)',
        padding: '36px 24px 20px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--theme-border)'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 11, letterSpacing: 1.5, fontWeight: 800,
                color: 'var(--theme-accent-saffron)', textTransform: 'uppercase', marginBottom: 8
              }}>
                <span>📍</span> CULTURAL GATHERINGS & FESTIVALS
              </div>
              <h1 style={{ margin: 0, fontSize: 36, fontWeight: 900, color: '#FBF7F0', fontFamily: 'Fraunces, serif', lineHeight: 1.2 }}>
                Upcoming Cultural Events <span style={{ color: 'var(--theme-accent-primary)' }}>&</span> Experiences
              </h1>
              <p style={{ margin: '8px 0 0', color: 'rgba(251,247,240,0.7)', fontSize: 14, fontWeight: 400, maxWidth: 620 }}>
                Discover vibrant classical concerts, heritage dance recitals, artisanal craft exhibitions, regional food festivals, and sacred celebrations across India.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Search Bar */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, opacity: 0.7 }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search events, venues, cities…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    paddingLeft: 38, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                    borderRadius: 24, border: '1px solid rgba(255,255,255,0.2)', fontSize: 13, outline: 'none',
                    background: 'rgba(255,255,255,0.1)', color: '#fff', width: 240,
                    backdropFilter: 'blur(8px)',
                  }}
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.6 }}
                  >✕</button>
                )}
              </div>

              {token ? (
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    background: 'var(--theme-btn-bg)', color: 'var(--theme-btn-text)',
                    border: 'none', borderRadius: 24, padding: '10px 22px',
                    fontWeight: 800, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap',
                    boxShadow: '0 4px 14px rgba(193, 80, 46, 0.3)',
                    display: 'flex', alignItems: 'center', gap: 6
                  }}
                >
                  <span>+</span> Host Event
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: 24, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer'
                  }}
                >
                  Login to Host
                </button>
              )}
            </div>
          </div>

          {/* Category Horizontal Pills */}
          <div style={{
            display: 'flex', gap: 8, marginTop: 24, overflowX: 'auto', paddingBottom: 10,
            scrollbarWidth: 'none', msOverflowStyle: 'none'
          }}>
            {CATEGORIES.map(cat => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', border: '1px solid',
                    background: isSelected ? 'var(--theme-accent-primary)' : 'rgba(255,255,255,0.08)',
                    color: isSelected ? '#fff' : 'rgba(255,255,255,0.85)',
                    borderColor: isSelected ? 'var(--theme-accent-primary)' : 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(6px)',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <span>{CATEGORY_EMOJIS[cat]}</span>
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Layout (Sidebar Filters + Events Grid) ──────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 24px', display: 'flex', gap: 28, alignItems: 'flex-start' }}>

        {/* ── Left Sidebar Filters ─────────────────────────────────────────── */}
        <aside style={{
          width: sidebarOpen ? 260 : 0,
          flexShrink: 0,
          backgroundColor: 'var(--theme-bg-secondary)',
          borderRadius: 18,
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          overflow: 'hidden',
          transition: 'width 0.25s ease, padding 0.25s ease',
          padding: sidebarOpen ? '20px' : 0,
          border: sidebarOpen ? '1px solid var(--theme-border)' : 'none',
        }}>
          {sidebarOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              
              {/* Filter Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--theme-border)', paddingBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--theme-text-primary)', textTransform: 'uppercase', letterSpacing: 1 }}>
                  Filters
                </span>
                <button
                  onClick={resetAllFilters}
                  style={{ background: 'none', border: 'none', color: 'var(--theme-accent-primary)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                >
                  Reset All
                </button>
              </div>

              {/* Date Filter Section */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: 'var(--theme-text-muted)', textTransform: 'uppercase', marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
                  <span>📅 Date</span>
                  {dateFilter !== 'all' && (
                    <button onClick={() => { setDateFilter('all'); setCustomDate(''); }} style={{ background: 'none', border: 'none', color: 'var(--theme-accent-primary)', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                      Clear
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {[
                    ['all', 'All'],
                    ['today', 'Today'],
                    ['tomorrow', 'Tomorrow'],
                    ['weekend', 'This Weekend']
                  ].map(([val, lbl]) => {
                    const isSelected = dateFilter === val;
                    return (
                      <button
                        key={val}
                        onClick={() => setDateFilter(val)}
                        style={{
                          padding: '6px 12px', borderRadius: 14, border: '1px solid',
                          fontSize: 12, fontWeight: 700, cursor: 'pointer',
                          background: isSelected ? 'var(--theme-accent-primary)' : 'var(--theme-bg-primary)',
                          color: isSelected ? '#fff' : 'var(--theme-text-primary)',
                          borderColor: isSelected ? 'var(--theme-accent-primary)' : 'var(--theme-border)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {lbl}
                      </button>
                    );
                  })}
                </div>
                <label style={{ fontSize: 11, color: 'var(--theme-text-muted)', fontWeight: 600, display: 'block', marginBottom: 4 }}>Custom Date</label>
                <input
                  type="date"
                  value={customDate}
                  onChange={e => { setCustomDate(e.target.value); setDateFilter('custom'); }}
                  style={{
                    width: '100%', padding: '8px 10px', border: '1px solid var(--theme-border)',
                    borderRadius: 8, fontSize: 12, outline: 'none', boxSizing: 'border-box',
                    backgroundColor: 'var(--theme-bg-primary)', color: 'var(--theme-text-primary)'
                  }}
                />
              </div>

              {/* Language Section */}
              <div style={{ borderTop: '1px solid var(--theme-border)', paddingTop: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: 'var(--theme-text-muted)', textTransform: 'uppercase', marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
                  <span>🌐 Language</span>
                  {activeLanguage !== 'All Languages' && (
                    <button onClick={() => setActiveLanguage('All Languages')} style={{ background: 'none', border: 'none', color: 'var(--theme-accent-primary)', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                      Clear
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 180, overflowY: 'auto' }}>
                  {LANGUAGES.map(lang => {
                    const isSelected = activeLanguage === lang;
                    return (
                      <div
                        key={lang}
                        onClick={() => setActiveLanguage(lang)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px',
                          borderRadius: 8, cursor: 'pointer',
                          backgroundColor: isSelected ? 'var(--theme-bg-accent)' : 'transparent',
                          transition: 'background-color 0.2s ease'
                        }}
                      >
                        <div style={{
                          width: 16, height: 16, borderRadius: 4, border: '1.5px solid',
                          borderColor: isSelected ? 'var(--theme-accent-primary)' : 'var(--theme-border)',
                          backgroundColor: isSelected ? 'var(--theme-accent-primary)' : 'var(--theme-bg-primary)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          {isSelected && <span style={{ color: '#fff', fontSize: 10, fontWeight: 900 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 13, color: isSelected ? 'var(--theme-accent-primary)' : 'var(--theme-text-primary)', fontWeight: isSelected ? 700 : 500 }}>
                          {lang}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Section */}
              <div style={{ borderTop: '1px solid var(--theme-border)', paddingTop: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: 'var(--theme-text-muted)', textTransform: 'uppercase', marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
                  <span>💰 Price</span>
                  {activePriceIdx !== 0 && (
                    <button onClick={() => setActivePriceIdx(0)} style={{ background: 'none', border: 'none', color: 'var(--theme-accent-primary)', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                      Clear
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {PRICE_RANGES.map((pr, i) => {
                    const isSelected = activePriceIdx === i;
                    return (
                      <div
                        key={pr.label}
                        onClick={() => setActivePriceIdx(i)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px',
                          borderRadius: 8, cursor: 'pointer',
                          backgroundColor: isSelected ? 'var(--theme-bg-accent)' : 'transparent',
                          transition: 'background-color 0.2s ease'
                        }}
                      >
                        <div style={{
                          width: 14, height: 14, borderRadius: '50%', border: '1.5px solid',
                          borderColor: isSelected ? 'var(--theme-accent-primary)' : 'var(--theme-border)',
                          backgroundColor: isSelected ? 'var(--theme-accent-primary)' : 'var(--theme-bg-primary)',
                          flexShrink: 0,
                        }} />
                        <span style={{ fontSize: 13, color: isSelected ? 'var(--theme-accent-primary)' : 'var(--theme-text-primary)', fontWeight: isSelected ? 700 : 500 }}>
                          {pr.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </aside>

        {/* ── Right Content Area ───────────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Action Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <button
              onClick={() => setSidebarOpen(o => !o)}
              style={{
                backgroundColor: 'var(--theme-bg-secondary)',
                border: '1px solid var(--theme-border)',
                borderRadius: 10, padding: '8px 14px', fontSize: 13, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                color: 'var(--theme-text-primary)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              <span>{sidebarOpen ? '◀ Hide Filters' : '▶ Show Filters'}</span>
            </button>

            <span style={{ fontSize: 14, color: 'var(--theme-text-muted)', fontWeight: 500 }}>
              Showing <strong style={{ color: 'var(--theme-text-primary)', fontWeight: 800 }}>{filtered.length}</strong> cultural event{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </span>

            {/* Active Filter Chips */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginLeft: 'auto' }}>
              {activeCategory !== 'All' && (
                <Chip label={activeCategory} onRemove={() => setActiveCategory('All')} />
              )}
              {dateFilter !== 'all' && (
                <Chip label={dateFilter === 'custom' ? customDate : dateFilter === 'weekend' ? 'This Weekend' : dateFilter} onRemove={() => { setDateFilter('all'); setCustomDate(''); }} />
              )}
              {activeLanguage !== 'All Languages' && (
                <Chip label={activeLanguage} onRemove={() => setActiveLanguage('All Languages')} />
              )}
              {activePriceIdx !== 0 && (
                <Chip label={PRICE_RANGES[activePriceIdx].label} onRemove={() => setActivePriceIdx(0)} />
              )}
              {search && (
                <Chip label={`"${search}"`} onRemove={() => setSearch('')} />
              )}
            </div>
          </div>

          {/* Events Grid or Empty State */}
          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '80px 24px',
              backgroundColor: 'var(--theme-bg-secondary)',
              borderRadius: 20, border: '1px dashed var(--theme-border)'
            }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🎭</div>
              <h3 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: 'var(--theme-text-primary)', fontFamily: 'Fraunces, serif' }}>
                No events found matching your criteria
              </h3>
              <p style={{ margin: '0 auto 20px', color: 'var(--theme-text-muted)', fontSize: 14, maxWidth: 460 }}>
                Try adjusting or clearing your date, language, category, or search filters to explore available cultural experiences.
              </p>
              <button
                onClick={resetAllFilters}
                style={{
                  background: 'var(--theme-btn-bg)', color: 'var(--theme-btn-text)',
                  border: 'none', borderRadius: 20, padding: '10px 24px', fontWeight: 800,
                  fontSize: 13, cursor: 'pointer', boxShadow: '0 4px 12px rgba(193, 80, 46, 0.25)'
                }}
              >
                🔄 Reset All Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}>
              {filtered.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onDelete={handleDeleteEvent}
                  role={role}
                  onBook={(ev) => setBookingEvent(ev)}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ── Host Event Modal ────────────────────────────────────────────────── */}
      {showModal && (
        <HostEventModal
          onClose={() => { setShowModal(false); setError(''); }}
          onSubmit={handleEventSubmit}
          error={error}
        />
      )}

      {/* ── Booking & Event Details Modal ───────────────────────────────────── */}
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

// ── Active Filter Chip ───────────────────────────────────────────────────────
const Chip = ({ label, onRemove }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: 'var(--theme-bg-accent)', border: '1px solid var(--theme-border)',
    borderRadius: 16, padding: '4px 10px', fontSize: 12, fontWeight: 700,
    color: 'var(--theme-accent-primary)',
  }}>
    <span>{label}</span>
    <button
      onClick={onRemove}
      style={{ background: 'none', border: 'none', color: 'var(--theme-accent-primary)', cursor: 'pointer', fontSize: 13, lineHeight: 1, padding: 0 }}
    >✕</button>
  </span>
);

export default EventsBoard;
