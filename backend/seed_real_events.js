import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

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

const realEvents = [
    {
        title: 'Kala Ghoda Arts Festival 2026',
        category: 'Exhibitions',
        date: '2026-02-01',
        location: 'Kala Ghoda, Mumbai',
        description: 'India\'s largest multicultural street festival. Experience stunning art installations, heritage walks, and vibrant street performances across 9 days.',
        price: 0,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1541450250-990264b38274?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Sunburn Festival Goa 2026',
        category: 'Music Shows',
        date: '2026-01-05',
        location: 'Vagator Beach, Goa',
        description: 'Asia\'s biggest Electronic Dance Music (EDM) festival returns. Featuring world-class DJs, immersive stages, and the ultimate beach party vibe.',
        price: 3500,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Jaipur Literature Festival 2026',
        category: 'Talks & Conferences',
        date: '2026-01-22',
        location: 'Diggi Palace, Jaipur',
        description: 'The "greatest literary show on Earth". Join Nobel laureates, poets, and thinkers for a 5-day celebration of literature and philosophy.',
        price: 500,
        language: 'Hindi/English',
        image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Khajuraho Dance Festival 2026',
        category: 'Dance & Performances',
        date: '2026-02-20',
        location: 'Khajuraho Temples, MP',
        description: 'Witness classical Indian dances like Kathak, Bharatanatyam, and Odissi set against the backdrop of the UNESCO World Heritage Khajuraho temples.',
        price: 200,
        language: 'Hindi',
        image_url: 'https://images.unsplash.com/photo-1547427670-447a4ebe9d73?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Ziro Festival of Music 2026',
        category: 'Music Shows',
        date: '2026-09-26',
        location: 'Ziro Valley, Arunachal Pradesh',
        description: 'India\'s most eco-friendly music festival. Camp in the lush valley and enjoy indie music from across the globe in a serene atmosphere.',
        price: 2500,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1501612722273-0461ce777920?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Lollapalooza India 2026',
        category: 'Music Shows',
        date: '2026-01-24',
        location: 'Mahalaxmi Racecourse, Mumbai',
        description: 'The global music phenomenon returns to India. Expect multi-genre performances from international headliners and local icons.',
        price: 7000,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Hornbill Festival Nagaland 2026',
        category: 'Food & Culture',
        date: '2026-12-01',
        location: 'Kisama Heritage Village, Kohima',
        description: 'The "Festival of Festivals". Experience the rich tribal culture, warrior dances, authentic Naga cuisine, and the famous world-renowned Hornbill rock contest.',
        price: 100,
        language: 'Naga/English',
        image_url: 'https://images.unsplash.com/photo-1528319725582-ddc0b6a3571d?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Mads & Murals Arts Workshop',
        category: 'Workshops',
        date: '2026-03-12',
        location: 'Auroville, Pondicherry',
        description: 'A week-long immersion into sustainable mural painting and creative expression led by international street artists.',
        price: 1500,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Varanasi Dev Deepawali Experience',
        category: 'Spirituality & Wellness',
        date: '2026-11-23',
        location: 'Dashashwamedh Ghat, Varanasi',
        description: 'Experience the magical night when millions of diyas light up the Ghats of Mother Ganga. A spiritual journey unlike any other.',
        price: 0,
        language: 'Hindi',
        image_url: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Hampi Heritage Photography Walk',
        category: 'Exhibitions',
        date: '2026-05-15',
        location: 'Vitthala Temple Complex, Hampi',
        description: 'A guided tour for photography enthusiasts to capture the soul of the Vijayanagara Empire ruins during golden hour.',
        price: 300,
        language: 'English',
        image_url: 'https://images.unsplash.com/photo-1564507592227-0b0f5c06a33f?auto=format&fit=crop&q=80&w=800'
    }
];

async function seedRealEvents() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for real event seeding...');

        // Clear generic placeholder events first to avoid clutter
        const deleted = await Event.deleteMany({ title: /^Vibrant Ragas Concert/ });
        console.log(`Deleted ${deleted.deletedCount} placeholder events.`);

        for (const ev of realEvents) {
            const exists = await Event.findOne({ title: ev.title });
            if (!exists) {
                await new Event({ ...ev, username: 'CultureConnect' }).save();
                console.log(`Seeded real event: ${ev.title}`);
            }
        }

        console.log('Real Indian Events Seeding complete.');
        await mongoose.connection.close();
    } catch (err) {
        console.error('Seeding error:', err);
    }
}

seedRealEvents();
