// Comprehensive Travel and Destination Cultural Experience Dataset for CultureConnect
// "Travel to a place → Book your journey → Discover the culture of that place."

export const POPULAR_CITIES = [
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Mumbai',
  'Delhi',
  'Kochi',
  'Mysore',
  'Goa',
  'Jaipur',
  'Kolkata',
  'Varanasi',
  'Ahmedabad',
  'Visakhapatnam',
  'Pune'
];

export const POPULAR_ROUTES = [
  { from: 'Hyderabad', to: 'Bangalore', label: 'Hyderabad → Bangalore', desc: 'Silicon Valley & Royal Wodeyar Heritage' },
  { from: 'Bangalore', to: 'Goa', label: 'Bangalore → Goa', desc: 'Latin Quarters & Coastal Sunsets' },
  { from: 'Mumbai', to: 'Jaipur', label: 'Mumbai → Jaipur', desc: 'Pink City Palaces & Royal Cuisine' },
  { from: 'Delhi', to: 'Varanasi', label: 'Delhi → Varanasi', desc: 'Sacred Ganga Ghats & Classical Arts' },
  { from: 'Chennai', to: 'Kochi', label: 'Chennai → Kochi', desc: 'Backwaters, Kathakali & Spice Trade' },
  { from: 'Bangalore', to: 'Mysore', label: 'Bangalore → Mysore', desc: 'Palace Splendour & Silk Weaving' }
];

// Helper to normalize city names
export const normalizeCity = (city) => {
  if (!city) return 'Bangalore';
  const c = city.trim().toLowerCase();
  if (c.includes('bangalore') || c.includes('bengaluru')) return 'Bangalore';
  if (c.includes('hyderabad')) return 'Hyderabad';
  if (c.includes('chennai') || c.includes('madras')) return 'Chennai';
  if (c.includes('mumbai') || c.includes('bombay')) return 'Mumbai';
  if (c.includes('delhi')) return 'Delhi';
  if (c.includes('kochi') || c.includes('cochin')) return 'Kochi';
  if (c.includes('mysore') || c.includes('mysuru')) return 'Mysore';
  if (c.includes('goa')) return 'Goa';
  if (c.includes('jaipur')) return 'Jaipur';
  if (c.includes('kolkata') || c.includes('calcutta')) return 'Kolkata';
  if (c.includes('varanasi') || c.includes('banaras') || c.includes('kashi')) return 'Varanasi';
  if (c.includes('ahmedabad')) return 'Ahmedabad';
  if (c.includes('visakhapatnam') || c.includes('vizag')) return 'Visakhapatnam';
  if (c.includes('pune')) return 'Pune';
  // Capitalize first letter
  return city.charAt(0).toUpperCase() + city.slice(1);
};

// Realistic mock trip generator for Flight, Train, and Bus
export const generateMockTrips = (fromCity = 'Hyderabad', toCity = 'Bangalore', travelDate = '', travelMode = 'All') => {
  const normFrom = normalizeCity(fromCity);
  const normTo = normalizeCity(toCity);

  const baseTrips = [
    // ──────── FLIGHTS ────────
    {
      id: `fl-1-${normFrom}-${normTo}`,
      mode: 'Flight',
      operator: 'IndiGo Airlines',
      serviceNumber: '6E-512',
      departureTime: '06:15 AM',
      arrivalTime: '07:30 AM',
      duration: '1h 15m',
      fromStation: `${normFrom} Int'l Airport (Terminal 1)`,
      toStation: `${normTo} Int'l Airport (Terminal 1)`,
      price: 2450,
      originalPrice: 3200,
      availableSeats: 14,
      amenities: ['In-flight Meal Available', '7kg Cabin Baggage', '15kg Check-in', 'Web Check-in'],
      rating: 4.6,
      punctuality: '96% On-Time',
      stops: 'Non-stop',
      classType: 'Economy Saver',
      badge: 'Fastest'
    },
    {
      id: `fl-2-${normFrom}-${normTo}`,
      mode: 'Flight',
      operator: 'Air India',
      serviceNumber: 'AI-804',
      departureTime: '11:40 AM',
      arrivalTime: '01:00 PM',
      duration: '1h 20m',
      fromStation: `${normFrom} Airport (Terminal 2)`,
      toStation: `${normTo} Airport (Terminal 2)`,
      price: 3190,
      originalPrice: 3850,
      availableSeats: 8,
      amenities: ['Complimentary Hot Snack', '25kg Baggage Allowance', 'Spacious Legroom'],
      rating: 4.4,
      punctuality: '92% On-Time',
      stops: 'Non-stop',
      classType: 'Full Service Economy',
      badge: 'Free Meal'
    },
    {
      id: `fl-3-${normFrom}-${normTo}`,
      mode: 'Flight',
      operator: 'Akasa Air',
      serviceNumber: 'QP-1342',
      departureTime: '07:20 PM',
      arrivalTime: '08:35 PM',
      duration: '1h 15m',
      fromStation: `${normFrom} Int'l Airport`,
      toStation: `${normTo} Int'l Airport`,
      price: 2280,
      originalPrice: 2990,
      availableSeats: 22,
      amenities: ['USB In-seat Charging', 'Eco-friendly Fleet', 'Pre-book Café Akasa'],
      rating: 4.7,
      punctuality: '98% On-Time',
      stops: 'Non-stop',
      classType: 'Super Saver',
      badge: 'Best Value'
    },

    // ──────── TRAINS ────────
    {
      id: `tr-1-${normFrom}-${normTo}`,
      mode: 'Train',
      operator: 'Indian Railways (Vande Bharat Exp)',
      serviceNumber: '20608 / VB',
      departureTime: '05:30 AM',
      arrivalTime: '01:50 PM',
      duration: '8h 20m',
      fromStation: `${normFrom} Central / Kacheguda`,
      toStation: `${normTo} Yesvantpur Jn / KSR City`,
      price: 1540,
      originalPrice: 1750,
      availableSeats: 34,
      amenities: ['Executive Chair Car Available', 'Breakfast & Lunch Included', 'High-speed Wi-Fi', 'Panoramic Windows'],
      rating: 4.8,
      punctuality: '99% On-Time',
      stops: '4 Stops (Semi-High Speed)',
      classType: 'AC Chair Car (CC)',
      badge: 'Express Choice'
    },
    {
      id: `tr-2-${normFrom}-${normTo}`,
      mode: 'Train',
      operator: 'Rajdhani / Superfast Express',
      serviceNumber: '12785 / SF-EXP',
      departureTime: '07:05 PM',
      arrivalTime: '06:25 AM',
      duration: '11h 20m',
      fromStation: `${normFrom} Railway Station`,
      toStation: `${normTo} Cantt / City Jn`,
      price: 1120,
      originalPrice: 1350,
      availableSeats: 19,
      amenities: ['Fresh Bedroll & Linen', 'Pantry Catering', 'Clean Bio-toilets', 'Night Overnight Sleep'],
      rating: 4.3,
      punctuality: '94% On-Time',
      stops: '7 Major Stops',
      classType: 'AC 3-Tier (3A)',
      badge: 'Overnight Sleep'
    },
    {
      id: `tr-3-${normFrom}-${normTo}`,
      mode: 'Train',
      operator: 'Shatabdi / Intercity Express',
      serviceNumber: '12607 / INT-EXP',
      departureTime: '02:15 PM',
      arrivalTime: '10:45 PM',
      duration: '8h 30m',
      fromStation: `${normFrom} Terminal`,
      toStation: `${normTo} City Terminal`,
      price: 780,
      originalPrice: 920,
      availableSeats: 45,
      amenities: ['Reserved Seating', 'Evening Snacks Served', 'Mobile Charging Ports'],
      rating: 4.2,
      punctuality: '91% On-Time',
      stops: '8 Stops',
      classType: 'Second AC Chair Car',
      badge: 'Budget Friendly'
    },

    // ──────── BUSES ────────
    {
      id: `bs-1-${normFrom}-${normTo}`,
      mode: 'Bus',
      operator: 'KSRTC Airavat Club Class',
      serviceNumber: 'KA-VOLVO-981',
      departureTime: '09:30 PM',
      arrivalTime: '06:45 AM',
      duration: '9h 15m',
      fromStation: `${normFrom} Central Bus Station / Lakdikapul`,
      toStation: `${normTo} Majestic / Kempegowda Bus Station`,
      price: 1150,
      originalPrice: 1400,
      availableSeats: 16,
      amenities: ['Multi-Axle Volvo Air Suspension', 'Blanket & Mineral Water', 'Live GPS Tracking', 'Emergency SOS'],
      rating: 4.7,
      punctuality: '97% On-Time',
      stops: 'Direct Highway Corridor',
      classType: 'AC Multi-Axle Sleeper',
      badge: 'Top Rated Bus'
    },
    {
      id: `bs-2-${normFrom}-${normTo}`,
      mode: 'Bus',
      operator: 'IntrCity SmartBus',
      serviceNumber: 'IC-SMART-442',
      departureTime: '10:15 PM',
      arrivalTime: '07:30 AM',
      duration: '9h 15m',
      fromStation: `${normFrom} SmartBus Lounge (Gachibowli)`,
      toStation: `${normTo} SmartBus Hub (Hebbal / Madiwala)`,
      price: 980,
      originalPrice: 1250,
      availableSeats: 21,
      amenities: ['Private Sleeping Pods', 'AC Bus Captain Onboard', 'Free Wi-Fi', 'Air Purifier'],
      rating: 4.6,
      punctuality: '95% On-Time',
      stops: 'Direct Express',
      classType: 'Luxury AC Sleeper (2+1)',
      badge: 'Smart Lounge'
    },
    {
      id: `bs-3-${normFrom}-${normTo}`,
      mode: 'Bus',
      operator: 'SRS Travels Executive',
      serviceNumber: 'SRS-EX-709',
      departureTime: '11:00 PM',
      arrivalTime: '08:15 AM',
      duration: '9h 15m',
      fromStation: `${normFrom} Highway Pickup Point`,
      toStation: `${normTo} Electronic City / Silk Board`,
      price: 850,
      originalPrice: 1050,
      availableSeats: 9,
      amenities: ['Ergonomic Push-back Seats', 'Charging Points', 'Reading Lights'],
      rating: 4.3,
      punctuality: '90% On-Time',
      stops: 'Direct',
      classType: 'AC Semi-Sleeper',
      badge: 'Pocket Friendly'
    }
  ];

  if (travelMode && travelMode !== 'All') {
    return baseTrips.filter(t => t.mode.toLowerCase() === travelMode.toLowerCase());
  }

  return baseTrips;
};

