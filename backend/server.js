import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_culture_jwt_key_123';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Health Check / Ping
app.get('/ping', (req, res) => res.json({ status: 'working like that' }));
app.get('/api/ping', (req, res) => res.json({ status: 'waking up' }));
app.get('/', (req, res) => res.send('Culture-Connect API is live! v2'));
app.get('/health', (req, res) => res.status(200).send('OK'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Successfully connected to MongoDB Atlas!'))
    .catch(err => {
        console.error('MongoDB Atlas connection error details:');
        console.error(err);
        process.exit(1); // Stop server if database is not reachable, to avoid 500 errors in routes later
    });

// Schemas
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

const PostSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    image_url: String,
    description: String,
    tag: String,
    created_at: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
PostSchema.set('toJSON', { virtuals: true });
PostSchema.virtual('id').get(function() { return this._id.toHexString(); });
const Post = mongoose.model('Post', PostSchema);

const CommentSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    text: String,
    created_at: { type: Date, default: Date.now }
});
CommentSchema.set('toJSON', { virtuals: true });
CommentSchema.virtual('id').get(function() { return this._id.toHexString(); });
const Comment = mongoose.model('Comment', CommentSchema);

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
EventSchema.set('toJSON', { virtuals: true });
EventSchema.virtual('id').get(function() { return this._id.toHexString(); });
const Event = mongoose.model('Event', EventSchema);

const BookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    event_title: String,
    tickets: { type: Number, default: 1 },
    total_price: { type: Number, default: 0 },
    name: String,
    email: String,
    phone: String,
    status: { type: String, default: 'confirmed' },
    created_at: { type: Date, default: Date.now }
});
BookingSchema.set('toJSON', { virtuals: true });
BookingSchema.virtual('id').get(function() { return this._id.toHexString(); });
const Booking = mongoose.model('Booking', BookingSchema);

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

// Multer Storage
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        if (user.role !== 'admin') return res.status(403).json({ error: 'Requires admin privileges' });
        req.user = user;
        next();
    });
}

// Routes
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ id: 'admin', username: 'ADMIN', role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
        res.json({ message: 'Admin login successful', token, username: 'ADMIN', role: 'admin' });
    } else {
        res.status(401).json({ error: 'Invalid admin credentials' });
    }
});

app.post('/api/auth/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Signup error:', err);
        if (err.code === 11000) return res.status(409).json({ error: 'Username already exists' });
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, username: user.username });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ created_at: -1 }).lean();
        const results = await Promise.all(posts.map(async p => {
            const comment_count = await Comment.countDocuments({ post_id: p._id });
            return { ...p, id: p._id.toString(), like_count: p.likes.length, comment_count };
        }));
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.post('/api/posts', authenticateToken, upload.single('image'), async (req, res) => {
    const { description, tag } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    if (!imageUrl || !description) return res.status(400).json({ error: 'Image and description are required' });
    try {
        const newPost = new Post({ user_id: req.user.id, username: req.user.username, image_url: imageUrl, description, tagValue: tag || 'General' }); // Changed property name to tagValue internally if tag is special but here we keep tag or tagValue
        newPost.tag = tag || 'General';
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

app.post('/api/posts/:id/like', authenticateToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        const index = post.likes.indexOf(req.user.id);
        if (index > -1) {
            post.likes.splice(index, 1);
            await post.save();
            res.json({ message: 'Post unliked', liked: false });
        } else {
            post.likes.push(req.user.id);
            await post.save();
            res.json({ message: 'Post liked', liked: true });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to toggle like' });
    }
});

app.get('/api/posts/:id/comments', async (req, res) => {
    try {
        const comments = await Comment.find({ post_id: req.params.id }).sort({ created_at: 1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

app.post('/api/posts/:id/comments', authenticateToken, async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Comment text is required' });
    try {
        const newComment = new Comment({ post_id: req.params.id, user_id: req.user.id, username: req.user.username, text });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

app.get('/api/users/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).lean();
        if (!user) return res.status(404).json({ error: 'User not found' });
        const posts = await Post.find({ user_id: user._id }).sort({ created_at: -1 }).lean();
        const results = await Promise.all(posts.map(async p => {
            const comment_count = await Comment.countDocuments({ post_id: p._id });
            return { ...p, id: p._id.toString(), like_count: p.likes.length, comment_count };
        }));
        res.json({ user: { ...user, id: user._id.toString() }, posts: results });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
});

app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

app.post('/api/events', authenticateToken, async (req, res) => {
    const { title, date, location, description, category, price, language, image_url } = req.body;
    if (!title || !date || !location || !description) return res.status(400).json({ error: 'All fields are required' });
    try {
        const newEvent = new Event({ user_id: req.user.id, username: req.user.username, title, date, location, description, category, price, language, image_url });
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create event' });
    }
});

app.delete('/api/admin/posts/:id', authenticateAdmin, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        if (post.image_url) {
            const imagePath = path.join(process.cwd(), post.image_url.replace(/^\//, ''));
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }
        await Comment.deleteMany({ post_id: req.params.id });
        res.json({ message: 'Post and associated data deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

app.delete('/api/admin/users/:id', authenticateAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        const userPosts = await Post.find({ user_id: req.params.id });
        for (const post of userPosts) {
            if (post.image_url) {
                const imagePath = path.join(process.cwd(), post.image_url.replace(/^\//, ''));
                if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
            }
            await Post.findByIdAndDelete(post._id);
            await Comment.deleteMany({ post_id: post._id });
        }
        await Booking.deleteMany({ user_id: req.params.id });
        await Event.deleteMany({ user_id: req.params.id });
        res.json({ message: 'User and all associated data deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

app.delete('/api/admin/comments/:id', authenticateAdmin, async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

app.delete('/api/admin/events/:id', authenticateAdmin, async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

app.post('/api/events/:id/book', authenticateToken, async (req, res) => {
    const { tickets, name, email, phone } = req.body;
    if (!name || !email || !phone || !tickets) return res.status(400).json({ error: 'All fields are required' });
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        const totalPrice = (event.price || 0) * tickets;
        const newBooking = new Booking({ user_id: req.user.id, username: req.user.username, event_id: req.params.id, event_title: event.title, tickets, total_price: totalPrice, name, email, phone });
        await newBooking.save();
        res.status(201).json({ message: 'Booking confirmed!', booking: newBooking });
    } catch (err) {
        res.status(500).json({ error: 'Booking failed' });
    }
});

app.get('/api/bookings', authenticateToken, async (req, res) => {
    try {
        const bookings = await Booking.find({ user_id: req.user.id }).sort({ created_at: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

app.get('/api/culture-swap/random', async (req, res) => {
    try {
        const excludeIds = req.query.exclude ? req.query.exclude.split(',').filter(id => id.trim()) : [];
        const query = excludeIds.length > 0 ? { _id: { $nin: excludeIds } } : {};
        const count = await CulturePartner.countDocuments(query);
        if (count === 0) return res.status(404).json({ error: 'No cultural partners found' });
        const random = Math.floor(Math.random() * count);
        const partner = await CulturePartner.findOne(query).skip(random);
        res.json(partner);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch random partner' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
