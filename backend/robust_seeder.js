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

const categories = [
  'Music Shows', 'Dance & Performances', 'Workshops', 'Exhibitions',
  'Spirituality & Wellness', 'Meetups', 'Talks & Conferences',
  'Food & Culture', 'Theatre & Arts',
];

const eventsData = [];

// Music Shows
for (let i = 1; i <= 5; i++) {
    eventsData.push({
        username: 'Admin',
        title: `Vibrant Ragas Concert ${i}`,
        date: `2026-05-0${i}`,
        location: `Prithvi Theatre, Mumbai`,
        description: `Experience the soulful depths of Indian Classical Music with world-renowned artists. This evening focuses on the Ragas of the season.`,
        category: 'Music Shows',
        price: 500 + (i * 100),
        language: 'Hindi'
    });
}

// Dance & Performances
for (let i = 1; i <= 5; i++) {
    eventsData.push({
        username: 'Admin',
        title: `Bharatanatyam Showcase Vol. ${i}`,
        date: `2026-06-1${i}`,
        location: `Kalakshetra, Chennai`,
        description: `A breathtaking performance of traditional South Indian dance, telling stories from ancient mythology through movement and expression.`,
        category: 'Dance & Performances',
        price: 300 + (i * 50),
        language: 'Tamil'
    });
}

// Workshops
for (let i = 1; i <= 5; i++) {
    eventsData.push({
        username: 'Admin',
        title: `Warli Art Workshop Series ${i}`,
        date: `2026-07-2${i}`,
        location: `Art Village, Karjat`,
        description: `Learn the ancient tribal art of the Warli people. All materials provided. Take home your own canvas masterwork.`,
        category: 'Workshops',
        price: 1500,
        language: 'English'
    });
}

// Exhibitions
for (let i = 1; i <= 5; i++) {
    eventsData.push({
        username: 'Admin',
        title: `Colors of the North Exhibition ${i}`,
        date: `2026-08-0${i}`,
        location: `NGMA, Delhi`,
        description: `A stunning collection of photography and textiles from the Himalayan regions, showcasing the diversity of northern mountain cultures.`,
        category: 'Exhibitions',
        price: 100,
        language: 'English'
    });
}

// Spirituality & Wellness
for (let i = 1; i <= 5; i++) {
    eventsData.push({
        username: 'Admin',
        title: `Vipassana Meditation Retreat ${i}`,
        date: `2026-09-1${i}`,
        location: `Rishikesh Spiritual Center`,
        description: `A journey inward through silence and meditation. Reconnect with your spiritual roots in the heart of the Himalayas.`,
        category: 'Spirituality & Wellness',
        price: 0,
        language: 'Hindi'
    });
}

// Meetups
for (let i = 1; i <= 5; i++) {
    eventsData.push({
        username: 'Admin',
        title: `Language Exchange Meetup ${i}`,
        date: `2026-10-0${i}`,
        location: `Culture Cafe, Bangalore`,
        description: `Meet locals and travelers to practice different Indian languages. A perfect way to make new friends from around the country.`,
        category: 'Meetups',
        price: 150,
        language: 'English'
    });
}

// Talks & Conferences
for (let i = 1; i <= 5; i++) {
    eventsData.push({
        username: 'Admin',
        title: `Heritage Sustainability Talk ${i}`,
        date: `2026-11-2${i}`,
        location: `IIT Mumbai Auditorium`,
        description: `Discussion on preserving ancient architectural marvels while modernizing our urban environments. Expert panel from ASI.`,
        category: 'Talks & Conferences',
        price: 200,
        language: 'Marathi'
    });
}

// Food & Culture
for (let i = 1; i <= 5; i++) {
    eventsData.push({
        username: 'Admin',
        title: `South Indian Tiffin Trail ${i}`,
        date: `2026-12-1${i}`,
        location: `Mylapore, Chennai`,
        description: `A guided food walk exploring the hidden gems and centuries-old recipes of traditional South Indian breakfast and snacks.`,
        category: 'Food & Culture',
        price: 800,
        language: 'English'
    });
}

// Theatre & Arts
for (let i = 1; i <= 5; i++) {
    eventsData.push({
        username: 'Admin',
        title: `Kalidasa's Shakuntala - The Play ${i}`,
        date: `2027-01-0${i}`,
        location: `Rabindra Sadan, Kolkata`,
        description: `A modern adaptation of the classic Sanskrit drama, bringing global theatrical techniques to local legendary storytelling.`,
        category: 'Theatre & Arts',
        price: 450,
        language: 'Bengali'
    });
}

const postsData = [
  { username: 'GlobalTraveler', image_url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80', description: 'Exploring the vibrant spice markets of Cochin. The aroma is incredible! #Culinary #Heritage', tag: 'Culinary' },
  { username: 'YogaDeep', image_url: 'https://images.unsplash.com/photo-1545201997-c496dd18a09f?auto=format&fit=crop&q=80', description: 'Early morning meditation by the Ganges. Pure tranquility. 🙏 #Spirituality #Yoga', tag: 'Ritual' },
  { username: 'LoomArtist', image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80', description: 'Watching the master weavers in Banaras. The intricacy of silk patterns is mind-blowing. #Craft #Textiles', tag: 'Workshop' },
  { username: 'FolkBeat', image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80', description: 'Traditional folk drumming at the Rajasthan desert festival. The energy was electric! 🥁 #Music #Culture', tag: 'Music' },
  { username: 'TeaSommelier', image_url: 'https://images.unsplash.com/photo-1544787210-282d8d9aa178?auto=format&fit=crop&q=80', description: 'The tea ceremony in Darjeeling is an art form. Every sip tells a story of the soil. ☕ #TeaCulture #Darjeeling', tag: 'Culinary' },
  { username: 'SanskritLover', image_url: 'https://images.unsplash.com/photo-1532153322651-14f880d973ef?auto=format&fit=crop&q=80', description: 'Learning the roots of languages through ancient inscriptions. Every symbol is a window to history. #Language #Inscription', tag: 'Language' },
  { username: 'HandmadeLife', image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80', description: 'Kalaripayattu: The oldest martial art. The discipline and agility are beyond belief. ⚔️ #Kerala #MartialArts', tag: 'Ritual' },
  { username: 'FestiveQuest', image_url: 'https://images.unsplash.com/photo-1558482424-6993173d12d0?auto=format&fit=crop&q=80', description: 'Wishing everyone a colorful Holi! Let the spirit of togetherness prevail. 🎨 #Holi #India', tag: 'General' },
  { username: 'ArchExplorer', image_url: 'https://images.unsplash.com/photo-1524492715934-bda0972164bb?auto=format&fit=crop&q=80', description: 'Standing before the majestic Hawa Mahal. Pink sandstone glory! 🏰 #Jaipur #Architecture', tag: 'General' },
  { username: 'FlavorSeeker', image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80', description: 'The secret to a perfect Biryani? It’s all in the slow-cooking. 🥘 #Biryani #Gourmet', tag: 'Culinary' }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Optional: Clear existing data if you want a clean slate
        // await Event.deleteMany({});
        // await Post.deleteMany({});

        console.log('Inserting Events...');
        await Event.insertMany(eventsData);
        console.log(`Inserted ${eventsData.length} events.`);

        console.log('Inserting Posts...');
        await Post.insertMany(postsData);
        console.log(`Inserted ${postsData.length} posts.`);

        await mongoose.disconnect();
        console.log('Seeding complete.');
    } catch (err) {
        console.error(err);
    }
}

seed();
