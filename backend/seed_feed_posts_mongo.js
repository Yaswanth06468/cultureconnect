import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

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

const postsData = [
  { u: 'Rajesh_Kumar', img: 'https://images.unsplash.com/photo-1623512537256-43b9df0996a6?q=80&w=800', desc: 'Just arrived at the magnificent Mysore Palace! The architecture and sheer scale of this place never fail to amaze me. 🏰✨', tag: 'Architecture' },
  { u: 'Meera_Arts', img: 'https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?q=80&w=800', desc: 'Immersing myself in the beauty of traditional Indian handicrafts. Every piece tells a unique story passed down through generations. 🧵🎨', tag: 'Crafts' },
  { u: 'SpicyBites_Tokyo', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800', desc: 'A perfect bowl of Ramen in Shinjuku. The rich broth and perfectly cooked noodles are a cultural masterpiece. 🍜🇯🇵', tag: 'Food' },
  { u: 'Elena_Travels', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800', desc: 'Wandering the white and blue streets of Santorini. The Aegean sea breeze and the history echoing in the walls are breathtaking. 🇬🇷🌊', tag: 'Travel' },
  { u: 'AfricanSoul_Dance', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800', desc: 'Participated in a traditional Zulu dance workshop today. The rhythm of the drums completely possesses your spirit! 🥁💃🏿', tag: 'Dance' },
  { u: 'Nomad_Youssef', img: 'https://images.unsplash.com/photo-1539665551699-2313507d9db3?q=80&w=800', desc: 'A peaceful afternoon sipping mint tea in the Medina of Marrakech. The mosaic tiles (Zellij) here are mesmerizing. 🍵🇲🇦', tag: 'Lifestyle' },
  { u: 'Taco_Enthusiast', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800', desc: 'Street tacos Al Pastor in Mexico City. The pineapple adds the perfect sweetness to the savory pork. A true culinary gem! 🌮🇲🇽', tag: 'Food' },
  { u: 'HistoryNerd_UK', img: 'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?q=80&w=800', desc: 'Stonehenge at sunrise. Standing before these ancient monolithic structures makes you realize how deep human history runs. 🌅🗿', tag: 'History' },
  { u: 'Sangeet_Lover', img: 'https://images.unsplash.com/photo-1519652277465-d055a498a587?q=80&w=800', desc: 'Attended a mesmerizing Sitar performance. Indian classical music has a profound healing effect on the mind and soul. 🎶🪕', tag: 'Music' },
  { u: 'DesiStyle_Aura', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800', desc: 'The elegance of a Kanjeevaram silk saree is unmatched. Proudly embracing traditional Indian wear for today’s special occasion! 🥻✨', tag: 'Fashion' },
  // Adding more robust array of 40 more posts to hit 50
  { u: 'Kenji_Zen', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800', desc: 'Morning meditation at a Kyoto Zen garden. The meticulously raked gravel represents the ripples of water. Complete tranquility. ⛩️🌿', tag: 'Spirituality' },
  { u: 'Carlos_Samba', img: 'https://images.unsplash.com/photo-1581458920150-149b10a2bbcc?q=80&w=800', desc: 'Rio Carnival preparations are underway! The colors, the feathers, and the infectious energy of Samba are everywhere. 🇧🇷🎉', tag: 'Festivals' },
  { u: 'FrenchBaker_Pierre', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800', desc: 'Baking the perfect croissant is an art form. The lamination process takes hours, but the flaky butter crust is worth it. 🥐🇫🇷', tag: 'Food' },
  { u: 'Ganga_Travels', img: 'https://images.unsplash.com/photo-1571536802807-3cab473954eb?q=80&w=800', desc: 'The evening Aarti at Varanasi. The spiritual energy in the air, the chanting, and the glowing diyas on the river are pure magic. 🪔🙏', tag: 'Spirituality' },
  { u: 'Liam_Highlands', img: 'https://images.unsplash.com/photo-1580129994640-5a331dd13da4?q=80&w=800', desc: 'Hiking the Scottish Highlands. The mist rolling over the green hills feels straight out of an old Celtic myth. 🏴󠁧󠁢󠁳󠁣󠁴󠁿⛰️', tag: 'Nature' },
  { u: 'Anna_Matryoshka', img: 'https://images.unsplash.com/photo-1587324545638-b7a421ef7d05?q=80&w=800', desc: 'Painting Matryoshka dolls with my grandmother in Moscow. Protecting this folk art tradition is so important to our family. 🪆🇷🇺', tag: 'Crafts' },
  { u: 'Pasta_Nonna', img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800', desc: 'Making fresh tagliatelle by hand in Bologna. The secret is type 00 flour, fresh eggs, and a lot of love. 🍝🇮🇹', tag: 'Food' },
  { u: 'Rasta_Vibes', img: 'https://images.unsplash.com/photo-1516057747705-0609711c1b31?q=80&w=800', desc: 'Jamming to authentic Reggae beats on the beaches of Kingston. The rhythm connects directly to the heart. 🇯🇲🎵', tag: 'Music' },
  { u: 'Wei_Calligraphy', img: 'https://images.unsplash.com/photo-1563212040-fb97782daed3?q=80&w=800', desc: 'Practicing Chinese calligraphy. It’s not just writing; it’s a breathing exercise and meditation focused entirely on flow. 🖌️🇨🇳', tag: 'Arts' },
  { u: 'Hassan_Bazaar', img: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800', desc: 'Navigating the vibrant Grand Bazaar in Istanbul. The scent of spices, the colorful lamps, and the energetic haggling! 🇹🇷🏬', tag: 'Lifestyle' },
  { u: 'Kim_Hanbok', img: 'https://images.unsplash.com/photo-1580974582391-a6649c82a85f?q=80&w=800', desc: 'Wearing a traditional Hanbok for Chuseok. The vibrant colors and elegant lines always make me feel connected to my ancestors. 👗🇰🇷', tag: 'Fashion' },
  { u: 'Aussie_Explorer', img: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800', desc: 'Learning about Aboriginal Dreamtime stories near Uluru. It completely changes how you perceive the land and the stars. 🇦🇺🌌', tag: 'Heritage' },
  { u: 'Pho_Lover', img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?q=80&w=800', desc: 'A steaming bowl of Pho in Hanoi just hits different. The bone broth takes over 12 hours to simmer to perfection. 🍲🇻🇳', tag: 'Food' },
  { u: 'Maria_Flamenco', img: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4ea7c?q=80&w=800', desc: 'The passion of Flamenco guitar fills the streets of Seville. You don’t just hear it, you feel it in your chest. 🎸🇪🇸', tag: 'Music' },
  { u: 'Norse_Saga', img: 'https://images.unsplash.com/photo-1513000676643-f66d4f40d122?q=80&w=800', desc: 'Sailing through the Norwegian fjords. Looking at these massive cliffs, it’s easy to see how Viking myths were born here. 🚢🇳🇴', tag: 'Travel' },
  { u: 'Dancer_Ananya', img: 'https://images.unsplash.com/photo-1542289410-d021c33f2cc2?q=80&w=800', desc: 'Refining the Tribhangi posture. The grace of Odissi requires immense dedication, but performing it feels like connecting with the divine. 💃🇮🇳', tag: 'Dance' },
  { u: 'Festive_Vibes', img: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800', desc: 'Colors of Holi bringing everyone together in joy! Such a beautiful celebration of spring, love, and new beginnings. 🎨🎉', tag: 'Festivals' },
  { u: 'Ali_Desert', img: 'https://images.unsplash.com/photo-1541818276632-1b15c9ff80cd?q=80&w=800', desc: 'Trekking through the Sahara with Bedouin guides. Sleeping under a blanket of unpolluted stars is a spiritual reboot. 🐪🌍', tag: 'Nature' },
  { u: 'Swiss_Choco', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800', desc: 'Learning the delicate tempering process at a Swiss chocolate factory. The smooth, shiny finish requires exact temperatures! 🍫🇨🇭', tag: 'Food' },
  { u: 'Maya_Ruins', img: 'https://images.unsplash.com/photo-1518182170546-076616fd61fd?q=80&w=800', desc: 'Staring at the pyramid of Chichen Itza. The mathematical precision of ancient Mayan astronomers is still mind-blowing today. 🏛️🇲🇽', tag: 'History' },
  { u: 'Thida_Lanterns', img: 'https://images.unsplash.com/photo-1516086701192-23c21ad9ce73?q=80&w=800', desc: 'Releasing lanterns at the Yi Peng festival in Chiang Mai. Seeing thousands of warm lights ascend into the night sky brings tears to my eyes. 🏮🇹🇭', tag: 'Festivals' },
  { u: 'Poutine_King', img: 'https://images.unsplash.com/photo-1586805608485-add336722759?q=80&w=800', desc: 'True Quebecois Poutine must have squeaky cheese curds. It’s the ultimate comfort food during a freezing Canadian winter. 🍟🇨🇦', tag: 'Food' },
  { u: 'Kofi_Weaver', img: 'https://images.unsplash.com/photo-1590499695420-53bcba9ec44c?q=80&w=800', desc: 'Weaving traditional Kente cloth in Ghana. Every color and pattern woven onto the loom holds a specific proverb or meaning. 🧶🇬🇭', tag: 'Crafts' },
  { u: 'Dublin_Pubs', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800', desc: 'A lively trad music session inside an old Dublin pub. Fiddles, bodhráns, and pints of stout—pure Irish craic! 🎻🇮🇪', tag: 'Culture' },
  { u: 'Anya_Borscht', img: 'https://images.unsplash.com/photo-1543340904-8e1ce23136a8?q=80&w=800', desc: 'A rich, ruby-red bowl of homemade Ukrainian Borscht served with a dollop of sour cream. The ultimate winter warmer! 🍲🇺🇦', tag: 'Food' },
  { u: 'Aloha_Surfer', img: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800', desc: 'Riding the waves at Waikiki. Surfing isn’t just a sport here, it’s a deep spiritual connection to the ocean known as He’e Nalu. 🏄🏽‍♂️🌺', tag: 'Lifestyle' },
  { u: 'Bavarian_Cheers', img: 'https://images.unsplash.com/photo-1538600072049-550ffdae0049?q=80&w=800', desc: 'Prost! Enjoying the vibrant atmosphere in a Munich beer garden wearing my traditional Lederhosen. 🥨🇩🇪', tag: 'Festivals' },
  { u: 'Llama_Trekker', img: 'https://images.unsplash.com/photo-1526392060635-9d601986427a?q=80&w=800', desc: 'Reaching Machu Picchu at dawn. The terraced mountains built by the Incas showcase breathtaking harmony between man and nature. 🦙🇵🇪', tag: 'Travel' },
  { u: 'Tapas_Tonight', img: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=800', desc: 'Hopping between Tapas bars in Madrid. Sharing small plates of patatas bravas and jamón builds such a sense of community. 🥖🇪🇸', tag: 'Food' },
  { u: 'Maori_Haka', img: 'https://images.unsplash.com/photo-1507608149870-7694f4886bca?q=80&w=800', desc: 'Witnessing a powerful Haka performance in Rotorua. The fierce expressions and coordinated strikes vibrate right through you. 🇳🇿⚔️', tag: 'Heritage' },
  { u: 'Noodles_Beijing', img: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800', desc: 'Watching a master chef hand-pull Zhajiangmian noodles in Beijing. It requires years of practice to stretch the dough so thinly! 🍜🇨🇳', tag: 'Food' },
  { u: 'Sari_Weaver_IN', img: 'https://images.unsplash.com/photo-1605652599602-0e4a78120bde?q=80&w=800', desc: 'Exploring the intricate handloom silk weaving process in Varanasi. This ancestral labor produces the finest textiles in the world. 🧵🇮🇳', tag: 'Crafts' },
  { u: 'Tango_Buenos_Aires', img: 'https://images.unsplash.com/photo-1504609774590-b183636f3d1b?q=80&w=800', desc: 'The passion of street Tango in La Boca. It is a beautiful, melancholic dance that tells the history of Argentine immigrants. 💃🏽🇦🇷', tag: 'Dance' },
  { u: 'Grizzly_Nature', img: 'https://images.unsplash.com/photo-1506744626753-143d4c8dbd07?q=80&w=800', desc: 'Watching the Northern Lights dance across the sky in Iceland. Nature’s most spectacular, wordless cultural event. 🌌🇮🇸', tag: 'Nature' },
  { u: 'Souk_Spices', img: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800', desc: 'The explosion of colors inside a spice souk in Dubai. Buying fresh saffron, cardamom, and zaatar to take home! 🌶️🇦🇪', tag: 'Food' },
  { u: 'StreetFoodie_BKK', img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800', desc: 'Fresh Pad Thai cooked right on a fiery wok from a street vendor in Bangkok. Best cheap meal on the planet. 🇹🇭🔥', tag: 'Food' },
  { u: 'Petra_Explorer', img: 'https://images.unsplash.com/photo-1501233069-b5ae6b0c20ab?q=80&w=800', desc: 'Walking through the Siq to finally see the Treasury in Petra, Jordan. The Nabatean rock-cut architecture is truly a wonder. 🏛️🇯🇴', tag: 'History' },
  { u: 'Matcha_Ceremony', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800', desc: 'Participating in Chado, the Japanese Way of Tea. Every subtle movement, from whisking to turning the bowl, represents mindfulness. 🍵🇯🇵', tag: 'Lifestyle' },
  { u: 'Safari_Kenya', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800', desc: 'Meeting the Maasai warriors in Kenya and learning about their sustainable lifestyle harmonizing with the incredible wildlife. 🦁🇰🇪', tag: 'Heritage' },
  { u: 'Gondola_Venice', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800', desc: 'Gliding down the quiet canals of Venice. The romantic songs of the gondolier echo off the ancient brick palazzos. 🛶🇮🇹', tag: 'Travel' }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB.');

        // Drop old posts to start fresh with 40 solid ones
        await Post.deleteMany({});
        console.log('Cleared old posts');

        const docs = postsData.map(p => ({
            username: p.u,
            image_url: p.img,
            description: p.desc,
            tag: p.tag,
            created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)), // Random date in past months
            likes: [] // Empty likes for now
        }));

        await Post.insertMany(docs);
        console.log(`Successfully seeded ${docs.length} diverse cultural feed posts!`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
