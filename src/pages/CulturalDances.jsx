import { useState, useMemo, useEffect, useRef, useCallback } from 'react';

const dancesData = [
    {
        id: 1,
        name: "Kuchipudi",
        state: "Andhra Pradesh",
        description: "Kuchipudi is a classical dance style from Andhra Pradesh. It is known for its graceful movements, quick footwork, and dramatic character. It uniquely combines speech, mime, and pure dance. It shares many elements with Bharatanatyam but includes a unique element where the dancer performs on the edges of a brass plate (Tarangam).",
        imageUrl: "/images/dances/kuchipudi.jpg",
        videoPath: "/videos/dances/kuchipudi.mp4"
    },
    {
        id: 2,
        name: "Bharatanatyam",
        state: "Tamil Nadu",
        description: "Bharatanatyam is one of the oldest and most popular classical Indian dance forms. It is known for its fixed upper torso, bent legs, and spectacular footwork combined with a sophisticated vocabulary of sign language. Known for its fixed upper torso, legs bent or knees flexed out combined with spectacular footwork, it is considered the mother of many other Indian classical dance forms.",
        imageUrl: "https://images.unsplash.com/photo-1569851935333-6ca1448cc299?auto=format&fit=crop&q=80&w=1000",
        videoPath: "/videos/dances/bharatanatyam.mp4"
    },
    {
        id: 3,
        name: "Kathakali",
        state: "Kerala",
        description: "Kathakali is a major form of classical Indian dance. It is a story play genre of art, but one distinguished by the elaborately colorful make-up, costumes and face masks that the traditionally male actor-dancers wear. The stories are generally based on Hindu epics like the Ramayana and Mahabharata, performed with intense facial expressions and hand gestures.",
        imageUrl: "/images/dances/kathakali.jpg",
        videoPath: "/videos/dances/kathakali.mp4"
    },
    {
        id: 4,
        name: "Kathak",
        state: "Uttar Pradesh",
        description: "Kathak is traditionally attributed to the traveling bards of ancient northern India known as Kathakars or storytellers. It is characterized by rhythmic foot movements, adorned with small bells, and graceful gestures. Characterized by intricate footwork and precise rhythmic patterns (tatkar), Kathak dancers use their graceful hand movements and facial expressions to narrate ancient epic tales.",
        imageUrl: "https://images.unsplash.com/photo-1756382616831-998e8baf9675?auto=format&fit=crop&q=80&w=1000",
        videoPath: "/videos/dances/kathak.mp4"
    },
    {
        id: 5,
        name: "Odissi",
        state: "Odisha",
        description: "Odissi is traditionally a dance-drama genre of performance art, where the artists and musicians play out a mythical story or a spiritual message. It is known for its tribhangi (three-part break) posture. Characterized by the Tribhangi posture, which involves independent movement of the head, chest, and pelvis. It often narrates stories of Lord Krishna.",
        imageUrl: "/images/dances/odissi_generated.png",
        videoPath: "/videos/dances/odissi.mp4"
    },
    {
        id: 6,
        name: "Manipuri",
        state: "Manipur",
        description: "Manipuri dance is a team performance, with its own unique costumes especially the barrel-shaped, elegantly decorated skirt. The dance is characterized by smooth and graceful movements. Also known as Jagoi, it is particularly known for its Hindu Vaishnavism themes, exquisite costumes, and gentle, fluid, and graceful movements.",
        imageUrl: "https://images.unsplash.com/photo-1632292611299-980426b386a1?auto=format&fit=crop&q=80&w=1000",
        videoPath: "/videos/dances/manipuri.mp4"
    },
    {
        id: 7,
        name: "Sattriya",
        state: "Assam",
        description: "Sattriya is a classical dance form that originated in the Krishna-centered Vaishnavism monasteries of Assam. It usually depicts mythological stories and is an artistic way of presenting spiritual teachings. Originally performed in monasteries by male monks, it is deeply rooted in the Vaishnava tradition and portrays mythological stories.",
        imageUrl: "/images/dances/sattriya.jpg",
        videoPath: "/videos/dances/sattriya.mp4"
    },
    {
        id: 8,
        name: "Garba",
        state: "Gujarat",
        description: "Garba is a form of dance which originates from the state of Gujarat in India. The name is derived from the Sanskrit term Garbha (womb). Many traditional garbas are performed around a centrally lit lamp or a picture or statue of the Goddess Shakti. It is traditionally performed during the nine-day Hindu festival Navaratri. The circular patterns of Garba symbolize the Hindu view of time, with the rings of dancers revolving in cycles.",
        imageUrl: "/images/dances/garba.jpg",
        videoPath: "/videos/dances/garba.mp4"
    },
    {
        id: 9,
        name: "Bhangra",
        state: "Punjab",
        description: "Bhangra is a vibrant and energetic folk dance of Punjab. It was initially performed by farmers to celebrate the harvest season but now it is a popular dance form across the globe, performed at festivals and weddings. It was originally performed during the harvest season. Today, it is a globally recognized dance form characterized by its energetic jumps and vibrant costumes.",
        imageUrl: "/images/dances/bhangra.jpg",
        videoPath: "/videos/dances/bhangra.mp4"
    },
    {
        id: 10,
        name: "Lavani",
        state: "Maharashtra",
        description: "Lavani is a combination of traditional song and dance, which particularly performed to the beats of Dholki, a percussion instrument. It is noted for its powerful rhythm and fast tempo. It is a combination of traditional song and dance performed to the beats of a Dholki, known for its powerful rhythm and expressiveness.",
        imageUrl: "/images/dances/lavani.jpg",
        videoPath: "/videos/dances/lavani.mp4"
    },
    {
        id: 11,
        name: "Ghoomar",
        state: "Rajasthan",
        description: "Ghoomar is a traditional folk dance of Rajasthan, performed by women in flowing skirts called ghagharas. It is characterized by graceful circular movements and twirling, accompanied by traditional songs. A traditional women's folk dance characterized by spinning in circles to the rhythmic beats of local instruments, displaying the rich culture of the desert state.",
        imageUrl: "/images/dances/ghoomar_generated.png",
        videoPath: "/videos/dances/ghoomar.mp4"
    },
    {
        id: 12,
        name: "Bihu",
        state: "Assam",
        description: "The Bihu dance is a folk dance from the state of Assam, related to the Bihu festival and an important part of Assamese culture. Performed by both young men and women, the Bihu dance is characterized by brisk steps and rapid hand movements. This joyous dance celebrates the Assamese New Year and spring festival. It features rapid hand movements and a rhythmic swaying of the hips.",
        imageUrl: "/images/dances/bihu.jpg",
        videoPath: "/videos/dances/bihu.mp4"
    },
    {
        id: 13,
        name: "Yakshagana",
        state: "Karnataka",
        description: "Yakshagana is a traditional theater form that combines dance, music, dialogue, costume, make-up, and stage techniques with a unique style and form. It is traditionally performed in the coastal districts of Karnataka. A traditional theatre form combining dance, music, dialogue, and heavy makeup, mostly depicting stories from the Ramayana and Mahabharata.",
        imageUrl: "/images/dances/yakshagana.jpg",
        videoPath: "/videos/dances/yakshagana.mp4"
    },
    {
        id: 14,
        name: "Chhau",
        state: "West Bengal",
        description: "Chhau is a semi-classical Indian dance with martial, tribal, and folk traditions. It is performed by men from the states of West Bengal, Odisha, and Jharkhand. Purulia Chhau is famous for its massive, colorful masks. A semi-classical Indian dance with martial, tribal, and folk origins. Performers wear striking masks and enact episodes from epics.",
        imageUrl: "/images/dances/chhau.jpg",
        videoPath: "/videos/dances/chhau.mp4"
    },
    {
        id: 15,
        name: "Cheraw Dance",
        state: "Mizoram",
        description: "Also known as the Bamboo Dance, Cheraw is a ritual dance performed in Mizoram. It consists of four people holding two pairs of long bamboo staves which are clapped together in a rhythmic fashion. The dancers step in and out of the bamboo squares with great precision and grace, synchronized to the beating of the drums and local musical instruments.",
        imageUrl: "/images/dances/cheraw.jpg",
        videoPath: "/videos/dances/cheraw.mp4"
    },
    {
        id: 16,
        name: "Rouf",
        state: "Jammu & Kashmir",
        description: "Rouf is a beautiful and graceful dance performed by women in the Kashmir Valley. It is mostly performed during the spring season and on special occasions like Eid and the harvest season. The dancers form two rows facing each other and perform subtle footwork while singing traditional folk songs that celebrate the beauty of nature and seasonal changes.",
        imageUrl: "/images/dances/rouf.jpg",
        videoPath: "/videos/dances/rouf.mp4"
    },
    {
        id: 17,
        name: "Bardo Chham",
        state: "Arunachal Pradesh",
        description: "Bardo Chham is a ritual masked dance of the Sherdukpen community of Arunachal Pradesh. The dance depicts the victory of good over evil and is performed with large masks and colorful costumes. Each mask represents a different animal, and the performance is believed to ward off evil spirits and bring prosperity and harmony to the community.",
        imageUrl: "/images/dances/bardo_chham.jpg",
        videoPath: "/videos/dances/bardo_chham.mp4"
    },
    {
        id: 18,
        name: "Bidesiya",
        state: "Bihar",
        description: "Bidesiya is a form of Bhojpuri folk theater that originated in the 20th century. It deals with social issues such as the pain of migration, the plight of women, and the conflict between tradition and modernity. The performances combine music, dance, and dialogue to tell poignant stories that resonate deeply with the rural population and celebrate Bihari resilience.",
        imageUrl: "/images/dances/bidesiya.jpg",
        videoPath: "/videos/dances/bidesiya.mp4"
    },
    {
        id: 19,
        name: "Karma Naach",
        state: "Chhattisgarh",
        description: "Karma dance is a traditional dance of Central India, performed by tribal communities. It is performed during the Karma festival to worship the Karma tree, a symbol of fertility and prosperity. Dancers link arms and move in a circular motion, accompanied by the rhythmic beats of the Mandar drum and folk songs that celebrate the bounty of nature and communal harmony.",
        imageUrl: "/images/dances/karma_naach.jpg",
        videoPath: "/videos/dances/karma_naach.mp4"
    },
    {
        id: 20,
        name: "Fugdi",
        state: "Goa",
        description: "Fugdi is a Goan folk dance performed by women in the Konkan region. It is usually performed during religious festivals like Ganesh Chaturthi and Vrata. The dance starts at a slow pace but gradually becomes extremely fast, with dancers spinning in pairs while holding hands and creating a unique rhythmic sound with their breath and movements.",
        imageUrl: "/images/dances/fugdi.jpg",
        videoPath: "/videos/dances/fugdi.mp4"
    },
    {
        id: 21,
        name: "Phag Dance",
        state: "Haryana",
        description: "Phag is a popular seasonal folk dance of Haryana, performed by farmers to celebrate the month of Phalgun and the onset of spring. It is a mixed dance performed by both men and women to the beats of the Dhol, Tasha, and Nagara. The dance reflects the joy of a good harvest and the vibrant, energetic spirit of the Haryanvi culture.",
        imageUrl: "/images/dances/phag_dance.jpg",
        videoPath: "/videos/dances/phag_dance.mp4"
    },
    {
        id: 22,
        name: "Nati",
        state: "Himachal Pradesh",
        description: "Nati is the most popular folk dance of Himachal Pradesh, specifically in the Kullu and Shimla regions. It is a slow and graceful community dance performed in a circular formation with dancers traditionally dressed in colorful Himachali caps and waistcoats. It holds the Guinness World Record for the largest folk dance performance in a single location, showcasing mountain heritage.",
        imageUrl: "/images/dances/nati.jpg",
        videoPath: "/videos/dances/nati.mp4"
    },
    {
        id: 23,
        name: "Matki Dance",
        state: "Madhya Pradesh",
        description: "Matki is a folk dance of the Malwa region in Madhya Pradesh, usually performed at weddings and festivals. It is performed by women who balance several earthen pots (matkis) on their heads while dancing to the rhythmic beats of a dhol. The skill lies in maintaining perfect balance while executing complex footwork and graceful hand gestures that tell local stories.",
        imageUrl: "/images/dances/matki_dance.jpg",
        videoPath: "/videos/dances/matki_dance.mp4"
    },
    {
        id: 24,
        name: "Laho",
        state: "Meghalaya",
        description: "Laho is a traditional folk dance of the Jaintia people in Meghalaya, often performed during communal festivals. It is performed by men and women who link arms and move in synchronized steps, usually accompanied by a musician playing the drum and flute. The dance is a celebration of community bonds and is performed without any complex props, focusing on rhythmic togetherness.",
        imageUrl: "/images/dances/laho.jpg",
        videoPath: "/videos/dances/laho.mp4"
    },
    {
        id: 25,
        name: "Chang Lo",
        state: "Nagaland",
        description: "Also known as Sua Lua, Chang Lo is a folk dance of the Chang tribe of Nagaland. Traditionally performed to celebrate victory over enemies, it is now performed during the Poanglem festival to mark the harvest. The dancers wear traditional warrior attire, including colorful feathers and ornaments, performing vigorous and rhythmic movements that honor tribal legacy.",
        imageUrl: "/images/dances/chang_lo.jpg",
        videoPath: "/videos/dances/chang_lo.mp4"
    },
    {
        id: 26,
        name: "Singhi Chham",
        state: "Sikkim",
        description: "The Singhi Chham, or Snow Lion Dance, is a spectacular masked dance from Sikkim. The snow lion is a cultural symbol of the Himalayan region, representing strength, courage, and fearlessness. Performers wear elaborate furry costumes and masks to mimic the movements of the mythical lion, accompanied by traditional monastic music and rhythmic drum beats.",
        imageUrl: "/images/dances/singhi_chham.jpg",
        videoPath: "/videos/dances/singhi_chham.mp4"
    },
    {
        id: 27,
        name: "Perini Shivatandavam",
        state: "Telangana",
        description: "Perini Shivatandavam is an ancient dance form from Telangana that originated during the Kakatiya dynasty. It is a vigorous and rhythmic dance traditionally performed by warriors to invoke the power of Lord Shiva before battle. The dance is characterized by 'Prerana' (inspiration), featuring intense footwork and powerful movements that reflect a deep spiritual and warrior spirit.",
        imageUrl: "/images/dances/perini.jpg",
        videoPath: "/videos/dances/perini.mp4"
    },
    {
        id: 28,
        name: "Hojagiri",
        state: "Tripura",
        description: "Hojagiri is a unique folk dance of the Reang community in Tripura. It is a balance dance where women balance bottles and lamps on their heads and hands while performing intricate rhythmic movements with their lower bodies. The dance requires years of practice and incredible core strength to maintain balance while moving to the beats of the Khamb and Sumui instruments.",
        imageUrl: "/images/dances/hojagiri.jpg",
        videoPath: "/videos/dances/hojagiri.mp4"
    },
    {
        id: 29,
        name: "Choliya",
        state: "Uttarakhand",
        description: "Choliya is a martial folk dance from the Kumaon region of Uttarakhand, dating back over a thousand years. It is a sword dance that was traditionally performed by Rajputs at wedding processions to ward off evil spirits. The dancers, dressed in traditional white attire with colorful belts, perform stylized combat sequences with swords and shields to the accompaniment of trumpets.",
        imageUrl: "/images/dances/choliya.jpg",
        videoPath: "/videos/dances/choliya.mp4"
    },
    {
        id: 30,
        name: "Shondol",
        state: "Ladakh",
        description: "Shondol is the royal dance of Ladakh, often referred to as the 'King of Dances'. It was traditionally performed for the royalty of Ladakh on special occasions and is known for its slow, elegant movements. The dancers wear the traditional 'Perak' headgear adorned with turquoise stones and 'Sulma' robes, moving gracefully to the sounds of traditional Ladakhi instruments.",
        imageUrl: "/images/dances/shondol.jpg",
        videoPath: "/videos/dances/shondol.mp4"
    },
    {
        id: 31,
        name: "Paika Dance",
        state: "Jharkhand",
        description: "Paika is a vibrant martial folk dance from Jharkhand, traditionally performed by the Munda community. Dancers hold swords and shields, showcasing a stylized display of warrior spirit and weapon worship. The performance is characterized by acrobatic movements, high jumps, and rhythmic footwork, accompanied by the energetic beats of the Nagara and Dhak drums.",
        imageUrl: "/images/dances/paika.png",
        videoPath: "/videos/dances/paika.mp4"
    },
    {
        id: 32,
        name: "Mohiniyattam",
        state: "Kerala",
        description: "Mohiniyattam is a classical dance form from Kerala, known for its sheer elegance and feminine grace. The name literally means 'dance of the enchantress', and it is characterized by fluid, swaying movements of the torso that resemble the gentle motion of palm leaves in the wind. The dancers wear exquisite white and gold 'Kasavu' sarees and perform stories of love and devotion.",
        imageUrl: "/images/dances/mohiniyattam.png",
        videoPath: "/videos/dances/mohiniyattam.mp4"
    },
    {
        id: 33,
        name: "Nicobari Dance",
        state: "Andaman and Nicobar Islands",
        description: "Nicobari dance is the most prominent folk dance of the Andaman and Nicobar Islands, performed by the Nicobarese tribe during the 'Ossuary Feast'. Dancers move in a circular formation, swaying rhythmically to traditional chants and vocal rhythms. They often wear traditional costumes made of green coconut and plantain leaves, celebrating their deep connection with nature and ancestral spirits.",
        imageUrl: "/images/dances/nicobari.png",
        videoPath: "/videos/dances/nicobari.mp4"
    },
    {
        id: 34,
        name: "Tarpa Dance",
        state: "Dadra and Nagar Haveli and Daman and Diu",
        description: "Tarpa is a joyous harvest dance performed by the Varli and Kokna tribes of Dadra and Nagar Haveli. Dancers hold each other's waists and move in a grand spiral or circular formation around a musician playing the 'Tarpa', a large wind instrument made of gourd and bamboo. The dance symbolizes the cycle of life and is performed late into the night during the harvest season.",
        imageUrl: "/images/dances/tarpa.png",
        videoPath: "/videos/dances/tarpa.mp4"
    },
    {
        id: 35,
        name: "Kolkali",
        state: "Lakshadweep",
        description: "Kolkali is a rhythmic folk dance popular in the Lakshadweep Islands, performed exclusively by men using short wooden sticks. The dancers form pairs and move in circles, striking their sticks together in a coordinated and increasingly fast-paced rhythm. It is a highly energetic performance that requires great agility and synchronization, reflecting the maritime culture of the islands.",
        imageUrl: "/images/dances/kolkali.png",
        videoPath: "/videos/dances/kolkali.mp4"
    },
    {
        id: 36,
        name: "Garadi",
        state: "Puducherry",
        description: "Garadi is a traditional dance from Puducherry, believed to have originated during the celebration of Lord Rama's victory in the Ramayana. Male dancers perform monkey-like postures and gestures, wearing colorful costumes and ten iron rings called 'Anjali' on each leg. The rings create a rhythmic chiming sound as the dancers move to the beats of the large 'Ramadolu' drums.",
        imageUrl: "/images/dances/garadi.png",
        videoPath: "/videos/dances/garadi.mp4"
    }
];

