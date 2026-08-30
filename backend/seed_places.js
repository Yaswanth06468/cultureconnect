import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Place from './models/Place.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const seedPlaces = [
  // HYDERABAD
  {
    name: 'Charminar',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The quintessential 16th-century symbol of Hyderabad, boasting four grand 56-meter minarets, intricate stucco ornamentation, and bustling historical bazaars.',
    fullDescription: 'Charminar (literally "Four Minarets") is an architectural and historical marvel built in 1591 CE by Muhammad Quli Qutb Shah, the fifth ruler of the Qutb Shahi dynasty. Constructed to commemorate the eradication of a devastating plague and mark the founding of Hyderabad, the monument stands at the historic crossroads of royal trade routes. Surrounded by the lively Laad Bazaar and Mecca Masjid, Charminar continues to be the beating cultural heart of Hyderabad.',
    history: 'Constructed in 1591 CE, Charminar was built when Sultan Muhammad Quli Qutb Shah shifted his capital from the cramped Golconda Fort to the newly planned city of Hyderabad along the Musi River.',
    culturalSignificance: 'Charminar is inseparable from Hyderabadi identity. During Ramzan, the surrounding lanes are illuminated for late-night shopping, Haleem stalls, and traditional Irani chai gatherings.',
    architecture: 'Built in the distinctive Indo-Islamic Qutb Shahi architectural style using granite, lime mortar, and pulverized marble. The square structure measures 20 meters on each side, with four arched gateways facing the cardinal directions.',
    thingsToSee: [
      'Upper storey prayer gallery and intricate stucco arches',
      'Panoramic 360-degree views of the old city and Mecca Masjid',
      'The central fountain (vazu) constructed for ablutions',
      'Laad Bazaar famous for handmade lac bangles and pearls just steps away'
    ],
    bestTimeToVisit: 'October to March; late afternoon (4:00 PM – 7:00 PM)',
    openingHours: '9:30 AM – 5:30 PM (Daily)',
    entryFee: '₹25 for Indians; ₹300 for Foreign Tourists',
    visitDuration: '1 – 2 hours',
    address: 'Charminar Rd, Char Kaman, Ghansi Bazaar, Hyderabad, Telangana 500002',
    latitude: 17.3616,
    longitude: 78.4747,
    images: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Mecca Masjid', 'Chowmahalla Palace', 'Laad Bazaar', 'Salar Jung Museum'],
    tags: ['Monument', 'Qutb Shahi', 'Heritage', 'Iconic', 'Bazaar'],
    famousFor: 'Iconic four-minaret Indo-Islamic architecture and Old City cultural pulse'
  },
  {
    name: 'Golconda Fort',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'A monumental 16th-century medieval citadel celebrated for ingenious acoustic engineering, formidable battlements, and its history as the trading hub for the Koh-i-Noor diamond.',
    fullDescription: 'Golconda Fort was the formidable capital citadel of the Qutb Shahi dynasty. Spanning over 11 kilometers of perimeter walls with 87 semi-circular bastions and eight massive gateway doors, Golconda was once virtually impregnable.',
    history: 'Originally erected as a mud fort by the Kakatiya rulers in the 13th century, Golconda was expanded into an impenetrable stone citadel between 1518 and 1687 by the Qutb Shahi kings.',
    culturalSignificance: 'Golconda embodies the military and cultural zenith of the Deccan Sultanates. It hosts the vibrant annual Bonalu festival celebrations at the Sri Jagadamba Mahakali Temple at the citadel summit.',
    architecture: 'Acoustic marvel: a hand-clap at the entrance portal (Fateh Darwaza) reverberates clearly at the Bala Hissar pavilion atop the hill, nearly 1 kilometer away.',
    thingsToSee: [
      'Fateh Darwaza with acoustic clap transmission to the hill peak',
      'Bala Hissar royal palace and council chambers at the summit',
      'Spectacular evening Sound and Light Show narrated in English, Hindi, and Telugu'
    ],
    bestTimeToVisit: 'October to March; late afternoon (3:00 PM – 6:30 PM)',
    openingHours: '9:00 AM – 5:30 PM (Daily); Sound & Light Show: 6:30 PM – 8:30 PM',
    entryFee: '₹25 for Indians; ₹300 for Foreigners',
    visitDuration: '2.5 – 4 hours',
    address: 'Ibrahim Bagh, Hyderabad, Telangana 500008',
    latitude: 17.3833,
    longitude: 78.4011,
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Qutb Shahi Tombs', 'Taramati Baradari', 'Charminar'],
    tags: ['Fort', 'Diamonds', 'Acoustics', 'Kakatiya', 'Qutb Shahi'],
    famousFor: 'Legendary diamond trade history, acoustic engineering, and massive stone ramparts'
  },
  {
    name: 'Chowmahalla Palace',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'The opulent seat of the Asaf Jahi Nizams, featuring classical Persian-European architecture, sparkling Belgian crystal chandeliers, and vintage royal car collections.',
    fullDescription: 'Chowmahalla Palace (meaning "Four Palaces") was the official residence and ceremonial court of the Nizams of Hyderabad. It received the prestigious UNESCO Asia-Pacific Merit Award for Cultural Heritage Conservation.',
    history: 'Constructed between 1750 and 1869, Chowmahalla served as the venue for royal accessions, banquets for British viceroys, and grand state receptions.',
    culturalSignificance: 'Showcases the unparalleled wealth, refinement, and cosmopolitan aesthetic of the Nizams of Hyderabad.',
    architecture: 'A synthesis of Neoclassical European, Mughal, and Persian court architectural styles. The Khilwat Mubarak boasts 19 spectacular Belgian crystal chandeliers.',
    thingsToSee: [
      'Khilwat Mubarak Grand Durbar Hall with 19 Belgian chandeliers',
      'Vintage Cars Gallery including the 1912 Rolls-Royce Silver Ghost',
      'Clock Tower containing a 250-year-old mechanical clock'
    ],
    bestTimeToVisit: 'October to February (10:00 AM – 3:00 PM)',
    openingHours: '10:00 AM – 5:00 PM (Closed on Fridays)',
    entryFee: '₹100 for Indians; ₹400 for Foreigners',
    visitDuration: '2 – 3 hours',
    address: '20-4-236, Motigalli, Khilwat, Hyderabad, Telangana 500002',
    latitude: 17.3578,
    longitude: 78.4717,
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Charminar', 'Mecca Masjid', 'Laad Bazaar'],
    tags: ['Palace', 'Nizam', 'Royal', 'Belgian Chandeliers', 'Vintage Cars'],
    famousFor: 'Opulent Khilwat Durbar Hall, Belgian chandeliers, and the 1912 royal Rolls-Royce'
  },
  {
    name: 'Salar Jung Museum',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Museum & Heritage',
    shortDescription: 'One of the world\'s largest single-person art collections, housing over 40,000 rare artifacts, the Veiled Rebecca marble statue, and the famous British Musical Clock.',
    fullDescription: 'The Salar Jung Museum contains the priceless personal collection of Nawab Mir Yousuf Ali Khan (Salar Jung III), spanning 38 galleries across Indian, Western, and Eastern sections.',
    history: 'Salar Jung III devoted 40 years to assembling art treasures from across Asia, Europe, and the Middle East. Declared an Institution of National Importance in 1961.',
    culturalSignificance: 'A testament to the global cultural horizons and patronization of arts in princely Hyderabad.',
    architecture: 'Semi-circular grand modern structure along the Musi River housing 38 thematic galleries.',
    thingsToSee: [
      'Veiled Rebecca: Giovanni Benzoni\'s 1876 translucent marble sculpture',
      'The 19th-century British Musical Clock with mechanical toy figures appearing hourly',
      'Mughal Emperor Shah Jahan\'s personal jade dagger'
    ],
    bestTimeToVisit: 'Year-round; catch the 12:00 PM musical clock chime.',
    openingHours: '10:00 AM – 5:00 PM (Closed on Fridays)',
    entryFee: '₹50 for Indian Adults; ₹500 for Foreigners',
    visitDuration: '3 – 5 hours',
    address: 'Salar Jung Marg, Darulshifa, Hyderabad, Telangana 500002',
    latitude: 17.3714,
    longitude: 78.4804,
    images: [
      'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Charminar', 'Purani Haveli', 'State Central Library'],
    tags: ['Museum', 'Art', 'Veiled Rebecca', 'Musical Clock'],
    famousFor: 'The Veiled Rebecca marble statue and the historic hourly Musical Clock'
  },
  // BENGALURU
  {
    name: 'Bengaluru Palace',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'A majestic 19th-century Tudor-style royal palace inspired by England\'s Windsor Castle, featuring fortified towers, stained glass, and royal hunting trophies.',
    fullDescription: 'Bengaluru Palace is a grand royal estate constructed in 1878 and purchased by Maharaja Chamarajendra Wadiyar X of Mysore. Features fortified battlements, turrets, Gothic stained glass, and wood-carved interiors.',
    history: 'Acquired by the Wadiyar royal family to serve as a royal retreat in Bengaluru, hosting state banquets, royal polo matches, and private durbars.',
    culturalSignificance: 'Preserves the living royal traditions of the Kingdom of Mysore, housing 19th-century oil paintings by Raja Ravi Varma.',
    architecture: 'Tudor and Scottish Gothic revival architectural styles with fortified crenellated towers and Romanesque arches.',
    thingsToSee: [
      'Durbar Hall with sweeping arches and ornate stained glass',
      'The royal courtyard with Moroccan ceramic mosaic tiles',
      'Raja Ravi Varma royal portrait gallery'
    ],
    bestTimeToVisit: 'October to February (10:00 AM – 4:00 PM)',
    openingHours: '10:00 AM – 5:30 PM (Daily)',
    entryFee: '₹250 for Indians; ₹450 for Foreigners',
    visitDuration: '2 – 3 hours',
    address: 'Vasanth Nagar, Bengaluru, Karnataka 560052',
    latitude: 12.9988,
    longitude: 77.5921,
    images: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Cubbon Park', 'Vidhana Soudha', 'National Gallery of Modern Art'],
    tags: ['Palace', 'Tudor', 'Wodeyar', 'Windsor Style'],
    famousFor: 'Windsor Castle-inspired Tudor architecture and Raja Ravi Varma royal paintings'
  },
  // CHENNAI
  {
    name: 'Kapaleeshwarar Temple',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'A classic 7th-century Dravidian temple in Mylapore dedicated to Lord Shiva, featuring a vibrant 37-meter rainbow gopuram, tank, and classical music traditions.',
    fullDescription: 'The Arulmigu Kapaleeshwarar Temple is the spiritual crown of Chennai, located in the ancient cultural quarter of Mylapore. Dedicated to Lord Shiva (worshipped as Kapaleeshwarar) and Goddess Parvati (Karpagambal).',
    history: 'Original shrine built in the 7th century CE by the Pallava kings along the coast; rebuilt in its current inland location by the Vijayanagara kings in the 16th century.',
    culturalSignificance: 'Epicenter of Mylapore\'s classical Carnatic music festivals and the annual 10-day Panguni Peruvizha chariot festival.',
    architecture: 'Classic Dravidian temple layout featuring a towering multi-tiered gopuram adorned with hundreds of sculpted stucco deities painted in vibrant hues.',
    thingsToSee: [
      'Soaring 120-foot East Gopuram with multi-tiered mythological sculptures',
      'Shrine of Goddess Karpagambal depicted as a peacock worshipping Shiva',
      'The expansive temple tank (kulam) reflecting surrounding gopurams'
    ],
    bestTimeToVisit: 'October to March; early morning or evening aarti',
    openingHours: '5:30 AM – 12:00 PM and 4:30 PM – 9:30 PM',
    entryFee: 'Free entry',
    visitDuration: '1 – 2 hours',
    address: '12, Vadakku Maada Veethi, Mylapore, Chennai, Tamil Nadu 600004',
    latitude: 13.0336,
    longitude: 80.2698,
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['San Thome Basilica', 'Marina Beach', 'Ramakrishna Math'],
    tags: ['Temple', 'Dravidian', 'Shiva', 'Mylapore'],
    famousFor: 'Vibrant 37m Dravidian gopuram, Panguni Peruvizha festival, and Mylapore heritage'
  },
  // MUMBAI
  {
    name: 'Gateway of India',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The 26-meter monumental stone arch overlooking Mumbai Harbour, built to commemorate King George V\'s 1911 visit, where the last British troops departed India in 1948.',
    fullDescription: 'The Gateway of India is an iconic basalt stone arch monument erected at Apollo Bunder overlooking the Arabian Sea, completed in 1924.',
    history: 'Inaugurated in 1924, it served as the ceremonial landing portal for British viceroys and the departure exit for the last British troops on February 28, 1948.',
    culturalSignificance: 'The defining symbol of Mumbai and departure point for ferries to the UNESCO World Heritage Elephanta Caves.',
    architecture: 'Indo-Saracenic style combining 16th-century Gujarati Muslim architectural elements with Roman triumphal arch proportions.',
    thingsToSee: [
      'The 26-meter-high basalt triumphal arch with 4 turrets and central dome',
      'The historic Taj Mahal Palace Hotel situated directly across the plaza',
      'Ferry boats sailing across Mumbai Harbour towards Elephanta Caves'
    ],
    bestTimeToVisit: 'October to March; sunrise or sunset',
    openingHours: 'Open 24/7',
    entryFee: 'Free entry',
    visitDuration: '1 – 2 hours',
    address: 'Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
    latitude: 18.9220,
    longitude: 72.8347,
    images: [
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Taj Mahal Palace Hotel', 'Colaba Causeway', 'CSMVS Museum'],
    tags: ['Gateway', 'Indo-Saracenic', 'Arabian Sea', 'Colaba'],
    famousFor: 'Iconic Indo-Saracenic triumphal arch and departure point of the last British troops'
  },
  // DELHI
  {
    name: 'Red Fort (Lal Qila)',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The grand 17th-century red sandstone citadel of the Mughal Empire in Old Delhi, where the Prime Minister of India unfurls the National Flag on Independence Day.',
    fullDescription: 'The Red Fort is a UNESCO World Heritage complex constructed by Mughal Emperor Shah Jahan between 1638 and 1648 when he relocated the imperial capital to Shahjahanabad.',
    history: 'Seat of Mughal power for two centuries. On August 15, 1947, Jawaharlal Nehru raised India\'s tricolor from Lahori Gate, establishing a national tradition.',
    culturalSignificance: 'The preeminent symbol of Indian sovereignty and historical pride, hosting the annual Independence Day address.',
    architecture: 'Peak Mughal architecture with octagonal towers, floral Pietra Dura inlay, marble arcades, and the Stream of Paradise water canal.',
    thingsToSee: [
      'Lahori Gate and the covered Chhatta Chowk historic bazaar',
      'Diwan-i-Aam (Hall of Public Audience) with marble canopy throne',
      'Diwan-i-Khas (Hall of Private Audience)'
    ],
    bestTimeToVisit: 'October to March; morning or late afternoon',
    openingHours: '9:30 AM – 4:30 PM (Closed on Mondays)',
    entryFee: '₹50 for Indians; ₹550 for Foreigners',
    visitDuration: '2.5 – 4 hours',
    address: 'Netaji Subhash Marg, Lal Qila, Chandni Chowk, Old Delhi, Delhi 110006',
    latitude: 28.6562,
    longitude: 77.2410,
    images: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Jama Masjid', 'Chandni Chowk', 'Raj Ghat'],
    tags: ['UNESCO', 'Mughal', 'Fort', 'Independence Day'],
    famousFor: 'Iconic red sandstone Mughal citadel and national Independence Day flag hoisting venue'
  },
  // JAIPUR
  {
    name: 'Hawa Mahal',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The 5-storey pink sandstone honeycomb facade with 953 jharokha windows, designed to allow royal Rajput ladies to observe street processions unseen.',
    fullDescription: 'Hawa Mahal (Palace of Winds) is Jaipur\'s most recognizable architectural jewel, built in 1799 by Maharaja Sawai Pratap Singh. Shaped like the crown of Lord Krishna, it rises 50 feet with 953 carved windows.',
    history: 'Constructed as an extension of the City Palace to enable royal women to watch daily bazaar street life without violating purdah customs.',
    culturalSignificance: 'The international emblem of Jaipur and Rajasthani Rajput chivalry.',
    architecture: 'Crown-shaped pyramidal structure constructed of red and pink sandstone cooled by natural aerodynamic cross-ventilation.',
    thingsToSee: [
      'The 953 jharokha windows with carved stone lattices and colored glass',
      'Panoramic rooftop view overlooking Jantar Mantar and the City Palace'
    ],
    bestTimeToVisit: 'October to March; early morning',
    openingHours: '9:00 AM – 5:00 PM (Daily)',
    entryFee: '₹50 for Indians; ₹200 for Foreigners',
    visitDuration: '1 – 2 hours',
    address: 'Hawa Mahal Rd, Badi Choupad, Pink City, Jaipur, Rajasthan 302002',
    latitude: 26.9239,
    longitude: 75.8267,
    images: [
      'https://images.unsplash.com/photo-1603288940320-9844add94772?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1603288940320-9844add94772?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['City Palace', 'Jantar Mantar', 'Johari Bazaar'],
    tags: ['Pink City', 'Jharokhas', 'Rajput', 'Iconic'],
    famousFor: 'Pyramidal honeycomb facade with 953 carved stone jharokha breeze windows'
  },
  // AGRA
  {
    name: 'Taj Mahal',
    city: 'Agra',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'One of the Seven Wonders of the World and a UNESCO World Heritage monument, built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal.',
    fullDescription: 'The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna River, commissioned in 1631 by Mughal Emperor Shah Jahan. Universally celebrated as the greatest architectural achievement in Indo-Islamic history.',
    history: 'Constructed between 1631 and 1648 CE by 20,000 artisans under court architect Ustad Ahmad Lahori.',
    culturalSignificance: 'Universally revered as the world\'s supreme monument to eternal love and designated a UNESCO World Heritage Site in 1983.',
    architecture: 'Perfect bilateral symmetry with a 35-meter white marble bulbous dome, four 40-meter minarets, and intricate Pietra Dura gemstone inlays.',
    thingsToSee: [
      'The central octagonal tomb chamber with filigree marble jali screens',
      'Exquisite Pietra Dura stone floral inlays',
      'The 300-meter Charbagh garden with central reflecting pool'
    ],
    bestTimeToVisit: 'October to March; sunrise (6:00 AM – 8:30 AM)',
    openingHours: 'Sunrise to sunset (Closed on Fridays)',
    entryFee: '₹50 for Indians; ₹1,100 for Foreigners',
    visitDuration: '2.5 – 4 hours',
    address: 'Dharmapuri, Tajganj, Agra, Uttar Pradesh 282001',
    latitude: 27.1751,
    longitude: 78.0421,
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Agra Fort', 'Mehtab Bagh', 'Itmad-ud-Daulah'],
    tags: ['UNESCO', 'Wonder of the World', 'White Marble', 'Shah Jahan'],
    famousFor: 'One of the Seven Wonders of the World and sublime white marble architecture'
  },
  // VARANASI
  {
    name: 'Kashi Vishwanath Temple',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'One of the 12 sacred Jyotirlinga shrines dedicated to Lord Shiva on the western bank of the holy Ganga, transformed with a magnificent stone corridor linking to the river.',
    fullDescription: 'The Kashi Vishwanath Temple is one of the most sacred Hindu pilgrimage shrines, dedicated to Lord Shiva as Vishveshwara. Rebuilt in 1780 by Maharani Ahilyabai Holkar of Indore with 800 kg gold shikhara donated by Maharaja Ranjit Singh.',
    history: 'Sanctified for millennia; rebuilt by Ahilyabai Holkar and expanded with the modern Kashi Vishwanath Corridor directly linking the temple to the holy river ghats.',
    culturalSignificance: 'A pilgrimage destination believed to grant Moksha (liberation) to devotees who bathe in the Ganga and offer prayers.',
    architecture: 'Nagara temple architecture with gold-plated spires and red sandstone corridor galleries.',
    thingsToSee: [
      'The sacred Jyotirlinga shrine housed in silver-adorned sanctum',
      'The 800 kg gold-plated shikhara and spire',
      'The expansive new Vishwanath Dham corridor leading down to the Ganga'
    ],
    bestTimeToVisit: 'October to March; early morning (4:00 AM – 7:00 AM)',
    openingHours: '3:00 AM – 11:00 PM (Daily)',
    entryFee: 'Free entry',
    visitDuration: '1.5 – 3 hours',
    address: 'Lahori Tola, Varanasi, Uttar Pradesh 221001',
    latitude: 25.3109,
    longitude: 83.0107,
    images: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Dashashwamedh Ghat', 'Manikarnika Ghat', 'Annapurna Temple'],
    tags: ['Jyotirlinga', 'Shiva', 'Kashi', 'Gold Temple'],
    famousFor: 'One of the 12 sacred Jyotirlingas with an 800 kg gold-plated shikhara on the Ganga'
  },
  // AMRITSAR
  {
    name: 'Sri Harmandir Sahib (Golden Temple)',
    city: 'Amritsar',
    state: 'Punjab',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'The holiest shrine of Sikhism, plated in pure gold and set in the holy Amrit Sarovar lake, serving free meals to over 100,000 pilgrims daily in the Guru ka Langar.',
    fullDescription: 'Sri Harmandir Sahib is the supreme spiritual and cultural center of the Sikh faith, founded in 1577 by Guru Ram Das around the sacred Amrit Sarovar. Embellished with 500 kg of pure gold foil by Maharaja Ranjit Singh.',
    history: 'Designed with four open doors welcoming all humanity without distinction of religion or caste.',
    culturalSignificance: 'Houses the sacred Guru Granth Sahib and the world\'s largest free community mega-kitchen (Guru Ka Langar).',
    architecture: 'Sikh architecture blending Hindu and Islamic elements, with gold-plated domes and marble causeway.',
    thingsToSee: [
      'The gold-plated central sanctum reflecting in the sacred Amrit Sarovar pool',
      'Guru Ka Langar: The world\'s largest community kitchen',
      'The Akal Takht temporal seat'
    ],
    bestTimeToVisit: 'October to March; early morning or illuminated evening',
    openingHours: 'Open 24/7, 365 days a year',
    entryFee: 'Free entry',
    visitDuration: '3 – 5 hours',
    address: 'Golden Temple Rd, Atta Mandi, Amritsar, Punjab 143006',
    latitude: 31.6200,
    longitude: 74.8765,
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Jallianwala Bagh', 'Partition Museum', 'Akal Takht'],
    tags: ['Golden Temple', 'Sikhism', 'Langar', 'Spiritual'],
    famousFor: 'The holiest Sikh shrine plated in pure gold and the world\'s largest 24/7 free community kitchen'
  },
  // AHMEDABAD
  {
    name: 'Sabarmati Ashram',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The tranquil riverside headquarters of Mahatma Gandhi from 1917 to 1930, from where he launched the historic Dandi Salt March that shook the British Empire.',
    fullDescription: 'Sabarmati Ashram served as the epic center of the Indian independence movement for 13 years under Mahatma Gandhi, from where the 1930 Dandi Salt March was launched.',
    history: 'Established in 1917 on the banks of the Sabarmati River to advance Ahimsa, Satyagraha, and Swadeshi self-reliance.',
    culturalSignificance: 'A sacred national monument preserving the principles of non-violence, simplicity, and truth.',
    architecture: 'Traditional minimalist vernacular architecture with the Charles Correa-designed open pavilion museum.',
    thingsToSee: [
      'Hriday Kunj: The original cottage where Mahatma Gandhi and Kasturba lived',
      'The original Charkha, writing desk, and spectacles of Gandhiji',
      'Gandhi Smarak Sangrahalaya museum'
    ],
    bestTimeToVisit: 'October to March; morning or late afternoon',
    openingHours: '8:30 AM – 6:30 PM (Daily)',
    entryFee: 'Free entry',
    visitDuration: '1.5 – 3 hours',
    address: 'Gandhi Smarak Sangrahalaya, Ashram Rd, Ahmedabad, Gujarat 380027',
    latitude: 23.0605,
    longitude: 72.5804,
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Adalaj Stepwell', 'Sabarmati Riverfront', 'Calico Museum'],
    tags: ['Gandhi', 'Independence', 'Dandi March', 'Ahimsa'],
    famousFor: 'Mahatma Gandhi\'s historical headquarters and starting point of the 1930 Dandi Salt March'
  },
  // GOA
  {
    name: 'Basilica of Bom Jesus',
    city: 'Goa',
    state: 'Goa',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'A UNESCO World Heritage 16th-century Baroque cathedral holding the mortal relics of St. Francis Xavier, renowned for unplastered red laterite stone architecture.',
    fullDescription: 'The Basilica of Bom Jesus is a world-renowned Roman Catholic minor basilica in Old Goa, consecrated in 1605 and enshrining the relics of St. Francis Xavier.',
    history: 'Constructed between 1594 and 1605, holding the sacred relics of St. Francis Xavier who arrived in Goa in 1542.',
    culturalSignificance: 'A premier global pilgrimage center, famous for the decennial public Exposition of the relics.',
    architecture: 'Baroque architecture built of unplastered black laterite stone with a gilded 30-foot high altar.',
    thingsToSee: [
      'The silver casket and marble mausoleum containing the relics of St. Francis Xavier',
      'The gilded high altar adorned with cherubs and gold leaf'
    ],
    bestTimeToVisit: 'October to April',
    openingHours: '9:00 AM – 6:30 PM (Daily)',
    entryFee: 'Free entry',
    visitDuration: '1 – 2 hours',
    address: 'Old Goa Rd, Bainguinim, Old Goa, Goa 403402',
    latitude: 15.5009,
    longitude: 73.9116,
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Se Cathedral', 'Church of St. Francis of Assisi'],
    tags: ['UNESCO', 'Baroque', 'St Francis Xavier', 'Old Goa'],
    famousFor: 'UNESCO World Heritage Baroque architecture and sacred relics of St. Francis Xavier'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // KOLKATA
  // ═════════════════════════════════════════════════════════════════════════════
  {
    name: 'Victoria Memorial',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'A monumental white Makrana marble palace commemorating Queen Victoria, blending British neoclassical and Mughal architectural elements.',
    fullDescription: 'The Victoria Memorial is Kolkata\'s most iconic architectural masterpiece, conceived by Viceroy Lord Curzon and constructed between 1906 and 1921 from white Makrana marble.',
    history: 'Constructed to commemorate Queen Victoria\'s death in 1901, inaugurated in 1921 by the Prince of Wales.',
    culturalSignificance: 'A central civic landmark of Kolkata, hosting evening light-and-sound shows and cultural exhibitions.',
    architecture: 'Indo-Saracenic and Neoclassical revival style featuring a 184-foot central dome surmounted by a 16-foot bronze rotating Angel of Victory.',
    thingsToSee: [
      'The 16-foot bronze rotating Angel of Victory',
      'The Royal Gallery with historic British India oil paintings',
      'Calcutta Gallery showcasing the city\'s evolution from 1690 to 1911',
      '64-acre heritage gardens with bronze statues'
    ],
    bestTimeToVisit: 'October to March (10:00 AM – 5:00 PM)',
    openingHours: '10:00 AM – 6:00 PM (Closed Mondays)',
    entryFee: '₹50 for Indians; ₹500 for Foreigners',
    visitDuration: '2 – 3.5 hours',
    address: '1, Queens Way, Maidan, Kolkata, West Bengal 700071',
    latitude: 22.5448,
    longitude: 88.3426,
    images: [
      'https://images.unsplash.com/photo-1558431382-27e303142255?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['St. Paul\'s Cathedral', 'Indian Museum', 'Maidan'],
    tags: ['Marble Palace', 'Colonial', 'Museum', 'Gardens'],
    famousFor: 'Pure white Makrana marble Indo-Saracenic palace and the rotating bronze Angel of Victory'
  },
  {
    name: 'Howrah Bridge (Rabindra Setu)',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'Modern Landmark',
    shortDescription: 'The world\'s busiest balanced cantilever steel bridge spanning the Hooghly River, built without a single nut or bolt.',
    fullDescription: 'Howrah Bridge (officially Rabindra Setu) is a monumental cantilever suspension bridge spanning the Hooghly River, linking Kolkata with Howrah, fabricated entirely from Tata high-tensile steel.',
    history: 'Commissioned in 1943 during World War II, replacing an earlier pontoon bridge.',
    culturalSignificance: 'The defining gateway and cinematic emblem of Kolkata, carrying over 100,000 vehicles and 150,000 pedestrians daily.',
    architecture: 'Balanced cantilever suspension truss bridge with a central span of 1,500 feet supported by two 280-foot steel towers.',
    thingsToSee: [
      'Panoramic sunset views across the Hooghly River',
      'Mallick Ghat Flower Market at the bridge base',
      'Ferry cruise beneath the massive steel cantilever trusses'
    ],
    bestTimeToVisit: 'October to March; sunrise or sunset',
    openingHours: 'Open 24/7',
    entryFee: 'Free entry',
    visitDuration: '45 mins – 1.5 hours',
    address: 'Howrah Bridge, Kolkata, West Bengal 700001',
    latitude: 22.5850,
    longitude: 88.3468,
    images: [
      'https://images.unsplash.com/photo-1558431382-27e303142255?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Mallick Ghat Flower Market', 'Howrah Railway Station', 'Millennium Park'],
    tags: ['Bridge', 'Cantilever', 'Hooghly River', 'Engineering Marvel'],
    famousFor: 'World\'s busiest cantilever bridge built without nuts or bolts'
  },
  {
    name: 'Dakshineswar Kali Temple',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'A sacred 19th-century Navaratna (nine-spired) temple on the Hooghly, where mystic saint Ramakrishna Paramahamsa attained spiritual enlightenment.',
    fullDescription: 'The Dakshineswar Kali Temple is dedicated to Goddess Bhavatarini, founded in 1855 by Rani Rashmoni, celebrated as the home of Sri Ramakrishna Paramahamsa.',
    history: 'Constructed in 1855 by Rani Rashmoni following a divine dream before a planned pilgrimage to Varanasi.',
    culturalSignificance: 'Birthplace of modern Hindu universalist philosophy through Sri Ramakrishna and Swami Vivekananda.',
    architecture: 'Traditional Bengal Navaratna architectural style with 12 identical Shiva shrines along the riverbank.',
    thingsToSee: [
      'Goddess Bhavatarini sanctum sanctorum on silver lotus',
      '12 Aat-chala terracotta Shiva temples along the river ghats',
      'Sri Ramakrishna\'s room preserving his personal relics',
      'Panchavati sacred meditation grove'
    ],
    bestTimeToVisit: 'October to March; early morning or evening Aarti',
    openingHours: '6:00 AM – 12:30 PM and 3:30 PM – 8:30 PM',
    entryFee: 'Free entry',
    visitDuration: '2 – 3 hours',
    address: 'Dakshineswar, Kolkata, West Bengal 700076',
    latitude: 22.6534,
    longitude: 88.3575,
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Belur Math', 'Dakshineswar Skywalk'],
    tags: ['Temple', 'Kali', 'Ramakrishna', 'Navaratna'],
    famousFor: 'Nine-spired Navaratna temple where Sri Ramakrishna Paramahamsa attained enlightenment'
  },
  {
    name: 'Indian Museum',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'Museum & Heritage',
    shortDescription: 'Founded in 1814, it is the ninth oldest museum in the world and the largest in Asia, famous for a 4,000-year-old Egyptian mummy.',
    fullDescription: 'The Indian Museum (Jadu Ghar) is the oldest and largest multipurpose museum in the Asia-Pacific region, founded in 1814 by Dr. Nathaniel Wallich.',
    history: 'Founded in 1814 under the Asiatic Society of Bengal, moving to its grand Italianate building on J.N. Road in 1875.',
    culturalSignificance: 'Preserves rare Indus Valley artifacts, Gandharan sculptures, and Mughal miniatures.',
    architecture: 'Italianate Neoclassical colonnaded structure with a central quadrangle courtyard.',
    thingsToSee: [
      '4,000-year-old Egyptian Mummy',
      'Bharhut Stupa 2nd-century BCE railings',
      'Gandhara Greco-Buddhist standing Buddha statues'
    ],
    bestTimeToVisit: 'October to March (10:30 AM – 3:30 PM)',
    openingHours: '10:00 AM – 6:00 PM (Closed Mondays)',
    entryFee: '₹50 for Indians; ₹500 for Foreigners',
    visitDuration: '3 – 4 hours',
    address: '27, Jawaharlal Nehru Rd, Colootola, Kolkata, West Bengal 700016',
    latitude: 22.5579,
    longitude: 88.3511,
    images: [
      'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Park Street', 'New Market', 'Victoria Memorial'],
    tags: ['Museum', 'Oldest in Asia', 'Mummy', 'Archaeology'],
    famousFor: 'Oldest and largest museum in Asia housing an Egyptian Mummy and Bharhut Stupa relics'
  },
  {
    name: 'St. Paul\'s Cathedral',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The first Episcopal cathedral built in Asia, completed in 1847 in striking Indo-Gothic style with a towering 201-foot spire.',
    fullDescription: 'St. Paul\'s Cathedral is an Anglican cathedral in Kolkata completed in 1847, acclaimed for its soaring spire and stained glass windows designed by Sir Edward Burne-Jones.',
    history: 'Consecrated in October 1847 under Bishop Daniel Wilson; spire rebuilt in 1938 modeled on Canterbury Cathedral.',
    culturalSignificance: 'The seat of the Diocese of Calcutta, renowned for its Christmas Eve midnight service.',
    architecture: 'Indo-Gothic revival architecture with pointed arches, ribbed vaults, and Florentine frescoes.',
    thingsToSee: [
      '201-foot central spire modeled after Canterbury Cathedral',
      'Stained glass West Window by Sir Edward Burne-Jones',
      'Wood-carved choir stalls and serene shaded gardens'
    ],
    bestTimeToVisit: 'October to March; Christmas Eve',
    openingHours: '9:00 AM – 5:30 PM (Mon–Sat); 7:30 AM – 6:00 PM (Sundays)',
    entryFee: 'Free entry',
    visitDuration: '1 – 1.5 hours',
    address: '1A, Cathedral Rd, Maidan, Kolkata, West Bengal 700071',
    latitude: 22.5442,
    longitude: 88.3473,
    images: [
      'https://images.unsplash.com/photo-1558431382-27e303142255?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Victoria Memorial', 'Academy of Fine Arts', 'Birla Planetarium'],
    tags: ['Cathedral', 'Indo-Gothic', 'Stained Glass', 'Colonial'],
    famousFor: 'First Episcopal cathedral in Asia with Gothic architecture and Canterbury-inspired spire'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // PUNE
  // ═════════════════════════════════════════════════════════════════════════════
  {
    name: 'Shaniwar Wada',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'The 18th-century palace citadel of the Peshwa prime ministers of the Maratha Empire, famed for its massive Dilli Darwaza.',
    fullDescription: 'Shaniwar Wada was the magnificent seat of the Peshwa prime ministers of the Maratha Empire, commissioned in 1730 by Peshwa Baji Rao I.',
    history: 'Built in 1730, it served as the political nerve center of the Maratha Confederacy until 1818.',
    culturalSignificance: 'Paramount symbol of Maratha pride and Bajirao Peshwa\'s chivalric legacy.',
    architecture: 'Maratha fortress palace design with teakwood Dilli Darwaza gates studded with steel spikes and Hazari Karanje fountain.',
    thingsToSee: [
      'Dilli Darwaza with anti-elephant iron spikes',
      'Hazari Karanje 16-petal fountain with 1,000 jets',
      'Evening sound and light show'
    ],
    bestTimeToVisit: 'October to February (4:00 PM – 6:30 PM)',
    openingHours: '9:30 AM – 5:30 PM (Daily)',
    entryFee: '₹25 for Indians; ₹300 for Foreigners',
    visitDuration: '1.5 – 2.5 hours',
    address: 'Shaniwar Peth, Pune, Maharashtra 411030',
    latitude: 18.5196,
    longitude: 73.8553,
    images: [
      'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Dagdusheth Ganpati', 'Lal Mahal', 'Kasba Peth'],
    tags: ['Fort', 'Peshwa', 'Maratha Empire', 'Baji Rao'],
    famousFor: 'Historical fortress citadel of Peshwa Baji Rao I and Dilli Darwaza'
  },
  {
    name: 'Aga Khan Palace',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'A serene 19th-century Italianate palace which served as the internment site for Mahatma Gandhi during the 1942 Quit India Movement.',
    fullDescription: 'The Aga Khan Palace was built in 1892 by Sultan Muhammed Shah Aga Khan III, renowned as the prison of Mahatma Gandhi and Kasturba Gandhi from 1942 to 1944.',
    history: 'Built in 1892; Kasturba Gandhi and Mahadev Desai passed away during internment here and their samadhis are preserved on the grounds.',
    culturalSignificance: 'Declared a Monument of National Importance, serving as a revered Gandhian memorial.',
    architecture: 'Italianate arches, colonnaded corridors, and 19 acres of manicured lawns.',
    thingsToSee: [
      'Gandhi\'s room with his original bed and charkha',
      'Marble Samadhis of Kasturba Gandhi and Mahadev Desai',
      'Gandhi Memorial Museum'
    ],
    bestTimeToVisit: 'October to February',
    openingHours: '9:00 AM – 5:30 PM (Daily)',
    entryFee: '₹25 for Indians; ₹300 for Foreigners',
    visitDuration: '1.5 – 2.5 hours',
    address: 'Pune Nagar Road, Kalyani Nagar, Pune, Maharashtra 411006',
    latitude: 18.5529,
    longitude: 73.9015,
    images: [
      'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Osho Ashram', 'Koregaon Park', 'Bund Garden'],
    tags: ['Gandhi', 'Quit India', 'Memorial', 'Palace'],
    famousFor: 'Internment site of Mahatma Gandhi during the Quit India Movement and Kasturba Gandhi\'s Samadhi'
  },
  {
    name: 'Sinhagad Fort (Lion\'s Fort)',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'A dramatic Sahyadri cliffside fortress perched 1,312 meters high, legendary for Tanaji Malusare\'s heroic night battle in 1670.',
    fullDescription: 'Sinhagad is an ancient Sahyadri hill fortress situated 30 km southwest of Pune, famed for the 1670 battle where Tanaji Malusare recaptured the fort for Shivaji Maharaj.',
    history: 'Dating back 2,000 years; refortified by Shivaji Maharaj in the 17th century.',
    culturalSignificance: 'Epic center of Maratha valor, celebrated for trekking and traditional pithla-bhakri.',
    architecture: 'Strategic cliffside fortification with vertical basalt cliffs, Kalyan Darwaza, and natural water cisterns.',
    thingsToSee: [
      'Samadhi of legendary warrior Tanaji Malusare',
      'Tanaji Kada sheer vertical cliff',
      'Dev Taki natural ice-cold mountain water spring',
      'Kalyan Darwaza and views of Khadakwasla Dam'
    ],
    bestTimeToVisit: 'Monsoon (July to September) and Winter (October to February)',
    openingHours: '6:00 AM – 6:00 PM (Daily)',
    entryFee: '₹20 for Pedestrians; ₹50 for Two-wheelers; ₹100 for Cars',
    visitDuration: '3 – 5 hours',
    address: 'Sinhagad Ghat Rd, Thoptewadi, Pune, Maharashtra 411025',
    latitude: 18.3664,
    longitude: 73.7558,
    images: [
      'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Khadakwasla Dam', 'NDA Khadakwasla', 'Panshet'],
    tags: ['Hill Fort', 'Tanaji Malusare', 'Shivaji Maharaj', 'Trekking'],
    famousFor: 'Heroic 1670 battle of Tanaji Malusare, dramatic Sahyadri views, and Pithla Bhakri'
  },
  {
    name: 'Pataleshwar Cave Temple',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'An 8th-century Rashtrakuta rock-cut monolithic cave temple carved from a single basalt rock in Pune, dedicated to Lord Shiva.',
    fullDescription: 'The Pataleshwar Cave Temple is an 8th-century rock-cut monolithic shrine carved into basalt rock on JM Road, featuring a circular monolithic Nandi mandapa.',
    history: 'Excavated in the 8th century CE under the Rashtrakuta dynasty.',
    culturalSignificance: 'A subterranean tranquil heritage shrine in the center of modern Pune.',
    architecture: 'Subterranean monolithic rock-cut architecture with a circular stone umbrella Nandi pavilion and square pillars.',
    thingsToSee: [
      'Monolithic circular Nandi canopy',
      'Rock-cut Shiva Lingam sanctum',
      'Bas-relief rock carvings of deities'
    ],
    bestTimeToVisit: 'Year-round',
    openingHours: '8:30 AM – 5:30 PM (Daily)',
    entryFee: 'Free entry',
    visitDuration: '45 mins – 1.5 hours',
    address: 'Jangali Maharaj Rd, Shivajinagar, Pune, Maharashtra 411005',
    latitude: 18.5283,
    longitude: 73.8496,
    images: [
      'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Jangli Maharaj Temple', 'Fergusson College', 'FC Road'],
    tags: ['Rock Cut', 'Rashtrakuta', 'Shiva', 'Nandi'],
    famousFor: '8th-century monolithic basalt rock-cut cave temple and circular Nandi canopy'
  },
  {
    name: 'Raja Dinkar Kelkar Museum',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'Museum & Heritage',
    shortDescription: 'A one-man collection of over 20,000 rare traditional Indian artifacts and the reconstructed Mastani Mahal palace chamber.',
    fullDescription: 'The Raja Dinkar Kelkar Museum contains the private collection of Dr. Dinkar G. Kelkar, featuring 20,000+ artifacts spanning musical instruments, brass lamps, and the Mastani Mahal.',
    history: 'Assembled across six decades by Dr. Kelkar and dedicated to his late son Raja.',
    culturalSignificance: 'Preserves the artistry of everyday traditional Indian domestic objects.',
    architecture: 'Rajasthani carved stone and teakwood mansion structure.',
    thingsToSee: [
      'Reconstructed 18th-century Mastani Mahal palace chamber',
      'Musical Instruments Gallery with rare sitars and veenas',
      'Collection of antique brass betel-nut cutters (sarota)'
    ],
    bestTimeToVisit: 'October to March',
    openingHours: '10:00 AM – 5:30 PM (Daily)',
    entryFee: '₹100 for Indian Adults; ₹300 for Foreigners',
    visitDuration: '2 – 3 hours',
    address: '1377-78, Natu Baug, Shukrawar Peth, Pune, Maharashtra 411002',
    latitude: 18.5113,
    longitude: 73.8543,
    images: [
      'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Shaniwar Wada', 'Sarasbaug', 'Parvati Hill'],
    tags: ['Museum', 'Mastani Mahal', 'Folk Art', 'Handicrafts'],
    famousFor: 'Reconstructed 18th-century Mastani Mahal and rare collection of 20,000+ Indian artifacts'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // KOCHI
  // ═════════════════════════════════════════════════════════════════════════════
  {
    name: 'Fort Kochi & Chinese Fishing Nets',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The iconic 14th-century cantilevered shore-operated fishing nets (Cheena Vala) lining Vasco da Gama Square on the Arabian Sea.',
    fullDescription: 'Fort Kochi\'s Chinese Fishing Nets (Cheena Vala) are cantilevered shore fishing contraptions introduced in the 14th century by Chinese trader Zheng He from Kublai Khan\'s court.',
    history: 'Introduced between 1350 and 1450 CE; Fort Kochi became India\'s first European settlement.',
    culturalSignificance: 'The living symbol of Kochi\'s spice trade and maritime history.',
    architecture: 'Cantilevered teak poles, bamboo beams, counterweight stones, and 20-meter nets.',
    thingsToSee: [
      'Live operation of cantilevered nets by fishermen',
      'Sunset views framed through timber net frames',
      'Colonial heritage streets of Fort Kochi'
    ],
    bestTimeToVisit: 'September to March; late afternoon for sunset',
    openingHours: 'Open 24/7',
    entryFee: 'Free promenade viewing',
    visitDuration: '1.5 – 2.5 hours',
    address: 'Vasco da Gama Square, Fort Kochi, Kochi, Kerala 682001',
    latitude: 9.9678,
    longitude: 76.2415,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['St. Francis Church', 'Santa Cruz Basilica', 'Mattancherry'],
    tags: ['Chinese Fishing Nets', 'Fort Kochi', 'Sunset', 'Arabian Sea'],
    famousFor: 'Iconic 14th-century cantilevered Chinese fishing nets and sunset views'
  },
  {
    name: 'Mattancherry Palace (Dutch Palace)',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'A 16th-century Portuguese palace gifted to the Raja of Kochi, famed for Hindu mythological murals depicting the Ramayana.',
    fullDescription: 'Mattancherry Palace was built around 1555 CE by the Portuguese and presented to King Veera Kerala Varma, renovated by the Dutch in 1663.',
    history: 'Coronation palace for the Rajas of Kochi, housing 300 sq meters of classical murals.',
    culturalSignificance: 'World-renowned for classical Kerala vegetable-pigment tempera murals.',
    architecture: 'Traditional Kerala Nalukettu style with a central courtyard and wood-carved ceilings.',
    thingsToSee: [
      'The Ramayana Room with 48 classical Kerala murals',
      'Coronation Hall with royal palanquins and silver robes',
      'Portraits of the Maharajas of Cochin'
    ],
    bestTimeToVisit: 'October to March',
    openingHours: '9:45 AM – 1:00 PM and 2:00 PM – 4:45 PM (Closed Fridays)',
    entryFee: '₹5 for Adults; Free for children below 15',
    visitDuration: '1.5 – 2 hours',
    address: 'Mattancherry, Kochi, Kerala 682002',
    latitude: 9.9583,
    longitude: 76.2594,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Paradesi Synagogue', 'Jew Town', 'Fort Kochi'],
    tags: ['Dutch Palace', 'Kerala Murals', 'Ramayana', 'Kochi Royalty'],
    famousFor: 'World-famous 16th-century Ramayana tempera murals and Nalukettu architecture'
  },
  {
    name: 'Paradesi Synagogue (Jewish Synagogue)',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'The oldest active synagogue in the Commonwealth, constructed in 1568, featuring hand-painted Chinese porcelain floor tiles.',
    fullDescription: 'The Paradesi Synagogue was built in 1568 by Sephardic Jews in Jew Town, featuring 18th-century hand-painted Cantonese porcelain tiles and Belgian chandeliers.',
    history: 'Constructed on land gifted by Raja Rama Varma; rebuilt under Dutch protection in 1664.',
    culturalSignificance: 'Testament to 2,000 years of Jewish heritage in Malabar.',
    architecture: 'Colonial Dutch-Jewish architecture with a 1762 clock tower and brass pulpit.',
    thingsToSee: [
      'Hand-painted blue-and-white Chinese porcelain floor tiles',
      'Belgian crystal chandeliers and 1762 clock tower',
      'Gold and silver crowns presented by Cochin Maharajas'
    ],
    bestTimeToVisit: 'October to March',
    openingHours: '10:00 AM – 5:00 PM (Closed Fridays, Saturdays & Jewish Holidays)',
    entryFee: '₹10 for Adults',
    visitDuration: '45 mins – 1.5 hours',
    address: 'Synagogue Ln, Jew Town, Mattancherry, Kochi, Kerala 682002',
    latitude: 9.9575,
    longitude: 76.2597,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Jew Town Antiques', 'Mattancherry Dutch Palace'],
    tags: ['Synagogue', 'Jewish Heritage', 'Porcelain Tiles', 'Jew Town'],
    famousFor: 'Oldest active synagogue in the Commonwealth with hand-painted Chinese porcelain tiles'
  },
  {
    name: 'St. Francis Church',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The oldest European church built in India (1503), where explorer Vasco da Gama was initially buried in 1524.',
    fullDescription: 'St. Francis Church in Fort Kochi is the oldest European church in India, constructed in 1503 by Portuguese Franciscan friars.',
    history: 'Original burial site of Vasco da Gama whose remains rested here for 14 years before being moved to Lisbon.',
    culturalSignificance: 'Protected national monument showcasing Portuguese, Dutch, and British history.',
    architecture: 'Portuguese colonial architecture with timber facade and manual punkah fans.',
    thingsToSee: [
      'Original gravestone and burial spot of Vasco da Gama',
      'Historic manual rope-operated punkah fans',
      'Ancient Portuguese and Dutch stone epitaphs'
    ],
    bestTimeToVisit: 'October to March',
    openingHours: '7:00 AM – 6:30 PM (Mon–Sat); 8:30 AM – 6:30 PM (Sundays)',
    entryFee: 'Free entry',
    visitDuration: '45 mins – 1 hour',
    address: 'Saint Francis Church Rd, Fort Kochi, Kochi, Kerala 682001',
    latitude: 9.9660,
    longitude: 76.2428,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Chinese Fishing Nets', 'Santa Cruz Basilica', 'Princess Street'],
    tags: ['Vasco da Gama', 'Oldest Church', 'Portuguese', 'Fort Kochi'],
    famousFor: 'Oldest European church in India and the original 1524 burial site of Vasco da Gama'
  },
  {
    name: 'Kerala Folklore Museum',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    category: 'Cultural Center',
    shortDescription: 'A treasure house of traditional South Indian architecture housing over 4,000 folk artifacts, Kathakali masks, and dance theatre.',
    fullDescription: 'The Kerala Folklore Museum in Thevara showcases 4,000+ artifacts spanning Malabar, Cochin, and Travancore architectural styles.',
    history: 'Constructed over 25 years using salvaged wooden elements from 25 historic ancestral homes.',
    culturalSignificance: 'Premier cultural center preserving Kerala folk traditions and classical Kathakali dance.',
    architecture: 'Three-tiered traditional wooden architecture with a 17th-century wood-carved Kalithattu theatre.',
    thingsToSee: [
      '4,000+ folk art objects, Theyyam and Kathakali masks',
      'Wood-carved temple theatre (Kalithattu)',
      'Evening Kathakali dance demonstration and recital'
    ],
    bestTimeToVisit: 'October to March',
    openingHours: '9:00 AM – 6:00 PM (Daily)',
    entryFee: '₹100 for Indian Adults; ₹200 for Foreigners',
    visitDuration: '2 – 3 hours',
    address: 'Folklore Junction, Thevara, Kochi, Kerala 682013',
    latitude: 9.9328,
    longitude: 76.3023,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Marine Drive', 'Hill Palace', 'Vembanad Lake'],
    tags: ['Folklore', 'Kathakali', 'Theyyam', 'Museum'],
    famousFor: 'Three-tiered traditional wooden architecture and 4,000+ South Indian folk art treasures'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // MYSURU
  // ═════════════════════════════════════════════════════════════════════════════
  {
    name: 'Mysore Palace (Amba Vilas Palace)',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'The magnificent official residence of the Wadiyar dynasty, illuminated by 97,000 golden incandescent bulbs on Sundays.',
    fullDescription: 'Mysore Palace is the royal residence of the Wadiyar dynasty, designed by Henry Irwin and completed in 1912 in Indo-Saracenic grandeur.',
    history: 'Built between 1897 and 1912 after the earlier wooden palace was destroyed by fire.',
    culturalSignificance: 'Epicenter of Mysore Dasara, featuring the 750 kg golden howdah elephant procession.',
    architecture: 'Indo-Saracenic architecture in granite with pink marble domes, stained glass ceilings, and fluted gold pillars.',
    thingsToSee: [
      'Gombe Thotti and the 750 kg Golden Howdah',
      'Kalyana Mantapa (Marriage Pavilion) with peacock stained glass',
      '97,000-bulb Sunday evening illumination'
    ],
    bestTimeToVisit: 'September to March; especially during Dasara',
    openingHours: '10:00 AM – 5:30 PM; Illumination: Sundays 7:00 PM – 7:45 PM',
    entryFee: '₹100 for Indian Adults; ₹300 for Foreigners',
    visitDuration: '2.5 – 4 hours',
    address: 'Sayyaji Rao Rd, Agrahara, Chamrajpura, Mysuru, Karnataka 570001',
    latitude: 12.3051,
    longitude: 76.6551,
    images: [
      'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Chamundeshwari Temple', 'Devaraja Market', 'Jaganmohan Palace'],
    tags: ['Palace', 'Wodeyar', 'Illumination', 'Dasara'],
    famousFor: 'Opulent Indo-Saracenic royal architecture and 97,000-bulb Sunday evening illumination'
  },
  {
    name: 'Chamundeshwari Temple',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'A sacred 1,000-year-old temple atop Chamundi Hills dedicated to Goddess Chamundeshwari, featuring a 16-foot monolithic granite Nandi bull.',
    fullDescription: 'The Sri Chamundeshwari Temple is situated atop Chamundi Hills overlooking Mysuru, dedicated to the tutelary deity of the Wadiyar dynasty.',
    history: 'Dating back to the 12th-century Hoysala period; the 16-foot monolithic Nandi was commissioned in 1659.',
    culturalSignificance: 'The patron deity of Mysuru city, worshipped during Dasara.',
    architecture: 'Dravidian temple architecture with a 7-tier 100-foot gopuram and silver-plated doorways.',
    thingsToSee: [
      'Goddess Chamundeshwari golden sanctum idol',
      'Colossal 16-foot monolithic black granite Nandi Bull',
      'Panoramic hilltop view of Mysuru Palace'
    ],
    bestTimeToVisit: 'September to March; early morning',
    openingHours: '7:30 AM – 2:00 PM, 3:30 PM – 6:00 PM, 7:30 PM – 9:00 PM',
    entryFee: 'General: Free; Special: ₹100',
    visitDuration: '2 – 3 hours',
    address: 'Chamundi Hill, Mysuru, Karnataka 570010',
    latitude: 12.2724,
    longitude: 76.6713,
    images: [
      'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Monolithic Nandi', 'Mahishasura Statue', 'Mysore Palace'],
    tags: ['Temple', 'Chamundi Hills', 'Nandi', 'Dravidian'],
    famousFor: 'Ancient hilltop temple of Goddess Chamundeshwari and the 16-foot monolithic Nandi'
  },
  {
    name: 'Brindavan Gardens',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    category: 'Nature & Scenic',
    shortDescription: 'A celebrated 60-acre terraced garden adjoining the KRS Dam across the Cauvery River, famous for evening musical dancing fountains.',
    fullDescription: 'Brindavan Gardens is a 60-acre terraced ornamental garden laid out below the Krishnarajasagara (KRS) Dam, designed in 1927 by Sir Mirza Ismail.',
    history: 'Built alongside the KRS Dam (engineered by Sir M. Visvesvaraya) between 1927 and 1932.',
    culturalSignificance: 'Famous tourist attraction and legendary backdrop for Indian cinema.',
    architecture: 'Terraced formal garden layout spanning three tiers with hydraulic water fountains.',
    thingsToSee: [
      'Evening Synchronized Musical Dancing Fountain Show',
      'Boating across the central ornamental water channel',
      'Massive view of the historic KRS Dam wall'
    ],
    bestTimeToVisit: 'October to March (4:30 PM – 8:00 PM)',
    openingHours: '6:30 AM – 9:00 PM; Fountain Show: 7:00 PM – 8:00 PM',
    entryFee: '₹50 for Adults; ₹10 for Children',
    visitDuration: '2.5 – 3.5 hours',
    address: 'KRS Dam Rd, Mandya / Mysuru, Karnataka 571607',
    latitude: 12.4228,
    longitude: 76.5744,
    images: [
      'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['KRS Dam', 'Ranganathittu Bird Sanctuary'],
    tags: ['Gardens', 'Fountain Show', 'KRS Dam', 'Cauvery River'],
    famousFor: 'Terraced Mughal-style botanical gardens and evening synchronized musical fountain show'
  },
  {
    name: 'St. Philomena\'s Cathedral',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'One of the tallest churches in Asia, built in 1936 in Neo-Gothic style inspired by Germany\'s Cologne Cathedral, with 175-foot twin spires.',
    fullDescription: 'St. Philomena\'s Cathedral is a Neo-Gothic Roman Catholic cathedral in Mysuru, constructed in 1936 by Maharaja Krishnaraja Wadiyar IV.',
    history: 'Designed by French architect Daly modeled after the Cologne Cathedral in Germany.',
    culturalSignificance: 'Enshrines a sacred 3rd-century relic of Saint Philomena in a subterranean catacomb chapel.',
    architecture: 'Neo-Gothic cross-shaped layout with 175-foot twin spires and French stained glass windows.',
    thingsToSee: [
      '175-foot Neo-Gothic twin spires',
      'Subterranean Catacomb Crypt housing the relic of St. Philomena',
      'French stained glass windows depicting biblical scenes'
    ],
    bestTimeToVisit: 'September to March',
    openingHours: '5:00 AM – 6:00 PM (Daily)',
    entryFee: 'Free entry',
    visitDuration: '1 – 1.5 hours',
    address: 'Ashoka Rd, Lashkar Mohalla, Mysuru, Karnataka 570001',
    latitude: 12.3213,
    longitude: 76.6575,
    images: [
      'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Mysore Palace', 'Devaraja Market'],
    tags: ['Cathedral', 'Neo-Gothic', 'Cologne Style', 'Twin Spires'],
    famousFor: 'Cologne Cathedral-inspired 175-foot Neo-Gothic spires and subterranean crypt relic'
  },
  {
    name: 'Jaganmohan Palace & Art Gallery',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    category: 'Museum & Heritage',
    shortDescription: 'A 19th-century royal palace holding India\'s largest collection of original Raja Ravi Varma oil masterpieces.',
    fullDescription: 'Jaganmohan Palace was constructed in 1861 by Maharaja Mummadi Krishnaraja Wadiyar III, now housing the Sri Jayachamarajendra Art Gallery.',
    history: 'Served as the royal residence from 1897 to 1912 and the early Mysore Legislative Council hall.',
    culturalSignificance: 'Preserves Raja Ravi Varma\'s original oil paintings and S.L. Haldankar\'s "Glow of Hope" (Lady with the Lamp).',
    architecture: 'Traditional Hindu royal palace architecture with carved wooden pillars and wall murals.',
    thingsToSee: [
      'Raja Ravi Varma original oil paintings',
      '"Glow of Hope" (Lady with the Lamp) by S.L. Haldankar',
      'French Musical Clock with mechanical parade'
    ],
    bestTimeToVisit: 'September to March',
    openingHours: '10:00 AM – 5:30 PM (Daily)',
    entryFee: '₹50 for Indian Adults; ₹150 for Foreigners',
    visitDuration: '1.5 – 2.5 hours',
    address: 'Deshika Rd, Chamrajpura, Mysuru, Karnataka 570004',
    latitude: 12.3080,
    longitude: 76.6506,
    images: [
      'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Mysore Palace', 'Devaraja Market'],
    tags: ['Art Gallery', 'Raja Ravi Varma', 'Lady with Lamp', 'Wodeyar'],
    famousFor: 'Raja Ravi Varma original paintings and S.L. Haldankar\'s "Lady with the Lamp"'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // VISAKHAPATNAM
  // ═════════════════════════════════════════════════════════════════════════════
  {
    name: 'INS Kursura Submarine Museum',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Museum & Heritage',
    shortDescription: 'Asia\'s first submarine museum, housed inside a real 91-meter decommissioned Soviet-built Kalvari-class submarine on RK Beach.',
    fullDescription: 'The INS Kursura (S20) Submarine Museum is a pioneering maritime museum on RK Beach, commissioned in 1969 and decommissioned in 2001 after 31 years of naval service.',
    history: 'Served in the 1971 Indo-Pak war; hauled onto the beach sands by naval engineers in 2002.',
    culturalSignificance: 'National symbol of maritime defense valor, allowing walkthroughs inside real submariner quarters.',
    architecture: 'Foxtrot/Kalvari-class naval submarine structure preserved on heavy concrete cradles on beach sand.',
    thingsToSee: [
      'Walkthrough inside torpedo rooms and officer control deck',
      'Sonar, radar, and navigation instrumentation consoles',
      'TU 142 Aircraft Museum directly across the road'
    ],
    bestTimeToVisit: 'October to March (3:30 PM – 7:30 PM)',
    openingHours: '2:00 PM – 8:30 PM (Tue–Sat); 10:00 AM – 12:30 PM & 2:00 PM – 8:30 PM (Sun); Closed Mon',
    entryFee: '₹40 for Adults; ₹20 for Children',
    visitDuration: '1 – 1.5 hours',
    address: 'RK Beach Rd, Pandurangapuram, Visakhapatnam, Andhra Pradesh 530017',
    latitude: 17.7164,
    longitude: 83.3331,
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['TU 142 Aircraft Museum', 'RK Beach', 'Victory at Sea Memorial'],
    tags: ['Submarine', 'Naval Museum', 'RK Beach', '1971 War'],
    famousFor: 'Asia\'s first real submarine museum preserved on the sands of RK Beach'
  },
  {
    name: 'Kailasagiri Hilltop Park',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Nature & Scenic',
    shortDescription: 'A 360-foot hilltop park offering panoramic vistas of the Bay of Bengal, crowned by 40-foot colossal white statues of Lord Shiva and Parvati.',
    fullDescription: 'Kailasagiri is a 380-acre hilltop scenic park perched 360 feet above sea level, offering breathtaking views of Vizag\'s coastline and the Eastern Ghats.',
    history: 'Developed by VMRDA as a premier ecotourism and coastal viewpoint destination.',
    culturalSignificance: 'Scenic and spiritual icon of Vizag, accessible via South India\'s first passenger ropeway cable car.',
    architecture: 'Hilltop landscape park with floral clocks, circular toy train, and colossal white statues.',
    thingsToSee: [
      '40-foot-tall white statue of Lord Shiva and Goddess Parvati',
      'Passenger ropeway cable car over the hills',
      'Circular toy train ride orbiting the hill perimeter',
      'Titanic Viewpoint overlooking the Bay of Bengal'
    ],
    bestTimeToVisit: 'October to March; late afternoon for sunset',
    openingHours: '6:00 AM – 7:30 PM (Daily)',
    entryFee: 'Park: ₹20; Ropeway: ₹110; Toy Train: ₹50',
    visitDuration: '2 – 3 hours',
    address: 'Hill Top Rd, Kailasagiri, Visakhapatnam, Andhra Pradesh 530043',
    latitude: 17.7492,
    longitude: 83.3422,
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Rushikonda Beach', 'Tenneti Park', 'INS Kursura'],
    tags: ['Hilltop', 'Ropeway', 'Shiva Parvati', 'Ocean View'],
    famousFor: 'Panoramic Bay of Bengal ocean views, cable car ropeway, and colossal Shiva-Parvati statue'
  },
  {
    name: 'Borra Caves',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Nature & Scenic',
    shortDescription: 'One of the largest cave systems in India, plunging 80 meters deep in the Araku Valley, renowned for stalactites and stalagmites.',
    fullDescription: 'Borra Caves are natural speleothem limestone cave formations situated at 1,400 meters elevation in the Ananthagiri Hills of Araku Valley, 90 km from Vizag.',
    history: 'Discovered by geologist William King in 1807; sacred tribal site during Maha Shivratri.',
    culturalSignificance: 'Sacred natural Shiva Lingam stalagmite worshipped deep within the caves.',
    architecture: 'Karstic limestone cave architecture with 75-meter roof openings and subterranean Gosthani River passages.',
    thingsToSee: [
      'Natural stalagmite Shiva Lingam formation',
      'Theatrical multi-colored LED cave illumination',
      'Scenic Vistadome train journey through 30 tunnels from Vizag'
    ],
    bestTimeToVisit: 'October to March',
    openingHours: '10:00 AM – 5:00 PM (Daily)',
    entryFee: '₹80 for Adults; ₹60 for Children',
    visitDuration: '2 – 3 hours (Day trip)',
    address: 'Borra Caves, Ananthagiri Hills, Araku Valley, Andhra Pradesh 535145',
    latitude: 18.2806,
    longitude: 83.0394,
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Araku Valley', 'Katiki Waterfalls', 'Ananthagiri Hills'],
    tags: ['Limestone Caves', 'Stalactites', 'Araku Valley', 'Nature'],
    famousFor: 'Deepest limestone cave system in India with million-year-old stalactites in Araku Valley'
  },
  {
    name: 'Simhachalam Temple (Varaha Lakshmi Narasimha)',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'A revered 11th-century hilltop temple dedicated to Lord Varaha Narasimha, covered constantly in sandalwood paste (Chandanotsavam).',
    fullDescription: 'The Sri Varaha Lakshmi Narasimha Temple at Simhachalam is perched 800 feet above sea level, dedicated to Vishnu\'s combined Varaha and Narasimha incarnation.',
    history: 'Inscriptions date to 1087 CE under the Cholas; expanded in 1267 CE by King Narasimhadeva I of the Eastern Ganga dynasty.',
    culturalSignificance: 'One of the 32 Narasimha Kshetras, celebrated for the annual Chandanotsavam festival on Akshaya Tritiya.',
    architecture: 'Synthesis of Kalinga temple architecture of Odisha and South Indian Dravidian stone carving.',
    thingsToSee: [
      'Sacred idol covered in 480 kg of sandalwood paste',
      '96-pillared Kalyana Mandapa with Dasavatara carvings',
      'Kapila Theertham sacred water tank'
    ],
    bestTimeToVisit: 'October to March; Akshaya Tritiya',
    openingHours: '7:00 AM – 4:00 PM and 6:00 PM – 9:00 PM (Daily)',
    entryFee: 'General: Free; Special: ₹100 – ₹300',
    visitDuration: '2 – 3 hours',
    address: 'Simhachalam, Visakhapatnam, Andhra Pradesh 530028',
    latitude: 17.7667,
    longitude: 83.2500,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Kailasagiri', 'Rushikonda Beach', 'Indira Gandhi Zoo'],
    tags: ['Temple', 'Narasimha', 'Kalinga Architecture', 'Chandanotsavam'],
    famousFor: 'Lord Varaha Narasimha idol covered constantly in sandalwood paste and Kalinga stone carvings'
  },
  {
    name: 'Visakha Museum',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Museum & Heritage',
    shortDescription: 'A maritime and regional history museum housed in a 150-year-old Dutch bungalow on RK Beach, featuring artifacts from the 1971 PNS Ghazi sinking.',
    fullDescription: 'The Visakha Museum is housed in a 150-year-old Dutch Bungalow on RK Beach, preserving maritime armor, 3rd-century BC Buddhist antiquities, and PNS Ghazi debris.',
    history: 'Opened in 1991 in a 19th-century Dutch maritime trading bungalow by the Municipal Corporation.',
    culturalSignificance: 'Preserves the maritime history and naval warfare artifacts of the 1971 war.',
    architecture: 'Dutch colonial seaside bungalow with mangalore tiled roof and timber verandas.',
    thingsToSee: [
      'Debris recovered from the sunken submarine PNS Ghazi (1971)',
      'Ancient Buddhist stone reliefs from Thotlakonda and Bavikonda',
      'Ceremonial weapons of the royal families of Vizianagaram'
    ],
    bestTimeToVisit: 'October to March',
    openingHours: '11:00 AM – 7:00 PM (Mon–Fri); 12:00 PM – 8:00 PM (Weekends); Closed Fri',
    entryFee: '₹20 for Adults; ₹10 for Children',
    visitDuration: '1 – 2 hours',
    address: 'Beach Rd, Dutch Bungalow, Kirlampudi Layout, Visakhapatnam, Andhra Pradesh 530017',
    latitude: 17.7196,
    longitude: 83.3347,
    images: [
      'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['INS Kursura Submarine Museum', 'TU 142 Museum', 'RK Beach'],
    tags: ['Museum', 'PNS Ghazi', 'Maritime', 'Dutch Bungalow'],
    famousFor: 'Artifacts from the 1971 PNS Ghazi submarine sinking and 150-year-old Dutch bungalow'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // VIJAYAWADA
  // ═════════════════════════════════════════════════════════════════════════════
  {
    name: 'Kanaka Durga Temple',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'The sacred hilltop temple on Indrakeeladri Hill overlooking the Krishna River, dedicated to Goddess Kanaka Durga (Swayambhu).',
    fullDescription: 'The Kanaka Durga Temple is perched on Indrakeeladri Hill on the banks of the Krishna River, celebrated in scriptures as the abode where Durga vanquished Mahishasura.',
    history: 'Associated with the legend of Arjuna\'s penance to obtain the Pasupatastra from Lord Shiva.',
    culturalSignificance: 'Second most frequented pilgrimage destination in Andhra Pradesh, renowned for Navratri Teppotsavam.',
    architecture: 'Dravidian temple architecture with a soaring gold-plated Vimana shikhara and riverside Rajagopuram.',
    thingsToSee: [
      'Eight-armed Swayambhu golden idol of Goddess Kanaka Durga',
      'Golden Vimana Shikhara crowned with gold plating',
      'Navratri Teppotsavam swan-boat river procession on the Krishna'
    ],
    bestTimeToVisit: 'October to March; Navratri',
    openingHours: '4:00 AM – 9:00 PM (Daily)',
    entryFee: 'General: Free; Special: ₹100 – ₹300',
    visitDuration: '2 – 3.5 hours',
    address: 'Indrakeeladri, Mallikarjunapeta, Vijayawada, Andhra Pradesh 520001',
    latitude: 16.5161,
    longitude: 80.6053,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Prakasam Barrage', 'Undavalli Caves', 'Bhavani Island'],
    tags: ['Temple', 'Kanaka Durga', 'Indrakeeladri', 'Krishna River', 'Dasara'],
    famousFor: 'Swayambhu golden idol of Goddess Kanaka Durga and Navratri Teppotsavam river festival'
  },
  {
    name: 'Undavalli Caves',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'A 7th-century four-storey rock-cut monolithic sandstone cave temple, housing a colossal 5-meter-long reclining statue of Lord Vishnu.',
    fullDescription: 'The Undavalli Caves are a 4th-7th century monolithic rock-cut cave temple complex carved into sandstone hills, featuring a 5-meter reclining Vishnu (Anantasayana).',
    history: 'Originally excavated as Buddhist viharas, transformed into a Vaishnavite cave temple under the Vishnukundina kings.',
    culturalSignificance: 'Protected national monument showcasing rock-cut architecture transition from Buddhist to Hindu styles.',
    architecture: 'Four-tier rock-cut cave architecture carved into a vertical cliff face with lion capitals.',
    thingsToSee: [
      'Colossal 5-meter monolithic reclining Vishnu (Anantasayana Padmanabha)',
      'Intricate rock carvings of Brahma, Shiva, and Narasimha',
      'Four tiers of pillared galleries overlooking the Krishna delta'
    ],
    bestTimeToVisit: 'October to March',
    openingHours: '9:00 AM – 5:30 PM (Daily)',
    entryFee: '₹25 for Indians; ₹300 for Foreigners',
    visitDuration: '1.5 – 2.5 hours',
    address: 'Undavalli Cave Rd, Undavalli, Guntur / Vijayawada, Andhra Pradesh 522501',
    latitude: 16.4969,
    longitude: 80.5816,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Prakasam Barrage', 'Kanaka Durga Temple', 'Bhavani Island'],
    tags: ['Rock Cut Caves', 'Vishnukundina', 'Reclining Vishnu', 'Sandstone'],
    famousFor: 'Four-storey 7th-century rock-cut caves with a colossal 5-meter reclining Vishnu statue'
  },
  {
    name: 'Prakasam Barrage',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Modern Landmark',
    shortDescription: 'A 1,223-meter-long road bridge and irrigation regulator across the Krishna River, illuminating in multi-colored dynamic LED floodlights.',
    fullDescription: 'Prakasam Barrage is a 1,223-meter-long barrage across the Krishna River completed in 1957, irrigating 1.3 million acres in the Krishna delta.',
    history: 'Built between 1952 and 1957 named after Tanguturi Prakasam Pantulu, the first Chief Minister of Andhra State.',
    culturalSignificance: 'The civic landmark of Vijayawada connecting Krishna and Guntur districts.',
    architecture: 'Hydraulic barrage with 70 steel gates, a two-lane road bridge, and dynamic LED lighting.',
    thingsToSee: [
      'Dynamic LED light reflections dancing on the river at night',
      'Expansive reservoir lake with boating at Bhavani Island',
      'Views of Kanaka Durga Temple on Indrakeeladri Hill'
    ],
    bestTimeToVisit: 'October to March; evening for lighting',
    openingHours: 'Open 24/7 (Illumination: 6:30 PM – 10:30 PM)',
    entryFee: 'Free entry',
    visitDuration: '45 mins – 1.5 hours',
    address: 'Prakasam Barrage, Krishna River, Vijayawada, Andhra Pradesh 520001',
    latitude: 16.5072,
    longitude: 80.6094,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Kanaka Durga Temple', 'Undavalli Caves', 'Bhavani Island'],
    tags: ['Barrage', 'Krishna River', 'Illumination', 'Sir Arthur Cotton'],
    famousFor: '1.2km bridge across the Krishna River with spectacular evening dynamic LED lighting'
  },
  {
    name: 'Kondapalli Fort (Kondapalli Qila)',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'A 14th-century hilltop medieval stone fortress built by Prolaya Vema Reddy, nestled in the village famous for GI-tagged wooden Kondapalli Bommalu toy craft.',
    fullDescription: 'Kondapalli Fort is a hilltop fortress erected in 1360 CE by King Prolaya Vema Reddy of the Reddi dynasty, famous for the three-storeyed Rani Mahal and Darbar Hall.',
    history: 'Strategic fort contested by Gajapatis, Vijayanagara kings, and Bahmanis, later a British military outpost.',
    culturalSignificance: 'Foothill village is home to 400-year-old GI-tagged wooden Kondapalli Bommalu toy craft.',
    architecture: 'Medieval hill fort with granite ramparts, Gaja Dvaram elephant gates, and Persian-style arches.',
    thingsToSee: [
      'Gaja Dvaram massive elephant entrance gate',
      'Three-storeyed Rani Mahal overlooking the valley',
      'Kondapalli toy artisans carving wooden toys at the village base'
    ],
    bestTimeToVisit: 'October to February',
    openingHours: '10:00 AM – 5:00 PM (Daily)',
    entryFee: '₹20 for Adults; ₹10 for Children',
    visitDuration: '2.5 – 3.5 hours',
    address: 'Ghat Road, Kondapalli, NTR District / Vijayawada, Andhra Pradesh 521228',
    latitude: 16.6186,
    longitude: 80.5369,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Kondapalli Toy Village', 'Kanaka Durga Temple', 'Prakasam Barrage'],
    tags: ['Hill Fort', 'Reddi Dynasty', 'Kondapalli Toys', 'Rani Mahal'],
    famousFor: '14th-century Reddi dynasty hill fortress and world-famous wooden Kondapalli toy craft'
  },
  {
    name: 'Bhavani Island',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Nature & Scenic',
    shortDescription: 'One of the largest river islands in India, sprawling over 133 acres in the middle of the Krishna River, featuring mangrove walks, water sports, and boating.',
    fullDescription: 'Bhavani Island is a 133-acre picturesque river island in the Krishna River upstream of Prakasam Barrage, developed as an eco-tourism retreat by APTDC.',
    history: 'Named after Goddess Bhavani (Kanaka Durga) whose hilltop temple overlooks the island.',
    culturalSignificance: 'Recreational island sanctuary accessible via boat transfers from Punnami Ghat.',
    architecture: 'Eco-resort island architecture with bamboo cottages, floating restaurants, and boardwalks.',
    thingsToSee: [
      'Scenic 10-minute boat transfer across the Krishna River',
      'Mangrove boardwalk trails and birdwatching',
      'Water sports including speedboats and banana rides',
      'Sunset reflections over the serene river waters'
    ],
    bestTimeToVisit: 'October to March (2:30 PM – 6:30 PM)',
    openingHours: '9:30 AM – 6:30 PM (Daily)',
    entryFee: 'Boat ride & entry: ₹120 per person',
    visitDuration: '2.5 – 4 hours',
    address: 'Bhavani Island, Krishna River, Vijayawada, Andhra Pradesh 520012',
    latitude: 16.5200,
    longitude: 80.5878,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Prakasam Barrage', 'Kanaka Durga Temple', 'Undavalli Caves'],
    tags: ['River Island', 'Krishna River', 'Boating', 'Water Sports'],
    famousFor: '133-acre river island on the Krishna River with boating, water sports, and mangrove walks'
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas successfully.');

    console.log('Upserting places data...');
    let count = 0;
    for (const p of seedPlaces) {
      await Place.findOneAndUpdate(
        { name: p.name, city: p.city },
        { $set: p },
        { upsert: true, new: true }
      );
      count++;
      console.log(`[${count}/${seedPlaces.length}] Seeded: ${p.name} (${p.city})`);
    }

    console.log(`\n🎉 Successfully seeded/updated ${count} places in MongoDB Atlas!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
