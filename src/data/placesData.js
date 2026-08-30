// Comprehensive Cultural & Historical Places Dataset for CultureConnect
// Covering 17 major Indian cultural hubs with authentic historical background, architecture, visiting info and coordinates.

export const CITIES_METADATA = [
  {
    city: 'Hyderabad',
    state: 'Telangana',
    tagline: 'The City of Pearls & Nizami Splendor',
    heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&auto=format&fit=crop&q=80',
    description: 'Hyderabad is a historic metropolis known for its rich blend of Telugu, Deccani, Mughal, and Nizami cultural influences. Founded in 1591 by Muhammad Quli Qutb Shah, it is famed for majestic stone forts, grand palaces, bustling historic bazaars, and world-renowned culinary traditions.',
    historicalSignificance: 'Capital of the medieval Golconda Sultanate and later the princely state ruled by the Asaf Jahi Nizams, once the wealthiest kingdom in the world.',
    culturalSignificance: 'A vibrant crossroads where Deccan Urdu, classical Telugu poetry, Nizami courts, Ramzan Haleem rituals, and Bonalu festivities thrive side by side.',
    famousFor: ['Charminar', 'Golconda Diamonds', 'Nizami Jewels', 'Hyderabadi Biryani', 'Pearls & Lacquer Bangles'],
    bestTimeToVisit: 'October to March',
    coordinates: [17.3850, 78.4867]
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Garden City & Royal Heritage of Mysore Rule',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&auto=format&fit=crop&q=80',
    description: 'Bengaluru is Karnataka\'s cultural and administrative heart. Beyond its modern tech prowess lies a deeply rooted legacy shaped by Kempe Gowda I, Hyder Ali, Tipu Sultan, and the Wodeyar dynasty, dotted with lush Victorian botanical gardens and grand Tudor-style palaces.',
    historicalSignificance: 'Founded in 1537 by chieftain Kempe Gowda with mud forts; later a crucial military stronghold during the Anglo-Mysore Wars under Tipu Sultan.',
    culturalSignificance: 'Home to the iconic Karaga festival, classical Carnatic music sabhas, historic filter coffee culture, and thriving contemporary theatre at Ranga Shankara.',
    famousFor: ['Bangalore Palace', 'Lalbagh Flower Show', 'Tipu Sultan Legacy', 'Vidhana Soudha', 'Filter Coffee & Dosa'],
    bestTimeToVisit: 'September to March',
    coordinates: [12.9716, 77.5946]
  },
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    tagline: 'Gateway to South Indian Classical Arts & Dravidian Temples',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80',
    description: 'Chennai is the soul of Dravidian heritage, classical music, and ancient temple architecture on the Coromandel Coast. With roots tracing back to the Pallava, Chola, and Vijayanagara empires, it boasts soaring gopurams, colonial stone bastions, and the world\'s second-longest urban beach.',
    historicalSignificance: 'Ancient maritime trade hub of Pallava port Mylapore; site of Fort St. George established in 1644 as the East India Company\'s earliest stronghold in India.',
    culturalSignificance: 'Global capital of Carnatic classical music (Margazhi Season), Bharatanatyam dance academies like Kalakshetra, and sacred Saivite & Vaishnavite temple traditions.',
    famousFor: ['Kapaleeshwarar Temple', 'Marina Beach', 'Margazhi Music Festival', 'Silk Sarees', 'Filter Kaapi'],
    bestTimeToVisit: 'November to February',
    coordinates: [13.0827, 80.2707]
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'City of Victorian Gothic Grandeur & Coastal Heritage',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&auto=format&fit=crop&q=80',
    description: 'Mumbai is an archipelago turned megacity that effortlessly bridges ancient rock-cut cave monasteries, UNESCO-listed Victorian Gothic and Art Deco architecture, and the thriving pulse of Indian cinema and arts.',
    historicalSignificance: 'Originally seven islands inhabited by Koli fishing communities, ceded to the British Portuguese crown in 1661 and transformed into India\'s financial gateway.',
    culturalSignificance: 'Celebrates Ganesh Chaturthi on an awe-inspiring civic scale, alongside Parsi Irani cafe culture, Marathi theatrical arts, and vibrant seaside promenades.',
    famousFor: ['Gateway of India', 'Elephanta Rock Caves', 'CSMT Railway Terminus', 'Marine Drive', 'Street Food & Arts'],
    bestTimeToVisit: 'October to February',
    coordinates: [19.0760, 72.8777]
  },
  {
    city: 'Delhi',
    state: 'Delhi',
    tagline: 'Imperial Capital of Seven Historic Empires',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80',
    description: 'Delhi stands as one of the world\'s oldest continuously inhabited capitals. Over a millennium, it was built, destroyed, and rebuilt as seven historic cities, leaving behind soaring minarets, sprawling sandstone citadels, serene Sufi shrines, and broad imperial boulevards.',
    historicalSignificance: 'Epic center of the Delhi Sultanate (Mamluk, Khalji, Tughlaq, Lodi dynasties) and the grand capital of the Mughal Empire under Shah Jahan.',
    culturalSignificance: 'The heart of Ganga-Jamuni tehzeeb, Qawwali sessions at Hazrat Nizamuddin Dargah, Chandni Chowk street lore, and national ceremonial landmarks.',
    famousFor: ['Red Fort', 'Qutub Minar', 'Humayun\'s Tomb', 'India Gate', 'Mughal Architecture & Cuisine'],
    bestTimeToVisit: 'October to March',
    coordinates: [28.6139, 77.2090]
  },
  {
    city: 'Kolkata',
    state: 'West Bengal',
    tagline: 'The Cultural Capital & City of Joy',
    heroImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&auto=format&fit=crop&q=80',
    description: 'Kolkata is India\'s intellectual, literary, and artistic cradle along the Hooghly River. Famous for neoclassical colonial monuments, grand terracotta and riverside temples, timeless tramways, and lively intellectual adda debates.',
    historicalSignificance: 'Capital of British India until 1911; birthplace of the Bengal Renaissance led by Rabindranath Tagore, Swami Vivekananda, and Raja Ram Mohan Roy.',
    culturalSignificance: 'UNESCO Intangible Cultural Heritage home of Durga Puja, Rabindra Sangeet, Bengali theatre, art galleries, and historic publishing houses on College Street.',
    famousFor: ['Victoria Memorial', 'Howrah Bridge', 'Dakshineswar Temple', 'Durga Puja Carnival', 'Mishti & Kathi Rolls'],
    bestTimeToVisit: 'October to March',
    coordinates: [22.5726, 88.3639]
  },
  {
    city: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Pink City of Royal Fortresses & Astronomy',
    heroImage: 'https://images.unsplash.com/photo-1603288940320-9844add94772?w=1200&auto=format&fit=crop&q=80',
    description: 'Jaipur is India\'s first planned city, founded in 1727 by Maharaja Sawai Jai Singh II. A UNESCO World Heritage City, it is famed for its pink terracotta facades, hillforts commanding sweeping desert views, and scientific astronomical observatories.',
    historicalSignificance: 'Royal seat of the Kachwaha Rajput dynasty who allied with Mughal rulers and created some of the most formidable defensive bastions in India.',
    culturalSignificance: 'World-renowned for block printing (Sanganeri & Bagru), blue pottery, Meenakari jewelry, royal folk music, and vibrant Teej festivals.',
    famousFor: ['Hawa Mahal', 'Amer Fort', 'Jantar Mantar', 'City Palace', 'Ghevar & Royal Hospitality'],
    bestTimeToVisit: 'October to March',
    coordinates: [26.9124, 75.7873]
  },
  {
    city: 'Agra',
    state: 'Uttar Pradesh',
    tagline: 'City of the Taj Mahal & Mughal Splendor',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&auto=format&fit=crop&q=80',
    description: 'Agra was the glorious imperial capital of the Mughal Empire during its golden age under Akbar, Jahangir, and Shah Jahan. Positioned along the Yamuna River, it hosts three UNESCO World Heritage Sites celebrated for white marble inlay work and red sandstone architecture.',
    historicalSignificance: 'Imperial capital of the Mughal dynasty between 1556 and 1648, witnessing the pinnacle of Indo-Islamic architectural engineering.',
    culturalSignificance: 'Home of the timeless Pietra Dura marble craft (Parchin Kari), Zardozi embroidery, Mughlai cooking secrets, and 400-year-old Petha confections.',
    famousFor: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Pietra Dura Inlay Art', 'Petha & Mughlai Delicacies'],
    bestTimeToVisit: 'October to March',
    coordinates: [27.1767, 78.0081]
  },
  {
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'The Spiritual Heart & Eternal City on the Holy Ganga',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&auto=format&fit=crop&q=80',
    description: 'Varanasi (Kashi / Banaras) is one of the world\'s oldest living cities, sanctified by the sacred River Ganges. With 84 historic stone ghats stretching along the riverbank, it is the spiritual pinnacle of Hinduism, Jainism, and Buddhism (Sarnath).',
    historicalSignificance: 'Inhabited for over 3,000 years; where Lord Buddha delivered his First Sermon at Sarnath and Adi Shankara revived Advaita philosophy.',
    culturalSignificance: 'The mesmerizing evening Ganga Aarti, Banarasi silk weaving traditions, the renowned Benares Gharana of classical music, and sacred Vedic learning centers.',
    famousFor: ['Kashi Vishwanath', 'Ganga Aarti at Dashashwamedh', 'Sarnath Stupa', 'Banarasi Silk Sarees', 'Morning Boat Rides'],
    bestTimeToVisit: 'October to March',
    coordinates: [25.3176, 82.9739]
  },
  {
    city: 'Amritsar',
    state: 'Punjab',
    tagline: 'Sacred Golden City of Peace, Valour & Langar',
    heroImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&auto=format&fit=crop&q=80',
    description: 'Amritsar is the spiritual and cultural capital of the Sikh faith, founded in 1577 by Guru Ram Das around a sacred pool of nectar (Amrit Sarovar). It is renowned worldwide for the shimmering Golden Temple, selfless community kitchens, and heroic freedom struggle landmarks.',
    historicalSignificance: 'Founded in the 16th century; epicenter of Sikh spiritual identity and witness to historic freedom struggles including the 1919 Jallianwala Bagh incident.',
    culturalSignificance: 'Offers the world\'s largest free community kitchen (Guru Ka Langar serving 100,000+ meals daily), soulful Gurbani kirtan recitals, and energetic Bhangra traditions.',
    famousFor: ['Golden Temple', 'Jallianwala Bagh Memorial', 'Wagah Border Beating Retreat', 'Amritsari Kulcha', 'Phulkari Crafts'],
    bestTimeToVisit: 'October to March',
    coordinates: [31.6340, 74.8723]
  },
  {
    city: 'Ahmedabad',
    state: 'Gujarat',
    tagline: 'India\'s First UNESCO World Heritage City & Ahimsa Legacy',
    heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1200&auto=format&fit=crop&q=80',
    description: 'Ahmedabad on the banks of the Sabarmati River is a living showcase of Indo-Saracenic stone architecture, ornate stepwells, intricately carved wooden pols (neighborhoods), and the spiritual launchpad of Mahatma Gandhi\'s non-violent freedom movement.',
    historicalSignificance: 'Founded in 1411 by Sultan Ahmed Shah; later the hub of India\'s textile revolution and Mahatma Gandhi\'s Sabarmati Ashram for the 1930 Dandi Salt March.',
    culturalSignificance: 'Nine nights of vibrant Navratri Garba, the International Kite Festival (Uttarayan), fine hand-woven Patola silks, and rich vegetarian culinary culture.',
    famousFor: ['Sabarmati Ashram', 'Adalaj Stepwell', 'Sidi Saiyyed Jali Lattice', 'UNESCO Heritage Pols', 'Navratri Garba'],
    bestTimeToVisit: 'October to March',
    coordinates: [23.0225, 72.5714]
  },
  {
    city: 'Pune',
    state: 'Maharashtra',
    tagline: 'Oxford of the East & Seat of the Maratha Empire',
    heroImage: 'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1200&auto=format&fit=crop&q=80',
    description: 'Pune was the power center of Chhatrapati Shivaji Maharaj and the seat of the Peshwa prime ministers who expanded the Maratha Empire across India. Surrounded by rugged Western Ghats hillforts, it seamlessly blends Maratha bravery with academic and cultural pursuits.',
    historicalSignificance: 'Administrative capital of the Maratha Confederacy in the 18th century; center of anti-colonial social reform movements led by Lokmanya Tilak and Jyotirao Phule.',
    culturalSignificance: 'Celebrated for Sawai Gandharva classical music festival, vibrant Ganesh Utsav dhol-tasha pathaks, Marathi theatre, and historical trekking culture.',
    famousFor: ['Shaniwar Wada', 'Aga Khan Palace', 'Sinhagad Fort', 'Dagdusheth Ganpati', 'Misal Pav & Puneri Culture'],
    bestTimeToVisit: 'July to February',
    coordinates: [18.5204, 73.8567]
  },
  {
    city: 'Kochi',
    state: 'Kerala',
    tagline: 'Queen of the Arabian Sea & Historic Spice Coast',
    heroImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop&q=80',
    description: 'Kochi is a picturesque coastal trading port where Chinese, Arab, Jewish, Portuguese, Dutch, and British merchant traditions interwove for over 600 years. Famous for cantileverd Chinese fishing nets, 16th-century synagogues, and backwater lagoons.',
    historicalSignificance: 'Major spice port since antiquity; first European settlement in India where Portuguese explorer Vasco da Gama was initially laid to rest.',
    culturalSignificance: 'Home to classical Kathakali dance-drama, Kalaripayattu martial arts, the Kochi-Muziris Contemporary Art Biennale, and rich Christian-Jewish-Hindu harmony.',
    famousFor: ['Chinese Fishing Nets', 'Mattancherry Dutch Palace', 'Jewish Synagogue', 'Fort Kochi Heritage', 'Kathakali Centers'],
    bestTimeToVisit: 'September to March',
    coordinates: [9.9312, 76.2673]
  },
  {
    city: 'Mysuru',
    state: 'Karnataka',
    tagline: 'City of Palaces, Silk & Royal Dasara Pageantry',
    heroImage: 'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1200&auto=format&fit=crop&q=80',
    description: 'Mysuru (Mysore) was the royal capital of the Kingdom of Mysore under the Wodeyar dynasty for over six centuries. Known as the Cultural Capital of Karnataka, it is famed for illuminated palaces, sandalwood fragrances, silk weaving, and the world-renowned Mysore Dasara festivities.',
    historicalSignificance: 'Royal seat of the Wodeyars and the bastion of Hyder Ali and Tipu Sultan during the 18th century Anglo-Mysore wars.',
    culturalSignificance: 'The grand 10-day Dasara Jamboo Savari procession, Ashtanga Yoga global capital, Mysore painting school, and sweet Mysore Pak culinary history.',
    famousFor: ['Mysore Palace (Amba Vilas)', 'Chamundeshwari Hill Temple', 'Brindavan Gardens', 'Mysore Silk & Sandalwood', 'Dasara Festival'],
    bestTimeToVisit: 'September to March',
    coordinates: [12.2958, 76.6394]
  },
  {
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    tagline: 'The City of Destiny on the Bay of Bengal',
    heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200&auto=format&fit=crop&q=80',
    description: 'Visakhapatnam (Vizag) is a jewel of the Eastern Ghats nestled along scenic coastal shores. A historic Buddhist heritage corridor and major naval command center, it offers prehistoric limestone caves, hilltop temples, submarine museums, and golden beaches.',
    historicalSignificance: 'Ancient Buddhist center dating back to the 2nd century BCE (Thotlakonda, Bavikonda); historic port during Kalinga and Eastern Chalukya periods.',
    culturalSignificance: 'Rich blend of coastal Andhra folk culture, classical Telugu literature, tribal handicrafts from the Araku Valley, and naval heritage pride.',
    famousFor: ['INS Kursura Submarine Museum', 'Kailasagiri Hilltop', 'Borra Caves', 'Simhachalam Temple', 'Rushikonda Beach'],
    bestTimeToVisit: 'October to March',
    coordinates: [17.6868, 83.2185]
  },
  {
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    tagline: 'The Sacred City on the Krishna River & Indrakeeladri Hills',
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    description: 'Vijayawada ("The Place of Victory") is a sacred commercial and cultural hub on the banks of the mighty Krishna River. Sheltered by the Indrakeeladri Hill, it features rock-cut Buddhist and Hindu cave architecture, ancient monolithic carvings, and vibrant riverfront ghats.',
    historicalSignificance: 'Associated with the legend of Arjuna acquiring the Pasupatastra on Indrakeeladri; home to 4th-7th century rock-cut Buddhist and Vishnukundina caves.',
    culturalSignificance: 'The pilgrimage fervor of the Kanaka Durga Temple, Navratri Teppotsavam boat festival on the Krishna, and Kondapalli wooden toy craft traditions.',
    famousFor: ['Kanaka Durga Temple', 'Undavalli Rock Caves', 'Prakasam Barrage', 'Bhavani Island', 'Kondapalli Fort & Toys'],
    bestTimeToVisit: 'October to March',
    coordinates: [16.5062, 80.6480]
  },
  {
    city: 'Goa',
    state: 'Goa',
    tagline: 'Heritage of Latin Baroque Churches & Coastal Forts',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80',
    description: 'Goa is a vibrant coastal state with a 450-year Portuguese colonial legacy reflected in UNESCO-listed Manueline and Baroque cathedrals, clifftop sea fortresses, Portuguese-Goan mansion villages, and tropical palm-fringed coastlines.',
    historicalSignificance: 'Ruled by Kadamba, Vijayanagara, and Bijapur Sultanate before becoming the capital of the Portuguese Estado da India from 1510 until 1961.',
    culturalSignificance: 'A harmonious blend of Konkani folk music (Mando), Shigmo spring festival, feast of St. Francis Xavier, and distinctive Indo-Portuguese culinary traditions.',
    famousFor: ['Basilica of Bom Jesus', 'Se Cathedral', 'Aguada Fort', 'Chapora Fort', 'Dudhsagar Falls & Konkan Culture'],
    bestTimeToVisit: 'October to April',
    coordinates: [15.4909, 73.8278]
  }
];

