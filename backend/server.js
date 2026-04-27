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
import nodemailer from 'nodemailer';

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
        process.exit(1); 
    });

// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify email configuration
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter.verify((error, success) => {
        if (!error) console.log('Email server ready');
    });
}

// Schemas
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

const LoginLogSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, required: true },
    ip: String,
    userAgent: String,
    loginAt: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false }
});
const LoginLog = mongoose.model('LoginLog', LoginLogSchema);

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
    bio: String,
    interests: [String],
    profilePhoto: String,
    verified: { type: Boolean, default: false },
    country: String,
    age: Number,
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

const StatsSchema = new mongoose.Schema({
    totalSwaps: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
});
const Stats = mongoose.model('Stats', StatsSchema);

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
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ id: 'admin', username: 'ADMIN', role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
        // Log admin login
        try {
            await new LoginLog({
                username: 'ADMIN',
                ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown',
                userAgent: req.headers['user-agent'] || 'unknown',
                isAdmin: true
            }).save();
        } catch (e) { /* non-critical */ }
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
        // Log user login
        try {
            await new LoginLog({
                user_id: user._id,
                username: user.username,
                ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown',
                userAgent: req.headers['user-agent'] || 'unknown',
                isAdmin: false
            }).save();
        } catch (e) { /* non-critical */ }
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
        const newPost = new Post({ user_id: req.user.id, username: req.user.username, image_url: imageUrl, description, tag: tag || 'General' });
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
        } else {
            post.likes.push(req.user.id);
        }
        await post.save();
        res.json({ message: 'Like toggled', liked: index === -1 });
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
        if (post?.image_url) {
            const imagePath = path.join(process.cwd(), post.image_url.replace(/^\//, ''));
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }
        await Comment.deleteMany({ post_id: req.params.id });
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Deletion failed' });
    }
});

// ========== ADMIN DASHBOARD ENDPOINTS ==========

// Get all users
app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 }).lean();
        const usersWithStats = await Promise.all(users.map(async (u) => {
            const postCount = await Post.countDocuments({ user_id: u._id });
            const commentCount = await Comment.countDocuments({ user_id: u._id });
            const bookingCount = await Booking.countDocuments({ user_id: u._id });
            const lastLogin = await LoginLog.findOne({ user_id: u._id }).sort({ loginAt: -1 }).lean();
            return {
                ...u,
                id: u._id.toString(),
                postCount,
                commentCount,
                bookingCount,
                lastLogin: lastLogin ? lastLogin.loginAt : null
            };
        }));
        res.json(usersWithStats);
    } catch (err) {
        console.error('Admin users error:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Get login logs
app.get('/api/admin/login-logs', authenticateAdmin, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const logs = await LoginLog.find().sort({ loginAt: -1 }).limit(limit).lean();
        res.json(logs);
    } catch (err) {
        console.error('Admin login-logs error:', err);
        res.status(500).json({ error: 'Failed to fetch login logs' });
    }
});

// Get dashboard stats
app.get('/api/admin/dashboard-stats', authenticateAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalPosts = await Post.countDocuments();
        const totalComments = await Comment.countDocuments();
        const totalEvents = await Event.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const totalLogins = await LoginLog.countDocuments();

        // Last 7 days signups
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const recentSignups = await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } });
        const recentLogins = await LoginLog.countDocuments({ loginAt: { $gte: sevenDaysAgo } });

        // Last 30 days daily login counts for chart
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const dailyLogins = await LoginLog.aggregate([
            { $match: { loginAt: { $gte: thirtyDaysAgo } } },
            { $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$loginAt' } },
                count: { $sum: 1 }
            }},
            { $sort: { _id: 1 } }
        ]);

        // Daily signups for chart
        const dailySignups = await User.aggregate([
            { $match: { createdAt: { $gte: thirtyDaysAgo } } },
            { $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                count: { $sum: 1 }
            }},
            { $sort: { _id: 1 } }
        ]);

        res.json({
            totalUsers,
            totalPosts,
            totalComments,
            totalEvents,
            totalBookings,
            totalLogins,
            recentSignups,
            recentLogins,
            dailyLogins,
            dailySignups
        });
    } catch (err) {
        console.error('Admin dashboard-stats error:', err);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
});

// Delete a user (admin)
app.delete('/api/admin/users/:id', authenticateAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        // Clean up user's content
        await Post.deleteMany({ user_id: req.params.id });
        await Comment.deleteMany({ user_id: req.params.id });
        await Booking.deleteMany({ user_id: req.params.id });
        await LoginLog.deleteMany({ user_id: req.params.id });
        res.json({ message: `User ${user.username} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

app.get('/api/culture-swap/random', async (req, res) => {
    try {
        const excludeIds = req.query.exclude ? req.query.exclude.split(',').filter(id => id.trim()) : [];
        const userCulture = req.query.userCulture ? req.query.userCulture.trim() : '';
        const query = {};
        if (excludeIds.length > 0) {
            query._id = { $nin: excludeIds };
        }
        // Exclude partners from the same culture as the user
        if (userCulture) {
            query.culture = { $not: new RegExp(userCulture.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') };
        }
        const count = await CulturePartner.countDocuments(query);
        if (count === 0) return res.status(404).json({ error: 'No cultural partners found from a different culture' });
        const random = Math.floor(Math.random() * count);
        const partner = await CulturePartner.findOne(query).skip(random);
        res.json(partner);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch partner' });
    }
});

// Get all distinct cultures for the culture selector
app.get('/api/culture-swap/cultures', async (req, res) => {
    try {
        const cultures = await CulturePartner.distinct('culture');
        res.json(cultures);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cultures' });
    }
});

app.get('/api/culture-swap/stats', async (req, res) => {
    try {
        let stats = await Stats.findOne();
        if (!stats) {
            stats = new Stats({ totalSwaps: 0 });
            await stats.save();
        }
        res.json({ totalSwaps: stats.totalSwaps });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

app.post('/api/culture-swap/increment', async (req, res) => {
    try {
        let stats = await Stats.findOne();
        if (!stats) {
            stats = new Stats({ totalSwaps: 1 });
        } else {
            stats.totalSwaps += 1;
            stats.lastUpdated = Date.now();
        }
        await stats.save();
        res.json({ totalSwaps: stats.totalSwaps });
    } catch (err) {
        res.status(500).json({ error: 'Failed to increment stats' });
    }
});

app.get('/api/track-visit', (req, res) => {
    const userEmail = 'yaswanthkumar0567@gmail.com';
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: '🚀 Site Visit Notification',
        text: `Someone visited your site at ${new Date().toLocaleString()}`,
        html: `<h1>🚀 Site Visit!</h1><p>Someone visited at ${new Date().toLocaleString()}</p>`
    };
    transporter.sendMail(mailOptions);
    res.json({ message: 'Visit tracked' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
