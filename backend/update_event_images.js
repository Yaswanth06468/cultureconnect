import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

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

const CATEGORY_IMAGES = {
    'Music Shows': [
        'https://images.unsplash.com/photo-1514525253344-763353753744', // Concert
        'https://images.unsplash.com/photo-1459749411177-042180ce673c', // Crowd
        'https://images.unsplash.com/photo-1524362666922-64c89d57a848', // Guitar
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745', // Stage
        'https://images.unsplash.com/photo-1493225255756-d9584f8606e9', // Performance
        'https://images.unsplash.com/photo-1501612722273-0461ce777920'  // Sitar-like
    ],
    'Dance & Performances': [
        'https://images.unsplash.com/photo-1547427670-447a4ebe9d73', // Indian Dance
        'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad', // Art
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7', // Stage light
        'https://images.unsplash.com/photo-1535525153412-5a42439a210d', // Movement
        'https://images.unsplash.com/photo-1508700915892-45ecd05ae2ad'  // Traditional
    ],
    'Workshops': [
        'https://images.unsplash.com/photo-1565193998772-263ef7f01905', // Pottery
        'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b', // Painting
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f', // Art work
        'https://images.unsplash.com/photo-1554188248-986adbb73be4', // Creative
        'https://images.unsplash.com/photo-1459908318434-7043475c4915'  // Hands
    ],
    'Food & Culture': [
        'https://images.unsplash.com/photo-1589302168068-964664d93dc0', // Biryani
        'https://images.unsplash.com/photo-1601050690597-df0568f70950', // Samosa
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', // Salad/Fresh
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836', // Platter
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'  // Dining
    ],
    'Spirituality & Wellness': [
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773', // Yoga
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', // Lotus
        'https://images.unsplash.com/photo-1599443015574-be5fe8a3f783', // Temple
        'https://images.unsplash.com/photo-1528319725582-ddc0b6a3571d', // Chants
        'https://images.unsplash.com/photo-1470472304068-4398bc9da0a0'  // Sunset
    ],
    'Exhibitions': [
        'https://images.unsplash.com/photo-1531055060029-3ffbb3c04513', // Gallery
        'https://images.unsplash.com/photo-1501066927592-e1ae1515ee19', // Museum
        'https://images.unsplash.com/photo-1518998053574-53f1f61f93ea', // Modern Art
        'https://images.unsplash.com/photo-1554188248-986adbb73be4'  // Exhibition
    ],
    'Theatre & Arts': [
        'https://images.unsplash.com/photo-1503095396549-807be8999506', // Actor
        'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf', // Stage curtains
        'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b', // Colors
        'https://images.unsplash.com/photo-1514302240736-231a48695863'  // Drama
    ]
};

const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745'
];

async function updateImages() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB...');

        const events = await Event.find();
        console.log(`Found ${events.length} events. Updating images...`);

        let usedImages = new Set();

        for (const ev of events) {
            const categoryUrls = CATEGORY_IMAGES[ev.category] || DEFAULT_IMAGES;
            
            // Find an image that hasn't been used yet for this event, if possible
            let selectedUrl = '';
            for (const url of categoryUrls) {
                const fullUrl = `${url}?auto=format&fit=crop&q=80&w=800`;
                if (!usedImages.has(fullUrl)) {
                    selectedUrl = fullUrl;
                    usedImages.add(fullUrl);
                    break;
                }
            }

            // Fallback to random in category if all used, then random default
            if (!selectedUrl) {
                selectedUrl = `${categoryUrls[Math.floor(Math.random() * categoryUrls.length)]}?auto=format&fit=crop&q=80&w=800&sig=${ev._id}`;
            }

            ev.image_url = selectedUrl;
            await ev.save();
            console.log(`Updated event: ${ev.title} with image.`);
        }

        console.log('Update complete.');
        await mongoose.connection.close();
    } catch (err) {
        console.error('Error updating events:', err);
    }
}

updateImages();
