import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const Event = mongoose.model('Event', new mongoose.Schema({}));
        const Post = mongoose.model('Post', new mongoose.Schema({}));

        const eventCount = await Event.countDocuments();
        const postCount = await Post.countDocuments();

        console.log(`Event count: ${eventCount}`);
        console.log(`Post count: ${postCount}`);

        const events = await Event.find().limit(5);
        console.log('Sample Events:', JSON.stringify(events, null, 2));

        const posts = await Post.find().limit(5);
        console.log('Sample Posts:', JSON.stringify(posts, null, 2));

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

check();
