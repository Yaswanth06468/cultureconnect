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
        image_url: 'https://images.unsplash.com/photo-1565193998772-263ef7f01905?auto=format&fit=crop&q=80&w=800'
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
        image_url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800'
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
        image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800'
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
        image_url: 'https://images.unsplash.com/photo-1514525253344-763353753744?auto=format&fit=crop&q=80&w=800'
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
        image_url: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=800'
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
        image_url: 'https://images.unsplash.com/photo-1524362666922-64c89d57a848?auto=format&fit=crop&q=80&w=800'
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
        image_url: 'https://images.unsplash.com/photo-1547427670-447a4ebe9d73?auto=format&fit=crop&q=80&w=800'
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
        image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800'
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
        image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800'
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
        image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
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
        image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800'
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
        image_url: 'https://images.unsplash.com/photo-1599443015574-be5fe8a3f783?auto=format&fit=crop&q=80&w=800'
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
        image_url: 'https://images.unsplash.com/photo-1501066927592-e1ae1515ee19?auto=format&fit=crop&q=80&w=800'
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
        image_url: 'https://images.unsplash.com/photo-1531055060029-3ffbb3c04513?auto=format&fit=crop&q=80&w=800'
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