const CulturalDances = () => {
    const [selectedDance, setSelectedDance] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedState, setSelectedState] = useState("All");
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const states = useMemo(() => {
        const uniqueStates = ["All", ...new Set(dancesData.map(d => d.state))];
        return uniqueStates.sort();
    }, []);

    const filteredDances = useMemo(() => {
        return dancesData.filter(dance => {
            const matchesSearch = dance.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 dance.state.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesState = selectedState === "All" || dance.state === selectedState;
            return matchesSearch && matchesState;
        });
    }, [searchQuery, selectedState]);

    const handleSelectDance = (dance) => {
        setSelectedDance(dance);
        setIsMuted(true); // Default to muted on open
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 theme-transition" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
            <div className="container mx-auto max-w-7xl">
                <div className="mb-12 text-center animate-slide-up-reveal">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
                        <span>Cultural Dances of India</span>
                    </h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto mb-10 animate-fade-in-up delay-300">
                        Explore the rich heritage of India through its diverse and beautiful classical and folk dance forms from every state.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto bg-bg-secondary p-6 rounded-2xl shadow-sm border border-black/5 theme-transition" style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)' }}>
                        <div className="relative w-full md:w-2/3">
                            <input 
                                type="text"
                                placeholder="Search by dance or state..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-bg-primary border border-black/10 rounded-xl focus:ring-2 focus:ring-accent-terra/20 outline-none transition-all"
                                style={{ backgroundColor: 'var(--theme-bg-primary)', color: 'var(--theme-text-primary)' }}
                            />
                            <svg className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div className="relative w-full md:w-1/3">
                            <select 
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                                className="w-full px-4 py-3 bg-bg-primary border border-black/10 rounded-xl focus:ring-2 focus:ring-accent-terra/20 outline-none transition-all appearance-none cursor-pointer"
                                style={{ backgroundColor: 'var(--theme-bg-primary)', color: 'var(--theme-text-primary)' }}
                            >
                                {states.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {filteredDances.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredDances.map((dance, index) => (
                            <div 
                                key={dance.id}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 bg-bg-secondary border border-black/10 flex flex-col h-80 animate-fade-in-up"
                                style={{ 
                                    animationDelay: `${index * 50}ms`,
                                    backgroundColor: 'var(--theme-card-bg)',
                                    borderColor: 'var(--theme-border)'
                                }}
                                onClick={() => handleSelectDance(dance)}
                            >
                                <div className="h-4/5 w-full relative overflow-hidden">
                                    <img 
                                            src={dance.imageUrl} 
                                            alt={dance.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=1000";
                                            }}
                                        />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-4 bg-bg-secondary h-1/5 flex items-center justify-between border-t border-black/10" style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}>
                                    <h3 className="text-lg font-serif font-bold text-text-primary truncate" style={{ color: 'var(--theme-text-primary)' }}>{dance.name}</h3>
                                    <span className="text-xs font-medium text-accent-terra bg-accent-terra/10 px-2 py-1 rounded-full whitespace-nowrap">{dance.state}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-bg-secondary rounded-3xl border border-dashed border-black/20" style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)' }}>
                        <svg className="w-20 h-20 mx-auto text-text-muted opacity-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-2xl font-serif font-bold text-text-primary" style={{ color: 'var(--theme-text-primary)' }}>No dances found</h3>
                        <p className="text-text-muted">Try a different search term or filter.</p>
                    </div>
                )}

                {/* Modal for viewing dance info */}
                {selectedDance && (
                    <div className="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto p-4 md:py-8 bg-black/80 backdrop-blur-md animate-fade-in" onClick={() => setSelectedDance(null)}>
                        {/* Spacer to vertically center on large screens */}
                        <div className="flex-shrink-0 hidden md:block md:my-auto" />
                        <div 
                            className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-300 animate-slide-up theme-transition flex-shrink-0 my-auto"
                            style={{ backgroundColor: 'var(--theme-card-bg)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button - always visible at top right */}
                            <div className="relative">
                                <button 
                                    onClick={() => setSelectedDance(null)}
                                    className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-md transition-colors text-white w-10 h-10 rounded-full flex items-center justify-center pointer-events-auto"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Video container - aspect-ratio based so it never clips */}
                                <div className="relative w-full bg-black group/video" style={{ aspectRatio: '16/9' }}>
                                    <video 
                                        ref={videoRef}
                                        src={selectedDance.videoPath}
                                        poster={selectedDance.imageUrl}
                                        className="absolute inset-0 w-full h-full object-contain pointer-events-auto"
                                        autoPlay
                                        loop
                                        muted={isMuted}
                                        playsInline
                                        onContextMenu={(e) => e.preventDefault()}
                                        controlsList="nodownload noplaybackrate"
                                        disablePictureInPicture
                                    />
                                    
                                    {/* Custom Controls Overlay - only show on hover/touch */}
                                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 flex items-center justify-between pointer-events-none">
                                        <div className="flex items-center gap-4 pointer-events-auto">
                                            <button 
                                                onClick={() => {
                                                    if (videoRef.current.paused) videoRef.current.play();
                                                    else videoRef.current.pause();
                                                }}
                                                className="text-white hover:scale-110 transition-transform"
                                            >
                                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <button 
                                                onClick={() => setIsMuted(!isMuted)}
                                                className="text-white hover:scale-110 transition-transform"
                                            >
                                                {isMuted ? (
                                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.414 0A5.982 5.982 0 0115 10a5.982 5.982 0 01-1.757 4.243 1 1 0 01-1.414-1.414A3.982 3.982 0 0013 10a3.982 3.982 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <div className="text-white font-mono text-sm pointer-events-none opacity-50">
                                            PREMIUM COLLECTION
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dance info - below the video, always visible */}
                            <div className="p-5 md:p-8">
                                <div className="mb-4 md:mb-6">
                                    <h2 className="text-2xl md:text-4xl font-serif font-bold mb-1" style={{ color: 'var(--theme-text-primary)' }}>{selectedDance.name}</h2>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-accent-terra" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-base font-medium" style={{ color: 'var(--theme-text-muted)' }}>{selectedDance.state}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-4 md:mb-6">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl md:text-2xl font-bold text-text-primary border-b-4 border-accent-terra pb-1" style={{ color: 'var(--theme-text-primary)', borderColor: 'var(--theme-accent)' }}>About the Dance</h3>
                                    </div>
                                </div>
                                <p className="text-base md:text-xl text-text-muted leading-relaxed font-sans animate-fade-in" style={{ animationDelay: '400ms', color: 'var(--theme-text-muted)' }}>
                                    {selectedDance.description}
                                </p>
                                
                                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-black/5 flex flex-wrap gap-3 md:gap-4" style={{ borderColor: 'var(--theme-border)' }}>
                                    <div className="bg-accent-terra/5 px-3 md:px-4 py-2 rounded-xl flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-accent-terra"></span>
                                        <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-accent-terra">Heritage Form</span>
                                    </div>
                                    <div className="bg-accent-terra/5 px-3 md:px-4 py-2 rounded-xl flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-accent-terra"></span>
                                        <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-accent-terra">Authentic Music</span>
                                    </div>
                                    <div className="bg-accent-terra/5 px-3 md:px-4 py-2 rounded-xl flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-accent-terra"></span>
                                        <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-accent-terra">Traditional Costumes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0 hidden md:block md:my-auto" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CulturalDances;
