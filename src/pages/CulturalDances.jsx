import { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const dancesData = [
  {
    id: 1,
    name: "Kuchipudi",
    state: "Andhra Pradesh",
    category: "Classical Dance",
    description: "Kuchipudi is a classical dance-drama form known for its graceful movements, brisk footwork, dramatic characterizations, and the famous 'Tarangam' performed on the edges of a brass plate.",
    history: "Originating in the village of Kuchelapuram (now Kuchipudi) in the Krishna district of Andhra Pradesh around the 14th–15th century, Kuchipudi was nurtured by Brahmin scholars and bards known as Bhagavathulu. It evolved from ancient Yakshagana dance-dramas and was formalized by Siddhendra Yogi.",
    significance: "Kuchipudi blends pure dance (Nritta), expressive mime (Nritya), and spoken theatrical dialogue (Natya). It traditionally portrays themes from the Bhagavata Purana, embodying deep spiritual devotion (Bhakti) and dramatic storytelling.",
    costume: "Dancers wear brilliantly colored silk sarees (often Kanchipuram silk) with a pleated fan in front, a kacham (pleated trouser drape), rich temple jewelry (including oddiyanam waist belt, jhumkas, and vanki armlets), and ankle bells (ghungroos). Male performers traditionally wear dhotis.",
    instruments: "Mridangam, Carnatic Flute, Veena, Violin, Manjira (cymbals), and Nattuvangam (rhythm recitation by the Guru).",
    facts: [
      "The 'Tarangam' item features the dancer performing intricate rhythmic footwork while balancing on the rim of a brass plate with a pot of water on their head.",
      "Unlike many other classical dances, Kuchipudi incorporates both dancing and live character singing/speech.",
      "Historically performed exclusively by male troupes traveling between villages, it was revitalized in the 20th century for solo female exponents."
    ],
    imageUrl: "/images/dances/kuchipudi.jpg",
    videoPath: "/videos/dances/kuchipudi.mp4"
  },
  {
    id: 2,
    name: "Bharatanatyam",
    state: "Tamil Nadu",
    category: "Classical Dance",
    description: "Bharatanatyam is one of the oldest classical dance traditions in India, renowned for its sculptured postures, sharp geometric lines (Aramandi), sophisticated mudras, and profound abhinaya.",
    history: "With roots traced back to the Natya Shastra by sage Bharata Muni and the Devadasi temple traditions of Tamil Nadu over 2,000 years ago, Bharatanatyam was preserved in the temples of Thanjavur and codified by the famous Thanjavur Quartet in the 19th century.",
    significance: "Considered a visual manifestation of the cosmic dance of Lord Shiva (Nataraja), Bharatanatyam is an ode to the divine that unites spiritual transcendence with geometric aesthetic precision.",
    costume: "Tailored silk sarees featuring a multi-tiered fan pleated drape, temple gold jewelry with traditional sun and moon hair ornaments, a flower-adorned plait (Jada), red Alta dyed fingertips and feet, and resonant ghungroos.",
    instruments: "Mridangam, Carnatic Violin, Veena, Flute, Cymbals (Thalam), and vocal accompaniment in Carnatic ragas.",
    facts: [
      "The name 'Bharata' represents BHA (Bhava/Emotion), RA (Raga/Melody), and TA (Tala/Rhythm).",
      "It emphasizes the 'Aramandi' (half-seated stance), which creates geometric symmetry throughout the performance.",
      "Revitalized in the 1930s by pioneers like Rukmini Devi Arundale and E. Krishna Iyer, bringing it to global prestige."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569851935333-6ca1448cc299?auto=format&fit=crop&q=80&w=1000",
    videoPath: "/videos/dances/bharatanatyam.mp4"
  },
  {
    id: 3,
    name: "Kathakali",
    state: "Kerala",
    category: "Classical Dance-Drama",
    description: "Kathakali is an iconic classical dance-drama from Kerala distinguished by elaborate colorful face makeup (Vesham), towering headdresses (Kireetam), and dramatic eye and facial expressions.",
    history: "Evolving during the 17th century in the courts and temples of southwestern India, Kathakali synthesized older martial arts (Kalaripayattu), folk rituals (Theyyam), and Sanskrit theater traditions (Koodiyattam).",
    significance: "Kathakali enacts the eternal duel between good and evil, bringing grand episodes from the Ramayana, Mahabharata, and Puranas to life through a rich sign language of 24 root mudras.",
    costume: "Heavily layered billowing skirts, intricate wooden headdresses, and detailed facial makeup categories: Paccha (noble heroes in green), Kathi (villains with red chokes), Kari (demons in black), and Minukku (sages and women in radiant yellow).",
    instruments: "Chenda (cylindrical drum), Maddalam (barrel drum), Chengila (gong), Ilathalam (cymbals), and dual vocalists.",
    facts: [
      "Applying the complex makeup (Chutti) takes between 3 to 4 hours per artist before each performance.",
      "Kathakali performers undergo intense eye exercise routines using clarified butter (ghee) to achieve superhuman ocular control.",
      "Traditionally staged all night long in temple courtyards illuminated solely by a large brass oil lamp (Kalivilakku)."
    ],
    imageUrl: "/images/dances/kathakali.jpg",
    videoPath: "/videos/dances/kathakali.mp4"
  },
  {
    id: 4,
    name: "Kathak",
    state: "Uttar Pradesh",
    category: "Classical Dance",
    description: "Kathak is the premier classical dance form of northern India, celebrated for its lightning-fast spins (Chakkars), rhythmic foot percussion (Tatkar), and subtle romantic and devotional mime.",
    history: "Derived from the ancient Sanskrit word 'Katha' (story), Kathak was originally performed by wandering village bards (Kathakars). During the Mughal era, it flourished in the royal courts of Lucknow, Jaipur, and Banaras.",
    significance: "Kathak represents an exquisite synthesis of Hindu temple storytelling and Persian-influenced courtly grace, showcasing the rhythmic conversation between the dancer's feet and the tabla.",
    costume: "Women wear flowing Anarkali gowns or flared lehenga-cholis with gossamer dupattas, while men wear angrakhas and churidar trousers. Hundreds of heavy bronze ghungroos wrap each ankle.",
    instruments: "Tabla, Pakhawaj, Sarangi, Harmonium, Sitar, and vocal Bol recitation.",
    facts: [
      "Kathak dancers can execute over 50 continuous spins (Chakkars) with pinpoint balance and rhythmic accuracy.",
      "It features three major gharanas (schools): Lucknow (grace and abhinaya), Jaipur (speed and footwork), and Banaras (devotional depth).",
      "The bells (ghungroos) worn by Kathak exponents can number from 100 to 200 bells on each ankle."
    ],
    imageUrl: "https://images.unsplash.com/photo-1756382616831-998e8baf9675?auto=format&fit=crop&q=80&w=1000",
    videoPath: "/videos/dances/kathak.mp4"
  },
  {
    id: 5,
    name: "Odissi",
    state: "Odisha",
    category: "Classical Dance",
    description: "Odissi is a lyrical and sculpturesque classical dance form characterized by the Tribhangi posture (three-body bend), flowing torso movements, and sacred devotion to Lord Jagannath.",
    history: "Originating in the temples of Odisha more than 2,000 years ago as practiced by the Maharis (temple dancers) and Gotipuas (young acrobatic boys), Odissi's poses are immortalized in the stone sculptures of Konark Sun Temple.",
    significance: "Deeply rooted in Jayadeva's Gita Govinda, Odissi evokes the divine romance of Radha and Krishna through fluid water-like grace, spiritual ecstasy, and sacred temple geometry.",
    costume: "Traditional Sambalpuri or Bomkai silk sarees draped with pleats, silver filigree jewelry (Tarakasi) crafted in Cuttack, an ornate floral headpiece (Tahiya), and decorative sandalwood paste dots on the forehead.",
    instruments: "Mardala (percussion drum), Bansuri (flute), Manjira, Sitar, and Odissi classical vocals.",
    facts: [
      "The 'Tribhangi' posture splits the body across three bends—head, torso, and knees—mirroring classical Indian stone sculptures.",
      "Odissi incorporates two primary stances: Chowk (a solid square stance representing Jagannath) and Tribhangi (a feminine, serpentine S-curve).",
      "Recognized by archaeological evidence as one of the oldest surviving dance traditions in the world."
    ],
    imageUrl: "/images/dances/odissi_generated.png",
    videoPath: "/videos/dances/odissi.mp4"
  },
  {
    id: 6,
    name: "Manipuri",
    state: "Manipur",
    category: "Classical Dance",
    description: "Manipuri (Jagoi) is a gentle, spiritual classical dance from northeastern India, celebrated for its fluid serpentine movements, devotional Raslila themes, and shimmering barrel skirts.",
    history: "Rooted in ancient Meitei rituals (Lai Haraoba) and later imbued with Gaudiya Vaishnavism in the 18th century under King Bhagyachandra, who envisioned the iconic Raslila in a divine dream.",
    significance: "Manipuri dance is a meditation in motion where the dancer's feet never strike the floor sharply, symbolizing quiet reverence, divine grace, and eternal love between Radha and Krishna.",
    costume: "The iconic 'Kumil' costume features a stiff tubular barrel skirt adorned with sequins and mirrorwork, a translucent white veil (Inaphi), velvet blouse, and ornate gold crowns.",
    instruments: "Pung (drum), Pena (ancient stringed instrument), Kartal (cymbals), Bansuri, and Esraj.",
    facts: [
      "Performers move in seamless curves of the figure '8', representing endless time and divine continuity.",
      "The 'Pung Cholom' is an exhilarating acrobatic variation where dancers leap and spin while playing the Pung drum simultaneously.",
      "Nobel laureate Rabindranath Tagore was so captivated by Manipuri that he introduced it to his university at Shantiniketan."
    ],
    imageUrl: "https://images.unsplash.com/photo-1632292611299-980426b386a1?auto=format&fit=crop&q=80&w=1000",
    videoPath: "/videos/dances/manipuri.mp4"
  },
  {
    id: 7,
    name: "Mohiniyattam",
    state: "Kerala",
    category: "Classical Dance",
    description: "Mohiniyattam is the 'dance of the enchantress' from Kerala, characterized by soft swaying torso movements, gentle footwork, and pure white-and-gold aesthetic elegance.",
    history: "Codified in the royal court of Maharaja Swathi Thirunal in Travancore during the 19th century and revived by poet Vallathol Narayana Menon at Kerala Kalamandalam.",
    significance: "Portraying the divine feminine power of Mohini—the celestial avatar of Lord Vishnu—this dance embodies Lasya (delicate grace) and deep spiritual longing.",
    costume: "An exquisite white or off-white Kasavu saree with shimmering gold zari borders, a distinctive side hair bun (Kuduma) encircled by fresh white jasmine blossoms (Mulla Poovu), and traditional Kerala gold ornaments.",
    instruments: "Maddalam, Kuzhithalam (cymbals), Edakka (hourglass pressure drum), Veena, Flute, and Sopanam-style vocals.",
    facts: [
      "The rhythmic sway of the dancer resembles the gentle whispering motion of coconut palm fronds in the Kerala breeze.",
      "Unlike Kathakali's theatrical drama, Mohiniyattam focuses on subtle eye movements and delicate micro-expressions.",
      "The music follows the evocative Sopana Sangeetham style, sung traditionally along temple sanctum steps."
    ],
    imageUrl: "/images/dances/mohiniyattam.png",
    videoPath: "/videos/dances/mohiniyattam.mp4"
  },
  {
    id: 8,
    name: "Sattriya",
    state: "Assam",
    category: "Classical Dance",
    description: "Sattriya is a 500-year-old classical dance tradition created by the great saint Mahapurusha Sankaradeva in the Vaishnavite monasteries (Sattras) of the Brahmaputra valley.",
    history: "Introduced in the 15th century as part of the Bhakti movement in Assam, it remained preserved within monastic walls for centuries until recognized as a classical dance in 2000.",
    significance: "Sattriya weaves sacred narratives from the Bhagavata Purana, expressing devotion to Lord Krishna through rhythmic elegance and monastic purity.",
    costume: "Traditional Assamese Pat silk (mulberry silk) with indigenous tribal motifs, Kopali headbands, and authentic handmade silver jewelry.",
    instruments: "Khol (two-faced clay drum), Taas (cymbals), Bor Taal, Bansuri, and Sankirtan vocals.",
    facts: [
      "Practiced and taught for over 500 years in the river island Sattras of Majuli, the world's largest inhabited river island.",
      "Includes both energetic tandava items for male monks and graceful lasya items.",
      "Dancers maintain precise hand gestures called 'Hastas' unique to northeastern Indian classical treatises."
    ],
    imageUrl: "/images/dances/sattriya.jpg",
    videoPath: "/videos/dances/sattriya.mp4"
  },
  {
    id: 9,
    name: "Garba",
    state: "Gujarat",
    category: "Folk Dance",
    description: "Garba is an exuberant circular folk dance of Gujarat, performed during the nine nights of Navratri around a sacred lamp or statue of Goddess Durga.",
    history: "Derived from the Sanskrit term 'Garbha' (womb), ancient Garba dates back centuries to agricultural and fertility celebrations honoring the supreme feminine energy (Shakti).",
    significance: "The concentric revolving circles of dancers symbolize the eternal cycle of life, death, and time (Samsara), with the divine Mother Goddess as the unchanging center of the universe.",
    costume: "Vibrant Chaniya Cholis adorned with Kutchi mirrorwork, shells, and embroidery for women; traditional Kediya jackets, dhotis, and turbans for men.",
    instruments: "Dhol, Dholak, Damru, Shehnai, Harmonium, and rhythmic hand claps (Chutki & Taali).",
    facts: [
      "In December 2023, UNESCO inscribed Garba of Gujarat on the Representative List of the Intangible Cultural Heritage of Humanity.",
      "Millions of people dance simultaneously in open grounds across Gujarat and the diaspora for 9 consecutive nights.",
      "Features dynamic tempo shifts, accelerating from gentle rhythmic steps into lightning-fast spins."
    ],
    imageUrl: "/images/dances/garba.jpg",
    videoPath: "/videos/dances/garba.mp4"
  },
  {
    id: 10,
    name: "Ghoomar",
    state: "Rajasthan",
    category: "Folk Dance",
    description: "Ghoomar is a regal folk dance of Rajasthan, performed by women twirling gracefully in voluminous, swirling skirts (Ghagharas) to honor Goddess Saraswati and celebrate joyous occasions.",
    history: "Originally developed by the Bhil tribe to worship Goddess Saraswati, Ghoomar was later embraced by royal Rajput courts and became a ceremonial dance for bridal welcomes and festivals like Teej and Gangaur.",
    significance: "The word 'Ghoomna' means pirouetting. The dance symbolizes womanhood, royal poise, marital bliss, and hospitable welcome in desert culture.",
    costume: "Heavily flared 80-kali Ghagharas adorned with Gota Patti and mirrorwork, translucent Odhnis covering the face, and traditional Kundan and Meenakari jewelry.",
    instruments: "Dholak, Nagada, Manjira, Sarangi, and Rajasthani folk vocalists.",
    facts: [
      "A bride is traditionally expected to dance Ghoomar upon entering her husband's home for the first time.",
      "The massive circumference of the Ghaghara creates a mesmerizing kaleidoscope of colors as dancers spin.",
      "Ranked among the top world heritage folk dances for its hypnotic circular choreography."
    ],
    imageUrl: "/images/dances/ghoomar_generated.png",
    videoPath: "/videos/dances/ghoomar.mp4"
  },
  {
    id: 11,
    name: "Bhangra",
    state: "Punjab",
    category: "Folk Dance",
    description: "Bhangra is a high-energy harvest folk dance from the fertile plains of Punjab, characterized by athletic jumps, synchronized shoulder shrugs, and thunderous Dhol beats.",
    history: "Originating among Punjabi farmers celebrating the harvest of the wheat crop (Baisakhi) in the 14th–15th century, Bhangra has transformed into a globally beloved dance phenomenon.",
    significance: "Bhangra captures the resilient spirit, hospitality, and unbridled joy of Punjab, celebrating nature's bounty and agricultural abundance.",
    costume: "Lacha (colorful lungi-style wrap), Kurta, embroidered waistcoat (Wasket), and a majestic turban with an ornate fan crest (Turla).",
    instruments: "Dhol, Chimta (tongs with brass jingles), Algoza (double flute), Tumbi, and Bugchu.",
    facts: [
      "The signature step involves rhythmic shoulder bouncing and arms raised in an energetic 'V' shape.",
      "Bhangra teams now compete in international collegiate tournaments across North America, Europe, and Asia.",
      "Accompanied by traditional 'Boliyan' (short rhyming couplets that capture everyday humor and bravery)."
    ],
    imageUrl: "/images/dances/bhangra.jpg",
    videoPath: "/videos/dances/bhangra.mp4"
  },
  {
    id: 12,
    name: "Bihu",
    state: "Assam",
    category: "Folk Dance",
    description: "Bihu is an exuberant folk dance of Assam celebrating the arrival of spring and the Assamese New Year (Rongali Bihu) with rapid hand gestures and rhythmic swaying.",
    history: "Practiced for centuries across the Brahmaputra valley by both young men and women, Bihu is an ancient fertility and seasonal festival dance deeply connected to the agricultural cycle.",
    significance: "Symbolizing youth, romance, and the blossoming of nature, Bihu brings communities together in joyous open-air village festivities.",
    costume: "Muga and Eri silk Mekhela Chador with red geometric embroidery (Gero), flower headpieces made of Kopou Phool (foxtail orchids), and traditional Assamese ornaments.",
    instruments: "Dhol (drum), Pepa (hornpipe made from buffalo horn), Baahi (bamboo flute), Toka (bamboo clapper), and Gogona (jaw harp).",
    facts: [
      "The 'Pepa' instrument made from water buffalo horn creates a distinct piercing, festive call heard only during Bihu.",
      "In April 2023, Assam set a Guinness World Record when 11,304 Bihu dancers and drummers performed together in Guwahati.",
      "The rapid flutter of dancers' fingers mimics the gentle flutter of spring butterflies and leaves."
    ],
    imageUrl: "/images/dances/bihu.jpg",
    videoPath: "/videos/dances/bihu.mp4"
  },
  {
    id: 13,
    name: "Lavani",
    state: "Maharashtra",
    category: "Folk Dance",
    description: "Lavani is a spirited folk dance from Maharashtra known for its rapid tempo, powerful Dholki beats, sensory expressions, and theatrical nine-yard Nauvari sarees.",
    history: "Flourishing during the Peshwa era of the Maratha Empire in the 18th century, Lavani was originally staged to entertain and boost the morale of Maratha soldiers at battle camps.",
    significance: "Derived from 'Lavanya' (beauty), Lavani combines poetry, music, and dramatic storytelling ranging from sharp social satire to passionate romantic devotion.",
    costume: "Nine-yard Nauvari sarees draped in the traditional kashta style, heavy gold Kolhapuri Saaj necklaces, Maharashtrian Nath (nose ring), and ankle bells.",
    instruments: "Dholki (two-headed barrel drum), Manjira, Tuntune (one-string plucked instrument), and Harmonium.",
    facts: [
      "The fast-paced Dholki rhythm requires the dancer to execute complex footwork with lightning precision.",
      "Lavani has two main styles: Nirguni Lavani (philosophical/spiritual) and Shringari Lavani (sensual/dramatic).",
      "Traditional Lavani performers are masters of quick-witted impromptu repartee with audience members."
    ],
    imageUrl: "/images/dances/lavani.jpg",
    videoPath: "/videos/dances/lavani.mp4"
  },
  {
    id: 14,
    name: "Yakshagana",
    state: "Karnataka",
    category: "Traditional Dance-Theatre",
    description: "Yakshagana is a magnificent traditional theater form of coastal Karnataka combining dialogue, energetic dance, powerful drumming, and grand mythological headgear.",
    history: "Emerging during the Vijayanagara Empire (11th–16th century), Yakshagana was cultivated along coastal and Malenadu districts as an open-air night-long temple art.",
    significance: "Literally meaning 'song of the celestial beings' (Yaksha), it dramatizes stories from the Ramayana, Mahabharata, and Bhagavata Purana with raw energy and moral conviction.",
    costume: "Towering Pagade (headgear), gilded chest plates, bright yellow-and-red pleated skirts, face paint with bold eye designs, and heavy wooden ornaments.",
    instruments: "Chande (loud cylindrical drum), Maddale (hand drum), and Tala (bell-metal cymbals) played by the Bhagavatha (lead singer).",
    facts: [
      "The Bhagavatha directs the entire performance and improvises dialogue with the actors in real-time.",
      "Traditional performances run all night in paddy fields after the winter harvest until sunrise.",
      "Features two distinct regional schools: Tenkutittu (southern style) and Badagutittu (northern style)."
    ],
    imageUrl: "/images/dances/yakshagana.jpg",
    videoPath: "/videos/dances/yakshagana.mp4"
  },
  {
    id: 15,
    name: "Chhau",
    state: "West Bengal / Jharkhand / Odisha",
    category: "Semi-Classical Martial Dance",
    description: "Chhau is a dynamic semi-classical martial dance from eastern India, renowned for its acrobatic leaps, shield-and-sword combat sequences, and spectacular papier-mâché masks.",
    history: "Originating in the indigenous warrior camps (Chhauni) of eastern India, it synthesized tribal martial arts with classical Sanskrit epics and local folklore.",
    significance: "Enacting heroic episodes of cosmic battle where gods defeat demons, Chhau represents the triumph of Dharma and communal courage.",
    costume: "Heavy papier-mâché masks with peacock feather crowns, colorful warrior dhotis, decorated waistbands, and armor-inspired tunics.",
    instruments: "Dhol (large war drum), Dhamsa (giant kettle drum), and Shehnai.",
    facts: [
      "Recognized by UNESCO on the Representative List of the Intangible Cultural Heritage of Humanity.",
      "Has three famous styles: Purulia Chhau (West Bengal, masked), Seraikela Chhau (Jharkhand, stylized masks), and Mayurbhanj Chhau (Odisha, unmasked).",
      "Dancers execute breath-taking 360-degree aerial spins and forward somersaults while wearing heavy masks."
    ],
    imageUrl: "/images/dances/chhau.jpg",
    videoPath: "/videos/dances/chhau.mp4"
  },
  {
    id: 16,
    name: "Cheraw Dance",
    state: "Mizoram",
    category: "Folk Dance",
    description: "Also known as the Bamboo Dance, Cheraw is a rhythmic and agile folk dance of Mizoram where dancers step in and out of clapping bamboo staves with perfect timing.",
    history: "One of the oldest documented dances in Mizoram, Cheraw was historically performed to provide solace to the soul of a deceased mother journeying to the afterlife.",
    significance: "Today performed during 'Chapchar Kut' and major celebrations, Cheraw showcases communal harmony, agility, and the musical synchronization of bamboo rhythms.",
    costume: "Vakiria (traditional feather and brass headgear), Kawrchei (woven blouse), and Puanchei (colorful handwoven wraparound skirt).",
    instruments: "Horizontal bamboo staves, Khuang (indigenous Mizo drum), and gongs.",
    facts: [
      "Requires extreme precision; mistiming a single step can trap the dancer's feet inside the clapping bamboo grids.",
      "Held a Guinness World Record when over 10,000 dancers participated in a continuous bamboo dance performance in Aizawl.",
      "The rhythmic tapping of bamboo on the ground resonates with the sounds of nature and forest birds."
    ],
    imageUrl: "/images/dances/cheraw.jpg",
    videoPath: "/videos/dances/cheraw.mp4"
  },
  {
    id: 17,
    name: "Rouf",
    state: "Jammu & Kashmir",
    category: "Folk Dance",
    description: "Rouf is a lyrical and graceful dance performed by Kashmiri women in opposing rows during spring, Eid, and the autumn harvest season.",
    history: "Cherished for centuries in the Kashmir Valley, Rouf is accompanied by folk singing that welcomes the arrival of the blossoming tulip and almond season.",
    significance: "Capturing the serene beauty and hospitable warmth of the valley, Rouf expresses collective joy and communal affection.",
    costume: "Traditional Phiran tunics with delicate Tilla embroidery, silver headgear (Kasaba), and heavy Kashmiri silver earrings.",
    instruments: "Tumbaknari (earthen drum), Noat (clay water pot drum), and vocal choral singing.",
    facts: [
      "Dancers link arms across shoulders and take gentle rhythmic steps forward and backward in complete unison.",
      "The songs often take the form of playful questions and answers between the two facing lines of dancers.",
      "Performed traditionally during the holy festival of Eid and the saffron harvest."
    ],
    imageUrl: "/images/dances/rouf.jpg",
    videoPath: "/videos/dances/rouf.mp4"
  },
  {
    id: 18,
    name: "Perini Shivatandavam",
    state: "Telangana",
    category: "Classical Warrior Dance",
    description: "Perini Shivatandavam is an ancient classical warrior dance of Telangana dedicated to Lord Shiva, characterized by vigorous footwork, roaring drums, and raw spiritual power.",
    history: "Flourishing during the Kakatiya Dynasty (12th–13th century) under king Ganapatideva, it was immortalized in the intricate sculptures of the Ramappa Temple (a UNESCO World Heritage Site).",
    significance: "Historically performed by soldiers before marching into battle to summon divine bravery (Prerana) and invoke the cosmic energy of Lord Shiva.",
    costume: "Traditional warrior dhotis, rudraksha garlands, brass anklets, and ash (vibhuti) markings on forehead and arms.",
    instruments: "Mridangam, Ghanta (bells), Conch shell (Shankh), and Pakhawaj.",
    facts: [
      "Sculptures of Perini postures adorn the pillars of the 800-year-old Ramappa Temple in Palampet, Telangana.",
      "Revived in modern times through painstaking research by legendary dance scholar Dr. Nataraja Ramakrishna.",
      "The rhythm builds from deep meditative chants into an unstoppable, thunderous crescendo of footwork."
    ],
    imageUrl: "/images/dances/perini.jpg",
    videoPath: "/videos/dances/perini.mp4"
  }
];

const CulturalDances = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [selectedDance, setSelectedDance] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // Sync state and dance selection from URL query params or router location state
  useEffect(() => {
    const paramState = searchParams.get('state') || location.state?.selectedState;
    const paramDance = searchParams.get('dance') || location.state?.targetDance;
    const paramSearch = searchParams.get('search') || location.state?.searchQuery;

    if (paramState) setSelectedState(paramState);
    if (paramSearch) setSearchQuery(paramSearch);

    if (paramDance) {
      const danceObj = dancesData.find(d =>
        d.name.toLowerCase() === paramDance.toLowerCase() ||
        (paramState && d.state.toLowerCase() === paramState.toLowerCase() && d.name.toLowerCase().includes(paramDance.toLowerCase()))
      );
      if (danceObj) setSelectedDance(danceObj);
    } else if (paramState && paramState !== 'All') {
      const danceObj = dancesData.find(d => d.state.toLowerCase() === paramState.toLowerCase());
      if (danceObj) setSelectedDance(danceObj);
    }
  }, [location.state, searchParams]);

  // Extract unique states for dropdown
  const states = useMemo(() => {
    const uniqueStates = ["All", ...new Set(dancesData.map(d => d.state))];
    return uniqueStates.sort();
  }, []);

  // Dual filtering: Search (dance name, state, keywords) & State dropdown
  const filteredDances = useMemo(() => {
    return dancesData.filter(dance => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q ||
        dance.name.toLowerCase().includes(q) ||
        dance.state.toLowerCase().includes(q) ||
        dance.category?.toLowerCase().includes(q) ||
        dance.description?.toLowerCase().includes(q);

      const matchesState = selectedState === "All" || dance.state === selectedState;
      return matchesSearch && matchesState;
    });
  }, [searchQuery, selectedState]);

  const handleSelectDance = (dance) => {
    setSelectedDance(dance);
    setIsMuted(false);
    setIsPlaying(true);
  };

  // Video playback effect
  useEffect(() => {
    if (selectedDance && videoRef.current) {
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [selectedDance, isMuted]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--theme-bg-primary)', paddingTop: 88, paddingBottom: 64, transition: 'background-color 0.4s ease' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, letterSpacing: 2, fontWeight: 800,
            color: 'var(--theme-accent-primary)', textTransform: 'uppercase', marginBottom: 8
          }}>
            <span>💃</span> CLASSICAL & FOLK TRADITIONS OF BHARAT
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontFamily: 'Fraunces, serif',
            fontWeight: 900,
            color: 'var(--theme-text-primary)',
            marginBottom: 12,
            lineHeight: 1.15
          }}>
            Cultural Dances of India
          </h1>

          {/* Requested Subtitle */}
          <p style={{
            fontSize: 16,
            color: 'var(--theme-text-secondary)',
            maxWidth: 680,
            margin: '0 auto 28px',
            lineHeight: 1.6
          }}>
            Explore India's rich cultural heritage through classical and folk dances from across the country.
          </p>

          {/* Search & State Filter Container */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            maxWidth: 720,
            margin: '0 auto',
            backgroundColor: 'var(--theme-bg-secondary)',
            padding: '16px',
            borderRadius: 20,
            border: '1px solid var(--theme-border)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {/* Search Field */}
              <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, opacity: 0.6 }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search by dance or state (e.g. Kuchipudi, Kathak, Andhra, Kerala)…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: 42,
                    paddingRight: 36,
                    paddingTop: 12,
                    paddingBottom: 12,
                    backgroundColor: 'var(--theme-bg-primary)',
                    border: '1px solid var(--theme-border)',
                    borderRadius: 14,
                    color: 'var(--theme-text-primary)',
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--theme-text-muted)', cursor: 'pointer', fontSize: 14 }}
                  >✕</button>
                )}
              </div>

              {/* State Filter Dropdown */}
              <div style={{ minWidth: 200, position: 'relative' }}>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 36px 12px 16px',
                    backgroundColor: 'var(--theme-bg-primary)',
                    border: '1px solid var(--theme-border)',
                    borderRadius: 14,
                    color: 'var(--theme-text-primary)',
                    fontSize: 14,
                    fontWeight: 600,
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="All">All States & Regions</option>
                  {states.filter(s => s !== 'All').map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: 11, opacity: 0.6 }}>▼</span>
              </div>
            </div>

            {/* Quick Helper Filter Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px', fontSize: 12, color: 'var(--theme-text-muted)' }}>
              <span>Showing <strong>{filteredDances.length}</strong> dance form{filteredDances.length !== 1 ? 's' : ''}</span>
              {(searchQuery || selectedState !== 'All') && (
                <button
                  onClick={() => { setSearchQuery(''); setSelectedState('All'); }}
                  style={{ background: 'none', border: 'none', color: 'var(--theme-accent-primary)', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Dance Cards Grid ────────────────────────────────────────────── */}
        {filteredDances.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24
          }}>
            {filteredDances.map((dance) => (
              <div
                key={dance.id}
                onClick={() => handleSelectDance(dance)}
                className="flat-card"
                style={{
                  borderRadius: 18,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: 'var(--theme-card-bg)',
                  border: '1px solid var(--theme-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: 340,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                  position: 'relative'
                }}
              >
                {/* Image Container */}
                <div style={{ height: '70%', position: 'relative', overflow: 'hidden', backgroundColor: '#1a1614' }}>
                  <img
                    src={dance.imageUrl}
                    alt={dance.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1569851935333-6ca1448cc299?auto=format&fit=crop&q=80&w=1000";
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)'
                  }} />

                  {/* Category Pill */}
                  <div style={{
                    position: 'absolute', top: 12, left: 12,
                    background: 'rgba(36, 31, 28, 0.8)',
                    backdropFilter: 'blur(6px)',
                    color: '#fff',
                    borderRadius: 20,
                    padding: '4px 10px',
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    {dance.category}
                  </div>

                  {/* Play Icon Hint on Hover */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.25)',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'var(--theme-accent-primary)',
                      color: '#fff', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: 18,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                    }}>
                      ▶
                    </div>
                  </div>
                </div>

                {/* Info Footer */}
                <div style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                  backgroundColor: 'var(--theme-card-bg)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{
                      fontSize: 19,
                      fontWeight: 800,
                      color: 'var(--theme-text-primary)',
                      fontFamily: 'Fraunces, serif',
                      margin: 0
                    }}>
                      {dance.name}
                    </h3>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--theme-accent-primary)',
                      backgroundColor: 'var(--theme-bg-accent)',
                      padding: '3px 8px',
                      borderRadius: 12
                    }}>
                      {dance.state}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: 12,
                    color: 'var(--theme-text-muted)',
                    marginTop: 8
                  }}>
                    <span>Explore details</span>
                    <span style={{ color: 'var(--theme-accent-primary)', fontWeight: 800 }}>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div style={{
            textAlign: 'center',
            padding: '72px 24px',
            backgroundColor: 'var(--theme-bg-secondary)',
            borderRadius: 20,
            border: '1px dashed var(--theme-border)',
            maxWidth: 600,
            margin: '0 auto'
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--theme-text-primary)', fontFamily: 'Fraunces, serif', margin: '0 0 8px' }}>
              No dances found
            </h3>
            <p style={{ fontSize: 14, color: 'var(--theme-text-muted)', margin: '0 0 18px' }}>
              We couldn't find any Indian dance form matching "{searchQuery}" in {selectedState}.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedState('All'); }}
              style={{
                background: 'var(--theme-btn-bg)',
                color: 'var(--theme-btn-text)',
                border: 'none',
                borderRadius: 20,
                padding: '10px 22px',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* ── Comprehensive Dance Detail Modal ────────────────────────────── */}
        {selectedDance && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              backgroundColor: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              overflowY: 'auto'
            }}
            onClick={() => setSelectedDance(null)}
          >
            <div
              style={{
                backgroundColor: 'var(--theme-bg-primary)',
                borderRadius: 24,
                width: '100%',
                maxWidth: 820,
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
                border: '1px solid var(--theme-border)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header Bar with Back Button & Close Icon */}
              <div style={{
                position: 'sticky', top: 0, zIndex: 30,
                backgroundColor: 'var(--theme-bg-primary)',
                borderBottom: '1px solid var(--theme-border)',
                padding: '12px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <button
                  onClick={() => setSelectedDance(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--theme-accent-primary)',
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <span>←</span> Back to Dances
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--theme-text-muted)' }}>
                    {selectedDance.state}
                  </span>
                  <button
                    onClick={() => setSelectedDance(null)}
                    style={{
                      background: 'var(--theme-bg-accent)',
                      border: '1px solid var(--theme-border)',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      cursor: 'pointer',
                      color: 'var(--theme-text-primary)'
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Media Player / Hero Video Section */}
              <div style={{ position: 'relative', width: '100%', backgroundColor: '#000', aspectRatio: '16/9' }}>
                <video
                  ref={videoRef}
                  src={selectedDance.videoPath}
                  poster={selectedDance.imageUrl}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onClick={() => {
                    if (videoRef.current) {
                      if (videoRef.current.paused) videoRef.current.play();
                      else videoRef.current.pause();
                    }
                  }}
                />

                {/* Media Controls Bar Overlay */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '14px 20px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#fff'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          if (videoRef.current.paused) videoRef.current.play();
                          else videoRef.current.pause();
                        }
                      }}
                      style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}
                    >
                      {isPlaying ? '⏸' : '▶'}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      style={{ background: 'none', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer' }}
                    >
                      {isMuted ? '🔇 Unmute' : '🔊 Live Audio'}
                    </button>
                  </div>

                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.8 }}>
                    {selectedDance.category}
                  </span>
                </div>
              </div>

              {/* Detailed Structured Information */}
              <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                
                {/* Title & Badges */}
                <div style={{ borderBottom: '1px solid var(--theme-border)', paddingBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{
                      backgroundColor: 'var(--theme-bg-accent)', color: 'var(--theme-accent-primary)',
                      padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 800, textTransform: 'uppercase'
                    }}>
                      {selectedDance.category}
                    </span>
                    <span style={{ color: 'var(--theme-text-muted)', fontSize: 13, fontWeight: 600 }}>
                      📍 {selectedDance.state}
                    </span>
                  </div>

                  <h2 style={{
                    margin: 0,
                    fontSize: 32,
                    fontWeight: 900,
                    color: 'var(--theme-text-primary)',
                    fontFamily: 'Fraunces, serif'
                  }}>
                    {selectedDance.name}
                  </h2>
                </div>

                {/* 1. Overview */}
                <div>
                  <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 800, color: 'var(--theme-accent-primary)', textTransform: 'uppercase', letterSpacing: 1 }}>
                    📖 Overview
                  </h4>
                  <p style={{ margin: 0, fontSize: 15, color: 'var(--theme-text-secondary)', lineHeight: 1.7 }}>
                    {selectedDance.description}
                  </p>
                </div>

                {/* 2. Short History */}
                {selectedDance.history && (
                  <div style={{ backgroundColor: 'var(--theme-bg-secondary)', padding: '18px', borderRadius: 16, border: '1px solid var(--theme-border)' }}>
                    <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 800, color: 'var(--theme-accent-primary)', textTransform: 'uppercase', letterSpacing: 1 }}>
                      🏛️ History & Origin
                    </h4>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--theme-text-secondary)', lineHeight: 1.7 }}>
                      {selectedDance.history}
                    </p>
                  </div>
                )}

                {/* 3. Cultural Significance */}
                {selectedDance.significance && (
                  <div>
                    <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 800, color: 'var(--theme-accent-primary)', textTransform: 'uppercase', letterSpacing: 1 }}>
                      ✨ Cultural Significance
                    </h4>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--theme-text-secondary)', lineHeight: 1.7 }}>
                      {selectedDance.significance}
                    </p>
                  </div>
                )}

                {/* 4. Traditional Costume & Music Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                  {selectedDance.costume && (
                    <div style={{ backgroundColor: 'var(--theme-bg-secondary)', padding: '16px', borderRadius: 14, border: '1px solid var(--theme-border)' }}>
                      <h4 style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 800, color: 'var(--theme-text-primary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        👗 Traditional Costume & Attire
                      </h4>
                      <p style={{ margin: 0, fontSize: 13, color: 'var(--theme-text-secondary)', lineHeight: 1.6 }}>
                        {selectedDance.costume}
                      </p>
                    </div>
                  )}

                  {selectedDance.instruments && (
                    <div style={{ backgroundColor: 'var(--theme-bg-secondary)', padding: '16px', borderRadius: 14, border: '1px solid var(--theme-border)' }}>
                      <h4 style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 800, color: 'var(--theme-text-primary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        🎶 Music & Instruments
                      </h4>
                      <p style={{ margin: 0, fontSize: 13, color: 'var(--theme-text-secondary)', lineHeight: 1.6 }}>
                        {selectedDance.instruments}
                      </p>
                    </div>
                  )}
                </div>

                {/* 5. Interesting Facts */}
                {selectedDance.facts && selectedDance.facts.length > 0 && (
                  <div>
                    <h4 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 800, color: 'var(--theme-accent-primary)', textTransform: 'uppercase', letterSpacing: 1 }}>
                      💡 Interesting Facts
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {selectedDance.facts.map((fact, idx) => (
                        <li key={idx} style={{ fontSize: 14, color: 'var(--theme-text-secondary)', lineHeight: 1.6 }}>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bottom Back Button */}
                <div style={{ borderTop: '1px solid var(--theme-border)', paddingTop: 18, textAlign: 'right' }}>
                  <button
                    onClick={() => setSelectedDance(null)}
                    style={{
                      background: 'var(--theme-btn-bg)',
                      color: 'var(--theme-btn-text)',
                      border: 'none',
                      borderRadius: 14,
                      padding: '12px 28px',
                      fontWeight: 800,
                      fontSize: 14,
                      cursor: 'pointer'
                    }}
                  >
                    ← Back to All Dances
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CulturalDances;
