import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const EventSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    title: String,
    date: String,
    location: String,
    description: String,
    category: { type: String, default: 'Cultural' },
    price: { type: Number, default: 0 },
    language: { type: String, default: 'English' },
    image_url: String,
    created_at: { type: Date, default: Date.now }
});
const Event = mongoose.model('Event', EventSchema);

const PostSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    image_url: String,
    description: String,
    tag: String,
    created_at: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
const Post = mongoose.model('Post', PostSchema);

const eventsData = [
    // Workshops
    {
        username: 'Admin',
        title: 'Warli Art Masterclass',
        date: '2026-07-21',
        location: 'Art Village, Karjat',
        description: 'Discover the rhythmic beauty of Warli tribal art. Learn to create intricate patterns using traditional white pigment on mud-colored canvases.',
        category: 'Workshops',
        price: 1500,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'Madhubani Painting Session',
        date: '2026-07-25',
        location: 'Craft Museum, Delhi',
        description: 'Explore the vibrant folklore of Mithila through Madhubani painting. Use natural dyes and twigs to bring mythical tales to life on paper.',
        category: 'Workshops',
        price: 1200,
        language: 'Hindi',
        image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'Pottery & Terra Cotta Workshop',
        date: '2026-07-30',
        location: 'Kumbharwada, Dharavi',
        description: 'Get your hands dirty with the master potters. Learn wheel-throwing techniques and the secrets of firing traditional terra cotta vessels.',
        category: 'Workshops',
        price: 800,
        language: 'Marathi',
        image_url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80'
    },

    // Music Shows
    {
        username: 'Admin',
        title: 'Sitar Evening with Sahana',
        date: '2026-05-12',
        location: 'Prithvi Theatre, Mumbai',
        description: 'A mesmerizing evening of Hindustani Classical music featuring the ethereal sounds of the Sitar played by a rising prodigy.',
        category: 'Music Shows',
        price: 600,
        language: 'Hindi',
        image_url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'Baul Folk Fusion Concert',
        date: '2026-05-20',
        location: 'Shantiniketan Grounds, Bolpur',
        description: 'The wandering mystics of Bengal bring their spiritual songs of the soul, blended with modern acoustic elements for a unique soundscape.',
        category: 'Music Shows',
        price: 450,
        language: 'Bengali',
        image_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'Qawwali Night at Nizamuddin',
        date: '2026-05-28',
        location: 'Dargah Courtyard, Delhi',
        description: 'Experience the thunderous energy of Sufi devotional music in its most authentic setting. Hearts will soar with the rhythms of the dholak.',
        category: 'Music Shows',
        price: 0,
        language: 'Urdu',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80'
    },

    // Dance & Performances
    {
        username: 'Admin',
        title: 'Bharatanatyam Recital: Margam',
        date: '2026-06-12',
        location: 'Kalakshetra, Chennai',
        description: 'A traditional Bharatanatyam recital showcasing the full repertoire of this ancient dance form, from rhythmic Nritta to expressive Abhinaya.',
        category: 'Dance & Performances',
        price: 400,
        language: 'Tamil',
        image_url: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'Kathakali: The Epic Tales',
        date: '2026-06-22',
        location: 'Kerala Kalamandalam, Thrissur',
        description: 'Vibrant makeup, elaborate costumes, and powerful storytelling. Witness the legends of the Ramayana brought to life through gesture and facial expressions.',
        category: 'Dance & Performances',
        price: 500,
        language: 'Malayalam',
        image_url: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&q=80'
    },

    // Food & Culture
    {
        username: 'Admin',
        title: 'Mylapore Breakfast Trail',
        date: '2026-12-05',
        location: 'Mylapore Temple Gate, Chennai',
        description: 'A guided culinary journey through the historic streets of Mylapore, tasting the finest filter coffee, idlis, and traditional snacks.',
        category: 'Food & Culture',
        price: 900,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'Lucknowi Kebabs & Shayaris',
        date: '2026-12-15',
        location: 'Hazratganj, Lucknow',
        description: 'Indulge in the melt-in-the-mouth Galauti kebabs while listening to the beautiful Urdu poetry that defines the Nawabi culture.',
        category: 'Food & Culture',
        price: 1200,
        language: 'Hindi',
        image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80'
    },

    // Spirituality & Wellness
    {
        username: 'Admin',
        title: 'Himalayan Yoga Retreat',
        date: '2026-09-10',
        location: 'Vashishta Cave, Rishikesh',
        description: 'Align your chakras in the serene lap of the Himalayas. Focus on breathwork, asanas, and spiritual discourse by the flowing Ganges.',
        category: 'Spirituality & Wellness',
        price: 2500,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'Ganga Aarti Experience',
        date: '2026-09-20',
        location: 'Dashashwamedh Ghat, Varanasi',
        description: 'Witness the spectacular evening prayer ceremony with rhythmic chants, massive fire lamps, and a deep sense of devotion.',
        category: 'Spirituality & Wellness',
        price: 0,
        language: 'Sanskrit',
        image_url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80'
    },

    // Exhibitions
    {
        username: 'Admin',
        title: 'The Mughal Miniature Exhibit',
        date: '2026-08-05',
        location: 'National Museum, Delhi',
        description: 'A curated collection of rare Mughal miniature paintings, showcasing the exquisite detail and historical narratives of the imperial era.',
        category: 'Exhibitions',
        price: 150,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'Textiles of India: Handwovens',
        date: '2026-08-18',
        location: 'CST Museum, Mumbai',
        description: 'From Banarasi silk to Kanjeevaram cottons, explore the rich weaving heritage of India through fabrics that have stood the test of time.',
        category: 'Exhibitions',
        price: 200,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80'
    },

    // Meetups
    {
        username: 'Admin',
        title: 'Heritage Photographers Meetup',
        date: '2026-06-08',
        location: 'India Gate Lawns, Delhi',
        description: 'Connect with fellow heritage photographers over golden-hour shoots at iconic Delhi monuments. Share techniques, stories, and your love for documenting culture.',
        category: 'Meetups',
        price: 0,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'Indie Bookworms: Regional Literature',
        date: '2026-06-15',
        location: 'Atta Galatta Bookstore, Bangalore',
        description: 'A casual meetup for lovers of Indian regional literature. Discuss your latest reads in Tamil, Kannada, Malayalam, or any mother tongue. Chai provided!',
        category: 'Meetups',
        price: 0,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'Folk Artists & Artisans Gathering',
        date: '2026-07-03',
        location: 'Dilli Haat, INA, Delhi',
        description: 'Meet the artisans behind India\'s folk art traditions. From wooden toymakers of Channapatna to lacquerware craftsmen of Jaipur — hear their stories firsthand.',
        category: 'Meetups',
        price: 100,
        language: 'Hindi',
        image_url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80'
    },

    // Talks & Conferences
    {
        username: 'Admin',
        title: 'TED x Heritage: Preserving Roots',
        date: '2026-08-22',
        location: 'IIT Bombay Auditorium, Mumbai',
        description: 'A day of powerful talks on preserving intangible cultural heritage — oral traditions, dying crafts, and indigenous knowledge systems facing extinction.',
        category: 'Talks & Conferences',
        price: 750,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'Dialogues on Dravidian Architecture',
        date: '2026-09-05',
        location: 'IIT Madras, Chennai',
        description: 'Leading historians and architects discuss the mathematical precision, astronomical alignment, and spiritual symbolism embedded in South Indian temple architecture.',
        category: 'Talks & Conferences',
        price: 300,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'The Future of Indian Handicrafts',
        date: '2026-10-12',
        location: 'India Habitat Centre, Delhi',
        description: 'Industry leaders, designers, and artisans converge to discuss how e-commerce, AI, and sustainable practices can revive India\'s ₹2 lakh crore handicraft sector.',
        category: 'Talks & Conferences',
        price: 500,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80'
    },

    // Theatre & Arts
    {
        username: 'Admin',
        title: 'Yakshagana: The Night Drama',
        date: '2026-07-18',
        location: 'Udupi Temple Grounds, Karnataka',
        description: 'Experience the all-night spectacle of Yakshagana — a 400-year-old theatre form combining dance, music, and dialogue under the open Karnataka sky.',
        category: 'Theatre & Arts',
        price: 350,
        language: 'Kannada',
        image_url: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'Urdu Mushaira & Ghazal Night',
        date: '2026-08-10',
        location: 'Rang Bhavan, Hyderabad',
        description: 'An evening of soul-stirring Urdu poetry recitations by renowned shayars, accompanied by live ghazal performances that celebrate the beauty of the Urdu language.',
        category: 'Theatre & Arts',
        price: 400,
        language: 'Urdu',
        image_url: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800&q=80'
    },
    {
        username: 'Admin',
        title: 'Nautanki: The People\'s Theatre',
        date: '2026-11-02',
        location: 'Lucknow Mahotsav Grounds',
        description: 'The vibrant folk theatre of North India returns with its signature satire, powerful vocals, and larger-than-life performances that have entertained millions for centuries.',
        category: 'Theatre & Arts',
        price: 200,
        language: 'Hindi',
        image_url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80'
    }
];

