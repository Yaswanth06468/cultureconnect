import express from 'express';
import Place from '../models/Place.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_culture_jwt_key_123';

// Admin authentication middleware
function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
        if (user.role !== 'admin') return res.status(403).json({ error: 'Requires administrator privileges.' });
        req.user = user;
        next();
    });
}

// GET /api/places - Get places with optional city, category, search filters
router.get('/', async (req, res) => {
    try {
        const { city, category, search, limit, state } = req.query;
        const query = {};

        if (city && city !== 'All') {
            query.city = { $regex: new RegExp(`^${city.trim()}$`, 'i') };
        }

        if (state && state !== 'All') {
            query.state = { $regex: new RegExp(`^${state.trim()}$`, 'i') };
        }

        if (category && category !== 'All') {
            query.category = { $regex: new RegExp(`^${category.trim()}$`, 'i') };
        }

        if (search && search.trim()) {
            const cleanSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const searchRegex = new RegExp(cleanSearch, 'i');
            query.$or = [
                { name: searchRegex },
                { city: searchRegex },
                { state: searchRegex },
                { category: searchRegex },
                { tags: searchRegex },
                { shortDescription: searchRegex },
                { famousFor: searchRegex }
            ];
        }

        const maxLimit = parseInt(limit) || 100;
        const places = await Place.find(query)
            .sort({ city: 1, name: 1 })
            .limit(maxLimit)
            .lean();

        const formatted = places.map(p => ({
            ...p,
            id: p._id.toString()
        }));

        res.json(formatted);
    } catch (err) {
        console.error('Error fetching places:', err);
        res.status(500).json({ error: 'Failed to fetch places from database.' });
    }
});

// GET /api/places/cities - Aggregate list of cities with place counts
router.get('/cities', async (req, res) => {
    try {
        const cityStats = await Place.aggregate([
            {
                $group: {
                    _id: { city: '$city', state: '$state' },
                    count: { $sum: 1 },
                    categories: { $addToSet: '$category' },
                    sampleImage: { $first: '$bannerImage' }
                }
            },
            {
                $project: {
                    _id: 0,
                    city: '$_id.city',
                    state: '$_id.state',
                    placeCount: '$count',
                    categories: '$categories',
                    bannerImage: '$sampleImage'
                }
            },
            { $sort: { city: 1 } }
        ]);

        res.json(cityStats);
    } catch (err) {
        console.error('Error aggregating cities:', err);
        res.status(500).json({ error: 'Failed to fetch city information.' });
    }
});

// GET /api/places/:id - Get single place details
router.get('/:id', async (req, res) => {
    try {
        const place = await Place.findById(req.params.id).lean();
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }
        res.json({
            ...place,
            id: place._id.toString()
        });
    } catch (err) {
        console.error('Error fetching place by ID:', err);
        res.status(500).json({ error: 'Failed to fetch place details' });
    }
});

// POST /api/places - Create new place (Admin only)
router.post('/', authenticateAdmin, async (req, res) => {
    try {
        const {
            name,
            city,
            state,
            country = 'India',
            category,
            shortDescription,
            fullDescription,
            history,
            culturalSignificance,
            architecture,
            thingsToSee,
            bestTimeToVisit,
            openingHours,
            entryFee,
            visitDuration,
            address,
            latitude,
            longitude,
            images,
            bannerImage,
            nearbyPlaces,
            tags,
            famousFor,
            howToReach
        } = req.body;

        if (!name || !city || !state || !category || !shortDescription || !fullDescription || !address) {
            return res.status(400).json({ error: 'Please provide all required fields (name, city, state, category, shortDescription, fullDescription, address).' });
        }

        const newPlace = new Place({
            name,
            city,
            state,
            country,
            category,
            shortDescription,
            fullDescription,
            history: history || shortDescription,
            culturalSignificance: culturalSignificance || shortDescription,
            architecture: architecture || 'Traditional architecture reflecting regional heritage.',
            thingsToSee: Array.isArray(thingsToSee) ? thingsToSee : (thingsToSee ? [thingsToSee] : []),
            bestTimeToVisit: bestTimeToVisit || 'October to March',
            openingHours: openingHours || '9:00 AM – 5:30 PM',
            entryFee: entryFee || 'Free / Nominal fee',
            visitDuration: visitDuration || '1 – 2 hours',
            address,
            latitude: Number(latitude) || null,
            longitude: Number(longitude) || null,
            images: Array.isArray(images) ? images : (images ? [images] : []),
            bannerImage: bannerImage || (Array.isArray(images) && images[0] ? images[0] : ''),
            nearbyPlaces: Array.isArray(nearbyPlaces) ? nearbyPlaces : (nearbyPlaces ? [nearbyPlaces] : []),
            tags: Array.isArray(tags) ? tags : (tags ? [tags] : []),
            famousFor: famousFor || '',
            howToReach: howToReach || {},
            verifiedInfoNotice: 'Information may change. Please verify before visiting.'
        });

        await newPlace.save();
        res.status(201).json({ message: 'Place created successfully', place: newPlace });
    } catch (err) {
        console.error('Error creating place:', err);
        res.status(500).json({ error: 'Failed to create place: ' + (err.message || 'Server error') });
    }
});

// PUT /api/places/:id - Update place (Admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
    try {
        const place = await Place.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }

        res.json({ message: 'Place updated successfully', place });
    } catch (err) {
        console.error('Error updating place:', err);
        res.status(500).json({ error: 'Failed to update place: ' + (err.message || 'Server error') });
    }
});

// DELETE /api/places/:id - Delete place (Admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }
        res.json({ message: `Place "${place.name}" deleted successfully` });
    } catch (err) {
        console.error('Error deleting place:', err);
        res.status(500).json({ error: 'Failed to delete place' });
    }
});

export default router;
