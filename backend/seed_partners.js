import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const CulturePartnerSchema = new mongoose.Schema({
    name: String,
    culture: String,
    avatar: String,
    location: String,
    food: String,
    ingredients: [String],
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
        ingredients: ['Dried Chilies', 'Mexican Chocolate', 'Toasted Nuts', 'Warm Spices'],
        foodImage: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=800',
        recipe: 'Toast chilies until fragrant. Grind with chocolate, spices, and nuts. Simmer for hours.',
        routine: 'Plaza stroll and hot chocolate',
        ritualDetails: 'Visit the main square at dusk. Drink a cup of hot chocolate with cinnamon.',
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
        food: 'Cha-Kaiseki',
        ingredients: ['Seasonal Fish', 'Fresh Vegetables', 'Dashi Broth', 'Matcha'],
        foodImage: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800',
        recipe: 'Balance seasonal flavors: small clear soup, seasonal fish, and slow-cooked vegetables.',
        routine: 'Morning Zen Walk',
        ritualDetails: 'Walk through a temple garden in silence. Focus on the crunch of gravel underfoot.',
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
        culture: 'India (Rajasthan)',
        location: 'Jaisalmer (The Golden City)',
        avatar: '👨🏾',
        food: 'Ker Sangri with Bajra Roti',
        ingredients: ['Ker (Desert Beans)', 'Sangri Berries', 'Pearl Millet Flour', 'Amchur (Mango Powder)'],
        foodImage: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800',
        recipe: 'Sauté desert beans (Ker) and berries (Sangri) with dried mango and local spices. Serve with pearl millet flatbread.',
        routine: 'Sunset Folk Song',
        ritualDetails: 'Sit on the sand dunes as the sun sets. Hum a traditional Maand folk melody to welcome the cool desert night.',
        ritualImage: 'https://images.unsplash.com/photo-1524492715934-bda0972164bb?q=80&w=800',
        words: [
            { word: 'Khamma Ghani', translation: 'Royal Greetings', image: 'https://images.unsplash.com/photo-1598891001556-37bc237336ed?q=80&w=800' },
            { word: 'Padharo', translation: 'Please Welcome', image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=80&w=800' }
        ],
        languageSignificance: 'Marwari is a language of extreme hospitality, where every greeting is an invitation into one\'s home.',
        color: '#e67e22',
        languageImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800',
        artDescription: 'Mandana - geometric patterns painted on walls to ward off evil and welcome prosperity.',
        visualImage: 'https://images.unsplash.com/photo-1524222717473-7394c97bc56f?q=80&w=800'
    },
    {
        culture: 'Morocco (Marrakech)',
        location: 'Medina Quarter',
        avatar: '🧕🏼',
        food: 'Lamb Tagine with Prunes',
        ingredients: ['Lamb Shoulder', 'Saffron Threads', 'Dried Prunes', 'Toasted Almonds'],
        foodImage: 'https://images.unsplash.com/photo-1541518763669-27999881c1e0?q=80&w=800',
        recipe: 'Slow-cook lamb in a clay tagine with saffron, ginger, and honey. Add caramelized prunes and toasted almonds at the end.',
        routine: 'Mint Tea Ceremony',
        ritualDetails: 'Pour mint tea from a height to create froth. Drink three glasses: the first is bitter as life, second strong as love, third gentle as death.',
        ritualImage: 'https://images.unsplash.com/photo-1514749065261-d8ec96bd0d56?q=80&w=800',
        words: [
            { word: 'Salam', translation: 'Peace/Hello', image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=800' },
            { word: 'Chokran', translation: 'Thank you', image: 'https://images.unsplash.com/photo-1481349510224-44ce2b73bcbb?q=80&w=800' }
        ],
        languageSignificance: 'Darija is a beautiful mosaic of Arabic, Berber, and French, spoken with great warmth and expressive hands.',
        color: '#006d77',
        languageImage: 'https://images.unsplash.com/photo-1518481852452-9415b262eba4?q=80&w=800',
        artDescription: 'Zellij - intricate geometric tilework that reflects the mathematical beauty of the universe.',
        visualImage: 'https://images.unsplash.com/photo-1539665551699-2313507d9db3?q=80&w=800'
    },
    {
        culture: 'Greece (Santorini)',
        location: 'Oia Village',
        avatar: '👴🏼',
        food: 'Fava with Octopus',
        ingredients: ['Yellow Split Peas', 'Fresh Octopus', 'Wild Mountain Oregano', 'Extra Virgin Olive Oil'],
        foodImage: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=800',
        recipe: 'Puree yellow split peas with onions. Top with grilled octopus seasoned with wild mountain oregano and olive oil.',
        routine: 'Evening Kafenio',
        ritualDetails: 'Sit at the local café as the sun sets. Play a game of Tavli (backgammon) while sipping a strong Greek coffee.',
        ritualImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800',
        words: [
            { word: 'Yassas', translation: 'Health/Hello', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800' },
            { word: 'Efcharisto', translation: 'Thank you', image: 'https://images.unsplash.com/photo-1505506819647-681a4971072a?q=80&w=800' }
        ],
        languageSignificance: 'Greek is a language of history and philosophy. Even daily greetings often carry deeper meanings of health and well-being.',
        color: '#005f73',
        languageImage: 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=800',
        artDescription: 'Cycladic Art - minimalist white marble figurines emphasizing pure form and balance.',
        visualImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800'
    }
];

const NAMES = ['Sofia', 'Kenji', 'Arjun', 'Fatima', 'Yiannis', 'Mei', 'Lakshmi', 'Youssef', 'Eleni', 'Hiroshi', 'Amara', 'Mateo', 'Nisha', 'Omar', 'Katerina'];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing
        await CulturePartner.deleteMany({});
        console.log('Cleared existing partners.');

        const partners = [];

        // Generate a large pool with random combinations
        for (let i = 0; i < 100; i++) {
            const template = CULTURES[Math.floor(Math.random() * CULTURES.length)];
            const name = NAMES[Math.floor(Math.random() * NAMES.length)] + ' ' + (i + 1);

            partners.push({
                ...template,
                name: name,
                created_at: new Date()
            });
        }

        await CulturePartner.insertMany(partners);
        console.log(`Seeded ${partners.length} unique cultural partners across ${CULTURES.length} diverse cultures!`);

        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();
