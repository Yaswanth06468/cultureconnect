import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

// Schema match from server.js
const CulturePartnerSchema = new mongoose.Schema({
    name: String,
    culture: String,
    avatar: String,
    location: String,
    food: String,
    foodImage: String,
    recipe: String,
    routine: String,
    ritualDetails: String,
    ritualImage: String,
    words: [{
        word: String,
        translation: String,
        image: String
    }],
    languageSignificance: String,
    color: String,
    languageImage: String,
    artDescription: String,
    visualImage: String,
    created_at: { type: Date, default: Date.now }
});
const CulturePartner = mongoose.model('CulturePartner', CulturePartnerSchema);

const CULTURES = [
    {
        culture: 'Mexico (Oaxaca)',
        location: 'Oaxaca de Juárez',
        avatar: '👩🏽',
        food: 'Mole Negro',
        foodImage: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=800',
        recipe: 'Toast chilies until fragrant. Grind with chocolate, spices, and nuts into a thick paste. Simmer with chicken or beans for 4 hours.',
        routine: 'Plaza stroll and hot chocolate',
        ritualDetails: 'Visit the main square at dusk. Drink a cup of hot chocolate with cinnamon while listening to the local band play.',
        ritualImage: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?q=80&w=800',
        words: [
            { word: 'Hola', translation: 'Hello', image: 'https://images.unsplash.com/photo-1543702404-58b990924151?q=80&w=800' },
            { word: 'Gracias', translation: 'Thank you', image: 'https://images.unsplash.com/photo-1512418490979-92798ccc13b0?q=80&w=800' }
        ],
        languageSignificance: 'Spanish in Oaxaca is spoken with a rhythmic lilt, reflecting a blend of indigenous and colonial influences.',
        color: '#e63946',
        languageImage: 'https://images.unsplash.com/photo-1518104593124-ac2e82a5eb9d?q=80&w=800',
        artDescription: 'Alebrijes - vibrantly painted wood carvings of fantastical creatures.',
        visualImage: 'https://images.unsplash.com/photo-1518104593124-ac2e82a5eb9d?q=80&w=800'
    },
    {
        culture: 'Japan (Kyoto)',
        location: 'Gion District',
        avatar: '👨🏻',
        food: 'Ch Kaiseki',
        foodImage: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800',
        recipe: 'Balance seasonal flavors including a small clear soup, a seasonal fish dish, and a slow-cooked vegetable dish.',
        routine: 'Morning Zen Walk',
        ritualDetails: 'Walk through a temple garden in silence before the crowds arrive. Focus on the crunch of gravel underfoot.',
        ritualImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800',
        words: [
            { word: 'Konichiwa', translation: 'Hello', image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c6d?q=80&w=800' },
            { word: 'Arigato', translation: 'Thank you', image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=800' }
        ],
        languageSignificance: 'Keigo (polite speech) in Kyoto is an art form, emphasizing mutual respect and social harmony.',
        color: '#bc002d',
        languageImage: 'https://images.unsplash.com/photo-1528181304800-2f140819ad9c?q=80&w=800',
        artDescription: 'Ikebana - the meditative art of floral arrangement.',
        visualImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800'
    },
    {
        culture: 'Italy (Tuscany)',
        location: 'Val d\'Orcia',
        avatar: '👨🏼',
        food: 'Pappa al Pomodoro',
        foodImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800',
        recipe: 'Simmer stale bread with fresh tomatoes, garlic, basil, and plenty of extra virgin olive oil until it reaches a thick consistency.',
        routine: 'Evening Passeggiata',
        ritualDetails: 'Dress up slightly and take a slow stroll through the village cobblestone streets to see neighbors and enjoy the air.',
        ritualImage: 'https://images.unsplash.com/photo-1528114039593-4366cc08227d?q=80&w=800',
        words: [
            { word: 'Ciao', translation: 'Hi/Bye', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800' },
            { word: 'Grazie', translation: 'Thank you', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800' }
        ],
        languageSignificance: 'Tuscan Italian is known for its clarity and passion, often accompanied by expressive hand gestures.',
        color: '#008c45',
        languageImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800',
        artDescription: 'Renaissance Frescoes and marble sculpture.',
        visualImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800'
    }
];

const NAMES = ['Sofia', 'Kenji', 'Marco', 'Elena', 'Amara', 'Chen', 'Aleksei', 'Fatima', 'Liam', 'Zoe', 'Hans', 'Yuki', 'Suresh', 'Priya', 'Ahmed', 'Olga'];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing
        await CulturePartner.deleteMany({});
        console.log('Cleared existing partners.');

        const partners = [];
        
        // Generate a large pool (simulating the users request for variety)
        // We will generate 500 unique combinations for real use, but the loop can be expanded
        for (let i = 0; i < 500; i++) {
            const template = CULTURES[Math.floor(Math.random() * CULTURES.length)];
            const name = NAMES[Math.floor(Math.random() * NAMES.length)] + ' ' + (i + 1);
            
            // Randomize images slightly using different Unsplash IDs or random keywords
            // Unsplash random search: https://source.unsplash.com/featured/?keyword
            // Note: source.unsplash is deprecated, better to use unique URLs or a pool
            
            partners.push({
                ...template,
                name: name,
                created_at: new Date()
            });
        }

        await CulturePartner.insertMany(partners);
        console.log('Seeded 500 cultural partners successfully!');
        
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();