const postsData = [
  { username: 'GlobalTraveler', image_url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80', description: 'Exploring the vibrant spice markets of Cochin. The aroma is incredible! #Culinary #Heritage', tag: 'Culinary' },
  { username: 'YogaDeep', image_url: 'https://images.unsplash.com/photo-1545201997-c496dd18a09f?auto=format&fit=crop&q=80', description: 'Early morning meditation by the Ganges. Pure tranquility. 🧘‍♂️ #Spirituality #Yoga', tag: 'Ritual' },
  { username: 'LoomArtist', image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80', description: 'Watching the master weavers in Banaras. The intricacy of silk patterns is mind-blowing. #Craft #Textiles', tag: 'Workshop' },
  { username: 'FolkBeat', image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80', description: 'Traditional folk drumming at the Rajasthan desert festival. The energy was electric! 🥁 #Music #Culture', tag: 'Music' },
  { username: 'TeaSommelier', image_url: 'https://images.unsplash.com/photo-1544787210-282d8d9aa178?auto=format&fit=crop&q=80', description: 'The tea ceremony in Darjeeling is an art form. Every sip tells a story of the soil. ☕ #TeaCulture #Darjeeling', tag: 'Culinary' }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data for a clean slate as requested
        console.log('Clearing existing data...');
        await Event.deleteMany({});
        await Post.deleteMany({});
        console.log('Existing events and posts cleared.');

        console.log('Inserting Unique Events...');
        await Event.insertMany(eventsData);
        console.log(`Inserted ${eventsData.length} unique events.`);

        console.log('Inserting Posts...');
        await Post.insertMany(postsData);
        console.log(`Inserted ${postsData.length} posts.`);

        await mongoose.disconnect();
        console.log('Seeding complete successfully.');
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();