// Comprehensive Cultural Experience Data by Destination
export const DESTINATION_CULTURE_DATA = {
  Bangalore: {
    city: 'Bangalore',
    officialName: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Garden City & Royal Heritage of Mysore Rule',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1600&auto=format&fit=crop&q=80',
    introQuote: 'From the royal Tudor turrets of Bangalore Palace to the morning aroma of freshly brewed filter coffee and sizzling benne masala dosa, Bengaluru is where centuries of heritage seamlessly dance with futuristic cosmopolitan energy.',
    shortDescription: 'Founded in 1537 by chieftain Kempe Gowda and enriched by the Wodeyar Maharajas and Tipu Sultan, Bangalore invites travelers into century-old botanical sanctuaries, grand granite architecture, and an unmatched culinary culture.',
    
    // A. EXPLORE PLACES
    places: [
      {
        id: 'blr-place-1',
        name: 'Bangalore Palace',
        imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'Tudor-style royal estate with fortified towers, stained glass windows, and gilded ballrooms modeled on England’s Windsor Castle.',
        location: 'Vasanth Nagar, Central Bengaluru',
        openingHours: '10:00 AM – 05:30 PM (Daily)',
        entryFee: '₹250 (Indians) | ₹500 (Foreigners)',
        category: 'Royal Palace & Architecture',
        highlight: 'Audio tour narrated with royal anecdotes & Maharaja Jayachamarajendra Wodeyar’s personal art gallery.'
      },
      {
        id: 'blr-place-2',
        name: 'Vidhana Soudha',
        imageUrl: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'The magnificent seat of Karnataka’s legislature, constructed entirely from pristine Bangalore granite in monumental Neo-Dravidian style.',
        location: 'Sampangi Rama Nagara, Ambedkar Veedhi',
        openingHours: 'Illuminated Sunday evenings & holidays; exterior view daily',
        entryFee: 'Exterior viewing free; illuminated evenings 6:00 PM – 8:30 PM',
        category: 'Monument & Civic Heritage',
        highlight: 'Features the national emblem Ashoka Lion crest and the motto "Government\'s Work is God\'s Work" carved in granite.'
      },
      {
        id: 'blr-place-3',
        name: 'Lalbagh Botanical Garden',
        imageUrl: 'https://images.unsplash.com/photo-1580294658515-63f052988821?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'Historic 240-acre botanical haven commissioned by Hyder Ali in 1760, boasting an iconic Crystal Palace-inspired Glass House and 1,850+ plant species.',
        location: 'Mavalli, South Bengaluru',
        openingHours: '06:00 AM – 07:00 PM (Daily)',
        entryFee: '₹30 per adult | Free for morning walkers (6:00 AM – 9:00 AM)',
        category: 'Nature & Botanical Heritage',
        highlight: 'Home to a 3,000-million-year-old Peninsular Gneiss rock with Kempe Gowda’s watchtower and biannual flower shows.'
      },
      {
        id: 'blr-place-4',
        name: 'Cubbon Park',
        imageUrl: 'https://images.unsplash.com/photo-1628003664724-5d9c79e5d4cb?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'Lush 300-acre green lung in the city’s heart, cradling red brick Victorian structures like Seshadri Iyer Memorial Hall and the State Central Library.',
        location: 'Kasturba Road, Bengaluru',
        openingHours: '06:00 AM – 08:00 PM (Vehicle-free on Sundays)',
        entryFee: 'Free entry',
        category: 'Urban Park & Colonial Heritage',
        highlight: 'Perfect for tranquil morning heritage walks amidst bamboo groves, silver oaks, and open-air poetry circles.'
      },
      {
        id: 'blr-place-5',
        name: 'ISKCON Temple Bangalore',
        imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'Grand neo-classical Dravidian temple complex crowning the Hare Krishna Hill, renowned for exquisite gold-plated flagstaffs and serene kirtans.',
        location: 'Rajajinagar, West Bengaluru',
        openingHours: '04:15 AM – 01:00 PM, 04:15 PM – 08:30 PM',
        entryFee: 'Free entry (Special darshan optional)',
        category: 'Spiritual & Temple Architecture',
        highlight: 'Massive community kitchen that pioneered the Akshaya Patra free meal initiative serving millions.'
      },
      {
        id: 'blr-place-6',
        name: 'Tipu Sultan’s Summer Palace',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Tipu_Sultan_Summer_Palace.jpg',
        shortDescription: 'An ornate two-storey teakwood palace adorned with carved pillars, floral frescoes, and fluted arches that served as Tipu Sultan’s summer residence.',
        location: 'Albert Victor Road, Chamrajpet',
        openingHours: '08:30 AM – 05:30 PM',
        entryFee: '₹20 (Indians) | ₹250 (Foreigners)',
        category: 'Indo-Islamic Wooden Heritage',
        highlight: 'Rare portrait gallery and replica of Tipu’s mechanical tiger organ.'
      }
    ],

    // B. CITY FOOD
    foods: [
      {
        id: 'blr-food-1',
        name: 'Crispy Benne Masala Dosa',
        imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
        description: 'Golden-brown, feather-light yet crunchy rice-lentil crepe slathered with pure white butter (benne), red chilli-garlic chutney, and fragrant spiced potato stuffing.',
        recommendedPlaces: 'CTR Shri Sagar (Malleshwaram), Vidyarthi Bhavan (Gandhi Bazaar), MTR (Lalbagh Road)',
        approxPrice: '₹70 – ₹120',
        mealType: 'Legendary Breakfast'
      },
      {
        id: 'blr-food-2',
        name: 'Traditional Bisi Bele Bath',
        imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&auto=format&fit=crop&q=80',
        description: 'A comforting, spicy, slow-simmered medley of rice, toor dal, seasonal vegetables, tamarind, and a 20-spice Karnataka roast topped with sizzling ghee and boondi.',
        recommendedPlaces: 'Maiyas (Jayanagar), Mavalli Tiffin Room (MTR), Veena Stores',
        approxPrice: '₹60 – ₹110',
        mealType: 'Soul Food & Lunch'
      },
      {
        id: 'blr-food-3',
        name: 'Ragi Mudde with Bassaru & Natu Kodi',
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
        description: 'Nutritious finger-millet steamed dumplings swallowed whole with spiced green-leaf lentil broth (Bassaru) or country chicken saaru. The quintessential rural Karnataka feast.',
        recommendedPlaces: 'Nati Mana (Indiranagar), Mudde Madappa Mess (Gandhi Bazaar), Kamat Bugle Rock',
        approxPrice: '₹140 – ₹280',
        mealType: 'Traditional Rustic Thali'
      },
      {
        id: 'blr-food-4',
        name: 'Button Idli Vada with Filter Coffee',
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
        description: 'Pillowy soft fermented rice cakes and crunchy golden medu vadas submerged in aromatic Madras-Karnataka sambar, washed down with piping hot chicory-blended filter kaapi in brass dabarah.',
        recommendedPlaces: 'Brahmin’s Coffee Bar (Shankarpuram), Veena Stores (Malleshwaram), Taaza Thindi (Jayanagar)',
        approxPrice: '₹50 – ₹90',
        mealType: 'Morning Darshini Ritual'
      },
      {
        id: 'blr-food-5',
        name: 'Royal Mysore Pak & Dharwad Peda',
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
        description: 'Melt-in-the-mouth sweet created in the Mysore Palace royal kitchens with pure desi ghee, gram flour, and caramelized sugar syrup.',
        recommendedPlaces: 'Sri Venkateshwara Sweetmeat Stall (Balepet), Anand Sweets, Kanti Sweets',
        approxPrice: '₹90 – ₹180 (Box)',
        mealType: 'Royal Heritage Sweet'
      },
      {
        id: 'blr-food-6',
        name: 'Bangalore Donne Biryani',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
        description: 'Fragrant Seeraga Samba short-grain rice cooked with fresh mint, coriander, green chillies, and tender marinated meat, served steaming hot in eco-friendly dried areca leaf cups (donne).',
        recommendedPlaces: 'Shivaji Military Hotel (Jayanagar), Ranganna Military Hotel, SGS Non-Veg Gundu Pulav',
        approxPrice: '₹160 – ₹260',
        mealType: 'Military Hotel Specialty'
      }
    ],

    // C. LOCAL CULTURE
    culture: {
      traditions: [
        'Morning "Adda" & Filter Coffee: Starting the day at local stand-and-eat Darshinis with newspapers, steaming kaapi, and philosophical discussions.',
        'Wodeyar Royal Heritage: High appreciation for classical Carnatic music, Mysore silk drapes, and sandalwood crafts.',
        'Weekend Green Parks Culture: Families, artists, and runners gathering under Cubbon Park and Lalbagh banyans every Saturday and Sunday morning.'
      ],
      festivals: [
        {
          name: 'Bangalore Karaga Shaktyotsava',
          description: 'The city’s oldest and grandest 9-day nocturnal festival celebrated by the Thigala community in Tigalarapet, honoring Draupadi with a flower-pyramid pot carried in midnight trance without dropping.'
        },
        {
          name: 'Kadalekai Parishe (Groundnut Fair)',
          description: 'Century-old harvest fair held every November around the historic Bull Temple (Dodda Basavana Gudi) in Basavanagudi, where farmers shower their first groundnut harvest on the sacred Nandi.'
        },
        {
          name: 'Bengaluru Habba & Karnataka Rajyotsava',
          description: 'Statehood day on November 1st celebrated with vibrant red-and-yellow Karnataka flags, street processions, Kannada folk music, and citywide cultural pageantry.'
        }
      ],
      languages: 'Kannada is the primary state and native language. English, Telugu, Tamil, and Hindi are widely spoken across all public transport, markets, and restaurants.',
      culturalPractices: [
        'Visiting Darshinis: Quick self-service restaurants where patrons eat standing up by high counters, celebrating zero-pretence community dining.',
        'Respect for Elders & "Namaskara": Traditional greeting with palms folded at chest level, warmly reciprocated across all age groups.',
        'Eco-friendly Floral Offerings: Handcrafted jasmine strings (Mullai / Mallige) worn in hair and offered at ancient roadside shrines.'
      ],
      customs: [
        'Remove footwear before stepping inside homes, temples, and classical dance academies.',
        'In autos, ask "Meter haaki" (Please use the meter) or use popular booking apps.',
        'Darshinis operate on token-first counters: buy your token first, then collect your steaming tiffin at the kitchen pass.'
      ]
    },

    // D. DANCES AND ARTS
    dancesAndArts: [
      {
        name: 'Yakshagana',
        category: 'Classical Dance-Drama',
        imageUrl: '/images/dances/yakshagana.jpg',
        description: 'A mesmerizing theatrical dance-drama combining vibrant multi-tiered headgear (Muguta), fierce facial cosmetics, high-flying spins, and impromptu Kannada dialogues depicting Ramayana and Mahabharata epics.',
        instruments: 'Chande (thunderous cylindrical drum), Maddale (horizontal drum), and Taala (bronze cymbals) guided by the Bhagavata (lead singer).',
        whereToWatch: 'Ravindra Kalakshetra (J.C. Road) and Ranga Shankara (J.P. Nagar).'
      },
      {
        name: 'Dollu Kunitha',
        category: 'High-Energy Folk Drum Dance',
        imageUrl: '/images/dances/dollu_kunitha.jpg',
        description: 'An exhilarating ritual percussion dance performed by the Kuruba shepherd community, where athletic dancers beat massive decorated sheepskin drums strapped to their chests while leaping in circular formations.',
        instruments: 'Large Dollu drums, Tala cymbals, and brass flutes (Kahaley).',
        whereToWatch: 'Performed during Karnataka Rajyotsava, Temple Rathotsavas, and Janapada Loka showcases.'
      },
      {
        name: 'Veeragase & Somana Kunitha',
        category: 'Warrior & Spirit Folk Dance',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Oggu_Katha_-_Folk_Dance_Of_Telangana_-_Wikiconference_India_2023_-_Hyderabad_2023-04-28_8112.jpg',
        description: 'Veeragase is an intense devotional warrior dance dedicated to Lord Shiva, featuring crimson headbands, wooden swords, and rhythmic stomping, while Somana Kunitha features massive carved wooden spirit masks representing guardian village deities.',
        instruments: 'Karabhaday, Sambal drums, and Nagari.',
        whereToWatch: 'Dasara cultural processions and heritage temple fairs around Bengaluru.'
      }
    ],

    // E. EVENTS
    events: [
      {
        id: 'blr-ev-1',
        title: 'Namma Bengaluru Flower Show',
        venue: 'Lalbagh Glass House, Mavalli',
        date: 'Upcoming Weekend (09:00 AM – 06:30 PM)',
        category: 'Floral & Botanical Showcase',
        ticketPrice: '₹80 per person',
        description: 'Over 2.5 million exotic blooms arranged into towering architectural monuments and tribute sculptures inside the Victorian Glass House.'
      },
      {
        id: 'blr-ev-2',
        title: 'Ranga Shankara Evening Theatre Showcase',
        venue: 'Ranga Shankara, 36/2 8th Cross, J.P. Nagar',
        date: 'Every Tuesday – Sunday (07:30 PM)',
        category: 'Performing Arts & Drama',
        ticketPrice: '₹150 – ₹300',
        description: 'Intimate, unamplified Kannada and English theatrical plays continuing Arundhati Nag’s legendary theatrical legacy with no late admissions.'
      },
      {
        id: 'blr-ev-3',
        title: 'Chitra Santhe Heritage Art Carnival',
        venue: 'Kumara Krupa Road, Near Chitrakala Parishath',
        date: 'Annual Cultural Showcase',
        category: 'Folk Art & Handicrafts',
        ticketPrice: 'Free Entry',
        description: 'A 2-kilometer open-air avenue packed with over 1,500 folk painters, Mysore traditional gesso artists, and sculptors from across India.'
      },
      {
        id: 'blr-ev-4',
        title: 'Bangalore Classical Music Sabha Concert',
        venue: 'Chowdiah Memorial Hall, Malleshwaram',
        date: 'This Saturday Evening (06:00 PM)',
        category: 'Carnatic Classical Music',
        ticketPrice: '₹200 – ₹500',
        description: 'Soulful Carnatic vocal recitals with violin, mridangam, and ghatam inside the iconic violin-shaped heritage auditorium.'
      }
    ],

    // F. TRANSLATE (Kannada Local Phrases)
    languagePhrases: [
      {
        english: 'Hello / Greetings',
        kannada: 'ನಮಸ್ಕಾರ',
        pronunciation: 'Namaskāra',
        meaning: 'Universal respectful greeting used any time of day',
        context: 'Use when meeting locals, hotel staff, or shopkeepers'
      },
      {
        english: 'Thank you very much',
        kannada: 'ಧನ್ಯವಾದಗಳು / ತುಂಬಾ ಧನ್ಯವಾದ',
        pronunciation: 'Dhanyavādagaḷu / Thumba dhanyavāda',
        meaning: 'Expressing genuine gratitude',
        context: 'Use after receiving service, food, or directions'
      },
      {
        english: 'How much is this?',
        kannada: 'ಇದು ಎಷ್ಟು?',
        pronunciation: 'Idhu eṣṭu?',
        meaning: 'Asking the price of an item or fare',
        context: 'Essential while shopping at local bazaars like Malleshwaram or Commercial St'
      },
      {
        english: 'Where is this place / location?',
        kannada: 'ಈ ಜಾಗ ಎಲ್ಲಿದೆ?',
        pronunciation: 'Ee jāga ellide?',
        meaning: 'Asking for directions to a specific landmark',
        context: 'Show an address or place name and say this to auto drivers or passersby'
      },
      {
        english: 'I need help, please',
        kannada: 'ನನಗೆ ಸ್ವಲ್ಪ ಸಹಾಯ ಬೇಕು',
        pronunciation: 'Nanage swalpa sahāya bēku',
        meaning: 'Politely requesting assistance',
        context: 'Useful in emergencies or transit confusion'
      },
      {
        english: 'Where is the bus station / metro station?',
        kannada: 'ಬಸ್ ನಿಲ್ದಾಣ / ಮೆಟ್ರೋ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?',
        pronunciation: 'Bus nildāṇa / Metro nildāṇa ellide?',
        meaning: 'Asking for the nearest bus or Namma Metro transit point',
        context: 'Key for navigating between Majestic, MG Road, and Indiranagar'
      },
      {
        english: 'The food is very delicious!',
        kannada: 'ಊಟ ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ!',
        pronunciation: 'Ūṭa tumbā cennāgide!',
        meaning: 'Complimenting the meal or tiffin',
        context: 'Guaranteed to bring a huge smile to cooks at any Darshini'
      },
      {
        english: 'Please turn on the meter',
        kannada: 'ದಯವಿಟ್ಟು ಮೀಟರ್ ಹಾಕಿ',
        pronunciation: 'Dayaviṭṭu mīṭar hāki',
        meaning: 'Requesting auto driver to use the fare meter',
        context: 'Commonly spoken when hailing an auto on the street'
      },
      {
        english: 'Yes / No',
        kannada: 'ಹೌದು / ಇಲ್ಲ',
        pronunciation: 'Haudu / Illa',
        meaning: 'Basic affirmation or polite refusal',
        context: 'Daily conversations'
      },
      {
        english: 'A little slower, please',
        kannada: 'ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ',
        pronunciation: 'Swalpa nidhānavāgi',
        meaning: 'Asking someone to speak or drive slower',
        context: 'When listening to rapid Kannada or riding in transit'
      }
    ],

    // G. LOCAL FOOD MAP
    foodMap: [
      {
        id: 'fmap-1',
        area: 'VV Puram Food Street (Thindi Beedi)',
        neighborhood: 'Sajjan Rao Circle, VV Puram',
        timings: '06:00 PM – 11:30 PM (Vibrant Evenings)',
        mustEat: 'Congress Bun Butter Masala, Floating Gulkand with Ice Cream, Hot Paddus, Akki Roti',
        vibe: 'Pedestrian-only street alive with sizzling tawas, roasting sweet corn, and sweet smells.',
        highlightDish: 'Gulkand Ice Cream & Masala Dosa'
      },
      {
        id: 'fmap-2',
        area: 'Malleshwaram 8th Cross Heritage Trail',
        neighborhood: '8th Cross, Malleshwaram West',
        timings: '07:00 AM – 12:30 PM, 04:30 PM – 09:30 PM',
        mustEat: 'CTR Shri Sagar Butter Masala Dosa, Veena Stores Steamed Idli-Vada with Mint Chutney',
        vibe: 'Old-world residential Bangalore shaded by gulmohar trees with traditional flower vendors.',
        highlightDish: 'Benne Dosa & Filter Kaapi'
      },
      {
        id: 'fmap-3',
        area: 'Gandhi Bazaar (Basavanagudi)',
        neighborhood: 'Basavanagudi, South Bengaluru',
        timings: '06:30 AM – 11:30 AM, 03:00 PM – 09:00 PM',
        mustEat: 'Vidyarthi Bhavan 75-year-old Masala Dosa, Srinivasa Brahmin Bakery Iyengar Khara Buns',
        vibe: 'Literary and cultural hub lined with century-old heritage tiffin parlors and banyan canopies.',
        highlightDish: 'Crisp Ghee Dosa & Rava Vada'
      },
      {
        id: 'fmap-4',
        area: 'Frazer Town / Mosque Road Gourmet Quarter',
        neighborhood: 'Frazer Town / Pulakeshi Nagar',
        timings: '12:00 PM – 11:30 PM',
        mustEat: 'Albert Bakery Mutton Kheema Samosas, Brain Puffs, Chichaba’s Charminar Seekh Kebabs',
        vibe: 'Cantonment heritage neighborhood famous for legendary colonial bakeries and late-night grills.',
        highlightDish: 'Mutton Puffs & Bheja Fry'
      },
      {
        id: 'fmap-5',
        area: 'Indiranagar 100ft Road & 12th Main',
        neighborhood: 'Indiranagar, East Bengaluru',
        timings: '11:00 AM – Midnight',
        mustEat: 'Third Wave & Blue Tokai Artisanal Filter Brews, Nagarjuna Andhra Thali, Toit Craft Brews',
        vibe: 'Upscale cosmopolitan hub where modern artisanal roasteries sit beside heritage mess halls.',
        highlightDish: 'Artisanal Single-Origin Coffee'
      }
    ],

    // H. TRIP ITINERARY
    itinerary: [
      {
        day: 1,
        title: 'Day 1: Royal Dynasties & Victorian Botanical Echoes',
        theme: 'Heritage Palaces, Legislative Grandeur & Heritage Coffee Walks',
        schedule: [
          {
            period: 'Morning',
            time: '08:30 AM – 12:00 PM',
            activity: 'Bangalore Palace Tour & Malleshwaram Tiffin',
            description: 'Begin your morning with crispy Benne Masala Dosa and filter kaapi at CTR Shri Sagar, then wander through the Tudor turrets, ornate wooden courtyards, and royal art collections of Bangalore Palace.',
            tag: 'Royal Heritage'
          },
          {
            period: 'Afternoon',
            time: '12:30 PM – 03:30 PM',
            activity: 'Vidhana Soudha & Traditional Karnataka Lunch',
            description: 'Marvel at the monumental granite facades of Vidhana Soudha and the High Court (Attara Kacheri). Savor an authentic Bisi Bele Bath and Akki Roti lunch at MTR Lalbagh Road.',
            tag: 'Civic Architecture'
          },
          {
            period: 'Evening',
            time: '04:30 PM – 09:30 PM',
            activity: 'Cubbon Park Stroll & VV Puram Street Food Feast',
            description: 'Walk under Victorian canopies in Cubbon Park, visit the State Central Library, and finish your night exploring the vibrant street eats at VV Puram Food Street (Thindi Beedi).',
            tag: 'Street Food & Parks'
          }
        ]
      },
      {
        day: 2,
        title: 'Day 2: Botanical Sanctuaries, Old Bazaars & Traditional Theatre',
        theme: 'Floral Wonderlands, Silk Weaving & Kannada Performing Arts',
        schedule: [
          {
            period: 'Morning',
            time: '07:00 AM – 11:30 AM',
            activity: 'Lalbagh Botanical Sunrise & Glass House',
            description: 'Experience Bangalore’s legendary morning weather with a walk through the 240-acre Lalbagh garden, discover the ancient 3-billion-year-old Peninsular Rock, and photograph the iconic Glass House.',
            tag: 'Botanical Wonders'
          },
          {
            period: 'Afternoon',
            time: '12:00 PM – 04:00 PM',
            activity: 'Basavanagudi Bull Temple & Traditional Silk Market',
            description: 'Visit the monolithic 16th-century Nandi statue at Dodda Basavana Gudi, browse handwoven Mysore silks in Gandhi Bazaar, and relish a piping hot filter coffee with Congress buns.',
            tag: 'Temple & Bazaar'
          },
          {
            period: 'Evening',
            time: '05:30 PM – 09:30 PM',
            activity: 'Cultural Show at Ranga Shankara or Yakshagana Night',
            description: 'Witness an evening Yakshagana or traditional theatrical performance at Ranga Shankara in J.P. Nagar, followed by a Donne Biryani or festive South Indian thali dinner.',
            tag: 'Performing Arts'
          }
        ]
      }
    ]
  },

  // ════════════ HYDERABAD ════════════
  Hyderabad: {
    city: 'Hyderabad',
    officialName: 'Hyderabad',
    state: 'Telangana',
    tagline: 'City of Pearls & Nizami Splendor',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg',
    introQuote: 'The capital of the Nizams where four-century-old stone minarets pierce the sky, slow-cooked saffron biryani perfumes the alleyways, and Deccani warmth welcomes every soul.',
    shortDescription: 'Founded in 1591 by Muhammad Quli Qutb Shah, Hyderabad blends royal Qutb Shahi and Asaf Jahi heritage with Telugu folk warmth and world-famous Deccani delicacies.',
    places: [
      {
        id: 'hyd-pl-1',
        name: 'Charminar & Laad Bazaar',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg',
        shortDescription: 'Quintessential 1591 monument with four 56m minarets, framed by the sparkling lacquer bangle and pearl stores of Laad Bazaar.',
        location: 'Ghansi Bazaar, Old City',
        openingHours: '09:30 AM – 05:30 PM',
        entryFee: '₹25 (Indians)',
        category: 'Qutb Shahi Monument',
        highlight: 'Panoramic views of Mecca Masjid and heritage Old City crossroads.'
      },
      {
        id: 'hyd-pl-2',
        name: 'Golconda Fort',
        imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'Sprawling medieval fortress famed for acoustic ingenuity where a handclap at the entrance echoes 1 kilometer up to the Baradari summit.',
        location: 'Ibrahim Bagh, Hyderabad',
        openingHours: '09:00 AM – 05:30 PM (Evening Sound & Light show)',
        entryFee: '₹25 (Day) | ₹140 (Sound & Light)',
        category: 'Medieval Citadel & Acoustics',
        highlight: 'Spectacular sunset views over Hyderabad’s skyline from the hilltop.'
      },
      {
        id: 'hyd-pl-3',
        name: 'Chowmahalla Palace',
        imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'Opulent palace of the Asaf Jahi Nizams featuring the grand Khilwat Mubarak durbar hall with Belgian crystal chandeliers and vintage car collection.',
        location: 'Motigallu, Near Charminar',
        openingHours: '10:00 AM – 05:00 PM (Closed Fridays)',
        entryFee: '₹100 (Indians)',
        category: 'Nizami Royal Palace',
        highlight: 'The 1912 Rolls-Royce Silver Ghost and royal coronation thrones.'
      }
    ],
    foods: [
      {
        id: 'hyd-fd-1',
        name: 'Hyderabadi Dum Biryani',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
        description: 'Aged basmati rice and tender marinated goat/chicken slow-cooked in a sealed dough pot (dum) with saffron, caramelized onions, and Deccani potli spices.',
        recommendedPlaces: 'Paradise (Secunderabad), Bawarchi (RTC X Roads), Shadab (Madina)',
        approxPrice: '₹220 – ₹380',
        mealType: 'World-Famous Royal Feast'
      },
      {
        id: 'hyd-fd-2',
        name: 'Irani Chai with Osmania Biscuits',
        imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
        description: 'Velvety, condensed-milk tea slow-brewed over coal samovars, paired with sweet-and-salty melt-in-mouth Osmania biscuits.',
        recommendedPlaces: 'Nimrah Café (Opposite Charminar), Niloufer Café (Lakdikapul)',
        approxPrice: '₹25 – ₹60',
        mealType: 'Historic Teahouse Tradition'
      },
      {
        id: 'hyd-fd-3',
        name: 'Ramzan Special Haleem',
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
        description: 'GI-tagged slow-cooked stew of pounded meat, wheat, lentils, ghee, and aromatic spices cooked over 12 hours and garnished with fried cashew and mint.',
        recommendedPlaces: 'Pista House (Charminar), Shah Ghouse (Tolichowki)',
        approxPrice: '₹240 – ₹320',
        mealType: 'GI-Tagged Festive Delicacy'
      }
    ],
    culture: {
      traditions: ['Nizami Tehzeeb (polite courteous etiquette)', 'Irani chai addas', 'Itar (natural perfume) crafting'],
      festivals: [
        { name: 'Bonalu', description: 'Telangana’s vibrant state folk festival offering rice cooked in earthen pots decorated with neem and turmeric to Goddess Mahakali.' },
        { name: 'Bathukamma', description: 'Nine-day floral festival where women arrange concentric seasonal flowers and dance in circles singing traditional folk melodies.' }
      ],
      languages: 'Telugu and Deccani Urdu are the principal languages; Hindi and English are widely spoken.',
      culturalPractices: ['Late-night shopping at Charminar bazaars', 'Gifting pearls and lacquer bangles for weddings'],
      customs: ['Use respectful honorifics like "Aadaab" or "Namaskaram"', 'Bargaining with friendly warmth in Old City bazaars']
    },
    dancesAndArts: [
      {
        name: 'Perini Sivatandavam',
        category: 'Ancient Warrior Dance',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Oggu_Katha_-_Folk_Dance_Of_Telangana_-_Wikiconference_India_2023_-_Hyderabad_2023-04-28_8112.jpg',
        description: 'An invigorating Kakatiya-era warrior dance performed by male artists to the resonant beats of brass bells and damarus before marching into battle.',
        instruments: 'Mridangam, bell anklets, conch shells.',
        whereToWatch: 'Ravindra Bharati and Shilparamam amphitheater.'
      },
      {
        name: 'Kuchipudi & Qawwali Nights',
        category: 'Classical & Sufi Musical Arts',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Kuchipudi_Dance_Performance_by_V_Anjana_Devi_at_Ravindra_Bharathi_Hyderabad.jpg',
        description: 'Classical Andhra Kuchipudi recitals and Thursday night Sufi Qawwali devotional gatherings at Dargah Yousufain.',
        instruments: 'Harmonium, tabla, mridangam, kartal.',
        whereToWatch: 'Shilparamam Madhapur & Nampally Dargah.'
      }
    ],
    events: [
      {
        id: 'hyd-ev-1',
        title: 'Shilparamam All-India Craft Mela',
        venue: 'Shilparamam Cultural Village, Madhapur',
        date: 'This Weekend (10:30 AM – 08:30 PM)',
        category: 'Crafts & Folk Performances',
        ticketPrice: '₹60',
        description: 'Over 500 master weavers, Bidri craft artisans, and folk dancers showcasing India’s rural crafts.'
      }
    ],
    languagePhrases: [
      { english: 'Hello / Greetings', kannada: 'నమస్కారం / آداب', pronunciation: 'Namaskāram (Telugu) / Ādāb (Urdu)', meaning: 'Respectful greeting', context: 'Everyday meetings' },
      { english: 'How much is this?', kannada: 'ఇది ఎంత? / یہ کتنے کا ہے؟', pronunciation: 'Idi entha? / Ye kitne ka hai?', meaning: 'Price inquiry', context: 'Laad Bazaar shopping' },
      { english: 'Where is Charminar?', kannada: 'చార్మినార్ ఎక్కడ ఉంది?', pronunciation: 'Charminar ekkada undi?', meaning: 'Asking location', context: 'Navigation' }
    ],
    foodMap: [
      { id: 'hmap-1', area: 'Old City / Charminar Food Walk', neighborhood: 'Ghansi Bazaar & Nayapul', timings: '06:00 PM – 02:00 AM', mustEat: 'Dum Biryani, Nihari Kulcha, Mulberry Malai', vibe: 'Historic night bazaar buzzing with energy', highlightDish: 'Mutton Biryani & Irani Chai' }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Day 1: Nizami Palaces & Charminar Midnight Walk',
        theme: 'Asaf Jahi Royalty & Pearl Markets',
        schedule: [
          { period: 'Morning', time: '09:00 AM – 01:00 PM', activity: 'Chowmahalla Palace & Mecca Masjid', description: 'Tour the grand durbar halls, vintage cars, and ancient prayer courtyards.', tag: 'Palace' },
          { period: 'Afternoon', time: '01:30 PM – 04:30 PM', activity: 'Dum Biryani at Shadab & Salar Jung Museum', description: 'Relish slow-cooked biryani followed by the world-famous Veiled Rebecca marble statue.', tag: 'Food & Art' },
          { period: 'Evening', time: '05:30 PM – 09:30 PM', activity: 'Charminar Sunset & Laad Bazaar Bangle Walk', description: 'Sip hot Irani chai at Nimrah and shop for pearls.', tag: 'Culture' }
        ]
      }
    ]
  },

  // ════════════ CHENNAI ════════════
  Chennai: {
    city: 'Chennai',
    officialName: 'Chennai',
    state: 'Tamil Nadu',
    tagline: 'Gateway to South Indian Classical Arts & Dravidian Temples',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&auto=format&fit=crop&q=80',
    introQuote: 'Where soaring multi-tiered gopurams whisper ancient hymns, the Coromandel breeze cools Marina Beach, and Carnatic violins harmonize with the clinking of brass coffee dabarahs.',
    shortDescription: 'The soul of Tamil heritage and Carnatic classical music, Chennai bridges millennium-old Dravidian temple architecture with colonial seaside forts and rich culinary traditions.',
    places: [
      {
        id: 'chn-pl-1',
        name: 'Kapaleeshwarar Temple',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'Ancient 7th-century Dravidian temple in Mylapore featuring a 37-meter rainbow gopuram adorned with thousands of painted stucco mythological sculptures.',
        location: 'Mylapore, Chennai',
        openingHours: '06:00 AM – 12:30 PM, 04:00 PM – 09:00 PM',
        entryFee: 'Free entry',
        category: 'Dravidian Temple Heritage',
        highlight: 'The sacred temple tank (Theppakulam) and evening camphor aartis.'
      },
      {
        id: 'chn-pl-2',
        name: 'Marina Beach & Promenade',
        imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'World’s second-longest natural urban beach stretching 13 km along the Bay of Bengal, dotted with historic bronze statues and lively evening sundal stalls.',
        location: 'Kamarajar Promenade',
        openingHours: 'Open 24 hours (Brisk morning walks)',
        entryFee: 'Free entry',
        category: 'Seaside Heritage Promenade',
        highlight: 'Climbing the 1976 Marina Lighthouse for sweeping panoramic coastal vistas.'
      }
    ],
    foods: [
      {
        id: 'chn-fd-1',
        name: 'Mylapore Filter Kaapi & Crispy Medu Vada',
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
        description: 'Freshly roasted chicory-coffee decoction frothed with boiled milk in brass dabarah-tumbler, accompanied by golden-crusted black gram vadas and coconut chutney.',
        recommendedPlaces: 'Rayar’s Mess (Mylapore), Ratna Café (Triplicane), Murugan Idli Shop',
        approxPrice: '₹40 – ₹90',
        mealType: 'Sacred Morning Breakfast'
      },
      {
        id: 'chn-fd-2',
        name: 'Chettinad Spicy Pepper Chicken & Parotta',
        imageUrl: 'https://images.unsplash.com/photo-1628003664724-5d9c79e5d4cb?w=800&auto=format&fit=crop&q=80',
        description: 'Tender chicken braised with freshly ground black peppercorns, star anise, kalpasi (stone flower), and curry leaves with flaky layered parottas.',
        recommendedPlaces: 'Anjappar (T. Nagar), Kaaraikudi, Velu Military Hotel',
        approxPrice: '₹180 – ₹320',
        mealType: 'Feast of the Chettiars'
      }
    ],
    culture: {
      traditions: ['Margazhi Carnatic Music Season (world’s largest classical festival)', 'Wearing silk Kanchipuram sarees', 'Morning rice-flour Kolams on doorsteps'],
      festivals: [{ name: 'Pongal', description: 'Four-day harvest celebration boiling fresh sweet rice and jaggery in decorated clay pots to thank the Sun God.' }],
      languages: 'Tamil is the mother tongue; English is widely spoken in all commercial and cultural institutions.',
      culturalPractices: ['Attending Carnatic sabhas with jasmine flowers in hair', 'Evening beach walks eating roasted corn and sundal'],
      customs: ['Dress respectfully with shoulders covered when entering Dravidian temples', 'Remove shoes at temple perimeters']
    },
    dancesAndArts: [
      {
        name: 'Bharatanatyam',
        category: 'Ancient Classical Dance',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Kuchipudi_Dance_Performance_by_V_Anjana_Devi_at_Ravindra_Bharathi_Hyderabad.jpg',
        description: 'The sublime classical dance form with roots in the Natya Shastra, characterized by sculptured Aramandi stances, rhythmic foot percussion, and exquisite facial abhinaya.',
        instruments: 'Mridangam, nattuvangam cymbals, Carnatic violin, and flute.',
        whereToWatch: 'Kalakshetra Foundation (Thiruvanmiyur) and The Music Academy (TTK Road).'
      }
    ],
    events: [
      {
        id: 'chn-ev-1',
        title: 'Mylapore Heritage Festival Walk',
        venue: 'Kapaleeshwarar Temple Car Street',
        date: 'This Weekend (06:30 AM & 05:00 PM)',
        category: 'Heritage Walk & Kolam Contests',
        ticketPrice: 'Free Entry',
        description: 'Guided morning walk through ancient agraharams and live Kolam competitions.'
      }
    ],
    languagePhrases: [
      { english: 'Hello / Greetings', kannada: 'வணக்கம்', pronunciation: 'Vaṇakkam', meaning: 'Universal respectful Tamil greeting', context: 'Meetings' },
      { english: 'Thank you', kannada: 'நன்றி', pronunciation: 'Naṉṟi', meaning: 'Expressing gratitude', context: 'Service or meal' },
      { english: 'How much is this?', kannada: 'இது எவ்வளவு?', pronunciation: 'Ithu evvaḷavu?', meaning: 'Price inquiry', context: 'T. Nagar shopping' }
    ],
    foodMap: [
      { id: 'cmap-1', area: 'Mylapore Mada Streets', neighborhood: 'Kapaleeshwarar Temple Perimeter', timings: '06:30 AM – 10:00 PM', mustEat: 'Rayar’s Pongal, Rose Milk, Ghee Podi Dosa', vibe: 'Timeless temple town feel', highlightDish: 'Filter Kaapi & Ghee Roast' }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Day 1: Dravidian Temples & Classical Melody',
        theme: 'Ancient Gopurams & Margazhi Heritage',
        schedule: [
          { period: 'Morning', time: '07:00 AM – 11:30 AM', activity: 'Kapaleeshwarar Darshan & Rayar’s Mess Breakfast', description: 'Witness temple morning aarti and enjoy melt-in-mouth vadas.', tag: 'Temple' },
          { period: 'Evening', time: '04:30 PM – 08:30 PM', activity: 'Marina Beach Stroll & Bharatanatyam Recital', description: 'Taste spicy sundal at Marina beach, then attend a recital at Kalakshetra.', tag: 'Dance' }
        ]
      }
    ]
  },

  // ════════════ MUMBAI ════════════
  Mumbai: {
    city: 'Mumbai',
    officialName: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'City of Victorian Gothic Grandeur & Coastal Heritage',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1600&auto=format&fit=crop&q=80',
    introQuote: 'The maximum city where Arabian sea waves crash against Marine Drive tetrapods, the aroma of spicy Vada Pav rules the bustling local train stations, and Victorian Gothic arches cradle timeless dreams.',
    shortDescription: 'India’s vibrant financial and cinematic capital, Mumbai blends UNESCO Victorian Gothic architecture, historic Parsi Irani teahouses, and Koli fishing heritage.',
    places: [
      {
        id: 'bom-pl-1',
        name: 'Gateway of India',
        imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'Colossal Indo-Saracenic basalt arch built overlooking Mumbai Harbour to commemorate King George V’s 1911 visit, adjacent to the historic Taj Mahal Palace Hotel.',
        location: 'Apollo Bunder, Colaba',
        openingHours: 'Open 24 hours',
        entryFee: 'Free entry (Elephanta ferry extra)',
        category: 'Colonial Seafront Monument',
        highlight: 'Ferry departures across the bay to 6th-century Elephanta rock caves.'
      },
      {
        id: 'bom-pl-2',
        name: 'Marine Drive & Queen’s Necklace',
        imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'Iconic 3.6-kilometer arc-shaped seaside promenade lined with UNESCO-listed Art Deco apartment blocks that glow like a necklace at dusk.',
        location: 'South Mumbai Promenade',
        openingHours: 'Open 24 hours',
        entryFee: 'Free entry',
        category: 'Art Deco & Coastal Promenade',
        highlight: 'Chilly sea breeze and sunset views over Chowpatty beach.'
      }
    ],
    foods: [
      {
        id: 'bom-fd-1',
        name: 'Iconic Mumbai Vada Pav & Cutting Chai',
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
        description: 'Golden spiced potato dumpling in a soft pao smeared with garlic-chilli dry powder and fiery green coriander chutney, downed with ginger cutting chai.',
        recommendedPlaces: 'Ashok Vada Pav (Kirti College, Dadar), Aram (CSMT), Anand Vada Pav (Vile Parle)',
        approxPrice: '₹20 – ₹45',
        mealType: 'The Heartbeat Street Snack'
      },
      {
        id: 'bom-fd-2',
        name: 'Irani Bun Maska & Kheema Pav',
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
        description: 'Warm crusty buns heavily buttered and dipped into sweet Irani chai, or spicy minced mutton kheema simmered with onions and local spices.',
        recommendedPlaces: 'Kyani & Co. (Marine Lines), Britannia & Co. (Ballard Estate), Yazdani Bakery',
        approxPrice: '₹70 – ₹220',
        mealType: 'Centenary Parsi-Irani Café Soul'
      }
    ],
    culture: {
      traditions: ['Ganesh Chaturthi ocean immersions', 'Dabbawala 130-year-old meal delivery marvel', 'Evening Marine Drive addas'],
      festivals: [{ name: 'Ganesh Utsav', description: 'Ten-day civic festival where giant clay idols of Lord Ganesha are worshipped with dhol-tasha beats before grand sea visarjans.' }],
      languages: 'Marathi is the official state language; Hindi, English, and Gujarati are spoken everywhere.',
      culturalPractices: ['Catching suburban local trains during off-peak hours to observe city rhythms', 'Sipping cutting chai on roadside tea stalls'],
      customs: ['Local train commuting etiquette: stand on the left, let commuters disembark first', 'Autos and taxis run strictly by digital meter']
    },
    dancesAndArts: [
      {
        name: 'Lavani & Koli Folk Arts',
        category: 'Folk Rhythm & Dance',
        imageUrl: '/images/dances/lavani.jpg',
        description: 'Lavani is Maharashtra’s spirited folk dance celebrated for rapid dholki beats, nine-yard Nauvari sarees, and romantic-satirical poetic themes.',
        instruments: 'Dholki, manjira, and ghungroos.',
        whereToWatch: 'NCPA (Nariman Point) and Shivaji Mandir (Dadar).'
      }
    ],
    events: [
      {
        id: 'bom-ev-1',
        title: 'Kala Ghoda Heritage Art Walk',
        venue: 'Kala Ghoda Art Precinct, Fort',
        date: 'Every Weekend (04:00 PM)',
        category: 'Art Galleries & Victorian Walk',
        ticketPrice: 'Free Entry',
        description: 'Explore gothic library arches, contemporary art galleries, and boutique cafes.'
      }
    ],
    languagePhrases: [
      { english: 'Hello / Greetings', kannada: 'नमस्कार', pronunciation: 'Namaskār', meaning: 'Universal Marathi greeting', context: 'Everyday meetings' },
      { english: 'How much is it?', kannada: 'हे किती रुपयांचे आहे?', pronunciation: 'He kiti rupayānche āhe?', meaning: 'Price query', context: 'Colaba Causeway shopping' },
      { english: 'Thank you', kannada: 'धन्यवाद', pronunciation: 'Dhanyavād', meaning: 'Gratitude', context: 'Taxis or food stalls' }
    ],
    foodMap: [
      { id: 'bmap-1', area: 'Fort & Colaba Heritage Trail', neighborhood: 'South Mumbai', timings: '08:00 AM – 11:30 PM', mustEat: 'Bun Maska at Kyani, Bademiya Chicken Baida Roti, Leopold Beer & Chill', vibe: 'Colonial cafes and late-night grill stalls', highlightDish: 'Bun Maska & Pav Bhaji' }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Day 1: Victorian Gothic Grandeur & Marine Drive Sunsets',
        theme: 'Colonial Heritage & Arabian Sea Coastal Vibes',
        schedule: [
          { period: 'Morning', time: '08:30 AM – 12:30 PM', activity: 'Gateway of India & Colaba Heritage Walk', description: 'Gaze at the Taj Mahal Palace hotel and cruise past colonial arches.', tag: 'Monument' },
          { period: 'Evening', time: '05:00 PM – 09:30 PM', activity: 'Sunset at Marine Drive & Pav Bhaji at Chowpatty', description: 'Sit on the tetrapods and savor butter-soaked Pav Bhaji under city lights.', tag: 'Coastal' }
        ]
      }
    ]
  },

  // ════════════ DELHI ════════════
  Delhi: {
    city: 'Delhi',
    officialName: 'New Delhi / Delhi NCR',
    state: 'Delhi',
    tagline: 'Imperial Capital of Seven Historic Empires',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&auto=format&fit=crop&q=80',
    introQuote: 'Where millennia of dynastic power echo from sandstone ramparts, fragrant paranthas sizzle in Chandni Chowk alleys, and Sufi qawwalis echo into the mystic night at Hazrat Nizamuddin.',
    shortDescription: 'One of the world’s oldest continuously inhabited capitals, Delhi bridges grand Mughal citadels, serene Sufi shrines, broad Lutyens boulevards, and legendary North Indian street food.',
    places: [
      {
        id: 'del-pl-1',
        name: 'Red Fort (Lal Qila)',
        imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'Magnificent 17th-century red sandstone fortress constructed by Mughal Emperor Shah Jahan, featuring the Diwan-i-Aam and Lahori Gate.',
        location: 'Chandni Chowk, Old Delhi',
        openingHours: '09:30 AM – 05:30 PM (Closed Mondays)',
        entryFee: '₹50 (Indians)',
        category: 'Mughal Imperial Fortress',
        highlight: 'The Meena Bazaar indoor market and sound & light show.'
      },
      {
        id: 'del-pl-2',
        name: 'Humayun’s Tomb',
        imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'UNESCO World Heritage precursor to the Taj Mahal, showcasing red sandstone charbagh garden layout and Persian white marble dome.',
        location: 'Mathura Road, Nizamuddin East',
        openingHours: '06:00 AM – 06:00 PM (Daily)',
        entryFee: '₹40 (Indians)',
        category: 'UNESCO Mughal Garden Tomb',
        highlight: 'Serene geometric water channels and Persian symmetrical architecture.'
      }
    ],
    foods: [
      {
        id: 'del-fd-1',
        name: 'Chole Bhature & Lassi',
        imageUrl: 'https://images.unsplash.com/photo-1628003664724-5d9c79e5d4cb?w=800&auto=format&fit=crop&q=80',
        description: 'Fluffy balloon-like deep fried leavened bread served with spicy dark chickpeas simmered in amchur and anardana spices, pickled carrots, and sweet creamy lassi.',
        recommendedPlaces: 'Sita Ram Diwan Chand (Paharganj), Chache Di Hatti (Kamla Nagar)',
        approxPrice: '₹90 – ₹160',
        mealType: 'Legendary Delhi Breakfast'
      },
      {
        id: 'del-fd-2',
        name: 'Old Delhi Butter Chicken & Paranthas',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
        description: 'Tandoori chicken pulled and simmered in a velvety tomato-butter-fenugreek gravy, paired with stuffed paranthas from Paranthe Wali Gali.',
        recommendedPlaces: 'Moti Mahal (Daryaganj), Karim’s (Jama Masjid), Pt. Gaya Prasad Paranthe Wale',
        approxPrice: '₹220 – ₹450',
        mealType: 'Mughlai Culinary Legend'
      }
    ],
    culture: {
      traditions: ['Thursday evening Sufi Qawwali at Nizamuddin Dargah', 'Winter morning walks around Lodhi Garden heritage tombs', 'Old Delhi rickshaw food trails'],
      festivals: [{ name: 'Diwali & Eid', description: 'Celebrated across Chandni Chowk and Jama Masjid with illuminated streets, fireworks, and shared sweets.' }],
      languages: 'Hindi, English, Urdu, and Punjabi are all widely spoken in everyday life.',
      culturalPractices: ['Bargaining at Sarojini Nagar and Dilli Haat', 'Sharing steaming hot kulhad chai in winter mornings'],
      customs: ['Dress modestly when visiting Jama Masjid or Gurudwara Bangla Sahib (head coverings provided)', 'Remove footwear before sanctums']
    },
    dancesAndArts: [
      {
        name: 'Kathak & Sufi Qawwali',
        category: 'Classical Dance & Mystic Music',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
        description: 'Kathak showcases rapid rhythmic spins (chakkars) and tatkar footwork, while Sufi Qawwali connects devotional poetry to acoustic percussion.',
        instruments: 'Tabla, harmonium, sarangi, and vocal Bols.',
        whereToWatch: 'Kamani Auditorium and India Habitat Centre.'
      }
    ],
    events: [
      {
        id: 'del-ev-1',
        title: 'Dilli Haat National Handicrafts Fair',
        venue: 'Dilli Haat, INA Market',
        date: 'Daily (10:30 AM – 10:00 PM)',
        category: 'Handicrafts & State Cuisines',
        ticketPrice: '₹30',
        description: 'Artisans from all 28 Indian states demonstrating handlooms and regional foods.'
      }
    ],
    languagePhrases: [
      { english: 'Hello / Greetings', kannada: 'नमस्ते / सलाम', pronunciation: 'Namaste / Salām', meaning: 'Universal North Indian greeting', context: 'Everyday meetings' },
      { english: 'How much does this cost?', kannada: 'यह कितने का है?', pronunciation: 'Yeh kitne ka hai?', meaning: 'Price query', context: 'Chandni Chowk shopping' },
      { english: 'Where is the metro station?', kannada: 'मेट्रो स्टेशन कहाँ है?', pronunciation: 'Metro station kahāṅ hai?', meaning: 'Transit navigation', context: 'Commute' }
    ],
    foodMap: [
      { id: 'dmap-1', area: 'Chandni Chowk & Jama Masjid Alleys', neighborhood: 'Old Delhi', timings: '09:00 AM – 11:30 PM', mustEat: 'Rabri Jalebi at Old Famous, Karim’s Mutton Korma, Natraj Dahi Bhalla', vibe: 'Epicenter of 400-year-old food heritage', highlightDish: 'Paranthas & Kebabs' }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Day 1: Mughal Citadel & Shahjahanabad Food Odyssey',
        theme: 'Imperial Forts & Historic Bazaars',
        schedule: [
          { period: 'Morning', time: '09:00 AM – 01:00 PM', activity: 'Red Fort & Jama Masjid Tour', description: 'Explore Mughal royal pavilions and gaze at Old Delhi from Jama Masjid minaret.', tag: 'Mughal' },
          { period: 'Evening', time: '04:30 PM – 08:30 PM', activity: 'Chandni Chowk Rickshaw Food Crawl', description: 'Devour hot jalebis, dahi bhallas, and paranthas in the ancient lanes.', tag: 'Street Food' }
        ]
      }
    ]
  },

  // ════════════ GOA ════════════
  Goa: {
    city: 'Goa',
    officialName: 'Goa',
    state: 'Goa',
    tagline: 'Heritage of Latin Baroque Churches & Coastal Forts',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&auto=format&fit=crop&q=80',
    introQuote: 'Where 450 years of Portuguese-Latin architecture meet golden Arabian sands, coconut palms sway over painted villas, and Konkani sussegado transforms travel into pure coastal serenity.',
    shortDescription: 'Famous for UNESCO Baroque cathedrals, clifftop bastions like Aguada, pastel-hued Fontainhas quarters, and world-class Indo-Portuguese seafood curries.',
    places: [
      {
        id: 'goa-pl-1',
        name: 'Basilica of Bom Jesus',
        imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'UNESCO World Heritage 1605 Baroque cathedral in Old Goa holding the sacred mortal remains of St. Francis Xavier in a silver casket.',
        location: 'Old Goa (Velha Goa)',
        openingHours: '09:00 AM – 06:30 PM (Sundays from 10:30 AM)',
        entryFee: 'Free entry',
        category: 'UNESCO Baroque Cathedral',
        highlight: 'Intricately carved gilded altarpiece and Florentine marble mausoleum.'
      },
      {
        id: 'goa-pl-2',
        name: 'Fontainhas Latin Quarter',
        imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=80',
        shortDescription: 'Asia’s only surviving Latin quarter, lined with vivid terracotta, indigo, and canary-yellow Portuguese mansions with wrought-iron balconies.',
        location: 'Panaji, Goa',
        openingHours: 'Open 24 hours (Best explored on foot in morning)',
        entryFee: 'Free entry',
        category: 'Indo-Portuguese Urban Heritage',
        highlight: 'Art galleries, fado music bistros, and centenary bakeries.'
      }
    ],
    foods: [
      {
        id: 'goa-fd-1',
        name: 'Authentic Goan Fish Curry Thali',
        imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&auto=format&fit=crop&q=80',
        description: 'Fresh kingfish or pomfret simmered in grated coconut, fiery Kashmiri chillies, and sour kokum berries, served with red rice and fried fish.',
        recommendedPlaces: 'Vinayak Family Restaurant (Assagao), Ritz Classic (Panaji), Fisherman’s Wharf',
        approxPrice: '₹180 – ₹320',
        mealType: 'Coastal Konkani Staple'
      },
      {
        id: 'goa-fd-2',
        name: 'Traditional Bebinca & Poee with Chorizo',
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
        description: 'Multi-layered Indo-Portuguese pudding baked with coconut milk, egg yolks, and nutmeg, accompanied by freshly baked crusty poee bread.',
        recommendedPlaces: 'Viva Panjim, Confeitaria 31 De Janeiro (Fontainhas)',
        approxPrice: '₹120 – ₹240',
        mealType: 'Portuguese-Goan Heritage Sweet'
      }
    ],
    culture: {
      traditions: ['Sussegado lifestyle (relaxed, unhurried appreciation of life)', 'Tiatr theatre', 'Fado guitar serenades'],
      festivals: [{ name: 'Shigmo Spring Festival & Carnival', description: 'Vibrant spring festival celebrating mythological folk dance troupes, colorful floats, and brass bands.' }],
      languages: 'Konkani is the official state language; English, Marathi, and Portuguese are also spoken.',
      culturalPractices: ['Afternoon siesta between 1:30 PM and 4:00 PM', 'Visiting village bakeries for hot morning poee bread'],
      customs: ['Dress respectfully when visiting churches and temple sanctums', 'Respect protected coastal sand dunes']
    },
    dancesAndArts: [
      {
        name: 'Fugdi & Dekhnni',
        category: 'Goan Coastal Folk Dance',
        imageUrl: '/images/dances/fugdi.jpg',
        description: 'Fugdi is performed by women clapping and blowing through hands in sync to rhythmic folk songs, while Dekhnni depicts temple dancer traditions accompanied by the Ghumat clay drum.',
        instruments: 'Ghumat (clay monitor-lizard skin drum), Kansallem (cymbals), and violin.',
        whereToWatch: 'Shigmo cultural parades and Goa Chitra Museum events.'
      }
    ],
    events: [
      {
        id: 'goa-ev-1',
        title: 'Fontainhas Heritage Walking Tour',
        venue: 'Panaji Post Office Square',
        date: 'Every Morning (08:30 AM)',
        category: 'Latin Heritage & Architecture',
        ticketPrice: '₹400 per person',
        description: 'Guided architectural walk exploring 18th-century Portuguese chapels and azulejos ceramic tile art.'
      }
    ],
    languagePhrases: [
      { english: 'Hello / How are you?', kannada: 'ದೇವ್ ಬೋರೆಂ ಕರುಂ / ಕಸೊ ಆಸಾ?', pronunciation: 'Dev borem korum / Koso asa?', meaning: 'God bless you / How are you?', context: 'Warm Konkani greeting' },
      { english: 'Thank you', kannada: 'ದೇವ್ ಬೋರೆಂ ಕರುಂ', pronunciation: 'Dev borem korum', meaning: 'May God do good to you (Thank you)', context: 'Everyday gratitude' },
      { english: 'How much?', kannada: 'ಕೇತ್ಲೆ?', pronunciation: 'Kitle?', meaning: 'Price query', context: 'Mapusa market' }
    ],
    foodMap: [
      { id: 'gmap-1', area: 'Fontainhas & Panaji Riverfront', neighborhood: 'Panaji', timings: '08:00 AM – 11:00 PM', mustEat: 'Bebinca at 31 De Janeiro, Pork Vindaloo at Viva Panjim, Poee Sandwiches', vibe: 'Cobblestone streets with pastel cottages', highlightDish: 'Fish Curry Thali & Bebinca' }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Day 1: UNESCO Baroque Cathedrals & Latin Quarters',
        theme: '450 Years of Indo-Portuguese Heritage',
        schedule: [
          { period: 'Morning', time: '09:00 AM – 01:00 PM', activity: 'Old Goa Basilica of Bom Jesus & Se Cathedral', description: 'Admire gilded altars, historical bell towers, and sacred relics.', tag: 'UNESCO' },
          { period: 'Evening', time: '04:00 PM – 08:30 PM', activity: 'Fontainhas Walk & Traditional Goan Dinner', description: 'Walk through pastel-painted lanes and enjoy authentic fish curry at Viva Panjim.', tag: 'Heritage' }
        ]
      }
    ]
  }
};

