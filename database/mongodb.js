import mongoose from 'mongoose';
import {DB_URI, NODE_ENV} from '../config/env.js';

if(!DB_URI) {
    throw new Error("Please define the MONGODB_URI Environment variable inside .env(development/production).local");
}

const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`MongoDB Connected in ${NODE_ENV} mode.`);
    }
    catch(error) {
        console.error("Error Connecting to Database: ",error);
        process.exit(1);
    }
}

export default connectToDB;
