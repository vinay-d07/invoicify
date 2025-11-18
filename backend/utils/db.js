require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGOURL || process.env.MONGO_URL;
        if (!uri) {
            console.error('MongoDB connection error: no connection string found in environment (MONGODB_URI or MONGO_URI)');
            process.exit(1);
        }

      
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;