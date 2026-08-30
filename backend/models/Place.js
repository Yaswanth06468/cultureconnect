import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, index: true },
    state: { type: String, required: true },
    country: { type: String, default: 'India' },
    category: { 
        type: String, 
        required: true,
        enum: [
            'Historical Monument',
            'Fort & Palace',
            'Temple & Spiritual',
            'Museum & Heritage',
            'Nature & Scenic',
            'Cultural Center',
            'Modern Landmark'
        ],
        default: 'Historical Monument',
        index: true
    },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    history: { type: String, required: true },
    culturalSignificance: { type: String, required: true },
    architecture: { type: String, required: true },
    thingsToSee: [{ type: String }],
    bestTimeToVisit: { type: String, default: 'October to March' },
    openingHours: { type: String, default: '9:00 AM – 5:30 PM' },
    entryFee: { type: String, default: 'Free / Nominal fee' },
    visitDuration: { type: String, default: '1 – 2 hours' },
    address: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    images: [{ type: String }],
    bannerImage: { type: String },
    nearbyPlaces: [{ type: String }],
    tags: [{ type: String }],
    famousFor: { type: String },
    howToReach: {
        air: { type: String },
        train: { type: String },
        local: { type: String }
    },
    verifiedInfoNotice: { 
        type: String, 
        default: 'Information may change. Please verify before visiting.' 
    },
    created_at: { type: Date, default: Date.now }
});

PlaceSchema.set('toJSON', { virtuals: true });
PlaceSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const Place = mongoose.models.Place || mongoose.model('Place', PlaceSchema);

export default Place;
