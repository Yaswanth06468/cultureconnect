import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

console.log("Attempting to connect to:", uri.replace(/:([^:@]+)@/, ':***@'));

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log("SUCCESS!");
        process.exit(0);
    })
    .catch(err => {
        console.error("ERROR:");
        console.error(err.message);
        process.exit(1);
    });