export const PLACES_DATA = [
  // ═════════════════════════════════════════════════════════════════════════════
  // 1. HYDERABAD (Telangana)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-hyd-1',
    name: 'Charminar',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The quintessential 16th-century symbol of Hyderabad, boasting four grand 56-meter minarets, intricate stucco ornamentation, and bustling historical bazaars.',
    fullDescription: 'Charminar (literally "Four Minarets") is an architectural and historical marvel built in 1591 CE by Muhammad Quli Qutb Shah, the fifth ruler of the Qutb Shahi dynasty. Constructed to commemorate the eradication of a devastating plague and mark the founding of Hyderabad, the monument stands at the historic crossroads of royal trade routes. Surrounded by the lively Laad Bazaar and Mecca Masjid, Charminar continues to be the beating cultural heart of Hyderabad.',
    history: 'Constructed in 1591 CE, Charminar was built when Sultan Muhammad Quli Qutb Shah shifted his capital from the cramped Golconda Fort to the newly planned city of Hyderabad along the Musi River. According to chroniclers, the Sultan prayed for the plague to end and pledged to build a grand monument at the spot. During Mughal and Nizami rule, the monument served as a ceremonial entrance and vantage tower over the city.',
    culturalSignificance: 'Charminar is inseparable from Hyderabadi identity. During Ramzan, the surrounding lanes are illuminated for late-night shopping, Haleem stalls, and traditional Irani chai gatherings. The area represents centuries of religious harmony, with the historic Bhagyalakshmi Temple at its base and the grand Mecca Masjid directly adjacent.',
    architecture: 'Built in the distinctive Indo-Islamic Qutb Shahi architectural style using granite, lime mortar, and pulverized marble. The square structure measures 20 meters on each side, with four arched gateways facing the cardinal directions. Four graceful minarets soar 56 meters high, each featuring double balconies and crowned by bulbous domes. The upper storey houses the oldest surviving mosque in Hyderabad with 45 prayer spaces.',
    thingsToSee: [
      'Upper storey prayer gallery and intricate stucco arches',
      'Panoramic 360-degree views of the old city and Mecca Masjid',
      'The central fountain (vazu) constructed for ablutions',
      'Delicate floral motifs, trefoil arches, and ornamental balustrades',
      'Laad Bazaar famous for handmade lac bangles and pearls just steps away'
    ],
    bestTimeToVisit: 'October to March; late afternoon (4:00 PM – 7:00 PM) for stunning golden hour lighting and evening illuminations.',
    openingHours: '9:30 AM – 5:30 PM (Daily)',
    entryFee: '₹25 for Indians; ₹300 for Foreign Tourists; Free for children below 15.',
    visitDuration: '1 – 2 hours',
    address: 'Charminar Rd, Char Kaman, Ghansi Bazaar, Hyderabad, Telangana 500002',
    latitude: 17.3616,
    longitude: 78.4747,
    images: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1626014303757-6564477577f1?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Mecca Masjid', 'Chowmahalla Palace', 'Laad Bazaar', 'Salar Jung Museum'],
    tags: ['Monument', 'Qutb Shahi', 'Heritage', 'Iconic', 'Bazaar'],
    famousFor: 'Iconic four-minaret Indo-Islamic architecture and Old City cultural pulse',
    howToReach: {
      air: 'Rajiv Gandhi International Airport (20 km, ~40 mins via PVNR Expressway)',
      train: 'Hyderabad Deccan / Nampally (4.5 km), Secunderabad (10 km)',
      local: 'Direct TSRTC buses, auto-rickshaws, and MGBS Metro Station (~2 km)'
    },
    verifiedInfoNotice: 'Information may change. Please verify timings and ticket prices before visiting.'
  },
  {
    id: 'place-hyd-2',
    name: 'Golconda Fort',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'A monumental 16th-century medieval citadel celebrated for ingenious acoustic engineering, formidable battlements, and its history as the trading hub for the Koh-i-Noor and Hope diamonds.',
    fullDescription: 'Golconda Fort was the formidable capital citadel of the Qutb Shahi dynasty. Spanning over 11 kilometers of perimeter walls with 87 semi-circular bastions and eight massive gateway doors, Golconda was once virtually impregnable. The fortress was renowned across the medieval world as the premier market for legendary diamonds extracted from the Kollur Mines, including the Koh-i-Noor, Hope Diamond, and Daria-i-Noor.',
    history: 'Originally erected as a mud fort by the Kakatiya rulers in the 13th century, Golconda was expanded into an impenetrable stone citadel between 1518 and 1687 by the Qutb Shahi kings. The fort withstood an eight-month siege by Mughal Emperor Aurangzeb in 1687 before falling due to internal treachery.',
    culturalSignificance: 'Golconda embodies the military and cultural zenith of the Deccan Sultanates. It hosts the vibrant annual Bonalu festival celebrations at the Sri Jagadamba Mahakali Temple located at the citadel summit, and an evening sound-and-light show recounting its heroic history.',
    architecture: 'Acoustic marvel: a hand-clap at the entrance portal (Fateh Darwaza) reverberates clearly at the Bala Hissar pavilion atop the hill, nearly 1 kilometer away. The complex features multi-tiered fortifications, royal palaces, weapon armories, camel stables, and sophisticated gravity-fed water supply systems.',
    thingsToSee: [
      'Fateh Darwaza with acoustic clap transmission to the hill peak',
      'Bala Hissar royal palace and council chambers at the summit',
      'Ibrahim Mosque and Sri Jagadamba Mahakali Temple',
      'Royal armory, granaries, and water distribution tanks',
      'Spectacular evening Sound and Light Show narrated in English, Hindi, and Telugu'
    ],
    bestTimeToVisit: 'October to March; late afternoon (3:00 PM – 6:30 PM) to avoid afternoon heat and catch the sound-and-light show.',
    openingHours: '9:00 AM – 5:30 PM (Daily); Sound & Light Show: 6:30 PM – 8:30 PM',
    entryFee: '₹25 for Indians; ₹300 for Foreigners; Sound & Light Show: ₹140 (Executive).',
    visitDuration: '2.5 – 4 hours',
    address: 'Ibrahim Bagh, Hyderabad, Telangana 500008',
    latitude: 17.3833,
    longitude: 78.4011,
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Qutb Shahi Tombs', 'Taramati Baradari', 'Charminar'],
    tags: ['Fort', 'Diamonds', 'Acoustics', 'Kakatiya', 'Qutb Shahi'],
    famousFor: 'Legendary diamond trade history, acoustic engineering, and massive stone ramparts',
    howToReach: {
      air: 'Rajiv Gandhi International Airport (28 km)',
      train: 'Hyderabad Deccan Station (9 km)',
      local: 'Buses from Mehdipatnam and direct app-cabs'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-hyd-3',
    name: 'Chowmahalla Palace',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'The opulent seat of the Asaf Jahi Nizams, featuring classical Persian-European architecture, sparkling Belgian crystal chandeliers, and vintage royal car collections.',
    fullDescription: 'Chowmahalla Palace (meaning "Four Palaces") was the official residence and ceremonial court of the Nizams of Hyderabad. Begun in 1750 by Nizam Salabat Jung and completed by Nizam Afzal-ud-Daulah in 1869, the palace compound mirrors the Shah of Iran\'s palace in Isfahan. It received the prestigious UNESCO Asia-Pacific Merit Award for Cultural Heritage Conservation in 2010.',
    history: 'For over two centuries, Chowmahalla served as the venue for royal accessions, banquets for British viceroys, and grand state receptions. The palace spans two grand courtyards and four majestic palaces: Afzal Mahal, Mahtab Mahal, Tahniyat Mahal, and Aftab Mahal.',
    culturalSignificance: 'Showcases the unparalleled wealth, refinement, and cosmopolitan aesthetic of the Nizams of Hyderabad, featuring royal attire, rare manuscripts, arms, and royal protocol artefacts.',
    architecture: 'A synthesis of Neoclassical European, Mughal, and Persian court architectural styles. The Khilwat Mubarak (Grand Durbar Hall) boasts 19 spectacular Belgian crystal chandeliers, pure marble flooring, and the sacred Takht-e-Nishan (royal marble throne).',
    thingsToSee: [
      'Khilwat Mubarak Grand Durbar Hall with 19 Belgian chandeliers',
      'The Takht-e-Nishan (Royal Seat of the Nizams)',
      'Vintage Cars Gallery including the 1912 Rolls-Royce Silver Ghost',
      'Clock Tower containing a 250-year-old mechanical clock that still ticks',
      'Lush courtyards with marble fountains and royal armory collections'
    ],
    bestTimeToVisit: 'October to February (10:00 AM – 3:00 PM)',
    openingHours: '10:00 AM – 5:00 PM (Closed on Fridays)',
    entryFee: '₹100 for Indians; ₹400 for Foreigners; ₹50 for Camera.',
    visitDuration: '2 – 3 hours',
    address: '20-4-236, Motigalli, Khilwat, Hyderabad, Telangana 500002',
    latitude: 17.3578,
    longitude: 78.4717,
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Charminar', 'Mecca Masjid', 'Laad Bazaar'],
    tags: ['Palace', 'Nizam', 'Royal', 'Belgian Chandeliers', 'Vintage Cars'],
    famousFor: 'Opulent Khilwat Durbar Hall, Belgian chandeliers, and the 1912 royal Rolls-Royce',
    howToReach: {
      air: 'Rajiv Gandhi International Airport (21 km)',
      train: 'Hyderabad Deccan / Nampally (5 km)',
      local: 'Short walk or auto-rickshaw from Charminar'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-hyd-4',
    name: 'Salar Jung Museum',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Museum & Heritage',
    shortDescription: 'One of the world\'s largest single-person art collections, housing over 40,000 rare artifacts, the Veiled Rebecca marble statue, and the famous British Musical Clock.',
    fullDescription: 'The Salar Jung Museum is an institution of national importance located on the southern bank of the Musi River. It contains the priceless personal collection of Nawab Mir Yousuf Ali Khan (Salar Jung III), former Prime Minister of Hyderabad. Spanning 38 galleries across three buildings (Indian, Western, and Eastern sections), the museum houses manuscripts, European oil paintings, jade daggers, porcelain, and textiles spanning centuries.',
    history: 'Salar Jung III devoted 40 years and substantial fortunes to assembling art treasures from across Asia, Europe, and the Middle East. Opened to the public at Dewan Deodi in 1951, the collection was transferred to its current grand riverfront facility in 1968 and declared an Institution of National Importance by an Act of Parliament.',
    culturalSignificance: 'A testament to the global cultural horizons and patronization of arts in princely Hyderabad, bridging European Renaissance masterpieces with Asian calligraphic arts.',
    architecture: 'Semi-circular grand modern structure along the Musi River, housing 38 climate-controlled thematic galleries organized across Indian, Western, and Eastern wings.',
    thingsToSee: [
      'Veiled Rebecca: Giovanni Benzoni\'s 1876 breathtaking translucent marble sculpture',
      'The 19th-century British Musical Clock with mechanical toy figures appearing hourly',
      'Double-sided wooden sculpture of Mephistopheles and Margaretta',
      'Mughal Emperor Shah Jahan\'s personal jade dagger with inscribed calligraphy',
      'Rare Quranic manuscripts, Tipu Sultan\'s wardrobe, and Chinese ivory carvings'
    ],
    bestTimeToVisit: 'Year-round; plan visits between 11:30 AM and 1:30 PM to witness the famous musical clock chime at 12:00 PM.',
    openingHours: '10:00 AM – 5:00 PM (Closed on Fridays and Public Holidays)',
    entryFee: '₹50 for Indian Adults; ₹20 for Children; ₹500 for Foreigners.',
    visitDuration: '3 – 5 hours',
    address: 'Salar Jung Marg, Darulshifa, Hyderabad, Telangana 500002',
    latitude: 17.3714,
    longitude: 78.4804,
    images: [
      'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Charminar', 'Purani Haveli', 'State Central Library'],
    tags: ['Museum', 'Art', 'Veiled Rebecca', 'Musical Clock', 'Jade'],
    famousFor: 'The Veiled Rebecca marble statue and the historic hourly Musical Clock',
    howToReach: {
      air: 'Rajiv Gandhi International Airport (23 km)',
      train: 'Hyderabad Deccan Station (3.5 km)',
      local: 'MGBS Metro Station (~1.2 km walk) or local city buses'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-hyd-5',
    name: 'Qutb Shahi Tombs',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The serene necropolis of the seven Qutb Shahi rulers, set in Ibrahim Bagh with magnificent domed mausoleums, landscaped gardens, and Persian tilework.',
    fullDescription: 'The Qutb Shahi Tombs are a complex of majestic domed royal mausoleums erected in Ibrahim Bagh, just 1 kilometer north of Golconda Fort. Built across the 16th and 17th centuries, the necropolis holds the tombs of all seven rulers of the Qutb Shahi dynasty, royal family members, and Sufi saints. The site recently underwent an award-winning restoration by the Aga Khan Trust for Culture.',
    history: 'Each sultan erected his own tomb during his lifetime. The oldest tomb belongs to Sultan Quli Qutb-ul-Mulk (1543), while the grandest belongs to Muhammad Quli Qutb Shah, founder of Hyderabad. The complex survived Mughal plunder and was safeguarded by Salar Jung I in the 19th century.',
    culturalSignificance: 'Represents the harmonious fusion of Persian, Pashtun, and Hindu Deccan architectural motifs, showcasing the syncretic spirit of the medieval Deccan.',
    architecture: 'Domed pavilions constructed on raised square and octagonal plinths. Features bulbous domes, intricate plasterwork, pineapple motifs, and stepped sarcophagi surrounded by lush Charbagh gardens.',
    thingsToSee: [
      'Tomb of Muhammad Quli Qutb Shah with its massive two-tiered gallery',
      'Tomb of Hayat Bakshi Begum (the queen mother of Golconda)',
      'Restored stepwells (baolis) and water channels',
      'Visitor interpretation center curated by Aga Khan Trust for Culture',
      'Original turquoise and cobalt blue Persian glazed tile remnants'
    ],
    bestTimeToVisit: 'October to March; late afternoon (3:30 PM – 6:00 PM) for tranquil photography.',
    openingHours: '9:30 AM – 5:30 PM (Daily)',
    entryFee: '₹25 for Indians; ₹300 for Foreigners; ₹50 for Camera.',
    visitDuration: '1.5 – 2.5 hours',
    address: 'Qutub Shahi Tombs, Ibrahim Bagh, Hyderabad, Telangana 500008',
    latitude: 17.3934,
    longitude: 78.3962,
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Golconda Fort', 'Taramati Baradari', 'Durgam Cheruvu'],
    tags: ['Tombs', 'Qutb Shahi', 'Aga Khan Restoration', 'Gardens', 'Architecture'],
    famousFor: 'Grand domed royal mausoleums set in landscaped heritage Charbagh gardens',
    howToReach: {
      air: 'Rajiv Gandhi International Airport (30 km)',
      train: 'Hyderabad Deccan Station (10 km)',
      local: 'Auto-rickshaw or taxi from Mehdipatnam'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-hyd-6',
    name: 'Mecca Masjid',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'One of India\'s largest and oldest mosques, built with bricks baked from soil brought from the holy city of Mecca, capable of accommodating 10,000 worshippers.',
    fullDescription: 'Mecca Masjid (Makkah Masjid) is an awe-inspiring heritage congregational mosque located just 100 meters southwest of Charminar. Commissioned in 1617 by Sultan Muhammad Quli Qutb Shah and completed by Mughal Emperor Aurangzeb in 1694 after 77 years of construction, the mosque features monolithic granite arches and the royal tombs of the Asaf Jahi Nizams.',
    history: 'Sultan Muhammad Quli Qutb Shah personally laid the foundation stone. Bricks made from earth transported from Mecca were embedded into the central arch of the prayer hall, giving the mosque its sacred name. Over 8,000 masons worked continuously for decades to carve the immense granite structures.',
    culturalSignificance: 'The epic spiritual center of Hyderabad\'s Muslim community. The main courtyard fills with thousands of worshippers during Friday prayers and Shab-e-Qadr during Ramzan.',
    architecture: 'Built of colossal black granite blocks quarried locally. The main prayer hall measures 67 meters wide and 54 meters deep, supported by fifteen grand arches. The courtyard features a serene marble fountain and the marble canopied tombs of the Nizams of Hyderabad.',
    thingsToSee: [
      'Grand central prayer hall carved from single granite blocks',
      'The central arch containing sacred soil from Mecca',
      'Nizam\'s royal marble tombs pavilion (Asaf Jahi dynasty resting place)',
      'The expansive courtyard with historic ablution pool (hauz)',
      'Panoramic perspective of the rear facade of Charminar'
    ],
    bestTimeToVisit: 'October to March; morning (8:00 AM – 11:00 AM) or non-prayer hours.',
    openingHours: '4:00 AM – 9:30 PM (Entry restricted during daily prayer times for non-worshippers)',
    entryFee: 'Free entry (Modest attire required: shoulders and legs covered, head covering for women).',
    visitDuration: '45 mins – 1.5 hours',
    address: 'Near Charminar, Ghansi Bazaar, Hyderabad, Telangana 500002',
    latitude: 17.3606,
    longitude: 78.4735,
    images: [
      'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Charminar', 'Chowmahalla Palace', 'Laad Bazaar'],
    tags: ['Mosque', 'Spiritual', 'Granite', 'Historic', 'Nizam Tombs'],
    famousFor: 'Colossal black granite arches and soil brought from Mecca embedded in its central arch',
    howToReach: {
      air: 'Rajiv Gandhi International Airport (20 km)',
      train: 'Hyderabad Deccan / Nampally (4.5 km)',
      local: '2-minute walk from Charminar'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-hyd-7',
    name: 'Hussain Sagar & Buddha Statue',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Modern Landmark',
    shortDescription: 'A historic 16th-century heart-shaped lake linking Hyderabad and Secunderabad, crowned by the world\'s tallest monolithic granite statue of Gautama Buddha at Gibraltar Rock.',
    fullDescription: 'Hussain Sagar is a sprawling artificial lake excavated in 1563 by Ibrahim Quli Qutb Shah. At its center stands a majestic 18-meter-tall, 450-tonne monolithic statue of Gautama Buddha carved out of white granite. The promenade, known as Necklace Road (PV Narasimha Rao Marg), is the city\'s prime recreational corridor featuring parks, boating, and vibrant evening culture.',
    history: 'Built across a tributary of the Musi River to fulfill irrigation needs, the lake was named after Sufi saint Hussain Shah Wali who designed it. In 1992, the colossal monolithic Buddha statue was sculpted by 200 artisans over five years and installed on the central Gibraltar Rock.',
    culturalSignificance: 'The venue for the grand finale of Ganesh Chaturthi celebrations when thousands of idols are immersed. It is also an active center for sailing, regattas, and Sunday evening family gatherings.',
    architecture: 'Monolithic sculpture carved from a single piece of white granite, standing on a 15-foot lotus pedestal with bas-relief carvings of Buddhist motifs.',
    thingsToSee: [
      'Boat ride across the lake to Gibraltar Rock to touch the Buddha pedestal',
      'Lumbini Park musical laser fountain show',
      'NTR Gardens and Sanjeevaiah Park butterfly garden',
      'Busts of famous Telugu historical figures along Tank Bund',
      'Illuminated skyline reflections across the lake waters at night'
    ],
    bestTimeToVisit: 'October to March; 5:00 PM – 9:00 PM for cool breezes and night illuminations.',
    openingHours: '8:00 AM – 10:00 PM (Daily); Boating: 9:00 AM – 8:30 PM',
    entryFee: 'Lake promenade: Free; Boat Ride to Buddha Statue: ₹80 – ₹150 (Speed boat options available).',
    visitDuration: '1.5 – 3 hours',
    address: 'Tank Bund Rd, Hussain Sagar, Hyderabad, Telangana 500004',
    latitude: 17.4239,
    longitude: 78.4738,
    images: [
      'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Birla Mandir', 'Lumbini Park', 'NTR Gardens', 'Telangana Secretariat'],
    tags: ['Lake', 'Buddha', 'Monolith', 'Boating', 'Tank Bund'],
    famousFor: 'World\'s tallest monolithic granite Buddha statue and sunset lake cruises',
    howToReach: {
      air: 'Rajiv Gandhi International Airport (32 km)',
      train: 'Secunderabad (4 km) or Hyderabad Deccan (4 km)',
      local: 'Khairatabad or Lakdikapul Metro Stations (~1.5 km)'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-hyd-8',
    name: 'Birla Mandir',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'A magnificent hilltop temple carved entirely from 2,000 tonnes of pure white Rajasthani Makrana marble, dedicated to Lord Venkateswara.',
    fullDescription: 'Birla Mandir sits atop the 280-foot-high Naubat Pahad granite hill overlooking Hussain Sagar Lake. Built over 10 years by the Birla Foundation and consecrated in 1976 by Swami Ranganathananda of Ramakrishna Mission, the temple is renowned for its tranquil spiritual ambiance, intricate stone carvings, and panoramic views of the twin cities.',
    history: 'Constructed using 2,000 metric tonnes of pure white Makrana marble from Rajasthan. The temple was deliberately designed without traditional bells to provide a quiet, contemplative atmosphere for meditation.',
    culturalSignificance: 'One of the most frequented spiritual landmarks in Telangana, welcoming devotees of all faiths. Especially magnificent during Janmashtami, Vaikunta Ekadasi, and Navratri.',
    architecture: 'A seamless blend of South Indian Dravidian gopuram architecture, Utkala (Odia) temple vimana styling, and Rajasthani marble craft. The sanctum sanctorum houses an 11-foot-tall granite idol of Lord Venkateswara under a carved lotus canopy.',
    thingsToSee: [
      'Intricately sculpted scenes from the Mahabharata and Ramayana on marble walls',
      'Granite idol of Lord Venkateswara with carved celestial deities',
      'Panoramic sunset views over Hussain Sagar and the Hyderabad skyline',
      'Shrines dedicated to Padmavathi, Andal, Shiva, Hanuman, and Ganesha',
      'Illuminated white marble glowing against the night sky'
    ],
    bestTimeToVisit: 'October to March; late afternoon (4:30 PM – 7:30 PM) for sunset and illuminated city views.',
    openingHours: '7:00 AM – 12:00 PM and 3:00 PM – 9:00 PM (Daily)',
    entryFee: 'Free entry (Mobile phones and cameras must be deposited at the free locker counter).',
    visitDuration: '1 – 2 hours',
    address: 'Hill Fort Rd, Ambedkar Colony, Khairtabad, Hyderabad, Telangana 500004',
    latitude: 17.4062,
    longitude: 78.4691,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Hussain Sagar', 'BM Birla Science Centre', 'Lumbini Park'],
    tags: ['Temple', 'White Marble', 'Lord Venkateswara', 'Hilltop View', 'Peaceful'],
    famousFor: 'Pure white Makrana marble architecture and panoramic hilltop city views',
    howToReach: {
      air: 'Rajiv Gandhi International Airport (30 km)',
      train: 'Hyderabad Deccan / Nampally (2.5 km)',
      local: 'Lakdikapul Metro Station (~1.5 km) or auto-rickshaw'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-hyd-9',
    name: 'Shilparamam Arts & Crafts Village',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Cultural Center',
    shortDescription: 'A sprawling 65-acre traditional arts and crafts village dedicated to preserving and showcasing Indian rural folk arts, weaving, and handicrafts.',
    fullDescription: 'Shilparamam is an enchanting cultural enclave created in 1992 in Madhapur (HITEC City) to preserve and promote Indian folk traditions. Designed as an ethnic rural village, it features thatched artisan huts, a rock museum, rural life sculptures, open-air amphitheatres for classical and folk dance performances, and bustling craft bazaars.',
    history: 'Established by the Government of Andhra Pradesh to provide direct market access to traditional rural weavers, brass sculptors, terracotta potters, and folk artistes from across India.',
    culturalSignificance: 'Hosts the annual All-India Crafts Mela in January, Sankranti cultural festivals, and weekend dance recitals by Kuchipudi, Bharatanatyam, and Perini Sivatandavam artists.',
    architecture: 'Rural rustic design with terracotta tiled cottages, natural stone pathways, thatched craft pavilions, waterfalls, and life-size ethnic diorama installations.',
    thingsToSee: [
      'Artisan craft stalls selling Kalamkari fabrics, Kondapalli toys, and Bidriware directly from craftsmen',
      'Folk life village museum featuring life-size dioramas of rural Indian life',
      'Open-air amphitheatre hosting live cultural and classical dance recitals',
      'Rock garden and serene boating pond',
      'Annual International Crafts Fair and Dussehra celebrations'
    ],
    bestTimeToVisit: 'October to March; late afternoon (3:30 PM – 8:30 PM).',
    openingHours: '10:30 AM – 8:30 PM (Daily)',
    entryFee: '₹60 for Adults; ₹20 for Children; Boating and Rock Museum charged separately.',
    visitDuration: '2 – 3.5 hours',
    address: 'HITEC City, Madhapur, Hyderabad, Telangana 500081',
    latitude: 17.4526,
    longitude: 78.3791,
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1569851935333-6ca1448cc299?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Durgam Cheruvu Cable Bridge', 'HITEC City', 'Inorbit Mall'],
    tags: ['Crafts', 'Folk Arts', 'Village', 'Kalamkari', 'Performances'],
    famousFor: 'Authentic Indian handicrafts, folk artisan stalls, and live cultural dance shows',
    howToReach: {
      air: 'Rajiv Gandhi International Airport (35 km)',
      train: 'Hitec City Railway Station (3 km), Secunderabad (18 km)',
      local: 'HITEC City or Durgam Cheruvu Metro Stations (500m)'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 2. BENGALURU (Karnataka)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-blr-1',
    name: 'Bengaluru Palace',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'A majestic 19th-century Tudor-style royal palace inspired by England\'s Windsor Castle, featuring fortified towers, stained glass, and royal hunting trophies.',
    fullDescription: 'Bengaluru Palace is a grand royal estate constructed in 1878 by the Central College\'s Rev. J. Garrett and purchased in 1884 by Maharaja Chamarajendra Wadiyar X of Mysore. Spread across 454 acres in the heart of Bengaluru, the palace features fortified battlements, turrets, Gothic stained glass windows, and opulent wood-carved interiors.',
    history: 'Acquired by the Wadiyar royal family to serve as a royal retreat in Bengaluru, the palace hosted state banquets, royal polo matches, and private durbars. It remains one of the few examples of Tudor revival architecture in South India.',
    culturalSignificance: 'Preserves the living royal traditions of the Kingdom of Mysore, housing 19th-century oil paintings by Raja Ravi Varma and historic furniture.',
    architecture: 'Tudor and Scottish Gothic revival architectural styles with fortified crenellated towers, Romanesque arches, wood floral relief carvings, and Victorian tiles.',
    thingsToSee: [
      'Durbar Hall with sweeping arches and ornate stained glass',
      'The royal courtyard with Moroccan ceramic mosaic tiles',
      'Raja Ravi Varma royal portrait gallery and Victorian photography',
      'Audio-guided tour narrating Wadiyar royal family history',
      'Palace grounds and vintage royal hunting carriages'
    ],
    bestTimeToVisit: 'October to February (10:00 AM – 4:00 PM)',
    openingHours: '10:00 AM – 5:30 PM (Daily)',
    entryFee: '₹250 for Indians; ₹450 for Foreigners; Audio guide included.',
    visitDuration: '2 – 3 hours',
    address: 'Vasanth Nagar, Bengaluru, Karnataka 560052',
    latitude: 12.9988,
    longitude: 77.5921,
    images: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Cubbon Park', 'Vidhana Soudha', 'National Gallery of Modern Art'],
    tags: ['Palace', 'Tudor', 'Wodeyar', 'Windsor Style', 'Royalty'],
    famousFor: 'Windsor Castle-inspired Tudor architecture and Raja Ravi Varma royal paintings',
    howToReach: {
      air: 'Kempegowda International Airport (31 km)',
      train: 'Bangalore City / KSR Bengaluru (4.5 km), Bangalore Cantt (2 km)',
      local: 'Cantonment Railway Station or Cubbon Park Metro'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-blr-2',
    name: 'Vidhana Soudha',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    category: 'Modern Landmark',
    shortDescription: 'The monumental seat of Karnataka\'s state legislature, celebrated as the largest legislative building in India, built in magnificent Neo-Dravidian granite architecture.',
    fullDescription: 'Vidhana Soudha is the iconic legislative seat of Karnataka, conceived and constructed under the leadership of Chief Minister Kengal Hanumanthaiah between 1951 and 1956. Built entirely from Bangalore granite quarried from Mallasandra and surrounding hills, it is renowned as a masterpiece of \'Neo-Dravidian\' architecture inscribed with the motto: "Government Work is God\'s Work".',
    history: 'Initiated to replace colonial European assembly chambers with an indigenous Indian architectural monument that celebrated post-independence democratic sovereignty.',
    culturalSignificance: 'The ultimate civic and political symbol of Karnataka. Illuminates with 10,000+ golden lights on Sunday evenings and national holidays, drawing thousands of spectators.',
    architecture: 'Neo-Dravidian style incorporating elements of Chola, Hoysala, and Chalukyan architecture. Features a central dome crowned by a 60-foot four-headed Lion Capital of Asoka, four corner towers, and sweeping stone staircases.',
    thingsToSee: [
      'Grand 45-meter-wide central flight of stairs with 45 steps',
      'The four-headed Lion of Asoka crowning the 60-foot central dome',
      'Night illumination with thousands of golden floodlights on Sundays (6:30 PM – 8:30 PM)',
      'The High Court of Karnataka (Attara Kacheri) situated directly opposite',
      'Statue of Dr. B.R. Ambedkar and Jawaharlal Nehru in the gardens'
    ],
    bestTimeToVisit: 'Sundays and public holidays (6:00 PM – 8:30 PM) for the spectacular evening lighting.',
    openingHours: 'Exterior viewing 24/7; Internal entry restricted to official business / authorized visits.',
    entryFee: 'Exterior viewing: Free.',
    visitDuration: '45 mins – 1.5 hours',
    address: 'Ambedkar Bheedhi, Sampangi Rama Nagara, Bengaluru, Karnataka 560001',
    latitude: 12.9796,
    longitude: 77.5907,
    images: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Cubbon Park', 'Attara Kacheri (High Court)', 'Visvesvaraya Museum'],
    tags: ['Legislature', 'Granite', 'Neo-Dravidian', 'Illumination', 'Landmark'],
    famousFor: 'Colossal Neo-Dravidian granite legislative architecture and Sunday evening lighting',
    howToReach: {
      air: 'Kempegowda International Airport (33 km)',
      train: 'KSR Bengaluru (3 km)',
      local: 'Vidhana Soudha Metro Station (Purple Line directly outside)'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-blr-3',
    name: 'Tipu Sultan\'s Summer Palace',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'An exquisite two-storey wooden palace constructed entirely from pure teakwood, featuring carved arches, floral fresco wall paintings, and historical military relics.',
    fullDescription: 'Tipu Sultan\'s Summer Palace (Rashk-e-Jannat, meaning "Envy of Heaven") was the summer retreat of the ruler of Mysore, Tipu Sultan. Begun by his father Hyder Ali in 1781 and completed by Tipu Sultan in 1791, the palace is an extraordinary example of Indo-Islamic wooden architecture, constructed almost entirely from teakwood pillars, beams, and decorative brackets.',
    history: 'Served as Tipu Sultan\'s command base and summer court during his wars with the British East India Company. After Tipu Sultan\'s death in the Fourth Anglo-Mysore War in 1799, the British used the palace as the Secretariat before transferring it to the Archaeological Survey of India.',
    culturalSignificance: 'A historic testament to the fierce resistance of the Kingdom of Mysore against colonial expansion and an unmatched example of Indian timber craftsmanship.',
    architecture: 'Two-storey open structure with elaborately carved teak pillars, fluted multifold arches, floral frescoes in natural vegetable dyes, and double balconies (Zenana quarters).',
    thingsToSee: [
      'Intricate carved teakwood pillars supporting multifold arches',
      'Ground floor museum displaying Tipu Sultan\'s clothes, coins, and swords',
      'Replica of "Tipu\'s Tiger" mechanical organ device',
      'Faded Persian wall paintings with floral patterns on ceilings',
      'Nearby Bangalore Fort gate remnants and Kote Venkataramana Temple'
    ],
    bestTimeToVisit: 'October to March; morning hours (9:00 AM – 12:00 PM).',
    openingHours: '8:30 AM – 5:30 PM (Daily)',
    entryFee: '₹20 for Indians; ₹250 for Foreigners.',
    visitDuration: '1 – 1.5 hours',
    address: 'Tippu Sultan Palace Rd, Chamrajpet, Bengaluru, Karnataka 560018',
    latitude: 12.9593,
    longitude: 77.5737,
    images: [
      'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Bangalore Fort', 'KR Market', 'Kote Venkataramana Temple'],
    tags: ['Teakwood', 'Tipu Sultan', 'Palace', 'Indo-Islamic', 'History'],
    famousFor: 'Entirely teakwood-carved architectural structure and historical Mysore war artifacts',
    howToReach: {
      air: 'Kempegowda International Airport (37 km)',
      train: 'KSR Bengaluru (3.5 km)',
      local: 'KR Market or Chickpet Metro Station (~1 km)'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-blr-4',
    name: 'Lalbagh Botanical Garden',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    category: 'Nature & Scenic',
    shortDescription: 'A historic 240-acre botanical haven commissioned by Hyder Ali in 1760, famous for its London Crystal Palace-inspired Glass House and 3-billion-year-old Peninsular Gneiss rock.',
    fullDescription: 'Lalbagh Botanical Garden is one of India\'s most renowned botanical sanctuaries. Commissioned by ruler Hyder Ali in 1760 and completed with exotic flora by Tipu Sultan, the garden houses India\'s largest collection of rare tropical and subtropical plants, centuries-old trees from Persia and Australia, a tranquil lake, and the iconic Glass House.',
    history: 'Conceived as a private 40-acre royal garden by Hyder Ali, it was expanded under British botanists Dr. Wallich, William New, and John Cameron into a premier international botanical research station.',
    culturalSignificance: 'Hosts the legendary bi-annual Lalbagh Flower Show during Republic Day and Independence Day, drawing hundreds of thousands of nature enthusiasts.',
    architecture: 'The iconic Glass House was erected in 1889 modeling London\'s Crystal Palace. The park also features the Lalbagh Rock, a protected National Geological Monument estimated at 3 billion years old.',
    thingsToSee: [
      'The historic Glass House housing vibrant botanical displays',
      'The 3,000-million-year-old Lalbagh Peninsular Gneiss rock with Kempe Gowda tower',
      'Centuries-old Silk Cotton, Kapok, and Baobab trees',
      'Lalbagh Lake and lotus pond with birdwatching viewpoints',
      'Floral Clock and Topiary Gardens'
    ],
    bestTimeToVisit: 'Year-round; early morning (6:00 AM – 9:00 AM) or late afternoon. Flower shows in January & August.',
    openingHours: '6:00 AM – 7:00 PM (Daily)',
    entryFee: '₹25 for Adults; Free for morning walkers (6:00 AM – 9:00 AM); Flower show tickets separate.',
    visitDuration: '2 – 3 hours',
    address: 'Mavalli, Bengaluru, Karnataka 560004',
    latitude: 12.9507,
    longitude: 77.5848,
    images: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Bull Temple', 'Basavanagudi', 'Mavalli Tiffin Room (MTR)'],
    tags: ['Botanical', 'Glass House', 'Hyder Ali', 'Lalbagh Rock', 'Nature'],
    famousFor: 'London Crystal Palace-inspired Glass House and the historic Flower Shows',
    howToReach: {
      air: 'Kempegowda International Airport (38 km)',
      train: 'KSR Bengaluru (4.5 km)',
      local: 'Lalbagh Metro Station (Green Line right at the West Gate)'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 3. CHENNAI (Tamil Nadu)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-chn-1',
    name: 'Kapaleeshwarar Temple',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'A classic 7th-century Dravidian temple in Mylapore dedicated to Lord Shiva, featuring a vibrant 37-meter rainbow gopuram, tank, and classical music traditions.',
    fullDescription: 'The Arulmigu Kapaleeshwarar Temple is the spiritual crown of Chennai, located in the ancient cultural quarter of Mylapore. Dedicated to Lord Shiva (worshipped as Kapaleeshwarar) and Goddess Parvati (Karpagambal), the temple represents the pinnacle of Dravidian stone and stucco craftsmanship with a soaring 37-meter-tall East Gopuram.',
    history: 'Original shrine built in the 7th century CE by the Pallava kings along the coast, praised in hymns by Saivite Nayanar saints Sambandar and Appar. Rebuilt in its current inland location by the Vijayanagara kings in the 16th century following Portuguese coastal incursions.',
    culturalSignificance: 'Epicenter of Mylapore\'s classical Carnatic music festivals and the annual 10-day Panguni Peruvizha chariot festival (Arupathumoovar) honoring 63 Saiva saints.',
    architecture: 'Classic Dravidian temple layout featuring a towering multi-tiered gopuram adorned with hundreds of sculpted stucco deities painted in vibrant hues, a massive sacred temple tank (kulam), and stone-carved pillared mandapams.',
    thingsToSee: [
      'Soaring 120-foot East Gopuram with multi-tiered mythological sculptures',
      'Shrine of Goddess Karpagambal depicted as a peacock worshipping Shiva',
      'The sacred Punnai Tree (one of the oldest temple trees in Chennai)',
      'The expansive temple tank (kulam) reflecting surrounding gopurams',
      'Evening classical music concerts and Panguni Arupathumoovar chariot festival'
    ],
    bestTimeToVisit: 'October to March; early morning (6:00 AM – 9:00 AM) or evening aarti (5:00 PM – 8:30 PM).',
    openingHours: '5:30 AM – 12:00 PM and 4:30 PM – 9:30 PM (Closed afternoon)',
    entryFee: 'Free entry (Traditional dress code: dhotis/pants, sarees/salwars; no shorts).',
    visitDuration: '1 – 2 hours',
    address: '12, Vadakku Maada Veethi, Mylapore, Chennai, Tamil Nadu 600004',
    latitude: 13.0336,
    longitude: 80.2698,
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['San Thome Basilica', 'Marina Beach', 'Ramakrishna Math'],
    tags: ['Temple', 'Dravidian', 'Shiva', 'Mylapore', 'Gopuram'],
    famousFor: 'Vibrant 37m Dravidian gopuram, Panguni Peruvizha festival, and Mylapore heritage',
    howToReach: {
      air: 'Chennai International Airport (15 km)',
      train: 'Chennai Central (7 km), Chennai Egmore (6 km), Thirumayilai MRTS (400 m)',
      local: 'Thirumayilai MRTS station or direct MTC buses to Mylapore Tank'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-chn-2',
    name: 'Fort St. George & Museum',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The first English fortress constructed in India in 1644, containing St. Mary\'s Church (India\'s oldest Anglican church) and colonial military museums.',
    fullDescription: 'Fort St. George was erected in 1644 on coastal land granted by the Nayak rulers of Chandragiri. It was the British East India Company\'s earliest fortified bastion in India and the birthplace of the modern city of Madras (Chennai). Today, the fort houses the Tamil Nadu Legislative Assembly and the Fort Museum.',
    history: 'Completed on St. George\'s Day (April 23, 1644), the fort played a decisive role in the Anglo-French Carnatic Wars and the rise of British administrative dominance across South India.',
    culturalSignificance: 'Houses St. Mary\'s Church where Robert Clive and Elihu Yale were married, along with the Fort Museum preserving rare British, French, and Arcot Nawab artifacts.',
    architecture: '17th-century coastal military stone citadel with thick granite ramparts, moats, neoclassical administrative blocks, and colonial iron lampposts.',
    thingsToSee: [
      'Fort Museum containing uniforms, coins, silverware, and weapons of the East India Company',
      'St. Mary\'s Church (consecrated 1680) — India\'s oldest surviving Anglican church',
      'Wellesley House named after Lord Richard Wellesley',
      'The 150-foot-tall historical teakwood flagpole',
      'Colonial cannon batteries and moat fortifications'
    ],
    bestTimeToVisit: 'November to February (10:00 AM – 3:30 PM)',
    openingHours: '9:00 AM – 5:00 PM (Closed on Fridays)',
    entryFee: '₹25 for Indians; ₹300 for Foreigners.',
    visitDuration: '2 – 3 hours',
    address: 'Rajaji Salai, Near RBI, George Town, Chennai, Tamil Nadu 600009',
    latitude: 13.0797,
    longitude: 80.2878,
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Marina Beach', 'High Court of Madras', 'Parrys Corner'],
    tags: ['Fort', 'Colonial', 'Museum', 'St Marys Church', 'History'],
    famousFor: 'First British fortress in India and St. Mary\'s Church (1680)',
    howToReach: {
      air: 'Chennai International Airport (20 km)',
      train: 'Chennai Central (1.5 km), Fort Railway Station (300 m)',
      local: 'Chennai Fort Railway Station or High Court Metro Station'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-chn-3',
    name: 'San Thome Basilica',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'A historic Neo-Gothic Roman Catholic minor basilica built over the tomb of St. Thomas the Apostle, one of only three such cathedrals in the entire world.',
    fullDescription: 'San Thome Basilica is one of only three known basilicas in the world built over the tomb of an original Apostle of Jesus Christ (the other two being St. Peter\'s Basilica in Rome and Santiago de Compostela Cathedral in Spain). Rebuilt in pristine white Neo-Gothic style in 1896 by the British over earlier 16th-century Portuguese foundations.',
    history: 'St. Thomas the Apostle traveled to the Malabar coast in 52 CE and was martyred at St. Thomas Mount near Chennai in 72 CE. His mortal remains were enshrined in a crypt chapel that was preserved across centuries.',
    culturalSignificance: 'A sacred pilgrimage destination for Christians worldwide and a symbol of Chennai\'s maritime heritage since Roman antiquity.',
    architecture: 'Neo-Gothic architectural style with a soaring 183-foot central spire, ribbed vaults, stained glass windows from Munich depicting the life of St. Thomas, and pure white exterior facades.',
    thingsToSee: [
      'The subterranean Crypt Chapel housing the sacred Tomb of St. Thomas',
      'The historic museum displaying the lance head that pierced St. Thomas and rare stone inscriptions',
      'Grand nave with luminous stained glass windows depicting Biblical scenes',
      '183-foot Neo-Gothic central bell spire',
      'Serene coastal promenade facing the Bay of Bengal'
    ],
    bestTimeToVisit: 'November to February; early mornings or late afternoons.',
    openingHours: '6:00 AM – 9:00 PM (Daily); Museum: 9:00 AM – 6:00 PM',
    entryFee: 'Free entry.',
    visitDuration: '1 – 1.5 hours',
    address: '38, Santhome High Rd, Dummingkuppam, Mylapore, Chennai, Tamil Nadu 600004',
    latitude: 13.0337,
    longitude: 80.2783,
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Marina Beach', 'Kapaleeshwarar Temple', 'Lighthouse'],
    tags: ['Basilica', 'Neo-Gothic', 'St Thomas', 'Cathedral', 'Christianity'],
    famousFor: 'Built directly over the tomb of St. Thomas the Apostle with Neo-Gothic architecture',
    howToReach: {
      air: 'Chennai International Airport (16 km)',
      train: 'Chennai Central (7 km), Light House MRTS (1 km)',
      local: 'MTC buses to Santhome or auto-rickshaw from Mylapore'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 4. MUMBAI (Maharashtra)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-mum-1',
    name: 'Gateway of India',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The 26-meter monumental stone arch overlooking Mumbai Harbour, built to commemorate King George V\'s 1911 visit, where the last British troops departed India in 1948.',
    fullDescription: 'The Gateway of India is an iconic basalt stone arch monument erected at Apollo Bunder overlooking the Arabian Sea. Designed by Scottish architect George Wittet and completed in 1924, it was constructed to commemorate the landing of King George V and Queen Mary in 1911. Historically, it was also the ceremonial departure point through which the final British military contingent (First Battalion of Somerset Light Infantry) exited India on February 28, 1948.',
    history: 'Commissioned by the British Crown and inaugurated on December 4, 1924. The monument served as the grand ceremonial landing portal for viceroys and governors arriving by steamer in Bombay.',
    culturalSignificance: 'The defining symbol of Mumbai and the primary departure point for ferries to the UNESCO World Heritage Elephanta Caves. Facing the historic Taj Mahal Palace Hotel.',
    architecture: 'Indo-Saracenic style combining 16th-century Gujarati Muslim architectural elements with Roman triumphal arch proportions. Built from yellow basalt stone and reinforced concrete with intricate pierced lattice screens (jalis).',
    thingsToSee: [
      'The 26-meter-high basalt triumphal arch with 4 turrets and central dome',
      'The historic Taj Mahal Palace Hotel situated directly across the plaza',
      'Statue of Chhatrapati Shivaji Maharaj and Swami Vivekananda',
      'Ferry boats sailing across Mumbai Harbour towards Elephanta Caves and Alibaug',
      'Vibrant evening sea breeze and street photography ambiance'
    ],
    bestTimeToVisit: 'October to March; sunrise (6:00 AM – 8:00 AM) or sunset (5:30 PM – 8:30 PM).',
    openingHours: 'Open 24/7 (Security checks at entry plaza)',
    entryFee: 'Free entry; Ferry rides to Elephanta priced separately (~₹260 return).',
    visitDuration: '1 – 2 hours',
    address: 'Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
    latitude: 18.9220,
    longitude: 72.8347,
    images: [
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Taj Mahal Palace Hotel', 'Colaba Causeway', 'CSMVS Museum', 'Marine Drive'],
    tags: ['Gateway', 'Indo-Saracenic', 'Arabian Sea', 'Colaba', 'Iconic'],
    famousFor: 'Iconic Indo-Saracenic triumphal arch and departure point of the last British troops',
    howToReach: {
      air: 'Chhatrapati Shivaji Maharaj International Airport (24 km)',
      train: 'CSMT Station (2.5 km), Churchgate (2 km)',
      local: 'Bus or taxi from CSMT or Churchgate Railway Station'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-mum-2',
    name: 'Elephanta Caves',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'UNESCO World Heritage rock-cut cave temples on Gharapuri Island dating to the 5th-8th centuries, renowned for the colossal 20-foot three-headed Sadashiva (Trimurti) sculpture.',
    fullDescription: 'The Elephanta Caves are a UNESCO World Heritage collection of rock-cut cave temples carved directly into basalt cliff faces on Elephanta Island (Gharapuri), located 10 km east of Mumbai in the Arabian Sea. Dating between the 5th and 8th centuries CE under the Kalachuri and Rashtrakuta dynasties, the masterwork is Cave 1, centered on the monumental 20-foot Sadashiva Trimurti sculpture.',
    history: 'Originally an ancient Hindu and Buddhist holy site, the island was named \'Elephanta\' by 16th-century Portuguese explorers after a colossal stone elephant statue located near the shore.',
    culturalSignificance: 'One of the world\'s greatest masterpieces of rock-cut religious sculpture, capturing the philosophy of Lord Shiva as Creator, Preserver, and Destroyer.',
    architecture: 'Rock-hewn monolithic cave architecture carved into solid basalt. Supported by massive fluted cushion-capital pillars, featuring a pillared mandapa, linga shrine, and high-relief mythological panels.',
    thingsToSee: [
      'The 20-foot Trimurti (Sadashiva) colossal three-faced Shiva sculpture',
      'Ardhanarishvara (half-male, half-female Shiva-Parvati) rock carving',
      'Shiva as Nataraja (Cosmic Dancer) and Gangadhara panels',
      'Toy train ride from the ferry jetty to the base of the cave hill',
      'Scenic island hiking trails and panoramic Mumbai harbor views'
    ],
    bestTimeToVisit: 'November to March; avoid monsoon months (June-August) when ferry services may be disrupted.',
    openingHours: '9:00 AM – 5:30 PM (Closed on Mondays); Ferries run from Gateway between 9:00 AM – 2:00 PM',
    entryFee: '₹40 for Indians; ₹600 for Foreigners; Ferry: ~₹260 round-trip.',
    visitDuration: '4 – 5 hours (including ferry crossing)',
    address: 'Gharapuri Island, Mumbai Harbour, Maharashtra 400094',
    latitude: 18.9633,
    longitude: 72.9315,
    images: [
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Gateway of India', 'Taj Mahal Palace Hotel'],
    tags: ['UNESCO', 'Caves', 'Trimurti', 'Shiva', 'Rock Cut'],
    famousFor: 'UNESCO World Heritage 6th-century rock-cut Shiva temples and the Trimurti sculpture',
    howToReach: {
      air: 'Mumbai International Airport (25 km to Gateway)',
      train: 'CSMT / Churchgate to Gateway of India',
      local: '1-hour scenic ferry ride from Gateway of India pier'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-mum-3',
    name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'A UNESCO World Heritage railway terminus combining Victorian Italianate Gothic Revival architecture with traditional Indian palace stone carvings, crowned by a grand stone dome.',
    fullDescription: 'Chhatrapati Shivaji Maharaj Terminus (formerly Victoria Terminus) is a UNESCO World Heritage Site and one of India\'s most celebrated architectural landmarks. Designed by British architect F.W. Stevens and completed in 1888 after a decade of construction, the station is a masterly fusion of Victorian High Gothic Revival style and classical Indian stone craftsmanship.',
    history: 'Built to commemorate Queen Victoria\'s Golden Jubilee in 1887, it served as the headquarters of the Great Indian Peninsula Railway. Renamed in 1996 to honor the Maratha warrior king Chhatrapati Shivaji Maharaj.',
    culturalSignificance: 'The beating pulse of Mumbai\'s local railway lifeline, serving over 3 million commuters daily. Its illuminated facade is a celebrated civic spectacle.',
    architecture: 'High Victorian Gothic style with stone dome, turrets, pointed arches, stained glass, carved stone gargoyles, and wood carvings crafted by students of the Sir J.J. School of Art.',
    thingsToSee: [
      'The 330-foot central facade with octagonal ribbed dome topped by the figure of Progress',
      'Gargoyles, stone peacocks, lions, and monkeys carved on buttresses',
      'Grand staircase with wrought iron railings and stained glass rose windows',
      'Heritage Gallery Museum inside the central wing',
      'Magnificent evening dynamic LED floodlighting'
    ],
    bestTimeToVisit: 'October to March; evening (6:30 PM – 9:00 PM) to admire the dazzling night illumination.',
    openingHours: '24/7 Operational Railway Station; Heritage Museum: 2:00 PM – 5:00 PM (Weekdays)',
    entryFee: 'Viewing exterior: Free; Heritage Gallery: ₹100.',
    visitDuration: '1 – 2 hours',
    address: 'DN Road, Fort, Mumbai, Maharashtra 400001',
    latitude: 18.9401,
    longitude: 72.8353,
    images: [
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['BMC Headquarters', 'Crawford Market', 'Marine Drive', 'Flora Fountain'],
    tags: ['UNESCO', 'Gothic', 'Railway', 'Victorian', 'Architecture'],
    famousFor: 'UNESCO Victorian Gothic Revival architecture and stunning night illumination',
    howToReach: {
      air: 'Chhatrapati Shivaji Maharaj International Airport (21 km)',
      train: 'Directly at CSMT Railway Station',
      local: 'Central Line local trains, taxis, and city buses'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 5. DELHI (National Capital)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-del-1',
    name: 'Red Fort (Lal Qila)',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The grand 17th-century red sandstone citadel of the Mughal Empire in Old Delhi, where the Prime Minister of India unfurls the National Flag on Independence Day.',
    fullDescription: 'The Red Fort (Lal Qila) is a UNESCO World Heritage complex constructed by Mughal Emperor Shah Jahan between 1638 and 1648 when he relocated the imperial capital from Agra to Shahjahanabad (Old Delhi). Built along the Yamuna River, its 2.41 km octagonal red sandstone ramparts shelter imperial palaces, the Diwan-i-Aam, the Diwan-i-Khas, and the legendary Peacock Throne hall.',
    history: 'Inaugurated in 1648, the fort was the seat of Mughal power for two centuries until the 1857 revolt, after which the British occupied it. On August 15, 1947, Prime Minister Jawaharlal Nehru raised India\'s tricolor from the Lahori Gate, establishing a national tradition.',
    culturalSignificance: 'The preeminent symbol of Indian sovereignty and historical pride, hosting the annual Independence Day Prime Minister\'s address to the nation.',
    architecture: 'Peak Mughal architecture representing the zenith of Indo-Islamic design. Features octagonal towers, floral Pietra Dura inlay, marble arcades, and the Stream of Paradise (Nahar-i-Bihisht) water canal.',
    thingsToSee: [
      'Lahori Gate and the covered Chhatta Chowk historic bazaar',
      'Diwan-i-Aam (Hall of Public Audience) with marble canopy throne',
      'Diwan-i-Khas (Hall of Private Audience) inscribed with "If there is paradise on earth, it is this"',
      'Moti Masjid (Pearl Mosque) and the Khas Mahal private palace',
      'Museum of Freedom Struggle (Kranti Mandir) and the evening Sound & Light show'
    ],
    bestTimeToVisit: 'October to March; morning (9:00 AM – 12:00 PM) or late afternoon.',
    openingHours: '9:30 AM – 4:30 PM (Closed on Mondays); Sound & Light Show in the evening.',
    entryFee: '₹50 for Indians; ₹550 for Foreigners.',
    visitDuration: '2.5 – 4 hours',
    address: 'Netaji Subhash Marg, Lal Qila, Chandni Chowk, Old Delhi, Delhi 110006',
    latitude: 28.6562,
    longitude: 77.2410,
    images: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Jama Masjid', 'Chandni Chowk', 'Raj Ghat', 'Gurudwara Sis Ganj Sahib'],
    tags: ['UNESCO', 'Mughal', 'Fort', 'Independence Day', 'Shah Jahan'],
    famousFor: 'Iconic red sandstone Mughal citadel and national Independence Day flag hoisting venue',
    howToReach: {
      air: 'Indira Gandhi International Airport (20 km)',
      train: 'Old Delhi Railway Station (1.5 km), New Delhi Station (4 km)',
      local: 'Lal Qila Metro Station (Violet Line right opposite)'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-del-2',
    name: 'Qutub Minar Complex',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The world\'s tallest brick minaret at 72.5 meters, built in 1192 CE by Qutb-ud-din Aibak, alongside the 1,600-year-old rust-resistant Iron Pillar of Delhi.',
    fullDescription: 'The Qutub Minar is a UNESCO World Heritage monument in Mehrauli, South Delhi. Soaring 72.5 meters (238 feet) with five distinct fluted storeys, it was commenced in 1192 CE by Qutb-ud-din Aibak to celebrate the establishment of the Delhi Sultanate and completed by Shams-ud-din Iltutmish and Firoz Shah Tughlaq. The complex contains the Quwwat-ul-Islam Mosque, Alai Darwaza, and the famous 4th-century Iron Pillar of Chandragupta II.',
    history: 'Built over the ruins of medieval Lal Kot, the monument served as a victory tower and minaret for the adjacent Quwwat-ul-Islam Mosque. It survived multiple lightning strikes and earthquakes, restored under the Tughlaq and Lodi sultans.',
    culturalSignificance: 'Marks the architectural dawn of Islamic rule in North India, showcasing the earliest synthesis of Hindu and Islamic decorative arts in India.',
    architecture: 'Constructed of red and buff sandstone with fluted circular and angular ribs, carved Quranic calligraphy, honeycomb corbels, and balconies. The top storeys feature white marble cladding.',
    thingsToSee: [
      'The 72.5-meter five-storey Qutub Minar with carved calligraphic bands',
      'The 1,600-year-old rustless Iron Pillar of Delhi with Gupta Brahmi inscriptions',
      'Alai Darwaza (1311 CE) — the earliest true dome and horse-shoe arch in India',
      'Quwwat-ul-Islam Mosque with carved stone temple pillars and cloister courtyards',
      'Tomb of Iltutmish featuring exquisite geometric stone carvings'
    ],
    bestTimeToVisit: 'October to March (9:00 AM – 11:30 AM or 3:30 PM – 6:00 PM).',
    openingHours: '7:00 AM – 8:00 PM (Daily)',
    entryFee: '₹40 for Indians; ₹600 for Foreigners.',
    visitDuration: '2 – 3 hours',
    address: 'Mehrauli, New Delhi, Delhi 110030',
    latitude: 28.5245,
    longitude: 77.1855,
    images: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1603288940320-9844add94772?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Mehrauli Archaeological Park', 'Hauz Khas Village', 'Garden of Five Senses'],
    tags: ['UNESCO', 'Minaret', 'Delhi Sultanate', 'Iron Pillar', 'Architecture'],
    famousFor: 'World\'s tallest brick minaret (72.5m) and the 1600-year-old rustless Iron Pillar',
    howToReach: {
      air: 'Indira Gandhi International Airport (14 km)',
      train: 'Hazrat Nizamuddin (14 km), New Delhi (15 km)',
      local: 'Qutub Minar Metro Station (Yellow Line, ~1.5 km via auto)'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-del-3',
    name: 'Humayun\'s Tomb',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The magnificent 16th-century red sandstone garden tomb of Mughal Emperor Humayun, celebrated as the architectural inspiration for the Taj Mahal.',
    fullDescription: 'Humayun\'s Tomb is a UNESCO World Heritage Site commissioned in 1565 by Emperor Humayun\'s senior consort, Empress Bega Begum (Haji Begum), and designed by Persian architect Mirak Mirza Ghiyas. It was the very first monumental garden tomb on the Indian subcontinent and introduced the symmetrical Charbagh garden layout and double dome system that inspired the Taj Mahal.',
    history: 'Built nine years after the death of Emperor Humayun (1556), the tomb represents the grand patronization of arts under young Emperor Akbar. In 1857, the last Mughal Emperor Bahadur Shah Zafar took refuge here before being captured by British Captain Hodson.',
    culturalSignificance: 'Contains the resting places of over 150 Mughal royals, earning it the title "Dormitory of the Mughals". Awarded the UNESCO Asia-Pacific Heritage Award after restoration by the Aga Khan Trust.',
    architecture: 'Pioneering Indo-Persian architecture featuring high red sandstone plinths, octagonal chambers, arched alcoves (iwans), and a soaring 42-meter white marble double dome surrounded by a 30-acre Charbagh garden.',
    thingsToSee: [
      'The soaring white marble central double dome and octagonal royal cenotaph chamber',
      'The meticulously restored 30-acre Charbagh gardens with flowing water channels',
      'Isa Khan\'s octagonal tomb and mosque complex near the entrance',
      'Bu Halima garden tomb and the Barber\'s Tomb (Nai ka Gumbad)',
      'Sublime sunset perspectives reflecting off sandstone facades'
    ],
    bestTimeToVisit: 'October to March; late afternoon (3:30 PM – 6:00 PM) for magical golden lighting.',
    openingHours: '6:00 AM – 6:00 PM (Daily)',
    entryFee: '₹40 for Indians; ₹600 for Foreigners.',
    visitDuration: '2 – 3 hours',
    address: 'Mathura Road, Opp Dargah Nizamuddin, Nizamuddin East, New Delhi, Delhi 110013',
    latitude: 28.5933,
    longitude: 77.2507,
    images: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Hazrat Nizamuddin Dargah', 'Sunder Nursery', 'India Gate', 'National Zoological Park'],
    tags: ['UNESCO', 'Mughal', 'Garden Tomb', 'Taj Prototype', 'Charbagh'],
    famousFor: 'First grand Mughal garden tomb in India and architectural precursor to the Taj Mahal',
    howToReach: {
      air: 'Indira Gandhi International Airport (18 km)',
      train: 'Hazrat Nizamuddin Railway Station (1 km walk)',
      local: 'JLN Stadium or Sarai Kale Khan Metro Stations (~1.5 km)'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 6. JAIPUR (Rajasthan)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-jpr-1',
    name: 'Hawa Mahal (Palace of Winds)',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The 5-storey pink sandstone honeycomb facade with 953 jharokha windows, designed to allow royal Rajput ladies to observe street processions unseen.',
    fullDescription: 'Hawa Mahal (Palace of Winds) is Jaipur\'s most recognizable architectural jewel, built in 1799 by Maharaja Sawai Pratap Singh and designed by Lal Chand Ustad. Shaped like the crown of Lord Krishna, this five-storey pyramidal facade rises 50 feet with 953 intricately carved casement windows (jharokhas) that funnel refreshing cooling breezes via the Venturi effect.',
    history: 'Constructed as an extension of the City Palace to enable royal women to watch daily bazaar street life, festivals, and royal processions without violating the strict purdah customs.',
    culturalSignificance: 'The international emblem of Jaipur and Rajasthani Rajput chivalry, capturing the intersection of royal privacy and public festival celebration.',
    architecture: 'Crown-shaped pyramidal structure constructed of red and pink sandstone. The facade has no formal foundation and narrows to an eight-inch thickness at the summit, cooled by natural aerodynamic cross-ventilation.',
    thingsToSee: [
      'The 953 jharokha windows with carved stone lattices and colored glass',
      'The five unique storeys: Sharad Mandir, Ratan Mandir, Vichitra Mandir, Prakash Mandir, and Hawa Mandir',
      'Panoramic rooftop view overlooking Jantar Mantar and the City Palace',
      'Small on-site archaeological museum housing miniature Rajput paintings',
      'Rooftop cafes directly opposite the facade for the classic postcard photograph'
    ],
    bestTimeToVisit: 'October to March; early morning (7:30 AM – 9:30 AM) when sunrise casts a radiant golden glow on the pink sandstone.',
    openingHours: '9:00 AM – 5:00 PM (Daily)',
    entryFee: '₹50 for Indians; ₹200 for Foreigners.',
    visitDuration: '1 – 2 hours',
    address: 'Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002',
    latitude: 26.9239,
    longitude: 75.8267,
    images: [
      'https://images.unsplash.com/photo-1603288940320-9844add94772?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1603288940320-9844add94772?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['City Palace', 'Jantar Mantar', 'Johari Bazaar', 'Bapu Bazaar'],
    tags: ['Palace of Winds', 'Pink City', 'Jharokhas', 'Rajput', 'Iconic'],
    famousFor: 'Pyramidal honeycomb facade with 953 carved stone jharokha breeze windows',
    howToReach: {
      air: 'Jaipur International Airport (12 km)',
      train: 'Jaipur Junction (5 km)',
      local: 'Badi Chaupar Metro Station (Pink Line directly outside)'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-jpr-2',
    name: 'Amer Fort (Amber Palace)',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'A colossal UNESCO World Heritage hilltop fortress overlooking Maota Lake, famous for the Sheesh Mahal (Mirror Palace) where a single candle illuminates the entire hall.',
    fullDescription: 'Amer Fort (Amber Fort) is a breathtaking hilltop fortress palace situated in the ancient town of Amer, 11 km north of Jaipur. Built in yellow and pink sandstone and marble by Raja Man Singh I in 1592 and expanded by Mirza Raja Jai Singh, the palace complex features four courtyards, opulent royal chambers, defensive ramparts, and the world-famous Sheesh Mahal (Mirror Palace).',
    history: 'Capital of the Kachwaha Rajput clan before Maharaja Sawai Jai Singh II founded Jaipur in 1727. The fort was connected by subterranean tunnels to Jaigarh Fort above to ensure royal escape during battle.',
    culturalSignificance: 'A UNESCO World Heritage Site in the Hill Forts of Rajasthan cluster, exemplifying the refined blend of Rajput bravery and Mughal court elegance.',
    architecture: 'Rajput-Mughal synthesis featuring massive ramparts, pillared pavilions, marble inlay, silver doors, fresco murals, and thousands of concave Belgian mirror tiles embedded in stucco plaster.',
    thingsToSee: [
      'Sheesh Mahal (Mirror Palace) with glittering convex glass mosaic ceilings',
      'Diwan-i-Aam with double rows of sandstone columns topped by elephant brackets',
      'Ganesh Pol gateway with vibrant natural vegetable dye frescoes',
      'Sukh Niwas with ancient piped water-cooling channels',
      'Maota Lake and Kesar Kyari saffron garden reflections below the ramparts'
    ],
    bestTimeToVisit: 'October to March (8:30 AM – 12:00 PM or evening Sound & Light show).',
    openingHours: '8:00 AM – 5:30 PM (Day) and 6:30 PM – 9:15 PM (Night entry & Light show)',
    entryFee: '₹100 for Indians; ₹550 for Foreigners; Sound & Light Show: ₹200.',
    visitDuration: '3 – 4.5 hours',
    address: 'Devisinghpura, Amer, Jaipur, Rajasthan 302028',
    latitude: 26.9855,
    longitude: 75.8513,
    images: [
      'https://images.unsplash.com/photo-1603288940320-9844add94772?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1603288940320-9844add94772?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Jaigarh Fort', 'Nahargarh Fort', 'Jal Mahal', 'Panna Meena ka Kund'],
    tags: ['UNESCO', 'Fort', 'Sheesh Mahal', 'Hilltop', 'Rajput'],
    famousFor: 'Glittering Sheesh Mahal (Mirror Palace) and monumental hilltop fortifications',
    howToReach: {
      air: 'Jaipur International Airport (22 km)',
      train: 'Jaipur Junction (13 km)',
      local: 'AC Bus from Ajmeri Gate or direct app-taxis'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 7. AGRA (Uttar Pradesh)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-agr-1',
    name: 'Taj Mahal',
    city: 'Agra',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'One of the Seven Wonders of the World and a UNESCO World Heritage monument, built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal.',
    fullDescription: 'The Taj Mahal is an internationally recognized ivory-white marble mausoleum on the south bank of the Yamuna River. Commissioned in 1631 by Mughal Emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal, and later the Emperor himself, the complex was completed over 22 years by 20,000 artisans under court architect Ustad Ahmad Lahori. It is universally celebrated as the greatest architectural achievement in Indo-Islamic history.',
    history: 'Constructed between 1631 and 1648 CE with materials hauled from across Asia, including translucent Makrana marble from Rajasthan, lapis lazuli from Afghanistan, and jade from China. It survived multiple wars and environmental restorations.',
    culturalSignificance: 'Universally revered as the world\'s supreme monument to eternal love and the crown jewel of Muslim art in India, designated a UNESCO World Heritage Site in 1983.',
    architecture: 'Perfect bilateral symmetry along a central axis. Features an immense 35-meter white marble bulbous dome, four 40-meter minarets tilted slightly outward to protect the tomb in case of earthquakes, and intricate Pietra Dura stone inlay with 28 types of precious gemstones.',
    thingsToSee: [
      'The central octagonal tomb chamber with filigree marble jali screens enclosing cenotaphs',
      'Exquisite Pietra Dura stone floral inlays using carnelian, lapis lazuli, and mother-of-pearl',
      'The 300-meter Charbagh garden with central reflecting pool (Al Hawd al-Kawthar)',
      'The red sandstone mosque and matching Jawab guesthouse',
      'Sunrise and sunset color transitions ranging from soft pink to radiant gold'
    ],
    bestTimeToVisit: 'October to March; sunrise (6:00 AM – 8:30 AM) for magical tranquility and soft morning light.',
    openingHours: '30 minutes before sunrise to 30 minutes before sunset (Closed on Fridays)',
    entryFee: '₹50 for Indians; ₹1,100 for Foreigners; ₹200 additional to enter main mausoleum dome chamber.',
    visitDuration: '2.5 – 4 hours',
    address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001',
    latitude: 27.1751,
    longitude: 78.0421,
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Agra Fort', 'Mehtab Bagh', 'Itmad-ud-Daulah (Baby Taj)', 'Fatehpur Sikri'],
    tags: ['UNESCO', 'Wonder of the World', 'White Marble', 'Shah Jahan', 'Love'],
    famousFor: 'One of the Seven Wonders of the World and sublime white marble Pietra Dura architecture',
    howToReach: {
      air: 'Agra Airport (Kheria) (12 km) or Delhi IGI Airport (220 km via Yamuna Expressway)',
      train: 'Agra Cantt Railway Station (5.5 km)',
      local: 'Electric auto-rickshaws and eco-friendly carts from Taj parking gates'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-agr-2',
    name: 'Agra Fort',
    city: 'Agra',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'A monumental UNESCO World Heritage red sandstone citadel on the Yamuna, the primary imperial residence of Mughal emperors until 1638.',
    fullDescription: 'Agra Fort is an immense UNESCO World Heritage fortress sprawling along the banks of the Yamuna River, just 2.5 km northwest of the Taj Mahal. Extensively rebuilt in red sandstone by Emperor Akbar in 1565 and embellished with white marble palaces by Shah Jahan, the citadel spans 94 acres with 70-foot-high double defensive walls and grand ceremonial courtyards.',
    history: 'Served as the main imperial seat of the Mughal Empire under Akbar, Jahangir, Shah Jahan, and Aurangzeb. It was also where Shah Jahan was confined by his son Aurangzeb in the Musamman Burj, gazing across the river at the Taj Mahal until his death.',
    culturalSignificance: 'Showcases the evolutionary transition from Akbar\'s robust red sandstone Hindu-Persian hybrid architecture to Shah Jahan\'s delicate white marble imperial elegance.',
    architecture: 'Crescent-shaped fortress with 2.5 km perimeter walls, featuring the monumental Amar Singh Gate, Sheesh Mahal, Khas Mahal, Jahangiri Mahal, and the octagonal Musamman Burj tower.',
    thingsToSee: [
      'Musamman Burj: The octagonal marble balcony where Shah Jahan spent his final years',
      'Jahangiri Mahal: Akbar\'s magnificent red sandstone palace with carved brackets',
      'Diwan-i-Khas and Diwan-i-Aam imperial assembly halls',
      'Sheesh Mahal (Palace of Mirrors) decorated with Syrian mirror mosaics',
      'Stunning views of the Taj Mahal framed through white marble palace arches'
    ],
    bestTimeToVisit: 'October to March (9:00 AM – 12:00 PM or 3:00 PM – 5:30 PM).',
    openingHours: '6:00 AM – 6:00 PM (Daily)',
    entryFee: '₹50 for Indians; ₹650 for Foreigners.',
    visitDuration: '2 – 3 hours',
    address: 'Agra Fort, Rakabganj, Agra, Uttar Pradesh 282003',
    latitude: 27.1795,
    longitude: 78.0211,
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Taj Mahal', 'Jama Masjid Agra', 'Kinari Bazaar', 'Mehtab Bagh'],
    tags: ['UNESCO', 'Mughal Citadel', 'Shah Jahan', 'Akbar', 'Musamman Burj'],
    famousFor: 'Massive red sandstone imperial citadel and Shah Jahan\'s Musamman Burj overlooking the Taj',
    howToReach: {
      air: 'Agra Airport (9 km)',
      train: 'Agra Fort Railway Station (500 m), Agra Cantt (4 km)',
      local: 'Auto-rickshaw or taxi from Agra Cantt or Taj Mahal'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 8. VARANASI (Uttar Pradesh)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-var-1',
    name: 'Kashi Vishwanath Temple & Corridor',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'One of the 12 sacred Jyotirlinga shrines dedicated to Lord Shiva on the western bank of the holy Ganga, transformed with a magnificent stone corridor linking to the river.',
    fullDescription: 'The Kashi Vishwanath Temple (Golden Temple) is one of the most sacred Hindu pilgrimage shrines, dedicated to Lord Shiva as Vishveshwara or Vishvanatha (Lord of the Universe). Rebuilt in 1780 by the saintly Maratha queen Maharani Ahilyabai Holkar of Indore, its shikhara was plated with 800 kg of pure gold donated by Maharaja Ranjit Singh of Punjab in 1835. The newly expanded Kashi Vishwanath Corridor directly connects the shrine to the sacred Ganga ghats.',
    history: 'Mentioned in ancient Puranas for millennia; destroyed and rebuilt multiple times by rulers including the Gahadavala dynasty and Ahilyabai Holkar.',
    culturalSignificance: 'A spiritual pilgrimage to Kashi Vishwanath and a dip in the holy Ganga is considered by millions to grant Moksha (liberation from the cycle of rebirth).',
    architecture: 'Nagara temple architecture with gold-plated spires, carved stone mandapas, and the expansive newly constructed 5-lakh-sq-ft red sandstone corridor linking Manikarnika and Lalita Ghats.',
    thingsToSee: [
      'The sacred Jyotirlinga shrine housed in silver-adorned sanctum',
      'The 800 kg gold-plated shikhara and spire donated by Maharaja Ranjit Singh',
      'The expansive new Vishwanath Dham corridor leading down to the Ganga',
      'Ancient Jnana Vapi (Well of Wisdom) and the monolithic Nandi bull',
      'Sublime Mangala Aarti at 3:00 AM and Sandhya Aarti in the evening'
    ],
    bestTimeToVisit: 'October to March; early morning (4:00 AM – 7:00 AM) or non-rush hours.',
    openingHours: '3:00 AM – 11:00 PM (Daily; closes briefly for bhog and aarti)',
    entryFee: 'General Darshan: Free; Special Sugam Darshan tickets available online.',
    visitDuration: '1.5 – 3 hours',
    address: 'Lahori Tola, Varanasi, Uttar Pradesh 221001',
    latitude: 25.3109,
    longitude: 83.0107,
    images: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Dashashwamedh Ghat', 'Manikarnika Ghat', 'Annapurna Temple', 'Kashi Vishwanath Corridor'],
    tags: ['Jyotirlinga', 'Shiva', 'Kashi', 'Gold Temple', 'Spiritual'],
    famousFor: 'One of the 12 sacred Jyotirlingas with an 800 kg gold-plated shikhara on the Ganga',
    howToReach: {
      air: 'Lal Bahadur Shastri International Airport (25 km)',
      train: 'Varanasi Junction (4 km), Banaras (6 km)',
      local: 'Auto-rickshaw to Godowlia Chowk, followed by a short walk through the corridor'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-var-2',
    name: 'Dashashwamedh Ghat & Evening Ganga Aarti',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Cultural Center',
    shortDescription: 'The most vibrant and sacred bathing ghat on the River Ganges, world-famous for its synchronized, multi-tiered brass lamp evening Maha Ganga Aarti.',
    fullDescription: 'Dashashwamedh Ghat is the main and oldest ghat on the Ganges in Varanasi. Located close to the Vishwanath Temple, legend states that Lord Brahma created it to welcome Lord Shiva and performed the Dasa-Ashwamedha yajna (sacrifice of ten horses) here. Every evening at dusk, young saffron-clad priests perform the spectacular Ganga Aarti with multi-tiered brass lamps, conch shells, incense, and Vedic chants.',
    history: 'Rebuilt in stone by Peshwa Balaji Baji Rao in 1740 and later by Ahilyabai Holkar. The grand evening Maha Aarti has been performed unbroken for centuries.',
    culturalSignificance: 'The visual and emotional zenith of Banaras spiritual life, drawing thousands of devotees and travelers who release floating earthen diya lamps onto the sacred river.',
    architecture: 'Monumental stepped stone bathing ghat with pavilions, parasols, temple shrines, and wooden boat boarding piers overlooking the river.',
    thingsToSee: [
      'The 45-minute synchronized evening Maha Ganga Aarti ritual (6:30 PM in summer, 6:00 PM in winter)',
      'Releasing floating earthen diyas with marigold flowers onto the river',
      'Early morning sunrise boat ride past historic ghats from Assi to Manikarnika',
      'Traditional sadhus, Vedic astrologers, and local life along the stone steps',
      'The grand panoramic perspective of the ghats from an evening wooden boat'
    ],
    bestTimeToVisit: 'October to March; 5:30 PM – 7:30 PM for the Ganga Aarti.',
    openingHours: 'Open 24/7; Evening Aarti begins around 6:00 PM – 6:45 PM',
    entryFee: 'Ghat viewing: Free; Boat seats for viewing Aarti: ₹100 – ₹300 per person.',
    visitDuration: '1.5 – 2.5 hours',
    address: 'Dashashwamedh Ghat Rd, Ghats of Varanasi, Varanasi, Uttar Pradesh 221001',
    latitude: 25.3076,
    longitude: 83.0104,
    images: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Kashi Vishwanath Temple', 'Manikarnika Ghat', 'Assi Ghat', 'Godowlia Market'],
    tags: ['Ghat', 'Ganga Aarti', 'Spiritual', 'Boating', 'Holy River'],
    famousFor: 'World-renowned synchronized evening Maha Ganga Aarti with grand multi-tiered brass lamps',
    howToReach: {
      air: 'Lal Bahadur Shastri International Airport (26 km)',
      train: 'Varanasi Junction (4.5 km)',
      local: 'Auto-rickshaw to Godowlia intersection + 5-minute walk down to the river'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 9. AMRITSAR (Punjab)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-asr-1',
    name: 'Sri Harmandir Sahib (The Golden Temple)',
    city: 'Amritsar',
    state: 'Punjab',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'The holiest shrine of Sikhism, plated in pure gold and set in the holy Amrit Sarovar lake, serving free meals to over 100,000 pilgrims daily in the Guru ka Langar.',
    fullDescription: 'Sri Harmandir Sahib (informally known as the Golden Temple) is the supreme spiritual and cultural center of the Sikh faith. Founded in 1577 by Guru Ram Das around the sacred Amrit Sarovar (Pool of Nectar), its foundation stone was laid in 1589 by the Sufi saint Mian Mir of Lahore upon the invitation of Guru Arjan Dev. Maharaja Ranjit Singh embellished the upper storeys with 500 kg of pure gold foil in 1830.',
    history: 'Designed with four entrances facing north, south, east, and west to welcome people of all faiths, castes, and backgrounds without discrimination. It survived multiple desecrations by Afghan invaders and stands as a beacon of universal brotherhood and peace.',
    culturalSignificance: 'Houses the original Adi Granth (Guru Granth Sahib). Home to the world\'s largest mega-kitchen (Guru Ka Langar) which operates 24/7, serving over 100,000 free hot vegetarian meals every single day.',
    architecture: 'Sikh architectural marvel blending Hindu and Islamic styles, featuring gold-plated domes, marble floral pietra dura panels, a central causeway (Guru\'s Bridge), and the Akal Takht (throne of temporal authority).',
    thingsToSee: [
      'The gold-plated central sanctum reflecting in the sacred Amrit Sarovar pool',
      'Continuous soulful Gurbani kirtan recitals broadcast live across the complex',
      'Guru Ka Langar: The world\'s largest community kitchen with roti-making machines',
      'The Akal Takht (highest seat of Sikh temporal authority)',
      'Central Sikh Museum housing rare manuscripts, weapons, and historical paintings'
    ],
    bestTimeToVisit: 'October to March; early morning (4:00 AM for Palki Sahib ceremony) or illuminated evening.',
    openingHours: 'Open 24/7, 365 days a year',
    entryFee: 'Free entry (Head covering required, shoes deposited at free counters, no alcohol/tobacco).',
    visitDuration: '3 – 5 hours',
    address: 'Golden Temple Rd, Atta Mandi, Katra Ahluwalia, Amritsar, Punjab 143006',
    latitude: 31.6200,
    longitude: 74.8765,
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Jallianwala Bagh', 'Partition Museum', 'Akal Takht', 'Heritage Street'],
    tags: ['Golden Temple', 'Sikhism', 'Langar', 'Spiritual', 'Amrit Sarovar'],
    famousFor: 'The holiest Sikh shrine plated in pure gold and the world\'s largest 24/7 free community kitchen',
    howToReach: {
      air: 'Sri Guru Ram Dass Jee International Airport (13 km)',
      train: 'Amritsar Junction Railway Station (2.5 km)',
      local: 'Free shuttle buses from the railway station or electric rickshaws'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 10. AHMEDABAD (Gujarat)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-ahd-1',
    name: 'Sabarmati Ashram (Gandhi Ashram)',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The tranquil riverside headquarters of Mahatma Gandhi from 1917 to 1930, from where he launched the historic Dandi Salt March that shook the British Empire.',
    fullDescription: 'Sabarmati Ashram (also known as Harijan Ashram or Satyagraha Ashram) is located on the serene banks of the Sabarmati River in Ahmedabad. Founded by Mahatma Gandhi in 1917, it served as the epic center of the Indian independence movement for 13 years. It was from here that Gandhiji set off on the historic 241-mile Dandi Salt March on March 12, 1930, vowing never to return until India achieved freedom.',
    history: 'Originally established in Kochrab in 1915, Gandhi relocated the ashram to Sabarmati in 1917 to pursue farming, animal husbandry, khadi spinning, and untouchability eradication work.',
    culturalSignificance: 'A sacred national monument preserving the principles of Ahimsa (non-violence), Satyagraha (truth-force), and Sarvodaya (uplift of all).',
    architecture: 'Minimalist traditional vernacular design with tiled roofs, whitewashed walls, and open courtyards designed to mirror simplicity. The Charles Correa-designed Gandhi Smarak Sangrahalaya museum features airy modular brick-and-wood pavilions.',
    thingsToSee: [
      'Hriday Kunj: The original cottage where Mahatma Gandhi and Kasturba lived',
      'Magan Niwas, Nandini Guest House, and Vinoba-Mira Kutir',
      'The original Charkha (spinning wheel), writing desk, and spectacles of Gandhiji',
      'Gandhi Smarak Sangrahalaya museum housing 30,000+ letters and rare photographs',
      'Tranquil Sabarmati riverfront promenade behind the ashram'
    ],
    bestTimeToVisit: 'October to March; morning (8:30 AM – 11:30 AM) or peaceful late afternoons.',
    openingHours: '8:30 AM – 6:30 PM (Daily, open all 365 days)',
    entryFee: 'Free entry.',
    visitDuration: '1.5 – 3 hours',
    address: 'Gandhi Smarak Sangrahalaya, Ashram Rd, Ahmedabad, Gujarat 380027',
    latitude: 23.0605,
    longitude: 72.5804,
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Adalaj Stepwell', 'Sabarmati Riverfront', 'Calico Museum', 'Sidi Saiyyed Mosque'],
    tags: ['Gandhi', 'Independence', 'Dandi March', 'Ahimsa', 'Peace'],
    famousFor: 'Mahatma Gandhi\'s historical headquarters and starting point of the 1930 Dandi Salt March',
    howToReach: {
      air: 'Sardar Vallabhbhai Patel International Airport (8 km)',
      train: 'Ahmedabad Junction / Kalupur (6 km), Sabarmati Junction (2 km)',
      local: 'Direct AMTS/BRTS buses or auto-rickshaw along Ashram Road'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-ahd-2',
    name: 'Adalaj Stepwell (Adalaj Ni Vav)',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'A 15th-century five-storey subterranean stepwell celebrated for intricate Solanki-Islamic stone carvings, cooling subterranean shafts, and romantic folklore.',
    fullDescription: 'Adalaj Stepwell (Adalaj ni Vav) is a magnificent five-storey-deep subterranean water monument built in 1498 CE by Queen Rudadevi in memory of her husband Rana Veer Singh of the Vaghela dynasty. Designed in the Solanki-Islamic architectural style, it served both as a vital caravan water reservoir and a cool subterranean sanctuary for travelers and village women.',
    history: 'Commissioned in the late 15th century, the construction was completed under Sultan Mahmud Begada. A poignant inscription inside pays tribute to Queen Rudadevi\'s devotion to her martyred husband.',
    culturalSignificance: 'A masterwork of traditional Indian rainwater harvesting and hydraulic engineering, where Hindu deities, Kalpavriksha tree carvings, and Islamic floral arabesques blend harmoniously.',
    architecture: 'Subterranean stepwell descending five storeys through octagonal pillared shafts. Direct sunlight only touches the steps briefly at noon, keeping ambient temperatures inside nearly 6°C cooler than the surface.',
    thingsToSee: [
      'Five tiers of carved octagonal landings and sandstone galleries',
      'The Navagraha (nine planets) panel and Kalpavriksha (tree of life) stone reliefs',
      'Intricate Islamic floral lattices blended with Hindu sculptural motifs',
      'The cool central water well shaft descending into ancient groundwater levels',
      'Dramatic plays of light and shadow filtering through the overhead octagonal openings'
    ],
    bestTimeToVisit: 'October to March (9:30 AM – 1:00 PM for best lighting down the shafts).',
    openingHours: '8:00 AM – 6:00 PM (Daily)',
    entryFee: '₹25 for Indians; ₹300 for Foreigners.',
    visitDuration: '1 – 2 hours',
    address: 'Adalaj Rd, Adalaj, Gandhinagar / Ahmedabad, Gujarat 382421',
    latitude: 23.1667,
    longitude: 72.5800,
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1603288940320-9844add94772?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Sabarmati Ashram', 'Akshardham Gandhinagar', 'Trimandir'],
    tags: ['Stepwell', 'Solanki', 'Hydraulic Engineering', 'Carvings', 'Architecture'],
    famousFor: 'Five-storey subterranean stepwell architecture and intricate Solanki-Islamic stone carvings',
    howToReach: {
      air: 'Sardar Vallabhbhai Patel International Airport (15 km)',
      train: 'Ahmedabad Junction (18 km), Gandhinagar Capital (10 km)',
      local: 'Auto-rickshaw or taxi along SG Highway / Gandhinagar Road'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 11. GOA (Coastal Heritage)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-goa-1',
    name: 'Basilica of Bom Jesus',
    city: 'Goa',
    state: 'Goa',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'A UNESCO World Heritage 16th-century Baroque cathedral holding the mortal relics of St. Francis Xavier, renowned for unplastered red laterite stone architecture.',
    fullDescription: 'The Basilica of Bom Jesus (meaning "Good/Infant Jesus") is a world-renowned Roman Catholic minor basilica located in Old Goa (Velha Goa). Consecrated in 1605, it is one of the oldest churches in India and the definitive landmark of Baroque architecture on the subcontinent. The basilica enshrines the preserved mortal remains of St. Francis Xavier, co-founder of the Society of Jesus (Jesuits).',
    history: 'Construction commenced in 1594 under Jesuit supervision and was consecrated in May 1605. St. Francis Xavier died in 1552 off the coast of China and his body was brought to Goa in 1554, remaining remarkably incorrupt for centuries.',
    culturalSignificance: 'A premier global Christian pilgrimage destination. Every ten years, the sacred body of St. Francis Xavier is brought down for public veneration (Exposition) during the annual Feast on December 3.',
    architecture: 'Mannerist and Baroque architectural style constructed of black laterite stone left unplastered on the exterior. The interior features a gilded main altar holding a colossal statue of St. Ignatius Loyola and a Florentine marble mausoleum designed by Giovanni Battista Foggini.',
    thingsToSee: [
      'The silver casket and Florentine marble mausoleum containing the relics of St. Francis Xavier',
      'The gilded high altar standing 30 feet tall adorned with cherubs and gold leaf',
      'The Chapel of the Blessed Sacrament and the wooden statue of St. Francis Xavier',
      'Modern Art Gallery upstairs displaying Christian religious paintings',
      'Ancient carved tombstone epitaphs and Jesuit historic records'
    ],
    bestTimeToVisit: 'October to April (9:00 AM – 12:30 PM or 3:00 PM – 5:30 PM).',
    openingHours: '9:00 AM – 6:30 PM (Mon–Sat); 10:30 AM – 6:30 PM (Sundays)',
    entryFee: 'Free entry (Modest dress code enforced: no beachwear/sleeveless).',
    visitDuration: '1 – 2 hours',
    address: 'Old Goa Rd, Bainguinim, Old Goa, Goa 403402',
    latitude: 15.5009,
    longitude: 73.9116,
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Se Cathedral', 'Church of St. Francis of Assisi', 'Church of St. Cajetan', 'Viceroy\'s Arch'],
    tags: ['UNESCO', 'Baroque', 'St Francis Xavier', 'Old Goa', 'Church'],
    famousFor: 'UNESCO World Heritage Baroque architecture and sacred relics of St. Francis Xavier',
    howToReach: {
      air: 'Dabolim Airport (25 km), Manohar International Airport Mopa (35 km)',
      train: 'Karmali Railway Station (3 km), Madgaon (30 km)',
      local: 'Taxi or bus from Panaji (10 km) along the NH748 highway'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 12. KOLKATA (West Bengal)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-kol-1',
    name: 'Victoria Memorial',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'A monumental white Makrana marble palace commemorating Queen Victoria, blending British neoclassical and Mughal architectural elements, set in 64 acres of landscaped gardens.',
    fullDescription: 'The Victoria Memorial is Kolkata\'s most iconic architectural masterpiece, conceived by Viceroy Lord Curzon and constructed between 1906 and 1921. Built entirely from white Makrana marble from Rajasthan, the grand hall houses 25 galleries containing rare colonial portraits, Indian miniature paintings, sculptures, and historical arms.',
    history: 'Constructed to commemorate Queen Victoria\'s death in 1901, the foundation stone was laid in 1906 by the Prince of Wales (later King George V) and inaugurated in 1921.',
    culturalSignificance: 'A central civic landmark of Kolkata, hosting evening sound-and-light spectacles, morning walkers on its sweeping lawns, and major cultural book fairs.',
    architecture: 'Indo-Saracenic and Neoclassical revival style designed by Sir William Emerson. Features a 184-foot central dome surmounted by a 16-foot bronze rotating Angel of Victory, surrounded by Italianate gardens and water bodies.',
    thingsToSee: [
      'The 16-foot bronze Angel of Victory atop the central dome that rotates with wind',
      'The Royal Gallery housing Thomas Daniell\'s landscape paintings of 18th-century India',
      'Calcutta Gallery showcasing the historical evolution of the city from 1690 to 1911',
      'Lush 64-acre heritage gardens with bronze statues of Queen Victoria and Lord Curzon',
      'Evening illuminated Son-et-Lumiere light and sound show'
    ],
    bestTimeToVisit: 'October to March (10:00 AM – 5:00 PM; Gardens open 6:00 AM – 6:00 PM)',
    openingHours: 'Museum: 10:00 AM – 6:00 PM (Closed Mondays); Gardens: 6:00 AM – 6:00 PM (Daily)',
    entryFee: '₹50 for Indians; ₹500 for Foreigners; Garden entry: ₹20.',
    visitDuration: '2 – 3.5 hours',
    address: '1, Queens Way, Maidan, Kolkata, West Bengal 700071',
    latitude: 22.5448,
    longitude: 88.3426,
    images: [
      'https://images.unsplash.com/photo-1558431382-27e303142255?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['St. Paul\'s Cathedral', 'Indian Museum', 'Maidan', 'Birla Planetarium'],
    tags: ['Marble Palace', 'Colonial', 'Museum', 'Gardens', 'Iconic'],
    famousFor: 'Pure white Makrana marble Indo-Saracenic palace and the rotating bronze Angel of Victory',
    howToReach: {
      air: 'Netaji Subhash Chandra Bose International Airport (22 km)',
      train: 'Howrah Junction (6 km), Sealdah (5 km)',
      local: 'Maidan or Rabindra Sadan Metro Stations (~500m walk)'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-kol-2',
    name: 'Howrah Bridge (Rabindra Setu)',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'Modern Landmark',
    shortDescription: 'The world\'s busiest balanced cantilever steel bridge spanning the Hooghly River, built with 26,500 tonnes of high-tensile steel without a single nut or bolt.',
    fullDescription: 'Howrah Bridge (officially Rabindra Setu) is a monumental cantilever suspension bridge spanning the Hooghly River, linking Kolkata with its twin city Howrah. Commissioned in 1943 during World War II, the engineering marvel was fabricated entirely from high-tensile steel provided by Tata Steel, held together purely by hot-driven rivets without nuts or bolts.',
    history: 'Replaced an 1874 pontoon bridge to facilitate wartime troop movements and heavy municipal traffic. Renamed Rabindra Setu in 1965 in honor of Nobel laureate Rabindranath Tagore.',
    culturalSignificance: 'The defining gateway and cinematic emblem of Kolkata, carrying over 100,000 vehicles and 150,000 pedestrians daily alongside the vibrant Mallick Ghat flower market.',
    architecture: 'Balanced cantilever suspension truss bridge with a central span of 1,500 feet (457 meters) suspended 29 feet above water level, supported by two 280-foot steel towers.',
    thingsToSee: [
      'Panoramic sunset views across the Hooghly River and historic ghats',
      'Mallick Ghat Flower Market at the base (Asia\'s largest wholesale flower market)',
      'Ferry cruise beneath the massive steel cantilever trusses from Fairlie Place to Howrah',
      'Illuminated LED night lighting reflecting in the river water',
      'Historic Howrah Railway Station clock tower across the western bank'
    ],
    bestTimeToVisit: 'October to March; sunrise (5:30 AM – 7:30 AM for flower market) or sunset.',
    openingHours: 'Open 24/7 (Pedestrian walkways free to stroll; photography restricted on bridge deck)',
    entryFee: 'Free entry.',
    visitDuration: '45 mins – 1.5 hours',
    address: 'Howrah Bridge, Kolkata, West Bengal 700001',
    latitude: 22.5850,
    longitude: 88.3468,
    images: [
      'https://images.unsplash.com/photo-1558431382-27e303142255?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Mallick Ghat Flower Market', 'Howrah Railway Station', 'Millennium Park', 'Armenian Ghat'],
    tags: ['Bridge', 'Cantilever', 'Hooghly River', 'Engineering Marvel', 'Iconic'],
    famousFor: 'World\'s busiest cantilever bridge built without nuts or bolts and Mallick Ghat flower market',
    howToReach: {
      air: 'Kolkata Airport (16 km)',
      train: 'Directly connected to Howrah Junction Railway Station',
      local: 'Howrah Metro Station (Green Line) or Hooghly River Ferry'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-kol-3',
    name: 'Dakshineswar Kali Temple',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'A sacred 19th-century Navaratna (nine-spired) temple on the eastern bank of the Hooghly, where mystic saint Ramakrishna Paramahamsa attained spiritual enlightenment.',
    fullDescription: 'The Dakshineswar Kali Temple is a renowned Hindu temple dedicated to Goddess Bhavatarini (an aspect of Kali), founded in 1855 by the philanthropic queen Rani Rashmoni. Situated on the eastern bank of the Hooghly River, it is sanctified as the home of 19th-century mystic Sri Ramakrishna Paramahamsa and his disciple Swami Vivekananda.',
    history: 'Rani Rashmoni was inspired by a divine dream on the eve of her pilgrimage to Varanasi in 1847 to construct this riverside temple complex, breaking caste barriers by appointing Ramakrishna\'s brother Ramkumar as head priest.',
    culturalSignificance: 'The birthplace of modern Hindu universalist philosophy through the teachings of Sri Ramakrishna, drawing millions of pilgrims during Kali Puja and Snana Yatra.',
    architecture: 'Traditional Bengal Navaratna (nine-spired) architectural style, featuring a three-storeyed south-facing main temple flanked by twelve identical Aat-chala Shiva shrines and the Panchavati sacred grove.',
    thingsToSee: [
      'Goddess Bhavatarini sanctum sanctorum standing on Lord Shiva in silver lotus',
      'The 12 Aat-chala terracotta Shiva temples along the riverfront ghats',
      'The room of Sri Ramakrishna Paramahamsa preserving his original cot and relics',
      'Panchavati garden where Sri Ramakrishna practiced spiritual sadhanas under five sacred trees',
      'Skywalk connecting the railway station directly to the temple gates'
    ],
    bestTimeToVisit: 'October to March; early morning (6:00 AM – 9:00 AM) or evening Sandhya Aarti.',
    openingHours: '6:00 AM – 12:30 PM and 3:30 PM – 8:30 PM (Daily)',
    entryFee: 'Free entry.',
    visitDuration: '2 – 3 hours',
    address: 'Dakshineswar, Kolkata, West Bengal 700076',
    latitude: 22.6534,
    longitude: 88.3575,
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558431382-27e303142255?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Belur Math', 'Dakshineswar Skywalk', 'Adyapith Temple'],
    tags: ['Temple', 'Kali', 'Ramakrishna', 'Navaratna', 'Hooghly River'],
    famousFor: 'Nine-spired Navaratna temple where Sri Ramakrishna Paramahamsa attained enlightenment',
    howToReach: {
      air: 'Kolkata Airport (12 km)',
      train: 'Dakshineswar Railway Station (300m via Skywalk), Sealdah (12 km)',
      local: 'Dakshineswar Metro Station (Blue Line terminus directly connected)'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-kol-4',
    name: 'Indian Museum',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'Museum & Heritage',
    shortDescription: 'Founded in 1814, it is the ninth oldest museum in the world and the largest in Asia, famous for a 4,000-year-old Egyptian mummy and the Ashoka Lion Capital casts.',
    fullDescription: 'The Indian Museum (popularly known as Jadu Ghar / "House of Magic") is the oldest and largest multipurpose museum in the Asia-Pacific region, founded in 1814 by Danish botanist Dr. Nathaniel Wallich under the Asiatic Society of Bengal. Spanning 35 galleries across six sections (Art, Archaeology, Anthropology, Geology, Zoology, and Botany), it preserves over 100,000 rare antiquities.',
    history: 'Inaugurated in 1814, it laid the foundation of modern museum movement across the Indian subcontinent. Moved to its grand Italianate neoclassical building on Jawaharlal Nehru Road in 1875.',
    culturalSignificance: 'An institution of national importance preserving ancient Indus Valley artifacts, Gandharan Buddhist sculptures, and Mughal miniature masterpieces.',
    architecture: 'Grand Italianate Neoclassical colonnaded structure designed by Walter Granville, featuring an expansive central quadrangle courtyard with massive Doric and Ionic pillars.',
    thingsToSee: [
      'The 4,000-year-old Egyptian Mummy and Ptolemaic antiquities',
      'Bharhut Stupa railings and 2nd-century BCE Shunga carvings',
      'Gandhara gallery featuring Greco-Buddhist standing Buddha sculptures',
      'Meteorite and fossil gallery with prehistoric dinosaur and mammal remains',
      'Mughal and Rajasthani miniature painting gallery and rare coin collections'
    ],
    bestTimeToVisit: 'October to March (10:30 AM – 3:30 PM)',
    openingHours: '10:00 AM – 6:00 PM (Closed on Mondays and National Holidays)',
    entryFee: '₹50 for Indians; ₹500 for Foreigners; ₹100 for Photography.',
    visitDuration: '3 – 4.5 hours',
    address: '27, Jawaharlal Nehru Rd, Colootola, New Market Area, Kolkata, West Bengal 700016',
    latitude: 22.5579,
    longitude: 88.3511,
    images: [
      'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558431382-27e303142255?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Park Street', 'New Market', 'Victoria Memorial', 'Asiatic Society'],
    tags: ['Museum', 'Oldest in Asia', 'Mummy', 'Archaeology', 'Gandhara'],
    famousFor: 'Oldest and largest museum in Asia housing an Egyptian Mummy and Bharhut Stupa relics',
    howToReach: {
      air: 'Kolkata Airport (18 km)',
      train: 'Howrah (5 km), Sealdah (3 km)',
      local: 'Park Street Metro Station (100m walk)'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-kol-5',
    name: 'St. Paul\'s Cathedral',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The first Episcopal cathedral built in Asia, completed in 1847 in striking Indo-Gothic style with a towering 201-foot spire and stained glass windows designed by Sir Edward Burne-Jones.',
    fullDescription: 'St. Paul\'s Cathedral is an Anglican cathedral in Kolkata, celebrated as the first Episcopal cathedral constructed in the eastern world. Completed in 1847 after eight years of construction under Bishop Daniel Wilson, the cathedral is acclaimed for its soaring Indo-Gothic spire, magnificent stained glass windows, and peaceful landscaped grounds next to the Victoria Memorial.',
    history: 'Consecrated in October 1847 to replace the overcrowded St. John\'s Church. Its original spire was rebuilt in 1938 modeled on the Bell Harry Tower of Canterbury Cathedral after earthquake damage.',
    culturalSignificance: 'The seat of the Diocese of Calcutta. Famous for its magical midnight Christmas service when thousands of Kolkata residents of all faiths gather.',
    architecture: 'Indo-Gothic revival architecture with ribbed vaults, pointed arches, Florentine Renaissance frescoes, and magnificent West Windows designed by Pre-Raphaelite master Sir Edward Burne-Jones.',
    thingsToSee: [
      'The 201-foot central spire modeled after Canterbury Cathedral\'s Bell Harry Tower',
      'The West Window with stained glass designed by Sir Edward Burne-Jones in 1880',
      'Intricate wood-carved choir stalls and Florentine fresco altarpiece panels',
      'Monuments and memorial tablets honoring British military and civil figures in India',
      'Tranquil tree-shaded gardens surrounding the cathedral'
    ],
    bestTimeToVisit: 'October to March; Christmas Eve for the legendary festive midnight illumination.',
    openingHours: '9:00 AM – 5:30 PM (Mon–Sat); 7:30 AM – 6:00 PM (Sundays)',
    entryFee: 'Free entry.',
    visitDuration: '1 – 1.5 hours',
    address: '1A, Cathedral Rd, Maidan, Kolkata, West Bengal 700071',
    latitude: 22.5442,
    longitude: 88.3473,
    images: [
      'https://images.unsplash.com/photo-1558431382-27e303142255?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Victoria Memorial', 'Academy of Fine Arts', 'Birla Planetarium', 'Nandan'],
    tags: ['Cathedral', 'Indo-Gothic', 'Stained Glass', 'Episcopal', 'Colonial'],
    famousFor: 'First Episcopal cathedral in Asia with Gothic architecture and Canterbury-inspired spire',
    howToReach: {
      air: 'Kolkata Airport (22 km)',
      train: 'Howrah (6.5 km), Sealdah (5 km)',
      local: 'Rabindra Sadan or Maidan Metro Station (~300m walk)'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 13. PUNE (Maharashtra)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-pun-1',
    name: 'Shaniwar Wada',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'The 18th-century seven-storey palace citadel of the Peshwa prime ministers of the Maratha Empire, famed for its massive Dilli Darwaza with anti-elephant steel spikes.',
    fullDescription: 'Shaniwar Wada was the magnificent seat of the Peshwa prime ministers of the Maratha Empire, commissioned in 1730 by Peshwa Baji Rao I. Once a palatial seven-storey timber and stone complex containing thousands of rooms, grand fountains, and gardens, it served as the political nerve center of the Maratha Confederacy until 1818.',
    history: 'Foundation laid on a Saturday (Shaniwar) in 1730. It witnessed the zenith of Maratha military campaigns across India. A tragic palace fire in 1828 destroyed most wooden upper storeys, leaving the stone ramparts and bastions intact.',
    culturalSignificance: 'The paramount symbol of Maratha pride and Bajirao Peshwa\'s chivalric legacy, celebrated in Marathi literature and historic folk ballads.',
    architecture: 'Maratha fortress palace design featuring granite foundation plinths, 21-foot-tall teakwood Dilli Darwaza gates studded with 72 steel spikes, and the 16-petal lotus-shaped Hazari Karanje fountain.',
    thingsToSee: [
      'Dilli Darwaza (Delhi Gate) with massive anti-elephant iron spikes',
      'Hazari Karanje: The intricate 16-petal fountain with 1,000 water jets',
      'Massive stone fortification ramparts and defensive corner bastions',
      'The archaeological foundations of the Peshwa court chambers',
      'Evening sound and light show narrating the history of the Maratha Empire'
    ],
    bestTimeToVisit: 'October to February; late afternoon (4:00 PM – 6:30 PM) for the light and sound show.',
    openingHours: '9:30 AM – 5:30 PM (Daily); Sound & Light Show: 6:30 PM – 8:30 PM',
    entryFee: '₹25 for Indians; ₹300 for Foreigners; Sound & Light Show: ₹50.',
    visitDuration: '1.5 – 2.5 hours',
    address: 'Shaniwar Peth, Pune, Maharashtra 411030',
    latitude: 18.5196,
    longitude: 73.8553,
    images: [
      'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Dagdusheth Halwai Ganpati', 'Kasba Ganpati', 'Lal Mahal', 'Tulsi Baug'],
    tags: ['Fort', 'Peshwa', 'Maratha Empire', 'Baji Rao', 'History'],
    famousFor: 'Historical seven-storey fortress citadel of Peshwa Baji Rao I and Dilli Darwaza',
    howToReach: {
      air: 'Pune International Airport (12 km)',
      train: 'Pune Junction Railway Station (3 km)',
      local: 'Civil Court Metro Station (1.2 km) or local PMPML bus / auto'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-pun-2',
    name: 'Aga Khan Palace',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'A serene 19th-century Italianate palace constructed by Sultan Muhammed Shah Aga Khan III, which served as the prison for Mahatma Gandhi during the 1942 Quit India Movement.',
    fullDescription: 'The Aga Khan Palace is a majestic heritage palace built in 1892 by Sultan Muhammed Shah Aga Khan III to aid famine-stricken villagers in the Pune region. Spread over 19 acres, it holds immense national significance as the internment site of Mahatma Gandhi, Kasturba Gandhi, and Mahadev Desai following the 1942 Quit India Movement launch.',
    history: 'During their two-year British imprisonment here (1942–1944), Kasturba Gandhi and secretary Mahadev Desai passed away. Their samadhis (memorial shrines) and a portion of Mahatma Gandhi\'s ashes are preserved in the palace gardens.',
    culturalSignificance: 'Declared a Monument of National Importance in 2003, serving as a pilgrimage center for Gandhian philosophy and peace.',
    architecture: 'Italianate arches, sweeping colonnaded corridors, and spacious lawns combining European neoclassical design with Islamic arch proportions.',
    thingsToSee: [
      'The room where Mahatma Gandhi was imprisoned with his original bed and charkha',
      'The sacred marble Samadhis of Kasturba Gandhi and Mahadev Desai in the garden',
      'Gandhi Memorial Museum featuring rare personal photographs and letters',
      'Lush 19-acre Italianate gardens with ancient banyan trees and fountains',
      'The room where Kasturba Gandhi breathed her last in February 1944'
    ],
    bestTimeToVisit: 'October to February; morning or peaceful late afternoon.',
    openingHours: '9:00 AM – 5:30 PM (Daily)',
    entryFee: '₹25 for Indians; ₹300 for Foreigners.',
    visitDuration: '1.5 – 2.5 hours',
    address: 'Pune Nagar Road, Kalyani Nagar, Pune, Maharashtra 411006',
    latitude: 18.5529,
    longitude: 73.9015,
    images: [
      'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Osho International Meditation Resort', 'Koregaon Park', 'Bund Garden'],
    tags: ['Gandhi', 'Quit India', 'Palace', 'Memorial', 'Kasturba Samadhi'],
    famousFor: 'Internment site of Mahatma Gandhi during the Quit India Movement and Kasturba Gandhi\'s Samadhi',
    howToReach: {
      air: 'Pune Airport (5 km)',
      train: 'Pune Junction (6 km)',
      local: 'Kalyani Nagar Metro Station (~1 km) or direct city cabs'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-pun-3',
    name: 'Sinhagad Fort (Lion\'s Fort)',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'A dramatic Sahyadri cliffside fortress perched 1,312 meters high, legendary for Tanaji Malusare\'s heroic night battle in 1670 using monitor lizards to scale the sheer cliffs.',
    fullDescription: 'Sinhagad (meaning "Lion\'s Fort", originally Kondhana) is an ancient Sahyadri hill fortress situated 30 km southwest of Pune on an isolated cliff rising 1,312 meters above sea level. It was the site of the legendary 1670 Battle of Sinhagad, where Maratha commander Tanaji Malusare recaptured the fort from the Mughals, prompting Shivaji Maharaj\'s famous grief: "Gad ala, pan sinh gela" (The fort is won, but the lion is lost).',
    history: 'Dating back over 2,000 years with Kaundinyeshwar cave carvings; refortified by Chhatrapati Shivaji Maharaj in the 17th century as a key southern bastion.',
    culturalSignificance: 'The ultimate pilgrimage for trekking enthusiasts and Maratha history buffs, famous for steaming pithla-bhakri and matka curd served in rustic hilltop stalls.',
    architecture: 'Strategic natural mountain fortification with vertical cliff faces, stepped ramparts, Kalyan Darwaza, Pune Darwaza, and water cisterns (Dev Taki).',
    thingsToSee: [
      'Memorial memorial tomb (Samadhi) of legendary warrior Tanaji Malusare',
      'The sheer cliff of Tanaji Kada from where the Maratha commandos climbed',
      'Dev Taki: Natural mountain springs providing ice-cold drinking water year-round',
      'Kalyan Darwaza and Pune Darwaza historic stone entry gateways',
      'Panoramic 360-degree views of Khadakwasla Dam and the Western Ghats'
    ],
    bestTimeToVisit: 'Monsoon (July to September for mist and waterfalls) and Winter (October to February).',
    openingHours: '6:00 AM – 6:00 PM (Daily)',
    entryFee: '₹20 for Pedestrians; ₹50 for Two-wheelers; ₹100 for Cars.',
    visitDuration: '3 – 5 hours',
    address: 'Sinhagad Ghat Rd, Thoptewadi, Pune, Maharashtra 411025',
    latitude: 18.3664,
    longitude: 73.7558,
    images: [
      'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Khadakwasla Dam', 'National Defence Academy (NDA)', 'Panshet Dam'],
    tags: ['Hill Fort', 'Tanaji Malusare', 'Shivaji Maharaj', 'Trekking', 'Sahyadri'],
    famousFor: 'Heroic 1670 battle of Tanaji Malusare, dramatic Sahyadri cliff views, and Pithla Bhakri',
    howToReach: {
      air: 'Pune Airport (38 km)',
      train: 'Pune Junction (32 km)',
      local: 'Bus/taxi to Sinhagad Paytha followed by road drive or 2-hour hiking trek'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-pun-4',
    name: 'Pataleshwar Cave Temple',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'An 8th-century Rashtrakuta rock-cut monolithic cave temple carved from a single basalt rock in the heart of Pune, dedicated to Lord Shiva and Nandi.',
    fullDescription: 'The Pataleshwar Cave Temple (Panchaleshwar) is an 8th-century rock-cut monolithic cave shrine carved into solid basalt rock during the Rashtrakuta period. Located on modern Jangli Maharaj Road, the temple resembles the rock-cut cave architecture of Elephanta Caves and Ellora, featuring massive square pillars, a monolithic circular Nandi mandapa, and a rock-hewn sanctum.',
    history: 'Carved in the 8th century CE under the patronization of the Rashtrakuta kings, the temple remained unfinished due to a geological fault line discovered in the rock.',
    culturalSignificance: 'A tranquil subterranean sanctuary in the midst of bustling Pune city, attracting devotees who offer milk and bael leaves at the Shiva Lingam.',
    architecture: 'Subterranean rock-hewn monolithic architecture featuring a circular stone canopy sheltering a colossal Nandi bull, carved courtyard corridors, and cubical pillars.',
    thingsToSee: [
      'Monolithic circular umbrella-shaped stone canopy sheltering the Nandi Bull',
      'The inner sanctum housing the rock-hewn Shiva Lingam',
      'Bas-relief rock carvings of Ganesha, Sita-Rama, and Tripurantaka Shiva',
      'Massive square-cut basalt pillars casting geometric light and shadows',
      'Shaded garden courtyard offering peaceful seclusion from city traffic'
    ],
    bestTimeToVisit: 'Year-round; early morning or evening during aarti.',
    openingHours: '8:30 AM – 5:30 PM (Daily)',
    entryFee: 'Free entry.',
    visitDuration: '45 mins – 1.5 hours',
    address: 'Jangali Maharaj Rd, Revenue Colony, Shivajinagar, Pune, Maharashtra 411005',
    latitude: 18.5283,
    longitude: 73.8496,
    images: [
      'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Jangli Maharaj Temple', 'Fergusson College', 'FC Road Market'],
    tags: ['Rock Cut', 'Rashtrakuta', 'Shiva', 'Nandi', 'Ancient'],
    famousFor: '8th-century monolithic basalt rock-cut cave temple and circular Nandi canopy',
    howToReach: {
      air: 'Pune Airport (12 km)',
      train: 'Shivajinagar Railway Station (1.5 km), Pune Junction (3.5 km)',
      local: 'Shivajinagar Metro Station or auto-rickshaw to JM Road'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-pun-5',
    name: 'Raja Dinkar Kelkar Museum',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'Museum & Heritage',
    shortDescription: 'A one-man collection of over 20,000 rare traditional Indian everyday art objects, musical instruments, brass lamps, and the reconstructed Mastani Mahal palace chamber.',
    fullDescription: 'The Raja Dinkar Kelkar Museum contains the extraordinary private collection of Dr. Dinkar G. Kelkar (Kaka Kelkar), dedicated to the memory of his only son, Raja. Assembled over six decades of travels across India, the museum features 20,000+ artifacts spanning brass locks, betel-nut cutters, ivory doors, folk musical instruments, and the replicated Mastani Mahal.',
    history: 'Begun in the 1920s by Dr. Kelkar and gifted to the Department of Archaeology, Government of Maharashtra, in 1975 to preserve vanishing traditional domestic craft heritage.',
    culturalSignificance: 'Celebrates the sheer artistic ingenuity embedded in everyday Indian household objects across medieval Maharashtra, Gujarat, Rajasthan, and South India.',
    architecture: 'Multi-storey Rajasthani carved stone and teakwood mansion structure designed in traditional Wada style.',
    thingsToSee: [
      'Mastani Mahal: Reconstructed 18th-century palace chamber of Peshwa Baji Rao I\'s queen Mastani',
      'The exquisite Musical Instruments Gallery with rare sitars, sarangis, and tamburas',
      'Intricate collection of 100+ antique brass betel-nut cutters (sarota) shaped like dancers',
      'Carved wooden palace doors and brass oil lamps from temple sanctums',
      'Textiles, terracotta toys, and Maratha weapon armory'
    ],
    bestTimeToVisit: 'October to March (10:00 AM – 4:00 PM)',
    openingHours: '10:00 AM – 5:30 PM (Daily)',
    entryFee: '₹100 for Indian Adults; ₹50 for Children; ₹300 for Foreigners.',
    visitDuration: '2 – 3 hours',
    address: '1377-78, Kamal Kunj, Natu Baug, Shukrawar Peth, Pune, Maharashtra 411002',
    latitude: 18.5113,
    longitude: 73.8543,
    images: [
      'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609137144820-22e7740f9b69?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Shaniwar Wada', 'Sarasbaug', 'Parvati Hill', 'Tulsi Baug'],
    tags: ['Museum', 'Mastani Mahal', 'Folk Art', 'Handicrafts', 'Peshwa'],
    famousFor: 'Reconstructed 18th-century Mastani Mahal and rare collection of 20,000+ Indian domestic artifacts',
    howToReach: {
      air: 'Pune Airport (14 km)',
      train: 'Pune Junction (4 km)',
      local: 'Auto-rickshaw or taxi to Shukrawar Peth / Bajirao Road'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 14. KOCHI (Kerala)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-cok-1',
    name: 'Fort Kochi & Chinese Fishing Nets',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The iconic 14th-century cantilevered shore-operated fishing nets (Cheena Vala) lining Vasco da Gama Square, introduced by traders from the court of Kublai Khan.',
    fullDescription: 'Fort Kochi\'s Chinese Fishing Nets (Cheena Vala) are iconic cantilevered shore fishing apparatuses stationed along the Arabian Sea coast. Believed to have been introduced in the 14th century by Chinese trader Zheng He from the court of Kublai Khan, these 10-meter-high wooden contraptions operate on counterweights suspended over the water, forming the definitive postcard silhouette of Kerala.',
    history: 'Introduced between 1350 and 1450 CE; Fort Kochi later evolved into India\'s first European colonial settlement, passing through Portuguese, Dutch, and British governance.',
    culturalSignificance: 'The living symbol of Kochi\'s cosmopolitan maritime spice history. Visitors can watch local fishermen lower and raise the massive nets and purchase the fresh catch directly on the promenade.',
    architecture: 'Ingenious mechanical timber engineering utilizing cantilevered teak poles, bamboo beams, counterweight rocks, and 20-meter nylon nets suspended over sea waters.',
    thingsToSee: [
      'Live operation of the cantilevered nets operated synchronously by 4-6 fishermen',
      'Sunset views framed through the silhouette of the timber net frames',
      'Vasco da Gama Square street seafood grills cooking fresh fish on order',
      'Colonial heritage streets of Fort Kochi with Portuguese and Dutch bungalows',
      'Kathakali and Kalaripayattu cultural performance centers nearby'
    ],
    bestTimeToVisit: 'September to March; late afternoon (4:30 PM – 6:30 PM) for sunset photography.',
    openingHours: 'Open 24/7; Fishing activity active throughout early mornings and late afternoons',
    entryFee: 'Promenade viewing: Free; Fishermen offer demonstrations for a nominal tip.',
    visitDuration: '1.5 – 2.5 hours',
    address: 'Vasco da Gama Square, Fort Kochi, Kochi, Kerala 682001',
    latitude: 9.9678,
    longitude: 76.2415,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['St. Francis Church', 'Santa Cruz Cathedral Basilica', 'Princess Street', 'Mattancherry'],
    tags: ['Chinese Fishing Nets', 'Fort Kochi', 'Sunset', 'Colonial', 'Seafood'],
    famousFor: 'Iconic 14th-century cantilevered Chinese fishing nets and sunset views on the Arabian Sea',
    howToReach: {
      air: 'Cochin International Airport (42 km)',
      train: 'Ernakulam Junction / South (12 km), Ernakulam Town / North (14 km)',
      local: 'Scenic 20-minute Ro-Ro water ferry from Ernakulam Marine Drive to Fort Kochi'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-cok-2',
    name: 'Mattancherry Palace (Dutch Palace)',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'A 16th-century Portuguese palace gifted to the Raja of Kochi, famed for world-renowned Hindu mythological murals depicting the Ramayana and Mahabharata.',
    fullDescription: 'Mattancherry Palace (popularly known as the Dutch Palace) was built around 1555 CE by the Portuguese and presented to King Veera Kerala Varma of Kochi in gratitude for trading privileges. Renovated by the Dutch in 1663, the palace houses some of India\'s finest 16th-century Hindu tempera murals illustrating the Ramayana and Bhagavata Purana.',
    history: 'Built as a gift by the Portuguese, it served as the coronation palace for the Rajas of Kochi. Extensively renovated by the Dutch East India Company in 1663, giving it the moniker "Dutch Palace".',
    culturalSignificance: 'Contains 300 square meters of the finest classical Kerala mural paintings, renowned worldwide for their vibrant natural vegetable pigments and delicate detail.',
    architecture: 'Traditional Kerala Nalukettu architectural style featuring a central courtyard, sloping tiled roofs, wood-carved floral ceilings, and Dutch arches.',
    thingsToSee: [
      'The Ramayana Room housing 48 vibrant 16th-century classical Kerala murals',
      'The Coronation Hall displaying royal palanquins, ivory carvings, and silver robes',
      'Royal portraits and lineage records of the Maharajas of Cochin',
      'Antique royal weapons, iron broadswords, and ceremonial umbrellas',
      'The central Bhagavati temple courtyard'
    ],
    bestTimeToVisit: 'October to March (10:00 AM – 4:00 PM)',
    openingHours: '9:45 AM – 1:00 PM and 2:00 PM – 4:45 PM (Closed on Fridays)',
    entryFee: '₹5 for Adults; Free for children below 15.',
    visitDuration: '1.5 – 2 hours',
    address: 'Mattancherry, Kochi, Kerala 682002',
    latitude: 9.9583,
    longitude: 76.2594,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Paradesi Synagogue', 'Jew Town', 'Police Museum', 'Fort Kochi'],
    tags: ['Dutch Palace', 'Kerala Murals', 'Ramayana', 'Kochi Royalty', 'Nalukettu'],
    famousFor: 'World-famous 16th-century Ramayana tempera murals and traditional Nalukettu architecture',
    howToReach: {
      air: 'Cochin International Airport (40 km)',
      train: 'Ernakulam South (10 km)',
      local: 'Auto-rickshaw or taxi from Fort Kochi (3 km) or ferry from Ernakulam'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-cok-3',
    name: 'Paradesi Synagogue (Jewish Synagogue)',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'The oldest active synagogue in the Commonwealth, constructed in 1568 in Jew Town, featuring hundreds of hand-painted Chinese willow-pattern porcelain floor tiles and Belgian chandeliers.',
    fullDescription: 'The Paradesi Synagogue (meaning "Foreigners\' Synagogue") is the oldest functioning synagogue in India and the Commonwealth nations, built in 1568 by Spanish-speaking Sephardic Jews who found refuge in Kochi under the protection of the Raja of Kochi. Located in historic Jew Town, it features rare hand-painted 18th-century Chinese porcelain floor tiles and Belgian glass chandeliers.',
    history: 'Erected on land granted by Raja Rama Varma adjacent to the Mattancherry Palace. Partially destroyed by the Portuguese in 1662 and rebuilt under Dutch protection in 1664.',
    culturalSignificance: 'A living testament to 2,000 years of peaceful Jewish existence in Malabar, housing golden crowns and ancient copper plates granted by King Bhaskara Ravi Varma in 1000 CE.',
    architecture: 'Colonial Dutch-Jewish architecture featuring a 1762 clock tower with Roman, Hebrew, Malayalam, and Arabic numerals, brass pulpits, and hand-painted blue Cantonese porcelain tiles.',
    thingsToSee: [
      'Hundreds of 18th-century hand-painted blue-and-white Chinese porcelain floor tiles (no two identical)',
      '19th-century sparkling Belgian crystal chandeliers hanging from the timber rafters',
      'The 1762 four-dial clock tower inscribed with Roman, Hebrew, and Malayalam numerals',
      'Gold and silver crowns presented to the Torah scrolls by Cochin Maharajas',
      'Bustling antique and spice shops along the cobbled lanes of Jew Town'
    ],
    bestTimeToVisit: 'October to March (10:00 AM – 12:00 PM or 3:00 PM – 5:00 PM)',
    openingHours: '10:00 AM – 5:00 PM (Closed on Fridays, Saturdays, and Jewish Holidays)',
    entryFee: '₹10 for Adults; Free for children; Shoes must be removed before entering.',
    visitDuration: '45 mins – 1.5 hours',
    address: 'Synagogue Ln, Jew Town, Kappalandimukku, Mattancherry, Kochi, Kerala 682002',
    latitude: 9.9575,
    longitude: 76.2597,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Jew Town Antiques', 'Mattancherry Dutch Palace', 'Fort Kochi'],
    tags: ['Synagogue', 'Jewish Heritage', 'Porcelain Tiles', 'Jew Town', 'Ancient'],
    famousFor: 'Oldest active synagogue in the Commonwealth with hand-painted Chinese porcelain tiles',
    howToReach: {
      air: 'Cochin International Airport (41 km)',
      train: 'Ernakulam South (10 km)',
      local: 'Short 2-minute walk from Mattancherry Palace in Jew Town'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-cok-4',
    name: 'St. Francis Church',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'The oldest European church built in India (1503), where legendary Portuguese explorer Vasco da Gama was initially buried in 1524 before his remains were moved to Lisbon.',
    fullDescription: 'St. Francis Church in Fort Kochi is historically significant as the oldest European church constructed on the Indian subcontinent. Built in 1503 by Portuguese Franciscan friars with the permission of the Raja of Cochin, it served as the original burial site of explorer Vasco da Gama following his death in Kochi in 1524.',
    history: 'Originally built of timber in 1503 and rebuilt in stone in 1516. When the Dutch captured Kochi in 1663, it was converted into a Protestant church, later becoming Anglican under the British in 1795.',
    culturalSignificance: 'A protected monument of national importance representing the transition of European colonial power in Asia across Portuguese, Dutch, and British rule.',
    architecture: 'Portuguese colonial architecture featuring a gabled timber facade, tiled roof, semi-circular arched windows, and the manually pulled rope-and-pulley punkah fans.',
    thingsToSee: [
      'The original burial spot and gravestone of Portuguese explorer Vasco da Gama',
      'The historic manual rope-operated cloth fans (punkahs) suspended from the ceiling',
      'Ancient Dutch and Portuguese gravestones lining the interior stone walls',
      'The historic church register on parchment containing baptism and marriage records from 1751',
      'Peaceful grassy square shaded by ancient rain trees in Fort Kochi'
    ],
    bestTimeToVisit: 'October to March (9:00 AM – 1:00 PM or 2:00 PM – 5:00 PM)',
    openingHours: '7:00 AM – 6:30 PM (Mon–Sat); 8:30 AM – 6:30 PM (Sundays)',
    entryFee: 'Free entry.',
    visitDuration: '45 mins – 1 hour',
    address: 'Head Post Office, Saint Francis Church Rd, Fort Kochi, Kochi, Kerala 682001',
    latitude: 9.9660,
    longitude: 76.2428,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Chinese Fishing Nets', 'Santa Cruz Basilica', 'Princess Street', 'Vasco House'],
    tags: ['Vasco da Gama', 'Oldest Church', 'Portuguese', 'Fort Kochi', 'History'],
    famousFor: 'Oldest European church in India and the original 1524 burial site of Vasco da Gama',
    howToReach: {
      air: 'Cochin International Airport (42 km)',
      train: 'Ernakulam South (12 km)',
      local: '5-minute walk from the Chinese Fishing Nets at Vasco da Gama Square'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-cok-5',
    name: 'Kerala Folklore Museum',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    category: 'Cultural Center',
    shortDescription: 'A treasure house of traditional South Indian architecture housing over 4,000 folk artifacts, Kathakali masks, wooden temple carvings, and live classical dance performances.',
    fullDescription: 'The Kerala Folklore Museum in Thevara is a unique private cultural institution established by George J. Thaliath to preserve South Indian tribal, folk, and classical heritage. Constructed across three distinct storeys showcasing Malabar, Cochin, and Travancore architectural styles, it houses 4,000+ rare artifacts including Theyyam headdresses, temple jewelry, and a timber dance theatre.',
    history: 'Built over 25 years utilizing salvaged elements from 25 dismantled traditional heritage homes (manas) and temples across Kerala.',
    culturalSignificance: 'A center for traditional arts preservation, hosting authentic evening Kathakali and Kalaripayattu dance-theatre recitals.',
    architecture: 'Three-tier architecture: Ground floor in Malabar wood architecture, First floor in Cochin royal style, and Second floor in Travancore style with an ornate wood-carved ceiling.',
    thingsToSee: [
      'Over 4,000 rare folk art objects, tribal costumes, and masks',
      'Theyyam and Kathakali ornate headdresses and wooden puppets',
      'The 17th-century wooden temple theatre (Kalithattu) with wood-carved lotus ceiling',
      'Rare Stone Age tools, bronze lamps, and ancestral temple jewelry',
      'Evening classical Kathakali dance makeup demonstration and recital'
    ],
    bestTimeToVisit: 'October to March (9:30 AM – 6:00 PM)',
    openingHours: '9:00 AM – 6:00 PM (Daily); Evening show: 6:30 PM – 8:00 PM',
    entryFee: '₹100 for Indian Adults; ₹50 for Students; ₹200 for Foreigners.',
    visitDuration: '2 – 3 hours',
    address: 'Folklore Junction, Pandit Karuppan Rd, Thevara, Kochi, Kerala 682013',
    latitude: 9.9328,
    longitude: 76.3023,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1569851935333-6ca1448cc299?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Ernakulam Marine Drive', 'Hill Palace Tripunithura', 'Vembanad Lake'],
    tags: ['Folklore', 'Kathakali', 'Theyyam', 'Traditional Architecture', 'Museum'],
    famousFor: 'Three-tiered traditional wooden architecture and 4,000+ South Indian folk art treasures',
    howToReach: {
      air: 'Cochin International Airport (35 km)',
      train: 'Ernakulam South / Junction (5 km)',
      local: 'Auto-rickshaw or taxi to Thevara Ferry Junction'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 15. MYSURU (Karnataka)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-mys-1',
    name: 'Mysore Palace (Amba Vilas Palace)',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'The magnificent official residence of the Wadiyar dynasty, illuminated by 97,000 golden incandescent bulbs on Sundays, renowned for stained glass and carved mahogany ceilings.',
    fullDescription: 'Mysore Palace (Amba Vilas Palace) is one of India\'s most celebrated royal residences, situated at the heart of Mysuru. Designed by British architect Henry Irwin and completed in 1912 after the earlier wooden palace was destroyed by fire in 1897, the three-storey stone palace combines Indo-Saracenic, Rajput, Hindu, and Gothic styles, serving as the epicenter of the world-famous Mysore Dasara celebrations.',
    history: 'The royal seat of the Kingdom of Mysore under the Wadiyar dynasty who ruled for over six centuries. Rebuilt in granite under the reign of Maharaja Krishnaraja Wadiyar IV.',
    culturalSignificance: 'The soul of Mysore Dasara, where the 750 kg golden howdah carrying Goddess Chamundeshwari is mounted on a decorated royal elephant during the Jamboo Savari procession.',
    architecture: 'Indo-Saracenic masterwork constructed of fine grey granite with deep pink marble domes. Features a 145-foot five-storey central tower, Belgian stained glass peacock ceilings, and solid silver doors.',
    thingsToSee: [
      'Gombe Thotti (Doll\'s Pavilion) displaying traditional royal dolls and the Golden Howdah',
      'Kalyana Mantapa (Marriage Pavilion) with stained glass peacock ceiling and mosaic tiles',
      'The grand Public Durbar Hall with massive fluted gold pillars and mythological frescoes',
      'The 97,000-bulb evening illumination on Sundays and public holidays (7:00 PM – 7:45 PM)',
      'The residential museum displaying royal weaponry, royal thrones, and vintage portraits'
    ],
    bestTimeToVisit: 'September to March; especially during the 10-day Dasara Festival in October/November.',
    openingHours: '10:00 AM – 5:30 PM (Daily); Illumination: Sundays & Holidays 7:00 PM – 7:45 PM',
    entryFee: '₹100 for Indian Adults; ₹50 for Children; ₹300 for Foreigners; Audio guide available.',
    visitDuration: '2.5 – 4 hours',
    address: 'Sayyaji Rao Rd, Agrahara, Chamrajpura, Mysuru, Karnataka 570001',
    latitude: 12.3051,
    longitude: 76.6551,
    images: [
      'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Chamundeshwari Temple', 'Devaraja Market', 'Jaganmohan Palace', 'St. Philomena\'s Cathedral'],
    tags: ['Palace', 'Wodeyar', 'Illumination', 'Dasara', 'Indo-Saracenic'],
    famousFor: 'Opulent Indo-Saracenic royal architecture and 97,000-bulb Sunday evening illumination',
    howToReach: {
      air: 'Mysore Airport (Mandakalli) (10 km), Bengaluru Airport (170 km via Expressway)',
      train: 'Mysuru Junction Railway Station (1.5 km)',
      local: 'Auto-rickshaw or horse-drawn tonga carriage from city center'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-mys-2',
    name: 'Chamundeshwari Temple',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'A sacred 1,000-year-old temple atop Chamundi Hills dedicated to Goddess Chamundeshwari (slayer of Mahishasura), featuring a 16-foot monolithic granite Nandi bull.',
    fullDescription: 'The Sri Chamundeshwari Temple is situated atop the 1,000-meter-high Chamundi Hills overlooking Mysuru. Dedicated to Goddess Durga in her fierce avatar as Chamundeshwari (who vanquished the buffalo demon Mahishasura, from whom Mysuru derives its name), the shrine dates back to the 12th-century Hoysala period and was enlarged with a seven-tier Dravidian gopuram by the Vijayanagara and Wadiyar rulers.',
    history: 'Original shrine built by Hoysala rulers in the 12th century; the 1,000-step stone stairway and the monumental monolithic Nandi were commissioned by Maharaja Dodda Devaraja Wadiyar in 1659.',
    culturalSignificance: 'The patron tutelary deity of the Wadiyars and Mysuru city. The idol is worshipped during Dasara and taken on a royal procession through the city streets.',
    architecture: 'Classic Dravidian temple architecture featuring a 7-tier 100-foot gopuram, gold finials (kalasas), silver-plated sanctum doorways, and stone-carved pillar mandapas.',
    thingsToSee: [
      'The sanctum sanctorum housing the gold idol of Goddess Chamundeshwari',
      'The colossal 16-foot-tall, 25-foot-long monolithic black granite Nandi Bull (350+ years old)',
      'The colorful statue of demon Mahishasura with sword and cobra at the hill entrance',
      'Panoramic 360-degree hilltop views of Mysuru Palace and the city below',
      'The historic 1,008 stone steps ascending the hill from the base'
    ],
    bestTimeToVisit: 'September to March; early morning (7:00 AM – 9:00 AM) or sunset.',
    openingHours: '7:30 AM – 2:00 PM, 3:30 PM – 6:00 PM, and 7:30 PM – 9:00 PM (Daily)',
    entryFee: 'General Darshan: Free; Special Darshan: ₹100.',
    visitDuration: '2 – 3 hours',
    address: 'Chamundi Hill, Mysuru, Karnataka 570010',
    latitude: 12.2724,
    longitude: 76.6713,
    images: [
      'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Monolithic Nandi Statue', 'Mahishasura Statue', 'Mysore Palace', 'Karanji Lake'],
    tags: ['Temple', 'Chamundi Hills', 'Nandi', 'Dravidian', 'Spiritual'],
    famousFor: 'Ancient hilltop temple of Goddess Chamundeshwari and the 16-foot monolithic Nandi',
    howToReach: {
      air: 'Mysore Airport (12 km)',
      train: 'Mysuru Junction (13 km)',
      local: 'Frequent KSRTC city buses from Mysore City Bus Stand or direct taxi'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-mys-3',
    name: 'Brindavan Gardens',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    category: 'Nature & Scenic',
    shortDescription: 'A celebrated 60-acre terraced garden adjoining the Krishnarajasagara (KRS) Dam across the Cauvery River, famous for evening musical dancing fountains.',
    fullDescription: 'Brindavan Gardens is a world-famous 60-acre terraced ornamental garden laid out below the historic Krishnarajasagara (KRS) Dam across the Cauvery River. Designed in 1927 by Sir Mirza Ismail (Dewan of Mysore) inspired by the Shalimar Gardens of Kashmir, it features symmetrical terrace cascades, topiary, colorful flowerbeds, and a musical fountain show.',
    history: 'Constructed between 1927 and 1932 alongside the KRS Dam (engineered by Sir M. Visvesvaraya) to create a public recreational botanical paradise.',
    culturalSignificance: 'One of the most popular tourist attractions in Karnataka and a legendary backdrop for hundreds of Indian cinematic song sequences.',
    architecture: 'Terraced formal garden layout spanning three tiers, equipped with hydraulic water fountains, illumination channels, and gazebos.',
    thingsToSee: [
      'The evening Synchronized Musical Dancing Fountain Show with colorful lights',
      'Boating across the central ornamental water channel between the north and south gardens',
      'Topiary garden sculptures of animals and geometric shrubs',
      'Massive view of the historic Krishnarajasagara Dam stone wall',
      'Lush rose gardens and illuminated walkways at dusk'
    ],
    bestTimeToVisit: 'October to March; late afternoon (4:30 PM – 8:00 PM) to catch the fountain show.',
    openingHours: '6:30 AM – 9:00 PM (Daily); Musical Fountain Show: 7:00 PM – 8:00 PM (Weekdays), 7:00 PM – 8:30 PM (Weekends)',
    entryFee: '₹50 for Adults; ₹10 for Children; Boating charged separately.',
    visitDuration: '2.5 – 3.5 hours',
    address: 'KRS Dam Rd, Mandya / Mysuru, Karnataka 571607',
    latitude: 12.4228,
    longitude: 76.5744,
    images: [
      'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['KRS Dam', 'Ranganathittu Bird Sanctuary', 'Srirangapatna'],
    tags: ['Gardens', 'Fountain Show', 'KRS Dam', 'Cauvery River', 'Cinematic'],
    famousFor: 'Terraced Mughal-style botanical gardens and evening synchronized musical fountain show',
    howToReach: {
      air: 'Mysore Airport (28 km), Bengaluru Airport (160 km)',
      train: 'Mysuru Junction (19 km)',
      local: 'KSRTC buses from Mysore City Bus Stand or rental car / taxi'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-mys-4',
    name: 'St. Philomena\'s Cathedral',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'One of the tallest churches in Asia, built in 1936 in majestic Neo-Gothic style inspired by Germany\'s Cologne Cathedral, featuring 175-foot twin spires and a catacomb chapel.',
    fullDescription: 'St. Philomena\'s Cathedral is a magnificent Neo-Gothic Roman Catholic cathedral in Mysuru, constructed in 1936 by the Wadiyar ruler Maharaja Krishnaraja Wadiyar IV to replace an earlier 1843 church. Designed by French architect Daly modeled after the Cologne Cathedral in Germany, it is celebrated for its 175-foot-high twin spires and French stained glass windows.',
    history: 'Maharaja Krishnaraja Wadiyar IV personally laid the foundation stone in October 1933, emphasizing religious harmony and civic patronage in princely Mysore.',
    culturalSignificance: 'Enshrines a sacred 3rd-century relic of Saint Philomena of Greece in a subterranean catacomb chapel below the high altar.',
    architecture: 'Neo-Gothic cross-shaped layout with 175-foot twin spires, marble altars, stained glass windows crafted in France depicting Christ\'s life, and a subterranean crypt.',
    thingsToSee: [
      'The towering 175-foot Neo-Gothic twin spires rising above the Mysuru skyline',
      'The subterranean Catacomb Crypt housing the relic and statue of Saint Philomena',
      'French stained glass windows depicting the Last Supper, Crucifixion, and Resurrection',
      'The central marble high altar imported from Europe',
      'Carved pillars and vaulted nave capable of holding 800 worshippers'
    ],
    bestTimeToVisit: 'September to March (9:00 AM – 5:30 PM)',
    openingHours: '5:00 AM – 6:00 PM (Daily)',
    entryFee: 'Free entry.',
    visitDuration: '1 – 1.5 hours',
    address: 'Lashkar Mohalla, Ashoka Rd, Mysuru, Karnataka 570001',
    latitude: 12.3213,
    longitude: 76.6575,
    images: [
      'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Mysore Palace', 'Devaraja Market', 'St. Bartholomew\'s Church'],
    tags: ['Cathedral', 'Neo-Gothic', 'Cologne Style', 'Twin Spires', 'Relic'],
    famousFor: 'Cologne Cathedral-inspired 175-foot Neo-Gothic spires and subterranean crypt relic',
    howToReach: {
      air: 'Mysore Airport (12 km)',
      train: 'Mysuru Junction (2 km)',
      local: 'Auto-rickshaw or city bus from city center'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-mys-5',
    name: 'Jaganmohan Palace & Art Gallery',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    category: 'Museum & Heritage',
    shortDescription: 'A 19th-century royal wooden palace converted into the Sri Jayachamarajendra Art Gallery, holding India\'s largest collection of original Raja Ravi Varma oil masterpieces.',
    fullDescription: 'Jaganmohan Palace is a historic royal palace constructed in 1861 by Maharaja Mummadi Krishnaraja Wadiyar III as an alternative royal residence when the original wooden Amba Vilas Palace burned down. Converted into an art gallery in 1915, it contains one of South India\'s largest collections of historic oil paintings, royal musical instruments, and traditional Mysore paintings.',
    history: 'Served as the official royal court from 1897 to 1912 until the new Amba Vilas Palace was completed. It was also the venue for the early sessions of the Mysore Legislative Council.',
    culturalSignificance: 'Renowned for preserving the finest collection of original oil paintings by Raja Ravi Varma, including his famous "Lady with the Lamp" (Glow of Hope by S.L. Haldankar).',
    architecture: 'Traditional Hindu royal palace architecture with carved wooden pillars, ornate wall murals, stained glass balconies, and three-tiered facade.',
    thingsToSee: [
      'Raja Ravi Varma Gallery with original masterpieces like "Harischandra" and "Victory of Meghanada"',
      '"Glow of Hope" (Lady with the Lamp): S.L. Haldankar\'s mesmerizing watercolor masterpiece',
      'The French Musical Clock displaying a miniature parade of toy figures every hour',
      'Antique royal weapons, ivory door carvings, and classical Mysore gold leaf paintings',
      'Historic royal durbar hall where early legislative assembly meetings convened'
    ],
    bestTimeToVisit: 'September to March (10:00 AM – 4:00 PM)',
    openingHours: '10:00 AM – 5:30 PM (Daily)',
    entryFee: '₹50 for Indian Adults; ₹25 for Children; ₹150 for Foreigners.',
    visitDuration: '1.5 – 2.5 hours',
    address: 'Deshika Rd, Subbarayanakere, Chamrajpura, Mysuru, Karnataka 570004',
    latitude: 12.3080,
    longitude: 76.6506,
    images: [
      'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580294658515-63f052988821?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Mysore Palace', 'Devaraja Market', 'Lalitha Mahal'],
    tags: ['Art Gallery', 'Raja Ravi Varma', 'Lady with Lamp', 'Wodeyar', 'Palace'],
    famousFor: 'Raja Ravi Varma original paintings and S.L. Haldankar\'s "Lady with the Lamp"',
    howToReach: {
      air: 'Mysore Airport (11 km)',
      train: 'Mysuru Junction (1.5 km)',
      local: 'Walking distance (800m) from Mysore Palace West Gate'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 16. VISAKHAPATNAM (Andhra Pradesh)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-viz-1',
    name: 'INS Kursura Submarine Museum',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Museum & Heritage',
    shortDescription: 'Asia\'s first submarine museum, housed inside a real 91-meter decommissioned Soviet-built Kalvari-class diesel-electric submarine preserved on RK Beach sands.',
    fullDescription: 'The INS Kursura (S20) Submarine Museum is a pioneering maritime museum situated directly on the sands of Ramakrishna Beach (RK Beach) in Visakhapatnam. Commissioned into the Indian Navy in 1969, the 91-meter-long Kalvari-class submarine served for 31 years, playing a key role in the 1971 Indo-Pak War before being decommissioned in 2001 and preserved as Asia\'s first submarine museum.',
    history: 'Participated in maritime patrol and blockade missions during the 1971 war. In 2002, naval engineers hauled the 1,900-tonne submarine from the sea onto the beach sand, preserving its internal control rooms.',
    culturalSignificance: 'A profound national symbol of naval valor and maritime defense, allowing visitors to walk through narrow hatches and experience real submariner life.',
    architecture: 'Foxtrot/Kalvari-class naval submarine structure preserved on heavy concrete cradles on beach sand, retaining authentic control consoles, sonar rooms, and torpedo tubes.',
    thingsToSee: [
      'Walkthrough inside authentic torpedo rooms and officer control deck',
      'Sonar, radar, and navigation instrumentation consoles',
      'The tiny sleeping bunks and compact galleys showing sailors\' daily life underwater',
      'Engine rooms and diving control stations guided by retired naval veterans',
      'TU 142 Aircraft Museum situated directly across the beach road'
    ],
    bestTimeToVisit: 'October to March; late afternoon (3:30 PM – 7:30 PM).',
    openingHours: '2:00 PM – 8:30 PM (Tuesday–Saturday); 10:00 AM – 12:30 PM and 2:00 PM – 8:30 PM (Sundays); Closed on Mondays',
    entryFee: '₹40 for Adults; ₹20 for Children; ₹50 for Camera.',
    visitDuration: '1 – 1.5 hours',
    address: 'RK Beach Rd, Kirlampudi Layout, Pandurangapuram, Visakhapatnam, Andhra Pradesh 530017',
    latitude: 17.7164,
    longitude: 83.3331,
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['TU 142 Aircraft Museum', 'RK Beach', 'Victory at Sea Memorial', 'Kailasagiri'],
    tags: ['Submarine', 'Naval Museum', 'RK Beach', '1971 War', 'Maritime'],
    famousFor: 'Asia\'s first real submarine museum preserved on the sands of RK Beach',
    howToReach: {
      air: 'Visakhapatnam International Airport (14 km)',
      train: 'Visakhapatnam Railway Station (5 km)',
      local: 'City bus or auto-rickshaw to RK Beach along Beach Road'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-viz-2',
    name: 'Kailasagiri Hilltop Park',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Nature & Scenic',
    shortDescription: 'A 360-foot hilltop scenic park offering panoramic vistas of the Bay of Bengal and Vizag coastline, crowned by 40-foot colossal white statues of Lord Shiva and Parvati.',
    fullDescription: 'Kailasagiri is a picturesque hilltop park perched 360 feet above sea level, developed across 380 acres by the Visakhapatnam Metropolitan Region Development Authority (VMRDA). Offering breathtaking views of the sweeping crescent beaches and Eastern Ghats, the park is crowned by a colossal 40-foot-tall white statue of Lord Shiva and Goddess Parvati.',
    history: 'Developed as a premier ecotourism destination, winning the Best Tourist Spot award from the Government of Andhra Pradesh.',
    culturalSignificance: 'A scenic recreational and spiritual landmark of Vizag, accessible by South India\'s first passenger ropeway cable car.',
    architecture: 'Landscape park architecture featuring scenic lookouts, floral clocks, glass skywalks, a circular toy train track, and colossal cement statues.',
    thingsToSee: [
      'Colossal 40-foot-tall white marble-like statue of Lord Shiva and Goddess Parvati',
      'The passenger ropeway cable car offering sweeping aerial views of the Bay of Bengal',
      'Circular toy train ride orbiting the entire hill perimeter',
      'Titanic Sea Viewpoint overlooking Rushikonda and RK Beach coastlines',
      'Floral clock, jungle trails, and sunset viewpoints'
    ],
    bestTimeToVisit: 'October to March; late afternoon (3:30 PM – 6:30 PM) for sunset over the ocean.',
    openingHours: '6:00 AM – 7:30 PM (Daily); Ropeway: 8:00 AM – 7:00 PM',
    entryFee: 'Park entry: ₹20; Ropeway: ₹110 (Round-trip); Toy Train: ₹50.',
    visitDuration: '2 – 3 hours',
    address: 'Kailasagiri, Hill Top Rd, Visakhapatnam, Andhra Pradesh 530043',
    latitude: 17.7492,
    longitude: 83.3422,
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Rushikonda Beach', 'Tenneti Park', 'INS Kursura Submarine Museum', 'Thotlakonda'],
    tags: ['Hilltop', 'Ropeway', 'Shiva Parvati', 'Ocean View', 'Toy Train'],
    famousFor: 'Panoramic Bay of Bengal ocean views, cable car ropeway, and colossal Shiva-Parvati statue',
    howToReach: {
      air: 'Visakhapatnam Airport (18 km)',
      train: 'Visakhapatnam Station (9 km)',
      local: 'Ropeway cable car from base station or driving up Hilltop Road'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-viz-3',
    name: 'Borra Caves',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Nature & Scenic',
    shortDescription: 'One of the largest cave systems in India, plunging 80 meters deep in the Ananthagiri Hills of Araku Valley, renowned for millions-of-years-old stalactites and stalagmites.',
    fullDescription: 'Borra Caves (Borra Guhalu) are natural speleothem limestone cave formations situated at an elevation of 1,400 meters in the Ananthagiri Hills of the Araku Valley, 90 km from Visakhapatnam. Discovered by British geologist William King in 1807, the subterranean caves plunge 80 meters deep, sculpted over millions of years by the Gosthani River into surreal stalactite and stalagmite formations.',
    history: 'According to tribal folklore, a cowherd discovered the cave when a cow fell through the roof, discovering a natural Shiva Lingam formed of stalagmites.',
    culturalSignificance: 'A sacred tribal pilgrimage site during Maha Shivratri, illuminated by Andhra Pradesh Tourism with colorful multi-hue LED lights.',
    architecture: 'Natural Karstic limestone cave architecture with towering 75-meter roof openings, subterranean water passages, and formations resembling a Shiva Lingam, mother and child, and elephant.',
    thingsToSee: [
      'Natural stalagmite Shiva Lingam worshipped deep within the cave cavern',
      'The multi-colored theatrical LED illumination system highlighting subterranean rock contours',
      'The natural opening at the top allowing sunbeams to pierce through the subterranean gloom',
      'Scenic Vistadome train ride from Vizag to Borra Caves through 30 tunnels and bridges',
      'Araku coffee plantations and Katiki Waterfalls located nearby'
    ],
    bestTimeToVisit: 'October to March (9:30 AM – 4:30 PM)',
    openingHours: '10:00 AM – 5:00 PM (Daily; closes for lunch 1:00 PM – 2:00 PM)',
    entryFee: '₹80 for Adults; ₹60 for Children; ₹100 for Camera.',
    visitDuration: '2 – 3 hours (Day trip from Vizag)',
    address: 'Borra Caves, Ananthagiri Hills, Araku Valley, Alluri Sitharama Raju Dist, Andhra Pradesh 535145',
    latitude: 18.2806,
    longitude: 83.0394,
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Araku Valley', 'Katiki Waterfalls', 'Ananthagiri Hills Coffee Plantations', 'Padmapuram Gardens'],
    tags: ['Limestone Caves', 'Stalactites', 'Araku Valley', 'Gosthani River', 'Nature'],
    famousFor: 'Deepest limestone cave system in India with million-year-old stalactites in Araku Valley',
    howToReach: {
      air: 'Visakhapatnam Airport (90 km)',
      train: 'Borra Guhalu Railway Station (1 km, Vistadome train from Vizag)',
      local: 'Scenic 2.5-hour mountain road drive from Vizag via NH516E'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-viz-4',
    name: 'Simhachalam Temple (Varaha Lakshmi Narasimha)',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'A revered 11th-century hilltop temple dedicated to Lord Varaha Narasimha, covered constantly in sandalwood paste (Chandanotsavam), featuring Kalinga-Dravidian stone carvings.',
    fullDescription: 'The Sri Varaha Lakshmi Narasimha Temple at Simhachalam is one of the most prominent Vaishnavite shrines in South India, situated on a hill 800 feet above sea level. Dedicated to Lord Vishnu\'s fierce combination avatar of Varaha (boar) and Narasimha (lion-man), the central idol is kept covered in sandalwood paste year-round, revealed in its natural form only once a year on Akshaya Tritiya during the Chandanotsavam festival.',
    history: 'Earliest stone inscriptions date back to 1087 CE under the Cholas; the central stone sanctum and outer mandapas were expanded in 1267 CE by King Narasimhadeva I of the Eastern Ganga dynasty.',
    culturalSignificance: 'One of the 32 Narasimha Kshetras in Andhra Pradesh, holding deep spiritual reverence across Odisha and Andhra Pradesh.',
    architecture: 'Synthesis of Kalinga temple architecture of Odisha and South Indian Dravidian stone carving. Features a square vimana with stepped tiers and a 96-pillared Kalyana Mandapa.',
    thingsToSee: [
      'The sacred idol covered in 480 kg of sandalwood paste appearing like a Shiva Lingam',
      'The 96-pillared Kalyana Mandapa with stone-carved friezes of the Dasavatara',
      'Kapila Theertham water tank situated on the hilltop path',
      'Stone inscriptions in medieval Telugu and Odia script documenting royal endowments',
      'Annual Chandanotsavam festival on Akshaya Tritiya when the sandalwood paste is peeled off'
    ],
    bestTimeToVisit: 'October to March; early morning (7:00 AM – 11:30 AM) or Akshaya Tritiya.',
    openingHours: '7:00 AM – 4:00 PM and 6:00 PM – 9:00 PM (Daily)',
    entryFee: 'General Darshan: Free; Special Darshan tickets: ₹100 – ₹300.',
    visitDuration: '2 – 3 hours',
    address: 'Simhachalam Rd, Near Gopalapatnam, Visakhapatnam, Andhra Pradesh 530028',
    latitude: 17.7667,
    longitude: 83.2500,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Kailasagiri', 'Rushikonda Beach', 'Indira Gandhi Zoological Park'],
    tags: ['Temple', 'Narasimha', 'Kalinga Architecture', 'Chandanotsavam', 'Hilltop'],
    famousFor: 'Lord Varaha Narasimha idol covered constantly in sandalwood paste and Kalinga stone carvings',
    howToReach: {
      air: 'Visakhapatnam Airport (12 km)',
      train: 'Simhachalam Railway Station (4 km), Vizag Main (16 km)',
      local: 'Direct RTC city buses from RTC Complex to Simhachalam Hill base'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-viz-5',
    name: 'Visakha Museum',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Museum & Heritage',
    shortDescription: 'A maritime and regional history museum housed in a 150-year-old Dutch bungalow on RK Beach, featuring 250-pounder naval shell casings and ancient Kalinga artifacts.',
    fullDescription: 'The Visakha Museum (Corporation Museum) is housed in the historic 150-year-old Dutch Bungalow situated along Ramakrishna Beach. Opened in 1991, the museum showcases the maritime, archaeological, and cultural history of the Uttarandhra region, preserving armor, royal weapons, 3rd-century BC Buddhist stone antiquities, and naval warfare artifacts from the 1971 PNS Ghazi sinking.',
    history: 'The building was originally constructed as a Dutch maritime trading residence in the 19th century and later converted into a public heritage museum by the Vizag Municipal Corporation.',
    culturalSignificance: 'Preserves the coastal identity of Vizag, chronicling the sinking of the Pakistani submarine PNS Ghazi off Vizag harbor in December 1971.',
    architecture: 'Dutch colonial seaside bungalow architecture with timber verandas, red mangalore tiled roof, and beach-facing courtyards.',
    thingsToSee: [
      'Decommissioned naval shell casings, 250-pounder bombs, and aircraft models',
      'Artifacts and debris recovered from the sunken submarine PNS Ghazi (1971)',
      'Ancient Buddhist stone reliefs and terracotta pots from Thotlakonda and Bavikonda',
      'Ceremonial silver swords and palanquins of the royal families of Vizianagaram and Bobbili',
      'Centuries-old palm-leaf manuscripts and coin collections'
    ],
    bestTimeToVisit: 'October to March (11:00 AM – 5:00 PM)',
    openingHours: '11:00 AM – 7:00 PM (Monday–Friday); 12:00 PM – 8:00 PM (Weekends); Closed on Fridays',
    entryFee: '₹20 for Adults; ₹10 for Children.',
    visitDuration: '1 – 2 hours',
    address: 'Beach Rd, Dutch Bungalow, Kirlampudi Layout, Visakhapatnam, Andhra Pradesh 530017',
    latitude: 17.7196,
    longitude: 83.3347,
    images: [
      'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['INS Kursura Submarine Museum', 'TU 142 Aircraft Museum', 'RK Beach'],
    tags: ['Museum', 'PNS Ghazi', 'Maritime', 'Dutch Bungalow', 'Buddhist Artifacts'],
    famousFor: 'Artifacts from the 1971 PNS Ghazi submarine sinking and 150-year-old Dutch bungalow',
    howToReach: {
      air: 'Visakhapatnam Airport (14 km)',
      train: 'Visakhapatnam Junction (5.5 km)',
      local: 'Short walk from INS Kursura on RK Beach Road'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // 17. VIJAYAWADA (Andhra Pradesh)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    id: 'place-vij-1',
    name: 'Kanaka Durga Temple',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Temple & Spiritual',
    shortDescription: 'The sacred hilltop temple on Indrakeeladri Hill overlooking the Krishna River, dedicated to Goddess Kanaka Durga (Swayambhu), drawing millions during Navratri Teppotsavam.',
    fullDescription: 'The Sri Durga Malleswara Swamy Varla Devasthanam (Kanaka Durga Temple) is the supreme spiritual epicenter of Vijayawada, perched on the sacred Indrakeeladri Hill on the banks of the Krishna River. Mentioned in the Kalika Purana, legend recounts that Goddess Durga slew the demon Mahishasura on this hill and made it her eternal abode as a self-manifested (Swayambhu) deity.',
    history: 'Associated with the Mahabharata legend where Arjuna performed penance (Tapas) on Indrakeeladri to receive the celestial Pasupatastra weapon from Lord Shiva.',
    culturalSignificance: 'Second most frequented pilgrimage destination in Andhra Pradesh after Tirupati. Celebrates the grand 10-day Dasara festival concluding with the Teppotsavam (swan boat festival) on the Krishna River.',
    architecture: 'Dravidian temple architecture with a soaring gold-plated Vimana shikhara, carved stone staircases, hilltop modern ghat roads, and a grand Rajagopuram facing the river.',
    thingsToSee: [
      'The eight-armed Swayambhu idol of Goddess Kanaka Durga resplendent in golden ornaments',
      'The sacred golden Vimana Shikhara crowned with pure gold plating',
      'Panoramic sunset perspectives over the Krishna River and Prakasam Barrage',
      'The Malleswara Swamy shrine consecrated by sage Agastya',
      'The Teppotsavam (Hamsa Vahanam swan-boat river procession) during Navratri'
    ],
    bestTimeToVisit: 'October to March; early morning (5:00 AM – 8:00 AM) or during Navratri celebrations.',
    openingHours: '4:00 AM – 9:00 PM (Daily; closed briefly during afternoon naivedyam)',
    entryFee: 'General Darshan: Free; Special Darshan: ₹100 – ₹300.',
    visitDuration: '2 – 3.5 hours',
    address: 'Indrakeeladri, Durga Agraharam, Mallikarjunapeta, Vijayawada, Andhra Pradesh 520001',
    latitude: 16.5161,
    longitude: 80.6053,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Prakasam Barrage', 'Undavalli Caves', 'Bhavani Island', 'Bapu Museum'],
    tags: ['Temple', 'Kanaka Durga', 'Indrakeeladri', 'Krishna River', 'Dasara'],
    famousFor: 'Swayambhu golden idol of Goddess Kanaka Durga and Navratri Teppotsavam river festival',
    howToReach: {
      air: 'Vijayawada Airport (Gannavaram) (22 km)',
      train: 'Vijayawada Junction Railway Station (2.5 km)',
      local: 'Ghat Road RTC feeder buses, ropeway lift, or auto-rickshaw'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-vij-2',
    name: 'Undavalli Caves',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Historical Monument',
    shortDescription: 'A 7th-century four-storey rock-cut monolithic sandstone cave temple, housing a colossal 5-meter-long reclining monolithic statue of Lord Vishnu (Anantasayana).',
    fullDescription: 'The Undavalli Caves are a monolithic rock-cut cave temple complex carved out of solid sandstone hills in Undavalli, 6 km southwest of Vijayawada across the Krishna River. Dating between the 4th and 7th centuries CE under the Vishnukundina dynasty, the four-storeyed cave complex is famed for its colossal 5-meter monolithic sculpture of Lord Vishnu reclining on the serpent Shesha (Anantasayana Padmanabha).',
    history: 'Originally excavated as Buddhist vihara rock monasteries in the 4th-5th century CE, later transformed into a Vaishnavite cave temple under the Vishnukundina and Chalukyan kings.',
    culturalSignificance: 'A protected monument of national importance representing the transition from Buddhist rock-hewn viharas to classical Hindu cave architecture in Andhra Pradesh.',
    architecture: 'Four-tier rock-cut cave architecture carved into a vertical sandstone cliff face. Features pillared verandahs, lion capitals, and the immense second-floor monolithic Vishnu sculpture.',
    thingsToSee: [
      'The colossal 5-meter monolithic reclining Vishnu (Anantasayana Padmanabha) on the 2nd floor',
      'Intricate rock-cut carvings of Brahma, Shiva, Narasimha, and dancing apsaras',
      'The four tiers of pillared galleries offering panoramic views of the green Krishna River delta',
      'Buddhist rock-cut cells and meditating vihara chambers on the ground tier',
      'Rock-hewn elephant and lion friezes on the exterior cliff facade'
    ],
    bestTimeToVisit: 'October to March (9:00 AM – 1:00 PM or 3:00 PM – 5:30 PM).',
    openingHours: '9:00 AM – 5:30 PM (Daily)',
    entryFee: '₹25 for Indians; ₹300 for Foreigners.',
    visitDuration: '1.5 – 2.5 hours',
    address: 'Undavalli Cave Rd, Undavalli, Guntur / Vijayawada, Andhra Pradesh 522501',
    latitude: 16.4969,
    longitude: 80.5816,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Prakasam Barrage', 'Kanaka Durga Temple', 'Bhavani Island', 'Amaravati'],
    tags: ['Rock Cut Caves', 'Vishnukundina', 'Reclining Vishnu', 'Sandstone', 'Monolithic'],
    famousFor: 'Four-storey 7th-century rock-cut caves with a colossal 5-meter reclining Vishnu statue',
    howToReach: {
      air: 'Vijayawada Airport (26 km)',
      train: 'Vijayawada Junction (6 km)',
      local: 'Auto-rickshaw or taxi across the Prakasam Barrage road'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-vij-3',
    name: 'Prakasam Barrage',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Modern Landmark',
    shortDescription: 'A 1,223-meter-long road bridge and irrigation regulator across the Krishna River, illuminating in multi-colored dynamic LED floodlights, creating a vast river lake.',
    fullDescription: 'Prakasam Barrage is an impressive 1,223-meter-long barrage and road bridge constructed across the Krishna River in Vijayawada. Completed in 1957 to replace an earlier 1855 stone weir designed by Sir Arthur Cotton, the structure irrigates over 1.3 million acres of fertile agricultural farmland in the Krishna delta and forms the recreational heart of the city.',
    history: 'Named in honor of Tanguturi Prakasam Pantulu, the first Chief Minister of Andhra State. Built between 1952 and 1957 by engineer Sir Arthur Cotton\'s vision.',
    culturalSignificance: 'The civic pride of Vijayawada, connecting Krishna and Guntur districts. Evening walks along the illuminated barrage wall are a beloved local ritual.',
    architecture: 'Modern hydraulic engineering structure with 70 steel crest gates, a two-lane road bridge, and dynamic computerized LED night illuminations.',
    thingsToSee: [
      'Multi-colored dynamic LED light reflections dancing on the river waters at night',
      'The expansive reservoir lake formed behind the barrage with boating at Bhavani Island',
      'Views of the Kanaka Durga Temple perched atop Indrakeeladri Hill in the backdrop',
      'The historic statue of Sir Arthur Cotton and Tanguturi Prakasam Pantulu',
      'Prakasam Barrage Walkway offering sunset vistas of the river delta'
    ],
    bestTimeToVisit: 'October to March; evening (5:30 PM – 9:00 PM) for the dazzling night lights.',
    openingHours: 'Open 24/7 (Illumination active from 6:30 PM – 10:30 PM)',
    entryFee: 'Free entry.',
    visitDuration: '45 mins – 1.5 hours',
    address: 'Prakasam Barrage, Krishna River, Vijayawada, Andhra Pradesh 520001',
    latitude: 16.5072,
    longitude: 80.6094,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Kanaka Durga Temple', 'Undavalli Caves', 'Bhavani Island', 'Victoria Jubilee Museum'],
    tags: ['Barrage', 'Krishna River', 'Illumination', 'Sir Arthur Cotton', 'Bridge'],
    famousFor: '1.2km bridge across the Krishna River with spectacular evening dynamic LED lighting',
    howToReach: {
      air: 'Vijayawada Airport (23 km)',
      train: 'Vijayawada Junction (2 km)',
      local: 'City bus or auto-rickshaw along National Highway 16'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-vij-4',
    name: 'Kondapalli Fort (Kondapalli Qila)',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Fort & Palace',
    shortDescription: 'A 14th-century hilltop medieval stone fortress built by Prolaya Vema Reddy, nestled in the village famous for GI-tagged wooden Kondapalli Bommalu toy craft.',
    fullDescription: 'Kondapalli Fort (Gajapati Qila) is a scenic hilltop fortress situated in Kondapalli, 24 km northwest of Vijayawada. Erected in 1360 CE by King Prolaya Vema Reddy of the Reddi dynasty and later expanded by the Vijayanagara emperors, Bahmanis, and Gajapatis, the fort features a three-storeyed rock citadel, royal court chambers (Rani Mahal), and the Darbar Hall.',
    history: 'Served as a strategic military outpost disputed by the Gajapatis of Odisha, Vijayanagara kings, and Qutb Shahi sultans, later utilized by the British East India Company as a military training base.',
    culturalSignificance: 'The foothill village of Kondapalli is world-famous for its 400-year-old GI-tagged Kondapalli Bommalu (hand-carved wooden toys made from soft Tella Poniki wood).',
    architecture: 'Medieval hill fortification with massive granite ramparts, triple entrance gateways (Gaja Dvaram), the Rani Mahal, and Persian-influenced arches.',
    thingsToSee: [
      'Gaja Dvaram: The massive elephant entrance gate built of granite blocks',
      'The three-storeyed Rani Mahal with arched palace balconies overlooking the valley',
      'The historic prison tower and weapon storehouse (Topkhana)',
      'Scenic green hilltop viewpoints overlooking the Krishna valley',
      'Kondapalli toy artisans carving traditional wooden toys at the village base'
    ],
    bestTimeToVisit: 'October to February (9:00 AM – 4:00 PM)',
    openingHours: '10:00 AM – 5:00 PM (Daily)',
    entryFee: '₹20 for Adults; ₹10 for Children.',
    visitDuration: '2.5 – 3.5 hours',
    address: 'Ghat Road, Kondapalli, NTR District / Vijayawada, Andhra Pradesh 521228',
    latitude: 16.6186,
    longitude: 80.5369,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Kondapalli Toy Village', 'Kanaka Durga Temple', 'Prakasam Barrage'],
    tags: ['Hill Fort', 'Reddi Dynasty', 'Kondapalli Toys', 'Rani Mahal', 'History'],
    famousFor: '14th-century Reddi dynasty hill fortress and world-famous wooden Kondapalli toy craft',
    howToReach: {
      air: 'Vijayawada Airport (40 km)',
      train: 'Kondapalli Railway Station (4 km), Vijayawada Junction (24 km)',
      local: 'Auto-rickshaw or taxi up the Kondapalli Ghat Road'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  },
  {
    id: 'place-vij-5',
    name: 'Bhavani Island',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Nature & Scenic',
    shortDescription: 'One of the largest river islands in India, sprawling over 133 acres in the middle of the Krishna River, featuring mangrove walks, water sports, and boating.',
    fullDescription: 'Bhavani Island is a 133-acre picturesque riverine island situated in the middle of the Krishna River, just upstream of Prakasam Barrage. Developed as a major eco-tourism island retreat by Andhra Pradesh Tourism (APTDC), the island offers lush mangrove tree walks, water sports, boating, canopy ziplines, and tranquil sunset views over the water.',
    history: 'Named after Goddess Bhavani (Kanaka Durga) whose hilltop temple overlooks the island from Indrakeeladri.',
    culturalSignificance: 'A prime recreational island sanctuary for families and nature enthusiasts, accessible only via scenic boat transfers from Punnami Ghat.',
    architecture: 'Eco-resort island architecture featuring bamboo cottages, floating restaurants, treehouses, landscaped gardens, and wooden boardwalks.',
    thingsToSee: [
      'Scenic 10-minute boat transfer across the Krishna River from Punnami Ghat',
      'Lush mangrove boardwalk trails and birdwatching viewpoints',
      'Water sports including speedboats, jet-skis, and banana boat rides',
      'Canopy ziplines, rock-climbing walls, and mirror maze',
      'Sunset reflections over the serene river waters with Kanaka Durga hill in view'
    ],
    bestTimeToVisit: 'October to March; late afternoon (2:30 PM – 6:30 PM).',
    openingHours: '9:30 AM – 6:30 PM (Daily)',
    entryFee: 'Boat ride & Island entry: ₹120 per person; Water sports priced separately.',
    visitDuration: '2.5 – 4 hours',
    address: 'Bhavani Island, Krishna River, Bhavanipuram, Vijayawada, Andhra Pradesh 520012',
    latitude: 16.5200,
    longitude: 80.5878,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1000&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80',
    nearbyPlaces: ['Prakasam Barrage', 'Kanaka Durga Temple', 'Undavalli Caves', 'Bapu Museum'],
    tags: ['River Island', 'Krishna River', 'Boating', 'Water Sports', 'Eco Tourism'],
    famousFor: '133-acre river island on the Krishna River with boating, water sports, and mangrove walks',
    howToReach: {
      air: 'Vijayawada Airport (26 km)',
      train: 'Vijayawada Junction (5 km)',
      local: 'Auto-rickshaw to Punnami Ghat / Berm Park + 10-min ferry ride'
    },
    verifiedInfoNotice: 'Information may change. Please verify before visiting.'
  }
];

export const CATEGORIES_LIST = [
  'All',
  'Historical Monument',
  'Fort & Palace',
  'Temple & Spiritual',
  'Museum & Heritage',
  'Nature & Scenic',
  'Cultural Center',
  'Modern Landmark'
];