// Fallback generator for ANY other destination (e.g. Kochi, Mysore, Jaipur, Kolkata, Varanasi, etc.)
export const getDestinationCulture = (destinationName = 'Bangalore') => {
  const norm = normalizeCity(destinationName);

  if (DESTINATION_CULTURE_DATA[norm]) {
    return DESTINATION_CULTURE_DATA[norm];
  }

  // Smart dynamic builder for other cities
  return {
    city: norm,
    officialName: norm,
    state: 'India',
    tagline: `Cultural Exploration & Heritage of ${norm}`,
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1600&auto=format&fit=crop&q=80',
    introQuote: `Immerse yourself in the authentic historical monuments, traditional cuisines, time-honored folk arts, and vibrant local spirit of ${norm}.`,
    shortDescription: `A cultural destination brimming with ancient heritage, local craftsmanship, regional gastronomical wonders, and friendly people eager to share their folklore.`,
    places: [
      {
        id: `gen-pl-1-${norm}`,
        name: `${norm} Historic Heritage Monument`,
        imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop&q=80',
        shortDescription: `The iconic architectural landmark of ${norm}, celebrated for centuries-old stonework and cultural importance.`,
        location: `Central ${norm}`,
        openingHours: '09:00 AM – 06:00 PM (Daily)',
        entryFee: '₹25 – ₹50 (Indians)',
        category: 'Historical Landmark',
        highlight: `Stunning 360-degree views of the historic old city and local marketplace.`
      },
      {
        id: `gen-pl-2-${norm}`,
        name: `${norm} Heritage Museum & Gardens`,
        imageUrl: 'https://images.unsplash.com/photo-1580294658515-63f052988821?w=800&auto=format&fit=crop&q=80',
        shortDescription: `Botanical and historical museum preserving antique royal regalia, manuscripts, and regional archaeological sculptures.`,
        location: `Museum Enclave, ${norm}`,
        openingHours: '10:00 AM – 05:30 PM',
        entryFee: '₹30 per visitor',
        category: 'Museum & Heritage Garden',
        highlight: 'Curated galleries depicting royal history and regional freedom movement archives.'
      },
      {
        id: `gen-pl-3-${norm}`,
        name: `Grand Temple & Spiritual Ghats of ${norm}`,
        imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80',
        shortDescription: `Ancient sanctuary renowned for intricate stone carvings, peaceful meditation halls, and evening lamp aartis.`,
        location: `Old Town, ${norm}`,
        openingHours: '06:00 AM – 08:30 PM',
        entryFee: 'Free entry',
        category: 'Spiritual & Temple Architecture',
        highlight: 'Atmospheric evening bells and devotional hymns during twilight.'
      }
    ],
    foods: [
      {
        id: `gen-fd-1-${norm}`,
        name: `${norm} Traditional Signature Thali`,
        imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&auto=format&fit=crop&q=80',
        description: `Grand platter featuring local breads, spiced lentils, seasonal vegetable gravies, aromatic rice, and sweet dishes prepared with local recipes.`,
        recommendedPlaces: `Heritage Mess & Local Restaurants in ${norm}`,
        approxPrice: '₹120 – ₹220',
        mealType: 'Regional Traditional Lunch'
      },
      {
        id: `gen-fd-2-${norm}`,
        name: `Famous ${norm} Street Snack & Chai`,
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
        description: `Crispy spiced savory snacks served hot off the pan with tangy tamarind and mint chutneys, accompanied by spiced clay-cup chai.`,
        recommendedPlaces: `Main Market & Clock Tower Square`,
        approxPrice: '₹30 – ₹70',
        mealType: 'Iconic Evening Street Food'
      }
    ],
    culture: {
      traditions: [`Traditional morning market addas and welcoming regional hospitality`, `Handloom textile and handicraft heritage`],
      festivals: [
        { name: `${norm} Cultural Utsav`, description: `Annual state festival celebrating folk dances, craft exhibitions, and regional musical concerts.` }
      ],
      languages: `Regional state language and Hindi; English commonly spoken in hotels and transport hubs.`,
      culturalPractices: ['Greeting with folded hands (Namaste / Vanakkam / Namaskara)', 'Supporting local family-run eateries'],
      customs: ['Dress modestly when entering place of worship', 'Remove footwear outside holy sanctums']
    },
    dancesAndArts: [
      {
        name: `${norm} Regional Classical & Folk Dance`,
        category: 'Traditional Performing Arts',
        imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
        description: `Rhythmic folk and classical dances celebrating harvest seasons, epics, and local mythology through colorful costumes and lively drumming.`,
        instruments: 'Traditional drums, cymbals, flutes, and harmonium.',
        whereToWatch: `Town Cultural Auditorium & Open-air Heritage Enclaves.`
      }
    ],
    events: [
      {
        id: `gen-ev-1-${norm}`,
        title: `${norm} Heritage & Food Festival`,
        venue: `Town Hall Grounds, ${norm}`,
        date: 'This Weekend (11:00 AM – 09:00 PM)',
        category: 'Cultural Fair & Culinary Stalls',
        ticketPrice: '₹50 Entry',
        description: `Gathering of local artisans, folk troupes, and renowned cooks celebrating the culture of ${norm}.`
      }
    ],
    languagePhrases: [
      { english: 'Hello / Greetings', kannada: 'नमस्ते / வணக்கம்', pronunciation: 'Namaste / Namaskara', meaning: 'Polite respectful greeting', context: 'Everyday meetings' },
      { english: 'Thank you very much', kannada: 'धन्यवाद / நன்றி', pronunciation: 'Dhanyavād / Nandri', meaning: 'Expressing gratitude', context: 'After receiving assistance' },
      { english: 'How much is this?', kannada: 'यह कितने का है?', pronunciation: 'Yeh kitne ka hai?', meaning: 'Price question', context: 'Local shopping' },
      { english: 'Where is this place?', kannada: 'यह जगह कहाँ है?', pronunciation: 'Yeh jagah kahān hai?', meaning: 'Navigation question', context: 'Asking directions' },
      { english: 'I need help', kannada: 'मुझे मदद चाहिए', pronunciation: 'Mujhe madad chahiye', meaning: 'Requesting aid', context: 'Assistance' }
    ],
    foodMap: [
      { id: `gmap-gen-${norm}`, area: `${norm} Main Bazaar & Food Street`, neighborhood: `Old Town Center`, timings: '05:30 PM – 11:00 PM', mustEat: 'Traditional Sweets, Regional Savories, Hot Chai', vibe: 'Bustling bazaar lined with decades-old vendors', highlightDish: 'Signature Local Thali' }
    ],
    itinerary: [
      {
        day: 1,
        title: `Day 1: Historic Landmarks & Old Bazaar Flavors`,
        theme: `Introduction to the Heart of ${norm}`,
        schedule: [
          { period: 'Morning', time: '09:00 AM – 12:30 PM', activity: `Explore ${norm} Historic Fort & Architecture`, description: `Marvel at the ancient stonework and city views.`, tag: 'Heritage' },
          { period: 'Afternoon', time: '01:00 PM – 04:00 PM', activity: `Authentic Regional Lunch & Museum Visit`, description: `Taste local specialties and visit historical galleries.`, tag: 'Food & Art' },
          { period: 'Evening', time: '05:00 PM – 08:30 PM', activity: `Bazaar Walk & Evening Cultural Performance`, description: `Stroll through the bustling markets and enjoy live folk music.`, tag: 'Culture' }
        ]
      }
    ]
  };
};
