import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function seed() {
    const dbPath = path.resolve('c:/Users/kumar/projects/Culture-connect/backend/users.db');
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    await db.run('DELETE FROM events');
    
    const events = [
      // Music Shows (5)
      { title: 'Calvin Harris Tour', category: 'Music Shows', date: '2026-04-10', location: 'Bangalore', description: 'Experience the electronic music giant Calvin Harris live.', price: 2999, language: 'English' },
      { title: 'Scorpions Rock Tour', category: 'Music Shows', date: '2026-04-20', location: 'Mumbai', description: 'Legendary rock band Scorpions live in India.', price: 4500, language: 'English' },
      { title: 'Kanye West Ye Tour', category: 'Music Shows', date: '2026-05-15', location: 'New Delhi', description: 'Hip-hop icon Kanye West performs his highly anticipated tour.', price: 5000, language: 'English' },
      { title: 'Anyma AEDEN Tour', category: 'Music Shows', date: '2026-11-10', location: 'Mumbai', description: 'Immersive visual and auditory electronic experience by Anyma.', price: 3500, language: 'English' },
      { title: 'Ziro Festival of Music', category: 'Music Shows', date: '2026-09-26', location: 'Arunachal Pradesh', description: 'India\'s greatest outdoor indie music festival.', price: 2000, language: 'English/Hindi' },

      // Dance & Performances (5)
      { title: 'Khajuraho Dance Festival', category: 'Dance & Performances', date: '2026-02-20', location: 'Khajuraho', description: 'A celebration of Indian classical dance against historic temples.', price: 500, language: 'Hindi' },
      { title: 'Mamallapuram Dance Festival', category: 'Dance & Performances', date: '2026-12-25', location: 'Tamil Nadu', description: 'Open-air classical and folk dance performances near Shore Temple.', price: 300, language: 'Tamil' },
      { title: 'Chennai Music & Dance Season', category: 'Dance & Performances', date: '2026-12-15', location: 'Chennai', description: 'World\'s largest cultural festival featuring Carnatic music and Bharatanatyam.', price: 600, language: 'Tamil/English' },
      { title: 'Rann Utsav Cultural Performances', category: 'Dance & Performances', date: '2026-11-01', location: 'Kutch', description: 'Folk music and traditional dances in the white salt desert.', price: 800, language: 'Gujarati/Hindi' },
      { title: 'NCPA Monsoon Dance Festival', category: 'Dance & Performances', date: '2026-07-15', location: 'Mumbai', description: 'Showcasing traditional dance forms during the Indian monsoons.', price: 400, language: 'Hindi' },

      // Workshops (5)
      { title: 'Pottery Workshop at Sukoon', category: 'Workshops', date: '2026-04-25', location: 'Hyderabad', description: 'Learn hand-building and wheel-throwing techniques.', price: 499, language: 'English' },
      { title: 'Madhubani Art Masterclass', category: 'Workshops', date: '2026-04-28', location: 'Patna', description: 'Learn the intricate motifs of Mithila painting.', price: 799, language: 'Hindi' },
      { title: 'Classical Sitar Basics', category: 'Workshops', date: '2026-05-02', location: 'Pune', description: 'Introduction to string instruments and ancient ragas.', price: 1500, language: 'English/Hindi' },
      { title: 'Ayurvedic Cooking Arts', category: 'Workshops', date: '2026-05-05', location: 'Mysore', description: 'Discover the balance of doshas through spices and herbs.', price: 900, language: 'English' },
      { title: 'Kalaripayattu Martial Arts Intro', category: 'Workshops', date: '2026-05-10', location: 'Trivandrum', description: 'Learn the basics of the oldest surviving martial art.', price: 400, language: 'Malayalam' },

      // Comedy Shows (5)
      { title: 'Anubhav Singh Bassi Tour', category: 'Comedy Shows', date: '2026-05-10', location: 'Mumbai', description: 'Hilarious storytelling by Anubhav Singh Bassi.', price: 999, language: 'Hindi' },
      { title: 'Abhishek Upmanyu Solo', category: 'Comedy Shows', date: '2026-05-15', location: 'Delhi', description: 'Unfiltered observational comedy by Abhishek Upmanyu.', price: 1200, language: 'Hindi' },
      { title: 'Zakir Khan Live', category: 'Comedy Shows', date: '2026-05-20', location: 'Bangalore', description: 'The Sakht Launda brings his poetic comedy live.', price: 1500, language: 'Hindi/Urdu' },
      { title: 'Samay Raina Standup', category: 'Comedy Shows', date: '2026-05-25', location: 'Pune', description: 'Dark humor and witty punchlines by Samay Raina.', price: 899, language: 'Hindi/English' },
      { title: 'Gaurav Kapoor Live', category: 'Comedy Shows', date: '2026-06-01', location: 'Hyderabad', description: 'Relatable middle-class stories and crowd work.', price: 799, language: 'Hindi' },

      // Exhibitions (5)
      { title: 'Auto Expo 2026', category: 'Exhibitions', date: '2026-01-14', location: 'Greater Noida', description: 'Asia\'s largest automotive show featuring future mobility.', price: 500, language: 'English/Hindi' },
      { title: 'India Art Fair 2026', category: 'Exhibitions', date: '2026-02-05', location: 'New Delhi', description: 'South Asia\'s leading platform for modern and contemporary art.', price: 800, language: 'English' },
      { title: 'Comic Con India', category: 'Exhibitions', date: '2026-11-15', location: 'Bangalore', description: 'The greatest pop-culture experience in the subcontinent.', price: 1000, language: 'English' },
      { title: 'India International Trade Fair', category: 'Exhibitions', date: '2026-11-14', location: 'Delhi', description: 'Massive B2B and B2C multi-product exhibition at Pragati Maidan.', price: 150, language: 'English/Hindi' },
      { title: 'Mughal Heritage Artifacts Expo', category: 'Exhibitions', date: '2026-04-20', location: 'Agra', description: 'Rare manuscripts and jewelry from the era.', price: 100, language: 'English' },

      // Spirituality & Wellness (5)
      { title: 'Himalayan Yoga Retreat', category: 'Spirituality & Wellness', date: '2026-05-01', location: 'Rishikesh', description: 'A rejuvenating week of traditional asanas and meditation.', price: 15000, language: 'English' },
      { title: 'Kerala Ayurveda Panchakarma', category: 'Spirituality & Wellness', date: '2026-06-15', location: 'Kerala', description: 'Deep tissue detox and healing with traditional Ayurveda.', price: 25000, language: 'English/Malayalam' },
      { title: 'Vipassana Silent Meditation', category: 'Spirituality & Wellness', date: '2026-07-10', location: 'Dharamshala', description: '10-day silent inner journey to profound peace.', price: 0, language: 'Hindi/English' },
      { title: 'Osho Ashram Inner Peace', category: 'Spirituality & Wellness', date: '2026-08-05', location: 'Pune', description: 'Dynamic meditation techniques and soulful gatherings.', price: 4000, language: 'English' },
      { title: 'Isha Yoga Inner Engineering', category: 'Spirituality & Wellness', date: '2026-09-20', location: 'Coimbatore', description: 'Tools to engineer inner joy and wellbeing.', price: 3000, language: 'English/Tamil' },

      // Meetups (5)
      { title: 'Indian Literature Book Club', category: 'Meetups', date: '2026-04-18', location: 'Delhi', description: 'Discussing contemporary Indian authors and poets.', price: 0, language: 'English/Hindi' },
      { title: 'Regional Filmmakers Mixer', category: 'Meetups', date: '2026-04-25', location: 'Hyderabad', description: 'Networking event for indie directors and writers.', price: 150, language: 'Telugu/English' },
      { title: 'Heritage Walk - Old City', category: 'Meetups', date: '2026-05-02', location: 'Ahmedabad', description: 'Weekend heritage walk exploring ancient pols.', price: 200, language: 'Gujarati/Hindi' },
      { title: 'Tech Founders Connect', category: 'Meetups', date: '2026-05-10', location: 'Bangalore', description: 'A support and networking group for tech startup founders.', price: 300, language: 'English' },
      { title: 'Culinary Enthusiasts Potluck', category: 'Meetups', date: '2026-05-15', location: 'Kolkata', description: 'Bring your family\'s secret recipe dish to share!', price: 0, language: 'Bengali/English' }
    ];

    for (const ev of events) {
      const exists = await db.get('SELECT id FROM events WHERE title = ?', [ev.title]);
      if (!exists) {
         await db.run(
           'INSERT INTO events (user_id, title, date, location, description, username, category, price, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
           [1, ev.title, ev.date, ev.location, ev.description, 'BookMyShow', ev.category, ev.price, ev.language]
         );
      }
    }
    
    // Feed Posts
    const posts = [
      { username: 'Aarav123', image_url: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80', description: 'Just witnessed the most mesmerizing sunset at the Ghats of Varanasi. The spiritual energy here is unexplainable! 🌺✨', tag: 'Spirituality' },
      { username: 'Priya_Dances', image_url: 'https://images.unsplash.com/photo-1583120614539-715af8f13b19?auto=format&fit=crop&q=80', description: 'Backstage before our Odissi performance tonight! The heavy jewelry is worth it for the art. #CulturalDance #Odissi', tag: 'Dance' },
      { username: 'FoodieTraveller', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&q=80', description: 'Nothing beats authentic South Indian filter coffee in a traditional steel tumbler on a rainy morning. ☕🌧️', tag: 'Food' },
      { username: 'CultureConnect_Official', image_url: 'https://images.unsplash.com/photo-1605333190886-0ac3777d13eb?auto=format&fit=crop&q=80', description: 'ANNOUNCEMENT: The grand cultural fest is happening next month in Jaipur! Book your tickets early on our Events Board. 🎉🎟️', tag: 'Announcement' },
      { username: 'Rohan_Clicks', image_url: 'https://images.unsplash.com/photo-1564507592227-0b0f5c06a33f?auto=format&fit=crop&q=80', description: 'The incredible architecture of Hampi. It feels like stepping right into the 14th century Vijayanagara Empire! 🏛️', tag: 'Architecture' }
    ];

    for (const p of posts) {
      const exists = await db.get('SELECT id FROM posts WHERE description = ?', [p.description]);
      if (!exists) {
         await db.run(
           'INSERT INTO posts (user_id, username, image_url, description, tag) VALUES (?, ?, ?, ?, ?)',
           [1, p.username, p.image_url, p.description, p.tag]
         );
      }
    }

    await db.close();
    console.log('Seed 3 complete.');
}
seed().catch(console.error);
