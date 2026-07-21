import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Schemas (Must match server.js)
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

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        const events = [
            { title: 'Sufi Night - Qawaali by Nizami Bandhu', category: 'Music Shows', date: '2026-04-10', location: 'Mumbai', description: 'Divine sufi music and qawaali.', price: 999, language: 'Hindi' },
            { title: 'Baul Sangeet Festival', category: 'Music Shows', date: '2026-04-14', location: 'Kolkata', description: 'Experience the mystical folk music of Bengal.', price: 200, language: 'Bengali' },
            { title: 'Pottery Workshop at Sukoon', category: 'Workshops', date: '2026-04-25', location: 'Hyderabad', description: 'Learn hand-building and wheel-throwing techniques.', price: 499, language: 'English' },
            { title: 'Madhubani Art Masterclass', category: 'Workshops', date: '2026-04-28', location: 'Patna', description: 'Learn the intricate motifs of Mithila painting.', price: 799, language: 'Hindi' },
            { title: 'Himalayan Yoga Retreat', category: 'Spirituality & Wellness', date: '2026-05-01', location: 'Rishikesh', description: 'A rejuvenating weekend of asanas and dhyana.', price: 5000, language: 'English' }
            // ... (adding a few more for variety)
        ];

        for (const ev of events) {
            const exists = await Event.findOne({ title: ev.title });
            if (!exists) {
                await new Event({ ...ev, username: 'CultureConnect' }).save();
                console.log(`Seeded event: ${ev.title}`);
            }
        }

        const posts = [
            { username: 'Aarav123', image_url: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80', description: 'Just witnessed the most mesmerizing sunset at the Ghats of Varanasi. The spiritual energy here is unexplainable! 🌺✨', tag: 'Spirituality' },
            { username: 'Priya_Dances', image_url: 'https://images.unsplash.com/photo-1583120614539-715af8f13b19?auto=format&fit=crop&q=80', description: 'Backstage before our Odissi performance tonight! The heavy jewelry is worth it for the art. #CulturalDance #Odissi', tag: 'Dance' },
            { username: 'Rohan_Clicks', image_url: 'https://images.unsplash.com/photo-1564507592227-0b0f5c06a33f?auto=format&fit=crop&q=80', description: 'The incredible architecture of Hampi. It feels like stepping right into the 14th century Vijayanagara Empire! 🏛️', tag: 'Architecture' }
        ];

        for (const p of posts) {
            const exists = await Post.findOne({ description: p.description });
            if (!exists) {
                await new Post(p).save();
                console.log(`Seeded post by: ${p.username}`);
            }
        }

        console.log('MongoDB Seeding complete.');
        await mongoose.connection.close();
    } catch (err) {
        console.error('Seeding error:', err);
    }
}

seed();
