import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

// Extend the global object to prevent TS errors
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // const opts = {
    //   bufferCommands: false,
    //   maxPoolSize: 1,
    //   maxIdleTimeMS: 10000,
    //   serverSelectionTimeoutMS: 5000,
    //   socketTimeoutMS: 45000,
    // };
    const opts = {
      bufferCommands: false,
      maxPoolSize: 1, // Increased slightly for better performance on a persistent server
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4 // Often helps with connection speed in certain environments
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log('=> New MongoDB Connection Established');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export default connectDB;